import { useState } from 'react';
import { CodeplexNavegacionInferior, CodeplexElementoNavegacionInferior } from '@codeplex-sac/navigation';
import { CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';

export const BottomNavigationPage = () => {
    const [value, setValue] = useState(0);
    const [fixedValue, setFixedValue] = useState(0);
    const [showFixed, setShowFixed] = useState(false);

    const elementos: CodeplexElementoNavegacionInferior[] = [
        { etiqueta: 'Recientes', icono: <RestoreIcon />, valor: 0 },
        { etiqueta: 'Favoritos', icono: <FavoriteIcon />, valor: 1 },
        { etiqueta: 'Cercanos', icono: <LocationOnIcon />, valor: 2 },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Navegación Inferior (Bottom Navigation)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Navegación inferior para aplicaciones móviles. Soporta modo fijo y auto-elevación (Papel).
                </p>
            </div>

            <CodeplexTarjeta cabecera="Navegación Inferior Estándar">
                <CodeplexCaja sx={{ width: 500, maxWidth: '100%', mx: 'auto', mt: 2 }}>
                    <CodeplexNavegacionInferior
                        valor={value}
                        alCambiar={(event, newValue) => setValue(newValue)}
                        elementos={elementos}
                        conPapel
                    />
                    <div className="p-4 text-center text-gray-500">
                        Índice Seleccionado: {value}
                    </div>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Demo Barra Fija">
                <CodeplexCaja sx={{ p: 4, textAlign: 'center' }}>
                    <p className="mb-4">Haz clic abajo para mostrar una barra de navegación fija en la parte inferior de la pantalla.</p>
                    <CodeplexBoton variante="primary" alHacerClick={() => setShowFixed(!showFixed)}>
                        {showFixed ? 'Ocultar Barra Fija' : 'Mostrar Barra Fija'}
                    </CodeplexBoton>
                </CodeplexCaja>
            </CodeplexTarjeta>

            {showFixed && (
                <CodeplexNavegacionInferior
                    fijo
                    valor={fixedValue}
                    alCambiar={(event, newValue) => setFixedValue(newValue)}
                    elementos={[
                        ...elementos,
                        { etiqueta: 'Carpeta', icono: <FolderIcon />, valor: 3 }
                    ]}
                />
            )}

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexNavegacionInferior
  valor={value}
  alCambiar={handleChange}
  elementos={[
    { etiqueta: 'Recientes', icono: <RestoreIcon />, valor: 0 },
    { etiqueta: 'Favoritos', icono: <FavoriteIcon />, valor: 1 }
  ]}
  fijo // Opcional: fija al bottom
  conPapel // Opcional: envuelve en Paper
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
