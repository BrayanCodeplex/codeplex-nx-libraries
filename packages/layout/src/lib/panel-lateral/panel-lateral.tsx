import React, { useEffect } from 'react';

export type LadoPanelLateral = 'izquierda' | 'derecha';
export type TamanoPanelLateral = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface CodeplexPanelLateralProps {
    /** Estado de visibilidad */
    abierto: boolean;
    /** Lado desde donde aparece */
    lado?: LadoPanelLateral;
    /** Ancho del panel */
    tamano?: TamanoPanelLateral;
    /** Título del panel */
    titulo?: string;
    /** Descripción o subtítulo */
    descripcion?: string;
    /** Mostrar botón de cierre */
    mostrarCierre?: boolean;
    /** Cerrar al hacer clic fuera */
    cerrarAlClickFondo?: boolean;
    /** Cerrar al presionar ESC */
    cerrarConEscape?: boolean;
    /** Clases adicionales */
    clase?: string;
    /** Callback para cerrar */
    alCerrar?: () => void;
    /** Contenido principal */
    children?: React.ReactNode;
    /** Contenido del pie */
    pie?: React.ReactNode;
}

/**
 * Panel deslizante lateral (Drawer / Off-canvas).
 * Soporta animaciones, múltiples tamaños y accesibilidad.
 */
export const CodeplexPanelLateral = ({
    abierto,
    lado = 'derecha',
    tamano = 'md',
    titulo,
    descripcion,
    mostrarCierre = true,
    cerrarAlClickFondo = true,
    cerrarConEscape = true,
    clase = '',
    alCerrar,
    children,
    pie,
}: CodeplexPanelLateralProps) => {
    // Bloqueo de Scroll del Body
    useEffect(() => {
        if (abierto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [abierto]);

    // Cerrar con ESC
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!abierto || !cerrarConEscape || !alCerrar) return;
            if (event.key === 'Escape') {
                alCerrar();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [abierto, cerrarConEscape, alCerrar]);

    const handleOverlayClick = () => {
        if (cerrarAlClickFondo && alCerrar) alCerrar();
    };

    const clasesTamano = {
        sm: 'w-64', // 16rem
        md: 'w-80', // 20rem
        lg: 'w-96', // 24rem
        xl: 'w-[32rem]', // 32rem
        full: 'w-screen', // Full viewport width
    };

    const clasesLado = {
        izquierda: 'left-0 top-0 bottom-0 border-r slide-in-from-left',
        derecha: 'right-0 top-0 bottom-0 border-l slide-in-from-right',
    };

    if (!abierto) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titulo ? 'drawer-title' : undefined}
        >
            {/* OVERLAY (Backdrop) */}
            <div
                className="
            absolute inset-0 
            bg-gray-900/50 backdrop-blur-sm 
            transition-opacity 
            animate-in fade-in duration-300
          "
                aria-hidden="true"
                onClick={handleOverlayClick}
            />

            {/* PANEL PRINCIPAL */}
            <div
                className={`
            absolute h-full bg-white dark:bg-gray-900 
            shadow-2xl 
            flex flex-col
            transform transition-transform duration-300 ease-in-out
            animate-in duration-300
            ${clasesLado[lado]}
            ${clasesTamano[tamano]}
            ${clase}
            /* Asegurar que esté sobre el overlay */
            z-10
          `}
            >
                {/* CABECERA */}
                {(titulo || mostrarCierre) && (
                    <header className="flex items-start justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="flex flex-col gap-0.5">
                            {titulo && (
                                <h2
                                    id="drawer-title"
                                    className="text-lg font-semibold text-gray-900 dark:text-white leading-6"
                                >
                                    {titulo}
                                </h2>
                            )}
                            {descripcion && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {descripcion}
                                </p>
                            )}
                        </div>

                        {mostrarCierre && (
                            <button
                                type="button"
                                onClick={alCerrar}
                                className="
                    ml-4 rounded-md p-1.5
                    text-gray-400 hover:text-gray-500 hover:bg-gray-100 
                    dark:hover:bg-gray-800 dark:hover:text-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-colors
                  "
                                aria-label="Cerrar panel"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}
                    </header>
                )}

                {/* CONTENIDO (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                    {children}
                </div>

                {/* PIE (Fixed at bottom) */}
                {pie && (
                    <footer className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/30 shrink-0">
                        {pie}
                    </footer>
                )}
            </div>
        </div>
    );
};
