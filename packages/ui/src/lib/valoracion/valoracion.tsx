import React, { useState } from 'react';
import Rating, { RatingProps } from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled, useTheme } from '@mui/material/styles';

export type CodeplexValoracionTamano = 'small' | 'medium' | 'large';
export type CodeplexValoracionVariante = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface CodeplexValoracionProps extends Omit<RatingProps, 'onChange'> {
    // Spanish
    valor?: number;
    mostrarValor?: boolean;
    textosAyuda?: string[];
    variante?: CodeplexValoracionVariante;
    alCambiar?: (value: number | null) => void;
    maximo?: number;
    soloLectura?: boolean;
    tamano?: CodeplexValoracionTamano;
}

// Custom styled rating for different colors
const ValoracionPersonalizada = styled(Rating, {
    shouldForwardProp: (prop) => prop !== 'variantColor',
})<{ variantColor?: string }>(({ theme, variantColor }) => ({
    '& .MuiRating-iconFilled': {
        color: variantColor,
    },
    '& .MuiRating-iconHover': {
        color: variantColor,
    },
}));

const getVariantColor = (variant: CodeplexValoracionVariante, theme: any) => {
    switch (variant) {
        case 'primary': return theme.palette.primary.main;
        case 'secondary': return theme.palette.secondary.main;
        case 'success': return theme.palette.success.main;
        case 'warning': return theme.palette.warning.main;
        case 'error': return theme.palette.error.main;
        case 'info': return theme.palette.info.main;
        default: return theme.palette.warning.main;
    }
};

export const CodeplexValoracion = ({
    valor,
    maximo,
    soloLectura,
    tamano,
    variante,
    mostrarValor,
    textosAyuda,
    alCambiar,

    className,
    ...props
}: CodeplexValoracionProps) => {
    const [hover, setHover] = useState(-1);
    const theme = useTheme();

    const finalValue = valor;
    const finalMax = maximo || 5;
    const finalReadOnly = soloLectura;
    const finalSize = tamano || 'medium';
    const finalVariant = variante || 'warning';
    const finalShowValue = mostrarValor || false;
    const finalTooltips = textosAyuda || [];
    const finalOnChange = alCambiar;

    const color = getVariantColor(finalVariant, theme);

    return (
        <Box
            className={className}
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <ValoracionPersonalizada
                name="codeplex-rating"
                value={finalValue}
                max={finalMax}
                readOnly={finalReadOnly}
                size={finalSize}
                variantColor={color}
                onChange={(event, newValue) => {
                    finalOnChange?.(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                {...props}
            />
            {finalShowValue && (
                <Box sx={{ ml: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
                    {finalValue !== null && finalValue !== undefined ? `${finalValue}/${finalMax}` : ''}
                </Box>
            )}
            {finalTooltips.length > 0 && !finalReadOnly && (
                <Box sx={{ ml: 2, minWidth: 80, fontSize: '0.875rem', fontWeight: 500 }}>
                    {finalTooltips[hover !== -1 ? hover - 1 : (finalValue || 0) - 1]}
                </Box>
            )}
        </Box>
    );
};
export const CodeplexRating = CodeplexValoracion;
