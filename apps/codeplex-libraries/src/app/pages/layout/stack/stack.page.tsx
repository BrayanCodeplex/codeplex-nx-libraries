import { CodeplexStack, CodeplexBox } from '@codeplex-qwik/layout';
import { CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { Paper } from '@mui/material';

const Item = ({ children }: { children: React.ReactNode }) => (
    <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>{children}</Paper>
);

export const StackPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stack</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <code>CodeplexStack</code> maneja el layout unidimensional (vertical u horizontal). Incluye shortcuts para centrar y distribuir espacio.
                </p>
            </div>

            <CodeplexCard header="Stack Básico (Vertical)">
                <CodeplexStack spacing={2} sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </CodeplexStack>
            </CodeplexCard>

            <CodeplexCard header="Stack Row + Centered">
                <CodeplexBox centered sx={{ p: 4, bgcolor: 'background.paper', border: '1px dashed grey' }}>
                    <CodeplexStack direction="row" spacing={2}>
                        <Item>Item A</Item>
                        <Item>Item B</Item>
                    </CodeplexStack>
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Stack Between (between prop)">
                <CodeplexStack direction="row" between sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1 }}>
                    <span className="font-bold text-white">Left Side</span>
                    <span className="text-white">Right Side (Actions)</span>
                </CodeplexStack>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexStack spacing={2}>
  <Item>1</Item>
  <Item>2</Item>
</CodeplexStack>

<CodeplexStack direction="row" between>
  <div>Left</div>
  <div>Right</div>
</CodeplexStack>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
