import { CodeplexCaja, CodeplexPila } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';

export const BoxPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Caja (Box)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    El componente <code>CodeplexCaja</code> es un wrapper de MUI Box vitaminado con shortcuts útiles para Flexbox y posicionamiento.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Centrado Rápido (centrado)">
                <CodeplexCaja centrado sx={{ height: 150, bgcolor: 'primary.light', color: 'white', borderRadius: 2 }}>
                    <span className="text-white font-bold text-xl">¡Estoy Centrado!</span>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Accesos Rápidos Flex (flexFila / flexColumna)">
                <CodeplexPila espaciado={2} p={2}>
                    <CodeplexCaja flexFila sx={{ gap: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <div className="bg-blue-200 p-2 text-black">Ítem 1</div>
                        <div className="bg-blue-300 p-2 text-black">Ítem 2 (Fila)</div>
                    </CodeplexCaja>
                    <CodeplexCaja flexColumna sx={{ gap: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <div className="bg-green-200 p-2 text-black">Ítem 1</div>
                        <div className="bg-green-300 p-2 text-black">Ítem 2 (Columna)</div>
                    </CodeplexCaja>
                </CodeplexPila>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexCaja centrado sx={{ height: 200, bgcolor: 'primary.main' }}>
  Contenido Centrado
</CodeplexCaja>

<CodeplexCaja flexFila sx={{ gap: 2 }}>
  <div>Ítem 1</div>
  <div>Ítem 2</div>
</CodeplexCaja>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
