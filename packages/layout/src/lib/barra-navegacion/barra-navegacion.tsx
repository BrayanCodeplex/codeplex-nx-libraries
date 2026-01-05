import React, { useState, useRef, useEffect } from 'react';
import { CodeplexInfoUsuario } from '../cabecera/cabecera';

export interface CodeplexEnlaceNavegacion {
    id: string;
    etiqueta: string;
    href?: string;
    activo?: boolean;
    deshabilitado?: boolean;
    alHacerClick?: () => void;
}

export interface CodeplexBarraNavegacionProps {
    textoLogo?: string;
    srcLogo?: string;
    enlaces?: CodeplexEnlaceNavegacion[];
    usuario?: CodeplexInfoUsuario;
    posicion?: 'fixed' | 'sticky' | 'static';
    clase?: string;
    children?: React.ReactNode;
}

export const CodeplexBarraNavegacion = ({
    textoLogo = 'Codeplex',
    srcLogo,
    enlaces = [],
    usuario,
    posicion = 'sticky',
    clase = '',
    children,
}: CodeplexBarraNavegacionProps) => {
    const [estaAbierto, setEstaAbierto] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const alternar = () => setEstaAbierto(!estaAbierto);
    const cerrar = () => setEstaAbierto(false);

    useEffect(() => {
        const manejarClickFuera = (evento: MouseEvent) => {
            if (
                estaAbierto &&
                navRef.current &&
                !navRef.current.contains(evento.target as Node)
            ) {
                setEstaAbierto(false);
            }
        };
        document.addEventListener('click', manejarClickFuera);
        return () => document.removeEventListener('click', manejarClickFuera);
    }, [estaAbierto]);

    const clasePosicion =
        posicion === 'fixed'
            ? 'fixed top-0 left-0 right-0 z-50'
            : posicion === 'sticky'
                ? 'sticky top-0 z-50'
                : 'relative z-50';

    return (
        <nav
            ref={navRef}
            className={`
        w-full
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-b border-gray-200 dark:border-gray-800
        transition-all duration-200
        ${clasePosicion}
        ${clase}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* IZQUIERDA: Logo y Enlaces de Escritorio */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div
                            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
                            onClick={() => (window.location.href = '/')}
                        >
                            {srcLogo ? (
                                <img
                                    src={srcLogo}
                                    alt={textoLogo}
                                    className="w-8 h-8 rounded-lg object-cover shadow-sm"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                    {textoLogo.charAt(0)}
                                </div>
                            )}
                            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {textoLogo}
                            </span>
                        </div>

                        {/* Enlaces de Escritorio */}
                        <div className="hidden md:flex items-center space-x-1">
                            {enlaces.map((enlace) => (
                                <button
                                    key={enlace.id}
                                    onClick={() => {
                                        if (enlace.deshabilitado) return;
                                        if (enlace.alHacerClick) enlace.alHacerClick();
                                        if (enlace.href) window.location.href = enlace.href;
                                    }}
                                    disabled={enlace.deshabilitado}
                                    className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${enlace.activo
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }
                    ${enlace.deshabilitado
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'
                                        }
                  `}
                                >
                                    {enlace.etiqueta}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* DERECHA: Acciones, Usuario y Toggle Móvil */}
                    <div className="flex items-center gap-4">
                        {/* Slot para acciones extra */}
                        <div className="flex items-center gap-2">{children}</div>

                        {/* Perfil de Usuario (Escritorio y Tablet) */}
                        {usuario && (
                            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <div className="text-right hidden lg:block">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                                        {usuario.nombre}
                                    </p>
                                    {usuario.rol && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {usuario.rol}
                                        </p>
                                    )}
                                </div>
                                <button className="relative group focus:outline-none">
                                    {usuario.avatar ? (
                                        <img
                                            src={usuario.avatar}
                                            alt={usuario.nombre}
                                            className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700 shadow-sm group-hover:ring-2 ring-blue-500/50 transition-all"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:ring-2 ring-blue-500/50 transition-all">
                                            <span className="text-sm font-bold">
                                                {usuario.nombre.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Botón de Menú Móvil */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                onClick={alternar}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                                aria-controls="mobile-menu"
                                aria-expanded={estaAbierto}
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                {estaAbierto ? (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú Móvil (Colapsable) */}
            <div
                className={`
          md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out
          ${estaAbierto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {enlaces.map((enlace) => (
                        <button
                            key={enlace.id}
                            onClick={() => {
                                if (enlace.deshabilitado) return;
                                if (enlace.alHacerClick) enlace.alHacerClick();
                                if (enlace.href) window.location.href = enlace.href;
                                cerrar();
                            }}
                            disabled={enlace.deshabilitado}
                            className={`
                block w-full text-left px-3 py-2 rounded-md text-base font-medium
                ${enlace.activo
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                ${enlace.deshabilitado ? 'opacity-50 cursor-not-allowed' : ''}
              `}
                        >
                            {enlace.etiqueta}
                        </button>
                    ))}
                </div>

                {/* Sección de Perfil de Usuario en Móvil */}
                {usuario && (
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                {usuario.avatar ? (
                                    <img
                                        className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                        src={usuario.avatar}
                                        alt=""
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold">
                                        {usuario.nombre.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-gray-900 dark:text-white">
                                    {usuario.nombre}
                                </div>
                                {usuario.email && (
                                    <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-1">
                                        {usuario.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
