import { CodeplexTooltip, CodeplexButton, CodeplexCard } from '@codeplex/ui';

export const TooltipPage = () => {
    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexTooltip</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Ayudas contextuales flotantes que aparecen al pasar el cursor o enfocar un elemento.
                </p>
            </div>

            <CodeplexCard header={<h2 className="text-xl font-bold">Uso Básico</h2>}>
                <div className="flex items-center gap-4 p-4">
                    <CodeplexTooltip content="Editar perfil de usuario">
                        <CodeplexButton variant="secondary">✏️ Editar</CodeplexButton>
                    </CodeplexTooltip>

                    <CodeplexTooltip content="Información de accesibilidad">
                        <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                            ℹ️
                        </button>
                    </CodeplexTooltip>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Posiciones y Flechas</h2>}>
                <div className="p-10 flex flex-col items-center justify-center gap-8 border border-dashed border-gray-200 dark:border-gray-700 m-4 rounded">
                    <CodeplexTooltip content="Tooltip Arriba (Top)" side="top">
                        <CodeplexButton size="sm" variant="ghost">Top</CodeplexButton>
                    </CodeplexTooltip>

                    <div className="flex gap-12">
                        <CodeplexTooltip content="Izquierda (Left)" side="left">
                            <CodeplexButton size="sm" variant="ghost">Left</CodeplexButton>
                        </CodeplexTooltip>

                        <CodeplexTooltip content="Derecha (Right)" side="right">
                            <CodeplexButton size="sm" variant="ghost">Right</CodeplexButton>
                        </CodeplexTooltip>
                    </div>

                    <CodeplexTooltip content="Abajo (Bottom)" side="bottom">
                        <CodeplexButton size="sm" variant="ghost">Bottom</CodeplexButton>
                    </CodeplexTooltip>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Configuraciones</h2>}>
                <div className="flex gap-6 p-4">
                    <CodeplexTooltip content="Sin flecha decorativa" arrow={false}>
                        <CodeplexButton variant="secondary">Sin Flecha</CodeplexButton>
                    </CodeplexTooltip>

                    <CodeplexTooltip content="Aparece rápido (0ms)" delayMs={0}>
                        <CodeplexButton variant="secondary">Instantáneo</CodeplexButton>
                    </CodeplexTooltip>
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexTooltip } from '@codeplex/ui';

<CodeplexTooltip content="Guardar Cambios">
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
                        <code>{`import { CodeplexTooltip } from '@codeplex/ui';

// Tooltip con posición forzada, sin flecha y delay
<CodeplexTooltip
  content="Información detallada sobre esta métrica"
  side="right"
  arrow={false}
  delayMs={500}
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
