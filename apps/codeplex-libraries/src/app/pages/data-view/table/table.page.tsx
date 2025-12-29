import { useMemo, useState } from 'react';
import {
    type MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    CodeplexTable,
    type MRT_Row,
    MRT_EditActionButtons
} from '@codeplex-qwik/data-view';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    lighten,
    useTheme,
    Chip,
    Stack,
    Avatar,
    alpha,
    Tabs,
    Tab,
    Paper,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    ReceiptLong,
    AttachMoney,
    Description,
    Send,
    Cancel,
    CheckCircle,
    AccessTime,
    Edit,
    Delete,
    Save
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CodeplexJumbotron } from '@codeplex-qwik/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Set global locale
dayjs.locale('es');

export type InvoiceStatus = 'Pagado' | 'Pendiente' | 'Vencido' | 'Borrador';

export type Invoice = {
    id: string;
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    clientAvatar: string;
    amount: number;
    issueDate: string;
    dueDate: string;
    status: InvoiceStatus;
    items: number;
};

// --- Mock Data ---
export const initialData: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        clientName: 'Tech Solutions Inc.',
        clientEmail: 'accounts@techsolutions.com',
        clientAvatar: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=0D8ABC&color=fff',
        amount: 15400.00,
        issueDate: '2025-01-15',
        dueDate: '2025-02-15',
        status: 'Pendiente',
        items: 3,
    },
    {
        id: '2',
        invoiceNumber: 'INV-2024-002',
        clientName: 'Global Logistics',
        clientEmail: 'billing@globallogistics.co',
        clientAvatar: 'https://ui-avatars.com/api/?name=Global+Logistics&background=ffd700&color=000',
        amount: 2500.50,
        issueDate: '2024-12-20',
        dueDate: '2025-01-20',
        status: 'Vencido',
        items: 12,
    },
    {
        id: '3',
        invoiceNumber: 'INV-2024-003',
        clientName: 'Creative Design Studio',
        clientEmail: 'finance@creativestudio.net',
        clientAvatar: 'https://ui-avatars.com/api/?name=Creative+Design&background=ff6b6b&color=fff',
        amount: 850.00,
        issueDate: '2025-02-01',
        dueDate: '2025-02-15',
        status: 'Pagado',
        items: 1,
    },
    {
        id: '4',
        invoiceNumber: 'INV-2024-004',
        clientName: 'Acme Corp',
        clientEmail: 'payables@acme.com',
        clientAvatar: 'https://ui-avatars.com/api/?name=Acme+Corp&background=4ecdc4&color=fff',
        amount: 50000.00,
        issueDate: '2025-02-10',
        dueDate: '2025-03-10',
        status: 'Borrador',
        items: 5,
    },
    {
        id: '5',
        invoiceNumber: 'INV-2024-005',
        clientName: 'StartUp Hub',
        clientEmail: 'hello@streamhub.io',
        clientAvatar: 'https://ui-avatars.com/api/?name=StartUp+Hub&background=1a535c&color=fff',
        amount: 3200.75,
        issueDate: '2025-01-05',
        dueDate: '2025-02-05',
        status: 'Pagado',
        items: 8,
    },
];

// --- Components ---

const MinimalTable = () => {
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(() => [
        { accessorKey: 'invoiceNumber', header: 'Factura' },
        { accessorKey: 'clientName', header: 'Cliente' },
        {
            accessorKey: 'amount',
            header: 'Monto',
            Cell: ({ cell }) => `S/ ${cell.getValue<number>().toLocaleString()}`
        },
        { accessorKey: 'status', header: 'Estado' },
    ], []);

    return <CodeplexTable
        columns={columns}
        data={initialData}
        title="Ejemplo Minimalista"
        options={{
            enableTopToolbar: false,
            enableBottomToolbar: false,
        }}
    />;
};

