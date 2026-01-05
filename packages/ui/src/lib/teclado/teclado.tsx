import React from 'react';

export type CodeplexTecladoTamano = 'sm' | 'md' | 'lg';

export interface CodeplexTecladoProps extends React.HTMLAttributes<HTMLElement> {
    // Spanish
    teclas?: string[];
    tamano?: CodeplexTecladoTamano;
}

export const CodeplexTeclado = ({
    teclas,
    tamano = 'md',
    className = '',
    children,
    ...props
}: CodeplexTecladoProps) => {

    const sizeClasses =
        tamano === 'sm'
            ? 'text-[10px] px-1.5 py-0.5'
            : tamano === 'lg'
                ? 'text-xs px-2.5 py-1.5'
                : 'text-[11px] px-2 py-1';

    const baseKbd =
        'inline-flex items-center justify-center rounded border border-gray-300 bg-gray-50 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 font-mono shadow-sm';

    if (teclas && teclas.length > 0) {
        return (
            <span className={`inline-flex items-center gap-1 ${className}`} {...props}>
                {teclas.map((key, i) => (
                    <kbd key={key + i} className={`${baseKbd} ${sizeClasses}`}>
                        {key}
                    </kbd>
                ))}
            </span>
        );
    }

    // Versión con children para contenido custom
    return (
        <kbd className={`${baseKbd} ${sizeClasses} ${className}`} {...props}>
            {children}
        </kbd>
    );
};

export const CodeplexKbd = CodeplexTeclado;
