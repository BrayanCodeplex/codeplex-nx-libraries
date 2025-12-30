import React from 'react';
import { SpeedDial, SpeedDialProps, SpeedDialAction, SpeedDialActionProps, SpeedDialIcon } from '@mui/material';

export interface CodeplexSpeedDialActionType extends Omit<SpeedDialActionProps, 'icon' | 'tooltipTitle'> {
    icon: React.ReactNode;
    tooltipTitle: React.ReactNode;
}

export interface CodeplexSpeedDialProps extends SpeedDialProps {
    actions?: CodeplexSpeedDialActionType[];
    // Vitamin: allows simple usage without children
}

export const CodeplexSpeedDial = ({ actions, icon, children, ...props }: CodeplexSpeedDialProps) => {
    return (
        <SpeedDial
            icon={icon || <SpeedDialIcon />}
            {...props}
        >
            {actions ? actions.map((action, index) => (
                <SpeedDialAction
                    key={index}
                    icon={action.icon}
                    tooltipTitle={action.tooltipTitle}
                    onClick={action.onClick}
                    FabProps={action.FabProps}
                    tooltipOpen={action.tooltipOpen}
                    tooltipPlacement={action.tooltipPlacement}
                />
            )) : children}
        </SpeedDial>
    );
};
