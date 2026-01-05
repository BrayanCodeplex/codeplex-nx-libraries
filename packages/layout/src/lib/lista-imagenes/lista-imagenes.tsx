import {
    ImageList as MuiImageList,
    ImageListProps as MuiImageListProps,
    ImageListItem as MuiImageListItem,
    ImageListItemProps as MuiImageListItemProps,
    ImageListItemBar as MuiImageListItemBar,
    ImageListItemBarProps as MuiImageListItemBarProps,
} from '@mui/material';

export interface CodeplexListaImagenesProps extends Omit<MuiImageListProps, 'cols' | 'rowHeight' | 'gap' | 'variant'> {
    columnas?: MuiImageListProps['cols'];
    altoFila?: MuiImageListProps['rowHeight'];
    espacio?: MuiImageListProps['gap'];
    variante?: MuiImageListProps['variant'];
}

export interface CodeplexElementoListaImagenesProps extends Omit<MuiImageListItemProps, 'cols' | 'rows'> {
    columnas?: MuiImageListItemProps['cols'];
    filas?: MuiImageListItemProps['rows'];
}

export interface CodeplexBarraElementoListaImagenesProps extends Omit<MuiImageListItemBarProps, 'title' | 'subtitle' | 'actionIcon' | 'position'> {
    titulo?: MuiImageListItemBarProps['title'];
    subtitulo?: MuiImageListItemBarProps['subtitle'];
    iconoAccion?: MuiImageListItemBarProps['actionIcon'];
    posicion?: MuiImageListItemBarProps['position'];
}

export const CodeplexListaImagenes = ({ columnas, altoFila, espacio, variante, ...props }: CodeplexListaImagenesProps) => {
    return <MuiImageList cols={columnas} rowHeight={altoFila} gap={espacio} variant={variante} {...props} />;
};

export const CodeplexElementoListaImagenes = ({ columnas, filas, ...props }: CodeplexElementoListaImagenesProps) => {
    return <MuiImageListItem cols={columnas} rows={filas} {...props} />;
};

export const CodeplexBarraElementoListaImagenes = ({ titulo, subtitulo, iconoAccion, posicion, ...props }: CodeplexBarraElementoListaImagenesProps) => {
    return <MuiImageListItemBar title={titulo} subtitle={subtitulo} actionIcon={iconoAccion} position={posicion} {...props} />;
};
