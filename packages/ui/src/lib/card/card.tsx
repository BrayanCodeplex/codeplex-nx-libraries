import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

export type CodeplexCardVariant = 'default' | 'outline' | 'soft';
export type CodeplexCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CodeplexCardProps extends Omit<CardProps, 'variant'> {
    variant?: CodeplexCardVariant;
    padding?: CodeplexCardPadding;
    hoverable?: boolean;
    clickable?: boolean;
    media?: React.ReactNode; // Can be string (img src) or custom node
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

export const CodeplexCard = ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    clickable = false,
    className = '',
    media,
    header,
    footer,
    children,
    ...props
}: CodeplexCardProps) => {

    const mapVariant = (v: CodeplexCardVariant): CardProps['variant'] | 'elevation' => {
        if (v === 'outline' || v === 'soft') return 'outlined';
        return 'elevation';
    };

    const mapPadding = (p: CodeplexCardPadding): string | number => {
        switch (p) {
            case 'none': return 0;
            case 'sm': return 1.5;
            case 'lg': return 3;
            default: return 2;
        }
    };

    const ContentWrapper = clickable ? CardActionArea : React.Fragment;
    const wrapperProps = clickable ? { component: 'div' } : {};

    return (
        <Card
            variant={mapVariant(variant) === 'outlined' ? 'outlined' : undefined}
            elevation={variant === 'default' ? 2 : 0}
            className={className}
            sx={{
                ...(variant === 'soft' && { bgcolor: 'action.hover', borderColor: 'divider' }),
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
            {...props}
        >
            {/* @ts-ignore - ContentWrapper logic */}
            <ContentWrapper {...wrapperProps}>

                {/* Image / Media */}
                {typeof media === 'string' ? (
                    <CardMedia component="img" image={media} alt="Card media" height="140" />
                ) : (
                    media
                )}

                {/* Header Section */}
                {header && <Box sx={{ p: mapPadding(padding), pb: 0 }}>{header}</Box>}

                {/* Main Content */}
                <CardContent sx={{ p: mapPadding(padding), flexGrow: 1 }}>
                    {children}
                </CardContent>

                {/* Footer Section */}
                {footer && <Box sx={{ p: mapPadding(padding), pt: 0 }}>{footer}</Box>}

            </ContentWrapper>
        </Card>
    );
};
