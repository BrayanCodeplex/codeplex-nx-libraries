import React, { useState } from 'react';

export type CodeplexAlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface CodeplexAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CodeplexAlertVariant;
    title?: string;
    description?: string;
    icon?: string;
    dismissible?: boolean;
    open?: boolean;
    onClose?: () => void;
}

export const CodeplexAlert = ({
    variant = 'info',
    title,
    description,
    icon,
    dismissible = false,
    open,
    onClose,
    className = '',
    children,
    ...props
}: CodeplexAlertProps) => {
    const [internalOpen, setInternalOpen] = useState(true);

    const isOpen = open !== undefined ? open : internalOpen;
    if (!isOpen) return null;

    const resolvedIcon =
        icon ??
        (variant === 'success'
            ? '✅'
            : variant === 'warning'
                ? '⚠️'
                : variant === 'danger'
                    ? '⛔'
                    : 'ℹ️');

    const variantClasses =
        variant === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-900/30 dark:text-emerald-50'
            : variant === 'warning'
                ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/70 dark:bg-amber-900/30 dark:text-amber-50'
                : variant === 'danger'
                    ? 'border-red-200 bg-red-50 text-red-900 dark:border-red-800/70 dark:bg-red-900/30 dark:text-red-50'
                    : 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/70 dark:bg-blue-900/30 dark:text-blue-50';

    const handleClose = () => {
        if (open === undefined) {
            setInternalOpen(false);
        }
        if (onClose) onClose();
    };

    return (
        <div
            role="alert"
            className={`
        w-full mb-3
        rounded-lg border
        px-3 py-3.5 sm:px-4 sm:py-3.5
        ${variantClasses}
        ${className}
      `}
            {...props}
        >
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                {/* Icono */}
                <div className="flex-shrink-0 mt-0.5 sm:mt-0 text-lg sm:text-xl">
                    {resolvedIcon}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0 text-xs sm:text-sm leading-relaxed">
                    {title && (
                        <p className="font-semibold mb-0.5 sm:mb-1 truncate">
                            {title}
                        </p>
                    )}

                    {description && (
                        <p className="text-[11px] sm:text-xs md:text-sm opacity-90">
                            {description}
                        </p>
                    )}

                    {/* Slot para contenido extra */}
                    {children}
                </div>

                {/* Botón de cierre */}
                {dismissible && (
                    <button
                        type="button"
                        className="
              self-start sm:self-center
              -mr-1 sm:ml-2
              inline-flex h-7 w-7 items-center justify-center
              rounded-md
              text-xs sm:text-sm
              hover:bg-black/5 dark:hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500
            "
                        aria-label="Cerrar alerta"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};
