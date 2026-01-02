import { useState } from 'react';
import { CodeplexTimePicker } from '@codeplex-sac/date-pickers';
import { CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexStack, CodeplexBox } from '@codeplex-sac/layout';
import dayjs, { Dayjs } from 'dayjs';

export const TimePickerPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Time Picker</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Selector de hora vitaminado.
                </p>
            </div>

            <CodeplexCard header="Variantes de TimePicker">
                <CodeplexStack spacing={3} p={4}>
                    <CodeplexTimePicker
                        label="Hora Básica"
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexTimePicker
                        label="AM/PM View"
                        ampm
                        value={value}
                        onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    />

                    <CodeplexTimePicker
                        label="Disabled"
                        disabled
                        value={value}
                    />
                </CodeplexStack>
            </CodeplexCard>
        </div>
    );
};
