import { CodeplexProgreso, CodeplexCargando, CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { useState, useEffect } from 'react';

export const ProgressPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress & Spinner</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Feedback indicators for running processes.
                </p>
            </div>

            {/* Circular Progress (Spinner) */}
            <CodeplexTarjeta cabecera="Circular Progress (Spinner)">
                <div className="flex flex-col gap-6 p-4">
                    <div className="flex gap-8 items-center">
                        <CodeplexCargando tamano="sm" />
                        <CodeplexCargando tamano="md" />
                        <CodeplexCargando tamano="lg" />
                        <CodeplexCargando tamano="xl" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <CodeplexCargando color="secondary" />
                        <CodeplexCargando color="success" />
                        <CodeplexCargando color="warning" />
                        <CodeplexCargando color="error" />
                        <CodeplexCargando color="info" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <CodeplexCargando etiqueta="Loading..." />
                        <CodeplexCargando etiqueta="Processing..." posicionEtiqueta="bottom" />
                        <CodeplexCargando tipo="dots" color="primary" tamano="lg" />
                        <CodeplexCargando tipo="ping" color="secondary" tamano="lg" />
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Linear Progress */}
            <CodeplexTarjeta cabecera="Linear Progress">
                <div className="space-y-6 p-4">
                    {/* Basic */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Indeterminate</h4>
                        <CodeplexProgreso indeterminado />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Determinate ({Math.round(progress)}%)</h4>
                        <CodeplexProgreso valor={progress} />
                    </div>

                    {/* Colors */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Colors</h4>
                        <CodeplexProgreso valor={50} variante="secondary" />
                        <CodeplexProgreso valor={60} variante="success" />
                        <CodeplexProgreso valor={70} variante="warning" />
                        <CodeplexProgreso valor={80} variante="error" />
                    </div>

                    {/* Sizes */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Sizes</h4>
                        <CodeplexProgreso valor={30} tamano="sm" />
                        <CodeplexProgreso valor={50} tamano="md" />
                        <CodeplexProgreso valor={70} tamano="lg" />
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Features</h4>
                        <CodeplexProgreso valor={65} etiqueta="Uploading file..." mostrarPorcentaje />
                        <CodeplexProgreso valor={85} tamano="lg" etiqueta="Inside Label" etiquetaInterna mostrarPorcentaje />
                        <CodeplexProgreso valor={progress} rayado animado etiqueta="Striped & Animated" />
                    </div>
                </div>
            </CodeplexTarjeta>
        </div>
    );
};
