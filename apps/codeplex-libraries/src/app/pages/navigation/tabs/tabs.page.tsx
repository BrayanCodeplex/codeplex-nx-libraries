import { useState } from 'react';
import { CodeplexTabs } from '@codeplex-sac/navigation';
import { CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';
import { Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <CodeplexBox sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </CodeplexBox>
            )}
        </div>
    );
}

export const TabsPage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const items = [
        { label: 'Item One', value: 0 },
        { label: 'Item Two', value: 1 },
        { label: 'Item Three', value: 2 },
    ];

    const iconItems = [
        { label: 'Recents', value: 0, icon: <PhoneIcon /> },
        { label: 'Favorites', value: 1, icon: <FavoriteIcon /> },
        { label: 'Nearby', value: 2, icon: <PersonPinIcon /> },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tabs</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Pestañas de navegación. Vitaminado con <code>items</code> array.
                </p>
            </div>

            <CodeplexCard header="Tabs Básicos">
                <CodeplexBox sx={{ width: '100%' }}>
                    <CodeplexBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CodeplexTabs value={value} onChange={handleChange} items={items} />
                    </CodeplexBox>
                    <CustomTabPanel value={value} index={0}>
                        Item One Content
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two Content
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three Content
                    </CustomTabPanel>
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Tabs con Iconos y Centrados">
                <CodeplexBox sx={{ width: '100%' }}>
                    <CodeplexTabs
                        value={value}
                        onChange={handleChange}
                        centered
                        items={iconItems}
                        textColor="secondary"
                        indicatorColor="secondary"
                    />
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexTabs
  value={value}
  onChange={handleChange}
  items={[
    { label: 'Recents', icon: <PhoneIcon />, value: 0 },
    { label: 'Favorites', icon: <FavoriteIcon />, value: 1 }
  ]}
  centered // Vitamin: centra las pestañas
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
