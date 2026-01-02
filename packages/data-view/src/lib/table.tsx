import { useMemo, useState } from 'react';
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
import { Box, useTheme, lighten, alpha, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
    Download as DownloadIcon,
    FileDownload as FileDownloadIcon,
    PictureAsPdf as PdfIcon,
    TableView as TableViewIcon
} from '@mui/icons-material';

// Re-export EVERYTHING from MRT
export * from 'material-react-table';

export interface CodeplexTableProps<TData extends MRT_RowData> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    options?: Partial<MRT_TableOptions<TData>>;
    title?: string;
    loading?: boolean;
    enableExport?: boolean;
}

export const CodeplexTable = <TData extends MRT_RowData>({
    columns,
    data,
    options,
    title,
    loading = false,
    enableExport = false,
}: CodeplexTableProps<TData>) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleExportData = (type: 'csv' | 'excel' | 'pdf') => {
        const rows = table.getPrePaginationRowModel().rows;
        const visibleColumns = table.getVisibleLeafColumns();

        // Prepare data for export
        const rowData = rows.map((row) => {
            const rowObj: any = {};
            visibleColumns.forEach(col => {
                if (col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'mrt-row-expand' && col.id !== 'actions') {
                    const val = row.getValue(col.id);
                    rowObj[col.columnDef.header as string] = val;
                }
            });
            return rowObj;
        });

        if (type === 'excel' || type === 'csv') {
            const worksheet = XLSX.utils.json_to_sheet(rowData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
            XLSX.writeFile(workbook, `export.${type === 'excel' ? 'xlsx' : 'csv'}`);
        } else if (type === 'pdf') {
            const doc = new jsPDF();
            const tableData = rows.map((row) => {
                return visibleColumns
                    .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions')
                    .map(col => String(row.getValue(col.id) ?? ''));
            });
            const tableHeaders = visibleColumns
                .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions')
                .map(col => String(col.columnDef.header ?? ''));

            autoTable(doc, {
                head: [tableHeaders],
                body: tableData,
            });
            doc.save('export.pdf');
        }
        setAnchorEl(null);
    };

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
        muiTableHeadCellProps: ({ column }) => {
            // Check if it's a group header (has sub-columns)
            const isGroup = column.columns && column.columns.length > 0;
            // Access meta for custom color provided in definition
            const metaParams = column.columnDef.meta as any;
            const customColor = metaParams?.headerBackgroundColor;

            return {
                sx: {
                    backgroundColor: isGroup
                        ? (customColor || (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.9) : theme.palette.grey[100]))
                        : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : theme.palette.grey[50]),
                    color: isGroup ? (customColor ? '#fff' : theme.palette.text.primary) : theme.palette.text.secondary,
                    fontWeight: isGroup ? 700 : 600,
                    textTransform: 'uppercase',
                    fontSize: isGroup ? '0.80rem' : '0.75rem',
                    letterSpacing: '0.05em',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    // Add separator border for groups if no custom color
                    borderRight: (isGroup && !customColor) ? `1px solid ${theme.palette.divider}` : undefined,
                    borderLeft: (isGroup && !customColor) ? `1px solid ${theme.palette.divider}` : undefined,
                    textAlign: 'center', // Center group headers usually
                    py: 2,
                }
            };
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
        renderToolbarInternalActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {enableExport && (
                    <>
                        <Tooltip title="Exportar">
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={() => handleExportData('csv')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a CSV</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleExportData('excel')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a Excel</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleExportData('pdf')}>
                                <ListItemIcon><PdfIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a PDF</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )}
                <MRT_ToggleFiltersButton table={table} />
                {/* Default actions from MRT can go here if needed, but we start simple */}
            </Box>
        ),
        // Allow overriding everything (merges deeply)
        ...options,
    });

    return <MaterialReactTable table={table} />;
};
