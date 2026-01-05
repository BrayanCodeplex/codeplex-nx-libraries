import { useMemo, useState } from 'react';
import {
    type MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    CodeplexTabla,
} from '@codeplex-sac/data-view';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    lighten,
    Chip,
    Avatar,
    alpha,
    Tabs,
    Tab,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    AttachMoney,
    Description,
    CheckCircle,
    Edit,
    Delete,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CodeplexEncabezadoPrincipal } from '@codeplex-sac/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Set global locale
dayjs.locale('es');

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
};

// --- Datos Simulados ---
export const datosIniciales: Factura[] = [
    {
        id: '1',
        numeroFactura: 'FAC-2024-001',
        nombreCliente: 'Soluciones Tech SAC',
        emailCliente: 'contabilidad@techsolutions.com',
        avatarCliente: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=0D8ABC&color=fff',
        monto: 15400.00,
        fechaEmision: '2025-01-15',
        fechaVencimiento: '2025-02-15',
        estado: 'Pendiente',
        items: 3,
    },
    {
        id: '2',
        numeroFactura: 'FAC-2024-002',
        nombreCliente: 'Logística Global',
        emailCliente: 'pagos@globallogistics.co',
        avatarCliente: 'https://ui-avatars.com/api/?name=Global+Logistics&background=ffd700&color=000',
        monto: 2500.50,
        fechaEmision: '2024-12-20',
        fechaVencimiento: '2025-01-20',
        estado: 'Vencido',
        items: 12,
    },
    {
        id: '3',
        numeroFactura: 'FAC-2024-003',
        nombreCliente: 'Estudio Creativo',
        emailCliente: 'finanzas@creativestudio.net',
        avatarCliente: 'https://ui-avatars.com/api/?name=Estudio+Creativo&background=ff6b6b&color=fff',
        monto: 850.00,
        fechaEmision: '2025-02-01',
        fechaVencimiento: '2025-02-15',
        estado: 'Pagado',
        items: 1,
    },
    {
        id: '4',
        numeroFactura: 'FAC-2024-004',
        nombreCliente: 'Corp Acme',
        emailCliente: 'pagos@acme.com',
        avatarCliente: 'https://ui-avatars.com/api/?name=Acme+Corp&background=4ecdc4&color=fff',
        monto: 50000.00,
        fechaEmision: '2025-02-10',
        fechaVencimiento: '2025-03-10',
        estado: 'Borrador',
        items: 5,
    },
    {
        id: '5',
        numeroFactura: 'FAC-2024-005',
        nombreCliente: 'Centro StartUp',
        emailCliente: 'hola@streamhub.io',
        avatarCliente: 'https://ui-avatars.com/api/?name=StartUp+Hub&background=1a535c&color=fff',
        monto: 3200.75,
        fechaEmision: '2025-01-05',
        fechaVencimiento: '2025-02-05',
        estado: 'Pagado',
        items: 8,
    },
];

// --- Componentes ---

const TablaMinimalista = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        {
            accessorKey: 'monto',
            header: 'Monto',
            Cell: ({ cell }) => `S/ ${cell.getValue<number>().toLocaleString()}`
        },
        { accessorKey: 'estado', header: 'Estado' },
    ], []);

    return <CodeplexTabla
        columnas={columnas}
        datos={datosIniciales}
        titulo="Ejemplo Minimalista"
        opciones={{
            enableTopToolbar: false,
            enableBottomToolbar: false,
        }}
    />;
};

