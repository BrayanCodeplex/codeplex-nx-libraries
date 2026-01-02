import { useState } from 'react';
import { CodeplexBottomNavigation, CodeplexBottomNavigationItem } from '@codeplex-sac/navigation';
import { CodeplexCard, CodeplexButton } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';

export const BottomNavigationPage = () => {
    const [value, setValue] = useState(0);
    const [fixedValue, setFixedValue] = useState(0);
    const [showFixed, setShowFixed] = useState(false);

    const items: CodeplexBottomNavigationItem[] = [
        { label: 'Recents', icon: <RestoreIcon />, value: 0 },
        { label: 'Favorites', icon: <FavoriteIcon />, value: 1 },
        { label: 'Nearby', icon: <LocationOnIcon />, value: 2 },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bottom Navigation</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Navegación inferior para aplicaciones móviles. Soporta modo fijo y auto-elevación (Paper).
                </p>
            </div>

            <CodeplexCard header="Standard Bottom Navigation">
                <CodeplexBox sx={{ width: 500, maxWidth: '100%', mx: 'auto', mt: 2 }}>
                    <CodeplexBottomNavigation
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                        items={items}
                        withPaper
                    />
                    <div className="p-4 text-center text-gray-500">
                        Selected Index: {value}
                    </div>
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Fixed Bottom Navigation Demo">
                <CodeplexBox sx={{ p: 4, textAlign: 'center' }}>
                    <p className="mb-4">Haz clic abajo para mostrar una barra de navegación fija en la parte inferior de la pantalla.</p>
                    <CodeplexButton variant="primary" onClick={() => setShowFixed(!showFixed)}>
                        {showFixed ? 'Ocultar Barra Fija' : 'Mostrar Barra Fija'}
                    </CodeplexButton>
                </CodeplexBox>
            </CodeplexCard>

            {showFixed && (
                <CodeplexBottomNavigation
                    fixed
                    value={fixedValue}
                    onChange={(event, newValue) => setFixedValue(newValue)}
                    items={[
                        ...items,
                        { label: 'Folder', icon: <FolderIcon />, value: 3 }
                    ]}
                />
            )}

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexBottomNavigation
  value={value}
  onChange={handleChange}
  items={[
    { label: 'Recents', icon: <RestoreIcon />, value: 0 },
    { label: 'Favorites', icon: <FavoriteIcon />, value: 1 }
  ]}
  fixed // Opcional: fija al bottom
  withPaper // Opcional: envuelve en Paper
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
