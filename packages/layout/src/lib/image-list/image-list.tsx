import {
    ImageList as MuiImageList,
    ImageListProps as MuiImageListProps,
    ImageListItem as MuiImageListItem,
    ImageListItemProps as MuiImageListItemProps,
    ImageListItemBar as MuiImageListItemBar,
    ImageListItemBarProps as MuiImageListItemBarProps,
} from '@mui/material';

export interface CodeplexImageListProps extends MuiImageListProps { }
export interface CodeplexImageListItemProps extends MuiImageListItemProps { }
export interface CodeplexImageListItemBarProps extends MuiImageListItemBarProps { }

export const CodeplexImageList = (props: CodeplexImageListProps) => {
    return <MuiImageList {...props} />;
};

export const CodeplexImageListItem = (props: CodeplexImageListItemProps) => {
    return <MuiImageListItem {...props} />;
};

export const CodeplexImageListItemBar = (props: CodeplexImageListItemBarProps) => {
    return <MuiImageListItemBar {...props} />;
};
