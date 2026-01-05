import { useState } from 'react';
import { CodeplexListaTransferencia, ElementoListaTransferencia } from '@codeplex-sac/ui';

export const TransferListPage = () => {
    const [left, setLeft] = useState<ElementoListaTransferencia[]>([
        { id: 1, etiqueta: 'Elemento 1' },
        { id: 2, etiqueta: 'Elemento 2' },
        { id: 3, etiqueta: 'Elemento 3' },
        { id: 4, etiqueta: 'Elemento 4' },
    ]);
    const [right, setRight] = useState<ElementoListaTransferencia[]>([
        { id: 5, etiqueta: 'Elemento 5' },
        { id: 6, etiqueta: 'Elemento 6' },
        { id: 7, etiqueta: 'Elemento 7' },
    ]);

    const handleTransferChange = (newLeft: ElementoListaTransferencia[], newRight: ElementoListaTransferencia[]) => {
        setLeft(newLeft);
        setRight(newRight);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lista de Transferencia</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente para mover elementos entre dos listas de manera intuitiva y rápida.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Básico</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexListaTransferencia
                        izquierda={left}
                        derecha={right}
                        alCambiar={handleTransferChange}
                        tituloIzquierda="Disponibles"
                        tituloDerecha="Seleccionados"
                    />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexListaTransferencia } from '@codeplex-sac/ui';

const [left, setLeft] = useState([{ id: 1, etiqueta: 'Item 1' }]);
const [right, setRight] = useState([]);

<CodeplexListaTransferencia
  izquierda={left}
  derecha={right}
  alCambiar={(newLeft, newRight) => {
    setLeft(newLeft);
    setRight(newRight);
  }}
  tituloIzquierda="Disponibles"
  tituloDerecha="Seleccionados"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
