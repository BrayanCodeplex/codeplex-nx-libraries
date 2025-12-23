import React, { useEffect } from 'react';

export type CodeplexDrawerSide = 'left' | 'right';
export type CodeplexDrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface CodeplexDrawerProps {
    /** Estado de visibilidad */
    open: boolean;
    /** Lado desde donde aparece */
    side?: CodeplexDrawerSide;
    /** Ancho del panel */
    size?: CodeplexDrawerSize;
    /** Título del panel */
    title?: string;
    /** Descripción o subtítulo */
    description?: string;
    /** Mostrar botón de cierre */
    showClose?: boolean;
    /** Cerrar al hacer clic fuera */
    closeOnOverlayClick?: boolean;
    /** Cerrar al presionar ESC */
    closeOnEsc?: boolean;
    /** Clases adicionales */
    className?: string;
    /** Callback para cerrar */
    onClose?: () => void;
    /** Contenido principal */
    children?: React.ReactNode;
    /** Contenido del footer */
    footer?: React.ReactNode;
}

/**
 * Panel deslizante lateral (Drawer / Off-canvas).
 * Soporta animaciones, múltiples tamaños y accesibilidad.
 */
export const CodeplexDrawer = ({
    open,
    side = 'right',
    size = 'md',
    title,
    description,
    showClose = true,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    className = '',
    onClose,
    children,
    footer,
}: CodeplexDrawerProps) => {
    // Bloqueo de Scroll del Body
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Cerrar con ESC
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!open || !closeOnEsc || !onClose) return;
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEsc, onClose]);

    const handleOverlayClick = () => {
        if (closeOnOverlayClick && onClose) onClose();
    };

    const sizeClasses = {
        sm: 'w-64', // 16rem
        md: 'w-80', // 20rem
        lg: 'w-96', // 24rem
        xl: 'w-[32rem]', // 32rem
        full: 'w-screen', // Full viewport width
    };

    const sideClasses = {
        left: 'left-0 top-0 bottom-0 border-r slide-in-from-left',
        right: 'right-0 top-0 bottom-0 border-l slide-in-from-right',
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
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
            ${sideClasses[side]}
            ${sizeClasses[size]}
            ${className}
            /* Asegurar que esté sobre el overlay */
            z-10
          `}
            >
                {/* HEADER */}
                {(title || showClose) && (
                    <header className="flex items-start justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="flex flex-col gap-0.5">
                            {title && (
                                <h2
                                    id="drawer-title"
                                    className="text-lg font-semibold text-gray-900 dark:text-white leading-6"
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {description}
                                </p>
                            )}
                        </div>

                        {showClose && (
                            <button
                                type="button"
                                onClick={onClose}
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

                {/* CONTENT (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                    {children}
                </div>

                {/* FOOTER (Fixed at bottom) */}
                {footer && (
                    <footer className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/30 shrink-0">
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    );
};
