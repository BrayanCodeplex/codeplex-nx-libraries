import { useState, useEffect } from 'react';
import { CodeplexSelector, CodeplexElementoMenu, CodeplexSubcabeceraLista, CodeplexTarjeta, CodeplexCargando } from '@codeplex-sac/ui';

export const SelectPage = () => {
    // Basic States
    const [age, setAge] = useState('');
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [groupedValue, setGroupedValue] = useState('');

    // API Simulation States
    const [users, setUsers] = useState<{ valor: string, etiqueta: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    // API Simulation Effect
    useEffect(() => {
        setLoading(true);
        // Simulate fetch delay
        const timer = setTimeout(() => {
            setUsers([
                { valor: 'u1', etiqueta: 'Ana García' },
                { valor: 'u2', etiqueta: 'Carlos Rodriguez' },
                { valor: 'u3', etiqueta: 'María Lopez' },
                { valor: 'u4', etiqueta: 'Juan Martinez' },
                { valor: 'u5', etiqueta: 'Sofia Wilson' },
            ]);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const basicOptions = [
        { valor: 10, etiqueta: 'Ten' },
        { valor: 20, etiqueta: 'Twenty' },
        { valor: 30, etiqueta: 'Thirty' },
    ];

    const frameworkOptions = [
        { valor: 'react', etiqueta: 'React' },
        { valor: 'vue', etiqueta: 'Vue' },
        { valor: 'angular', etiqueta: 'Angular' },
        { valor: 'svelte', etiqueta: 'Svelte' },
        { valor: 'qwik', etiqueta: 'Qwik' },
    ];

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selector (Select)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente de selección con soporte para single, multiple, agrupamiento, y datos asíncronos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelector
                        etiqueta="Edad"
                        value={age}
                        alCambiar={(e) => setAge(e.target.value as string)}
                        opciones={basicOptions}
                        textoAyuda="Por favor selecciona tu edad"
                    />
                    <CodeplexSelector
                        etiqueta="Framework"
                        value=""
                        marcador="Selecciona un framework..."
                        opciones={frameworkOptions}
                        displayEmpty
                    />
                </div>
            </section>

            {/* API Example Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Simulación API</h2>
                <CodeplexTarjeta>
                    <div className="p-4 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Este ejemplo renderiza opciones obtenidas de una API simulada.
                            </p>
                            {loading && <span className="text-xs text-blue-500 animate-pulse">Cargando usuarios...</span>}
                        </div>

                        <CodeplexSelector
                            etiqueta="Seleccionar Usuario"
                            value={selectedUser}
                            alCambiar={(e) => setSelectedUser(e.target.value as string)}
                            opciones={users}
                            disabled={loading}
                            marcador={loading ? "Cargando..." : "Selecciona un usuario"}
                            textoAyuda={selectedUser ? `Seleccionado: ${users.find(u => u.valor === selectedUser)?.etiqueta}` : "Carga completa"}
                        />

                        {loading && (
                            <div className="flex justify-center py-2">
                                <CodeplexCargando tamano={20} />
                            </div>
                        )}
                    </div>
                </CodeplexTarjeta>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Selección Múltiple (Chip Mode)</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelector
                        etiqueta="Frameworks Favoritos"
                        multiple
                        value={multiValue}
                        alCambiar={(e) => {
                            const val = e.target.value;
                            setMultiValue(typeof val === 'string' ? val.split(',') : val as string[]);
                        }}
                        opciones={frameworkOptions}
                        textoAyuda="Selecciona múltiples items"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Agrupamiento y Composición</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelector
                        etiqueta="Items Agrupados"
                        value={groupedValue}
                        alCambiar={(e) => setGroupedValue(e.target.value as string)}
                        marcador="Selecciona una opción"
                    >
                        <CodeplexSubcabeceraLista>Categoría 1</CodeplexSubcabeceraLista>
                        <CodeplexElementoMenu value={1}>Opción 1</CodeplexElementoMenu>
                        <CodeplexElementoMenu value={2}>Opción 2</CodeplexElementoMenu>
                        <CodeplexSubcabeceraLista>Categoría 2</CodeplexSubcabeceraLista>
                        <CodeplexElementoMenu value={3}>Opción 3</CodeplexElementoMenu>
                        <CodeplexElementoMenu value={4}>Opción 4</CodeplexElementoMenu>
                    </CodeplexSelector>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Estados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelector etiqueta="Deshabilitado" disabled value="" opciones={[]} />
                    <CodeplexSelector etiqueta="Error" error textoAyuda="Algo salió mal" value="" opciones={[]} />
                    <CodeplexSelector etiqueta="Solo Lectura" readOnly value="Solo Lectura" opciones={[{ valor: 'Solo Lectura', etiqueta: 'Solo Lectura' }]} />
                </div>
            </section>

            {/* Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo (API)
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetch('/api/users').then(data => {
    setUsers(data);
    setLoading(false);
  });
}, []);

<CodeplexSelector
  etiqueta="Select User"
  opciones={users} // { valor, etiqueta }[]
  disabled={loading}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
