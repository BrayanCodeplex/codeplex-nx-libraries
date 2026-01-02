import { useState } from 'react';
import { CodeplexSlider, CodeplexCard } from '@codeplex-sac/ui';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export const SliderPage = () => {
    const [value, setValue] = useState<number | number[]>(30);
    const [rangeValue, setRangeValue] = useState<number | number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRangeValue(newValue);
    };

    const marks = [
        { value: 0, label: '0°C' },
        { value: 20, label: '20°C' },
        { value: 37, label: '37°C' },
        { value: 100, label: '100°C' },
    ];

    function valuetext(value: number) {
        return `${value}°C`;
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Slider</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente deslizante elegante para seleccionar valores o rangos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Continuous Slider</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown className="text-gray-400" />
                        <CodeplexSlider
                            aria-label="Volume"
                            value={value}
                            onChange={handleChange}
                        />
                        <VolumeUp className="text-gray-400" />
                    </Stack>
                    <CodeplexSlider disabled defaultValue={30} aria-label="Disabled slider" label="Disabled" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSlider
                        size="small"
                        defaultValue={70}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        label="Small Size"
                    />
                    <CodeplexSlider
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        label="Default Size"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Discrete & Custom Marks</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-8">
                    <CodeplexSlider
                        aria-label="Temperature"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={110}
                        label="Steps (10)"
                    />
                    <CodeplexSlider
                        aria-label="Restricted values"
                        defaultValue={20}
                        valueLabelDisplay="auto"
                        step={null}
                        marks={marks}
                        label="Restricted Values (Custom Marks Only)"
                    />
                    <CodeplexSlider
                        aria-label="Always visible"
                        defaultValue={80}
                        getAriaValueText={valuetext}
                        step={10}
                        marks={marks}
                        valueLabelDisplay="on"
                        label="Always Visible Label"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Range Slider</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexSlider
                        getAriaLabel={() => 'Temperature range'}
                        value={rangeValue}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        marks={marks}
                        label="Select Range"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colors</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexSlider defaultValue={30} color="secondary" label="Secondary" />
                    <CodeplexSlider defaultValue={50} color="success" label="Success" />
                    <CodeplexSlider defaultValue={70} color="error" label="Error" />
                </div>
            </section>

            {/* Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexSlider } from '@codeplex-sac/ui';

/* Continuous */
<CodeplexSlider value={volume} onChange={handleChange} />

/* Range */
<CodeplexSlider 
  value={[20, 37]} 
  valueLabelDisplay="auto"
  marks={marks} 
/>

/* Discrete with Steps */
<CodeplexSlider 
  step={10} 
  marks 
  min={0} 
  max={100} 
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
