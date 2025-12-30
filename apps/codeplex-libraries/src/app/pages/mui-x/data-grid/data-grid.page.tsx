import { CodeplexDataGrid, GridColDef } from '@codeplex-qwik/data-grid';
import { CodeplexCard } from '@codeplex-qwik/ui';
// Removed direct import from @mui/x-data-grid to use the re-exported one
import { CodeplexBox } from '@codeplex-qwik/layout';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Apellido',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Edad',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Nombre Completo',
        description: 'Esta columna tiene un valueGetter y no es ordenable.',
        sortable: false,
        width: 160,
        valueGetter: (_value: any, row: any) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const DataGridPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MUI X Data Grid</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente de tabla de alto rendimiento vitaminado (`CodeplexDataGrid`).
                </p>
            </div>

            <CodeplexCard header="Data Grid Básico">
                <CodeplexBox sx={{ p: 4, height: 400, width: '100%' }}>
                    <CodeplexDataGrid
                        rows={rows}
                        columns={columns}
                        title="Usuarios del Sistema"
                        checkboxSelection
                    />
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Sin Paper (Plain)">
                <CodeplexBox sx={{ p: 4, height: 300, width: '100%' }}>
                    <CodeplexDataGrid
                        rows={rows}
                        columns={columns}
                        withPaper={false}
                        hideFooter
                    />
                </CodeplexBox>
            </CodeplexCard>
        </div>
    );
};
