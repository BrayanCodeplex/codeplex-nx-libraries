import { useState } from 'react';
import { CodeplexDetectorClickFuera } from '@codeplex-sac/utils';
import { CodeplexBoton, CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';

export const ClickAwayPage = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Detector de Clic Fuera (Click Away)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Detecta clics fuera del componente hijo.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Demo Click Away">
                <CodeplexCaja centrado sx={{ height: 300, bgcolor: 'action.hover' }}>
                    <CodeplexDetectorClickFuera alHacerClickFuera={() => setOpen(false)}>
                        <div className="relative">
                            <CodeplexBoton variante="primary" alHacerClick={() => setOpen(!open)}>
                                Abrir Menú Contextual
                            </CodeplexBoton>

                            {open && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 border z-10 animate-fade-in">
                                    <p className="p-2 text-sm text-gray-600 border-b mb-2">Haz clic FUERA de este cuadro para cerrarlo.</p>
                                    <ul>
                                        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Opción 1</li>
                                        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Opción 2</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CodeplexDetectorClickFuera>
                </CodeplexCaja>
            </CodeplexTarjeta>
        </div>
    );
};
