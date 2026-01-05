import { CodeplexBoton, CodeplexAlerta, CodeplexEncabezadoPrincipal, CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCuadricula } from '@codeplex-sac/layout';
import { Link, useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Hero Section */}
            <CodeplexEncabezadoPrincipal
                titulo="Bienvenido a Codeplex Libraries"
                subtitulo="Librería de componentes React optimizada para alto rendimiento, con soporte nativo para modo oscuro y arquitectura escalable."
                etiquetaPrimaria="Ver Componentes"
                alClickPrimario={() => navigate('/ui/button')}
                etiquetaSecundaria="GitHub"
                alClickSecundario={() => window.open('https://github.com/codeplex-libraries', '_blank')}
                alineacion="center"
                antetitulo="v1.0.0"
                className="mb-8"
            />

            <CodeplexAlerta
                variante="info"
                titulo="Arquitectura Profesional"
                descripcion="Esta demo utiliza React Router v6, Tailwind CSS v4, MUI v5 y una estructura modular escalable."
                className="mb-8"
            />

            <CodeplexCuadricula contenedor espaciado={4}>
                <CodeplexCuadricula elemento xs={12} md={4}>
                    <CodeplexTarjeta
                        variante="soft"
                        cabecera={<div className="text-4xl">🧩</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">UI Kit</h3>
                        <p className="text-gray-600 dark:text-gray-400">Colección completa de componentes atómicos listos para usar.</p>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>

                <CodeplexCuadricula elemento xs={12} md={4}>
                    <CodeplexTarjeta
                        variante="soft"
                        cabecera={<div className="text-4xl">🏗️</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Layout</h3>
                        <p className="text-gray-600 dark:text-gray-400">Sistema de rejilla, sidebars y headers responsivos.</p>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>

                <CodeplexCuadricula elemento xs={12} md={4}>
                    <CodeplexTarjeta
                        variante="soft"
                        cabecera={<div className="text-4xl">🎨</div>}
                        className="h-full"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Theming</h3>
                        <p className="text-gray-600 dark:text-gray-400">Soporte nativo para modo oscuro y personalización avanzada.</p>
                    </CodeplexTarjeta>
                </CodeplexCuadricula>
            </CodeplexCuadricula>
        </div>

    );
};
