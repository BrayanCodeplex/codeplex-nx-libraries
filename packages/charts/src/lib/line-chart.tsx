import React from 'react';
import { LineChart, LineChartProps } from '@mui/x-charts/LineChart';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

export interface CodeplexLineChartProps extends LineChartProps {
    title?: string;
    subTitle?: string;
    withPaper?: boolean;
    height?: number;
}

export const CodeplexLineChart = ({
    title,
    subTitle,
    withPaper = true,
    height = 300,
    sx,
    ...props
}: CodeplexLineChartProps) => {
    const theme = useTheme();

    const chart = (
        <LineChart
            height={height}
            sx={{
                width: '100%',
                ...sx,
            }}
            slotProps={{
                legend: {
                    labelStyle: {
                        fontSize: 12,
                        fill: theme.palette.text.secondary,
                    },
                },
            }}
            {...props}
        />
    );

    if (withPaper) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    background: theme.palette.background.paper,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    ...sx
                }}
            >
                {(title || subTitle) && (
                    <Box sx={{ mb: 2 }}>
                        {title && (
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                {title}
                            </Typography>
                        )}
                        {subTitle && (
                            <Typography variant="subtitle2" color="text.secondary">
                                {subTitle}
                            </Typography>
                        )}
                    </Box>
                )}
                {chart}
            </Paper>
        );
    }

    return chart;
};
