import React from 'react';

export type CodeplexEncabezadoAlineacion = 'left' | 'center';

export interface CodeplexEncabezadoPrincipalProps extends React.HTMLAttributes<HTMLElement> {
    // Spanish
    antetitulo?: string;
    titulo?: string;
    subtitulo?: string;
    alineacion?: CodeplexEncabezadoAlineacion;
    etiquetaPrimaria?: string;
    etiquetaSecundaria?: string;
    alClickPrimario?: () => void;
    alClickSecundario?: () => void;
    alturaCompleta?: boolean;
    urlImagenFondo?: string;
    capaOscura?: boolean;
}

export const CodeplexEncabezadoPrincipal = ({
    antetitulo,
    titulo,
    subtitulo,
    alineacion = 'left',
    etiquetaPrimaria,
    etiquetaSecundaria,
    alClickPrimario,
    alClickSecundario,
    alturaCompleta = false,
    urlImagenFondo,
    capaOscura = true,
    className = '',
    children,
    ...props
}: CodeplexEncabezadoPrincipalProps) => {

    const alignClasses =
        alineacion === 'center'
            ? 'text-center items-center'
            : 'text-left items-start';

    const hasBackgroundImage = !!urlImagenFondo;

    return (
        <section
            className={`
        relative overflow-hidden
        border border-gray-200/80 dark:border-gray-700/80
        rounded-2xl
        px-6 py-10 md:px-10 md:py-14
        shadow-sm
        flex
        ${alturaCompleta ? 'min-h-[60vh]' : ''}
        ${hasBackgroundImage
                    ? 'bg-cover bg-center'
                    : 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950'
                }
        ${className}
      `}
            style={
                hasBackgroundImage
                    ? { backgroundImage: `url(${urlImagenFondo})` }
                    : undefined
            }
            {...props}
        >
            {hasBackgroundImage && capaOscura && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            )}

            {/* Contenido */}
            <div
                className={`
          relative z-10
          max-w-3xl mx-auto flex flex-col gap-6
          ${alignClasses}
        `}
            >
                {antetitulo && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/60 dark:text-blue-100">
                        {antetitulo}
                    </span>
                )}

                <div className="space-y-3 md:space-y-4">
                    <h1
                        className={`
              text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight
              ${hasBackgroundImage ? 'text-white' : 'text-gray-900 dark:text-white'}
            `}
                    >
                        {titulo}
                    </h1>
                    {subtitulo && (
                        <p
                            className={`
                text-base md:text-lg max-w-2xl
                ${hasBackgroundImage
                                    ? 'text-gray-100/90'
                                    : 'text-gray-600 dark:text-gray-300'
                                }
              `}
                        >
                            {subtitulo}
                        </p>
                    )}
                </div>

                {/* Acciones */}
                {(etiquetaPrimaria || etiquetaSecundaria) && (
                    <div
                        className={`
              flex flex-wrap gap-3 mt-2
              ${alineacion === 'center' ? 'justify-center' : 'justify-start'}
            `}
                    >
                        {etiquetaPrimaria && alClickPrimario && (
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={alClickPrimario}
                            >
                                {etiquetaPrimaria}
                            </button>
                        )}

                        {etiquetaSecundaria && alClickSecundario && (
                            <button
                                type="button"
                                className={`
                  inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg border
                  ${hasBackgroundImage
                                        ? 'border-white/60 text-white bg-white/5 hover:bg-white/10'
                                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700'
                                    }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
                                onClick={alClickSecundario}
                            >
                                {etiquetaSecundaria}
                            </button>
                        )}
                    </div>
                )}

                {/* Children para contenido extra */}
                {children}
            </div>
        </section>
    );
};

export const CodeplexJumbotron = CodeplexEncabezadoPrincipal;
