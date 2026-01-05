import { CodeplexContenedor, CodeplexCaja } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';

export const ContainerPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contenedor (Container)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Contenedor para alinear contenido horizontalmente. Vitaminado con <code>fluido</code> y <code>paginaCentrada</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Contenedor Normal (fijo)">
                <CodeplexContenedor anchoMaximo="sm" sx={{ bgcolor: 'secondary.light', p: 2, color: 'white' }}>
                    anchoMaximo="sm"
                </CodeplexContenedor>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Contenedor Fluido (propiedad fluido)">
                <CodeplexContenedor fluido sx={{ bgcolor: 'info.light', p: 2, color: 'white' }}>
                    fluido (ancho completo)
                </CodeplexContenedor>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Página Centrada (Demo)">
                <CodeplexCaja sx={{ height: 300, border: '1px solid #ccc', overflow: 'auto', position: 'relative' }}>
                    <CodeplexContenedor paginaCentrada sx={{ bgcolor: 'grey.100' }}>
                        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
                            <h3 className="font-bold text-lg mb-2">Placeholder de Formulario de Login</h3>
                            <p>PaginaCentrada centra esto vertical y horizontalmente como una página de 100vh.</p>
                        </div>
                    </CodeplexContenedor>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexContenedor fluido>
  ...Contenido de Ancho Completo
</CodeplexContenedor>

<CodeplexContenedor paginaCentrada>
  ...Contenido Centrado Verticalmente (Login/Página de Error)
</CodeplexContenedor>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
