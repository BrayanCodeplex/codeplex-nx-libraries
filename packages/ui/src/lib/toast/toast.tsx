import React from 'react';
import Snackbar, { SnackbarProps, SnackbarOrigin } from '@mui/material/Snackbar';
import Alert, { AlertColor, AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export type CodeplexToastVariant = 'info' | 'success' | 'warning' | 'error';

export type CodeplexToastPosition =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export interface CodeplexToastProps extends Omit<SnackbarProps, 'open' | 'onClose' | 'anchorOrigin'> {
    open: boolean;
    variant?: CodeplexToastVariant;
    title?: string;
    subtitle?: string;
    position?: CodeplexToastPosition;
    showIcon?: boolean;
    dismissible?: boolean;
    duration?: number | null; // Auto-hide duration in ms
    onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    alertProps?: AlertProps;
}

const mapPosition = (pos: CodeplexToastPosition): SnackbarOrigin => {
    switch (pos) {
        case 'top-left': return { vertical: 'top', horizontal: 'left' };
        case 'top-center': return { vertical: 'top', horizontal: 'center' };
        case 'top-right': return { vertical: 'top', horizontal: 'right' };
        case 'bottom-left': return { vertical: 'bottom', horizontal: 'left' };
        case 'bottom-center': return { vertical: 'bottom', horizontal: 'center' };
        case 'bottom-right': return { vertical: 'bottom', horizontal: 'right' };
        default: return { vertical: 'bottom', horizontal: 'right' };
    }
};

export const CodeplexToast = ({
    open,
    variant = 'info',
    title,
    subtitle,
    position = 'bottom-right',
    showIcon = true,
    dismissible = true,
    duration = 6000,
    onClose,
    alertProps,
    children,
    ...props
}: CodeplexToastProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose?.(event, reason);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={mapPosition(position)}
            {...props}
        >
            <Alert
                onClose={dismissible ? handleClose : undefined}
                severity={variant as AlertColor}
                icon={showIcon ? undefined : false} // undefined uses default icon, false hides it
                sx={{ width: '100%' }}
                {...alertProps}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {subtitle || children}
            </Alert>
        </Snackbar>
    );
};

