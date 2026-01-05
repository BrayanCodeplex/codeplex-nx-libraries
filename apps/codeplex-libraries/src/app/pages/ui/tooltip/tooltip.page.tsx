import { CodeplexTooltip, CodeplexBoton, CodeplexTarjeta } from '@codeplex-sac/ui';

export const TooltipPage = () => {
    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ayuda Contextual (Tooltip)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Ayudas contextuales flotantes que aparecen al pasar el cursor o enfocar un elemento.
                </p>
            </div>

            <CodeplexTarjeta cabecera={<h2 className="text-xl font-bold">Uso Básico</h2>}>
                <div className="flex items-center gap-4 p-4">
                    <CodeplexTooltip contenido="Editar perfil de usuario">
                        <CodeplexBoton variante="secondary">✏️ Editar</CodeplexBoton>
                    </CodeplexTooltip>

                    <CodeplexTooltip contenido="Información de accesibilidad">
                        <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                            ℹ️
                        </button>
                    </CodeplexTooltip>
                </div>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera={<h2 className="text-xl font-bold">Posiciones y Flechas</h2>}>
                <div className="p-10 flex flex-col items-center justify-center gap-8 border border-dashed border-gray-200 dark:border-gray-700 m-4 rounded">
                    <CodeplexTooltip contenido="Tooltip Arriba" lado="arriba">
                        <CodeplexBoton tamano="sm" variante="ghost">Arriba</CodeplexBoton>
                    </CodeplexTooltip>

                    <div className="flex gap-12">
                        <CodeplexTooltip contenido="Izquierda" lado="izquierda">
                            <CodeplexBoton tamano="sm" variante="ghost">Izquierda</CodeplexBoton>
                        </CodeplexTooltip>

                        <CodeplexTooltip contenido="Derecha" lado="derecha">
                            <CodeplexBoton tamano="sm" variante="ghost">Derecha</CodeplexBoton>
                        </CodeplexTooltip>
                    </div>

                    <CodeplexTooltip contenido="Abajo" lado="abajo">
                        <CodeplexBoton tamano="sm" variante="ghost">Abajo</CodeplexBoton>
                    </CodeplexTooltip>
                </div>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera={<h2 className="text-xl font-bold">Configuraciones</h2>}>
                <div className="flex gap-6 p-4">
                    <CodeplexTooltip contenido="Sin flecha decorativa" flecha={false}>
                        <CodeplexBoton variante="secondary">Sin Flecha</CodeplexBoton>
                    </CodeplexTooltip>

                    <CodeplexTooltip contenido="Aparece rápido (0ms)" retrasoMs={0}>
                        <CodeplexBoton variante="secondary">Instantáneo</CodeplexBoton>
                    </CodeplexTooltip>
                </div>
            </CodeplexTarjeta>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexTooltip } from '@codeplex-sac/ui';

<CodeplexTooltip contenido="Guardar Cambios">
  <button>Guardar</button>
</CodeplexTooltip>`}</code>
                    </pre>
                </div>
            </section>

            {/* Código máximo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código personalizado
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexTooltip } from '@codeplex-sac/ui';

// Tooltip con posición forzada, sin flecha y delay de 500ms
<CodeplexTooltip
  contenido="Información detallada sobre esta métrica"
  lado="derecha"
  flecha={false}
  retrasoMs={500}
>
  <span className="cursor-help text-blue-500">
    AYUDA (?)
  </span>
</CodeplexTooltip>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
