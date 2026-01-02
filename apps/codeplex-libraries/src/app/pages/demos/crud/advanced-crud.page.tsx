import { useState, useMemo } from 'react';
import {
    CodeplexButton,
    CodeplexBadge,
    CodeplexAvatar,
    CodeplexTextField,
    CodeplexSelect,
    CodeplexToast,
    CodeplexInputHelper
} from '@codeplex-sac/ui';
import { CodeplexTable, type MRT_ColumnDef } from '@codeplex-sac/data-view';
import { CodeplexModal } from '@codeplex-sac/utils';
import { CodeplexGrid, CodeplexStack, CodeplexBox, CodeplexContainer } from '@codeplex-sac/layout';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';

// --- MOCK DATA ---
interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    salary: number;
    avatar: string;
}

const INITIAL_DATA: Employee[] = [
    { id: '1', firstName: 'Ana', lastName: 'García', email: 'ana.garcia@codeplex.com', role: 'Senior Dev', status: 'active', salary: 120000, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', firstName: 'Carlos', lastName: 'López', email: 'carlos.lopez@codeplex.com', role: 'Product Owner', status: 'active', salary: 110000, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', firstName: 'Lucía', lastName: 'Mendez', email: 'lucia.mendez@codeplex.com', role: 'Designer', status: 'pending', salary: 95000, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', firstName: 'Jorge', lastName: 'Vega', email: 'jorge.vega@codeplex.com', role: 'QA Engineer', status: 'inactive', salary: 85000, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', firstName: 'Sofía', lastName: 'Reyes', email: 'sofia.reyes@codeplex.com', role: 'Frontend Dev', status: 'active', salary: 105000, avatar: 'https://i.pravatar.cc/150?u=5' },
];

export const AdvancedCrudPage = () => {
    const [data, setData] = useState<Employee[]>(INITIAL_DATA);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Employee | null>(null);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    // --- CRUD HANDLERS ---
    const handleCreate = () => {
        setEditingRow(null); // Clear for create
        setModalOpen(true);
    };

    const handleEdit = (row: Employee) => {
        setEditingRow(row);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro de eliminar este registro?')) {
            setData((prev) => prev.filter((item) => item.id !== id));
            showToast('Registro eliminado correctamente', 'success');
        }
    };

    const handleSaveModal = (formData: Partial<Employee>) => {
        if (editingRow) {
            // Update
            setData((prev) =>
                prev.map((item) => (item.id === editingRow.id ? { ...item, ...formData } : item))
            );
            showToast('Empleado actualizado correctamente', 'success');
        } else {
            // Create
            const newEmployee: Employee = {
                ...(formData as Employee), // Spread first to avoid overwriting default props if any
                id: Math.random().toString(36).substr(2, 9),
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
            };
            setData((prev) => [...prev, newEmployee]);
            showToast('Empleado creado correctamente', 'success');
        }
        setModalOpen(false);
    };

    // Inline Edit Handler (auto-save on blur example)
    const handleSaveCell = (cell: any, value: any) => {
        const rowIndex = cell.row.index;
        const columnId = cell.column.id;
        setData((prev) => {
            const newData = [...prev];
            newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
            return newData;
        });
        // Optional: showToast('Campo actualizado', 'success');
    };

    const showToast = (message: string, severity: 'success' | 'error') => {
        setToast({ open: true, message, severity });
    };

    // --- TABLE COLUMNS ---
    const columns = useMemo<MRT_ColumnDef<Employee>[]>(
        () => [
            {
                accessorKey: 'avatar',
                header: '',
                size: 60,
                enableEditing: false,
                Cell: ({ cell }) => <CodeplexAvatar src={cell.getValue<string>()} alt="Avatar" size="sm" />,
            },
            {
                accessorKey: 'firstName',
                header: 'Nombres',
                size: 150,
            },
            {
                accessorKey: 'lastName',
                header: 'Apellidos',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Correo Electrónico',
                enableClickToCopy: true,
                size: 250,
            },
            {
                accessorKey: 'role',
                header: 'Rol', // Inline Edit: Text (Default)
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Estado',
                size: 150,
                enableEditing: true, // Enable inline editing
                editVariant: 'select',
                editSelectOptions: ['active', 'inactive', 'pending'], // Native MRT select options
                // Custom Cell Renderer
                Cell: ({ cell }) => {
                    const status = cell.getValue<string>();
                    const colors: Record<string, any> = {
                        active: 'success',
                        inactive: 'default',
                        pending: 'warning',
                    };
                    return (
                        <CodeplexBadge
                            badgeContent={status.toUpperCase()}
                            color={colors[status]}
                        />
                    );
                },
                // Custom Edit Component (Inline)
                Edit: ({ cell, row, table }) => {
                    const val = cell.getValue<string>();
                    return (
                        <CodeplexSelect
                            value={val}
                            onChange={(e) => handleSaveCell(cell, e.target.value)}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'pending', label: 'Pending' },
                            ]}
                            size="small"
                            fullWidth
                        />
                    )
                }

            },
            {
                accessorKey: 'salary',
                header: 'Salario ($)',
                size: 150,
                muiEditTextFieldProps: {
                    type: 'number',
                },
                Cell: ({ cell }) =>
                    cell.getValue<number>()?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                    }),
            },
        ],
        []
    );

    return (
        <CodeplexContainer maxWidth="xl" sx={{ py: 4 }}>
            <CodeplexStack spacing={4}>
                {/* Header */}
                <CodeplexBox display="flex" justifyContent="space-between" alignItems="center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Empleados</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Demo avanzada de CRUD con Edición en Línea y Modal.
                        </p>
                    </div>
                    <CodeplexButton
                        variant="primary"
                        leftIcon={<AddIcon />}
                        onClick={handleCreate}
                    >
                        Nuevo Empleado
                    </CodeplexButton>
                </CodeplexBox>

                {/* Table */}
                <CodeplexTable
                    columns={columns}
                    data={data}
                    title="Listado de Personal"
                    options={{
                        enableEditing: true,
                        editDisplayMode: 'cell', // Inline cell editing
                        enableRowActions: true,
                        displayColumnDefOptions: {
                            'mrt-row-actions': {
                                header: 'Acciones',
                                size: 100,
                            },
                        },
                        positionActionsColumn: 'last',
                        renderRowActions: ({ row }) => (
                            <div className="flex gap-2">
                                <CodeplexButton
                                    variant="ghost"
                                    size="xs"
                                    color="primary"
                                    onClick={() => handleEdit(row.original)}
                                >
                                    <EditIcon fontSize="small" />
                                </CodeplexButton>
                                <CodeplexButton
                                    variant="ghost"
                                    size="xs"
                                    sx={{ color: 'error.main' }}
                                    onClick={() => handleDelete(row.original.id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </CodeplexButton>
                            </div>
                        ),
                    }}
                />
            </CodeplexStack>

            {/* Modal for Create/Edit */}
            <EmployeeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveModal}
                initialData={editingRow}
            />

            {/* Feedback Toast */}
            <CodeplexToast
                open={toast.open}
                message={toast.message}
                variant={toast.severity}
                onClose={() => setToast((prev) => ({ ...prev, open: false }))}
            />
        </CodeplexContainer>
    );
};

