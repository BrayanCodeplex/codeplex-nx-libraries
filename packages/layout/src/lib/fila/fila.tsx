import React from 'react';

export interface CodeplexFilaProps extends React.HTMLAttributes<HTMLDivElement> {
    sinMargenes?: boolean;
    alineacion?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justificacion?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    etiqueta?: React.ElementType;
}

export const CodeplexFila = ({
    sinMargenes = false,
    alineacion,
    justificacion,
    etiqueta: Etiqueta = 'div',
    className = '',
    children,
    ...props
}: CodeplexFilaProps) => {
    let clasesBase = 'flex flex-wrap';

    if (sinMargenes) {
        clasesBase += ' mx-0';
    } else {
        clasesBase += ' -mx-4';
    }

    const clasesAlineacion: Record<string, string> = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
    };

    const clasesJustificacion: Record<string, string> = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    };

    if (alineacion && clasesAlineacion[alineacion]) clasesBase += ` ${clasesAlineacion[alineacion]}`;
    if (justificacion && clasesJustificacion[justificacion])
        clasesBase += ` ${clasesJustificacion[justificacion]}`;

    return (
        <Etiqueta className={`${clasesBase} ${className}`} {...props}>
            {children}
        </Etiqueta>
    );
};
