import { ClickAwayListener as MuiClickAwayListener, ClickAwayListenerProps as MuiClickAwayListenerProps } from '@mui/material';

export interface CodeplexClickAwayListenerProps extends MuiClickAwayListenerProps { }

export const CodeplexClickAwayListener = (props: CodeplexClickAwayListenerProps) => {
    return <MuiClickAwayListener {...props} />;
};
