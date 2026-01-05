import { useState } from 'react';
import { CodeplexRadio, CodeplexGrupoRadio } from '@codeplex-sac/ui';

export const RadioGroupPage = () => {
    const [value, setValue] = useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Grupo de Radio (Radio Group)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selección única entre opciones. Estilo premium personalizado.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexGrupoRadio
                        defaultValue="female"
                        name="radio-buttons-group"
                        etiqueta="Género"
                    >
                        <CodeplexRadio value="female" etiqueta="Femenino" />
                        <CodeplexRadio value="male" etiqueta="Masculino" />
                        <CodeplexRadio value="other" etiqueta="Otro" />
                    </CodeplexGrupoRadio>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Dirección (Fila)</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexGrupoRadio
                        row
                        defaultValue="female"
                        name="row-radio-buttons-group"
                        etiqueta="Género (Fila)"
                    >
                        <CodeplexRadio value="female" etiqueta="Femenino" />
                        <CodeplexRadio value="male" etiqueta="Masculino" />
                        <CodeplexRadio value="other" etiqueta="Otro" disabled />
                    </CodeplexGrupoRadio>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlado</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexGrupoRadio
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        etiqueta="Controlado"
                    >
                        <CodeplexRadio value="female" etiqueta="Femenino" />
                        <CodeplexRadio value="male" etiqueta="Masculino" />
                    </CodeplexGrupoRadio>
                    <div className="text-sm text-gray-500">
                        Seleccionado: {value}
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Usando Prop Opciones</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexGrupoRadio
                        etiqueta="Selección de Plan"
                        defaultValue="standard"
                        opciones={[
                            { valor: 'basic', etiqueta: 'Plan Básico' },
                            { valor: 'standard', etiqueta: 'Plan Estándar' },
                            { valor: 'premium', etiqueta: 'Plan Premium' },
                            { valor: 'enterprise', etiqueta: 'Plan Enterprise (Próximamente)', deshabilitado: true },
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
                        <code>{`import { CodeplexGrupoRadio, CodeplexRadio } from '@codeplex-sac/ui';

// Composición
<CodeplexGrupoRadio etiqueta="Género" defaultValue="female">
  <CodeplexRadio value="female" etiqueta="Femenino" />
  <CodeplexRadio value="male" etiqueta="Masculino" />
</CodeplexGrupoRadio>

// Prop Opciones
<CodeplexGrupoRadio
  etiqueta="Plan"
  opciones={[
    { valor: 'a', etiqueta: 'Opción A' },
    { valor: 'b', etiqueta: 'Opción B' }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
