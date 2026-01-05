import { useState, useMemo } from 'react';
import {
    CodeplexBoton,
    CodeplexInterruptor,
    CodeplexNotificacion,
    CodeplexTarjeta,
    CodeplexInsignia
} from '@codeplex-sac/ui';
import { CodeplexTabla, type MRT_ColumnDef } from '@codeplex-sac/data-view';
import { CodeplexSelectorFecha } from '@codeplex-sac/date-pickers';
import { CodeplexPestanas } from '@codeplex-sac/navigation';
import { CodeplexCuadricula, CodeplexPila, CodeplexCaja, CodeplexContenedor } from '@codeplex-sac/layout';
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

    // columns Definition with Grouping and Formatting
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
                    <CodeplexCaja display="flex" justifyContent="center">
                        <CodeplexBoton variante="ghost" tamano="xs">
                            <SettingsIcon fontSize="small" />
                        </CodeplexBoton>
                    </CodeplexCaja>
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
                                <CodeplexInsignia
                                    contenido={status}
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
                meta: { headerBackgroundColor: 'secondary.main' },
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
                meta: { headerBackgroundColor: 'primary.main' },
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
                            return <CodeplexCaja fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexCaja>
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
                            return <CodeplexCaja fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexCaja>
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
                            return <CodeplexCaja fontWeight="bold" textAlign="right">{total.toFixed(2)}</CodeplexCaja>
                        }
                    },
                ]
            },
            { accessorKey: 'fec_creacion', header: 'Creado', size: 130 },
        ],
        []
    );

    return (
        <CodeplexContenedor fluido sx={{ px: 2, py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* --- HEADER --- */}
            <CodeplexCaja mb={2}>
                <CodeplexPila direccion="row" alignItems="center" espaciado={1} sx={{ color: 'text.secondary', mb: 0.5, fontSize: '0.875rem' }}>
                    <DescriptionIcon fontSize="small" />
                    <span>/</span>
                    <span>Facturación</span>
                    <span>/</span>
                    <Typography color="primary" variant="body2" component="span" fontWeight="medium">Facturación de Compras</Typography>
                </CodeplexPila>

                <CodeplexPila direccion="row" alignItems="center" espaciado={2}>
                    <CodeplexCaja
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            borderRadius: 1,
                            p: 0.8,
                            display: 'flex'
                        }}
                    >
                        <AssignmentIcon />
                    </CodeplexCaja>
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        Facturación de Compras
                    </Typography>
                </CodeplexPila>
            </CodeplexCaja>

            {/* --- FILTERS --- */}
            <CodeplexTarjeta sx={{ mb: 2, p: 2 }}>
                <CodeplexCuadricula contenedor espaciado={2} alignItems="center">
                    {/* Toggles */}
                    <CodeplexCuadricula elemento xs={'auto'}>
                        <CodeplexInterruptor
                            checked={verTodo}
                            onChange={(e) => setVerTodo(e.target.checked)}
                            etiqueta="Ver Todo"
                            tamano="small"
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={'auto'}>
                        <CodeplexInterruptor
                            checked={mes}
                            onChange={(e) => setMes(e.target.checked)}
                            etiqueta="Mes"
                            tamano="small"
                        />
                    </CodeplexCuadricula>

                    {/* Date Pickers */}
                    <CodeplexCuadricula elemento xs={12} md={3}>
                        <CodeplexSelectorFecha
                            value={startDate}
                            onChange={setStartDate}
                            etiqueta="Fecha Inicio *"
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12} md={3}>
                        <CodeplexSelectorFecha
                            value={endDate}
                            onChange={setEndDate}
                            etiqueta="Fecha Fin *"
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </CodeplexCuadricula>

                    {/* Action Buttons */}
                    <CodeplexCuadricula elemento xs={12} md sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <CodeplexBoton variante="success" iconoIzquierda={<SearchIcon />}>
                            BUSCAR
                        </CodeplexBoton>
                        <CodeplexBoton variante="secondary">
                            <FilterIcon />
                        </CodeplexBoton>
                        <CodeplexBoton variante="primary" iconoIzquierda={<AddIcon />}>
                            AGREGAR
                        </CodeplexBoton>
                    </CodeplexCuadricula>
                </CodeplexCuadricula>
            </CodeplexTarjeta>

            {/* --- TABS --- */}
            <CodeplexCaja mb={0}>
                <CodeplexPestanas
                    valor={activeTab}
                    alCambiar={(e, v) => setActiveTab(v)}
                    elementos={[
                        { etiqueta: 'REGISTROS', valor: 0, icono: <AssignmentIcon fontSize="small" />, posicionIcono: 'start' },
                        { etiqueta: 'DETALLES', valor: 1, icono: <DescriptionIcon fontSize="small" />, posicionIcono: 'start' }
                    ]}
                />
            </CodeplexCaja>

            {/* --- TABLE --- */}
            <CodeplexCaja flexGrow={1}>
                <CodeplexTabla
                    columnas={columns}
                    datos={MOCK_INVOICES}
                    titulo="Listado de Facturas"
                    habilitarExportacion={true}
                    opciones={{
                        enableDensityToggle: true,
                        enableColumnFilters: true,
                        enableColumnOrdering: true,
                        enableGrouping: true, // Functional: Row grouping enabled
                        enableColumnPinning: true,
                        enableRowPinning: true,
                        enableStickyHeader: true,
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
            </CodeplexCaja>

        </CodeplexContenedor>
    );
};

export default BillingPage;
