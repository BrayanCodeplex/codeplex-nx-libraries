import React from 'react';
import { Tabs, Tab, TabsProps, TabProps } from '@mui/material';

export interface CodeplexElementoPestana extends Omit<TabProps, 'children'> {
    etiqueta: string | React.ReactNode;
    valor: any;
    icono?: React.ReactElement;
    posicionIcono?: 'top' | 'start' | 'end' | 'bottom';
}

export interface CodeplexPestanasProps extends Omit<TabsProps, 'value' | 'onChange' | 'centered'> {
    elementos: CodeplexElementoPestana[];
    valor: any;
    alCambiar: (event: React.SyntheticEvent, nuevoValor: any) => void;
    // Vitamins:
    centrado?: boolean;
}

export const CodeplexPestanas = ({
    elementos,
    valor,
    alCambiar,
    centrado,
    ...props
}: CodeplexPestanasProps) => {
    return (
        <Tabs value={valor} onChange={alCambiar} centered={centrado} {...props}>
            {elementos.map((elemento, index) => {
                const { etiqueta, valor, icono, posicionIcono, disabled, ...rest } = elemento;
                return (
                    <Tab
                        key={index}
                        label={etiqueta}
                        value={valor}
                        icon={icono}
                        iconPosition={posicionIcono}
                        disabled={disabled}
                        {...rest}
                    />
                );
            })}
        </Tabs>
    );
};
