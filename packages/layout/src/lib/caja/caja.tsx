import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export interface CodeplexCajaProps extends MuiBoxProps {
    /**
     * Acceso directo para hacer que la caja sea un contenedor flexible centrado (vertical y horizontal).
     */
    centrado?: boolean;
    /**
     * Acceso directo para establecer width: 100vw y height: 100vh.
     */
    pantallaCompleta?: boolean;
    /**
     * Acceso directo para display: 'flex', flexDirection: 'row'.
     */
    flexFila?: boolean;
    /**
      * Acceso directo para display: 'flex', flexDirection: 'column'.
      */
    flexColumna?: boolean;
}

export const CodeplexCaja = ({ centrado, pantallaCompleta, flexFila, flexColumna, sx, ...props }: CodeplexCajaProps) => {
    let estilos = { ...sx };

    if (centrado) {
        estilos = { ...estilos, display: 'flex', justifyContent: 'center', alignItems: 'center' };
    }
    if (pantallaCompleta) {
        estilos = { ...estilos, width: '100vw', height: '100vh' };
    }
    if (flexFila) {
        estilos = { ...estilos, display: 'flex', flexDirection: 'row' };
    }
    if (flexColumna) {
        estilos = { ...estilos, display: 'flex', flexDirection: 'column' };
    }

    return <MuiBox sx={estilos} {...props} />;
};
