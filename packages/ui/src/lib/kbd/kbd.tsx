import React from 'react';

export type CodeplexKbdSize = 'sm' | 'md' | 'lg';

export interface CodeplexKbdProps extends React.HTMLAttributes<HTMLElement> {
    keys?: string[]; // e.g. ['Ctrl', 'K']
    size?: CodeplexKbdSize;
}

export const CodeplexKbd = ({ keys, size = 'md', className = '', children, ...props }: CodeplexKbdProps) => {
    const sizeClasses =
        size === 'sm'
            ? 'text-[10px] px-1.5 py-0.5'
            : size === 'lg'
                ? 'text-xs px-2.5 py-1.5'
                : 'text-[11px] px-2 py-1';

    const baseKbd =
        'inline-flex items-center justify-center rounded border border-gray-300 bg-gray-50 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 font-mono shadow-sm';

    if (keys && keys.length > 0) {
        return (
            <span className={`inline-flex items-center gap-1 ${className}`} {...props}>
                {keys.map((key, i) => (
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
