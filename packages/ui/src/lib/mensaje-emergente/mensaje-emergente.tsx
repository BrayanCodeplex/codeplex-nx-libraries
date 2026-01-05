import React, { useState, useRef, useEffect, useId } from 'react';

export type CodeplexTooltipLado = 'arriba' | 'abajo' | 'izquierda' | 'derecha';
export type CodeplexTooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface CodeplexMensajeEmergenteProps {
    // Spanish
    contenido?: React.ReactNode;
    lado?: CodeplexTooltipLado;
    retrasoMs?: number;
    flecha?: boolean;
    deshabilitado?: boolean;
    alCambiarEstado?: (abierto: boolean) => void;
    className?: string;
    children: React.ReactNode;
}

export const CodeplexMensajeEmergente = ({
    contenido,
    lado = 'arriba',
    retrasoMs = 200,
    flecha = true,
    deshabilitado = false,
    alCambiarEstado,
    className = '',
    children,
}: CodeplexMensajeEmergenteProps) => {

    const mapSide = (s: CodeplexTooltipLado): CodeplexTooltipSide => {
        const map: Record<string, CodeplexTooltipSide> = {
            'arriba': 'top',
            'abajo': 'bottom',
            'izquierda': 'left',
            'derecha': 'right'
        };
        return map[s] || 'top';
    };

    const finalSide = mapSide(lado);

    const [open, setOpenState] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const tooltipId = useId();

    const setOpen = (next: boolean) => {
        setOpenState(next);
        if (alCambiarEstado) alCambiarEstado(next);
    };

    const scheduleOpen = () => {
        if (deshabilitado) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = window.setTimeout(() => {
            setOpen(true);
        }, retrasoMs);
    };

    const scheduleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpen(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l',
    };

    return (
        <span
            className={`relative inline-flex ${className}`}
            onMouseEnter={scheduleOpen}
            onMouseLeave={scheduleClose}
            onFocus={scheduleOpen}
            onBlur={scheduleClose}
            aria-describedby={open ? tooltipId : undefined}
        >
            {children}

            {!deshabilitado && open && (
                <div
                    id={tooltipId}
                    role="tooltip"
                    className={`
            absolute z-50
            ${positionClasses[finalSide]}
            animate-in fade-in zoom-in-95 duration-200
            min-w-max
          `}
                >
                    <div
                        className={`
              relative
              px-3 py-2
              text-xs font-medium text-white
              bg-gray-900 dark:bg-gray-700
              rounded-md shadow-lg
              pointer-events-none
            `}
                    >
                        {contenido}

                        {flecha && (
                            <div
                                className={`
                  absolute w-2 h-2
                  bg-gray-900 dark:bg-gray-700
                  rotate-45
                  ${arrowClasses[finalSide]}
                `}
                            />
                        )}
                    </div>
                </div>
            )}
        </span>
    );
};
export const CodeplexTooltip = CodeplexMensajeEmergente;
