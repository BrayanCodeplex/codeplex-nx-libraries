import React from 'react';

export interface CodeplexRowProps extends React.HTMLAttributes<HTMLDivElement> {
    noGutters?: boolean;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    tag?: React.ElementType;
}

export const CodeplexRow = ({
    noGutters = false,
    align,
    justify,
    tag: Tag = 'div',
    className = '',
    children,
    ...props
}: CodeplexRowProps) => {
    let baseClasses = 'flex flex-wrap';

    if (noGutters) {
        baseClasses += ' mx-0';
    } else {
        baseClasses += ' -mx-4';
    }

    const alignClasses: Record<string, string> = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
    };

    const justifyClasses: Record<string, string> = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    };

    if (align && alignClasses[align]) baseClasses += ` ${alignClasses[align]}`;
    if (justify && justifyClasses[justify])
        baseClasses += ` ${justifyClasses[justify]}`;

    return (
        <Tag className={`${baseClasses} ${className}`} {...props}>
            {children}
        </Tag>
    );
};
