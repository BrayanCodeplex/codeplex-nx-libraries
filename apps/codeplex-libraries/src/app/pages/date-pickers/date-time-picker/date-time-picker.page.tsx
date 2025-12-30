import { useState } from 'react';
import { CodeplexDateTimePicker } from '@codeplex-qwik/date-pickers';
import { CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexStack, CodeplexBox } from '@codeplex-qwik/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DateTimePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Date Time Picker</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector combinado de fecha y hora.
                </p>
            </div>

            <CodeplexCard header="Demo DateTimePicker">
                <CodeplexStack spacing={3} p={4}>
                    <CodeplexDateTimePicker
                        label="Agenda tu cita"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                        helperText="Selecciona día y hora"
                    />
                </CodeplexStack>
            </CodeplexCard>

            <CodeplexCard header="Valor">
                <CodeplexBox sx={{ p: 4 }}>
                    <p>{value ? value.format('DD/MM/YYYY HH:mm:ss') : 'Vacío'}</p>
                </CodeplexBox>
            </CodeplexCard>
        </div>
    );
};
