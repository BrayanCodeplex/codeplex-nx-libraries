import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

export type CodeplexBotonVariante =
    | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' // English
    | 'contenido' | 'texto' | 'borde'; // Spanish

export type CodeplexBotonTamano = 'xs' | 'sm' | 'md' | 'lg';

export interface CodeplexBotonProps extends Omit<ButtonProps, 'variant' | 'size' | 'onClick' | 'color'> {
    // Spanish props
    variante?: CodeplexBotonVariante;
    tamano?: CodeplexBotonTamano;
    cargando?: boolean;
    alHacerClick?: ButtonProps['onClick'];
    color?: ButtonProps['color'] | 'primario' | 'secundario' | 'exito' | 'error' | 'info' | 'advertencia';

    iconoIzquierda?: React.ReactNode;
    iconoDerecha?: React.ReactNode;
    texto?: React.ReactNode;
    // Explicitly allow component prop for polymorphism (e.g., 'label' for file upload, Link for router)
    component?: React.ElementType;
    to?: string; // For router links
    href?: string; // For router links or native anchors
    fullWidth?: boolean;
}

// ... helper ... (unchanged)
export const EntradaOcultaVisualmente = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}) as React.ComponentType<React.ComponentProps<'input'>>;

export const CodeplexBoton = React.forwardRef<HTMLButtonElement, CodeplexBotonProps>(
    ({
        variante = 'primary',
        tamano = 'md',
        cargando = false,
        disabled = false,
        iconoIzquierda,
        iconoDerecha,
        texto,
        children,
        startIcon,
        endIcon,
        sx,
        color,
        alHacerClick,
        ...props
    }, ref) => {

        const mapVariant = (v: CodeplexBotonVariante): ButtonProps['variant'] => {
            // ... (omitted for brevity, no changes here)
            switch (v) {
                case 'primary':
                case 'danger':
                case 'success':
                case 'contenido':
                    return 'contained';
                case 'secondary':
                case 'outline':
                case 'borde':
                    return 'outlined';
                case 'ghost':
                case 'texto':
                    return 'text';
                default:
                    return 'contained';
            }
        };

        const mapColor = (v: CodeplexBotonVariante, c?: string): ButtonProps['color'] => {
            // ...
            if (c) {
                switch (c) {
                    case 'primario': return 'primary';
                    case 'secundario': return 'secondary';
                    case 'exito': return 'success';
                    case 'error': return 'error';
                    case 'info': return 'info';
                    case 'advertencia': return 'warning';
                    default: return c as ButtonProps['color'];
                }
            }
            switch (v) {
                case 'primary': return 'primary';
                case 'secondary': return 'secondary';
                case 'danger': return 'error';
                case 'success': return 'success';
                case 'outline': return 'primary';
                case 'ghost': return 'inherit';
                default: return 'primary';
            }
        };

        const mapSize = (s: CodeplexBotonTamano): ButtonProps['size'] => {
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
                variant={mapVariant(variante)}
                color={mapColor(variante, color)}
                size={mapSize(tamano)}
                disabled={disabled || cargando}
                startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : (iconoIzquierda || startIcon)}
                endIcon={iconoDerecha || endIcon}
                onClick={alHacerClick}
                disableElevation
                sx={{
                    textTransform: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: variante === 'ghost' ? 'none' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    // Size override for 'xs' since MUI doesn't support it natively
                    ...(tamano === 'xs' && {
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                    }),
                    '&:hover': {
                        transform: !disabled && !cargando ? 'translateY(-1px)' : 'none',
                        boxShadow: !disabled && !cargando && variante !== 'ghost' ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' : 'none',
                    },
                    '&:active': {
                        transform: !disabled && !cargando ? 'translateY(0)' : 'none',
                    },
                    ...sx
                }}
                {...props}
            >
                {texto || children}
            </Button>
        );
    }
);

CodeplexBoton.displayName = 'CodeplexBoton';
export const CodeplexButton = CodeplexBoton;
