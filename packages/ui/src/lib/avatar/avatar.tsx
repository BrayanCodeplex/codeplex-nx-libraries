import React from 'react';

export type CodeplexAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeplexAvatarShape = 'circle' | 'rounded';
export type CodeplexAvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

export interface CodeplexAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: CodeplexAvatarSize;
    shape?: CodeplexAvatarShape;
    status?: CodeplexAvatarStatus;
    showBorder?: boolean;
    showInitialsFallback?: boolean;
}

export const CodeplexAvatar = ({
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    status = 'none',
    showBorder = false,
    showInitialsFallback = true,
    className = '',
    ...props
}: CodeplexAvatarProps) => {
    const sizeClass =
        size === 'xs'
            ? 'w-6 h-6 text-[10px]'
            : size === 'sm'
                ? 'w-8 h-8 text-xs'
                : size === 'lg'
                    ? 'w-12 h-12 text-base'
                    : size === 'xl'
                        ? 'w-16 h-16 text-lg'
                        : 'w-10 h-10 text-sm';

    const radiusClass = shape === 'rounded' ? 'rounded-lg' : 'rounded-full';

    const borderClass = showBorder
        ? 'ring-2 ring-white dark:ring-gray-900'
        : '';

    const statusColor =
        status === 'online'
            ? 'bg-emerald-500'
            : status === 'busy'
                ? 'bg-red-500'
                : status === 'away'
                    ? 'bg-amber-400'
                    : status === 'offline'
                        ? 'bg-gray-400 dark:bg-gray-500'
                        : 'bg-transparent';

    const showStatus = status !== 'none';

    const initials =
        (name || alt || '?')
            .trim()
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase())
            .join('') || '?';

    const statusLabel =
        status === 'online'
            ? 'En línea'
            : status === 'busy'
                ? 'Ocupado'
                : status === 'away'
                    ? 'Ausente'
                    : status === 'offline'
                        ? 'Desconectado'
                        : undefined;

    return (
        <div
            className={`relative inline-flex ${className}`}
            aria-label={name}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className={`
            ${sizeClass}
            ${radiusClass}
            object-cover
            bg-gray-200 dark:bg-gray-700
            ${borderClass}
          `}
                />
            ) : showInitialsFallback ? (
                <div
                    className={`
            ${sizeClass}
            ${radiusClass}
            inline-flex items-center justify-center
            bg-gray-200 text-gray-700
            dark:bg-gray-700 dark:text-gray-100
            font-medium
            ${borderClass}
          `}
                    role="img"
                    aria-label={name}
                >
                    {initials}
                </div>
            ) : (
                <div
                    className={`
            ${sizeClass}
            ${radiusClass}
            bg-gray-200 dark:bg-gray-700
            ${borderClass}
          `}
                    role="img"
                    aria-label={name}
                />
            )}

            {showStatus && (
                <>
                    <span
                        className={`
              absolute bottom-0 right-0
              inline-flex items-center justify-center
              rounded-full
              border-2 border-white dark:border-gray-900
              ${size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3'}
              ${statusColor}
            `}
                        aria-hidden="true"
                    />
                    {statusLabel && (
                        <span className="sr-only">{statusLabel}</span>
                    )}
                </>
            )}
        </div>
    );
};
