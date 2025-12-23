import React from 'react';
import { CodeplexRequirementsPopup } from './requirements-popup';

export interface CodeplexSmartLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    htmlFor?: string;
    label: string;
    required?: boolean;
    requirements?: string[];
}

export const CodeplexSmartLabel = ({
    htmlFor,
    label,
    required,
    requirements,
    className = '',
    children,
    ...props
}: CodeplexSmartLabelProps) => {
    return (
        <div className={`flex items-center gap-2 mb-1.5 ${className}`} {...props}>
            <label
                htmlFor={htmlFor}
                className="text-sm font-medium text-gray-800 dark:text-gray-100 cursor-pointer select-none"
            >
                {label}
            </label>

            {required && (
                // VERIFICACIÓN: Si requirements tiene datos, muestra el Popup. Si no, el asterisco simple.
                requirements && requirements.length > 0 ? (
                    <CodeplexRequirementsPopup requirements={requirements} />
                ) : (
                    <span className="text-xs text-red-500 font-bold select-none" title="Campo obligatorio">*</span>
                )
            )}

            {children}
        </div>
    );
};
