import React, { useState, useEffect } from 'react';

export interface CodeplexAccordionItem {
    id: string;
    title: string;
    subtitle?: string;
    /** Contenido del panel: puede ser texto o JSX */
    content: React.ReactNode;
    iconLeft?: React.ReactNode;
    disabled?: boolean;
}

export type AccordionVariant = 'simple' | 'bordered' | 'splitted';

export interface CodeplexAccordionProps {
    items: CodeplexAccordionItem[];
    /** Si true, permite múltiples paneles abiertos a la vez */
    multiple?: boolean;
    /** Estilo visual del acordeón */
    variant?: AccordionVariant;
    /** IDs de los items abiertos inicialmente */
    defaultOpenIds?: string[];
    /** Clase CSS adicional para el contenedor */
    className?: string;
    /** Callback al cambiar el estado */
    onChange?: (openIds: string[]) => void;
}

/**
 * Accordion profesional con animaciones Grid y múltiples variantes.
 */
export const CodeplexAccordion = ({
    items,
    multiple = false,
    variant = 'simple',
    defaultOpenIds,
    onChange,
    className = '',
}: CodeplexAccordionProps) => {
    const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds || []);

    const toggleItem = (id: string) => {
        const isOpen = openIds.includes(id);
        let next: string[];

        if (isOpen) {
            // Cerrar
            next = openIds.filter((x) => x !== id);
        } else {
            // Abrir
            next = multiple ? [...openIds, id] : [id];
        }

        setOpenIds(next);
        if (onChange) onChange(next);
    };

    const containerClasses = {
        simple:
            'divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700',
        bordered:
            'border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700',
        splitted: 'flex flex-col gap-2', // Sin bordes externos, items separados
    };

    const getItemClasses = (isOpen: boolean, isDisabled: boolean) => {
        if (variant === 'splitted') {
            return `
          border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 
          shadow-sm transition-all duration-200
          ${isOpen
                    ? 'ring-1 ring-blue-500/20 border-blue-500/50'
                    : 'hover:border-gray-300 dark:hover:border-gray-600'
                }
          ${isDisabled
                    ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
                    : ''
                }
        `;
        }
        return `
        bg-white dark:bg-gray-800 transition-colors
        ${isDisabled
                ? 'opacity-60 cursor-not-allowed bg-gray-50'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }
      `;
    };

    return (
        <div className={`w-full ${containerClasses[variant]} ${className}`}>
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                const isDisabled = !!item.disabled;
                const contentId = `accordion-content-${item.id}`;
                const headerId = `accordion-header-${item.id}`;

                return (
                    <div key={item.id} className={getItemClasses(isOpen, isDisabled)}>
                        {/* Header / Trigger */}
                        <h3>
                            <button
                                id={headerId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={contentId}
                                disabled={isDisabled}
                                onClick={() => !isDisabled && toggleItem(item.id)}
                                className={`
                    w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500
                  `}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {item.iconLeft && (
                                        <span
                                            className={`text-xl ${isOpen
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-400'
                                                }`}
                                        >
                                            {item.iconLeft}
                                        </span>
                                    )}
                                    <div className="flex flex-col text-left">
                                        <span
                                            className={`text-sm font-semibold ${isOpen
                                                    ? 'text-blue-700 dark:text-blue-300'
                                                    : 'text-gray-900 dark:text-white'
                                                }`}
                                        >
                                            {item.title}
                                        </span>
                                        {item.subtitle && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {item.subtitle}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Chevron Animado */}
                                <svg
                                    className={`
                      w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out flex-shrink-0
                      ${isOpen
                                            ? 'rotate-180 text-blue-600 dark:text-blue-400'
                                            : ''
                                        }
                    `}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </h3>

                        {/* Content con Animación Grid */}
                        <div
                            id={contentId}
                            role="region"
                            aria-labelledby={headerId}
                            className={`
                  grid transition-[grid-template-rows] duration-300 ease-out
                  ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={`px-5 pb-5 pt-0 text-sm text-gray-600 dark:text-gray-300 leading-relaxed`}
                                >
                                    {/* Separador suave si es splitted para que no pegue el texto al título */}
                                    {variant === 'splitted' && <div className="h-2"></div>}
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
