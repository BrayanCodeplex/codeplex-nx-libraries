import { TextareaAutosize as MuiTextareaAutosize, TextareaAutosizeProps as MuiTextareaAutosizeProps, styled, Theme } from '@mui/material';

export interface CodeplexTextareaAutosizeProps extends MuiTextareaAutosizeProps {
    variant?: 'outlined' | 'filled' | 'standard'; // To match TextField styles
    error?: boolean;
}

const StyledTextarea = styled(MuiTextareaAutosize, {
    shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'error',
})<{ variant?: string; error?: boolean }>(({ theme, variant, error }) => {
    const borderColor = error ? theme.palette.error.main : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.23)';
    const hoverColor = error ? theme.palette.error.main : theme.palette.text.primary;
    const focusColor = error ? theme.palette.error.main : theme.palette.primary.main;

    const baseStyles = {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        padding: '8px 12px',
        borderRadius: theme.shape.borderRadius || 4,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${borderColor}`,
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),

        '&:hover': {
            borderColor: hoverColor,
        },
        '&:focus': {
            borderColor: focusColor,
            boxShadow: `0 0 0 2px ${theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.5)' : 'rgba(25, 118, 210, 0.2)'}`, // Focus ring
            outline: 0,
        },
        // Firefox
        '&:focus-visible': {
            outline: 0,
        },
    };

    if (variant === 'filled') {
        return {
            ...baseStyles,
            backgroundColor: theme.palette.action.hover,
            border: 'none',
            borderBottom: `1px solid ${borderColor}`,
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
            '&:focus': {
                ...baseStyles['&:focus'],
                backgroundColor: theme.palette.action.focus,
                boxShadow: 'none',
                borderBottom: `2px solid ${focusColor}`,
            }
        };
    }

    // Standard (Underline only)
    if (variant === 'standard') {
        return {
            ...baseStyles,
            border: 'none',
            borderBottom: `1px solid ${borderColor}`,
            borderRadius: 0,
            padding: '4px 0',
            backgroundColor: 'transparent',
            '&:focus': {
                ...baseStyles['&:focus'],
                boxShadow: 'none',
                borderBottom: `2px solid ${focusColor}`,
            }
        };
    }

    // Outlined (Default)
    return baseStyles;
});

export const CodeplexTextareaAutosize = ({
    variant = 'outlined',
    error = false,
    minRows = 3,
    ...props
}: CodeplexTextareaAutosizeProps) => {
    return <StyledTextarea variant={variant} error={error} minRows={minRows} {...props} />;
};
