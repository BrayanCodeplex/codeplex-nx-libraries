import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export interface CodeplexContenedorProps extends Omit<MuiContainerProps, 'maxWidth' | 'fixed' | 'disableGutters'> {
    /**
     * Si es true, el contenedor será fluido (maxWidth={false}).
     */
    fluido?: boolean;
    /**
     * Si es true, hace que el contenedor tenga altura completa (100vh) y centra el contenido.
     */
    paginaCentrada?: boolean;
    /**
     * Determina el ancho máximo del contenedor. El contenedor crecerá hasta el ancho del valor especificado.
     */
    anchoMaximo?: MuiContainerProps['maxWidth'];
    /**
     * Establece el ancho máximo del contenedor para que coincida con el ancho mínimo del punto de ruptura actual.
     */
    fijo?: boolean;
    /**
     * Si es true, se eliminan los paddings izquierdo y derecho.
     */
    deshabilitarMargenes?: boolean;
}

export const CodeplexContenedor = ({
    fluido,
    paginaCentrada,
    sx,
    anchoMaximo,
    fijo,
    deshabilitarMargenes,
    ...props
}: CodeplexContenedorProps) => {
    let estilos = { ...sx };

    if (paginaCentrada) {
        estilos = {
            ...estilos,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        };
    }

    return (
        <MuiContainer
            maxWidth={fluido ? false : anchoMaximo}
            fixed={fijo}
            disableGutters={deshabilitarMargenes}
            sx={estilos}
            {...props}
        />
    );
};
