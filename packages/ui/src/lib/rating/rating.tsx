import React, { useState } from 'react';

export type CodeplexRatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeplexRatingVariant = 'warning' | 'primary' | 'danger' | 'success';

export interface CodeplexRatingProps {
    value?: number;
    max?: number;
    readOnly?: boolean;
    size?: CodeplexRatingSize;
    variant?: CodeplexRatingVariant;
    showValue?: boolean;
    tooltips?: string[];
    className?: string;
    onChange?: (value: number) => void;
}

export const CodeplexRating = ({
    value = 0,
    max = 5,
    readOnly = false,
    size = 'md',
    variant = 'warning',
    showValue = false,
    tooltips = [],
    className = '',
    onChange,
}: CodeplexRatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
    };

    const variantClasses = {
        warning: 'text-yellow-400',
        primary: 'text-blue-500',
        danger: 'text-red-500',
        success: 'text-emerald-500',
    };

    const activeColor = variantClasses[variant];
    const emptyColor = 'text-gray-300 dark:text-gray-600';

    const handleClick = (v: number) => {
        if (readOnly || !onChange) return;
        onChange(v);
    };

    const handleMouseEnter = (v: number) => {
        if (readOnly) return;
        setHoverValue(v);
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHoverValue(null);
    };

    const displayValue = hoverValue ?? value;

    const currentTooltip = hoverValue && tooltips.length >= hoverValue
        ? tooltips[hoverValue - 1]
        : null;

    return (
        <div className={`inline-flex flex-col ${className}`}>
            <div className="flex items-center gap-1">
                <div
                    className="flex items-center"
                    onMouseLeave={handleMouseLeave}
                    role={readOnly ? 'img' : 'slider'}
                    aria-label="Rating"
                    aria-valuemin={1}
                    aria-valuemax={max}
                    aria-valuenow={displayValue}
                    aria-valuetext={currentTooltip || `${displayValue} de ${max}`}
                >
                    {Array.from({ length: max }, (_, i) => {
                        const starValue = i + 1;
                        const isFilled = starValue <= displayValue;
                        const isHovered = hoverValue === starValue;

                        return (
                            <button
                                key={starValue}
                                type="button"
                                disabled={readOnly}
                                onClick={() => handleClick(starValue)}
                                onMouseEnter={() => handleMouseEnter(starValue)}
                                aria-label={`Calificar ${starValue} estrellas`}
                                className={`
                  relative
                  transition-transform duration-200 ease-out
                  focus:outline-none focus-visible:scale-110
                  ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                  ${sizeClasses[size]}
                  ${isFilled ? activeColor : emptyColor}
                  ${isHovered && !readOnly ? 'scale-125' : ''}
                `}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-full h-full drop-shadow-sm"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        );
                    })}
                </div>

                {showValue && (
                    <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {value}/{max}
                    </span>
                )}
            </div>

            {tooltips.length > 0 && (
                <div className="h-5 mt-1">
                    <span className={`
              text-xs font-medium transition-opacity duration-300
              ${currentTooltip ? 'opacity-100' : 'opacity-0'}
              ${variant === 'danger' ? 'text-red-600' : variant === 'success' ? 'text-emerald-600' : 'text-gray-500 dark:text-gray-400'}
           `}>
                        {currentTooltip || 'Select'}
                    </span>
                </div>
            )}
        </div>
    );
};
