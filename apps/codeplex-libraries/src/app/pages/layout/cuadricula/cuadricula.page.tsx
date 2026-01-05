import { CodeplexCuadricula, CodeplexCaja } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { Paper } from '@mui/material';

const Elemento = ({ children }: { children: React.ReactNode }) => (
    <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary', height: '100%' }}>{children}</Paper>
);

export const GridPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cuadrícula (Grid v2)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Wrapper de MUI Grid v2. Usa la propiedad <code>size</code> para definir anchos de columna (xs, sm, md, etc.).
                </p>
            </div>

            <CodeplexTarjeta cabecera="Cuadrícula Básica">
                <CodeplexCaja sx={{ flexGrow: 1, p: 2 }}>
                    <CodeplexCuadricula contenedor espaciado={2}>
                        <CodeplexCuadricula size={{ xs: 12, md: 8 }}>
                            <Elemento>xs=12 md=8</Elemento>
                        </CodeplexCuadricula>
                        <CodeplexCuadricula size={{ xs: 6, md: 4 }}>
                            <Elemento>xs=6 md=4</Elemento>
                        </CodeplexCuadricula>
                        <CodeplexCuadricula size={{ xs: 6, md: 4 }}>
                            <Elemento>xs=6 md=4</Elemento>
                        </CodeplexCuadricula>
                        <CodeplexCuadricula size={{ xs: 12, md: 8 }}>
                            <Elemento>xs=12 md=8</Elemento>
                        </CodeplexCuadricula>
                    </CodeplexCuadricula>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Cuadrícula Centrada (propiedad centrado)">
                <CodeplexCaja sx={{ height: 200, bgcolor: 'action.hover' }}>
                    <CodeplexCuadricula contenedor centrado espaciado={2} sx={{ height: '100%' }}>
                        <CodeplexCuadricula>
                            <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
                                Elemento Centrado
                            </Paper>
                        </CodeplexCuadricula>
                    </CodeplexCuadricula>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexCuadricula contenedor espaciado={2}>
  <CodeplexCuadricula size={{ xs: 12, md: 6 }}>
     <Elemento>Contenido</Elemento>
  </CodeplexCuadricula>
</CodeplexCuadricula>

// Contenedor Centrado
<CodeplexCuadricula contenedor centrado>
  <Elemento>Centrado</Elemento>
</CodeplexCuadricula>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
