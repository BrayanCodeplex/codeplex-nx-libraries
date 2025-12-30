import React from 'react';
import { Drawer, DrawerProps, SwipeableDrawer, SwipeableDrawerProps, Box, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CodeplexDrawerProps extends DrawerProps {
    swipeable?: boolean;
    // Vitamins:
    width?: number | string; // Helper for fixed width paper
    header?: React.ReactNode; // Content for a header area
    footer?: React.ReactNode; // Content for a footer area
    showCloseIcon?: boolean; // Convenience close button in header
    // Helper types for swipeable (only used if swipeable=true)
    onOpen?: SwipeableDrawerProps['onOpen'];
}

export const CodeplexDrawer = ({
    swipeable,
    width = 280,
    header,
    footer,
    children,
    onOpen,
    onClose,
    showCloseIcon,
    PaperProps,
    slotProps,
    ...props
}: CodeplexDrawerProps) => {

    const paperSx: SxProps<Theme> = {
        width: width,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    };

    // Robust merging for slotProps.paper which can be object or function
    const finalSlotProps = {
        ...slotProps,
        paper: (ownerState: any) => {
            const userPaper = typeof slotProps?.paper === 'function'
                ? slotProps.paper(ownerState)
                : slotProps?.paper || {};

            // Merge explicit PaperProps if provided (backward compatibility)
            const combined = { ...userPaper, ...PaperProps };

            return {
                ...combined,
                sx: [
                    paperSx,
                    ...(Array.isArray(userPaper.sx) ? userPaper.sx : [userPaper.sx]),
                    ...(Array.isArray(PaperProps?.sx) ? PaperProps?.sx : [PaperProps?.sx])
                ]
            };
        }
    };

    const drawerContent = (
        <>
            {(header || showCloseIcon) && (
                <Box
                    sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: 64
                    }}
                >
                    <Box>{header}</Box>
                    {showCloseIcon && (
                        <IconButton onClick={(e) => onClose?.(e, 'backdropClick')}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            )}

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                {children}
            </Box>

            {footer && (
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    {footer}
                </Box>
            )}
        </>
    );

    if (swipeable && onOpen) {
        return (
            <SwipeableDrawer
                onOpen={onOpen}
                onClose={onClose as React.ReactEventHandler}
                slotProps={finalSlotProps}
                {...props}
            >
                {drawerContent}
            </SwipeableDrawer>
        );
    }

    // Note: For standard Drawer, we also use slotProps if supported, 
    // but PaperProps is still valid. 
    // However, to reuse logic, passing finalSlotProps is safest if using MUI v5.14+
    return (
        <Drawer
            onClose={onClose}
            slotProps={finalSlotProps as any}
            {...props}
        >
            {drawerContent}
        </Drawer>
    );
};
