import {
    Collapse as MuiCollapse, CollapseProps as MuiCollapseProps,
    Fade as MuiFade, FadeProps as MuiFadeProps,
    Grow as MuiGrow, GrowProps as MuiGrowProps,
    Slide as MuiSlide, SlideProps as MuiSlideProps,
    Zoom as MuiZoom, ZoomProps as MuiZoomProps,
} from '@mui/material';

// Consistent defaults for smoother animations across the app
const DEFAULT_TIMEOUT = {
    enter: 300,
    exit: 200,
};

export interface CodeplexColapsoProps extends MuiCollapseProps { }
export const CodeplexColapso = ({ timeout = 'auto', ...props }: CodeplexColapsoProps) => (
    <MuiCollapse timeout={timeout} {...props} />
);

export interface CodeplexDesvanecimientoProps extends MuiFadeProps { }
export const CodeplexDesvanecimiento = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexDesvanecimientoProps) => (
    <MuiFade timeout={timeout} {...props} />
);

export interface CodeplexCrecimientoProps extends MuiGrowProps { }
export const CodeplexCrecimiento = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexCrecimientoProps) => (
    <MuiGrow timeout={timeout} {...props} />
);

export interface CodeplexDeslizamientoProps extends MuiSlideProps { }
export const CodeplexDeslizamiento = ({ timeout = DEFAULT_TIMEOUT, direction = 'up', ...props }: CodeplexDeslizamientoProps) => (
    <MuiSlide timeout={timeout} direction={direction} {...props} />
);

export interface CodeplexZoomProps extends MuiZoomProps { }
export const CodeplexZoom = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexZoomProps) => (
    <MuiZoom timeout={timeout} {...props} />
);
