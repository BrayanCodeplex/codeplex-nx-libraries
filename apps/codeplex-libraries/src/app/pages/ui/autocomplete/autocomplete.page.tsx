import { useState } from 'react';
import { CodeplexAutocomplete, CodeplexButton } from '@codeplex-sac/ui';

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Autocomplete</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Un campo de texto mejorado con sugerencias seleccionables. Wrapper de MUI Autocomplete.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Combo Box</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 300 }}
                        label="Movie"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Controlled</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
                    <CodeplexAutocomplete
                        id="controlled-demo"
                        options={top100Films}
                        sx={{ width: 300 }}
                        label="Controlled"
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
                        <div>{`value: ${value !== null ? `'${value.label}'` : 'null'}`}</div>
                        <div>{`inputValue: '${inputValue}'`}</div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Multiple Values</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocomplete
                        multiple
                        id="tags-standard"
                        options={top100Films}
                        getOptionLabel={(option: { label: string; year: number }) => option.label}
                        defaultValue={[top100Films[13]]}
                        label="Favorites"
                        placeholder="Favorites"
                        sx={{ width: '100%' }}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Free Solo</h2>
                <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexAutocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option.label)}
                        label="Search input"
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
<CodeplexAutocomplete
  options={top100Films}
  label="Movie"
/>

// Multiple
<CodeplexAutocomplete
  multiple
  options={top100Films}
  label="Favorites"
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
