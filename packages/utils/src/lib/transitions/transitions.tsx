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

export interface CodeplexCollapseProps extends MuiCollapseProps { }
export const CodeplexCollapse = ({ timeout = 'auto', ...props }: CodeplexCollapseProps) => (
    <MuiCollapse timeout={timeout} {...props} />
);

export interface CodeplexFadeProps extends MuiFadeProps { }
export const CodeplexFade = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexFadeProps) => (
    <MuiFade timeout={timeout} {...props} />
);

export interface CodeplexGrowProps extends MuiGrowProps { }
export const CodeplexGrow = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexGrowProps) => (
    <MuiGrow timeout={timeout} {...props} />
);

export interface CodeplexSlideProps extends MuiSlideProps { }
export const CodeplexSlide = ({ timeout = DEFAULT_TIMEOUT, direction = 'up', ...props }: CodeplexSlideProps) => (
    <MuiSlide timeout={timeout} direction={direction} {...props} />
);

export interface CodeplexZoomProps extends MuiZoomProps { }
export const CodeplexZoom = ({ timeout = DEFAULT_TIMEOUT, ...props }: CodeplexZoomProps) => (
    <MuiZoom timeout={timeout} {...props} />
);
