import React from 'react';

export type CodeplexSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeplexSpinnerColor = 'primary' | 'white' | 'gray' | 'success' | 'danger' | 'warning';
export type CodeplexSpinnerType = 'border' | 'dots' | 'ping';

export interface CodeplexSpinnerProps {
    size?: CodeplexSpinnerSize;
    color?: CodeplexSpinnerColor;
    type?: CodeplexSpinnerType;
    label?: string;
    labelPosition?: 'right' | 'bottom';
    fullScreen?: boolean;
    className?: string;
}

export const CodeplexSpinner = ({
    size = 'md',
    color = 'primary',
    type = 'border',
    label,
    labelPosition = 'right',
    fullScreen = false,
    className = '',
}: CodeplexSpinnerProps) => {
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    const colorClasses = {
        primary: 'text-blue-600 dark:text-blue-500',
        white: 'text-white',
        gray: 'text-gray-400 dark:text-gray-300',
        success: 'text-emerald-600 dark:text-emerald-500',
        danger: 'text-red-600 dark:text-red-500',
        warning: 'text-yellow-500',
    };

    const renderIcon = () => {
        const sClass = sizeClasses[size];
        const cClass = colorClasses[color];

        if (type === 'dots') {
            return (
                <div className={`flex items-center justify-center gap-1 ${cClass} ${className}`}>
                    <div className={`${size === 'xl' ? 'w-3 h-3' : 'w-1.5 h-1.5'} bg-current rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
                    <div className={`${size === 'xl' ? 'w-3 h-3' : 'w-1.5 h-1.5'} bg-current rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
                    <div className={`${size === 'xl' ? 'w-3 h-3' : 'w-1.5 h-1.5'} bg-current rounded-full animate-bounce`}></div>
                </div>
            );
        }

        if (type === 'ping') {
            return (
                <span className={`relative flex ${sClass} ${className}`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 ${cClass}`}></span>
                    <span className={`relative inline-flex rounded-full h-full w-full bg-current ${cClass}`}></span>
                </span>
            );
        }

        return (
            <svg
                className={`animate-spin ${sClass} ${cClass} ${className}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        );
    };

    const content = (
        <div
            role="status"
            className={`
        inline-flex items-center
        ${labelPosition === 'bottom' ? 'flex-col gap-3' : 'flex-row gap-2'}
      `}
        >
            {renderIcon()}
            {label && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {label}
                </span>
            )}
            {!label && <span className="sr-only">Cargando...</span>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity">
                {content}
            </div>
        );
    }

    return content;
};
