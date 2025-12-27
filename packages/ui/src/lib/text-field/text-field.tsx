import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';

export type CodeplexTextFieldProps = TextFieldProps;

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.03) : alpha(theme.palette.common.black, 0.01), // Subtle backing
        '& fieldset': {
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            transition: 'border-color 0.2s, border-width 0.2s, box-shadow 0.2s',
        },
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.common.black, 0.02),
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1, // Keep it thin on hover unless focused
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.main, 0.02), // Tint background on focus
        },
        '&.Mui-focused fieldset': {
            borderWidth: 2,
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`, // Soft focus ring
        },
        '&.Mui-error fieldset': {
            borderColor: theme.palette.error.main,
        },
        '&.Mui-error.Mui-focused': {
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.error.main, 0.05) : alpha(theme.palette.error.main, 0.02),
        },
        '&.Mui-error.Mui-focused fieldset': {
            borderColor: theme.palette.error.main,
            boxShadow: `0 0 0 4px ${alpha(theme.palette.error.main, 0.1)}`,
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 14px',
        fontWeight: 500, // Slightly bolder text for readability
        '&::placeholder': {
            opacity: 0.6,
        }
    },
    '& .MuiInputLabel-root': {
        fontSize: '0.95rem',
        marginTop: 0,
        transform: 'translate(14px, 12px) scale(1)', // Center alignment adjustment if needed, but default is usually fine with padding. 
        // Let's rely on default specific vertical centering but ensuring color matches professional look
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main,
            fontWeight: 600,
            transform: 'translate(14px, -9px) scale(0.75)', // Ensure smooth floating position
        },
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
        },
        '&.Mui-error': {
            color: theme.palette.error.main,
        },
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 14,
        fontSize: '0.75rem',
    }
}));

export const CodeplexTextField = (props: CodeplexTextFieldProps) => {
    return (
        <CustomTextField
            variant="outlined"
            fullWidth
            {...props}
        />
    );
};
