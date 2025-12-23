import { CodeplexCard } from '@codeplex/ui';

export const SidebarPage = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sidebar</h1>
                <p className="text-gray-600 dark:text-gray-400">Navegación lateral responsiva con soporte para anidación.</p>
            </div>

            <CodeplexCard header="Implementación">
                <div className="p-4 prose dark:prose-invert max-w-none">
                    <p>
                        El componente <code>CodeplexSidebar</code> gestiona automáticamente la responsividad y el estado `collapsed`.
                        Se utiliza en el layout principal envolviendo la navegación de la aplicación.
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4 text-sm overflow-x-auto">
                        {`import { CodeplexSidebar } from '@codeplex/layout';

<CodeplexSidebar
  items={[
    { id: '1', label: 'Inicio', icon: '🏠', href: '/' },
    { id: '2', label: 'Configuración', icon: '⚙️', href: '/settings' }
  ]}
  user={{ name: 'User', role: 'Admin' }}
  collapsed={isCollapsed}
/>`}
                    </pre>
                </div>
            </CodeplexCard>
        </div>
    );
};
