import { useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions,
    type MRT_Row,
    MRT_ToggleFiltersButton,
    MRT_ToggleGlobalFilterButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_ExpandAllButton,
    MRT_GrabHandleButton,
    MRT_EditActionButtons,
    MRT_GlobalFilterTextField,
    MRT_TablePagination,
    MRT_TableContainer,
    MRT_TableHead,
    MRT_TableBody,
    MRT_TableFooter,
    MRT_TopToolbar,
    MRT_BottomToolbar,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, useTheme, alpha, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText, Table, TableContainer as MuiTableContainer, Paper } from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
    GetApp as FileDownloadIcon,
    PictureAsPdf as PdfIcon,
    TableView as TableViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';

// Re-export EVERYTHING from MRT
export * from 'material-react-table';

/**
 * Propiedades para el componente CodeplexTabla.
 * Extiende las opciones de configuración de MRT (Material React Table).
 */
export interface CodeplexTablaProps<TData extends MRT_RowData> {
    /**
     * Definición de las columnas de la tabla.
     * Use `type MRT_ColumnDef` para tipado estricto.
     */
    columnas: MRT_ColumnDef<TData>[];
    /**
     * Datos a mostrar en la tabla.
     * Debe ser un array de objetos.
     */
    datos: TData[];
    /**
     * Opciones adicionales de configuración para Material React Table.
     * Permite sobrescribir los defaults "ultra funcionales" proporcionados.
     */
    opciones?: Partial<MRT_TableOptions<TData>>;
    /**
     * Título que se mostrará en la parte superior izquierda de la tabla.
     */
    titulo?: string;
    /**
     * Estado de carga de la tabla. Muestra feedback visual si es true.
     * @default false
     */
    cargando?: boolean;
    /**
     * Habilita el menú de exportación (CSV, Excel, PDF).
     * @default false
     */
    habilitarExportacion?: boolean;
    /**
     * Función que se ejecuta al hacer click en el botón de editar.
     * Si se proporciona, se habilita automáticamente la columna de acciones.
     */
    onEditar?: (fila: TData) => void;
    /**
     * Función que se ejecuta al hacer click en el botón de eliminar.
     * Si se proporciona, se habilita automáticamente la columna de acciones.
     */
    /**
     * Función que se ejecuta al hacer click en el botón de eliminar.
     * Si se proporciona, se habilita automáticamente la columna de acciones.
     */
    onEliminar?: (fila: TData) => void;
    /**
     * Habilita filtros avanzados (facetas, modos de filtro por columna, etc.).
     * @default false
     */
    filtrosAvanzados?: boolean;
    /**
     * Habilita la capacidad de agrupar filas.
     * @default false
     */
    agrupamiento?: boolean;
    /**
     * Habilita la capacidad de fijar columnas (pinning).
     * @default false
     */
    fijarColumnas?: boolean;
    /**
     * Habilita la selección de filas (checkboxes).
     * @default true
     */
    seleccionable?: boolean;
    /**
     * Renderiza un panel de detalles expandible para cada fila.
     */
    detalleFila?: (props: { row: MRT_Row<TData> }) => React.ReactNode;
    /**
     * Permite agregar items personalizados al menú de acciones de la fila.
     */
    /**
     * Permite agregar items personalizados al menú de acciones de la fila.
     */
    accionesMenu?: (props: { row: MRT_Row<TData>; closeMenu: () => void }) => React.ReactNode[];
    /**
     * Define el modo de edición de la tabla.
     * - 'modal': Abre un modal (interno de MRT o externo si se usa onEditar).
     * - 'linea': Edición en línea de toda la fila.
     * - 'celda': Edición por celda al hacer click.
     * - 'tabla': Edición masiva (todas las celdas editables).
     */
    modoEdicion?: 'modal' | 'linea' | 'celda' | 'tabla';
    /**
     * Callback para guardar los cambios de una fila (necesario para modos 'linea' y 'modal' internos).
     */
    onGuardarFila?: MRT_TableOptions<TData>['onEditingRowSave'];
    /**
     * Habilita el arrastrar y soltar filas para reordenarlas.
     * @default false
     */
    ordenarFilas?: boolean;
    /**
     * Habilita el pie de página fijo para mostrar totales o agregaciones.
     * @default false
     */
    mostrarTotales?: boolean;
    /**
     * Habilita la copia del contenido de la celda al hacer click.
     * @default false
     */
    clickParaCopiar?: boolean;
    /**
     * Habilita soporte para datos en árbol (Tree Data) y sub-filas.
     * @default false
     */
    arbol?: boolean;
    /**
     * Habilita la expansión de filas (útil para detalleFila o sub-filas manuales).
     * @default false
     */
    expandible?: boolean;
    /**
     * Habilita virtualización para mejorar rendimiento en listas largas.
     * Puede ser un booleano (activa todo) o un objeto.
     */
    virtualizacion?: boolean | { filas?: boolean; columnas?: boolean };
    /**
    * Habilita el fijado de filas (Sticky rows).
    * @default false
    */
    fijarFilas?: boolean;
    /**
     * Habilita el scroll infinito. Requiere `onCargarMas`.
     * Deshabilita la paginación estándar.
     * @default false
     */
    scrollInfinito?: boolean;
    /**
     * Callback para cargar más datos cuando se hace scroll al final.
     */
    onCargarMas?: () => void;
    /**
     * Total de registros en el servidor/fuente de datos.
     * Necesario para paginación remota o scroll infinito correcto.
     */
    totalRegistros?: number;
    /**
     * Habilita paginación manual (backend).
     * @default false
     */
    paginacionManual?: boolean;
    /**
     * Habilita ordenamiento manual (backend).
     * @default false
     */
    ordenamientoManual?: boolean;
    /**
     * Habilita filtrado manual (backend).
     * @default false
     */
    filtradoManual?: boolean;
}

