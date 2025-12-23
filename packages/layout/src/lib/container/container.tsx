import React from 'react';

export interface CodeplexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
    tag?: React.ElementType; // Changed from string to ElementType for React
}

export const CodeplexContainer = ({
    fluid = false,
    tag: Tag = 'div',
    className = '',
    children,
    ...props
}: CodeplexContainerProps) => {
    const baseClasses = fluid
        ? 'w-full px-4'
        : 'container mx-auto px-4';

    return (
        <Tag className={`${baseClasses} ${className}`} {...props}>
            {children}
        </Tag>
    );
};
