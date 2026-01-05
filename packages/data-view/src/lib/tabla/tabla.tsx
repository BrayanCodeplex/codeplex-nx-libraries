import { useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, useTheme, alpha, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
    FileDownload as FileDownloadIcon,
    PictureAsPdf as PdfIcon,
    TableView as TableViewIcon
} from '@mui/icons-material';

// Re-export EVERYTHING from MRT
export * from 'material-react-table';

export interface CodeplexTablaProps<TData extends MRT_RowData> {
    columnas: MRT_ColumnDef<TData>[];
    datos: TData[];
    opciones?: Partial<MRT_TableOptions<TData>>;
    titulo?: string;
    cargando?: boolean;
    habilitarExportacion?: boolean;
}

export const CodeplexTabla = <TData extends MRT_RowData>({
    columnas,
    datos,
    opciones,
    titulo,
    cargando = false,
    habilitarExportacion = false,
}: CodeplexTablaProps<TData>) => {
    const theme = useTheme();
    const [anclaMenu, setAnclaMenu] = useState<null | HTMLElement>(null);

    const manejarExportacionDatos = (tipo: 'csv' | 'excel' | 'pdf') => {
        const filas = table.getPrePaginationRowModel().rows;
        const columnasVisibles = table.getVisibleLeafColumns();

        // Preparar datos para exportar
        const datosFila = filas.map((fila) => {
            const filaObj: any = {};
            columnasVisibles.forEach(col => {
                if (col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'mrt-row-expand' && col.id !== 'actions') {
                    const val = fila.getValue(col.id);
                    filaObj[col.columnDef.header as string] = val;
                }
            });
            return filaObj;
        });

        if (tipo === 'excel' || tipo === 'csv') {
            const hojaTrabajo = XLSX.utils.json_to_sheet(datosFila);
            const libroTrabajo = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(libroTrabajo, hojaTrabajo, "Datos");
            XLSX.writeFile(libroTrabajo, `exportacion_datos.${tipo === 'excel' ? 'xlsx' : 'csv'}`);
        } else if (tipo === 'pdf') {
            const doc = new jsPDF();
            const datosTabla = filas.map((fila) => {
                return columnasVisibles
                    .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions')
                    .map(col => String(fila.getValue(col.id) ?? ''));
            });
            const cabecerasTabla = columnasVisibles
                .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions')
                .map(col => String(col.columnDef.header ?? ''));

            autoTable(doc, {
                head: [cabecerasTabla],
                body: datosTabla,
            });
            doc.save('exportacion_datos.pdf');
        }
        setAnclaMenu(null);
    };

    const table = useMaterialReactTable({
        columns: columnas,
        data: datos,
        localization: MRT_Localization_ES,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enablePagination: true,
        manualFiltering: false, // Default to client-side
        manualPagination: false,
        manualSorting: false,
        state: {
            isLoading: cargando,
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '12px',
                border: '1px solid',
                borderColor: theme.palette.divider,
                overflow: 'hidden',
                boxShadow: theme.shadows[2], // Sombra sutil creativa
            },
        },
        muiTableHeadCellProps: ({ column }) => {
            // Verificar si es una cabecera de grupo (tiene sub-columnas)
            const esGrupo = column.columns && column.columns.length > 0;
            // Acceder a meta para color personalizado proporcionado en definición
            const paramsMeta = column.columnDef.meta as any;
            const colorPersonalizado = paramsMeta?.headerBackgroundColor;

            return {
                sx: {
                    backgroundColor: esGrupo
                        ? (colorPersonalizado || (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.9) : theme.palette.grey[100]))
                        : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : theme.palette.grey[50]),
                    color: esGrupo ? (colorPersonalizado ? '#fff' : theme.palette.text.primary) : theme.palette.text.secondary,
                    fontWeight: esGrupo ? 700 : 600,
                    textTransform: 'uppercase',
                    fontSize: esGrupo ? '0.80rem' : '0.75rem',
                    letterSpacing: '0.05em',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    // Agregar borde separador para grupos si no hay color personalizado
                    borderRight: (esGrupo && !colorPersonalizado) ? `1px solid ${theme.palette.divider}` : undefined,
                    borderLeft: (esGrupo && !colorPersonalizado) ? `1px solid ${theme.palette.divider}` : undefined,
                    textAlign: 'center', // Centrar cabeceras de grupo usualmente
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
        renderTopToolbarCustomActions: titulo ? () => (
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
                    {titulo}
                </Box>
            </Box>
        ) : undefined,
        renderToolbarInternalActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {habilitarExportacion && (
                    <>
                        <Tooltip title="Exportar">
                            <IconButton onClick={(e) => setAnclaMenu(e.currentTarget)}>
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anclaMenu}
                            open={Boolean(anclaMenu)}
                            onClose={() => setAnclaMenu(null)}
                        >
                            <MenuItem onClick={() => manejarExportacionDatos('csv')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a CSV</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('excel')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a Excel</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('pdf')}>
                                <ListItemIcon><PdfIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Exportar a PDF</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )}
                <MRT_ToggleFiltersButton table={table} />
                {/* Acciones por defecto de MRT pueden ir aquí si se necesitan */}
            </Box>
        ),
        // Permitir sobrescribir todo (merge profundo)
        ...opciones,
    });

    return <MaterialReactTable table={table} />;
};
