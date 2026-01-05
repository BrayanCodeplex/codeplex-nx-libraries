import React from 'react';

export interface CodeplexAyudaEntradaProps {
    // Spanish
    textoAyuda?: string;
    error?: string; // Error message often comes from libs, keeping 'error' might be ok, or map it. Let's map it if possible but error strings are universal. Let's keep `error` as prop name if standard, or `errorMensaje`? The previous code had `error`. I'll keep `error` as it is a standard prop in forms, or `mensajeError`. Let's use `mensajeError`.
    mensajeError?: string;
    valor?: string | number;
    longitudMaxima?: number;
    mostrarContador?: boolean;
}

export const CodeplexAyudaEntrada = ({
    textoAyuda,
    mensajeError,
    valor,
    longitudMaxima,
    mostrarContador
}: CodeplexAyudaEntradaProps) => {

    const currentLength = valor?.toString().length || 0;
    const hasError = !!mensajeError;

    const isNearLimit = longitudMaxima ? currentLength >= longitudMaxima * 0.9 : false;
    const isAtLimit = longitudMaxima ? currentLength >= longitudMaxima : false;

    if (!textoAyuda && !mensajeError && !mostrarContador) return null;

    return (
        <div className="flex items-start justify-between mt-1.5 px-1 gap-4">
            {/* Mensaje (Error o Ayuda) */}
            <div className="flex-1 min-w-0">
                {hasError ? (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1 duration-200">
                        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {mensajeError}
                    </p>
                ) : textoAyuda ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                        {textoAyuda}
                    </p>
                ) : null}
            </div>

            {/* Contador de Caracteres Inteligente */}
            {mostrarContador && longitudMaxima && (
                <div
                    className={`
            text-[10px] font-mono font-medium transition-colors duration-300
            ${hasError || isAtLimit
                            ? 'text-red-500'
                            : isNearLimit
                                ? 'text-amber-500'
                                : 'text-gray-400 dark:text-gray-500'
                        }
          `}
                >
                    {currentLength}/{longitudMaxima}
                </div>
            )}
        </div>
    );
};
export const CodeplexInputHelper = ({ helperText, error, value, maxLength, showCount, ...props }: any) => (
    <CodeplexAyudaEntrada
        textoAyuda={helperText}
        mensajeError={error}
        valor={value}
        longitudMaxima={maxLength}
        mostrarContador={showCount}
        {...props}
    />
);
