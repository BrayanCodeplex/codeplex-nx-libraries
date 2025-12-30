import React from 'react';
import { Popper as MuiPopper, PopperProps as MuiPopperProps, Paper, Box, Typography, Fade, SxProps, Theme, ClickAwayListener } from '@mui/material';

export interface CodeplexPopperProps extends Omit<MuiPopperProps, 'children' | 'title'> {
    children?: React.ReactNode;
    title?: React.ReactNode;
    contentSx?: SxProps<Theme>;
    withPaper?: boolean;
    closeOnClickAway?: boolean;
    onClose?: (event: MouseEvent | TouchEvent) => void;
    transition?: boolean;
}

export const CodeplexPopper = ({
    children,
    title,
    contentSx,
    withPaper = true,
    closeOnClickAway = false,
    onClose,
    transition = true,
    open,
    placement = 'bottom-start',
    ...props
}: CodeplexPopperProps) => {

    const content = (
        <Box sx={{ p: withPaper ? 2 : 0, ...contentSx }}>
            {title && (
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
            {children}
        </Box>
    );

    const wrappedContent = withPaper ? (
        <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 1 }}>
            {content}
        </Paper>
    ) : content;

    const popperNode = (
        <MuiPopper open={open} placement={placement} transition={transition} {...props} style={{ zIndex: 1300 }}>
            {({ TransitionProps }) => (
                transition ? (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box>
                            {wrappedContent}
                        </Box>
                    </Fade>
                ) : (
                    <Box>
                        {wrappedContent}
                    </Box>
                )
            )}
        </MuiPopper>
    );

    if (closeOnClickAway && onClose) {
        return (
            <ClickAwayListener onClickAway={onClose}>
                <Box component="span" sx={{ display: 'inline-block' }}>
                    {/* Note: ClickAwayListener needs to wrap the anchor too ideally, 
                but since Popper renders outside DOM via Portal, we might need 
                to carefully handle where this logic lives. 
                However, for a Popper wrapper, wrapping the Popper itself helps if the 
                click is *inside* the popper (it won't trigger close). 
                If the click is *outside*, it triggers close.
            */}
                    {popperNode}
                </Box>
            </ClickAwayListener>
        );
    }

    return popperNode;
};
