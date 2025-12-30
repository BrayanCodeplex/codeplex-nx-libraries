import React from 'react';
import { Tabs, Tab, TabsProps, TabProps } from '@mui/material';

export interface CodeplexTabItem extends Omit<TabProps, 'children'> {
    label: string | React.ReactNode;
    value: any;
    icon?: React.ReactElement;
    iconPosition?: 'top' | 'start' | 'end' | 'bottom';
}

export interface CodeplexTabsProps extends TabsProps {
    items: CodeplexTabItem[];
    // Vitamins:
    // "centered" is already in TabsProps, but we can rely on it being passed through
}

export const CodeplexTabs = ({ items, ...props }: CodeplexTabsProps) => {
    return (
        <Tabs {...props}>
            {items.map((item, index) => {
                const { label, value, icon, iconPosition, disabled, ...rest } = item;
                return (
                    <Tab
                        key={index}
                        label={label}
                        value={value}
                        icon={icon}
                        iconPosition={iconPosition}
                        disabled={disabled}
                        {...rest}
                    />
                );
            })}
        </Tabs>
    );
};
