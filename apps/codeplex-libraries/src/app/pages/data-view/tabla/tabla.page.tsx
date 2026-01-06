
import { useMemo, useState, useEffect } from 'react';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_PaginationState,
    type MRT_SortingState,
    type MRT_ColumnFiltersState,
    CodeplexTabla,
} from '@codeplex-sac/data-view';
import {
    Box,
    ListItemIcon,
    MenuItem,
    Typography,
    Tabs,
    Tab,
    Chip,
    Button,
} from '@mui/material';
import {
    AttachMoney,
    Description,
    AccountCircle,
    Send,
    Inventory,
    FilterList,
    CloudSync,
    Autorenew,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CodeplexEncabezadoPrincipal } from '@codeplex-sac/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Set global locale
dayjs.locale('es');

// --- DATOS Y TIPOS ---

export type EstadoFactura = 'Pagado' | 'Pendiente' | 'Vencido' | 'Borrador';

export type Factura = {
    id: string;
    numeroFactura: string;
    nombreCliente: string;
    emailCliente: string;
    avatarCliente: string;
    monto: number;
    fechaEmision: string;
    fechaVencimiento: string;
    estado: EstadoFactura;
    items: number;
    subFilas?: Factura[];
};

// Generador de datos aleatorios
const generarDatos = (cantidad: number, prefijoId: string = ''): Factura[] => {
    return Array.from({ length: cantidad }).map((_, i) => ({
        id: `${prefijoId}${i}`,
        numeroFactura: `FAC-${prefijoId}${2025000 + i}`,
        nombreCliente: `Cliente ${prefijoId}${i}`,
        emailCliente: `cliente${prefijoId}${i}@empresa.com`,
        avatarCliente: '',
        monto: Math.floor(Math.random() * 10000),
        fechaEmision: '2025-01-01',
        fechaVencimiento: '2025-02-01',
        estado: ['Pendiente', 'Pagado', 'Vencido', 'Borrador'][Math.floor(Math.random() * 4)] as EstadoFactura,
        items: Math.floor(Math.random() * 10) + 1,
    }));
};

const datosEstaticos = generarDatos(20);
// Agregar subfilas a uno para demo de árbol
datosEstaticos[0].subFilas = generarDatos(3, 'SUB-');

// --- EJEMPLOS ---

/**
 * Muestra Filtros Avanzados, Facetas y Búsqueda.
 */
