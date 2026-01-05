import React from 'react';

export type TamanoColumna = boolean | 'auto' | number | string; // number 1-12

export interface CodeplexColumnaProps extends React.HTMLAttributes<HTMLDivElement> {
    xs?: TamanoColumna;
    sm?: TamanoColumna;
    md?: TamanoColumna;
    lg?: TamanoColumna;
    xl?: TamanoColumna;
    xxl?: TamanoColumna;
    etiqueta?: React.ElementType;
}

export const CodeplexColumna = ({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    etiqueta: Etiqueta = 'div',
    className = '',
    children,
    ...props
}: CodeplexColumnaProps) => {
    let clases = 'relative px-4';

    const obtenerClaseTamano = (tamano: TamanoColumna, prefijoBreakpoint: string = '') => {
        const prefijo = prefijoBreakpoint ? `${prefijoBreakpoint}:` : '';

        if (tamano === true) {
            return `${prefijo}flex-1 ${prefijo}max-w-full`;
        }

        if (tamano === 'auto') {
            return `${prefijo}flex-none ${prefijo}w-auto`;
        }

        const tamanoNum = Number(tamano);
        if (!isNaN(tamanoNum) && tamanoNum > 0 && tamanoNum <= 12) {
            const mapaAncho: Record<number, string> = {
                1: 'w-1/12',
                2: 'w-2/12',
                3: 'w-3/12',
                4: 'w-4/12',
                5: 'w-5/12',
                6: 'w-6/12',
                7: 'w-7/12',
                8: 'w-8/12',
                9: 'w-9/12',
                10: 'w-10/12',
                11: 'w-11/12',
                12: 'w-full',
            };

            const claseAncho = mapaAncho[tamanoNum];
            if (claseAncho) {
                return `${prefijo}flex-none ${prefijo}${claseAncho}`;
            }
        }

        return '';
    };

    const tieneProps =
        xs !== undefined ||
        sm !== undefined ||
        md !== undefined ||
        lg !== undefined ||
        xl !== undefined ||
        xxl !== undefined;

    if (!tieneProps) {
        clases += ' flex-1 max-w-full';
    } else {
        if (xs === undefined) {
            clases += ' w-full';
        } else {
            clases += ` ${obtenerClaseTamano(xs, '')}`;
        }
    }

    if (sm !== undefined) clases += ` ${obtenerClaseTamano(sm, 'sm')}`;
    if (md !== undefined) clases += ` ${obtenerClaseTamano(md, 'md')}`;
    if (lg !== undefined) clases += ` ${obtenerClaseTamano(lg, 'lg')}`;
    if (xl !== undefined) clases += ` ${obtenerClaseTamano(xl, 'xl')}`;
    if (xxl !== undefined) clases += ` ${obtenerClaseTamano(xxl, '2xl')}`;

    return (
        <Etiqueta className={`${clases} ${className}`} {...props}>
            {children}
        </Etiqueta>
    );
};
