import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export interface CodeplexBoxProps extends MuiBoxProps {
    /**
     * Shorcut to make the box a flex container with content centered (vertical & horizontal).
     */
    centered?: boolean;
    /**
     * Shortcut to set width: 100vw and height: 100vh
     */
    fullScreen?: boolean;
    /**
     * Shortcut for display: 'flex', flexDirection: 'row'
     */
    flexRow?: boolean;
    /**
      * Shortcut for display: 'flex', flexDirection: 'column'
      */
    flexCol?: boolean;
}

export const CodeplexBox = ({ centered, fullScreen, flexRow, flexCol, sx, ...props }: CodeplexBoxProps) => {
    let styles = { ...sx };

    if (centered) {
        styles = { ...styles, display: 'flex', justifyContent: 'center', alignItems: 'center' };
    }
    if (fullScreen) {
        styles = { ...styles, width: '100vw', height: '100vh' };
    }
    if (flexRow) {
        styles = { ...styles, display: 'flex', flexDirection: 'row' };
    }
    if (flexCol) {
        styles = { ...styles, display: 'flex', flexDirection: 'column' };
    }

    return <MuiBox sx={styles} {...props} />;
};
