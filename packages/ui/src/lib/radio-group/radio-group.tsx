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
    label?: string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export const CodeplexRadio = React.forwardRef<HTMLButtonElement, CodeplexRadioProps>(
    ({ label, labelPlacement, sx, ...props }, ref) => {
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

        if (label) {
            return (
                <FormControlLabel
                    control={radio}
                    label={label}
                    labelPlacement={labelPlacement}
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

export interface CodeplexRadioGroupProps extends RadioGroupProps {
    label?: string; // Main group label
    options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const CodeplexRadioGroup = ({
    label,
    options,
    children,
    ...props
}: CodeplexRadioGroupProps) => { // Removed Type Annotation here as it's inferred and causing duplicate identifier issues if I re-declare

    const content = (
        <RadioGroup {...props}>
            {options
                ? options.map((option) => (
                    <CodeplexRadio
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        disabled={option.disabled}
                    />
                ))
                : children}
        </RadioGroup>
    );

    if (label) {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend" className="mb-2 font-semibold">{label}</FormLabel>
                {content}
            </FormControl>
        );
    }

    return content;
};
