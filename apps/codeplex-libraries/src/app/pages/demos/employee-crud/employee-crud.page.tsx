
import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@mui/material';
import {
    CodeplexButton,
    CodeplexToast,
    CodeplexCard,
    CodeplexTextField,
    CodeplexSelect,
    CodeplexDialog,
    CodeplexDialogTitle,
    CodeplexDialogContent,
    CodeplexDialogContentText,
    CodeplexDialogActions
} from '@codeplex-sac/ui';
import { CodeplexModal } from '@codeplex-sac/utils';
import {
    CodeplexContainer,
    CodeplexBox,
    CodeplexStack
} from '@codeplex-sac/layout';
import { CodeplexTable, type MRT_ColumnDef } from '@codeplex-sac/data-view';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    People as PeopleIcon
} from '@mui/icons-material';
import { Typography, MenuItem } from '@mui/material';

// ------------------------------------------------------------------------------------------------
// 1. DEFINICIÓN DE TIPOS (TYPES/INTERFACES)
// Es crucial definir la estructura de tus datos para aprovechar TypeScript.
// ------------------------------------------------------------------------------------------------

interface Employee {
    id: string; // Identificador único (UUID, guid, o número formateado)
    fullName: string;
    position: string;
    department: 'Engineering' | 'HR' | 'Marketing' | 'Sales';
    status: 'Active' | 'Inactive' | 'On Leave';
    email: string;
    salary: number;
    phoneNumber: string;
    hireDate: string;
    officeLocation: string;
}

// Datos de ejemplo simulando respuesta API (15 registros)
const MOCK_EMPLOYEES: Employee[] = [
    { id: '1', fullName: 'Ana García', position: 'Senior Developer', department: 'Engineering', status: 'Active', email: 'ana.garcia@codeplex.com', salary: 75000, phoneNumber: '+51 987 654 321', hireDate: '2022-03-15', officeLocation: 'Lima HQ' },
    { id: '2', fullName: 'Carlos López', position: 'HR Manager', department: 'HR', status: 'Active', email: 'carlos.lopez@codeplex.com', salary: 65000, phoneNumber: '+51 912 345 678', hireDate: '2021-06-01', officeLocation: 'Lima HQ' },
    { id: '3', fullName: 'Elena Diaz', position: 'UX Designer', department: 'Marketing', status: 'On Leave', email: 'elena.diaz@codeplex.com', salary: 55000, phoneNumber: '+51 999 888 777', hireDate: '2023-01-10', officeLocation: 'Remote' },
    { id: '4', fullName: 'Jorge Martinez', position: 'Sales Director', department: 'Sales', status: 'Active', email: 'jorge.martinez@codeplex.com', salary: 95000, phoneNumber: '+51 955 666 444', hireDate: '2020-11-20', officeLocation: 'Lima HQ' },
    { id: '5', fullName: 'Lucía Fernandez', position: 'Frontend Dev', department: 'Engineering', status: 'Active', email: 'lucia.fernandez@codeplex.com', salary: 60000, phoneNumber: '+51 933 222 111', hireDate: '2022-08-05', officeLocation: 'Arequipa Branch' },
    { id: '6', fullName: 'Mario Ruiz', position: 'Backend Dev', department: 'Engineering', status: 'Inactive', email: 'mario.ruiz@codeplex.com', salary: 62000, phoneNumber: '+51 977 777 777', hireDate: '2021-02-14', officeLocation: 'Remote' },
    { id: '7', fullName: 'Sofia Williams', position: 'Product Owner', department: 'Engineering', status: 'Active', email: 'sofia.williams@codeplex.com', salary: 88000, phoneNumber: '+51 944 555 666', hireDate: '2019-09-30', officeLocation: 'Lima HQ' },
    { id: '8', fullName: 'Pedro Castillo', position: 'Sales Rep', department: 'Sales', status: 'Active', email: 'pedro.castillo@codeplex.com', salary: 45000, phoneNumber: '+51 911 222 333', hireDate: '2023-05-12', officeLocation: 'Arequipa Branch' },
    { id: '9', fullName: 'Laura Mendez', position: 'Marketing Lead', department: 'Marketing', status: 'Active', email: 'laura.mendez@codeplex.com', salary: 72000, phoneNumber: '+51 998 887 776', hireDate: '2021-11-01', officeLocation: 'Lima HQ' },
    { id: '10', fullName: 'Miguel Torres', position: 'DevOps', department: 'Engineering', status: 'Active', email: 'miguel.torres@codeplex.com', salary: 80000, phoneNumber: '+51 987 111 222', hireDate: '2022-05-25', officeLocation: 'Remote' },
    { id: '11', fullName: 'Carmen Vega', position: 'Recruiter', department: 'HR', status: 'On Leave', email: 'carmen.vega@codeplex.com', salary: 50000, phoneNumber: '+51 955 444 333', hireDate: '2023-02-18', officeLocation: 'Lima HQ' },
    { id: '12', fullName: 'Daniel Rojas', position: 'Intern', department: 'Engineering', status: 'Active', email: 'daniel.rojas@codeplex.com', salary: 24000, phoneNumber: '+51 922 333 444', hireDate: '2024-01-15', officeLocation: 'Lima HQ' },
    { id: '13', fullName: 'Valeria Gomez', position: 'Account Manager', department: 'Sales', status: 'Active', email: 'valeria.gomez@codeplex.com', salary: 68000, phoneNumber: '+51 999 000 111', hireDate: '2021-07-22', officeLocation: 'Arequipa Branch' },
    { id: '14', fullName: 'Roberto Sanchez', position: 'QA Engineer', department: 'Engineering', status: 'Inactive', email: 'roberto.sanchez@codeplex.com', salary: 58000, phoneNumber: '+51 900 111 222', hireDate: '2022-10-10', officeLocation: 'Remote' },
    { id: '15', fullName: 'Fernanda Lima', position: 'Content Writer', department: 'Marketing', status: 'Active', email: 'fernanda.lima@codeplex.com', salary: 48000, phoneNumber: '+51 977 888 999', hireDate: '2023-06-30', officeLocation: 'Lima HQ' },
];

