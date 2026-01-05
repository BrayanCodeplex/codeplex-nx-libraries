import { CodeplexEsqueleto, CodeplexTarjeta, CodeplexBoton, CodeplexAvatar } from '@codeplex-sac/ui';

export const SkeletonPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Esqueleto (Skeleton)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Muestra una vista previa del contenido antes de que se cargue la data.
                </p>
            </div>

            {/* Variants */}
            <CodeplexTarjeta cabecera="Variantes">
                <div className="flex flex-col gap-4 p-4 max-w-sm">
                    {/* Text */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Texto</span>
                        <CodeplexEsqueleto variante="text" sx={{ fontSize: '1rem' }} />
                    </div>

                    {/* Circular */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Circular</span>
                        <CodeplexEsqueleto variante="circular" ancho={40} alto={40} />
                    </div>

                    {/* Rectangular */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Rectangular</span>
                        <CodeplexEsqueleto variante="rectangular" ancho={210} alto={60} />
                    </div>

                    {/* Rounded */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Redondeado</span>
                        <CodeplexEsqueleto variante="rounded" ancho={210} alto={60} />
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Animations */}
            <CodeplexTarjeta cabecera="Animaciones">
                <div className="flex flex-col gap-4 p-4 max-w-sm">
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Pulso (Por defecto)</span>
                        <CodeplexEsqueleto />
                    </div>
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Ola (Wave)</span>
                        <CodeplexEsqueleto animacion="wave" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Falso (Sin animación)</span>
                        <CodeplexEsqueleto animacion={false} />
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Example Usage */}
            <CodeplexTarjeta cabecera="Ejemplo de Uso">
                <div className="flex gap-4 p-4 items-center">
                    <CodeplexEsqueleto variante="circular" ancho={40} alto={40} />
                    <div className="flex-1 space-y-2">
                        <CodeplexEsqueleto variante="text" ancho="80%" />
                        <CodeplexEsqueleto variante="text" ancho="40%" />
                    </div>
                </div>
            </CodeplexTarjeta>
        </div>
    );
};
