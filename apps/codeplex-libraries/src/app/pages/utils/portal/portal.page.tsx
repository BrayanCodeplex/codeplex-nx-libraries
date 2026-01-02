import { useState } from 'react';
import { CodeplexPortal } from '@codeplex-sac/utils';
import { CodeplexButton, CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';

export const PortalPage = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portal</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Renderiza contenido fuera de la jerarquía DOM actual. Vitaminado con <code>containerId</code>.
                </p>
            </div>

            <CodeplexCard header="Demo Portal">
                <CodeplexBox flexCol sx={{ p: 4, gap: 4 }}>
                    <CodeplexButton onClick={() => setShow(!show)}>
                        {show ? 'Desmontar' : 'Montar en Círculo Azul'}
                    </CodeplexButton>

                    {/* Este div está aquí, pero el contenido se renderizará en el 'target-container' */}
                    {show && (
                        <CodeplexPortal containerId="target-container">
                            <span className="text-white font-bold animate-bounce">¡Estoy teletransportado aquí!</span>
                        </CodeplexPortal>
                    )}

                    <div className="mt-4 border p-4 bg-gray-50 rounded">
                        <p className="mb-2 text-sm text-gray-500">Este es el contenedor destino (ID: target-container):</p>
                        <div
                            id="target-container"
                            className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center p-4 text-center border-4 border-blue-200"
                        >
                            {/* Portal content will appear here */}
                        </div>
                    </div>
                </CodeplexBox>
            </CodeplexCard>
        </div>
    );
};