const TablaAvanzada = () => {
    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(
        () => [
            {
                id: 'info_factura',
                header: 'Detalles de Factura',
                columns: [
                    {
                        accessorKey: 'numeroFactura',
                        header: 'N° Factura',
                        size: 140,
                        enableClickToCopy: true,
                        filterVariant: 'autocomplete',
                        Cell: ({ cell }) => (
                            <Box sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}>
                                {cell.getValue<string>()}
                            </Box>
                        )
                    },
                    {
                        accessorFn: (row) => `${row.nombreCliente}`,
                        id: 'cliente',
                        header: 'Cliente',
                        size: 250,
                        Cell: ({ row }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Avatar
                                    src={row.original.avatarCliente}
                                    alt={row.original.nombreCliente}
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {row.original.nombreCliente}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {row.original.emailCliente}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    },
                ],
            },
            {
                id: 'finanzas',
                header: 'Finanzas',
                columns: [
                    {
                        accessorKey: 'monto',
                        filterFn: 'between',
                        header: 'Monto',
                        size: 160,
                        Cell: ({ cell }) => (
                            <Box
                                component="span"
                                sx={() => ({
                                    color: cell.getValue<number>() > 10000 ? 'success.main' : 'text.primary',
                                    fontWeight: 700,
                                })}
                            >
                                {cell.getValue<number>()?.toLocaleString?.('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                })}
                            </Box>
                        ),
                    },
                    {
                        accessorKey: 'estado',
                        header: 'Estado',
                        size: 120,
                        filterVariant: 'select',
                        filterSelectOptions: ['Pagado', 'Pendiente', 'Vencido', 'Borrador'],
                        Cell: ({ cell }) => {
                            const estado = cell.getValue<EstadoFactura>();
                            let color: any = 'default';
                            if (estado === 'Pagado') color = 'success';
                            if (estado === 'Pendiente') color = 'warning';
                            if (estado === 'Vencido') color = 'error';
                            return (
                                <Chip
                                    label={estado}
                                    color={color}
                                    size="small"
                                    variant="filled"
                                    sx={{ fontWeight: 600, minWidth: 80 }}
                                />
                            );
                        },
                    },
                    {
                        accessorFn: (row) => new Date(row.fechaVencimiento),
                        id: 'fechaVencimiento',
                        header: 'Vencimiento',
                        filterVariant: 'date',
                        sortingFn: 'datetime',
                        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('DD MMM, YYYY'),
                    },
                ],
            },
        ],
        [],
    );

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosIniciales}
            titulo="Facturación Avanzada"
            habilitarExportacion
            opciones={{
                enableColumnFilterModes: true,
                enableColumnOrdering: true,
                enableGrouping: true,
                enableColumnPinning: true,
                enableFacetedValues: true,
                enableRowActions: true,
                enableRowSelection: true,
                initialState: {
                    showColumnFilters: true,
                    showGlobalFilter: true,
                    columnPinning: {
                        left: ['mrt-row-expand', 'mrt-row-select'],
                        right: ['mrt-row-actions'],
                    },
                    sorting: [{ id: 'fechaVencimiento', desc: false }],
                },
                paginationDisplayMode: 'pages',
                positionToolbarAlertBanner: 'bottom',
                muiPaginationProps: {
                    color: 'primary',
                    shape: 'rounded',
                    variant: 'outlined',
                },
                renderDetailPanel: ({ row }) => (
                    <Box sx={{ p: 3, backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05) }}>
                        <Typography variant="h6" gutterBottom>Ítems: {row.original.items}</Typography>
                        <Typography variant="body2">Detalles del desglose de la factura aquí...</Typography>
                    </Box>
                ),
                renderRowActionMenuItems: ({ closeMenu, row }) => [
                    <MenuItem key="view" onClick={() => closeMenu()}>
                        <ListItemIcon><Description fontSize="small" /></ListItemIcon> Ver Factura
                    </MenuItem>,
                    <MenuItem key="pay" onClick={() => closeMenu()} disabled={row.original.estado === 'Pagado'}>
                        <ListItemIcon><AttachMoney fontSize="small" /></ListItemIcon> Registrar Pago
                    </MenuItem>,
                ],
                renderTopToolbar: ({ table }) => (
                    <Box sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex', gap: '0.5rem', p: '8px', justifyContent: 'space-between', borderRadius: 1
                    })}>
                        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <MRT_GlobalFilterTextField table={table} />
                            <MRT_ToggleFiltersButton table={table} />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    color="primary"
                                    startIcon={<CheckCircle />}
                                    disabled={!table.getIsSomeRowsSelected()}
                                    variant="contained"
                                    size="small"
                                    onClick={() => alert('Pagado')}
                                >
                                    Marcar Pagado
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ),
            }}
        />
    );
};

