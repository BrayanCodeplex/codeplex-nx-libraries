import React from 'react';

export type ColSize = boolean | 'auto' | number | string; // number 1-12

export interface CodeplexColProps extends React.HTMLAttributes<HTMLDivElement> {
    xs?: ColSize;
    sm?: ColSize;
    md?: ColSize;
    lg?: ColSize;
    xl?: ColSize;
    xxl?: ColSize;
    tag?: React.ElementType;
}

export const CodeplexCol = ({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    tag: Tag = 'div',
    className = '',
    children,
    ...props
}: CodeplexColProps) => {
    let classes = 'relative px-4';

    const getSizeClass = (size: ColSize, breakpointPrefix: string = '') => {
        const prefix = breakpointPrefix ? `${breakpointPrefix}:` : '';

        if (size === true) {
            return `${prefix}flex-1 ${prefix}max-w-full`;
        }

        if (size === 'auto') {
            return `${prefix}flex-none ${prefix}w-auto`;
        }

        const numSize = Number(size);
        if (!isNaN(numSize) && numSize > 0 && numSize <= 12) {
            const widthMap: Record<number, string> = {
                1: 'w-1/12',
                2: 'w-2/12',
                3: 'w-3/12',
                4: 'w-4/12',
                5: 'w-5/12',
                6: 'w-6/12',
                7: 'w-7/12',
                8: 'w-8/12',
                9: 'w-9/12',
                10: 'w-10/12',
                11: 'w-11/12',
                12: 'w-full',
            };

            const widthClass = widthMap[numSize];
            if (widthClass) {
                return `${prefix}flex-none ${prefix}${widthClass}`;
            }
        }

        return '';
    };

    const hasProps =
        xs !== undefined ||
        sm !== undefined ||
        md !== undefined ||
        lg !== undefined ||
        xl !== undefined ||
        xxl !== undefined;

    if (!hasProps) {
        classes += ' flex-1 max-w-full';
    } else {
        if (xs === undefined) {
            classes += ' w-full';
        } else {
            classes += ` ${getSizeClass(xs, '')}`;
        }
    }

    if (sm !== undefined) classes += ` ${getSizeClass(sm, 'sm')}`;
    if (md !== undefined) classes += ` ${getSizeClass(md, 'md')}`;
    if (lg !== undefined) classes += ` ${getSizeClass(lg, 'lg')}`;
    if (xl !== undefined) classes += ` ${getSizeClass(xl, 'xl')}`;
    if (xxl !== undefined) classes += ` ${getSizeClass(xxl, '2xl')}`;

    return (
        <Tag className={`${classes} ${className}`} {...props}>
            {children}
        </Tag>
    );
};
