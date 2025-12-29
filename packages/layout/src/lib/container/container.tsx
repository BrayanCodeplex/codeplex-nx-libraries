import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export interface CodeplexContainerProps extends MuiContainerProps { }

export const CodeplexContainer = (props: CodeplexContainerProps) => {
    return <MuiContainer {...props} />;
};
