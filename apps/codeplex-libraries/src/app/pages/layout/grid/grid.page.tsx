import { CodeplexGrid, CodeplexBox } from '@codeplex-sac/layout';
import { CodeplexCard } from '@codeplex-sac/ui';
import { Paper } from '@mui/material';

const Item = ({ children }: { children: React.ReactNode }) => (
    <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary', height: '100%' }}>{children}</Paper>
);

export const GridPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Grid (v2)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Wrapper de MUI Grid v2. Usa la propiedad <code>size</code> para definir anchos de columna (xs, sm, md, etc.).
                </p>
            </div>

            <CodeplexCard header="Grid Básico">
                <CodeplexBox sx={{ flexGrow: 1, p: 2 }}>
                    <CodeplexGrid container spacing={2}>
                        <CodeplexGrid size={{ xs: 12, md: 8 }}>
                            <Item>xs=12 md=8</Item>
                        </CodeplexGrid>
                        <CodeplexGrid size={{ xs: 6, md: 4 }}>
                            <Item>xs=6 md=4</Item>
                        </CodeplexGrid>
                        <CodeplexGrid size={{ xs: 6, md: 4 }}>
                            <Item>xs=6 md=4</Item>
                        </CodeplexGrid>
                        <CodeplexGrid size={{ xs: 12, md: 8 }}>
                            <Item>xs=12 md=8</Item>
                        </CodeplexGrid>
                    </CodeplexGrid>
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Grid Centrado (centered prop)">
                <CodeplexBox sx={{ height: 200, bgcolor: 'action.hover' }}>
                    <CodeplexGrid container centered spacing={2} sx={{ height: '100%' }}>
                        <CodeplexGrid>
                            <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
                                Centered Item
                            </Paper>
                        </CodeplexGrid>
                    </CodeplexGrid>
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexGrid container spacing={2}>
  <CodeplexGrid size={{ xs: 12, md: 6 }}>
     <Item>Content</Item>
  </CodeplexGrid>
</CodeplexGrid>

// Centered Container
<CodeplexGrid container centered>
  <Item>Centered</Item>
</CodeplexGrid>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
