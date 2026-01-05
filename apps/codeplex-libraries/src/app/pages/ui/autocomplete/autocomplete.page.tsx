import { useState } from 'react';
import { CodeplexAutocompletado, CodeplexTarjeta } from '@codeplex-sac/ui';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { label: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    { label: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    { label: 'Star Wars: Episode IV - A New Hope', year: 1977 },
];

export const AutocompletePage = () => {
    const [value, setValue] = useState(top100Films[0]);
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Autocompletado</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Un campo de texto mejorado con sugerencias seleccionables. Wrapper de MUI Autocomplete.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Combo Box</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocompletado
                        disablePortal
                        id="combo-box-demo"
                        opciones={top100Films}
                        sx={{ width: 300 }}
                        etiqueta="Película"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlado</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexAutocompletado
                        id="controlled-demo"
                        opciones={top100Films}
                        sx={{ width: 300 }}
                        etiqueta="Controlado"
                        value={value}
                        onChange={(event: React.SyntheticEvent, newValue: any) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
                            setInputValue(newInputValue);
                        }}
                    />
                    <div className="text-sm text-gray-500">
                        <div>{`valor: ${value !== null ? `'${value.label}'` : 'nulo'}`}</div>
                        <div>{`valorEntrada: '${inputValue}'`}</div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Múltiples Valores</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocompletado
                        multiple
                        id="tags-standard"
                        opciones={top100Films}
                        getOptionLabel={(option: { label: string; year: number }) => option.label}
                        defaultValue={[top100Films[13]]}
                        etiqueta="Favoritos"
                        marcador="Favoritos"
                        sx={{ width: '100%' }}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Entrada Libre (Free Solo)</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocompletado
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        opciones={top100Films.map((option) => option.label)}
                        etiqueta="Entrada de búsqueda"
                        sx={{ width: 300 }}
                    />
                </div>
            </section>

            {/* Código de ejemplo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexAutocomplete } from '@codeplex-sac/ui';

// Basic
<CodeplexAutocompletado
  opciones={top100Films}
  etiqueta="Movie"
/>

// Multiple
<CodeplexAutocompletado
  multiple
  opciones={top100Films}
  etiqueta="Favorites"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
