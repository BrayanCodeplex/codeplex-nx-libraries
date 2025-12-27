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

export interface TransferListItem {
    id: string | number;
    label: string;
    disabled?: boolean;
}

export interface CodeplexTransferListProps {
    left: TransferListItem[];
    right: TransferListItem[];
    onChange: (left: TransferListItem[], right: TransferListItem[]) => void;
    leftTitle?: string;
    rightTitle?: string;
    height?: number | string;
}

// Styled components for premium feel
const StyledCard = styled(Card)(({ theme }) => ({
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

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
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

const ListScrollArea = styled(Box)(({ theme }) => ({
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

const ActionButton = styled(Button)(({ theme }) => ({
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


function not(a: TransferListItem[], b: TransferListItem[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: TransferListItem[], b: TransferListItem[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: TransferListItem[], b: TransferListItem[]) {
    return [...a, ...not(b, a)];
}

export const CodeplexTransferList = ({
    left,
    right,
    onChange,
    leftTitle = 'Choices',
    rightTitle = 'Chosen',
    height = 280
}: CodeplexTransferListProps) => {
    const [checked, setChecked] = useState<TransferListItem[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: TransferListItem) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: TransferListItem[]) => intersection(checked, items).length;

    const handleToggleAll = (items: TransferListItem[]) => () => {
        if (numberOfChecked(items) === items.length && items.length !== 0) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        onChange(not(left, leftChecked), right.concat(leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        onChange(left.concat(rightChecked), not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title: string, items: TransferListItem[]) => (
        <StyledCard>
            <StyledCardHeader
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
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
                        {numberOfChecked(items)} of {items.length} selected
                    </Typography>
                }
            />
            <ListScrollArea sx={{ height }}>
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
                                    disabled={value.disabled}
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
                                        primary={value.label}
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
            </ListScrollArea>
        </StyledCard>
    );

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="center">
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>{customList(leftTitle, left)}</Box>
            <Box>
                <Stack direction="column" spacing={2}>
                    <ActionButton
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <ArrowForwardRoundedIcon />
                    </ActionButton>
                    <ActionButton
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <ArrowBackRoundedIcon />
                    </ActionButton>
                </Stack>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>{customList(rightTitle, right)}</Box>
        </Stack>
    );
};
