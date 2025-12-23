import React from 'react';

export type CodeplexJumbotronAlign = 'left' | 'center';

export interface CodeplexJumbotronProps extends React.HTMLAttributes<HTMLElement> {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: CodeplexJumbotronAlign;
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimary?: () => void;
    onSecondary?: () => void;
    fullHeight?: boolean;
    backgroundImageUrl?: string;
    darkOverlay?: boolean;
}

export const CodeplexJumbotron = ({
    eyebrow,
    title,
    subtitle,
    align = 'left',
    primaryLabel,
    secondaryLabel,
    onPrimary,
    onSecondary,
    fullHeight = false,
    backgroundImageUrl,
    darkOverlay = true,
    className = '',
    children,
    ...props
}: CodeplexJumbotronProps) => {
    const alignClasses =
        align === 'center'
            ? 'text-center items-center'
            : 'text-left items-start';

    const hasBackgroundImage = !!backgroundImageUrl;

    return (
        <section
            className={`
        relative overflow-hidden
        border border-gray-200/80 dark:border-gray-700/80
        rounded-2xl
        px-6 py-10 md:px-10 md:py-14
        shadow-sm
        flex
        ${fullHeight ? 'min-h-[60vh]' : ''}
        ${hasBackgroundImage
                    ? 'bg-cover bg-center'
                    : 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950'
                }
        ${className}
      `}
            style={
                hasBackgroundImage
                    ? { backgroundImage: `url(${backgroundImageUrl})` }
                    : undefined
            }
            {...props}
        >
            {hasBackgroundImage && darkOverlay && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            )}

            {/* Contenido */}
            <div
                className={`
          relative z-10
          max-w-3xl mx-auto flex flex-col gap-6
          ${alignClasses}
        `}
            >
                {eyebrow && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/60 dark:text-blue-100">
                        {eyebrow}
                    </span>
                )}

                <div className="space-y-3 md:space-y-4">
                    <h1
                        className={`
              text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight
              ${hasBackgroundImage ? 'text-white' : 'text-gray-900 dark:text-white'}
            `}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className={`
                text-base md:text-lg max-w-2xl
                ${hasBackgroundImage
                                    ? 'text-gray-100/90'
                                    : 'text-gray-600 dark:text-gray-300'
                                }
              `}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Acciones */}
                {(primaryLabel || secondaryLabel) && (
                    <div
                        className={`
              flex flex-wrap gap-3 mt-2
              ${align === 'center' ? 'justify-center' : 'justify-start'}
            `}
                    >
                        {primaryLabel && onPrimary && (
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={onPrimary}
                            >
                                {primaryLabel}
                            </button>
                        )}

                        {secondaryLabel && onSecondary && (
                            <button
                                type="button"
                                className={`
                  inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg border
                  ${hasBackgroundImage
                                        ? 'border-white/60 text-white bg-white/5 hover:bg-white/10'
                                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700'
                                    }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
                                onClick={onSecondary}
                            >
                                {secondaryLabel}
                            </button>
                        )}
                    </div>
                )}

                {/* Children para contenido extra */}
                {children}
            </div>
        </section>
    );
};
