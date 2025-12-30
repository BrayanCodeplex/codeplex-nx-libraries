import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export interface CodeplexContainerProps extends MuiContainerProps {
    /**
     * If true, the container will be fluid (maxWidth={false}).
     */
    fluid?: boolean;
    /**
     * If true, makes the container full height (100vh) and centers content.
     */
    pageCentered?: boolean;
}

export const CodeplexContainer = ({ fluid, pageCentered, sx, maxWidth, ...props }: CodeplexContainerProps) => {
    let styles = { ...sx };

    if (pageCentered) {
        styles = {
            ...styles,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        };
    }

    return (
        <MuiContainer
            maxWidth={fluid ? false : maxWidth}
            sx={styles}
            {...props}
        />
    );
};
