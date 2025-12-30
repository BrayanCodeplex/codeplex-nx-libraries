import { BottomNavigation, BottomNavigationAction, BottomNavigationActionProps, BottomNavigationProps, Paper, SxProps, Theme } from '@mui/material';

export interface CodeplexBottomNavigationItem extends Omit<BottomNavigationActionProps, 'label' | 'icon'> {
    label: string | React.ReactNode;
    icon: React.ReactNode;
    value: any;
}

export interface CodeplexBottomNavigationProps extends BottomNavigationProps {
    items: CodeplexBottomNavigationItem[];
    // Vitamins:
    fixed?: boolean; // Fix to bottom
    withPaper?: boolean; // Wrap in Paper for elevation (typical mobile pattern)
    containerSx?: SxProps<Theme>; // Styles for the wrapper if fixed/paper
}

export const CodeplexBottomNavigation = ({
    items,
    fixed,
    withPaper = true, // Default to true as standard mobile pattern usually needs elevation
    containerSx,
    sx,
    ...props
}: CodeplexBottomNavigationProps) => {

    const nav = (
        <BottomNavigation showLabels sx={sx} {...props}>
            {items.map((item, index) => {
                const { label, icon, value, ...rest } = item;
                return (
                    <BottomNavigationAction
                        key={index}
                        label={label}
                        icon={icon}
                        value={value}
                        {...rest}
                    />
                );
            })}
        </BottomNavigation>
    );

    if (fixed) {
        return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, ...containerSx }} elevation={3}>
                {nav}
            </Paper>
        );
    }

    if (withPaper) {
        return (
            <Paper elevation={3} sx={containerSx}>
                {nav}
            </Paper>
        );
    }

    return nav;
};
