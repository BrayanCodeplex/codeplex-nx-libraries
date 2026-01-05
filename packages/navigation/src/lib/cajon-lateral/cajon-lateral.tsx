import React from 'react';
import { Drawer, DrawerProps, SwipeableDrawer, SwipeableDrawerProps, Box, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface CodeplexCajonLateralProps extends Omit<DrawerProps, 'open' | 'onClose' | 'anchor' | 'PaperProps'> {
    deslizable?: boolean;
    // Vitamins:
    ancho?: number | string; // Helper for fixed width paper
    cabecera?: React.ReactNode; // Content for a header area
    pie?: React.ReactNode; // Content for a footer area
    mostrarIconoCierre?: boolean; // Convenience close button in header
    // Helper types for swipeable (only used if swipeable=true)
    alAbrir?: SwipeableDrawerProps['onOpen'];
    alCerrar?: (event: React.SyntheticEvent | {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    abierto?: boolean;
    anclaje?: DrawerProps['anchor'];
    propsPapel?: DrawerProps['PaperProps'];
}

export const CodeplexCajonLateral = ({
    deslizable,
    ancho = 280,
    cabecera,
    pie,
    children,
    alAbrir,
    alCerrar,
    abierto,
    anclaje,
    mostrarIconoCierre,
    propsPapel,
    slotProps,
    sx,
    ...props
}: CodeplexCajonLateralProps) => {

    const paperSx: SxProps<Theme> = {
        width: ancho,
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
            const combined = { ...userPaper, ...propsPapel };

            return {
                ...combined,
                sx: [
                    paperSx,
                    ...(Array.isArray(userPaper.sx) ? userPaper.sx : [userPaper.sx]),
                    ...(Array.isArray(propsPapel?.sx) ? propsPapel?.sx : [propsPapel?.sx])
                ]
            };
        }
    };

    const contenidoCajon = (
        <>
            {(cabecera || mostrarIconoCierre) && (
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
                    <Box>{cabecera}</Box>
                    {mostrarIconoCierre && (
                        <IconButton onClick={(e) => alCerrar?.(e, 'backdropClick')}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            )}

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                {children}
            </Box>

            {pie && (
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    {pie}
                </Box>
            )}
        </>
    );

    if (deslizable && alAbrir) {
        return (
            <SwipeableDrawer
                open={abierto || false}
                anchor={anclaje}
                onOpen={alAbrir}
                onClose={alCerrar as React.ReactEventHandler}
                slotProps={finalSlotProps as any}
                sx={sx}
                {...props}
            >
                {contenidoCajon}
            </SwipeableDrawer>
        );
    }

    return (
        <Drawer
            open={abierto}
            anchor={anclaje}
            onClose={alCerrar}
            slotProps={finalSlotProps as any}
            sx={sx}
            {...props}
        >
            {contenidoCajon}
        </Drawer>
    );
};
