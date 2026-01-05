import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';
import { ElementType } from 'react';

export interface CodeplexCuadriculaProps extends Omit<MuiGridProps, 'container' | 'item' | 'spacing' | 'direction' | 'wrap'> {
    /**
     * Si es true, el componente se comportará como un contenedor de cuadrícula.
     */
    contenedor?: boolean;
    /**
     * Si es true, el componente se comportará como un elemento de cuadrícula.
     */
    elemento?: boolean;
    /**
     * Define el espacio entre los elementos.
     */
    espaciado?: MuiGridProps['spacing'];
    /**
     * Define la dirección del flex-container.
     */
    direccion?: MuiGridProps['direction'];
    /**
     * Define si los elementos deben envolverse o no.
     */
    envolver?: MuiGridProps['wrap'];
    /**
     * Si es true (y contenedor es true), centra los elementos mediante justifyContent="center" y alignItems="center".
     */
    centrado?: boolean;
    /**
     * El componente utilizado para el nodo raíz.
     * Puede ser una cadena HTML o un componente.
     */
    component?: ElementType;
    /**
     * Definir el número de columnas (de 1 a 12) para el breakpoint xs.
     */
    xs?: boolean | number | 'auto';
    /**
     * Definir el número de columnas (de 1 a 12) para el breakpoint sm.
     */
    sm?: boolean | number | 'auto';
    /**
     * Definir el número de columnas (de 1 a 12) para el breakpoint md.
     */
    md?: boolean | number | 'auto';
    /**
     * Definir el número de columnas (de 1 a 12) para el breakpoint lg.
     */
    lg?: boolean | number | 'auto';
    /**
     * Definir el número de columnas (de 1 a 12) para el breakpoint xl.
     */
    xl?: boolean | number | 'auto';
}

export const CodeplexCuadricula = ({
    contenedor,
    elemento,
    espaciado,
    direccion,
    envolver,
    centrado,
    sx,
    component,
    ...props
}: CodeplexCuadriculaProps) => {
    let estilos = { ...sx };

    let propsExtra: any = {};

    if (centrado) {
        propsExtra.justifyContent = 'center';
        propsExtra.alignItems = 'center';
    }

    return (
        <MuiGrid
            container={contenedor}
            item={elemento}
            spacing={espaciado}
            direction={direccion}
            wrap={envolver}
            component={component}
            sx={estilos}
            {...propsExtra}
            {...props}
        />
    );
};
