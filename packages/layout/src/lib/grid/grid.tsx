import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

export interface CodeplexGridProps extends MuiGridProps {
    /**
     * If true (and container is true), centers items via justifyContent="center" and alignItems="center".
     */
    centered?: boolean;
}

export const CodeplexGrid = ({ centered, sx, ...props }: CodeplexGridProps) => {
    let styles = { ...sx };

    // Note: Grid v2 uses normal flexbox props directly usually, usually spacing/container/item.
    // justifyContent/alignItems are props on Grid.

    let extraProps: Partial<MuiGridProps> = {};

    if (centered) {
        extraProps.justifyContent = 'center';
        extraProps.alignItems = 'center';
    }

    return <MuiGrid sx={styles} {...extraProps} {...props} />;
};
