import { useState } from 'react';
import { CodeplexSelectorHora } from '@codeplex-sac/date-pickers';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexPila } from '@codeplex-sac/layout';
import dayjs, { Dayjs } from 'dayjs';

export const TimePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selector de Hora (TimePicker)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector de hora vitaminado.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Variantes de Selector de Hora">
                <CodeplexPila espaciado={3} p={4}>
                    <CodeplexSelectorHora
                        etiqueta="Hora Básica"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexSelectorHora
                        etiqueta="AM/PM View"
                        ampm
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexSelectorHora
                        etiqueta="Deshabilitado"
                        disabled
                        value={value}
                    />
                </CodeplexPila>
            </CodeplexTarjeta>
        </div>
    );
};
