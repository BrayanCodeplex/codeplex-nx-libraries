import React from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

export type CodeplexAlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type CodeplexAlertStyle = 'standard' | 'filled' | 'outlined';

export interface CodeplexAlertProps extends Omit<AlertProps, 'variant' | 'severity' | 'onClose'> {
    variant?: CodeplexAlertVariant;
    design?: CodeplexAlertStyle; // Mapped to MUI variant prop
    title?: string;
    description?: string;
    dismissible?: boolean;
    open?: boolean;
    onClose?: () => void;
    // Expose MUI specific props explicitly for clarity if needed, or rely on intersection
    color?: AlertProps['color'];
    action?: React.ReactNode;
}

export const CodeplexAlert = ({
    variant = 'info',
    design = 'standard',
    title,
    description,
    icon,
    dismissible = false,
    open = true,
    onClose,
    className = '',
    children,
    action,
    sx,
    ...props
}: CodeplexAlertProps) => {

    const mapSeverity = (v: CodeplexAlertVariant): AlertProps['severity'] => {
        if (v === 'danger') return 'error';
        return v;
    };

    return (
        <Collapse in={open}>
            <Alert
                severity={mapSeverity(variant)}
                variant={design}
                onClose={dismissible || onClose ? () => onClose && onClose() : undefined}
                className={className}
                icon={icon as React.ReactNode}
                action={action}
                sx={{
                    borderRadius: '12px',
                    mb: 2,
                    border: design === 'outlined' ? '1px solid' : undefined,
                    boxShadow: design === 'filled' ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    alignItems: 'center', // Always center items vertically (icon, message, action)
                    '& .MuiAlertTitle-root': {
                        fontWeight: 700,
                        // Remove margin if it is the only child (no description/children) to center vertically
                        mb: (description || children) ? 0.5 : 0,
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
                {title && <AlertTitle>{title}</AlertTitle>}
                {description && <Box component="div" sx={{ opacity: 0.9 }}>{description}</Box>}
                {children}
            </Alert>
        </Collapse >
    );
};
