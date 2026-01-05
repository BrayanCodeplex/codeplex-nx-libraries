import React from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

export type CodeplexAlertaVariante = 'info' | 'success' | 'warning' | 'danger';
export type CodeplexAlertaDiseno = 'standard' | 'filled' | 'outlined';

export interface CodeplexAlertaProps extends Omit<AlertProps, 'variant' | 'severity' | 'onClose'> {
    // Spanish
    variante?: CodeplexAlertaVariante;
    diseno?: CodeplexAlertaDiseno;
    titulo?: string;
    descripcion?: string;
    cerrable?: boolean;
    abierto?: boolean;
    alCerrar?: () => void;
    accion?: React.ReactNode;

    // Expose MUI specific props
    color?: AlertProps['color'];
}

export const CodeplexAlerta = ({
    // Spanish props
    variante = 'info',
    diseno = 'standard',
    titulo,
    descripcion,
    cerrable = false,
    abierto = true,
    alCerrar,
    accion,

    // Children & styling
    className = '',
    children,
    sx,
    icon,
    ...props
}: CodeplexAlertaProps) => {

    const mapSeverity = (v: CodeplexAlertaVariante): AlertProps['severity'] => {
        if (v === 'danger') return 'error';
        return v;
    };

    return (
        <Collapse in={abierto}>
            <Alert
                severity={mapSeverity(variante)}
                variant={diseno}
                onClose={cerrable || alCerrar ? () => alCerrar && alCerrar() : undefined}
                className={className}
                icon={icon as React.ReactNode}
                action={accion}
                sx={{
                    borderRadius: '12px',
                    mb: 2,
                    border: diseno === 'outlined' ? '1px solid' : undefined,
                    boxShadow: diseno === 'filled' ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    alignItems: 'center', // Always center items vertically (icon, message, action)
                    '& .MuiAlertTitle-root': {
                        fontWeight: 700,
                        // Remove margin if it is the only child (no description/children) to center vertically
                        mb: (descripcion || children) ? 0.5 : 0,
                        fontSize: '0.95rem',
                        lineHeight: 1.4,
                    },
                    '& .MuiAlert-message': {
                        width: '100%', // Ensure message takes available space
                        padding: 0, // Reset default padding for better custom alignment if needed
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Center content vertically inside message container
                    },
                    '& .MuiAlert-icon': {
                        // Removed manual margin to allow centering
                        padding: 0,
                        mr: 1.5,
                        opacity: 0.9,
                    },
                    ...sx
                }}
                {...props}
            >
                {titulo && <AlertTitle>{titulo}</AlertTitle>}
                {descripcion && <Box component="div" sx={{ opacity: 0.9 }}>{descripcion}</Box>}
                {children}
            </Alert>
        </Collapse >
    );
};
export const CodeplexAlert = CodeplexAlerta;
