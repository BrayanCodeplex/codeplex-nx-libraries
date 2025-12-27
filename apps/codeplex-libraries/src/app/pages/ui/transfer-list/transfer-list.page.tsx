import { useState } from 'react';
import { CodeplexTransferList, TransferListItem } from '@codeplex-qwik/ui';

export const TransferListPage = () => {
    const [left, setLeft] = useState<TransferListItem[]>([
        { id: 1, label: 'List Item 1' },
        { id: 2, label: 'List Item 2' },
        { id: 3, label: 'List Item 3' },
        { id: 4, label: 'List Item 4' },
    ]);
    const [right, setRight] = useState<TransferListItem[]>([
        { id: 5, label: 'List Item 5' },
        { id: 6, label: 'List Item 6' },
        { id: 7, label: 'List Item 7' },
    ]);

    const handleTransferChange = (newLeft: TransferListItem[], newRight: TransferListItem[]) => {
        setLeft(newLeft);
        setRight(newRight);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transfer List</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente para mover elementos entre dos listas de manera intuitiva y rápida.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic Transfer</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexTransferList
                        left={left}
                        right={right}
                        onChange={handleTransferChange}
                        leftTitle="Available Items"
                        rightTitle="Selected Items"
                    />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexTransferList } from '@codeplex-qwik/ui';

const [left, setLeft] = useState([{ id: 1, label: 'Item 1' }]);
const [right, setRight] = useState([]);

<CodeplexTransferList
  left={left}
  right={right}
  onChange={(newLeft, newRight) => {
    setLeft(newLeft);
    setRight(newRight);
  }}
  leftTitle="Available"
  rightTitle="Selected"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
