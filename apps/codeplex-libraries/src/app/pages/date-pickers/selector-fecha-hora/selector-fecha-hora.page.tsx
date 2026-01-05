import { useState } from 'react';
import { CodeplexSelectorFechaHora } from '@codeplex-sac/date-pickers';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexPila, CodeplexCaja } from '@codeplex-sac/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DateTimePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selector de Fecha y Hora (DateTimePicker)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector combinado de fecha y hora.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Demo Selector de Fecha y Hora">
                <CodeplexPila espaciado={3} p={4}>
                    <CodeplexSelectorFechaHora
                        etiqueta="Agenda tu cita"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                        textoAyuda="Selecciona día y hora"
                    />
                </CodeplexPila>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Valor">
                <CodeplexCaja sx={{ p: 4 }}>
                    <p>{value ? value.format('DD/MM/YYYY HH:mm:ss') : 'Vacío'}</p>
                </CodeplexCaja>
            </CodeplexTarjeta>
        </div>
    );
};
