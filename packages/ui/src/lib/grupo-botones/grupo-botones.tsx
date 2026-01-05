import React from 'react';
import ButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';

export interface CodeplexGrupoBotonesProps extends Omit<ButtonGroupProps, 'variant' | 'color'> {
    // Spanish
    variante?: ButtonGroupProps['variant'] | 'contenido' | 'texto' | 'borde';
    tamano?: ButtonGroupProps['size'];
    color?: ButtonGroupProps['color'] | 'primario' | 'secundario' | 'exito' | 'error' | 'info' | 'advertencia';
}

export const CodeplexGrupoBotones = ({
    children,
    tamano = 'medium',
    variante = 'contained',
    color = 'primary',
    ...props
}: CodeplexGrupoBotonesProps) => {

    const mapVariant = (v: any): ButtonGroupProps['variant'] => {
        if (v === 'contenido') return 'contained';
        if (v === 'texto') return 'text';
        if (v === 'borde') return 'outlined';
        return v;
    };

    const mapColor = (c: any): ButtonGroupProps['color'] => {
        if (c === 'primario') return 'primary';
        if (c === 'secundario') return 'secondary';
        if (c === 'exito') return 'success';
        if (c === 'error') return 'error';
        if (c === 'info') return 'info';
        if (c === 'advertencia') return 'warning';
        return c;
    }

    return (
        <ButtonGroup
            size={tamano}
            variant={mapVariant(variante)}
            color={mapColor(color)}
            {...props}
        >
            {children}
        </ButtonGroup>
    );
};
// Alias for backward compat (component name only)
export const CodeplexButtonGroup = CodeplexGrupoBotones;
