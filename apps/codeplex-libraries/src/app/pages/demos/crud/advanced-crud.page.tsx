import { useState, useMemo } from 'react';
import {
    CodeplexBoton,
    CodeplexInsignia,
    CodeplexAvatarUsuario,
    CodeplexCampoTexto,
    CodeplexSelector,
    CodeplexNotificacion,
    CodeplexAyudaEntrada
} from '@codeplex-sac/ui';
import { CodeplexTabla, type MRT_ColumnDef } from '@codeplex-sac/data-view';
import { CodeplexModal } from '@codeplex-sac/utils';
import { CodeplexCuadricula, CodeplexPila, CodeplexCaja, CodeplexContenedor } from '@codeplex-sac/layout';
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
                Cell: ({ cell }) => <CodeplexAvatarUsuario src={cell.getValue<string>()} alt="Avatar" tamano="sm" />,
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
                        <CodeplexInsignia
                            contenido={status.toUpperCase()}
                            color={colors[status]}
                        />
                    );
                },
                // Custom Edit Component (Inline)
                Edit: ({ cell, row, table }) => {
                    const val = cell.getValue<string>();
                    return (
                        <CodeplexSelector
                            value={val}
                            alCambiar={(e) => handleSaveCell(cell, e.target.value)}
                            opciones={[
                                { valor: 'active', etiqueta: 'Activo' },
                                { valor: 'inactive', etiqueta: 'Inactivo' },
                                { valor: 'pending', etiqueta: 'Pendiente' },
                            ]}
                            tamano="small"
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
        <CodeplexContenedor anchoMaximo="xl" sx={{ py: 4 }}>
            <CodeplexPila espaciado={4}>
                {/* Header */}
                <CodeplexCaja display="flex" justifyContent="space-between" alignItems="center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Empleados</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Demo avanzada de CRUD con Edición en Línea y Modal.
                        </p>
                    </div>
                    <CodeplexBoton
                        variante="primary"
                        color="primary"
                        iconoIzquierda={<AddIcon />}
                        alHacerClick={handleCreate}
                    >
                        Nuevo Empleado
                    </CodeplexBoton>
                </CodeplexCaja>

                {/* Table */}
                <CodeplexTabla
                    columnas={columns}
                    datos={data}
                    titulo="Listado de Personal"
                    opciones={{
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
                                <CodeplexBoton
                                    variante="ghost"
                                    tamano="xs"
                                    color="primary"
                                    alHacerClick={() => handleEdit(row.original)}
                                >
                                    <EditIcon fontSize="small" />
                                </CodeplexBoton>
                                <CodeplexBoton
                                    variante="ghost"
                                    tamano="xs"
                                    sx={{ color: 'error.main' }}
                                    alHacerClick={() => handleDelete(row.original.id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </CodeplexBoton>
                            </div>
                        ),
                    }}
                />
            </CodeplexPila>

            {/* Modal for Create/Edit */}
            <EmployeeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveModal}
                initialData={editingRow}
            />

            {/* Feedback Toast */}
            <CodeplexNotificacion
                open={toast.open}
                subtitulo={toast.message}
                variante={toast.severity}
                onClose={() => setToast((prev) => ({ ...prev, open: false }))}
            />
        </CodeplexContenedor>
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
            titulo={initialData ? 'Editar Empleado' : 'Nuevo Empleado'}
            ancho={600}
        >
            <form onSubmit={handleSubmit}>
                <CodeplexCuadricula contenedor espaciado={2} sx={{ mt: 1 }}>
                    <CodeplexCuadricula elemento xs={6}>
                        <CodeplexCampoTexto
                            etiqueta="Nombres"
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            required
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={6}>
                        <CodeplexCampoTexto
                            etiqueta="Apellidos"
                            fullWidth
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            required
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12}>
                        <CodeplexCampoTexto
                            etiqueta="Email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={6}>
                        <CodeplexCampoTexto
                            etiqueta="Rol / Cargo"
                            fullWidth
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={6}>
                        <CodeplexCampoTexto
                            etiqueta="Salario Anual"
                            type="number"
                            fullWidth
                            value={formData.salary}
                            onChange={(e) => handleChange('salary', Number(e.target.value))}
                            InputProps={{ startAdornment: <span className="text-gray-500 mr-1">$</span> }}
                        />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12}>
                        <CodeplexSelector
                            etiqueta="Estado"
                            fullWidth
                            value={formData.status}
                            alCambiar={(e) => handleChange('status', e.target.value)}
                            opciones={[
                                { valor: 'active', etiqueta: 'Activo' },
                                { valor: 'inactive', etiqueta: 'Inactivo' },
                                { valor: 'pending', etiqueta: 'Pendiente' },
                            ]}
                        />
                    </CodeplexCuadricula>
                </CodeplexCuadricula>

                <CodeplexCaja display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <CodeplexBoton variante="ghost" alHacerClick={onClose}>
                        Cancelar
                    </CodeplexBoton>
                    <CodeplexBoton type="submit" variante="primary" color="primary" iconoIzquierda={<SaveIcon />}>
                        Guardar Cambios
                    </CodeplexBoton>
                </CodeplexCaja>
            </form>
        </CodeplexModal>
    );
};

export default AdvancedCrudPage;
