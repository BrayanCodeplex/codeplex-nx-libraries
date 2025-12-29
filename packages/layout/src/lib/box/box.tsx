import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export interface CodeplexBoxProps extends MuiBoxProps { }

export const CodeplexBox = (props: CodeplexBoxProps) => {
    return <MuiBox {...props} />;
};
