import { useState } from 'react';
import { CodeplexRating, CodeplexCard } from '@codeplex-qwik/ui';

export const RatingPage = () => {
    const [ratingValue, setRatingValue] = useState(3);
    const [feedbackValue, setFeedbackValue] = useState(2);

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexRating</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente de valoración interactivo con soporte para teclado, tooltips y variantes visuales.
                </p>
            </div>

            <CodeplexCard header={<h2 className="text-xl font-bold">Interactivo Controlado</h2>}>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Valor actual: {ratingValue}</span>
                    </div>
                    <CodeplexRating
                        value={ratingValue}
                        max={5}
                        size="lg"
                        onChange={(v) => setRatingValue(v)}
                        showValue
                    />
                    <p className="text-sm text-gray-500">Haz click en las estrellas.</p>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Tamaños</h2>}>
                <div className="flex flex-col gap-4 p-4">
                    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                        <div key={size} className="flex items-center gap-4">
                            <span className="w-8 text-xs text-gray-400 uppercase">{size}</span>
                            <CodeplexRating value={3} size={size as any} readOnly />
                        </div>
                    ))}
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Variantes de Color</h2>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Warning</p>
                        <CodeplexRating value={4} variant="warning" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Success</p>
                        <CodeplexRating value={5} variant="success" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Danger</p>
                        <CodeplexRating value={2} variant="danger" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Primary</p>
                        <CodeplexRating value={3} variant="primary" readOnly />
                    </div>
                </div>
            </CodeplexCard>

            <CodeplexCard className="border border-blue-100 dark:border-blue-900/30">
                <div className="p-6 flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Experiencia con Feedback</h2>
                    <p className="text-sm text-gray-500">Pasa el mouse sobre las estrellas.</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <CodeplexRating
                            value={feedbackValue}
                            max={5}
                            size="xl"
                            variant="primary"
                            tooltips={['Terrible 😡', 'Malo 😞', 'Regular 😐', 'Bueno 🙂', 'Excelente 🤩']}
                            onChange={(v) => setFeedbackValue(v)}
                        />
                    </div>
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexRating } from '@codeplex-qwik/ui';

<CodeplexRating value={4} onChange={(val) => console.log(val)} />`}</code>
                    </pre>
                </div>
            </section>

            {/* Código máximo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código personalizado
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexRating } from '@codeplex-qwik/ui';

// Rating grande, de solo lectura, variante "success"
<CodeplexRating
  value={4.8}
  max={5}
  size="xl"
  variant="success"
  readOnly
  showValue
/>

// Rating interactivo con tooltips de feedback
<CodeplexRating
  value={value}
  variant="primary"
  tooltips={['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente']}
  onChange={setValue}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
