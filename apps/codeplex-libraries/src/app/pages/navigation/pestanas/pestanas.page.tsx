import { useState } from 'react';
import { CodeplexPestanas, CodeplexElementoPestana } from '@codeplex-sac/navigation';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';
import { Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

interface PanelPestanaProps {
    children?: React.ReactNode;
    index: number;
    valor: number;
}

function PanelPestanaPersonalizado(props: PanelPestanaProps) {
    const { children, valor, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={valor !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {valor === index && (
                <CodeplexCaja sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </CodeplexCaja>
            )}
        </div>
    );
}

export const TabsPage = () => {
    const [valor, setValor] = useState(0);

    const alCambiar = (event: React.SyntheticEvent, nuevoValor: number) => {
        setValor(nuevoValor);
    };

    const elementos: CodeplexElementoPestana[] = [
        { etiqueta: 'Elemento Uno', valor: 0 },
        { etiqueta: 'Elemento Dos', valor: 1 },
        { etiqueta: 'Elemento Tres', valor: 2 },
    ];

    const elementosIconos: CodeplexElementoPestana[] = [
        { etiqueta: 'Recientes', valor: 0, icono: <PhoneIcon /> },
        { etiqueta: 'Favoritos', valor: 1, icono: <FavoriteIcon /> },
        { etiqueta: 'Cercanos', valor: 2, icono: <PersonPinIcon /> },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pestañas (Tabs)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Pestañas de navegación. Vitaminado con arreglo <code>elementos</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Pestañas Básicas">
                <CodeplexCaja sx={{ width: '100%' }}>
                    <CodeplexCaja sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CodeplexPestanas valor={valor} alCambiar={alCambiar} elementos={elementos} />
                    </CodeplexCaja>
                    <PanelPestanaPersonalizado valor={valor} index={0}>
                        Contenido del Elemento Uno
                    </PanelPestanaPersonalizado>
                    <PanelPestanaPersonalizado valor={valor} index={1}>
                        Contenido del Elemento Dos
                    </PanelPestanaPersonalizado>
                    <PanelPestanaPersonalizado valor={valor} index={2}>
                        Contenido del Elemento Tres
                    </PanelPestanaPersonalizado>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Pestañas con Iconos y Centradas">
                <CodeplexCaja sx={{ width: '100%' }}>
                    <CodeplexPestanas
                        valor={valor}
                        alCambiar={alCambiar}
                        centrado
                        elementos={elementosIconos}
                        textColor="secondary"
                        indicatorColor="secondary"
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexPestanas
  valor={valor}
  alCambiar={handleChange}
  elementos={[
    { etiqueta: 'Recientes', icono: <PhoneIcon />, valor: 0 },
    { etiqueta: 'Favoritos', icono: <FavoriteIcon />, valor: 1 }
  ]}
  centrado // Vitamin: centra las pestañas
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
