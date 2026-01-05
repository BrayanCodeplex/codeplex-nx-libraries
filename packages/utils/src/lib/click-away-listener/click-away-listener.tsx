import { ClickAwayListener as MuiClickAwayListener, ClickAwayListenerProps as MuiClickAwayListenerProps } from '@mui/material';

export interface CodeplexDetectorClickFueraProps extends Omit<MuiClickAwayListenerProps, 'onClickAway'> {
    alHacerClickFuera: (event: MouseEvent | TouchEvent) => void;
}

export const CodeplexDetectorClickFuera = ({ alHacerClickFuera, ...props }: CodeplexDetectorClickFueraProps) => {
    return <MuiClickAwayListener onClickAway={alHacerClickFuera} {...props} />;
};
