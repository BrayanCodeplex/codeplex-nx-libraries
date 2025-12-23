import { CodeplexCard, CodeplexBadge } from '@codeplex/ui';

export const CardPage = () => {
    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexCard</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Contenedor versátil para agrupar contenido: soporta variantes visuales, distintos niveles de padding y slots para media, header, contenido y footer.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Variantes Visuales</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <CodeplexCard
                        header={
                            <div className="mb-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Default</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Fondo sólido + borde sutil</p>
                            </div>
                        }
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Ideal para tarjetas de contenido general, paneles de configuración y formularios embebidos.
                        </p>
                    </CodeplexCard>

                    <CodeplexCard
                        variant="outline"
                        header={
                            <div className="mb-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Outline</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Enfatiza el borde, mantiene fondo neutro</p>
                            </div>
                        }
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Útil cuando el fondo de la página ya tiene color o patrones marcados.
                        </p>
                    </CodeplexCard>

                    <CodeplexCard
                        variant="soft"
                        header={
                            <div className="mb-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Soft</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Fondo sutil con borde ligero</p>
                            </div>
                        }
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Perfecta para resaltar secciones sin un contraste excesivo.
                        </p>
                    </CodeplexCard>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Control de Padding</h2>
                <div className="grid gap-6 md:grid-cols-4">
                    <CodeplexCard padding="none">
                        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 m-2">
                            <p className="text-xs text-gray-600 dark:text-gray-300"><span className="font-semibold">none</span></p>
                        </div>
                    </CodeplexCard>
                    <CodeplexCard padding="sm">
                        <p className="text-xs text-gray-600 dark:text-gray-300"><span className="font-semibold">sm:</span> compactas</p>
                    </CodeplexCard>
                    <CodeplexCard padding="md">
                        <p className="text-xs text-gray-600 dark:text-gray-300"><span className="font-semibold">md:</span> default</p>
                    </CodeplexCard>
                    <CodeplexCard padding="lg">
                        <p className="text-xs text-gray-600 dark:text-gray-300"><span className="font-semibold">lg:</span> amplio</p>
                    </CodeplexCard>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Media, Header y Footer</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <CodeplexCard
                        variant="soft"
                        hoverable
                        media={
                            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium rounded-t-xl">
                                Banner / Media Slot
                            </div>
                        }
                        header={
                            <div className="mb-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Card con Media</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Resúmenes de producto</p>
                            </div>
                        }
                        footer={
                            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>Actualizado hace 5 min</span>
                                <button className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300">Ver detalles →</button>
                            </div>
                        }
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            El slot media se coloca arriba, ideal para imágenes o gráficos.
                        </p>
                    </CodeplexCard>

                    <CodeplexCard
                        variant="outline"
                        padding="sm"
                        header={
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Métricas</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Contenido denso</p>
                                </div>
                                <CodeplexBadge label="+18%" variant="success" size="sm" pill />
                            </div>
                        }
                    >
                        <dl className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400">Usuarios</dt>
                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">1,294</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400">Rebote</dt>
                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">27%</dd>
                            </div>
                        </dl>
                    </CodeplexCard>
                </div>
            </section>
        </div>
    );
};
