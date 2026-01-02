import { CodeplexPagination } from '@codeplex-sac/navigation';
import { CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexStack } from '@codeplex-sac/layout';

export const PaginationPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pagination</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Paginación estándar. Vitaminado con <code>centered</code>.
                </p>
            </div>

            <CodeplexCard header="Variantes">
                <CodeplexStack spacing={2} p={2}>
                    <CodeplexPagination count={10} />
                    <CodeplexPagination count={10} color="primary" />
                    <CodeplexPagination count={10} variant="outlined" shape="rounded" />
                </CodeplexStack>
            </CodeplexCard>

            <CodeplexCard header="Centrado (centered prop)">
                <CodeplexStack spacing={2} p={2}>
                    <CodeplexPagination count={5} centered color="secondary" />
                </CodeplexStack>
            </CodeplexCard>
        </div>
    );
};
