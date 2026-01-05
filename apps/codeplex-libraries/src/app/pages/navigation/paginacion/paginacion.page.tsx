import { CodeplexPaginacion } from '@codeplex-sac/navigation';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexPila } from '@codeplex-sac/layout';

export const PaginationPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Paginación</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Paginación estándar. Vitaminado con <code>centrado</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Variantes">
                <CodeplexPila espaciado={2} p={2}>
                    <CodeplexPaginacion total={10} />
                    <CodeplexPaginacion total={10} color="primary" />
                    <CodeplexPaginacion total={10} variante="outlined" forma="rounded" />
                </CodeplexPila>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Centrado (propiedad centrado)">
                <CodeplexPila espaciado={2} p={2}>
                    <CodeplexPaginacion total={5} centrado color="secondary" />
                </CodeplexPila>
            </CodeplexTarjeta>
        </div>
    );
};
