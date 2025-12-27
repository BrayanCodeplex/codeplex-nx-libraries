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

export interface CodeplexSelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface CodeplexSelectProps extends Omit<SelectProps, 'renderValue'> {
    label?: string;
    options?: CodeplexSelectOption[];
    helperText?: ReactNode;
    placeholder?: string;
    renderValue?: (value: any) => ReactNode;
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

export const CodeplexSelect = ({
    label,
    value,
    onChange,
    options = [],
    multiple = false,
    helperText,
    error,
    disabled,
    required,
    placeholder,
    variant = 'outlined',
    displayEmpty,
    renderValue,
    children,
    sx,
    ...props
}: CodeplexSelectProps) => {
    const theme = useTheme();

    const handleDelete = (valueToDelete: any) => {
        if (onChange) {
            const newValue = Array.isArray(value)
                ? value.filter((v: any) => v !== valueToDelete)
                : [];
            const event = {
                target: { value: newValue, name: props.name },
            } as SelectChangeEvent<any>;
            onChange(event, null);
        }
    };

    // Helper: is value effectively empty?
    const isValueEmpty = value === '' || value === null || (Array.isArray(value) && value.length === 0);

    // Smart renderValue handling
    // Only used if multiple=true OR options.length > 0 OR user provided renderValue
    const smartRenderValue = (selected: any) => {
        if (renderValue) return renderValue(selected);

        // Chips for multiple
        if (multiple) {
            const selectedArray = Array.isArray(selected) ? selected : [selected];

            if (options.length > 0) {
                return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedArray.map((selectedValue: string | number) => {
                            // Correctly handle looking up in options vs just showing value if not found
                            const option = options.find(o => o.value === selectedValue);
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
        if (options.length > 0) {
            // Handle placeholder case manually if we are using renderValue
            if ((selected === '' || selected === null) && placeholder) {
                return <span style={{ color: theme.palette.text.disabled }}>{placeholder}</span>;
            }
            const option = options.find(o => o.value === selected);
            return option?.label || selected;
        }

        return selected;
    };

    // Conditionally pass renderValue
    // 1. If user provided one, use it.
    // 2. If multiple, we generally want our chip renderer.
    // 3. If options array provided, we generally want our lookup renderer.
    // 4. If composition (no options), we generally want standard MUI render (so undefined), UNLESS placeholder logic in renderValue was critical?
    //    For composition mode, standard MUI handles placeholder if we use displayEmpty + disabled MenuItem.

    const shouldUseCustomRender = renderValue || multiple || options.length > 0;

    // For shrinking label
    const shouldShrink = !isValueEmpty || (!!placeholder);

    return (
        <FormControl
            fullWidth
            error={error}
            disabled={disabled}
            required={required}
            variant={variant}
            sx={{ minWidth: 120, ...sx }}
        >
            {label && (
                <InputLabel
                    id={`select-label-${label}`}
                    shrink={shouldShrink}
                >
                    {label}
                </InputLabel>
            )}
            <CustomSelect
                labelId={label ? `select-label-${label}` : undefined}
                label={label}
                value={value}
                onChange={onChange as any}
                multiple={multiple}
                displayEmpty={!!placeholder || displayEmpty}
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
                {/* 
                   If placeholder exists, render the disabled item which acts as placeholder 
                   when displayEmpty is true and value is empty.
                   This works natively for composition mode if we don't hijack renderValue.
                */}
                {placeholder && (
                    <MenuItem value="" disabled sx={{ display: 'none' }}>
                        <span style={{ color: theme.palette.text.disabled }}>{placeholder}</span>
                    </MenuItem>
                )}

                {options.length > 0
                    ? options.map((option) => (
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
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export { MenuItem as CodeplexMenuItem };
export { default as CodeplexListSubheader } from '@mui/material/ListSubheader';
