import { useState } from 'react';
import { CodeplexCollapse, CodeplexFade, CodeplexGrow, CodeplexSlide, CodeplexZoom } from '@codeplex-qwik/utils';
import { CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { CodeplexBox, CodeplexGrid } from '@codeplex-qwik/layout';
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transitions</h1>
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

            <CodeplexGrid container spacing={2}>
                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexCard header="Collapse">
                        <CodeplexBox sx={{ minHeight: 120 }}>
                            <CodeplexCollapse in={checked}>
                                <BoxItem color="#4caf50" text="Collapse" />
                                <p className="p-2">Texto colapsable...</p>
                            </CodeplexCollapse>
                        </CodeplexBox>
                    </CodeplexCard>
                </CodeplexGrid>

                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexCard header="Fade">
                        <CodeplexBox sx={{ minHeight: 120 }}>
                            <CodeplexFade in={checked}>
                                <div><BoxItem color="#f44336" text="Fade" /></div>
                            </CodeplexFade>
                        </CodeplexBox>
                    </CodeplexCard>
                </CodeplexGrid>

                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexCard header="Zoom">
                        <CodeplexBox sx={{ minHeight: 120 }}>
                            <CodeplexZoom in={checked}>
                                <div><BoxItem color="#ff9800" text="Zoom" /></div>
                            </CodeplexZoom>
                        </CodeplexBox>
                    </CodeplexCard>
                </CodeplexGrid>

                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexCard header="Grow">
                        <CodeplexBox sx={{ minHeight: 120 }}>
                            <CodeplexGrow in={checked}>
                                <div><BoxItem color="#9c27b0" text="Grow" /></div>
                            </CodeplexGrow>
                        </CodeplexBox>
                    </CodeplexCard>
                </CodeplexGrid>
            </CodeplexGrid>
        </div>
    );
};
