import { useState, useEffect } from 'react';
import { CodeplexProgress, CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';

export const ProgressPage = () => {
    const [progressValue, setProgressValue] = useState(10);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isSimulating) {
            interval = setInterval(() => {
                setProgressValue(prev => {
                    if (prev >= 100) {
                        setIsSimulating(false);
                        return 100;
                    }
                    const next = prev + Math.floor(Math.random() * 10) + 1;
                    return next > 100 ? 100 : next;
                });
            }, 500);
        }

        return () => clearInterval(interval);
    }, [isSimulating]);

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexProgress</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Barras de progreso responsivas, temáticas y animadas para visualizar el avance de tareas.
                </p>
            </div>

            <CodeplexCard header={<h2 className="text-xl font-bold">Colores y Variantes</h2>}>
                <div className="space-y-5 p-4">
                    <CodeplexProgress value={45} variant="primary" label="Primary" showPercentage />
                    <CodeplexProgress value={60} variant="success" label="Success" showPercentage />
                    <CodeplexProgress value={75} variant="warning" label="Warning" showPercentage />
                    <CodeplexProgress value={30} variant="danger" label="Danger" showPercentage />
                    <CodeplexProgress value={50} variant="neutral" label="Neutral" showPercentage />
                    <CodeplexProgress value={90} variant="gradient" label="Gradient" showPercentage />
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Tamaños</h2>}>
                <div className="space-y-6 p-4">
                    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                        <div key={size}>
                            <span className="text-xs text-gray-500 mb-1 block uppercase">{size}</span>
                            <CodeplexProgress value={50} size={size as any} />
                        </div>
                    ))}
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Etiquetado Flexible</h2>}>
                <div className="space-y-6 p-4">
                    <CodeplexProgress value={70} label="Etiqueta Exterior (Izquierda)" showPercentage />
                    <CodeplexProgress value={40} label="Etiqueta Exterior (Centro)" labelAlign="center" showPercentage />
                    <CodeplexProgress value={85} size="lg" label="Etiqueta Interior" labelInside showPercentage variant="success" />
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Animaciones y Estados</h2>}>
                <div className="space-y-6 p-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Striped</p>
                        <CodeplexProgress value={50} striped variant="warning" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Animated</p>
                        <CodeplexProgress value={75} animated variant="primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Indeterminate</p>
                        <CodeplexProgress indeterminate variant="gradient" />
                    </div>
                </div>
            </CodeplexCard>

            <CodeplexCard className="border border-blue-100 dark:border-blue-900/30">
                <div className="p-4 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Simulación Interactiva</h2>
                            <p className="text-sm text-gray-500 mt-1">Prueba la animación al cambiar valores.</p>
                        </div>
                        <div className="flex gap-2">
                            <CodeplexButton size="sm" variant="secondary" onClick={() => { setProgressValue(0); setIsSimulating(false); }}>Reset</CodeplexButton>
                            <CodeplexButton
                                size="sm"
                                onClick={() => setIsSimulating(true)}
                                disabled={isSimulating || progressValue >= 100}
                            >
                                {isSimulating ? 'Simulando...' : 'Iniciar Carga'}
                            </CodeplexButton>
                        </div>
                    </div>

                    <CodeplexProgress
                        value={progressValue}
                        label={progressValue === 100 ? "Proceso completado" : "Procesando archivos..."}
                        showPercentage
                        size="lg"
                        variant={progressValue === 100 ? 'success' : 'gradient'}
                        animated={isSimulating}
                    />
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexProgress } from '@codeplex-qwik/ui';

<CodeplexProgress value={50} />`}</code>
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
                        <code>{`import { CodeplexProgress } from '@codeplex-qwik/ui';

// Barra de progreso animada con gradiente y etiqueta interna
<CodeplexProgress
  value={75}
  variant="gradient"
  size="lg"
  animated
  striped
  showPercentage
  label="Procesando..."
  labelInside
/>

// Estado indeterminado (Skeleton loading)
<CodeplexProgress indeterminate variant="neutral" />`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
