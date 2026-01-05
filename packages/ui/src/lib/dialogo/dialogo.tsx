import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    type DialogProps,
    type DialogTitleProps,
    type DialogContentProps,
    type DialogContentTextProps,
    type DialogActionsProps,
    useTheme
} from '@mui/material';

// ----------------------------------------------------------------------
// CodeplexDialogo
// ----------------------------------------------------------------------

export interface CodeplexDialogoProps extends DialogProps {
    // Espacio para extender props si fuera necesario
}

export const CodeplexDialogo: React.FC<CodeplexDialogoProps> = ({
    children,
    PaperProps,
    ...props
}) => {
    const theme = useTheme();

    return (
        <Dialog
            PaperProps={{
                elevation: 24, // Sombra más pronunciada por defecto
                sx: {
                    borderRadius: 3, // Bordes redondeados modernos
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.background.paper,
                    ...PaperProps?.sx,
                },
                ...PaperProps,
            }}
            {...props}
        >
            {children}
        </Dialog>
    );
};

// ----------------------------------------------------------------------
// CodeplexDialogoTitulo
// ----------------------------------------------------------------------

export interface CodeplexDialogoTituloProps extends DialogTitleProps { }

export const CodeplexDialogoTitulo: React.FC<CodeplexDialogoTituloProps> = ({
    sx,
    children,
    ...props
}) => {
    return (
        <DialogTitle
            sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                pb: 1,
                ...sx
            }}
            {...props}
        >
            {children}
        </DialogTitle>
    );
};

// ----------------------------------------------------------------------
// CodeplexDialogoContenido
// ----------------------------------------------------------------------

export interface CodeplexDialogoContenidoProps extends DialogContentProps { }

export const CodeplexDialogoContenido: React.FC<CodeplexDialogoContenidoProps> = ({
    sx,
    children,
    ...props
}) => {
    return (
        <DialogContent
            sx={{
                py: 2, // Espaciado vertical consistente
                ...sx
            }}
            {...props}
        >
            {children}
        </DialogContent>
    );
};

// ----------------------------------------------------------------------
// CodeplexDialogoTexto
// ----------------------------------------------------------------------

export interface CodeplexDialogoTextoProps extends DialogContentTextProps { }

export const CodeplexDialogoTexto: React.FC<CodeplexDialogoTextoProps> = ({
    sx,
    children,
    ...props
}) => {
    return (
        <DialogContentText
            sx={{
                mb: 2,
                color: 'text.secondary',
                ...sx
            }}
            {...props}
        >
            {children}
        </DialogContentText>
    );
};

// ----------------------------------------------------------------------
// CodeplexDialogoAcciones
// ----------------------------------------------------------------------

export interface CodeplexDialogoAccionesProps extends DialogActionsProps { }

export const CodeplexDialogoAcciones: React.FC<CodeplexDialogoAccionesProps> = ({
    sx,
    children,
    ...props
}) => {
    return (
        <DialogActions
            sx={{
                px: 3,
                pb: 3, // Espaciado inferior para separar del borde
                gap: 1, // Espacio entre botones
                ...sx
            }}
            {...props}
        >
            {children}
        </DialogActions>
    );
};
