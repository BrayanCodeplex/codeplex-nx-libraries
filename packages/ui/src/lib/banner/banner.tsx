import React, { useState } from 'react';

export type CodeplexBannerVariant =
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral';

export interface CodeplexBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    variant?: CodeplexBannerVariant;
    icon?: string;
    dismissible?: boolean;
    open?: boolean;
    onClose?: () => void;
    fullWidth?: boolean;
}

const variantClasses: Record<CodeplexBannerVariant, string> = {
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-800/60',
    success:
        'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-800/60',
    warning:
        'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-800/60',
    error:
        'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-800/60',
    neutral:
        'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/40 dark:text-gray-100 dark:border-gray-700',
};

export const CodeplexBanner = ({
    title,
    description,
    variant = 'info',
    icon,
    dismissible = false,
    open,
    onClose,
    fullWidth = true,
    className = '',
    children,
    ...props
}: CodeplexBannerProps) => {
    const [internalOpen, setInternalOpen] = useState(true);
    const isOpen = open !== undefined ? open : internalOpen;

    if (!isOpen) return null;

    const classes = variantClasses[variant];

    const resolvedIcon =
        icon ??
        (variant === 'success'
            ? '✅'
            : variant === 'warning'
                ? '⚠️'
                : variant === 'error'
                    ? '⛔'
                    : variant === 'neutral'
                        ? '💡'
                        : 'ℹ️');

    const role =
        variant === 'error' || variant === 'warning' ? 'alert' : 'status';

    const handleClose = () => {
        if (open === undefined) {
            setInternalOpen(false);
        }
        if (onClose) onClose();
    };

    return (
        <div className={fullWidth ? 'w-full' : 'inline-flex'} {...props}>
            <div
                className={`
          flex w-full items-start gap-3 border rounded-lg px-4 py-3
          shadow-sm ${classes} ${className}
        `}
                role={role}
            >
                {/* Icono */}
                {resolvedIcon && (
                    <div className="mt-0.5 text-xl shrink-0" aria-hidden="true">
                        {resolvedIcon}
                    </div>
                )}

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <p className="text-sm font-semibold leading-5 truncate">
                            {title}
                        </p>
                    )}
                    {description && (
                        <p className="mt-0.5 text-xs sm:text-sm leading-5">
                            {description}
                        </p>
                    )}
                    {/* Slot para contenido extra */}
                    {children}
                </div>

                {/* Cerrar */}
                {dismissible && (
                    <button
                        type="button"
                        className="shrink-0 p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                        onClick={handleClose}
                        aria-label="Cerrar aviso"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
                10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};
