import { CodeplexTarjeta } from '@codeplex-sac/ui';

export const SidebarPage = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Barra Lateral (Sidebar)</h1>
                <p className="text-gray-600 dark:text-gray-400">Navegación lateral responsiva con soporte para anidación.</p>
            </div>

            <CodeplexTarjeta cabecera="Implementación">
                <div className="p-4 prose dark:prose-invert max-w-none">
                    <p>
                        El componente <code>CodeplexBarraLateral</code> gestiona automáticamente la responsividad y el estado `colapsado`.
                        Se utiliza en el layout principal envolviendo la navegación de la aplicación.
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4 text-sm overflow-x-auto">
                        {`import { CodeplexBarraLateral } from '@codeplex-sac/layout';

<CodeplexBarraLateral
  elementos={[
    { id: '1', etiqueta: 'Inicio', icono: '🏠', href: '/' },
    { id: '2', etiqueta: 'Configuración', icono: '⚙️', href: '/ajustes' }
  ]}
  usuario={{ nombre: 'Usuario', rol: 'Admin' }}
  colapsado={estaColapsado}
/>`}
                    </pre>
                </div>
            </CodeplexTarjeta>
        </div>
    );
};
