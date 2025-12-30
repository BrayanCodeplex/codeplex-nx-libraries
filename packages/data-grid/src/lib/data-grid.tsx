import React from 'react';
import { DataGrid, DataGridProps, GridColDef, GridValidRowModel, GridRenderCellParams } from '@mui/x-data-grid';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export type { GridColDef, GridValidRowModel, GridRenderCellParams };

export interface CodeplexDataGridProps<R extends GridValidRowModel = any> extends DataGridProps<R> {
    // Vitamins:
    withPaper?: boolean;
    title?: string;
}

export const CodeplexDataGrid = <R extends GridValidRowModel = any>({
    withPaper = true,
    title,
    sx,
    slotProps,
    ...props
}: CodeplexDataGridProps<R>) => {
    const theme = useTheme();

    const grid = (
        <DataGrid
            autoHeight
            disableRowSelectionOnClick
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                },
            }}
            pageSizeOptions={[5, 10, 25]}
            sx={{
                border: 'none',
                // Custom Scrollbar
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                },
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.2) : alpha(theme.palette.common.black, 0.2),
                    borderRadius: '4px',
                },
                // Header styles
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : theme.palette.grey[50],
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                },
                // Row styles
                '& .MuiDataGrid-row': {
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.08)
                            : alpha(theme.palette.primary.main, 0.04),
                    },
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.16)
                            : alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.24)
                                : alpha(theme.palette.primary.main, 0.12),
                        }
                    }
                },
                ...sx,
            }}
            slotProps={{
                // Merge slots if needed
                ...slotProps
            }}
            {...props}
        />
    );

    if (withPaper) {
        return (
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: theme.shadows[2],
                }}
            >
                {title && (
                    <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    height: 24,
                                    width: 4,
                                    bgcolor: 'primary.main',
                                    borderRadius: 1
                                }}
                            />
                            <Box sx={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                                {title}
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box sx={{ width: '100%' }}>
                    {grid}
                </Box>
            </Paper>
        );
    }

    return grid;
};
