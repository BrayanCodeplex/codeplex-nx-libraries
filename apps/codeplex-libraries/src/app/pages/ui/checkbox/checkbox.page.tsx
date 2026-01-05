import { useState } from 'react';
import { CodeplexCasilla, CodeplexGrupoFormulario } from '@codeplex-sac/ui';

export const CheckboxPage = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Casilla (Checkbox)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selección múltiple. Wrapper de MUI Checkbox con soporte integrado para etiquetas.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col gap-2">
                        <CodeplexCasilla etiqueta="Predeterminado" defaultChecked />
                        <CodeplexCasilla etiqueta="Requerido" required />
                        <CodeplexCasilla etiqueta="Deshabilitado" disabled />
                        <CodeplexCasilla etiqueta="Deshabilitado Marcado" disabled defaultChecked />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colores y Tamaños</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-wrap gap-4 items-center">
                        <CodeplexCasilla etiqueta="Primario" defaultChecked />
                        <CodeplexCasilla etiqueta="Secundario" color="secondary" defaultChecked />
                        <CodeplexCasilla etiqueta="Éxito" color="success" defaultChecked />
                        <CodeplexCasilla etiqueta="Error" color="error" defaultChecked />

                        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                        <CodeplexCasilla etiqueta="Pequeño" size="small" defaultChecked />
                        <CodeplexCasilla etiqueta="Mediano" size="medium" defaultChecked />
                        <CodeplexCasilla
                            etiqueta="Grande Personalizado"
                            defaultChecked
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Indeterminado y Grupos</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexGrupoFormulario>
                        <CodeplexCasilla etiqueta="Padre (Indeterminado)" indeterminate />
                        <div className="pl-6 flex flex-col">
                            <CodeplexCasilla etiqueta="Hijo 1" checked />
                            <CodeplexCasilla etiqueta="Hijo 2" />
                        </div>
                    </CodeplexGrupoFormulario>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Posición de Etiqueta</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexGrupoFormulario row>
                        <CodeplexCasilla posicionEtiqueta="top" etiqueta="Top" />
                        <CodeplexCasilla posicionEtiqueta="start" etiqueta="Start" />
                        <CodeplexCasilla posicionEtiqueta="bottom" etiqueta="Bottom" />
                        <CodeplexCasilla posicionEtiqueta="end" etiqueta="End" />
                    </CodeplexGrupoFormulario>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlado</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexCasilla
                        checked={checked}
                        onChange={handleChange}
                        etiqueta="Checkbox Controlado"
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        Seleccionado: {checked ? 'Sí' : 'No'}
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
                        <code>{`import { CodeplexCasilla } from '@codeplex-sac/ui';

/* Con etiqueta */
<CodeplexCasilla etiqueta="Acepto los términos" />

/* Controlado */
<CodeplexCasilla
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  etiqueta="Suscribirse"
  color="success"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
