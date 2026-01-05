import { useState } from 'react';
import { CodeplexRelojDigital } from '@codeplex-sac/date-pickers';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexPila, CodeplexCaja } from '@codeplex-sac/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DigitalClockPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reloj Digital (DigitalClock)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Reloj digital para selección rápida de hora. Vitaminado con <code>conPapel</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Reloj Digital">
                <CodeplexPila espaciado={3} p={4} direccion="row" centrado>
                    <CodeplexCaja centrado>
                        <h3 className="mb-2 font-bold text-gray-500">Por defecto (con Papel)</h3>
                        <CodeplexRelojDigital
                            value={value}
                            onChange={(newValue: Dayjs | null) => setValue(newValue)}
                        />
                    </CodeplexCaja>

                    <CodeplexCaja centrado>
                        <h3 className="mb-2 font-bold text-gray-500">Sin Papel (&amp; salto 30)</h3>
                        <CodeplexRelojDigital
                            conPapel={false}
                            timeStep={30}
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            sx={{ border: '1px solid #ccc' }}
                        />
                    </CodeplexCaja>
                </CodeplexPila>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Valor Seleccionado">
                <CodeplexCaja sx={{ p: 4, textAlign: 'center' }}>
                    <p className="text-2xl font-mono">{value ? value.format('HH:mm') : '--:--'}</p>
                </CodeplexCaja>
            </CodeplexTarjeta>
        </div>
    );
};
