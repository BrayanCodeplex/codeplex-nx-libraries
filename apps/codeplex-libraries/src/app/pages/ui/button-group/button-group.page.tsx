import { CodeplexButtonGroup, CodeplexButton } from '@codeplex-sac/ui';
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
                        <CodeplexButtonGroup variant="contained" aria-label="Basic button group">
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
                        <CodeplexButtonGroup variant="outlined" aria-label="Basic button group">
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
                        <CodeplexButtonGroup variant="text" aria-label="Basic button group">
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sizes and Colors</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <div className="flex flex-col items-center gap-4">
                        <CodeplexButtonGroup size="small" aria-label="Small button group">
                            <CodeplexButton key="one">One</CodeplexButton>
                            <CodeplexButton key="two">Two</CodeplexButton>
                            <CodeplexButton key="three">Three</CodeplexButton>
                        </CodeplexButtonGroup>
                        <CodeplexButtonGroup color="secondary" aria-label="Secondary button group">
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
                        <CodeplexButtonGroup size="large" aria-label="Large button group" color="error">
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Vertical</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex justify-center">
                        <CodeplexButtonGroup
                            orientation="vertical"
                            aria-label="Vertical button group"
                            variant="outlined"
                        >
                            <CodeplexButton>One</CodeplexButton>
                            <CodeplexButton>Two</CodeplexButton>
                            <CodeplexButton>Three</CodeplexButton>
                        </CodeplexButtonGroup>
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
                        <code>{`import { CodeplexButtonGroup, CodeplexButton } from '@codeplex-sac/ui';

<CodeplexButtonGroup variant="contained">
  <CodeplexButton>One</CodeplexButton>
  <CodeplexButton>Two</CodeplexButton>
</CodeplexButtonGroup>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
