import React from 'react';
import { Breadcrumbs, BreadcrumbsProps, Link, Typography, SvgIconTypeMap } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

export interface CodeplexBreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactElement;
}

export interface CodeplexBreadcrumbsProps extends BreadcrumbsProps {
    items: CodeplexBreadcrumbItem[];
    // Vitamins:
    homeHref?: string; // Automatically adds a Home icon/link if provided
    activeColor?: string; // Custom color for the last item (text)
}

export const CodeplexBreadcrumbs = ({
    items,
    homeHref,
    activeColor = 'text.primary',
    separator = <NavigateNextIcon fontSize="small" />,
    ...props
}: CodeplexBreadcrumbsProps) => {

    // Merge home item if requested
    const finalItems = homeHref
        ? [{ label: 'Home', href: homeHref, icon: <HomeIcon fontSize="small" /> }, ...items]
        : items;

    return (
        <Breadcrumbs separator={separator} aria-label="breadcrumb" {...props}>
            {finalItems.map((item, index) => {
                const isLast = index === finalItems.length - 1;

                if (isLast) {
                    return (
                        <Typography
                            key={index}
                            sx={{ color: activeColor, display: 'flex', alignItems: 'center' }}
                        >
                            {item.icon && <span style={{ marginRight: 4, display: 'flex' }}>{item.icon}</span>}
                            {item.label}
                        </Typography>
                    );
                }

                return (
                    <Link
                        key={index}
                        underline="hover"
                        color="inherit"
                        href={item.href || '#'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {item.icon && <span style={{ marginRight: 4, display: 'flex' }}>{item.icon}</span>}
                        {item.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};
