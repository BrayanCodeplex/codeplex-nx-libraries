import { useState } from 'react';
import { CodeplexCampoNumero } from '@codeplex-sac/ui';

export const NumberFieldPage = () => {
    const [value, setValue] = useState<number | null>(10);

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Campo Numérico</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Input numérico con controles de incremento y decremento.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexCampoNumero
                            label="Cantidad"
                            valorPorDefecto={1}
                        />
                        <CodeplexCampoNumero
                            label="Con Límites (0-10)"
                            minimo={0}
                            maximo={10}
                            valorPorDefecto={5}
                        />
                        <CodeplexCampoNumero
                            label="Paso 0.5"
                            paso={0.5}
                            valorPorDefecto={1.5}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlado</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexCampoNumero
                            label="Valor Controlado"
                            valor={value || 0}
                            alCambiar={(newValue: number | null) => setValue(newValue)}
                        />
                        <div className="text-sm text-gray-500">
                            Valor Actual: {value}
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Estados</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <CodeplexCampoNumero label="Deshabilitado" disabled valorPorDefecto={10} />
                        <CodeplexCampoNumero label="Error" error helperText="Valor inválido" valorPorDefecto={-1} />
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
<CodeplexCampoNumero label="Age" minimo={0} maximo={100} />

// Controlled
<CodeplexCampoNumero
  valor={value}
  alCambiar={(val) => setValue(val)}
  label="Price"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
