import React from 'react';
import { Menu, MenuProps, MenuItem, MenuItemProps, ListItemIcon, ListItemText } from '@mui/material';

export interface CodeplexElementoMenu extends Omit<MenuItemProps, 'children' | 'onClick'> {
    etiqueta: React.ReactNode;
    icono?: React.ReactNode;
    alHacerClick?: () => void;
}

export interface CodeplexMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
    elementos?: CodeplexElementoMenu[];
    elementoAnclaje?: MenuProps['anchorEl'];
    abierto: boolean;
    alCerrar?: MenuProps['onClose'];
}

export const CodeplexMenu = ({
    elementos,
    children,
    elementoAnclaje,
    abierto,
    alCerrar,
    ...props
}: CodeplexMenuProps) => {
    return (
        <Menu
            anchorEl={elementoAnclaje}
            open={abierto}
            onClose={alCerrar}
            {...props}
        >
            {elementos ? elementos.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={item.alHacerClick}
                    disabled={item.disabled}
                    selected={item.selected}
                    divider={item.divider}
                >
                    {item.icono && <ListItemIcon>{item.icono}</ListItemIcon>}
                    <ListItemText>{item.etiqueta}</ListItemText>
                </MenuItem>
            )) : children}
        </Menu>
    );
};
