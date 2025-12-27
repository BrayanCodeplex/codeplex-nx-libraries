import { useState } from 'react';
import { CodeplexCheckbox, CodeplexFormGroup, CodeplexButton } from '@codeplex-qwik/ui';

export const CheckboxPage = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkbox</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selección múltiple. Wrapper de MUI Checkbox con soporte integrado para etiquetas.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col gap-2">
                        <CodeplexCheckbox label="Label" defaultChecked />
                        <CodeplexCheckbox label="Required" required />
                        <CodeplexCheckbox label="Disabled" disabled />
                        <CodeplexCheckbox label="Disabled Checked" disabled defaultChecked />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colors & Sizes</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-wrap gap-4 items-center">
                        <CodeplexCheckbox label="Primary" defaultChecked />
                        <CodeplexCheckbox label="Secondary" color="secondary" defaultChecked />
                        <CodeplexCheckbox label="Success" color="success" defaultChecked />
                        <CodeplexCheckbox label="Error" color="error" defaultChecked />

                        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                        <CodeplexCheckbox label="Small" size="small" defaultChecked />
                        <CodeplexCheckbox label="Medium" size="medium" defaultChecked />
                        <CodeplexCheckbox
                            label="Large Custom"
                            defaultChecked
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Imdeterminate & Group</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexFormGroup>
                        <CodeplexCheckbox label="Parent (Indeterminate)" indeterminate />
                        <div className="pl-6 flex flex-col">
                            <CodeplexCheckbox label="Child 1" checked />
                            <CodeplexCheckbox label="Child 2" />
                        </div>
                    </CodeplexFormGroup>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlled</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexCheckbox
                        checked={checked}
                        onChange={handleChange}
                        label="Controlled Checkbox"
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        Is Checked: {checked ? 'Yes' : 'No'}
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
                        <code>{`import { CodeplexCheckbox } from '@codeplex-qwik/ui';

/* Con etiqueta */
<CodeplexCheckbox label="Acepto los términos" />

/* Controlado */
<CodeplexCheckbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  label="Suscribirse"
  color="success"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
