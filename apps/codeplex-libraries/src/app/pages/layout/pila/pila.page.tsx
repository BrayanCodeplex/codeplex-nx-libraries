import { CodeplexPila, CodeplexCaja } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { Paper } from '@mui/material';

const Elemento = ({ children }: { children: React.ReactNode }) => (
    <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>{children}</Paper>
);

export const StackPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pila (Stack)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <code>CodeplexPila</code> maneja el layout unidimensional (vertical u horizontal). Incluye shortcuts para centrar y distribuir espacio.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Pila Básica (Vertical)">
                <CodeplexPila espaciado={2} sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Elemento>Elemento 1</Elemento>
                    <Elemento>Elemento 2</Elemento>
                    <Elemento>Elemento 3</Elemento>
                </CodeplexPila>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Pila en Fila + Centrada">
                <CodeplexCaja centrado sx={{ p: 4, bgcolor: 'background.paper', border: '1px dashed grey' }}>
                    <CodeplexPila direccion="row" espaciado={2}>
                        <Elemento>Elemento A</Elemento>
                        <Elemento>Elemento B</Elemento>
                    </CodeplexPila>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Pila Entre (propiedad entre)">
                <CodeplexPila direccion="row" entre sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1 }}>
                    <span className="font-bold text-white">Lado Izquierdo</span>
                    <span className="text-white">Lado Derecho (Acciones)</span>
                </CodeplexPila>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexPila espaciado={2}>
  <Elemento>1</Elemento>
  <Elemento>2</Elemento>
</CodeplexPila>

<CodeplexPila direccion="row" entre>
  <div>Izquierda</div>
  <div>Derecha</div>
</CodeplexPila>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
