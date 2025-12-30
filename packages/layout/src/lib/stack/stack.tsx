import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

export interface CodeplexStackProps extends MuiStackProps {
    /**
     * Centers children horizontally and vertically.
     */
    centered?: boolean;
    /**
     * Applies justifyContent: 'space-between'
     */
    between?: boolean;
}

export const CodeplexStack = ({ centered, between, sx, alignItems, justifyContent, ...props }: CodeplexStackProps) => {
    let addedSx = { ...sx };
    let align = alignItems;
    let justify = justifyContent;

    if (centered) {
        align = align || 'center';
        justify = justify || 'center';
    }
    if (between) {
        justify = 'space-between';
    }

    return <MuiStack sx={addedSx} alignItems={align} justifyContent={justify} {...props} />;
};
