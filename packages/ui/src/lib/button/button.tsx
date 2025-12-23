import React from 'react';

export type CodeplexButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';

export type CodeplexButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CodeplexButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: CodeplexButtonVariant;
    size?: CodeplexButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const CodeplexButton = React.forwardRef<HTMLButtonElement, CodeplexButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        disabled = false,
        fullWidth = false,
        loading = false,
        leftIcon,
        rightIcon,
        type = 'button',
        className = '',
        children,
        ...props
    }, ref) => {
        const baseClasses =
            'inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ' +
            'focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ' +
            'transition-colors transition-shadow';

        const variantClasses: Record<CodeplexButtonVariant, string> = {
            primary:
                'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 ' +
                'active:bg-blue-800 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600',
            secondary:
                'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200 hover:border-gray-300 ' +
                'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700',
            outline:
                'bg-transparent border-gray-300 text-gray-900 hover:bg-gray-50 ' +
                'dark:border-gray-600 dark:text-gray-50 dark:hover:bg-gray-800',
            ghost:
                'bg-transparent border-transparent text-gray-700 hover:bg-gray-100 ' +
                'dark:text-gray-100 dark:hover:bg-gray-800',
            danger:
                'bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 ' +
                'active:bg-red-800 dark:bg-red-500 dark:border-red-500 dark:hover:bg-red-600',
            success:
                'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 ' +
                'active:bg-emerald-800 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600',
        };

        const sizeClasses: Record<CodeplexButtonSize, string> = {
            xs: 'px-2 py-1 text-[11px]',
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-5 py-2.5 text-base',
        };

        const widthClass = fullWidth ? 'w-full' : 'w-full sm:w-auto';

        const isDisabled = disabled || loading;

        const classes = [
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            widthClass,
            loading ? 'cursor-wait' : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <button
                ref={ref}
                type={type}
                className={classes}
                disabled={isDisabled}
                aria-busy={loading ? 'true' : 'false'}
                {...props}
            >
                {/* Spinner de loading */}
                {loading && (
                    <span className="inline-flex h-4 w-4 items-center justify-center">
                        <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-white/40 border-t-white dark:border-t-gray-100" />
                    </span>
                )}

                {/* Icono izquierdo */}
                {!loading && leftIcon && (
                    <span className="text-sm leading-none">{leftIcon}</span>
                )}

                {/* Contenido principal */}
                <span className="inline-flex items-center justify-center">
                    {children}
                </span>

                {/* Icono derecho */}
                {!loading && rightIcon && (
                    <span className="text-sm leading-none">{rightIcon}</span>
                )}
            </button>
        );
    }
);

CodeplexButton.displayName = 'CodeplexButton';
