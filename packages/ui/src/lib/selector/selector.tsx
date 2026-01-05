import React, { ReactNode } from 'react';
import Select, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Internal type for mapped options
interface CodeplexSelectorOpcionInterna {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface CodeplexSelectorOpcion {
    valor: string | number;
    etiqueta: string;
    deshabilitado?: boolean;
}

export interface CodeplexSelectorProps extends Omit<SelectProps, 'renderValue'> {
    // Spanish
    etiqueta?: string;
    opciones?: CodeplexSelectorOpcion[];
    textoAyuda?: ReactNode;
    marcador?: string; // placeholder
    renderizarValor?: (value: any) => ReactNode;
    alCambiar?: SelectProps['onChange'];
    tamano?: SelectProps['size'];
}

const CustomSelect = styled(Select)(({ theme }) => ({
    borderRadius: 12,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
        transition: 'all 0.2s',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.1)'}`,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
    },
    '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(220, 38, 38, 0.1)'}`,
    },
}));

export const CodeplexSelector = ({
    value,
    onChange,
    size,
    multiple = false,
    error,
    disabled,
    required,
    variant = 'outlined',
    displayEmpty,

    // Spanish
    etiqueta,
    opciones,
    textoAyuda,
    marcador,
    renderizarValor,
    alCambiar,
    tamano,

    children,
    sx,
    ...props
}: CodeplexSelectorProps) => {

    const theme = useTheme();
    const finalOnChange = alCambiar || onChange;
    const finalSize = tamano || size;

    // Map options
    const finalOptions: CodeplexSelectorOpcionInterna[] = opciones
        ? opciones.map(o => ({ value: o.valor, label: o.etiqueta, disabled: o.deshabilitado }))
        : [];

    const handleDelete = (valueToDelete: any) => {
        if (finalOnChange) {
            const newValue = Array.isArray(value)
                ? value.filter((v: any) => v !== valueToDelete)
                : [];
            const event = {
                target: { value: newValue, name: props.name },
            } as SelectChangeEvent<any>;
            finalOnChange(event, null);
        }
    };

    // Helper: is value effectively empty?
    const isValueEmpty = value === '' || value === null || (Array.isArray(value) && value.length === 0);

    // Smart renderValue handling
    const smartRenderValue = (selected: any) => {
        if (renderizarValor) return renderizarValor(selected);

        // Chips for multiple
        if (multiple) {
            const selectedArray = Array.isArray(selected) ? selected : [selected];

            if (finalOptions.length > 0) {
                return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedArray.map((selectedValue: string | number) => {
                            const option = finalOptions.find(o => o.value === selectedValue);
                            return (
                                <Chip
                                    key={selectedValue}
                                    label={option?.label || selectedValue}
                                    size="small"
                                    sx={{ borderRadius: 1.5 }}
                                    onDelete={() => handleDelete(selectedValue)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                />
                            );
                        })}
                    </Box>
                );
            }
            return selectedArray.join(', ');
        }

        // Single selection via Options prop
        if (finalOptions.length > 0) {
            // Handle placeholder case manually if we are using renderValue
            if ((selected === '' || selected === null) && marcador) {
                return <span style={{ color: theme.palette.text.disabled }}>{marcador}</span>;
            }
            const option = finalOptions.find(o => o.value === selected);
            return option?.label || selected;
        }

        return selected;
    };

    const shouldUseCustomRender = renderizarValor || multiple || finalOptions.length > 0;
    const shouldShrink = !isValueEmpty || (!!marcador);

    return (
        <FormControl
            fullWidth
            error={error}
            disabled={disabled}
            required={required}
            variant={variant}
            sx={{ minWidth: 120, ...sx }}
        >
            {etiqueta && (
                <InputLabel
                    id={`select-label-${etiqueta}`}
                    shrink={shouldShrink}
                >
                    {etiqueta}
                </InputLabel>
            )}
            <CustomSelect
                labelId={etiqueta ? `select-label-${etiqueta}` : undefined}
                label={etiqueta}
                value={value}
                onChange={finalOnChange as any}
                size={finalSize}
                multiple={multiple}
                displayEmpty={!!marcador || displayEmpty}
                renderValue={shouldUseCustomRender ? smartRenderValue : undefined}
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={{
                    PaperProps: {
                        elevation: 0,
                        sx: {
                            mt: 1.5,
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            maxHeight: 320,
                            '& .MuiMenuItem-root': {
                                borderRadius: 1.5,
                                mx: 1,
                                my: 0.5,
                                py: 1,
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    pl: 2.5,
                                },
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                    },
                                },
                            },
                        }
                    }
                }}
                {...props}
            >
                {marcador && (
                    <MenuItem value="" disabled sx={{ display: 'none' }}>
                        <span style={{ color: theme.palette.text.disabled }}>{marcador}</span>
                    </MenuItem>
                )}

                {finalOptions.length > 0
                    ? finalOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </MenuItem>
                    ))
                    : children
                }
            </CustomSelect>
            {textoAyuda && <FormHelperText>{textoAyuda}</FormHelperText>}
        </FormControl>
    );
};

export { MenuItem as CodeplexElementoMenu };
export { default as CodeplexSubcabeceraLista } from '@mui/material/ListSubheader';
export const CodeplexSelect = CodeplexSelector;
