import { useState } from 'react';
import { CodeplexRadio, CodeplexRadioGroup } from '@codeplex-qwik/ui';

export const RadioGroupPage = () => {
    const [value, setValue] = useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Radio Group</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selección única entre opciones. Estilo premium personalizado.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexRadioGroup
                        defaultValue="female"
                        name="radio-buttons-group"
                        label="Gender"
                    >
                        <CodeplexRadio value="female" label="Female" />
                        <CodeplexRadio value="male" label="Male" />
                        <CodeplexRadio value="other" label="Other" />
                    </CodeplexRadioGroup>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Direction Row</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexRadioGroup
                        row
                        defaultValue="female"
                        name="row-radio-buttons-group"
                        label="Gender (Row)"
                    >
                        <CodeplexRadio value="female" label="Female" />
                        <CodeplexRadio value="male" label="Male" />
                        <CodeplexRadio value="other" label="Other" disabled />
                    </CodeplexRadioGroup>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlled</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexRadioGroup
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        label="Controlled"
                    >
                        <CodeplexRadio value="female" label="Female" />
                        <CodeplexRadio value="male" label="Male" />
                    </CodeplexRadioGroup>
                    <div className="text-sm text-gray-500">
                        Selected: {value}
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Using Options Prop</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexRadioGroup
                        label="Plan Selection"
                        defaultValue="standard"
                        options={[
                            { value: 'basic', label: 'Basic Plan' },
                            { value: 'standard', label: 'Standard Plan' },
                            { value: 'premium', label: 'Premium Plan' },
                            { value: 'enterprise', label: 'Enterprise (Coming Soon)', disabled: true },
                        ]}
                    />
                </div>
            </section>

            {/* Código de ejemplo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexRadioGroup, CodeplexRadio } from '@codeplex-qwik/ui';

// Composition
<CodeplexRadioGroup label="Gender" defaultValue="female">
  <CodeplexRadio value="female" label="Female" />
  <CodeplexRadio value="male" label="Male" />
</CodeplexRadioGroup>

// Options Prop
<CodeplexRadioGroup
  label="Plan"
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
