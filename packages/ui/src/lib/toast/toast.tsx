import React from 'react';

export type CodeplexToastVariant = 'info' | 'success' | 'warning' | 'error';

export type CodeplexToastPosition =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export interface CodeplexToastProps {
    open: boolean;
    variant?: CodeplexToastVariant;
    title: string;
    subtitle?: string;
    position?: CodeplexToastPosition;
    showIcon?: boolean;
    dismissible?: boolean;
    onClose?: () => void;
}

export const CodeplexToast = ({
    open,
    variant = 'info',
    title,
    subtitle,
    position = 'bottom-right',
    showIcon = true,
    dismissible = true,
    onClose,
}: CodeplexToastProps) => {
    if (!open) return null;

    const variantClasses =
        variant === 'success'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-50 dark:border-emerald-700'
            : variant === 'warning'
                ? 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-50 dark:border-amber-700'
                : variant === 'error'
                    ? 'bg-red-50 text-red-900 border-red-200 dark:bg-red-900/40 dark:text-red-50 dark:border-red-700'
                    : 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/40 dark:text-blue-50 dark:border-blue-700';

    const iconWrapperClasses =
        variant === 'success'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-100'
            : variant === 'warning'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/80 dark:text-amber-100'
                : variant === 'error'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/80 dark:text-red-100'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/80 dark:text-blue-100';

    const Icon = () => {
        if (variant === 'success') {
            return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm4.3 8.3-4.58 4.59a1 1 0 0 1-1.42 0L7.7 12.29a1 1 0 0 1 1.4-1.42l1.9 1.89 3.88-3.88a1 1 0 1 1 1.42 1.42Z"
                    />
                </svg>
            );
        }

        if (variant === 'warning') {
            return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 13h-2v-2h2Zm0-4h-2V7h2Z"
                    />
                </svg>
            );
        }

        if (variant === 'error') {
            return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm3.71 12.29a1 1 0 1 1-1.42 1.42L12 13.41l-2.29 2.3a1 1 0 0 1-1.42-1.42L10.59 12 8.3 9.71a1 1 0 0 1 1.42-1.42L12 10.59l2.29-2.3a1 1 0 0 1 1.42 1.42L13.41 12Z"
                    />
                </svg>
            );
        }

        // info
        return (
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14h-2v-4h2Zm0-6h-2V8h2Z"
                />
            </svg>
        );
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return `
          top-4 inset-x-2
          sm:inset-x-auto sm:top-4 sm:left-4
          flex justify-center sm:justify-start
        `;
            case 'top-center':
                return `
          top-4 inset-x-2
          flex justify-center
        `;
            case 'top-right':
                return `
          top-4 inset-x-2
          sm:inset-x-auto sm:top-4 sm:right-4
          flex justify-center sm:justify-end
        `;
            case 'bottom-left':
                return `
          bottom-4 inset-x-2
          sm:inset-x-auto sm:bottom-4 sm:left-4
          flex justify-center sm:justify-start
        `;
            case 'bottom-center':
                return `
          bottom-4 inset-x-2
          flex justify-center
        `;
            case 'bottom-right':
            default:
                return `
          bottom-4 inset-x-2
          sm:inset-x-auto sm:bottom-4 sm:right-4
          flex justify-center sm:justify-end
        `;
        }
    };

    const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';

    return (
        <div
            className={`
        fixed z-50 pointer-events-none
        ${getPositionClasses()}
      `}
            aria-live={role === 'alert' ? 'assertive' : 'polite'}
            aria-atomic="true"
        >
            <div
                className={`
          max-w-sm w-full
          rounded-lg border shadow-lg
          px-4 py-3
          flex items-start gap-3
          ${variantClasses}
          pointer-events-auto
        `}
                role={role}
            >
                {showIcon && (
                    <div
                        className={`
              mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center
              rounded-full
              ${iconWrapperClasses}
            `}
                    >
                        <Icon />
                    </div>
                )}

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{title}</p>
                    {subtitle && (
                        <p className="mt-0.5 text-xs sm:text-sm text-current/90 break-words">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Botón cerrar */}
                {dismissible && onClose && (
                    <button
                        type="button"
                        className="ml-2 inline-flex text-xs text-current/70 hover:text-current focus:outline-none focus:ring-2 focus:ring-current/40 rounded"
                        aria-label="Cerrar notificación"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};
