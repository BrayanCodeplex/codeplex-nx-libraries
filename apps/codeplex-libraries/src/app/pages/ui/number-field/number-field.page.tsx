import { useState } from 'react';
import { CodeplexNumberField } from '@codeplex-sac/ui';

export const NumberFieldPage = () => {
    const [value, setValue] = useState<number | null>(10);

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Number Field</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Input numérico con controles de incremento y decremento.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexNumberField
                            label="Quantity"
                            defaultValue={1}
                        />
                        <CodeplexNumberField
                            label="With Limits (0-10)"
                            min={0}
                            max={10}
                            defaultValue={5}
                        />
                        <CodeplexNumberField
                            label="Step 0.5"
                            step={0.5}
                            defaultValue={1.5}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlled</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexNumberField
                            label="Controlled Value"
                            value={value || 0}
                            onChange={(newValue: number | null) => setValue(newValue)}
                        />
                        <div className="text-sm text-gray-500">
                            Current Value: {value}
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">States</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexNumberField label="Disabled" disabled defaultValue={10} />
                        <CodeplexNumberField label="Error" error helperText="Invalid value" defaultValue={-1} />
                    </div>
                </div>
            </section>

            {/* Código de ejemplo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexNumberField } from '@codeplex-sac/ui';

// Basic
<CodeplexNumberField label="Age" min={0} max={100} />

// Controlled
<CodeplexNumberField
  value={value}
  onChange={(val) => setValue(val)}
  label="Price"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