// --- SUB-COMPONENT: MODAL FORM ---
const EmployeeModal = ({
    open,
    onClose,
    onSave,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (data: Partial<Employee>) => void;
    initialData: Employee | null;
}) => {
    const [formData, setFormData] = useState<Partial<Employee>>({});

    // Reset/Init form when modal opens
    useMemo(() => {
        if (open) {
            setFormData(
                initialData || {
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                    status: 'active',
                    salary: 0,
                }
            );
        }
    }, [open, initialData]);

    const handleChange = (field: keyof Employee, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <CodeplexModal
            open={open}
            onClose={onClose}
            title={initialData ? 'Editar Empleado' : 'Nuevo Empleado'}
            width={600}
        >
            <form onSubmit={handleSubmit}>
                <CodeplexGrid container spacing={2} sx={{ mt: 1 }}>
                    <CodeplexGrid size={{ xs: 6 }}>
                        <CodeplexTextField
                            label="Nombres"
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            required
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 6 }}>
                        <CodeplexTextField
                            label="Apellidos"
                            fullWidth
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            required
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12 }}>
                        <CodeplexTextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 6 }}>
                        <CodeplexTextField
                            label="Rol / Cargo"
                            fullWidth
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 6 }}>
                        <CodeplexTextField
                            label="Salario Anual"
                            type="number"
                            fullWidth
                            value={formData.salary}
                            onChange={(e) => handleChange('salary', Number(e.target.value))}
                            InputProps={{ startAdornment: <span className="text-gray-500 mr-1">$</span> }}
                        />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12 }}>
                        <CodeplexSelect
                            label="Estado"
                            fullWidth
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                            options={[
                                { value: 'active', label: 'Activo' },
                                { value: 'inactive', label: 'Inactivo' },
                                { value: 'pending', label: 'Pendiente' },
                            ]}
                        />
                    </CodeplexGrid>
                </CodeplexGrid>

                <CodeplexBox display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <CodeplexButton variant="ghost" onClick={onClose}>
                        Cancelar
                    </CodeplexButton>
                    <CodeplexButton type="submit" variant="primary" leftIcon={<SaveIcon />}>
                        Guardar Cambios
                    </CodeplexButton>
                </CodeplexBox>
            </form>
        </CodeplexModal>
    );
};

export default AdvancedCrudPage;