/**
 * Componente de Tabla "CodeplexTabla".
 * 
 * Envuelve `MaterialReactTable` con configuraciones predeterminadas para un uso empresarial eficiente.
 * Incluye soporte para exportación, estilos premium y defaults inteligentes (Sticky Header, Densidad Compacta).
 * 
 * @example
 * <CodeplexTabla
 *   datos={data}
 *   columnas={columns}
 *   titulo="Listado de Empleados"
 *   habilitarExportacion
 * />
 */
export const CodeplexTabla = <TData extends MRT_RowData>({
    columnas,
    datos,
    opciones,
    titulo,
    cargando = false,
    habilitarExportacion = false,
    onEditar,
    onEliminar,
    filtrosAvanzados = false,
    agrupamiento = false,
    fijarColumnas = false,
    seleccionable = true,
    detalleFila,
    accionesMenu,
    modoEdicion,
    onGuardarFila,
    ordenarFilas = false,
    clickParaCopiar = false,
    arbol = false,
    expandible = false,
    virtualizacion,
    fijarFilas = false,
    scrollInfinito = false,
    onCargarMas,
    totalRegistros,
    paginacionManual = false,
    ordenamientoManual = false,
    filtradoManual = false,
    mostrarTotales = false,
}: CodeplexTablaProps<TData>) => {
    const theme = useTheme();
    const [anclaMenu, setAnclaMenu] = useState<null | HTMLElement>(null);
    const [anclaMenuAcciones, setAnclaMenuAcciones] = useState<null | HTMLElement>(null);
    const [filaAccion, setFilaAccion] = useState<MRT_Row<TData> | null>(null);

    // Manejo de scroll infinito
    const fetchMoreOnBottomReached = (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement && onCargarMas) {
            const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
            if (scrollHeight - scrollTop - clientHeight < 100 && !cargando) {
                onCargarMas();
            }
        }
    };

    const manejarExportacionDatos = (tipo: 'csv' | 'excel' | 'pdf', alcance: 'todo' | 'pagina' = 'todo') => {
        const filas = alcance === 'pagina'
            ? table.getRowModel().rows
            : table.getPrePaginationRowModel().rows;

        const columnasVisibles = table.getVisibleLeafColumns();
        // ... (resto de lógica de exportación igual)

        // Preparar datos para exportar usando Record<string, unknown> en lugar de any
        const datosFila = filas.map((fila) => {
            const filaObj: Record<string, unknown> = {};
            columnasVisibles.forEach(col => {
                if (
                    col.id !== 'mrt-row-actions' &&
                    col.id !== 'mrt-row-select' &&
                    col.id !== 'mrt-row-expand' &&
                    col.id !== 'actions' &&
                    col.id !== 'mrt-row-drag'
                ) {
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
            XLSX.writeFile(libroTrabajo, `exportacion_${alcance}.${tipo === 'excel' ? 'xlsx' : 'csv'}`);
        } else if (tipo === 'pdf') {
            const doc = new jsPDF();
            const datosTabla = filas.map((fila) => {
                return columnasVisibles
                    .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions' && col.id !== 'mrt-row-drag')
                    .map(col => String(fila.getValue(col.id) ?? ''));
            });
            const cabecerasTabla = columnasVisibles
                .filter(col => col.id !== 'mrt-row-actions' && col.id !== 'mrt-row-select' && col.id !== 'actions' && col.id !== 'mrt-row-drag')
                .map(col => String(col.columnDef.header ?? ''));

            autoTable(doc, {
                head: [cabecerasTabla],
                body: datosTabla,
            });
            doc.save(`exportacion_${alcance}.pdf`);
        }
        setAnclaMenu(null);
    };



    // Preparar estado inicial combinando defaults y opciones del usuario
    const finalInitialState = {
        ...opciones?.initialState,
    };

    if (fijarColumnas) {
        const userLeft = (opciones?.initialState?.columnPinning?.left || []).filter((c: string) => c !== 'mrt-row-select');
        const userRight = (opciones?.initialState?.columnPinning?.right || []).filter((c: string) => c !== 'mrt-row-actions');

        finalInitialState.columnPinning = {
            left: ['mrt-row-select', ...userLeft],
            right: [...userRight, 'mrt-row-actions'],
        };
    }

    const table = useMaterialReactTable({
        columns: columnas,
        data: datos,
        localization: MRT_Localization_ES,
        // Defaults Ultra Funcionales
        enableRowSelection: seleccionable,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enablePagination: !scrollInfinito, // Si es scroll infinito, apagar paginación normal
        enableStickyHeader: true, // Cabecera fija por defecto
        enableStickyFooter: mostrarTotales, // Pie de página fijo para totales
        enableDensityToggle: true, // Permitir cambiar densidad
        enableMultiSort: !ordenarFilas, // Desactivar si se está ordenando manualmente
        enableSorting: !ordenarFilas, // El ordenamiento choca con "Row Ordering"

        // Configuración Remota / Manual
        manualPagination: paginacionManual,
        manualSorting: ordenamientoManual,
        manualFiltering: filtradoManual,
        rowCount: totalRegistros,

        // Mapeo de Apis Simplificadas
        enableColumnFilterModes: filtrosAvanzados,
        enableFacetedValues: filtrosAvanzados,
        enableGrouping: agrupamiento,
        enableColumnPinning: fijarColumnas,
        enableRowOrdering: ordenarFilas,
        enableClickToCopy: clickParaCopiar,

        enableExpanding: arbol || expandible || !!detalleFila,
        enableRowPinning: fijarFilas,

        // Scroll Infinito y Virtualización
        enableRowVirtualization: scrollInfinito || (typeof virtualizacion === 'boolean' ? virtualizacion : virtualizacion?.filas),
        enableColumnVirtualization: typeof virtualizacion === 'boolean' ? false : virtualizacion?.columnas, // Column virt usually needs explicit widths
        muiTableContainerProps: {
            onScroll: (event) => {
                if (scrollInfinito) fetchMoreOnBottomReached(event.target as HTMLDivElement);
            },
            sx: { maxHeight: scrollInfinito ? '600px' : '70vh' }, // Altura fija necesaria para virtual/scroll
        },

        enableEditing: !!modoEdicion || !!onEditar || !!onEliminar,
        editDisplayMode: modoEdicion === 'linea' ? 'row' : modoEdicion === 'celda' ? 'cell' : modoEdicion === 'tabla' ? 'table' : 'modal',
        onEditingRowSave: onGuardarFila,

        // Configuración automática de acciones si se proveen callbacks
        // Soporte Híbrido: Botones Inline + Menú
        enableRowActions: !!onEditar || !!onEliminar || !!accionesMenu || (!!modoEdicion && (modoEdicion === 'linea' || modoEdicion === 'modal')) || opciones?.enableRowActions,
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Acciones',
                size: 100,
            },
        },
        renderDetailPanel: detalleFila,
        // renderRowActionMenuItems:accionesMenu, // Desactivamos el nativo para control manual híbrido
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {(onEditar || modoEdicion === 'linea' || modoEdicion === 'modal') && (
                    <Tooltip title="Editar">
                        <IconButton
                            onClick={() => onEditar ? onEditar(row.original) : table.setEditingRow(row)}
                            color="primary"
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {onEliminar && (
                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => onEliminar(row.original)}
                            color="error"
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {accionesMenu && (
                    <Tooltip title="Más acciones">
                        <IconButton
                            onClick={(e) => {
                                setAnclaMenuAcciones(e.currentTarget);
                                setFilaAccion(row);
                            }}
                            size="small"
                        >
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        ),
        state: {
            isLoading: cargando,
            showProgressBars: cargando, // Mostrar barras de progreso al cargar
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
        muiTableBodyRowProps: ({ row, table }) => {
            const { density } = table.getState();
            return {
                sx: {
                    // Styles for Pinned Rows (Fixed Height)
                    height: row.getIsPinned()
                        ? `${density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69}px`
                        : undefined,

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
            };
        },
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
            <Box sx={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ExpandAllButton table={table} />

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
                            <MenuItem onClick={() => manejarExportacionDatos('csv', 'todo')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>CSV (Todo)</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('csv', 'pagina')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>CSV (Página Actual)</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('excel', 'todo')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Excel (Todo)</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('excel', 'pagina')}>
                                <ListItemIcon><TableViewIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Excel (Página Actual)</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('pdf', 'todo')}>
                                <ListItemIcon><PdfIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>PDF (Todo)</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => manejarExportacionDatos('pdf', 'pagina')}>
                                <ListItemIcon><PdfIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>PDF (Página Actual)</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )}

                {/* Acciones por defecto de MRT pueden ir aquí si se necesitan */}
            </Box>
        ),
        // Permitir sobrescribir todo (merge profundo)
        ...opciones,
        initialState: finalInitialState,
    });

    return (
        <>
            {/* Modo Headless / Manual Construction */}
            {/* Modo Headless / Manual Construction */}
            <Paper {...table.options.muiTablePaperProps} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...(table.options.muiTablePaperProps as any)?.sx }}>
                <MRT_TopToolbar table={table} />
                <MRT_TableContainer table={table}>
                    <Table>
                        <MRT_TableHead table={table} />
                        <MRT_TableBody table={table} />
                    </Table>
                </MRT_TableContainer>
                <MRT_BottomToolbar table={table} />
            </Paper>

            {/* Menú de Acciones de Fila Híbrido */}
            <Menu
                anchorEl={anclaMenuAcciones}
                open={Boolean(anclaMenuAcciones) && !!filaAccion}
                onClose={() => { setAnclaMenuAcciones(null); setFilaAccion(null); }}
            >
                {accionesMenu && filaAccion && accionesMenu({
                    row: filaAccion,
                    closeMenu: () => { setAnclaMenuAcciones(null); setFilaAccion(null); }
                })}
            </Menu>
        </>
    );
};
