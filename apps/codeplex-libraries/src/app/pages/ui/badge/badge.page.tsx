import { useState } from 'react';
import { CodeplexBadge, CodeplexCard } from '@codeplex-qwik/ui';

export const BadgePage = () => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'archived'>('all');

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexBadge</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Etiquetas compactas para estados, contadores y categorías. Se integran fácilmente con botones, cards, tablas y filtros.
                </p>
            </div>

            <CodeplexCard header={<h2 className="text-xl font-bold">Variantes de Color</h2>}>
                <div className="flex flex-wrap gap-3 p-4">
                    <CodeplexBadge label="Neutral" variant="neutral" />
                    <CodeplexBadge label="Primary" variant="primary" />
                    <CodeplexBadge label="Secondary" variant="secondary" />
                    <CodeplexBadge label="Success" variant="success" />
                    <CodeplexBadge label="Warning" variant="warning" />
                    <CodeplexBadge label="Danger" variant="danger" />
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Tamaños y Forma</h2>}>
                <div className="flex flex-wrap gap-4 items-center p-4">
                    <CodeplexBadge label="sm pill" size="sm" pill />
                    <CodeplexBadge label="md pill" size="md" pill />
                    <CodeplexBadge label="sm cuadrado" size="sm" pill={false} />
                    <CodeplexBadge label="md cuadrado" size="md" pill={false} />
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Ejemplos de Uso</h2>}>
                <div className="space-y-4 p-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Notificaciones</span>
                        <CodeplexBadge label="12" variant="danger" pill />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Estado:</span>
                        <CodeplexBadge label="Activo" variant="success" />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Rol:</span>
                        <CodeplexBadge label="Admin" variant="secondary" iconLeft="⭐" />
                    </div>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Badges como Filtros</h2>}>
                <div className="p-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <CodeplexBadge
                            label="Todos"
                            variant={selectedFilter === 'all' ? 'primary' : 'neutral'}
                            onClick={() => setSelectedFilter('all')}
                            className="cursor-pointer"
                        />
                        <CodeplexBadge
                            label="Activos"
                            variant={selectedFilter === 'active' ? 'primary' : 'neutral'}
                            onClick={() => setSelectedFilter('active')}
                            className="cursor-pointer"
                        />
                        <CodeplexBadge
                            label="Archivados"
                            variant={selectedFilter === 'archived' ? 'primary' : 'neutral'}
                            onClick={() => setSelectedFilter('archived')}
                            className="cursor-pointer"
                        />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Filtro seleccionado: <span className="font-semibold">{selectedFilter}</span>
                    </p>
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexBadge } from '@codeplex-qwik/ui';

<CodeplexBadge label="Nuevo" variant="primary" />`}</code>
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
                        <code>{`import { CodeplexBadge } from '@codeplex-qwik/ui';

// Badge interactivo tipo "pill" con icono y acción
<CodeplexBadge
  label="Admin"
  variant="secondary"
  size="sm"
  pill
  iconLeft={<span>🛡️</span>}
  onClick={() => openRoleSettings()}
  className="shadow-sm hover:shadow-md"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
