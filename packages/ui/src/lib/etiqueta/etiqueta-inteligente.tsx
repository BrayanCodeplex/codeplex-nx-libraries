import React from 'react';
import { CodeplexPopupRequisitos } from './popup-requisitos';

export interface CodeplexEtiquetaInteligenteProps extends React.HTMLAttributes<HTMLDivElement> {
    // Spanish
    para?: string;
    texto?: string;
    obligatorio?: boolean;
    requisitos?: string[];
}

export const CodeplexEtiquetaInteligente = ({
    para,
    texto,
    obligatorio,
    requisitos,
    className = '',
    children,
    ...props
}: CodeplexEtiquetaInteligenteProps) => {

    return (
        <div className={`flex items-center gap-2 mb-1.5 ${className}`} {...props}>
            <label
                htmlFor={para}
                className="text-sm font-medium text-gray-800 dark:text-gray-100 cursor-pointer select-none"
            >
                {texto}
            </label>

            {obligatorio && (
                // VERIFICACIÓN: Si requisitos tiene datos, muestra el Popup. Si no, el asterisco simple.
                requisitos && requisitos.length > 0 ? (
                    <CodeplexPopupRequisitos requisitos={requisitos} />
                ) : (
                    <span className="text-xs text-red-500 font-bold select-none" title="Campo obligatorio">*</span>
                )
            )}

            {children}
        </div>
    );
};

export const CodeplexSmartLabel = CodeplexEtiquetaInteligente;
