import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

export type CodeplexButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';

export type CodeplexButtonSize = 'xs' | 'sm' | 'md' | 'lg';

// Prop type that allows for standard button props + strict overrides + generic component support
export interface CodeplexButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
    variant?: CodeplexButtonVariant;
    size?: CodeplexButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    // Explicitly allow component prop for polymorphism (e.g., 'label' for file upload, Link for router)
    component?: React.ElementType;
    to?: string; // For router links
    href?: string; // For router links or native anchors
}

// Helper for file upload buttons
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const CodeplexButton = React.forwardRef<HTMLButtonElement, CodeplexButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        leftIcon,
        rightIcon,
        children,
        startIcon,
        endIcon,
        sx,
        color,
        ...props
    }, ref) => {

        const mapVariant = (v: CodeplexButtonVariant): ButtonProps['variant'] => {
            switch (v) {
                case 'primary':
                case 'danger':
                case 'success':
                    return 'contained';
                case 'secondary':
                case 'outline':
                    return 'outlined';
                case 'ghost':
                    return 'text';
                default:
                    return 'contained';
            }
        };

        const mapColor = (v: CodeplexButtonVariant): ButtonProps['color'] => {
            switch (v) {
                case 'primary': return 'primary';
                case 'secondary': return 'secondary';
                case 'danger': return 'error';
                case 'success': return 'success';
                case 'outline': return 'primary';
                case 'ghost': return 'inherit'; // Takes parent context color
                default: return 'primary';
            }
        };

        const mapSize = (s: CodeplexButtonSize): ButtonProps['size'] => {
            switch (s) {
                case 'xs': return 'small';
                case 'sm': return 'small';
                case 'lg': return 'large';
                default: return 'medium';
            }
        };

        return (
            <Button
                ref={ref}
                variant={mapVariant(variant)}
                color={color || mapColor(variant)}
                size={mapSize(size)}
                disabled={disabled || loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : (leftIcon || startIcon)}
                endIcon={rightIcon || endIcon}
                disableElevation
                sx={{
                    textTransform: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: variant === 'ghost' ? 'none' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    // Size override for 'xs' since MUI doesn't support it natively
                    ...(size === 'xs' && {
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                    }),
                    '&:hover': {
                        transform: !disabled && !loading ? 'translateY(-1px)' : 'none',
                        boxShadow: !disabled && !loading && variant !== 'ghost' ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' : 'none',
                    },
                    '&:active': {
                        transform: !disabled && !loading ? 'translateY(0)' : 'none',
                    },
                    ...sx
                }}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

CodeplexButton.displayName = 'CodeplexButton';
