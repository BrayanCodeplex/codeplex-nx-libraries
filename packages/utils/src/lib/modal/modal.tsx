import React from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps, Box, Typography, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CodeplexModalProps extends Omit<MuiModalProps, 'children' | 'title'> {
    children: React.ReactNode;
    titulo?: React.ReactNode;
    descripcion?: string;
    mostrarIconoCierre?: boolean;
    contentSx?: SxProps<Theme>; // Prop to customize the inner Box
    ancho?: number | string;
}

const defaultStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
    width: 400, // Default width
};

export const CodeplexModal = ({
    children,
    titulo,
    descripcion,
    mostrarIconoCierre = true,
    onClose,
    contentSx,
    ancho,
    ...props
}: CodeplexModalProps) => {
    return (
        <MuiModal
            aria-labelledby={titulo ? 'modal-title' : undefined}
            aria-describedby={descripcion ? 'modal-description' : undefined}
            onClose={onClose}
            {...props}
        >
            <Box sx={{ ...defaultStyle, ...(ancho && { width: ancho }), ...contentSx }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={titulo ? 2 : 0}>
                    {titulo && (
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            {titulo}
                        </Typography>
                    )}
                    {mostrarIconoCierre && onClose && (
                        <IconButton
                            aria-label="close"
                            onClick={(e) => onClose(e, 'backdropClick')}
                            sx={{
                                ml: 'auto',
                                mt: -1,
                                mr: -1,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>

                {descripcion && (
                    <Typography id="modal-description" sx={{ mb: 3 }}>
                        {descripcion}
                    </Typography>
                )}

                {children}
            </Box>
        </MuiModal>
    );
};