const TablaFiltros = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        {
            header: 'Información Base',
            meta: { headerBackgroundColor: '#e3f2fd' }, // Azul claro
            columns: [
                {
                    header: 'Identificación',
                    meta: { headerBackgroundColor: '#bbdefb' }, // Azul más intenso
                    columns: [
                        { accessorKey: 'numeroFactura', header: 'Factura', filterVariant: 'autocomplete' },
                        { accessorKey: 'nombreCliente', header: 'Cliente', filterVariant: 'text' },
                    ]
                }
            ],
        },
        {
            header: 'Gestión Financiera',
            meta: { headerBackgroundColor: '#f3e5f5' }, // Lila claro
            columns: [
                {
                    header: 'Cobranza',
                    meta: { headerBackgroundColor: '#e1bee7' }, // Lila más intenso
                    columns: [
                        {
                            accessorKey: 'monto',
                            header: 'Monto Total',
                            filterVariant: 'range-slider',
                            muiFilterSliderProps: {
                                marks: true,
                                max: 10000,
                                min: 0,
                                step: 100,
                            },
                            // (A) Alineación y Formato
                            muiTableHeadCellProps: { align: 'right' },
                            muiTableBodyCellProps: { align: 'right' },
                            muiTableFooterCellProps: { align: 'right' },
                            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' }),

                            // (B) Agregación (Totales)
                            aggregationFn: 'sum',
                            AggregatedCell: ({ cell }) => (
                                <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    {cell.getValue<number>()?.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
                                </Box>
                            ),
                            Footer: ({ table }) => {
                                // Calcular totales dinámicamente
                                const montosPagina = table.getRowModel().rows.map((row) => row.getValue<number>('monto'));
                                const totalPagina = montosPagina.reduce((a, b) => a + b, 0);

                                const montosTotal = table.getPrePaginationRowModel().rows.map((row) => row.getValue<number>('monto'));
                                const totalGlobal = montosTotal.reduce((a, b) => a + b, 0);

                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Box component="span" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                                            Pág: {totalPagina.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
                                        </Box>
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                                            Tot: {totalGlobal.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
                                        </Box>
                                    </Box>
                                );
                            }
                        },
                        {
                            accessorKey: 'estado',
                            header: 'Estado Actual',
                            filterVariant: 'multi-select',
                            filterSelectOptions: ['Pagado', 'Pendiente', 'Vencido', 'Borrador']
                        },
                    ]
                },
                {
                    header: 'Fechas',
                    meta: { headerBackgroundColor: '#fce4ec' }, // Rosa claro
                    columns: [
                        {
                            accessorFn: (row) => new Date(row.fechaVencimiento),
                            id: 'vencimiento',
                            header: 'Vencimiento',
                            filterVariant: 'date-range',
                            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                        }
                    ]
                }
            ],
        },
    ], []);

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosEstaticos}
            titulo="Avanzada (Dashboard)"

            // Props Nuevas
            filtrosAvanzados // Activa facetes, modos de filtro, etc.
            agrupamiento // (1) Agrupación de columnas
            habilitarExportacion // (2) Exportación (Todo/Pagina)
            ordenarFilas // (4) Mover filas

            // (6) Acciones 1 y 2 (Editar/Eliminar) + 3 Puntitos
            onEditar={(row) => alert(`Editando ${row.numeroFactura}`)}
            onEliminar={(row) => alert(`Eliminando ${row.numeroFactura}`)}
            accionesMenu={({ closeMenu, row }) => [
                <MenuItem key="1" onClick={closeMenu}><ListItemIcon><Description /></ListItemIcon> Ver Detalles</MenuItem>,
                <MenuItem key="2" onClick={closeMenu}><ListItemIcon><Send /></ListItemIcon> Enviar por Correo</MenuItem>
            ]}
            fijarColumnas

            fijarFilas // (5) Fijar filas (Row Pinning)
            mostrarTotales // (7) Mostrar totales en Footer

            opciones={{
                getRowId: (row) => row.id, // Importante: usar el ID para fixar
                initialState: {
                    showColumnFilters: true, // Buscador por columna
                    // grouping: ['estado'], // Agrupado por defecto para demo
                    columnPinning: {
                        right: ['nombreCliente'], // Fijar 'monto' a la derecha (junto a acciones)
                    },
                    // rowPinning: {
                    //     top: ['0', '1'], // Fijar las dos primeras filas (IDs '0' y '1')
                    // }
                },
            }}
        />
    );
};

/**
 * Muestra Datos Remotos con paginación manual enviada al backend simulado.
 */
const TablaRemota = () => {
    const [datos, setDatos] = useState<Factura[]>([]);
    const [cargando, setCargando] = useState(false);
    const [paginacion, setPaginacion] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
    const [orden, setOrden] = useState<MRT_SortingState>([]);
    const [filtros, setFiltros] = useState<MRT_ColumnFiltersState>([]);
    const [total, setTotal] = useState(0);

    // Simular fetch
    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simular filtrado/paginación server-side
            const start = paginacion.pageIndex * paginacion.pageSize;
            const end = start + paginacion.pageSize;
            setDatos(generarDatos(paginacion.pageSize, `P${paginacion.pageIndex}-`));
            setTotal(100); // 100 items total simulados
            setCargando(false);
        };
        fetchData();
    }, [paginacion, orden, filtros]);

    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'estado', header: 'Estado' },
    ], []);

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datos}
            titulo="Datos Remotos (Server-Side)"
            cargando={cargando}

            // Configuración Manual (Backend)
            paginacionManual
            ordenamientoManual
            filtradoManual
            totalRegistros={total}

            // Listeners
            opciones={{
                onPaginationChange: setPaginacion,
                onSortingChange: setOrden,
                onColumnFiltersChange: setFiltros,
                state: { pagination: paginacion, sorting: orden, columnFilters: filtros }
            }}
        />
    );
};

/**
 * Muestra Scroll Infinito cargando datos a medida que se baja.
 */
const TablaInfinita = () => {
    const [datos, setDatos] = useState<Factura[]>(() => generarDatos(20));
    const [cargando, setCargando] = useState(false);

    const cargarMas = async () => {
        if (cargando) return;
        setCargando(true);
        await new Promise(r => setTimeout(r, 1000));
        const nuevos = generarDatos(20, `MORE-${datos.length}-`);
        setDatos(prev => [...prev, ...nuevos]);
        setCargando(false);
    };

    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'id', header: 'ID', size: 80 },
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto' },
    ], []);

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datos}
            titulo="Scroll Infinito (Lazy Loading)"
            cargando={cargando}

            // Props Nuevas
            scrollInfinito
            onCargarMas={cargarMas}
            totalRegistros={1000} // Total virtual
        />
    );
};

