import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

export interface CodeplexGridProps extends MuiGridProps { }

export const CodeplexGrid = (props: CodeplexGridProps) => {
    return <MuiGrid {...props} />;
};
