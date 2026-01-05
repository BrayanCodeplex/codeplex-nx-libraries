import { CodeplexMigasPan, CodeplexElementoMigasPan } from '@codeplex-sac/navigation';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';
import GrainIcon from '@mui/icons-material/Grain';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const BreadcrumbsPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Migas de Pan (Breadcrumbs)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Migas de pan para navegación jerárquica. Vitaminado con <code>rutaInicio</code> y configuración por array.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Básico con Inicio Automático">
                <CodeplexCaja sx={{ p: 2 }}>
                    <CodeplexMigasPan
                        rutaInicio="/"
                        elementos={[
                            { etiqueta: 'Núcleo', href: '/core' },
                            { etiqueta: 'Catálogo', href: '/catalog' },
                            { etiqueta: 'Accesorios' } // Último item es texto plano (activo)
                        ]}
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Con Iconos Personalizados">
                <CodeplexCaja sx={{ p: 2 }}>
                    <CodeplexMigasPan
                        elementos={[
                            { etiqueta: 'Tablero', href: '/', icono: <WhatshotIcon fontSize="small" /> },
                            { etiqueta: 'Analíticas', href: '/analytics', icono: <GrainIcon fontSize="small" /> },
                            { etiqueta: 'Reportes' }
                        ]}
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Separador Personalizado">
                <CodeplexCaja sx={{ p: 2 }}>
                    <CodeplexMigasPan
                        separador="-"
                        elementos={[
                            { etiqueta: 'Inicio', href: '/' },
                            { etiqueta: 'Configuración', href: '/settings' },
                            { etiqueta: 'Perfil' }
                        ]}
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexMigasPan
  rutaInicio="/"
  elementos={[
    { etiqueta: 'Núcleo', href: '/core' },
    { etiqueta: 'Página' } // Último item activo
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
