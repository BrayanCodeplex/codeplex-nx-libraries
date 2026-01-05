import React, { useState, useEffect } from 'react';
import { CodeplexInfoUsuario } from '../cabecera/cabecera';

export interface CodeplexElementoMenuLateral {
    id: string;
    etiqueta: string;
    icono?: React.ReactNode;
    href?: string;
    activo?: boolean;
    deshabilitado?: boolean;
    insignia?: string;
    hijos?: CodeplexElementoMenuLateral[];
    alHacerClick?: () => void;
}

export interface CodeplexBarraLateralProps {
    elementos: CodeplexElementoMenuLateral[];
    usuario?: CodeplexInfoUsuario;
    logo?: string;
    textoLogo?: string;
    colapsado?: boolean;
    cerrarAlNavegar?: boolean;
    alAlternar?: (colapsado: boolean) => void;
    alNavegar?: (href: string) => void;
    alCerrarSesion?: () => void;
    mostrarPie?: boolean;
    children?: React.ReactNode;
    // Spanish
    ancho?: number;
}

export const CodeplexBarraLateral = ({
    elementos,
    usuario,
    logo,
    textoLogo = 'Codeplex',
    colapsado = false,
    cerrarAlNavegar = true,
    alAlternar,
    alNavegar,
    alCerrarSesion,
    mostrarPie = true,
    children,
    ancho = 256,
}: CodeplexBarraLateralProps) => {
    const [estaColapsado, setEstaColapsado] = useState(colapsado);
    const [estaMovilAbierto, setEstaMovilAbierto] = useState(false);
    const [itemsExpandidos, setItemsExpandidos] = useState<string[]>([]);

    // Sincronizar ítems activos con la expansión inicial
    useEffect(() => {
        const padresActivos = elementos
            .filter((i) => i.activo && i.hijos && i.hijos.length > 0)
            .map((i) => i.id);

        if (padresActivos.length > 0) {
            setItemsExpandidos((prev) => [...new Set([...prev, ...padresActivos])]);
        }
    }, [elementos]);

    useEffect(() => {
        setEstaColapsado(colapsado);
    }, [colapsado]);

    const alternarColapso = () => {
        const nuevoValor = !estaColapsado;
        setEstaColapsado(nuevoValor);
        if (alAlternar) alAlternar(nuevoValor);
    };

    const alternarMovil = () => {
        setEstaMovilAbierto(!estaMovilAbierto);
    };

    const cerrarMovil = () => {
        setEstaMovilAbierto(false);
    };

    const alternarItem = (idItem: string) => {
        if (itemsExpandidos.includes(idItem)) {
            setItemsExpandidos(itemsExpandidos.filter((id) => id !== idItem));
        } else {
            setItemsExpandidos([...itemsExpandidos, idItem]);
        }
    };

    const manejarNavegacion = (href?: string) => {
        if (!href) return;

        if (alNavegar) {
            alNavegar(href);
        }

        if (cerrarAlNavegar && typeof window !== 'undefined') {
            if (window.innerWidth < 1024) {
                setEstaMovilAbierto(false);
            }
        }
    };

    const anchoEstilo = estaColapsado ? '4rem' : `${ancho}px`;

    return (
        <>
            {/* Botón hamburguesa MOBILE */}
            <button
                type="button"
                className="fixed top-3 left-3 z-50 p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={alternarMovil}
                aria-label={estaMovilAbierto ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {estaMovilAbierto ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Backdrop MOBILE */}
            {estaMovilAbierto && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={cerrarMovil}
                    aria-hidden="true"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen
          bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
          transition-all duration-300
          flex flex-col
          ${estaMovilAbierto ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
                style={{ width: anchoEstilo }}
            >
                {/* CABECERA CON LOGO / TOGGLE */}
                <div
                    className="
            flex items-center justify-between
            h-14 flex-shrink-0
            pr-4 lg:px-4
            pl-14 lg:pl-4
            border-b border-gray-200 dark:border-gray-700
          "
                >
                    {!estaColapsado && (
                        <div className="flex items-center gap-3 overflow-hidden">
                            {logo && <img src={logo} alt="Logo" className="w-8 h-8" />}
                            <span className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                {textoLogo}
                            </span>
                        </div>
                    )}

                    {/* Botón colapsar SOLO DESKTOP */}
                    <button
                        type="button"
                        className="hidden lg:inline-flex p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={alternarColapso}
                        aria-label={estaColapsado ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {estaColapsado ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* MENU CON SCROLL OCULTO */}
                <nav
                    className="
            flex-1 px-3 py-4 overflow-y-auto
            [&::-webkit-scrollbar]:hidden
          "
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <ul className="space-y-2">
                        {elementos.map((item) => {
                            const tieneHijos = !!item.hijos && item.hijos.length > 0;
                            const estaExpandido = itemsExpandidos.includes(item.id);

                            const clasesBaseItem = `
                flex items-center w-full p-2 rounded-lg
                text-gray-900 dark:text-white
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200
                ${item.activo
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                                    : ''
                                }
                ${item.deshabilitado ? 'opacity-50 cursor-not-allowed' : ''}
              `;

                            return (
                                <li key={item.id}>
                                    {tieneHijos ? (
                                        <>
                                            <button
                                                type="button"
                                                className={clasesBaseItem}
                                                onClick={() => {
                                                    if (item.deshabilitado) return;
                                                    alternarItem(item.id);
                                                }}
                                                disabled={item.deshabilitado}
                                            >
                                                {item.icono && (
                                                    <span className="text-xl flex-shrink-0">
                                                        {item.icono}
                                                    </span>
                                                )}
                                                {!estaColapsado && (
                                                    <>
                                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                            {item.etiqueta}
                                                        </span>
                                                        {item.insignia && (
                                                            <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                                {item.insignia}
                                                            </span>
                                                        )}
                                                        <svg
                                                            className={`
                                w-5 h-5 transition-transform duration-200
                                ${estaExpandido ? 'rotate-180' : ''}
                              `}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>

                                            {/* Submenú */}
                                            {!estaColapsado && estaExpandido && (
                                                <ul className="py-2 space-y-1 pl-6 animate-fade-in">
                                                    {item.hijos!.map((hijo) => (
                                                        <li key={hijo.id}>
                                                            <a
                                                                href={hijo.href}
                                                                className={`
                                  flex items-center p-2 rounded-lg
                                  text-gray-900 dark:text-white
                                  hover:bg-gray-100 dark:hover:bg-gray-700
                                  transition-colors duration-200
                                  ${hijo.activo
                                                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                                                                        : ''
                                                                    }
                                `}
                                                                onClick={(e) => {
                                                                    if (alNavegar && hijo.href) {
                                                                        e.preventDefault();
                                                                        manejarNavegacion(hijo.href);
                                                                    } else if (hijo.alHacerClick) {
                                                                        hijo.alHacerClick();
                                                                        manejarNavegacion();
                                                                    }
                                                                }}
                                                            >
                                                                {hijo.icono && (
                                                                    <span className="text-lg flex-shrink-0">
                                                                        {hijo.icono}
                                                                    </span>
                                                                )}
                                                                <span className="ml-3">{hijo.etiqueta}</span>
                                                                {hijo.insignia && (
                                                                    <span className="inline-flex items-center justify-center px-2 ml-auto text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                                        {hijo.insignia}
                                                                    </span>
                                                                )}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className={clasesBaseItem}
                                            onClick={(e) => {
                                                if (item.deshabilitado) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                if (alNavegar && item.href) {
                                                    e.preventDefault();
                                                    manejarNavegacion(item.href);
                                                } else {
                                                    if (item.alHacerClick) item.alHacerClick();
                                                    manejarNavegacion();
                                                }
                                            }}
                                        >
                                            {item.icono && (
                                                <span className="text-xl flex-shrink-0">
                                                    {item.icono}
                                                </span>
                                            )}
                                            {!estaColapsado && (
                                                <>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                                        {item.etiqueta}
                                                    </span>
                                                    {item.insignia && (
                                                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                            {item.insignia}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* PIE DE PAGINA USUARIO */}
                {mostrarPie && usuario && (
                    <div className="border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <div className="flex items-center p-4">
                            {usuario.avatar ? (
                                <img
                                    src={usuario.avatar}
                                    alt={usuario.nombre}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600">
                                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                        {usuario.nombre.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}

                            {!estaColapsado && (
                                <div className="flex-1 ml-3 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {usuario.nombre}
                                    </p>
                                    {usuario.email && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {usuario.email}
                                        </p>
                                    )}
                                    {usuario.rol && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {usuario.rol}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!estaColapsado && alCerrarSesion && (
                                <button
                                    type="button"
                                    className="p-2 ml-1 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={alCerrarSesion}
                                    aria-label="Cerrar sesión"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Slot extra */}
                {children}
            </aside>
        </>
    );
};
