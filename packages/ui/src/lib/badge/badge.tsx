import React from 'react';

export type CodeplexBadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'neutral';

export type CodeplexBadgeSize = 'sm' | 'md';

export interface CodeplexBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
    variant?: CodeplexBadgeVariant;
    size?: CodeplexBadgeSize;
    pill?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onClick?: () => void;
}

export const CodeplexBadge = React.forwardRef<HTMLElement, CodeplexBadgeProps>(
    ({
        label,
        variant = 'neutral',
        size = 'md',
        pill = true,
        iconLeft,
        iconRight,
        className = '',
        onClick,
        ...props
    }, ref) => {
        const base =
            'inline-flex items-center gap-1 font-medium border whitespace-nowrap select-none';

        const sizeClass =
            size === 'sm'
                ? 'text-[11px] px-2 py-0.5'
                : 'text-xs px-2.5 py-1';

        const radiusClass = pill ? 'rounded-full' : 'rounded-md';

        const variantClass =
            variant === 'primary'
                ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800'
                : variant === 'secondary'
                    ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-800'
                    : variant === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800'
                        : variant === 'warning'
                            ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800'
                            : variant === 'danger'
                                ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800'
                                : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';

        const clickableClass = onClick
            ? 'cursor-pointer hover:brightness-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1'
            : '';

        const Tag = onClick ? 'button' : 'span';

        return (
            // @ts-ignore
            <Tag
                ref={ref as any}
                type={onClick ? 'button' : undefined}
                className={`
          ${base}
          ${sizeClass}
          ${radiusClass}
          ${variantClass}
          ${clickableClass}
          ${className}
        `}
                onClick={onClick}
                {...props}
            >
                {iconLeft && <span className="text-xs">{iconLeft}</span>}
                <span>{label}</span>
                {iconRight && <span className="text-xs">{iconRight}</span>}
            </Tag>
        );
    }
);

CodeplexBadge.displayName = 'CodeplexBadge';
