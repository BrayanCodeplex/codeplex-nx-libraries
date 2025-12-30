import { CodeplexContainer, CodeplexBox } from '@codeplex-qwik/layout';
import { CodeplexCard } from '@codeplex-qwik/ui';

export const ContainerPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Container</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Contenedor para alinear contenido horizontalmente. Vitaminado con <code>fluid</code> y <code>pageCentered</code>.
                </p>
            </div>

            <CodeplexCard header="Container Normal (fixed)">
                <CodeplexContainer maxWidth="sm" sx={{ bgcolor: 'secondary.light', p: 2, color: 'white' }}>
                    maxWidth="sm"
                </CodeplexContainer>
            </CodeplexCard>

            <CodeplexCard header="Container Fluid (fluid prop)">
                <CodeplexContainer fluid sx={{ bgcolor: 'info.light', p: 2, color: 'white' }}>
                    fluid (full width)
                </CodeplexContainer>
            </CodeplexCard>

            <CodeplexCard header="Page Centered (Demo)">
                <CodeplexBox sx={{ height: 300, border: '1px solid #ccc', overflow: 'auto', position: 'relative' }}>
                    <CodeplexContainer pageCentered sx={{ bgcolor: 'grey.100' }}>
                        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
                            <h3 className="font-bold text-lg mb-2">Login Form Placeholder</h3>
                            <p>PageCentered centra esto vertical y horizontalmente como un 100vh page.</p>
                        </div>
                    </CodeplexContainer>
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexContainer fluid>
  ...Full Width Content
</CodeplexContainer>

<CodeplexContainer pageCentered>
  ...Vertical Centered Content (Login/Error Page)
</CodeplexContainer>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