// --- RESTO DE EJEMPLOS ANTERIORES (Actualizados) ---

const TablaBasica = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto' },
        { accessorKey: 'estado', header: 'Estado' },
    ], []);
    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosEstaticos}
            titulo="Básico & Pinning"
            fijarColumnas
            clickParaCopiar
            fijarFilas
        />
    );
};

const TablaEdicion = () => {
    const [datos, setDatos] = useState(() => datosEstaticos);
    const [modo, setModo] = useState<'linea' | 'celda'>('linea');
    const handleSave = ({ values, row, exitEditingMode }: any) => {
        const nuevos = [...datos];
        nuevos[row.index] = values;
        setDatos(nuevos);
        exitEditingMode();
    };
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'numeroFactura', header: 'Factura', enableEditing: false },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto' },
    ], []);
    return (
        <Box>
            <Box mb={2} display="flex" gap={2}>
                <Button variant={modo === 'linea' ? 'contained' : 'outlined'} onClick={() => setModo('linea')}>Modo Línea</Button>
                <Button variant={modo === 'celda' ? 'contained' : 'outlined'} onClick={() => setModo('celda')}>Modo Celda</Button>
            </Box>
            <CodeplexTabla columnas={columnas} datos={datos} titulo="Edición CRUD" modoEdicion={modo} onGuardarFila={handleSave} />
        </Box>
    );
};

const TablaArbol = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto', aggregationFn: 'sum', AggregatedCell: ({ cell }) => <Box fontWeight="bold">S/ {cell.getValue<number>()}</Box> }
    ], []);
    return <CodeplexTabla columnas={columnas} datos={datosEstaticos} titulo="Árbol y Agrupamiento" arbol agrupamiento expandible />;
};

const TablaInteractiva = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'estado', header: 'Estado' }
    ], []);
    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosEstaticos}
            titulo="Drag & Drop Rows"
            ordenarFilas
            accionesMenu={({ closeMenu }) => [<MenuItem key="1" onClick={closeMenu}>Acción Custom</MenuItem>]}
        />
    );
};

const TablaVirtualizada = () => {
    const datosLargos = useMemo(() => generarDatos(1000), []);
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'id', header: 'ID', size: 60 },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto' },
    ], []);
    return <CodeplexTabla columnas={columnas} datos={datosLargos} titulo="Virtualización 1k filas" virtualizacion opciones={{ enablePagination: false, enableBottomToolbar: false, muiTableContainerProps: { sx: { maxHeight: '500px' } } }} />;
};


// --- PÁGINA PRINCIPAL ---

export const TablePage = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <CodeplexEncabezadoPrincipal
                titulo="Galería de Componentes - Tablas"
                subtitulo="Showcase completo de todas las funcionalidades de CodeplexTabla."
            />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
                    <Tab label="Avanzada (Dashboard)" icon={<FilterList />} iconPosition="start" />
                    <Tab label="Gestión CRUD" icon={<AttachMoney />} iconPosition="start" />
                    <Tab label="Virtualización" icon={<AccountCircle />} iconPosition="start" />
                    <Tab label="Minimalista" icon={<Description />} iconPosition="start" />
                    <Tab label="Árbol & Grupos" icon={<Inventory />} iconPosition="start" />
                    <Tab label="Interactividad" icon={<Send />} iconPosition="start" />
                    <Tab label="Datos Remotos" icon={<CloudSync />} iconPosition="start" />
                    <Tab label="Scroll Infinito" icon={<Autorenew />} iconPosition="start" />
                </Tabs>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Box sx={{ mt: 3, p: 1 }}>
                    {tab === 0 && <TablaFiltros />}
                    {tab === 1 && <TablaEdicion />}
                    {tab === 2 && <TablaVirtualizada />}
                    {tab === 3 && <TablaBasica />} {/* Usamos Básica como Minimalista mejorada */}
                    {tab === 4 && <TablaArbol />}
                    {tab === 5 && <TablaInteractiva />}
                    {tab === 6 && <TablaRemota />}
                    {tab === 7 && <TablaInfinita />}
                </Box>
            </LocalizationProvider>
        </div>
    );
};
