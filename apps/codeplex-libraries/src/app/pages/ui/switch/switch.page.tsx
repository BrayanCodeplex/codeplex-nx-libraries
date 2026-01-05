import { useState } from 'react';
import { CodeplexInterruptor, CodeplexTarjeta, CodeplexGrupoFormulario } from '@codeplex-sac/ui';

export const SwitchPage = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Interruptor (Switch)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Interruptores de palanca con estilo premium para configuraciones booleanas.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col gap-4">
                    <CodeplexInterruptor defaultChecked etiqueta="Marcado por defecto" />
                    <CodeplexInterruptor etiqueta="Desmarcado" />
                    <CodeplexInterruptor disabled defaultChecked etiqueta="Deshabilitado Marcado" />
                    <CodeplexInterruptor disabled etiqueta="Deshabilitado" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlado</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexInterruptor
                        checked={checked}
                        onChange={handleChange}
                        etiqueta={checked ? "Activo" : "Inactivo"}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colores</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-wrap gap-8">
                    <CodeplexInterruptor defaultChecked color="primary" etiqueta="Primario" />
                    <CodeplexInterruptor defaultChecked color="secondary" etiqueta="Secundario" />
                    <CodeplexInterruptor defaultChecked color="success" etiqueta="Éxito" />
                    <CodeplexInterruptor defaultChecked color="error" etiqueta="Error" />
                    <CodeplexInterruptor defaultChecked color="warning" etiqueta="Advertencia" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tamaños</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-8">
                    <CodeplexInterruptor defaultChecked tamano="medium" etiqueta="Mediano" />
                    <CodeplexInterruptor defaultChecked tamano="small" etiqueta="Pequeño" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Posición de Etiqueta</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexGrupoFormulario row>
                        <CodeplexInterruptor defaultChecked etiqueta="Arriba" posicionEtiqueta="top" />
                        <CodeplexInterruptor defaultChecked etiqueta="Inicio" posicionEtiqueta="start" />
                        <CodeplexInterruptor defaultChecked etiqueta="Abajo" posicionEtiqueta="bottom" />
                        <CodeplexInterruptor defaultChecked etiqueta="Fin" posicionEtiqueta="end" />
                    </CodeplexGrupoFormulario>
                </div>
            </section>

            {/* Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexInterruptor } from '@codeplex-sac/ui';

/* Básico */
<CodeplexInterruptor etiqueta="Notificaciones" defaultChecked />

/* Controlado */
<CodeplexInterruptor 
  checked={activo} 
  onChange={(e) => setActivo(e.target.checked)} 
  etiqueta="Habilitar Función" 
/>

/* Colores */
<CodeplexInterruptor color="success" etiqueta="Éxito" />`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
