import React from 'react';
import { Menu, MenuProps, MenuItem, MenuItemProps, ListItemIcon, ListItemText } from '@mui/material';

export interface CodeplexMenuItemType extends Omit<MenuItemProps, 'children'> {
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export interface CodeplexMenuProps extends MenuProps {
    items?: CodeplexMenuItemType[];
}

export const CodeplexMenu = ({ items, children, ...props }: CodeplexMenuProps) => {
    return (
        <Menu {...props}>
            {items ? items.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick} disabled={item.disabled} selected={item.selected} divider={item.divider}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText>{item.label}</ListItemText>
                </MenuItem>
            )) : children}
        </Menu>
    );
};
