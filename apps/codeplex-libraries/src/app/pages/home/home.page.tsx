import { CodeplexButton, CodeplexAlert, CodeplexJumbotron, CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexGrid } from '@codeplex-qwik/layout';
import { Link, useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Hero Section */}
            <CodeplexJumbotron
                title="Bienvenido a Codeplex Libraries"
                subtitle="Librería de componentes React optimizada para alto rendimiento, con soporte nativo para modo oscuro y arquitectura escalable."
                primaryLabel="Ver Componentes"
                onPrimary={() => navigate('/ui/button')}
                secondaryLabel="GitHub"
                onSecondary={() => window.open('https://github.com/codeplex-libraries', '_blank')}
                align="center"
                eyebrow="v1.0.0"
                className="mb-8"
            />

            <CodeplexAlert
                variant="info"
                title="Arquitectura Profesional"
                description="Esta demo utiliza React Router v6, Tailwind CSS v4, MUI v5 y una estructura modular escalable."
                className="mb-8"
            />

            <CodeplexGrid container spacing={4}>
                <CodeplexGrid size={{ xs: 12, md: 4 }}>
                    <CodeplexCard
                        variant="soft"
                        header={<div className="text-4xl">🧩</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">UI Kit</h3>
                        <p className="text-gray-600 dark:text-gray-400">Colección completa de componentes atómicos listos para usar.</p>
                    </CodeplexCard>
                </CodeplexGrid>

                <CodeplexGrid size={{ xs: 12, md: 4 }}>
                    <CodeplexCard
                        variant="soft"
                        header={<div className="text-4xl">🏗️</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Layout</h3>
                        <p className="text-gray-600 dark:text-gray-400">Sistema de rejilla, sidebars y headers responsivos.</p>
                    </CodeplexCard>
                </CodeplexGrid>

                <CodeplexGrid size={{ xs: 12, md: 4 }}>
                    <CodeplexCard
                        variant="soft"
                        header={<div className="text-4xl">🎨</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Theming</h3>
                        <p className="text-gray-600 dark:text-gray-400">Soporte nativo para modo oscuro y personalización avanzada.</p>
                    </CodeplexCard>
                </CodeplexGrid>
            </CodeplexGrid>
        </div>

    );
};
