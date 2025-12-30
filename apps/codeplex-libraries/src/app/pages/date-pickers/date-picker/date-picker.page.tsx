import { useState } from 'react';
import { CodeplexDatePicker } from '@codeplex-qwik/date-pickers';
import { CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexStack, CodeplexBox } from '@codeplex-qwik/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DatePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Date Picker</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector de fechas vitaminado. Usa <code>Dayjs</code> y soporte español por defecto (vía Provider).
                </p>
            </div>

            <CodeplexCard header="Variantes de DatePicker">
                <CodeplexStack spacing={3} p={4}>
                    <CodeplexDatePicker
                        label="Fecha Básica"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexDatePicker
                        label="Con Helper Text"
                        helperText="Selecciona una fecha válida"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexDatePicker
                        label="Con Error"
                        error
                        helperText="Campo requerido"
                        value={null}
                    />
                </CodeplexStack>
            </CodeplexCard>

            <CodeplexCard header="Fecha Seleccionada">
                <CodeplexBox sx={{ p: 4 }}>
                    <p>Valor (ISO): {value?.toISOString() ?? 'null'}</p>
                    <p>Formato Local: {value?.format('DD/MM/YYYY') ?? 'null'}</p>
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexDatePicker
  label="Fecha de Inicio"
  value={value}
  onChange={newValue => setValue(newValue)}
  helperText="Requerido"
  fullWidth // Default true
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
