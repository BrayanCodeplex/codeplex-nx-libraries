import React from 'react';

export type CodeplexCardVariant = 'default' | 'outline' | 'soft';
export type CodeplexCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CodeplexCardProps extends React.HTMLAttributes<HTMLElement> {
    variant?: CodeplexCardVariant;
    padding?: CodeplexCardPadding;
    hoverable?: boolean;
    clickable?: boolean;
    media?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

export const CodeplexCard = ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    clickable = false,
    className = '',
    media,
    header,
    footer,
    children,
    ...props
}: CodeplexCardProps) => {
    const variantClass =
        variant === 'outline'
            ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
            : variant === 'soft'
                ? 'bg-gray-50 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700/60'
                : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800';

    const paddingClass =
        padding === 'none'
            ? 'p-0'
            : padding === 'sm'
                ? 'p-3'
                : padding === 'lg'
                    ? 'p-6'
                    : 'p-4';

    const interactiveClass = clickable
        ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60'
        : '';

    const hoverClass =
        hoverable || clickable
            ? 'transition-shadow transition-transform hover:shadow-md hover:-translate-y-[1px]'
            : 'transition-shadow';

    return (
        <article
            className={`
        relative
        rounded-xl
        shadow-sm
        ${variantClass}
        ${paddingClass}
        ${hoverClass}
        ${interactiveClass}
        ${className}
      `}
            {...props}
        >
            {/* Media opcional */}
            {media}

            {/* Header opcional */}
            {header}

            {/* Contenido principal */}
            {children}

            {/* Footer opcional */}
            {footer}
        </article>
    );
};
