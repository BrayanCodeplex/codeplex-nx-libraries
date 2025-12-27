import { useState, useEffect } from 'react';
import { CodeplexSelect, CodeplexMenuItem, CodeplexListSubheader, CodeplexCard, CodeplexSpinner } from '@codeplex-qwik/ui';

export const SelectPage = () => {
    // Basic States
    const [age, setAge] = useState('');
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [groupedValue, setGroupedValue] = useState('');

    // API Simulation States
    const [users, setUsers] = useState<{ value: string, label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    // API Simulation Effect
    useEffect(() => {
        setLoading(true);
        // Simulate fetch delay
        const timer = setTimeout(() => {
            setUsers([
                { value: 'u1', label: 'Ana García' },
                { value: 'u2', label: 'Carlos Rodriguez' },
                { value: 'u3', label: 'María Lopez' },
                { value: 'u4', label: 'Juan Martinez' },
                { value: 'u5', label: 'Sofia Wilson' },
            ]);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const basicOptions = [
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' },
    ];

    const frameworkOptions = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'qwik', label: 'Qwik' },
    ];

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Select</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente de selección con soporte para single, multiple, agrupamiento, y datos asíncronos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelect
                        label="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value as string)}
                        options={basicOptions}
                        helperText="Please select your age"
                    />
                    <CodeplexSelect
                        label="Framework"
                        value=""
                        placeholder="Select a framework..."
                        options={frameworkOptions}
                        displayEmpty
                    />
                </div>
            </section>

            {/* API Example Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">API Response Simulation</h2>
                <CodeplexCard>
                    <div className="p-4 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                This example renders options fetched from a simulated API.
                            </p>
                            {loading && <span className="text-xs text-blue-500 animate-pulse">Fetching users...</span>}
                        </div>

                        <CodeplexSelect
                            label="Select User"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value as string)}
                            options={users}
                            disabled={loading}
                            placeholder={loading ? "Loading..." : "Select a user"}
                            helperText={selectedUser ? `Selected: ${users.find(u => u.value === selectedUser)?.label}` : "Fetch complete"}
                        />

                        {/* If you want to show a spinner inline, you could use startAdornment if supported, or just condition above */}
                        {loading && (
                            <div className="flex justify-center py-2">
                                <CodeplexSpinner size="sm" />
                            </div>
                        )}
                    </div>
                </CodeplexCard>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Multiple Selection (Chip Mode)</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelect
                        label="Favorite Frameworks"
                        multiple
                        value={multiValue}
                        onChange={(e) => {
                            const val = e.target.value;
                            setMultiValue(typeof val === 'string' ? val.split(',') : val as string[]);
                        }}
                        options={frameworkOptions}
                        helperText="Select multiple items"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Grouping & Composition</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelect
                        label="Grouped Items"
                        value={groupedValue}
                        onChange={(e) => setGroupedValue(e.target.value as string)}
                        placeholder="Select an option"
                    >
                        <CodeplexListSubheader>Category 1</CodeplexListSubheader>
                        <CodeplexMenuItem value={1}>Option 1</CodeplexMenuItem>
                        <CodeplexMenuItem value={2}>Option 2</CodeplexMenuItem>
                        <CodeplexListSubheader>Category 2</CodeplexListSubheader>
                        <CodeplexMenuItem value={3}>Option 3</CodeplexMenuItem>
                        <CodeplexMenuItem value={4}>Option 4</CodeplexMenuItem>
                    </CodeplexSelect>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSelect label="Disabled" disabled value="" options={[]} />
                    <CodeplexSelect label="Error" error helperText="Something went wrong" value="" options={[]} />
                    <CodeplexSelect label="Read Only" readOnly value="Read Only" options={[{ value: 'Read Only', label: 'Read Only' }]} />
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

<CodeplexSelect
  label="Select User"
  options={users} // { value, label }[]
  disabled={loading}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
