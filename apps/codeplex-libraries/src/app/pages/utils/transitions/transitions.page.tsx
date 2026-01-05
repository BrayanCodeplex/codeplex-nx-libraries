import { useState } from 'react';
import { CodeplexColapso, CodeplexDesvanecimiento, CodeplexCrecimiento, CodeplexDeslizamiento, CodeplexZoom } from '@codeplex-sac/utils';
import { CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { CodeplexCaja, CodeplexCuadricula } from '@codeplex-sac/layout';
import { Paper, FormControlLabel, Switch } from '@mui/material';

const BoxItem = ({ color = '#007FFF', text = 'Box' }) => (
    <Paper sx={{ m: 1, width: 100, height: 100, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
        {text}
    </Paper>
);

export const TransitionsPage = () => {
    const [checked, setChecked] = useState(true);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transiciones (Transitions)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Animaciones suaves pre-configuradas. Controla la visibilidad con <code>in</code>.
                </p>
                <div className="mt-4">
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
                        label="Animar (in={checked})"
                    />
                </div>
            </div>

            <CodeplexCuadricula contenedor espaciado={2}>
                <CodeplexCuadricula elemento xs={12} md={6}>
                    <CodeplexTarjeta cabecera="Colapso (Collapse)">
                        <CodeplexCaja sx={{ minHeight: 120 }}>
                            <CodeplexColapso in={checked}>
                                <BoxItem color="#4caf50" text="Collapse" />
                                <p className="p-2">Texto colapsable...</p>
                            </CodeplexColapso>
                        </CodeplexCaja>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>

                <CodeplexCuadricula elemento xs={12} md={6}>
                    <CodeplexTarjeta cabecera="Desvanecimiento (Fade)">
                        <CodeplexCaja sx={{ minHeight: 120 }}>
                            <CodeplexDesvanecimiento in={checked}>
                                <div><BoxItem color="#f44336" text="Fade" /></div>
                            </CodeplexDesvanecimiento>
                        </CodeplexCaja>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>

                <CodeplexCuadricula elemento xs={12} md={6}>
                    <CodeplexTarjeta cabecera="Zoom">
                        <CodeplexCaja sx={{ minHeight: 120 }}>
                            <CodeplexZoom in={checked}>
                                <div><BoxItem color="#ff9800" text="Zoom" /></div>
                            </CodeplexZoom>
                        </CodeplexCaja>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>

                <CodeplexCuadricula elemento xs={12} md={6}>
                    <CodeplexTarjeta cabecera="Crecimiento (Grow)">
                        <CodeplexCaja sx={{ minHeight: 120 }}>
                            <CodeplexCrecimiento in={checked}>
                                <div><BoxItem color="#9c27b0" text="Grow" /></div>
                            </CodeplexCrecimiento>
                        </CodeplexCaja>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>
            </CodeplexCuadricula>
        </div>
    );
};
