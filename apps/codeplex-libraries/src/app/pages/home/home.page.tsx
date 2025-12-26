import { CodeplexButton, CodeplexAlert } from '@codeplex-qwik/ui';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Bienvenido a Codeplex Libraries
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Librería de componentes React optimizada para alto rendimiento.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/ui/button">
                        <CodeplexButton variant="primary" size="lg">
                            Ver Componentes
                        </CodeplexButton>
                    </Link>
                    <a href="https://github.com/codeplex-libraries" target="_blank" rel="noreferrer">
                        <CodeplexButton variant="secondary" size="lg">
                            GitHub
                        </CodeplexButton>
                    </a>
                </div>
            </div>

            <CodeplexAlert
                variant="info"
                title="Arquitectura Profesional"
                description="Esta demo utiliza React Router v6, Tailwind CSS v4 y una estructura modular escalable."
                className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl mb-3">🧩</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">UI Kit</h3>
                    <p className="text-gray-600 dark:text-gray-400">Colección completa de componentes atómicos listos para usar.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl mb-3">🏗️</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Layout</h3>
                    <p className="text-gray-600 dark:text-gray-400">Sistema de rejilla, sidebars y headers responsivos.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl mb-3">🎨</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Theming</h3>
                    <p className="text-gray-600 dark:text-gray-400">Soporte nativo para modo oscuro y personalización avanzada.</p>
                </div>
            </div>
        </div>
    );
};
