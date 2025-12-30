import { useState, useMemo } from 'react';
import {
    CodeplexButton,
    CodeplexSwitch,
    CodeplexToast,
    CodeplexCard,
    CodeplexBadge
} from '@codeplex-qwik/ui';
import { CodeplexTable, type MRT_ColumnDef } from '@codeplex-qwik/data-view';
import { CodeplexDatePicker } from '@codeplex-qwik/date-pickers';
import { CodeplexTabs } from '@codeplex-qwik/navigation';
import { CodeplexGrid, CodeplexStack, CodeplexBox, CodeplexContainer } from '@codeplex-qwik/layout';
import {
    Search as SearchIcon,
    Add as AddIcon,
    FilterList as FilterIcon,
    Settings as SettingsIcon,
    Description as DescriptionIcon,
    Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

// --- MOCK DATA FOR INVOICES ---
interface Invoice {
    id: string;
    correlativo: number;
    estado_sunat: 'ACEPTADO' | 'ANULADO' | 'PENDIENTE';
    documento: string;
    f_emision: string;
    f_vcto: string;
    proveedor: string;
    afecto: number;
    total_igv: number;
    total: number;
    tot_soles: number;
    fec_creacion: string;
}

const MOCK_INVOICES: Invoice[] = [
    { id: '1', correlativo: 1, estado_sunat: 'ACEPTADO', documento: 'F-FC08-946', f_emision: '15/12/2025', f_vcto: '15/12/2025', proveedor: '20101951872 - EMPRESAS COMERCIALES S.A Y/O EMCOMER S.A', afecto: 220.34, total_igv: 39.66, total: 260.00, tot_soles: 260.00, fec_creacion: 'DEMOS - 15/12' },
    { id: '2', correlativo: 2, estado_sunat: 'ACEPTADO', documento: 'F-FC05-6132', f_emision: '17/12/2025', f_vcto: '17/12/2025', proveedor: '20101951872 - EMPRESAS COMERCIALES S.A Y/O EMCOMER S.A', afecto: 7203.39, total_igv: 1296.61, total: 8500.00, tot_soles: 8500.00, fec_creacion: 'DEMOS - 17/12' },
    { id: '3', correlativo: 3, estado_sunat: 'PENDIENTE', documento: 'F-FC08-6423', f_emision: '17/12/2025', f_vcto: '17/12/2025', proveedor: '10461222230 - BENITES PUSE YENY YSABEL', afecto: 1700.00, total_igv: 306.00, total: 2006.00, tot_soles: 2006.00, fec_creacion: 'DEMOS - 17/12' },
    { id: '4', correlativo: 4, estado_sunat: 'ANULADO', documento: 'F-FC01-1123', f_emision: '18/12/2025', f_vcto: '30/12/2025', proveedor: '20555123456 - TECH SOLUTIONS SAC', afecto: 500.00, total_igv: 90.00, total: 590.00, tot_soles: 590.00, fec_creacion: 'DEMOS - 18/12' },
    { id: '5', correlativo: 5, estado_sunat: 'ACEPTADO', documento: 'F-FC99-8888', f_emision: '19/12/2025', f_vcto: '19/12/2025', proveedor: '20100000001 - SERVICIOS GENERALES PERU', afecto: 120.00, total_igv: 21.60, total: 141.60, tot_soles: 141.60, fec_creacion: 'DEMOS - 19/12' },
];

export const BillingPage = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2025-12-01'));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2025-12-30'));
    const [verTodo, setVerTodo] = useState(false);
    const [mes, setMes] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Columns Definition with Grouping and Formatting
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            {
                id: 'actions',
                header: 'Acciones',
                size: 100,
                enableSorting: false,
                enableColumnFilter: false,
                enablePinning: true,
                Cell: () => (
                    <CodeplexBox display="flex" justifyContent="center">
                        <CodeplexButton variant="ghost" size="xs">
                            <SettingsIcon fontSize="small" />
                        </CodeplexButton>
                    </CodeplexBox>
                ),
            },
            {
                id: 'info_general',
                header: 'Información General',
                columns: [
                    {
                        accessorKey: 'correlativo',
                        header: 'Correlativo',
                        size: 130,
                    },
                    {
                        accessorKey: 'estado_sunat',
                        header: 'Estado SUNAT',
                        size: 160,
                        filterVariant: 'select',
                        Cell: ({ cell }) => {
                            const status = cell.getValue<string>();
                            const colorMap: Record<string, any> = {
                                'ACEPTADO': 'success',
                                'ANULADO': 'error',
                                'PENDIENTE': 'warning'
                            };
                            return (
                                <CodeplexBadge
                                    badgeContent={status}
                                    color={colorMap[status] || 'default'}
                                    sx={{ '& .MuiBadge-badge': { transform: 'none', position: 'static' } }}
                                />
                            );
                        }
                    },
                    { accessorKey: 'documento', header: 'Documento', size: 140 },
                ]
            },
            {
                id: 'dates',
                header: 'Fechas',
                columns: [
                    { accessorKey: 'f_emision', header: 'F. Emisión', size: 120 },
                    { accessorKey: 'f_vcto', header: 'F. Vencimiento', size: 120 },
                ]
            },
            {
                accessorKey: 'proveedor',
                header: 'Proveedor',
                size: 320,
            },
            {
                id: 'montos',
                header: 'Importes Monetarios',
                columns: [
                    {
                        accessorKey: 'afecto',
                        header: 'Afecto',
                        size: 120,
                        muiTableBodyCellProps: { align: 'right' },
                        muiTableHeadCellProps: { align: 'right' },
                        Cell: ({ cell }) => cell.getValue<number>().toFixed(2)
                    },
                    {
                        accessorKey: 'total_igv',
                        header: 'IGV',
                        size: 120,
                        muiTableBodyCellProps: { align: 'right' },
                        muiTableHeadCellProps: { align: 'right' },
                        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
                        Footer: () => {
                            const total = MOCK_INVOICES.reduce((acc, curr) => acc + curr.total_igv, 0);
                            return <CodeplexBox fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexBox>
                        }
                    },
                    {
                        accessorKey: 'total',
                        header: 'Total',
                        size: 120,
                        muiTableBodyCellProps: { align: 'right' },
                        muiTableHeadCellProps: { align: 'right' },
                        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
                        Footer: () => {
                            const total = MOCK_INVOICES.reduce((acc, curr) => acc + curr.total, 0);
                            return <CodeplexBox fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexBox>
                        }
                    },
                    {
                        accessorKey: 'tot_soles',
                        header: 'Total Soles',
                        size: 130,
                        muiTableBodyCellProps: { align: 'right' },
                        muiTableHeadCellProps: { align: 'right' },
                        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
                        Footer: () => {
                            const total = MOCK_INVOICES.reduce((acc, curr) => acc + curr.tot_soles, 0);
                            return <CodeplexBox fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexBox>
                        }
                    },
                ]
            },
            { accessorKey: 'fec_creacion', header: 'Creado', size: 130 },
        ],
        []
    );

    return (
        <CodeplexContainer maxWidth={false} sx={{ px: 2, py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* --- HEADER --- */}
            <CodeplexBox mb={2}>
                <CodeplexStack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary', mb: 0.5, fontSize: '0.875rem' }}>
                    <DescriptionIcon fontSize="small" />
                    <span>/</span>
                    <span>Facturación</span>
                    <span>/</span>
                    <Typography color="primary" variant="body2" component="span" fontWeight="medium">Facturación de Compras</Typography>
                </CodeplexStack>

                <CodeplexStack direction="row" alignItems="center" spacing={2}>
                    <CodeplexBox
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            borderRadius: 1,
                            p: 0.8,
                            display: 'flex'
                        }}
                    >
                        <AssignmentIcon />
                    </CodeplexBox>
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        Facturación de Compras
                    </Typography>
                </CodeplexStack>
            </CodeplexBox>

            {/* --- FILTERS --- */}
            <CodeplexCard sx={{ mb: 2, p: 2 }}>
                <CodeplexGrid container spacing={2} alignItems="center">
                    {/* Toggles */}
                    <CodeplexGrid size={{ xs: 'auto' }}>
                        <CodeplexSwitch
                            checked={verTodo}
                            onChange={(e) => setVerTodo(e.target.checked)}
                            label="Ver Todo"
                            size="small"
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 'auto' }}>
                        <CodeplexSwitch
                            checked={mes}
                            onChange={(e) => setMes(e.target.checked)}
                            label="Mes"
                            size="small"
                        />
                    </CodeplexGrid>

                    {/* Date Pickers */}
                    <CodeplexGrid size={{ xs: 12, md: 3 }}>
                        <CodeplexDatePicker
                            value={startDate}
                            onChange={setStartDate}
                            slotProps={{ textField: { label: "Fecha Inicio *", size: 'small', fullWidth: true } }}
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12, md: 3 }}>
                        <CodeplexDatePicker
                            value={endDate}
                            onChange={setEndDate}
                            slotProps={{ textField: { label: "Fecha Fin *", size: 'small', fullWidth: true } }}
                        />
                    </CodeplexGrid>

                    {/* Action Buttons */}
                    <CodeplexGrid size={{ xs: 12, md: 'grow' }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <CodeplexButton variant="success" leftIcon={<SearchIcon />}>
                            BUSCAR
                        </CodeplexButton>
                        <CodeplexButton variant="secondary">
                            <FilterIcon />
                        </CodeplexButton>
                        <CodeplexButton variant="primary" leftIcon={<AddIcon />}>
                            AGREGAR
                        </CodeplexButton>
                    </CodeplexGrid>
                </CodeplexGrid>
            </CodeplexCard>

            {/* --- TABS --- */}
            <CodeplexBox mb={0}>
                <CodeplexTabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    items={[
                        { label: 'REGISTROS', value: 0, icon: <AssignmentIcon fontSize="small" />, iconPosition: 'start' },
                        { label: 'DETALLES', value: 1, icon: <DescriptionIcon fontSize="small" />, iconPosition: 'start' }
                    ]}
                />
            </CodeplexBox>

            {/* --- TABLE --- */}
            <CodeplexBox flexGrow={1}>
                <CodeplexTable
                    columns={columns}
                    data={MOCK_INVOICES}
                    title="Listado de Facturas"
                    options={{
                        enableDensityToggle: true,
                        enableColumnFilters: true,
                        enableColumnOrdering: true,
                        enableGrouping: true, // Functional: Row grouping enabled
                        enableColumnPinning: true,
                        enableRowActions: false, // We use custom action column
                        initialState: {
                            density: 'compact',
                            columnPinning: { left: ['actions'] }, // Pin custom actions
                            showColumnFilters: true
                        },
                        muiTableHeadCellProps: {
                            sx: {
                                '& .Mui-TableHeadCell-Content': {
                                    whiteSpace: 'nowrap', // Prevent wrapping if you prefer
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                },
                            }
                        }
                    }}
                />
            </CodeplexBox>

        </CodeplexContainer>
    );
};

export default BillingPage;
