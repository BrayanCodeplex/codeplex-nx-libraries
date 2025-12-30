import React from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps, Box, Typography, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CodeplexModalProps extends Omit<MuiModalProps, 'children' | 'title'> {
    children: React.ReactNode;
    title?: React.ReactNode;
    description?: string;
    showCloseIcon?: boolean;
    contentSx?: SxProps<Theme>; // Prop to customize the inner Box
    width?: number | string;
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
    title,
    description,
    showCloseIcon = true,
    onClose,
    contentSx,
    width,
    ...props
}: CodeplexModalProps) => {
    return (
        <MuiModal
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            onClose={onClose}
            {...props}
        >
            <Box sx={{ ...defaultStyle, ...(width && { width }), ...contentSx }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={title ? 2 : 0}>
                    {title && (
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            {title}
                        </Typography>
                    )}
                    {showCloseIcon && onClose && (
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

                {description && (
                    <Typography id="modal-description" sx={{ mb: 3 }}>
                        {description}
                    </Typography>
                )}

                {children}
            </Box>
        </MuiModal>
    );
};
