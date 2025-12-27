import { useState } from 'react';
import { CodeplexSwitch, CodeplexCard } from '@codeplex-qwik/ui';
import FormGroup from '@mui/material/FormGroup';

export const SwitchPage = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Switch</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Interruptores de palanca con estilo premium para configuraciones booleanas.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col gap-4">
                    <CodeplexSwitch defaultChecked label="Default Checked" />
                    <CodeplexSwitch label="Unchecked" />
                    <CodeplexSwitch disabled defaultChecked label="Disabled Checked" />
                    <CodeplexSwitch disabled label="Disabled" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlled</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSwitch
                        checked={checked}
                        onChange={handleChange}
                        label={checked ? "Active" : "Inactive"}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colors</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-wrap gap-8">
                    <CodeplexSwitch defaultChecked color="primary" label="Primary" />
                    <CodeplexSwitch defaultChecked color="secondary" label="Secondary" />
                    <CodeplexSwitch defaultChecked color="success" label="Success" />
                    <CodeplexSwitch defaultChecked color="error" label="Error" />
                    <CodeplexSwitch defaultChecked color="warning" label="Warning" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sizes</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-8">
                    <CodeplexSwitch defaultChecked size="medium" label="Medium" />
                    <CodeplexSwitch defaultChecked size="small" label="Small" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Label Placement</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <FormGroup row>
                        <CodeplexSwitch defaultChecked label="Top" labelPlacement="top" />
                        <CodeplexSwitch defaultChecked label="Start" labelPlacement="start" />
                        <CodeplexSwitch defaultChecked label="Bottom" labelPlacement="bottom" />
                        <CodeplexSwitch defaultChecked label="End" labelPlacement="end" />
                    </FormGroup>
                </div>
            </section>

            {/* Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexSwitch } from '@codeplex-qwik/ui';

/* Basic */
<CodeplexSwitch label="Notifications" defaultChecked />

/* Controlled */
<CodeplexSwitch 
  checked={enabled} 
  onChange={(e) => setEnabled(e.target.checked)} 
  label="Enable Feature" 
/>

/* Colors */
<CodeplexSwitch color="success" label="Success" />`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
