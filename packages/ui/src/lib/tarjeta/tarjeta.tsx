import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

export type CodeplexTarjetaVariante = 'default' | 'outline' | 'soft';
export type CodeplexTarjetaRelleno = 'none' | 'sm' | 'md' | 'lg';

export interface CodeplexTarjetaProps extends Omit<CardProps, 'variant'> {
    // Spanish
    variante?: CodeplexTarjetaVariante;
    relleno?: CodeplexTarjetaRelleno;
    efectoHover?: boolean;
    clicable?: boolean;
    multimedia?: React.ReactNode;
    cabecera?: React.ReactNode;
    pie?: React.ReactNode;
}

export const CodeplexTarjeta = ({
    variante = 'default',
    relleno = 'md',
    efectoHover,
    clicable,
    multimedia,
    cabecera,
    pie,

    className = '',
    children,
    ...props
}: CodeplexTarjetaProps) => {

    const mapVariant = (v: CodeplexTarjetaVariante): CardProps['variant'] | 'elevation' => {
        if (v === 'outline' || v === 'soft') return 'outlined';
        return 'elevation';
    };

    const mapPadding = (p: CodeplexTarjetaRelleno): string | number => {
        switch (p) {
            case 'none': return 0;
            case 'sm': return 1.5;
            case 'lg': return 3;
            default: return 2;
        }
    };

    const ContenedorContenido = clicable ? CardActionArea : React.Fragment;
    const propsContenedor = clicable ? { component: 'div' } : {};

    return (
        <Card
            variant={mapVariant(variante) === 'outlined' ? 'outlined' : undefined}
            elevation={variante === 'default' ? 2 : 0}
            className={className}
            sx={{
                ...(variante === 'soft' && { bgcolor: 'action.hover', borderColor: 'divider' }),
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                ...(efectoHover && {
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                    }
                })
            }}
            {...props}
        >
            {/* @ts-ignore - ContenedorContenido logic matches MUI patterns */}
            <ContenedorContenido {...propsContenedor}>

                {/* Imagen / Multimedia */}
                {typeof multimedia === 'string' ? (
                    <CardMedia component="img" image={multimedia} alt="Media de tarjeta" height="140" />
                ) : (
                    multimedia
                )}

                {/* Cabecera */}
                {cabecera && <Box sx={{ p: mapPadding(relleno), pb: 0 }}>{cabecera}</Box>}

                {/* Contenido Principal */}
                <CardContent sx={{ p: mapPadding(relleno), flexGrow: 1 }}>
                    {children}
                </CardContent>

                {/* Pie de tarjeta */}
                {pie && <Box sx={{ p: mapPadding(relleno), pt: 0 }}>{pie}</Box>}

            </ContenedorContenido>
        </Card>
    );
};
export const CodeplexCard = CodeplexTarjeta;
