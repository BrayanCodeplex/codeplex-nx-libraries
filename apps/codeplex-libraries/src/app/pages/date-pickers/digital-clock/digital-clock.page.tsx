import { useState } from 'react';
import { CodeplexDigitalClock } from '@codeplex-qwik/date-pickers';
import { CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexStack, CodeplexBox } from '@codeplex-qwik/layout';
import dayjs, { Dayjs } from 'dayjs';

export const DigitalClockPage = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Digital Clock</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Reloj digital para selección rápida de hora. Vitaminado con <code>withPaper</code>.
                </p>
            </div>

            <CodeplexCard header="Digital Clock">
                <CodeplexStack spacing={3} p={4} direction="row" centered>
                    <CodeplexBox centered>
                        <h3 className="mb-2 font-bold text-gray-500">Default (con Paper)</h3>
                        <CodeplexDigitalClock
                            value={value}
                            onChange={(newValue: Dayjs | null) => setValue(newValue)}
                        />
                    </CodeplexBox>

                    <CodeplexBox centered>
                        <h3 className="mb-2 font-bold text-gray-500">Sin Paper (&amp; timeStep 30)</h3>
                        <CodeplexDigitalClock
                            withPaper={false}
                            timeStep={30}
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            sx={{ border: '1px solid #ccc' }}
                        />
                    </CodeplexBox>
                </CodeplexStack>
            </CodeplexCard>

            <CodeplexCard header="Valor Seleccionado">
                <CodeplexBox sx={{ p: 4, textAlign: 'center' }}>
                    <p className="text-2xl font-mono">{value ? value.format('HH:mm') : '--:--'}</p>
                </CodeplexBox>
            </CodeplexCard>
        </div>
    );
};
