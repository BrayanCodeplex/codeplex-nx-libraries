import { CodeplexBox, CodeplexStack } from '@codeplex-qwik/layout';
import { CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';

export const BoxPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Box</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    El componente <code>CodeplexBox</code> es un wrapper de MUI Box vitaminado con shortcuts útiles para Flexbox y posicionamiento.
                </p>
            </div>

            <CodeplexCard header="Centrado Rápido (centered)">
                <CodeplexBox centered sx={{ height: 150, bgcolor: 'primary.light', col: 'white', borderRadius: 2 }}>
                    <span className="text-white font-bold text-xl">I am Centered!</span>
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Flex Shortcuts (flexRow / flexCol)">
                <CodeplexStack spacing={2} p={2}>
                    <CodeplexBox flexRow sx={{ gap: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <div className="bg-blue-200 p-2">Item 1</div>
                        <div className="bg-blue-300 p-2">Item 2 (Row)</div>
                    </CodeplexBox>
                    <CodeplexBox flexCol sx={{ gap: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <div className="bg-green-200 p-2">Item 1</div>
                        <div className="bg-green-300 p-2">Item 2 (Column)</div>
                    </CodeplexBox>
                </CodeplexStack>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexBox centered sx={{ height: 200, bgcolor: 'primary.main' }}>
  Centered Content
</CodeplexBox>

<CodeplexBox flexRow sx={{ gap: 2 }}>
  <div>Item 1</div>
  <div>Item 2</div>
</CodeplexBox>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
