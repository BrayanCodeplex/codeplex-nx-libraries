import { CodeplexButton, CodeplexCard } from '@codeplex/ui';

export const ButtonPage = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Button</h1>
                <p className="text-gray-600 dark:text-gray-400">Componente interactivo fundamental para acciones del usuario.</p>
            </div>

            <CodeplexCard header="Variantes">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexButton variant="primary" leftIcon="🏠">Primary</CodeplexButton>
                    <CodeplexButton variant="secondary" leftIcon="🏠">Secondary</CodeplexButton>
                    <CodeplexButton variant="ghost">Ghost</CodeplexButton>
                    <CodeplexButton variant="danger">Danger</CodeplexButton>
                    <CodeplexButton variant="success">Success</CodeplexButton>
                </div>
            </CodeplexCard>

            <CodeplexCard header="Tamaños">
                <div className="flex flex-wrap items-center gap-4 p-4">
                    <CodeplexButton size="xs">Extra Small</CodeplexButton>
                    <CodeplexButton size="sm">Small</CodeplexButton>
                    <CodeplexButton size="md">Medium (Default)</CodeplexButton>
                    <CodeplexButton size="lg">Large</CodeplexButton>
                </div>
            </CodeplexCard>

            <CodeplexCard header="Estados">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexButton loading>Loading</CodeplexButton>
                    <CodeplexButton disabled>Disabled</CodeplexButton>
                    <CodeplexButton variant="primary" loading>Processing...</CodeplexButton>
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexButton } from '@codeplex/ui';

<CodeplexButton variant="primary" onClick={() => console.log('Click')}>
  Guardar
</CodeplexButton>`}</code>
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
                        <code>{`import { CodeplexButton } from '@codeplex/ui';

// Botón de carga con icono y ancho completo
<CodeplexButton
  variant="secondary"
  size="lg"
  fullWidth
  loading={isLoading}
  disabled={isDisabled}
  onClick={handleSubmit}
>
  <span className="mr-2">🚀</span> Finalizar Proceso
</CodeplexButton>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
