import React from 'react';
import { Breadcrumbs, BreadcrumbsProps, Link, Typography, SvgIconTypeMap } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

export interface CodeplexElementoMigasPan {
    etiqueta: string;
    href?: string;
    icono?: React.ReactElement;
}

export interface CodeplexMigasPanProps extends Omit<BreadcrumbsProps, 'separator'> {
    elementos: CodeplexElementoMigasPan[];
    // Vitamins:
    rutaInicio?: string; // Automatically adds a Home icon/link if provided
    colorActivo?: string; // Custom color for the last item (text)
    separador?: React.ReactNode;
}

export const CodeplexMigasPan = ({
    elementos,
    rutaInicio,
    colorActivo = 'text.primary',
    separador = <NavigateNextIcon fontSize="small" />,
    ...props
}: CodeplexMigasPanProps) => {

    // Merge home item if requested
    const itemsFinales = rutaInicio
        ? [{ etiqueta: 'Inicio', href: rutaInicio, icono: <HomeIcon fontSize="small" /> }, ...elementos]
        : elementos;

    return (
        <Breadcrumbs separator={separador} aria-label="breadcrumb" {...props}>
            {itemsFinales.map((item, index) => {
                const esUltimo = index === itemsFinales.length - 1;

                if (esUltimo) {
                    return (
                        <Typography
                            key={index}
                            sx={{ color: colorActivo, display: 'flex', alignItems: 'center' }}
                        >
                            {item.icono && <span style={{ marginRight: 4, display: 'flex' }}>{item.icono}</span>}
                            {item.etiqueta}
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
                        {item.icono && <span style={{ marginRight: 4, display: 'flex' }}>{item.icono}</span>}
                        {item.etiqueta}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};