export const EmployeeCrudPage = () => {
    // --------------------------------------------------------------------------------------------
    // 2. GESTIÓN DEL ESTADO (STATE MANAGEMENT)
    // Controlamos los datos, visibilidad de diálogos y selección actual.
    // --------------------------------------------------------------------------------------------

    // Lista de empleados
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const theme = useTheme();

    // Effect to debug updates
    useEffect(() => {
        console.log('Employees updated:', employees.length);
    }, [employees]);

    // Control de Modal de Edición/Creación
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null); // null = Modo Crear, Objeto = Modo Editar

    // Control de Diálogo de Confirmación de Eliminación
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    // Estado del Formulario (Podría gestionarse con RHF - React Hook Form, pero aquí lo haremos simple manual)
    const [formData, setFormData] = useState<Partial<Employee>>({});

    // Toast Notification State
    const [toastOpen, setToastOpen] = useState(false);
    const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');

    // --------------------------------------------------------------------------------------------
    // 3. HANDLERS (MANEJADORES DE EVENTOS)
    // Lógica pura de negocio: Crear, Actualizar, Borrar.
    // --------------------------------------------------------------------------------------------

    // Abrir Modal para CREAR
    const handleOpenCreate = () => {
        setEditingItemUnsafe(null); // Reseteamos edición
        setFormData({}); // Formulario vacío
        setIsModalOpen(true);
    };

    // Abrir Modal para EDITAR
    const handleOpenEdit = (employee: Employee) => {
        setEditingItemUnsafe(employee);
        setFormData({ ...employee }); // Pre-llenamos formulario
        setIsModalOpen(true);
    };

    // Helper para evitar errores de tipo en setState (opcional, solo por comodidad)
    const setEditingItemUnsafe = (item: any) => setEditingEmployee(item);

    // Validar y abrir confirmación
    const handleSave = () => {
        if (!formData.fullName || !formData.email) {
            // Validación básica
            alert("Por favor completa los campos requeridos");
            return;
        }
        setSaveConfirmOpen(true);
    };

    // GUARDAR DEFINITIVO (tras confirmación)
    const performSave = () => {
        if (editingEmployee) {
            // MODO ACTUALIZAR (UPDATE)
            setEmployees(prev => prev.map(emp =>
                emp.id === editingEmployee.id
                    ? { ...emp, ...formData } as Employee
                    : emp
            ));
        } else {
            // MODO CREAR (CREATE)
            const newEmployee: Employee = {
                id: Math.random().toString(36).substr(2, 9), // ID temporal random
                fullName: formData.fullName || '',
                position: formData.position || 'N/A',
                department: (formData.department as any) || 'Engineering',
                status: (formData.status as any) || 'Active',
                email: formData.email || '',
                salary: Number(formData.salary) || 0,
                phoneNumber: formData.phoneNumber || '',
                hireDate: formData.hireDate || new Date().toISOString().split('T')[0],
                officeLocation: formData.officeLocation || 'Lima HQ'
            };
            // Add to TOP of list so it is visible immediately
            setEmployees(prev => [newEmployee, ...prev]);
        }
        setSaveConfirmOpen(false);
        setIsModalOpen(false);

        // Show Success Toast
        setToastVariant('success');
        setToastMessage(editingEmployee ? 'Empleado actualizado correctamente' : 'Empleado creado correctamente');
        setToastOpen(true);
    };

    // Confirmar ELIMINACIÓN
    const handleDeleteClick = (id: string) => {
        setIdToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (idToDelete) {
            setEmployees(prev => prev.filter(e => e.id !== idToDelete));
        }
        setDeleteConfirmOpen(false);
        setIdToDelete(null);
    };


    // --------------------------------------------------------------------------------------------
    // 4. DEFINICIÓN DE COLUMNAS (TABLE COLUMNS)
    // Usamos useMemo para optimizar rendimiento y definir estructura.
    // --------------------------------------------------------------------------------------------
    const columns = useMemo<MRT_ColumnDef<Employee>[]>(
        () => [

            {
                id: 'personal_info',
                header: 'Información Personal',
                meta: { headerBackgroundColor: 'primary.main' },
                columns: [
                    {
                        accessorKey: 'fullName',
                        header: 'Nombre Completo',
                        size: 200,
                    },
                    {
                        accessorKey: 'position',
                        header: 'Cargo',
                        size: 150,
                    },
                    {
                        accessorKey: 'email',
                        header: 'Correo Electrónico',
                        size: 220,
                    },
                    {
                        accessorKey: 'phoneNumber',
                        header: 'Teléfono',
                        size: 140,
                    },
                ]
            },
            {
                id: 'corp_details',
                header: 'Detalles Corporativos',
                meta: { headerBackgroundColor: 'secondary.main' },
                columns: [
                    {
                        accessorKey: 'department',
                        header: 'Departamento',
                        size: 150,
                        filterVariant: 'select', // Filtro tipo Select nativo de MRT
                        filterSelectOptions: ['Engineering', 'HR', 'Marketing', 'Sales'],
                    },
                    {
                        accessorKey: 'status',
                        header: 'Estado',
                        size: 120,
                        Cell: ({ cell }) => {
                            // Custom Render para Badges with Theme colors
                            const val = cell.getValue<string>();
                            const colorMap: Record<string, string> = {
                                'Active': theme.palette.success.main,
                                'Inactive': theme.palette.error.main,
                                'On Leave': theme.palette.warning.main
                            };
                            return (
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    backgroundColor: colorMap[val] || theme.palette.grey[400],
                                    color: '#fff',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {val}
                                </span>
                            );
                        }
                    },
                ]
            },
            {
                accessorKey: 'salary',
                header: 'Salario ($)',
                size: 120,
                muiTableBodyCellProps: { align: 'right' },
                muiTableHeadCellProps: { align: 'right' },
                Cell: ({ cell }) => cell.getValue<number>().toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            },
            {
                // COLUMNA DE ACCIONES
                id: 'actions',
                header: 'Acciones',
                size: 100,
                enableSorting: false,
                enableColumnFilter: false,
                enablePinning: true, // Importante para UX: Fijar a la izquierda
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <CodeplexButton
                            variant="ghost"
                            size="xs"
                            onClick={() => handleOpenEdit(row.original)}
                            sx={{ color: 'primary.main' }}
                        >
                            <EditIcon fontSize="small" />
                        </CodeplexButton>
                        <CodeplexButton
                            variant="ghost"
                            size="xs"
                            onClick={() => handleDeleteClick(row.original.id)}
                            sx={{ color: 'error.main' }}
                        >
                            <DeleteIcon fontSize="small" />
                        </CodeplexButton>
                    </div>
                )
            },
        ],
        []
    );

    // --------------------------------------------------------------------------------------------
    // 5. RENDERIZADO (JSX)
    // Estructura visual de la página.
    // --------------------------------------------------------------------------------------------
    return (
        <CodeplexContainer maxWidth="xl" sx={{ py: 4 }}>

            {/* --- HEADER DE LA PÁGINA --- */}
            <CodeplexBox mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <CodeplexStack direction="row" spacing={2} alignItems="center">
                    <CodeplexBox sx={{ p: 1, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 2 }}>
                        <PeopleIcon />
                    </CodeplexBox>
                    <div>
                        <Typography variant="h5" fontWeight="bold">Gestión de Empleados</Typography>
                        <Typography variant="body2" color="text.secondary">Administra el personal completa (Demo CRUD)</Typography>
                    </div>
                </CodeplexStack>
                <CodeplexButton
                    variant="primary"
                    leftIcon={<AddIcon />}
                    onClick={handleOpenCreate}
                >
                    Nuevo Empleado
                </CodeplexButton>
            </CodeplexBox>

            {/* --- TABLA PRINCIPAL --- */}
            <CodeplexCard>
                <CodeplexTable
                    columns={columns}
                    data={employees}
                    enableExport={true} // Activamos exportación

                    options={{
                        enableColumnPinning: true,
                        enableRowSelection: true,
                        enableStickyHeader: true, // Fix sticky header
                        initialState: {
                            columnPinning: { left: ['mrt-row-select', 'personal_info'], right: ['actions'] } // Pinning fixed
                        },
                        // Container props for scrolling
                        muiTableContainerProps: {
                            sx: { maxHeight: '600px', maxWidth: '100%', overflow: 'auto' }
                        },
                        // Personalización visual de cabeceras
                        muiTableHeadCellProps: {
                            sx: {
                                fontWeight: 'bold',
                                fontSize: '0.875rem'
                            }
                        }
                    }}
                />
            </CodeplexCard>

            {/* --- MODAL (CREAR / EDITAR) --- */}
            <CodeplexModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEmployee ? "Editar Empleado" : "Nuevo Empleado"}
                width={600}
            >
                <CodeplexStack spacing={3} sx={{ mt: 2 }}>
                    <CodeplexTextField
                        label="Nombre Completo"
                        fullWidth
                        value={formData.fullName || ''}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />

                    <CodeplexStack direction="row" spacing={2}>
                        <CodeplexTextField
                            label="Email"
                            fullWidth
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <CodeplexTextField
                            label="Cargo"
                            fullWidth
                            value={formData.position || ''}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        />
                    </CodeplexStack>

                    <CodeplexStack direction="row" spacing={2}>
                        <CodeplexSelect
                            label="Departamento"
                            fullWidth
                            value={formData.department || ''}
                            options={[
                                { value: 'Engineering', label: 'Ingeniería' },
                                { value: 'HR', label: 'Recursos Humanos' },
                                { value: 'Marketing', label: 'Marketing' },
                                { value: 'Sales', label: 'Ventas' },
                            ]}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                        />
                        <CodeplexSelect
                            label="Estado"
                            fullWidth
                            value={formData.status || ''}
                            options={[
                                { value: 'Active', label: 'Activo' },
                                { value: 'Inactive', label: 'Inactivo' },
                                { value: 'On Leave', label: 'De Vacaciones' },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        />
                    </CodeplexStack>

                    <CodeplexTextField
                        label="Salario Anual"
                        type="number"
                        fullWidth
                        value={formData.salary || ''}
                        onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    />

                    <CodeplexStack direction="row" spacing={2}>
                        <CodeplexTextField
                            label="Teléfono"
                            fullWidth
                            value={formData.phoneNumber || ''}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                        <CodeplexSelect
                            label="Oficina"
                            fullWidth
                            value={formData.officeLocation || ''}
                            options={[
                                { value: 'Lima HQ', label: 'Lima HQ' },
                                { value: 'Arequipa Branch', label: 'Arequipa Branch' },
                                { value: 'Remote', label: 'Remote' },
                            ]}
                            onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value as string })}
                        />
                    </CodeplexStack>

                    <CodeplexBox display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <CodeplexButton variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</CodeplexButton>
                        <CodeplexButton variant="primary" leftIcon={<SaveIcon />} onClick={handleSave}>Guardar</CodeplexButton>
                    </CodeplexBox>
                </CodeplexStack>
            </CodeplexModal>

            {/* --- DIALOGO DE CONFIRMACIÓN (Eliminar) --- */}
            {/* Nota: Usamos Dialog nativo de MUI si no hay CodeplexConfirm, o implementamos uno simple */}
            {/* --- DIALOGO DE CONFIRMACIÓN (Eliminar) --- */}
            {/* Nota: Usamos CodeplexDialog desde packages/ui */}
            <CodeplexDialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <CodeplexDialogTitle>Confirmar Eliminación</CodeplexDialogTitle>
                <CodeplexDialogContent>
                    <CodeplexDialogContentText>
                        ¿Estás seguro de querer eliminar este empleado? Esta acción no se puede deshacer.
                    </CodeplexDialogContentText>
                </CodeplexDialogContent>
                <CodeplexDialogActions>
                    <CodeplexButton onClick={() => setDeleteConfirmOpen(false)}>Cancelar</CodeplexButton>
                    <CodeplexButton onClick={handleConfirmDelete} color="error" variant="primary">Eliminar</CodeplexButton>
                </CodeplexDialogActions>
            </CodeplexDialog>

            {/* --- DIALOGO DE CONFIRMACIÓN (Guardar/Agregar) --- */}
            <CodeplexDialog open={saveConfirmOpen} onClose={() => setSaveConfirmOpen(false)}>
                <CodeplexDialogTitle>
                    {editingEmployee ? 'Confirmar Edición' : 'Confirmar Creación'}
                </CodeplexDialogTitle>
                <CodeplexDialogContent>
                    <CodeplexDialogContentText>
                        {editingEmployee
                            ? '¿Estás seguro de guardar los cambios para este empleado?'
                            : '¿Estás seguro de agregar este nuevo empleado al sistema?'}
                    </CodeplexDialogContentText>
                </CodeplexDialogContent>
                <CodeplexDialogActions>
                    <CodeplexButton onClick={() => setSaveConfirmOpen(false)}>Cancelar</CodeplexButton>
                    <CodeplexButton onClick={performSave} variant="primary">Confirmar</CodeplexButton>
                </CodeplexDialogActions>
            </CodeplexDialog>

            {/* --- TOAST NOTIFICATION --- */}
            <CodeplexToast
                open={toastOpen}
                variant={toastVariant}
                title={toastVariant === 'success' ? 'Éxito' : 'Error'}
                subtitle={toastMessage}
                onClose={() => setToastOpen(false)}
                position="bottom-right"
                duration={3000}
            />

        </CodeplexContainer>
    );
};
