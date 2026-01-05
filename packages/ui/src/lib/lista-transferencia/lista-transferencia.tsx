import React, { useState } from 'react';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export interface ElementoListaTransferencia {
    id: string | number;
    etiqueta: string;
    deshabilitado?: boolean;
}

export interface CodeplexListaTransferenciaProps {
    // Spanish
    izquierda?: ElementoListaTransferencia[];
    derecha?: ElementoListaTransferencia[];
    alCambiar?: (izquierda: ElementoListaTransferencia[], derecha: ElementoListaTransferencia[]) => void;
    tituloIzquierda?: string;
    tituloDerecha?: string;
    alto?: number | string;
}

// Styled components for premium feel
const TarjetaEstilizada = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));

const CabeceraTarjetaEstilizada = styled(CardHeader)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : alpha(theme.palette.common.white, 0.05),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiCardHeader-title': {
        fontSize: '1rem',
        fontWeight: 700,
        color: theme.palette.text.primary,
    },
    '& .MuiCardHeader-subheader': {
        fontSize: '0.875rem',
        marginTop: 2,
    },
}));

const AreaScrollLista = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    // Custom Scrollbar
    '&::-webkit-scrollbar': {
        width: 6,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.action.hover,
        borderRadius: 3,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    }
}));

const BotonAccion = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    minWidth: 44,
    height: 44,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        borderColor: 'transparent',
        color: theme.palette.common.white,
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)',
    },
    '&.Mui-disabled': {
        border: `1px solid ${theme.palette.action.disabledBackground}`,
        backgroundColor: 'transparent',
    }
}));


function not(a: ElementoListaTransferencia[], b: ElementoListaTransferencia[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: ElementoListaTransferencia[], b: ElementoListaTransferencia[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: ElementoListaTransferencia[], b: ElementoListaTransferencia[]) {
    return [...a, ...not(b, a)];
}

export const CodeplexListaTransferencia = ({
    izquierda = [],
    derecha = [],
    alCambiar,
    tituloIzquierda = 'Opciones',
    tituloDerecha = 'Elegidos',
    alto = 280
}: CodeplexListaTransferenciaProps) => {

    const itemsLeft = izquierda;
    const itemsRight = derecha;
    const finalOnChange = alCambiar;
    const titleLeft = tituloIzquierda;
    const titleRight = tituloDerecha;
    const finalHeight = alto;

    const [checked, setChecked] = useState<ElementoListaTransferencia[]>([]);

    const leftChecked = intersection(checked, itemsLeft);
    const rightChecked = intersection(checked, itemsRight);

    const handleToggle = (value: ElementoListaTransferencia) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: ElementoListaTransferencia[]) => intersection(checked, items).length;

    const handleToggleAll = (items: ElementoListaTransferencia[]) => () => {
        if (numberOfChecked(items) === items.length && items.length !== 0) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        if (finalOnChange) {
            finalOnChange(not(itemsLeft, leftChecked), itemsRight.concat(leftChecked));
            setChecked(not(checked, leftChecked));
        }
    };

    const handleCheckedLeft = () => {
        if (finalOnChange) {
            finalOnChange(itemsLeft.concat(rightChecked), not(itemsRight, rightChecked));
            setChecked(not(checked, rightChecked));
        }
    };

    const customList = (title: string, items: ElementoListaTransferencia[]) => (
        <TarjetaEstilizada>
            <CabeceraTarjetaEstilizada
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'todos los elementos seleccionados',
                        }}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-checked': { color: 'primary.main' }
                        }}
                    />
                }
                title={title}
                subheader={
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {numberOfChecked(items)} de {items.length} seleccionados
                    </Typography>
                }
            />
            <AreaScrollLista sx={{ height: finalHeight }}>
                <List dense component="div" role="list" sx={{ py: 1 }}>
                    {items.map((value) => {
                        const labelId = `transfer-list-all-item-${value.id}-label`;
                        const isChecked = checked.indexOf(value) !== -1;

                        return (
                            <ListItem
                                key={value.id}
                                disablePadding
                                sx={{ mb: 0.5, px: 1 }}
                            >
                                <ListItemButton
                                    role="listitem"
                                    onClick={handleToggle(value)}
                                    disabled={value.deshabilitado}
                                    selected={isChecked}
                                    sx={{
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                                            '&:hover': {
                                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <Checkbox
                                            checked={isChecked}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            size="small"
                                            edge="start"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primary={value.etiqueta}
                                        primaryTypographyProps={{
                                            fontWeight: isChecked ? 600 : 400,
                                            color: isChecked ? 'primary.main' : 'text.primary'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </AreaScrollLista>
        </TarjetaEstilizada>
    );

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="center">
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>{customList(titleLeft, itemsLeft)}</Box>
            <Box>
                <Stack direction="column" spacing={2}>
                    <BotonAccion
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="mover seleccionados a la derecha"
                    >
                        <ArrowForwardRoundedIcon />
                    </BotonAccion>
                    <BotonAccion
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="mover seleccionados a la izquierda"
                    >
                        <ArrowBackRoundedIcon />
                    </BotonAccion>
                </Stack>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>{customList(titleRight, itemsRight)}</Box>
        </Stack>
    );
};
export const CodeplexTransferList = CodeplexListaTransferencia;
