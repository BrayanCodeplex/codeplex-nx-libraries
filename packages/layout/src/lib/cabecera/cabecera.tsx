import React from 'react';

export interface CodeplexElementoMigaPan {
    etiqueta: string;
    href?: string;
    alHacerClick?: () => void;
}

export interface CodeplexInfoUsuario {
    nombre: string;
    email?: string;
    rol?: string;
    avatar?: string;
}

export interface CodeplexCabeceraProps extends React.HTMLAttributes<HTMLElement> {
    titulo?: string;
    migasPan?: CodeplexElementoMigaPan[];
    usuario?: CodeplexInfoUsuario;
    mostrarBusqueda?: boolean;
    alBuscar?: (consulta: string) => void;
    alNotificaciones?: () => void;
    alPerfil?: () => void;
    conteoNotificaciones?: number;
    barraLateralColapsada?: boolean;
}

export const CodeplexCabecera = ({
    titulo,
    migasPan,
    usuario,
    mostrarBusqueda = true,
    alBuscar,
    alNotificaciones,
    alPerfil,
    conteoNotificaciones = 0,
    barraLateralColapsada = false,
    className = '',
    children,
    ...props
}: CodeplexCabeceraProps) => {
    const claseDesplazamiento = barraLateralColapsada ? 'lg:left-16' : 'lg:left-64';

    const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (alBuscar) alBuscar(e.target.value);
    };

    return (
        <header
            className={`
        fixed top-0 right-0 z-30
        left-0 ${claseDesplazamiento}
        h-14 md:h-16
        bg-white border-b border-gray-200
        dark:bg-gray-800 dark:border-gray-700
        transition-all duration-300
        flex items-center
        ${className}
      `}
            {...props}
        >
            <div className="w-full pr-4 md:pr-6 pl-14 sm:pl-16 lg:pl-6">
                <div className="flex items-center justify-between gap-3">
                    {/* Sección Izquierda: Título y Migas de Pan */}
                    <div className="flex-1 min-w-0">
                        {migasPan && migasPan.length > 0 ? (
                            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                                    {migasPan.map((miga, index) => (
                                        <li key={index} className="inline-flex items-center min-w-0">
                                            {index > 0 && (
                                                <svg
                                                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                            {miga.href ? (
                                                <a
                                                    href={miga.href}
                                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white truncate"
                                                    onClick={(e) => {
                                                        if (miga.alHacerClick) {
                                                            e.preventDefault();
                                                            miga.alHacerClick();
                                                        }
                                                    }}
                                                >
                                                    {miga.etiqueta}
                                                </a>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    {miga.etiqueta}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        ) : (
                            titulo && (
                                <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">
                                    {titulo}
                                </h1>
                            )
                        )}
                    </div>

                    {/* Sección Central: Búsqueda (escritorio) */}
                    {mostrarBusqueda && (
                        <div className="hidden md:flex flex-1 max-w-md mx-2">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Buscar..."
                                    onChange={manejarBusqueda}
                                />
                            </div>
                        </div>
                    )}

                    {/* Sección Derecha: Acciones y Usuario */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Icono de búsqueda en móvil */}
                        {mostrarBusqueda && (
                            <button
                                type="button"
                                className="inline-flex md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                aria-label="Buscar"
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Notificaciones */}
                        {alNotificaciones && (
                            <button
                                type="button"
                                className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={alNotificaciones}
                                aria-label="Notificaciones"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                {conteoNotificaciones > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[1.25rem]">
                                        {conteoNotificaciones > 99 ? '99+' : conteoNotificaciones}
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Perfil de Usuario */}
                        {usuario && (
                            <button
                                type="button"
                                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={alPerfil}
                                aria-label="Perfil de usuario"
                            >
                                {usuario.avatar ? (
                                    <img
                                        src={usuario.avatar}
                                        alt={usuario.nombre}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {usuario.nombre.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="hidden md:block text-left max-w-[160px]">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {usuario.nombre}
                                    </p>
                                    {usuario.rol && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {usuario.rol}
                                        </p>
                                    )}
                                </div>
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Slot para acciones personalizadas */}
                        {children}
                    </div>
                </div>
            </div>
        </header>
    );
};
