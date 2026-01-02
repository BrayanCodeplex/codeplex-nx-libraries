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
    useTheme,
    alpha
} from '@mui/material';

// ----------------------------------------------------------------------
// CodeplexDialog
// ----------------------------------------------------------------------

export interface CodeplexDialogProps extends DialogProps {
    // Aquí podemos extender props si fuera necesario en el futuro
}

export const CodeplexDialog: React.FC<CodeplexDialogProps> = ({
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
// CodeplexDialogTitle
// ----------------------------------------------------------------------

export interface CodeplexDialogTitleProps extends DialogTitleProps { }

export const CodeplexDialogTitle: React.FC<CodeplexDialogTitleProps> = ({
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
// CodeplexDialogContent
// ----------------------------------------------------------------------

export interface CodeplexDialogContentProps extends DialogContentProps { }

export const CodeplexDialogContent: React.FC<CodeplexDialogContentProps> = ({
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
// CodeplexDialogContentText
// ----------------------------------------------------------------------

export interface CodeplexDialogContentTextProps extends DialogContentTextProps { }

export const CodeplexDialogContentText: React.FC<CodeplexDialogContentTextProps> = ({
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
// CodeplexDialogActions
// ----------------------------------------------------------------------

export interface CodeplexDialogActionsProps extends DialogActionsProps { }

export const CodeplexDialogActions: React.FC<CodeplexDialogActionsProps> = ({
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
