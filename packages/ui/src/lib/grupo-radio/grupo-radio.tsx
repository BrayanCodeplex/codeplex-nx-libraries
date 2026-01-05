import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

// --- Styled Radio Components ---

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 20,
    height: 20,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 20,
        height: 20,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

export interface CodeplexRadioProps extends RadioProps {
    // Spanish
    etiqueta?: string;
    posicionEtiqueta?: 'end' | 'start' | 'top' | 'bottom';
}

export const CodeplexRadio = React.forwardRef<HTMLButtonElement, CodeplexRadioProps>(
    ({
        etiqueta,
        posicionEtiqueta,
        sx,
        ...props
    }, ref) => {

        const radio = (
            <Radio
                ref={ref}
                sx={{
                    '&:hover': { bgcolor: 'transparent' },
                    ...sx
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );

        if (etiqueta) {
            return (
                <FormControlLabel
                    control={radio}
                    label={etiqueta}
                    labelPlacement={posicionEtiqueta}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            userSelect: 'none',
                        }
                    }}
                />
            );
        }
        return radio;
    }
);

CodeplexRadio.displayName = 'CodeplexRadio';

// --- Radio Group Component ---

export interface CodeplexGrupoRadioProps extends RadioGroupProps {
    // Spanish
    etiqueta?: string;
    opciones?: Array<{ valor: string; etiqueta: string; deshabilitado?: boolean }>;
}

export const CodeplexGrupoRadio = ({
    etiqueta,
    opciones,
    children,
    ...props
}: CodeplexGrupoRadioProps) => {

    const finalOptions = opciones
        ? opciones.map(o => ({ value: o.valor, label: o.etiqueta, disabled: o.deshabilitado }))
        : null;

    const content = (
        <RadioGroup {...props}>
            {finalOptions
                ? finalOptions.map((option) => (
                    <CodeplexRadio
                        key={option.value}
                        value={option.value}
                        etiqueta={option.label}
                        disabled={option.disabled}
                    />
                ))
                : children}
        </RadioGroup>
    );

    if (etiqueta) {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend" className="mb-2 font-semibold">{etiqueta}</FormLabel>
                {content}
            </FormControl>
        );
    }

    return content;
};
export const CodeplexRadioGroup = CodeplexGrupoRadio;
