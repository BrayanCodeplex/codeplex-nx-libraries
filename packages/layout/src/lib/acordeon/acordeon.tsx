import React, { useState, useEffect } from 'react';

export interface CodeplexElementoAcordeon {
    id: string;
    titulo: string;
    subtitulo?: string;
    /** Contenido del panel: puede ser texto o JSX */
    contenido: React.ReactNode;
    iconoIzquierda?: React.ReactNode;
    deshabilitado?: boolean;
}

export type VarianteAcordeon = 'simple' | 'bordeado' | 'separado';

export interface CodeplexAcordeonProps {
    elementos: CodeplexElementoAcordeon[];
    /** Si true, permite múltiples paneles abiertos a la vez */
    multiple?: boolean;
    /** Estilo visual del acordeón */
    variante?: VarianteAcordeon;
    /** IDs de los items abiertos inicialmente */
    idsAbiertosInicialmente?: string[];
    /** Clase CSS adicional para el contenedor */
    clase?: string;
    /** Callback al cambiar el estado */
    alCambiar?: (idsAbiertos: string[]) => void;
}

/**
 * Acordeón profesional con animaciones Grid y múltiples variantes.
 */
export const CodeplexAcordeon = ({
    elementos,
    multiple = false,
    variante = 'simple',
    idsAbiertosInicialmente,
    alCambiar,
    clase = '',
}: CodeplexAcordeonProps) => {
    const [idsAbiertos, setIdsAbiertos] = useState<string[]>(idsAbiertosInicialmente || []);

    const alternarItem = (id: string) => {
        const estaAbierto = idsAbiertos.includes(id);
        let siguiente: string[];

        if (estaAbierto) {
            // Cerrar
            siguiente = idsAbiertos.filter((x) => x !== id);
        } else {
            // Abrir
            siguiente = multiple ? [...idsAbiertos, id] : [id];
        }

        setIdsAbiertos(siguiente);
        if (alCambiar) alCambiar(siguiente);
    };

    const clasesContenedor = {
        simple:
            'divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700',
        bordeado:
            'border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700',
        separado: 'flex flex-col gap-2', // Sin bordes externos, items separados
    };

    const obtenerClasesItem = (estaAbierto: boolean, estaDeshabilitado: boolean) => {
        if (variante === 'separado') {
            return `
          border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 
          shadow-sm transition-all duration-200
          ${estaAbierto
                    ? 'ring-1 ring-blue-500/20 border-blue-500/50'
                    : 'hover:border-gray-300 dark:hover:border-gray-600'
                }
          ${estaDeshabilitado
                    ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
                    : ''
                }
        `;
        }
        return `
        bg-white dark:bg-gray-800 transition-colors
        ${estaDeshabilitado
                ? 'opacity-60 cursor-not-allowed bg-gray-50'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }
      `;
    };

    return (
        <div className={`w-full ${clasesContenedor[variante]} ${clase}`}>
            {elementos.map((item) => {
                const estaAbierto = idsAbiertos.includes(item.id);
                const estaDeshabilitado = !!item.deshabilitado;
                const idContenido = `accordion-content-${item.id}`;
                const idCabecera = `accordion-header-${item.id}`;

                return (
                    <div key={item.id} className={obtenerClasesItem(estaAbierto, estaDeshabilitado)}>
                        {/* Cabecera / Gatillo */}
                        <h3>
                            <button
                                id={idCabecera}
                                type="button"
                                aria-expanded={estaAbierto}
                                aria-controls={idContenido}
                                disabled={estaDeshabilitado}
                                onClick={() => !estaDeshabilitado && alternarItem(item.id)}
                                className={`
                    w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500
                  `}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {item.iconoIzquierda && (
                                        <span
                                            className={`text-xl ${estaAbierto
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-400'
                                                }`}
                                        >
                                            {item.iconoIzquierda}
                                        </span>
                                    )}
                                    <div className="flex flex-col text-left">
                                        <span
                                            className={`text-sm font-semibold ${estaAbierto
                                                ? 'text-blue-700 dark:text-blue-300'
                                                : 'text-gray-900 dark:text-white'
                                                }`}
                                        >
                                            {item.titulo}
                                        </span>
                                        {item.subtitulo && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {item.subtitulo}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Chevron Animado */}
                                <svg
                                    className={`
                      w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out flex-shrink-0
                      ${estaAbierto
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

                        {/* Contenido con Animación Grid */}
                        <div
                            id={idContenido}
                            role="region"
                            aria-labelledby={idCabecera}
                            className={`
                  grid transition-[grid-template-rows] duration-300 ease-out
                  ${estaAbierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={`px-5 pb-5 pt-0 text-sm text-gray-600 dark:text-gray-300 leading-relaxed`}
                                >
                                    {/* Separador suave si es separado para que no pegue el texto al título */}
                                    {variante === 'separado' && <div className="h-2"></div>}
                                    {item.contenido}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
