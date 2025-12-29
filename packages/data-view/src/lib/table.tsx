import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, useTheme, lighten, alpha } from '@mui/material';

// Re-export EVERYTHING from MRT to support all examples (Editing, Virtualization, etc.)
export * from 'material-react-table';

export interface CodeplexTableProps<TData extends MRT_RowData> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    options?: Partial<MRT_TableOptions<TData>>;
    title?: string;
    loading?: boolean;
}

export const CodeplexTable = <TData extends MRT_RowData>({
    columns,
    data,
    options,
    title,
    loading = false,
}: CodeplexTableProps<TData>) => {
    const theme = useTheme();

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_ES,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enablePagination: true,
        manualFiltering: false, // Default to client-side
        manualPagination: false,
        manualSorting: false,
        state: {
            isLoading: loading,
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '12px',
                border: '1px solid',
                borderColor: theme.palette.divider,
                overflow: 'hidden',
                boxShadow: theme.shadows[2], // Creative subtle shadow
            },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : '#f8f9fa',
                color: theme.palette.text.secondary,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: `1px solid ${theme.palette.divider}`,
                py: 2,
            }
        },
        muiTableBodyRowProps: ({ row }) => ({
            sx: {
                cursor: 'pointer',
                transition: 'background-color 0.2s',
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
            }
        }),
        muiTopToolbarProps: {
            sx: {
                backgroundColor: 'transparent',
                p: 2,
                justifyContent: 'space-between',
            }
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: 'transparent',
                borderTop: `1px solid ${theme.palette.divider}`,
            }
        },
        renderTopToolbarCustomActions: title ? () => (
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
        ) : undefined,
        // Allow overriding everything (merges deeply)
        ...options,
    });

    return <MaterialReactTable table={table} />;
};
