import { useState } from 'react';
import { CodeplexDeslizador, CodeplexTarjeta } from '@codeplex-sac/ui';
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

    const marcas = [
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Deslizador (Slider)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente deslizante elegante para seleccionar valores o rangos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Deslizador Continuo</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown className="text-gray-400" />
                        <CodeplexDeslizador
                            aria-label="Volumen"
                            valor={value}
                            alCambiar={handleChange}
                        />
                        <VolumeUp className="text-gray-400" />
                    </Stack>
                    <CodeplexDeslizador disabled defaultValue={30} aria-label="Deslizador deshabilitado" etiqueta="Deshabilitado" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tamaños</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexDeslizador
                        tamano="small"
                        defaultValue={70}
                        aria-label="Pequeño"
                        mostrarEtiquetaValor="auto"
                        etiqueta="Tamaño Pequeño"
                    />
                    <CodeplexDeslizador
                        defaultValue={50}
                        aria-label="Predeterminado"
                        mostrarEtiquetaValor="auto"
                        etiqueta="Tamaño Predeterminado"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Discreto y Marcas Personalizadas</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-8">
                    <CodeplexDeslizador
                        aria-label="Temperatura"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        mostrarEtiquetaValor="auto"
                        paso={10}
                        marcas
                        minimo={10}
                        maximo={110}
                        etiqueta="Pasos (10)"
                    />
                    <CodeplexDeslizador
                        aria-label="Valores restringidos"
                        defaultValue={20}
                        mostrarEtiquetaValor="auto"
                        paso={null}
                        marcas={marcas}
                        etiqueta="Valores Restringidos (Solo Marcas)"
                    />
                    <CodeplexDeslizador
                        aria-label="Siempre visible"
                        defaultValue={80}
                        getAriaValueText={valuetext}
                        paso={10}
                        marcas={marcas}
                        mostrarEtiquetaValor="on"
                        etiqueta="Etiqueta Siempre Visible"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Deslizador de Rango</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexDeslizador
                        getAriaLabel={() => 'Rango de temperatura'}
                        valor={rangeValue}
                        alCambiar={handleRangeChange}
                        mostrarEtiquetaValor="auto"
                        getAriaValueText={valuetext}
                        marcas={marcas}
                        etiqueta="Seleccionar Rango"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colores</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexDeslizador defaultValue={30} color="secondary" etiqueta="Secundario" />
                    <CodeplexDeslizador defaultValue={50} color="success" etiqueta="Éxito" />
                    <CodeplexDeslizador defaultValue={70} color="error" etiqueta="Error" />
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
<CodeplexDeslizador valor={volume} alCambiar={handleChange} />

/* Range */
<CodeplexDeslizador 
  valor={[20, 37]} 
  mostrarEtiquetaValor="auto"
  marcas={marcas} 
/>

/* Discrete with Steps */
<CodeplexDeslizador 
  paso={10} 
  marcas 
  minimo={0} 
  maximo={100} 
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
