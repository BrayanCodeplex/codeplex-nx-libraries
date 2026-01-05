import { useState } from 'react';
import { CodeplexSelectorFecha } from '@codeplex-sac/date-pickers';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexPila, CodeplexCaja } from '@codeplex-sac/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DatePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selector de Fecha (DatePicker)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector de fechas vitaminado. Usa <code>Dayjs</code> y soporte español por defecto (vía Provider).
                </p>
            </div>

            <CodeplexTarjeta cabecera="Variantes de Selector de Fecha">
                <CodeplexPila espaciado={3} p={4}>
                    <CodeplexSelectorFecha
                        etiqueta="Fecha Básica"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexSelectorFecha
                        etiqueta="Con Helper Text"
                        textoAyuda="Selecciona una fecha válida"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexSelectorFecha
                        etiqueta="Con Error"
                        error
                        textoAyuda="Campo requerido"
                        value={null}
                    />
                </CodeplexPila>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Fecha Seleccionada">
                <CodeplexCaja sx={{ p: 4 }}>
                    <p>Valor (ISO): {value?.toISOString() ?? 'null'}</p>
                    <p>Formato Local: {value?.format('DD/MM/YYYY') ?? 'null'}</p>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexSelectorFecha
  etiqueta="Fecha de Inicio"
  value={value}
  onChange={newValue => setValue(newValue)}
  textoAyuda="Requerido"
  anchoCompleto // Default true
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
