import React from 'react';
import Snackbar, { SnackbarProps, SnackbarOrigin } from '@mui/material/Snackbar';
import Alert, { AlertColor, AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export type CodeplexNotificacionVariante = 'info' | 'success' | 'warning' | 'error';

export type CodeplexNotificacionPosicion =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export interface CodeplexNotificacionProps extends Omit<SnackbarProps, 'open' | 'onClose' | 'anchorOrigin'> {
    open: boolean;
    // Spanish
    variante?: CodeplexNotificacionVariante;
    titulo?: string;
    subtitulo?: string;
    posicion?: CodeplexNotificacionPosicion;
    mostrarIcono?: boolean;
    cerrable?: boolean;
    duracion?: number | null;

    onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    alertProps?: AlertProps;
}

const mapPosition = (pos: CodeplexNotificacionPosicion): SnackbarOrigin => {
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

export const CodeplexNotificacion = ({
    open,
    variante = 'info',
    titulo,
    subtitulo,
    posicion = 'bottom-right',
    mostrarIcono = true,
    cerrable = true,
    duracion = 6000,
    onClose,
    alertProps,
    children,
    ...props
}: CodeplexNotificacionProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose?.(event, reason);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={duracion}
            onClose={handleClose}
            anchorOrigin={mapPosition(posicion)}
            {...props}
        >
            <Alert
                onClose={cerrable ? handleClose : undefined}
                severity={variante as AlertColor}
                icon={mostrarIcono ? undefined : false} // undefined uses default icon, false hides it
                sx={{ width: '100%' }}
                {...alertProps}
            >
                {titulo && <AlertTitle>{titulo}</AlertTitle>}
                {subtitulo || children}
            </Alert>
        </Snackbar>
    );
};

export const CodeplexTostada = CodeplexNotificacion;
export const CodeplexToast = CodeplexNotificacion;
