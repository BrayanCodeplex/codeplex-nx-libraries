import React from 'react';
import { Popover as MuiPopover, PopoverProps as MuiPopoverProps, Box, Typography, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CodeplexPopoverProps extends Omit<MuiPopoverProps, 'title'> {
    title?: React.ReactNode;
    showCloseIcon?: boolean;
    contentSx?: SxProps<Theme>;
    onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeIcon') => void;
}

export const CodeplexPopover = ({
    children,
    title,
    showCloseIcon = false,
    onClose,
    contentSx,
    sx,
    ...props
}: CodeplexPopoverProps) => {
    return (
        <MuiPopover
            onClose={onClose}
            sx={sx}
            {...props}
        >
            <Box sx={{ p: 2, minWidth: 200, maxWidth: 400, ...contentSx }}>
                {(title || showCloseIcon) && (
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        {title && (
                            <Typography variant="subtitle1" component="div" fontWeight={600}>
                                {title}
                            </Typography>
                        )}
                        {showCloseIcon && onClose && (
                            <IconButton
                                size="small"
                                aria-label="close"
                                onClick={(e) => onClose(e, 'closeIcon')}
                                sx={{ ml: 'auto', mr: -1, mt: -0.5 }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                )}
                {children}
            </Box>
        </MuiPopover>
    );
};
