import { useState } from 'react';
import { CodeplexPasos, CodeplexPaso } from '@codeplex-sac/navigation';
import { CodeplexBoton, CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja, CodeplexPila } from '@codeplex-sac/layout';

export const StepperPage = () => {
    const [pasoActivo, setPasoActivo] = useState(0);

    const pasos: CodeplexPaso[] = [
        { etiqueta: 'Seleccionar campaña' },
        { etiqueta: 'Crear grupo de anuncios' },
        { etiqueta: 'Crear anuncio' },
    ];

    const alSiguiente = () => setPasoActivo((prev) => Math.min(prev + 1, pasos.length));
    const alAnterior = () => setPasoActivo((prev) => Math.max(prev - 1, 0));
    const alReiniciar = () => setPasoActivo(0);

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pasos (Stepper)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Indicador de progreso secuencial. Vitaminado con arreglo <code>pasos</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Pasos Horizontal Básico">
                <CodeplexCaja sx={{ p: 4, width: '100%' }}>
                    <CodeplexPasos pasoActivo={pasoActivo} pasos={pasos} />

                    <CodeplexCaja sx={{ mt: 4, mb: 1, display: 'flex', flexDirection: 'row', width: '100%' }}>
                        {pasoActivo === pasos.length ? (
                            <CodeplexPila direccion="row" espaciado={2} centrado sx={{ pt: 2, width: '100%' }}>
                                <p>Todos los pasos completados - has terminado</p>
                                <CodeplexBoton alHacerClick={alReiniciar}>Reiniciar</CodeplexBoton>
                            </CodeplexPila>
                        ) : (
                            <CodeplexCaja sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%', justifyContent: 'space-between' }}>
                                <CodeplexBoton
                                    disabled={pasoActivo === 0}
                                    alHacerClick={alAnterior}
                                    variante="secondary"
                                >
                                    Atrás
                                </CodeplexBoton>
                                <CodeplexBoton alHacerClick={alSiguiente} variante="primary">
                                    {pasoActivo === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </CodeplexBoton>
                            </CodeplexCaja>
                        )}
                    </CodeplexCaja>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Pasos Alternativo (Etiquetas abajo)">
                <CodeplexCaja sx={{ p: 4 }}>
                    <CodeplexPasos
                        pasoActivo={pasoActivo}
                        pasos={pasos}
                        etiquetaAlternativa
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>
        </div>
    );
};