const AdvancedTable = () => {
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            {
                id: 'invoice_info',
                header: 'Detalles de Factura',
                columns: [
                    {
                        accessorKey: 'invoiceNumber',
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
                        accessorFn: (row) => `${row.clientName}`,
                        id: 'client',
                        header: 'Cliente',
                        size: 250,
                        Cell: ({ row }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Avatar
                                    src={row.original.clientAvatar}
                                    alt={row.original.clientName}
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {row.original.clientName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {row.original.clientEmail}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    },
                ],
            },
            {
                id: 'financials',
                header: 'Finanzas',
                columns: [
                    {
                        accessorKey: 'amount',
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
                        accessorKey: 'status',
                        header: 'Estado',
                        size: 120,
                        filterVariant: 'select',
                        filterSelectOptions: ['Pagado', 'Pendiente', 'Vencido', 'Borrador'],
                        Cell: ({ cell }) => {
                            const status = cell.getValue<InvoiceStatus>();
                            let color: any = 'default';
                            if (status === 'Pagado') color = 'success';
                            if (status === 'Pendiente') color = 'warning';
                            if (status === 'Vencido') color = 'error';
                            return (
                                <Chip
                                    label={status}
                                    color={color}
                                    size="small"
                                    variant="filled"
                                    sx={{ fontWeight: 600, minWidth: 80 }}
                                />
                            );
                        },
                    },
                    {
                        accessorFn: (row) => new Date(row.dueDate),
                        id: 'dueDate',
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
        <CodeplexTable
            columns={columns}
            data={initialData}
            title="Facturación Avanzada"
            options={{
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
                    sorting: [{ id: 'dueDate', desc: false }],
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
                    <MenuItem key="pay" onClick={() => closeMenu()} disabled={row.original.status === 'Pagado'}>
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

const CrudTable = () => {
    const [tableData, setTableData] = useState<Invoice[]>(() => initialData);

    const handleSaveRow = ({ exitEditingMode, row, values }: any) => {
        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode();
    };

    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(() => [
        { accessorKey: 'id', header: 'ID', enableEditing: false, size: 80 },
        { accessorKey: 'clientName', header: 'Cliente' },
        { accessorKey: 'amount', header: 'Monto', filterFn: 'between' },
        {
            accessorKey: 'status',
            header: 'Estado',
            editVariant: 'select',
            editSelectOptions: ['Pagado', 'Pendiente', 'Vencido', 'Borrador']
        },
    ], []);

    return (
        <CodeplexTable
            columns={columns}
            data={tableData}
            title="Gestión CRUD (Edición Modal)"
            options={{
                enableEditing: true,
                onEditingRowSave: handleSaveRow,
                renderRowActions: ({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip title="Editar">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton color="error" onClick={() => {
                                const newData = [...tableData];
                                newData.splice(row.index, 1);
                                setTableData(newData);
                            }}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
                renderTopToolbarCustomActions: ({ table }) => (
                    <Button variant="contained" onClick={() => {
                        // Create logic here
                        alert('Crear nueva factura (simulado)');
                    }}>
                        Crear Nueva Factura
                    </Button>
                )
            }}
        />
    );
};

const VirtualTable = () => {
    // Generate 500 fake rows on the fly
    const longData = useMemo(() => {
        const rows = [];
        for (let i = 0; i < 500; i++) {
            rows.push({
                id: i.toString(),
                invoiceNumber: `INV-${2025000 + i}`,
                clientName: `Cliente ${i}`,
                clientEmail: `cliente${i}@test.com`,
                clientAvatar: '',
                amount: Math.floor(Math.random() * 10000),
                issueDate: '2025-01-01',
                dueDate: '2025-02-01',
                status: 'Pendiente' as InvoiceStatus,
                items: Math.floor(Math.random() * 10)
            });
        }
        return rows;
    }, []);

    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(() => [
        { accessorKey: 'id', header: 'ID', size: 60 },
        { accessorKey: 'invoiceNumber', header: 'Factura' },
        { accessorKey: 'clientName', header: 'Cliente' },
        { accessorKey: 'amount', header: 'Monto' },
    ], []);

    return (
        <CodeplexTable
            columns={columns}
            data={longData}
            title="Virtualización (500 filas)"
            options={{
                enableRowVirtualization: true,
                enablePagination: false,
                enableBottomToolbar: false,
                muiTableContainerProps: { sx: { maxHeight: '500px' } },
            }}
        />
    );
};


export const TablePage = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <CodeplexJumbotron
                title="Facturación y Contabilidad"
                subtitle="Ejemplos de tablas avanzadas con filtrado, edición y virtualización."
            />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="table examples">
                    <Tab label="Avanzada (Dashboard)" />
                    <Tab label="Gestión CRUD" />
                    <Tab label="Virtualización" />
                    <Tab label="Minimalista" />
                </Tabs>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Box sx={{ mt: 3 }}>
                    {tabValue === 0 && <AdvancedTable />}
                    {tabValue === 1 && <CrudTable />}
                    {tabValue === 2 && <VirtualTable />}
                    {tabValue === 3 && <MinimalTable />}
                </Box>
            </LocalizationProvider>
        </div>
    );
};