const TablaCRUD = () => {
    const [datosTabla, setDatosTabla] = useState<Factura[]>(() => datosIniciales);

    const manejarGuardarFila = ({ exitEditingMode, row, values }: any) => {
        datosTabla[row.index] = values;
        setDatosTabla([...datosTabla]);
        exitEditingMode();
    };

    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'id', header: 'ID', enableEditing: false, size: 80 },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto', filterFn: 'between' },
        {
            accessorKey: 'estado',
            header: 'Estado',
            editVariant: 'select',
            editSelectOptions: ['Pagado', 'Pendiente', 'Vencido', 'Borrador']
        },
    ], []);

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosTabla}
            titulo="Gestión CRUD (Edición Modal)"
            opciones={{
                enableEditing: true,
                onEditingRowSave: manejarGuardarFila,
                renderRowActions: ({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip title="Editar">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton color="error" onClick={() => {
                                const nuevosDatos = [...datosTabla];
                                nuevosDatos.splice(row.index, 1);
                                setDatosTabla(nuevosDatos);
                            }}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
                renderTopToolbarCustomActions: ({ table }) => (
                    <Button variant="contained" onClick={() => {
                        alert('Crear nueva factura (simulado)');
                    }}>
                        Crear Nueva Factura
                    </Button>
                )
            }}
        />
    );
};

const TablaVirtualizada = () => {
    // Generar 500 filas falsas al vuelo
    const datosLargos = useMemo(() => {
        const filas = [];
        for (let i = 0; i < 500; i++) {
            filas.push({
                id: i.toString(),
                numeroFactura: `FAC-${2025000 + i}`,
                nombreCliente: `Cliente ${i}`,
                emailCliente: `cliente${i}@test.com`,
                avatarCliente: '',
                monto: Math.floor(Math.random() * 10000),
                fechaEmision: '2025-01-01',
                fechaVencimiento: '2025-02-01',
                estado: 'Pendiente' as EstadoFactura,
                items: Math.floor(Math.random() * 10)
            });
        }
        return filas;
    }, []);

    const columnas = useMemo<MRT_ColumnDef<Factura>[]>(() => [
        { accessorKey: 'id', header: 'ID', size: 60 },
        { accessorKey: 'numeroFactura', header: 'Factura' },
        { accessorKey: 'nombreCliente', header: 'Cliente' },
        { accessorKey: 'monto', header: 'Monto' },
    ], []);

    return (
        <CodeplexTabla
            columnas={columnas}
            datos={datosLargos}
            titulo="Virtualización (500 filas)"
            opciones={{
                enableRowVirtualization: true,
                enablePagination: false,
                enableBottomToolbar: false,
                muiTableContainerProps: { sx: { maxHeight: '500px' } },
            }}
        />
    );
};


export const TablePage = () => {
    const [valorPestana, setValorPestana] = useState(0);

    const manejarCambio = (evento: React.SyntheticEvent, nuevoValor: number) => {
        setValorPestana(nuevoValor);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <CodeplexEncabezadoPrincipal
                titulo="Facturación y Contabilidad"
                subtitulo="Ejemplos de tablas avanzadas con filtrado, edición y virtualización."
            />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valorPestana} onChange={manejarCambio} aria-label="ejemplos de tabla">
                    <Tab label="Avanzada (Dashboard)" />
                    <Tab label="Gestión CRUD" />
                    <Tab label="Virtualización" />
                    <Tab label="Minimalista" />
                </Tabs>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Box sx={{ mt: 3 }}>
                    {valorPestana === 0 && <TablaAvanzada />}
                    {valorPestana === 1 && <TablaCRUD />}
                    {valorPestana === 2 && <TablaVirtualizada />}
                    {valorPestana === 3 && <TablaMinimalista />}
                </Box>
            </LocalizationProvider>
        </div>
    );
};
