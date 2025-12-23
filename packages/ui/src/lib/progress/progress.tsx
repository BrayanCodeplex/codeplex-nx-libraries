import React from 'react';

export type CodeplexProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'gradient';
export type CodeplexProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeplexProgressLabelAlign = 'left' | 'center' | 'right';

export interface CodeplexProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    label?: string;
    showPercentage?: boolean;
    labelInside?: boolean;
    labelAlign?: CodeplexProgressLabelAlign;
    striped?: boolean;
    animated?: boolean;
    indeterminate?: boolean;
    size?: CodeplexProgressSize;
    variant?: CodeplexProgressVariant;
}

export const CodeplexProgress = ({
    value = 0,
    max = 100,
    label,
    showPercentage = false,
    labelInside = false,
    labelAlign = 'left',
    striped = false,
    animated = false,
    indeterminate = false,
    size = 'md',
    variant = 'primary',
    className = '',
    ...props
}: CodeplexProgressProps) => {
    const safeValue = Math.max(0, Math.min(value, max));
    const percentage = Math.round((safeValue / max) * 100);

    const sizeClasses = {
        xs: 'h-1.5 text-[0px]',
        sm: 'h-2.5 text-[10px]',
        md: 'h-4 text-xs',
        lg: 'h-6 text-sm',
        xl: 'h-8 text-base',
    };

    const variantClasses = {
        primary: 'bg-blue-600 dark:bg-blue-500',
        success: 'bg-emerald-500 dark:bg-emerald-400',
        warning: 'bg-amber-500 dark:bg-amber-400',
        danger: 'bg-red-600 dark:bg-red-500',
        neutral: 'bg-gray-600 dark:bg-gray-500',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500',
    };

    const stripeStyle = striped || animated || indeterminate
        ? {
            backgroundImage:
                'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
            backgroundSize: '1rem 1rem',
        }
        : {};

    const animationClass = animated || indeterminate ? 'animate-[progress-stripes_1s_linear_infinite]' : '';

    const renderOutsideLabels = () => {
        if (labelInside || (!label && !showPercentage)) return null;
        return (
            <div className={`flex mb-1 ${labelAlign === 'center' ? 'justify-center' : labelAlign === 'right' ? 'justify-end' : 'justify-between'}`}>
                {label && <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">{label}</span>}
                {showPercentage && (
                    <span className={`text-xs font-semibold text-gray-700 dark:text-gray-200 ${labelAlign === 'center' || labelAlign === 'right' ? 'ml-2' : ''}`}>
                        {indeterminate ? '' : `${percentage}%`}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className={`w-full ${className}`} {...props}>
            {renderOutsideLabels()}

            <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden ${sizeClasses[size]}`}>
                <div
                    className={`
            h-full rounded-full
            relative overflow-hidden
            flex items-center justify-center
            text-white font-medium leading-none
            transition-all duration-500 ease-out
            ${variantClasses[variant]}
            ${indeterminate ? 'w-full origin-left animate-pulse' : ''} 
          `}
                    style={{
                        width: indeterminate ? '100%' : `${percentage}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={indeterminate ? undefined : safeValue}
                    aria-valuemin={0}
                    aria-valuemax={max}
                    aria-label={label || 'Progress bar'}
                >
                    {/* Capa de Rayas */}
                    {(striped || animated || indeterminate) && (
                        <div
                            className={`absolute inset-0 w-full h-full z-0 ${animationClass}`}
                            style={stripeStyle}
                        />
                    )}

                    {/* Capa de Texto */}
                    {labelInside && !indeterminate && size !== 'xs' && (
                        <span className="relative z-10 px-2 truncate drop-shadow-sm">
                            {label} {showPercentage ? ` ${percentage}%` : ''}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
