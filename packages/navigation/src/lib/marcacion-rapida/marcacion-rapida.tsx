import React from 'react';
import { SpeedDial, SpeedDialProps, SpeedDialAction, SpeedDialActionProps, SpeedDialIcon } from '@mui/material';

export interface CodeplexAccionMarcacionRapida extends Omit<SpeedDialActionProps, 'icon' | 'tooltipTitle'> {
    icono: React.ReactNode;
    tituloTooltip: React.ReactNode;
    alHacerClick?: SpeedDialActionProps['onClick'];
}

export interface CodeplexMarcacionRapidaProps extends Omit<SpeedDialProps, 'ariaLabel' | 'icon'> {
    acciones?: CodeplexAccionMarcacionRapida[];
    etiquetaAria: string;
    icono?: React.ReactNode;
    // Vitamin: allows simple usage without children
}

export const CodeplexMarcacionRapida = ({
    acciones,
    icono,
    etiquetaAria,
    children,
    ...props
}: CodeplexMarcacionRapidaProps) => {
    return (
        <SpeedDial
            ariaLabel={etiquetaAria}
            icon={icono || <SpeedDialIcon />}
            {...props}
        >
            {acciones ? acciones.map((accion, index) => (
                <SpeedDialAction
                    key={index}
                    icon={accion.icono}
                    tooltipTitle={accion.tituloTooltip}
                    onClick={accion.alHacerClick}
                    FabProps={accion.FabProps}
                    tooltipOpen={accion.tooltipOpen}
                    tooltipPlacement={accion.tooltipPlacement}
                />
            )) : children}
        </SpeedDial>
    );
};
