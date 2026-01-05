import { CodeplexGrupoBotones, CodeplexBoton } from '@codeplex-sac/ui';
import { useState } from 'react';

export const ButtonGroupPage = () => {
    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Button Group</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Agrupa botones relacionados. Wrapper de MUI ButtonGroup.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col items-center gap-4">
                        <CodeplexGrupoBotones variante="contained" aria-label="Basic button group">
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                        <CodeplexGrupoBotones variante="outlined" aria-label="Basic button group">
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                        <CodeplexGrupoBotones variante="text" aria-label="Basic button group">
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sizes and Colors</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col items-center gap-4">
                        <CodeplexGrupoBotones tamano="small" aria-label="Small button group">
                            <CodeplexBoton key="one">Uno</CodeplexBoton>
                            <CodeplexBoton key="two">Dos</CodeplexBoton>
                            <CodeplexBoton key="three">Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                        <CodeplexGrupoBotones color="secondary" aria-label="Secondary button group">
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                        <CodeplexGrupoBotones tamano="large" aria-label="Large button group" color="error">
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Vertical</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex justify-center">
                        <CodeplexGrupoBotones
                            orientation="vertical"
                            aria-label="Vertical button group"
                            variante="outlined"
                        >
                            <CodeplexBoton>Uno</CodeplexBoton>
                            <CodeplexBoton>Dos</CodeplexBoton>
                            <CodeplexBoton>Tres</CodeplexBoton>
                        </CodeplexGrupoBotones>
                    </div>
                </div>
            </section>

            {/* Código de ejemplo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexGrupoBotones, CodeplexBoton } from '@codeplex-sac/ui';

<CodeplexGrupoBotones variant="contained">
  <CodeplexBoton>One</CodeplexBoton>
  <CodeplexBoton>Two</CodeplexBoton>
</CodeplexGrupoBotones>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
