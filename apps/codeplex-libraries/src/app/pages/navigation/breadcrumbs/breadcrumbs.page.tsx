import { CodeplexBreadcrumbs } from '@codeplex-qwik/navigation';
import { CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexBox } from '@codeplex-qwik/layout';
import GrainIcon from '@mui/icons-material/Grain';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const BreadcrumbsPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Breadcrumbs</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Migas de pan para navegación jerárquica. Vitaminado con <code>homeHref</code> y configuración por array.
                </p>
            </div>

            <CodeplexCard header="Básico con Home Automático">
                <CodeplexBox sx={{ p: 2 }}>
                    <CodeplexBreadcrumbs
                        homeHref="/"
                        items={[
                            { label: 'Core', href: '/core' },
                            { label: 'Catalog', href: '/catalog' },
                            { label: 'Accessories' } // Último item es texto plano (activo)
                        ]}
                    />
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Con Iconos Personalizados">
                <CodeplexBox sx={{ p: 2 }}>
                    <CodeplexBreadcrumbs
                        items={[
                            { label: 'Dashboard', href: '/', icon: <WhatshotIcon fontSize="small" /> },
                            { label: 'Analytics', href: '/analytics', icon: <GrainIcon fontSize="small" /> },
                            { label: 'Reports' }
                        ]}
                    />
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Separador Personalizado">
                <CodeplexBox sx={{ p: 2 }}>
                    <CodeplexBreadcrumbs
                        separator="-"
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Settings', href: '/settings' },
                            { label: 'Profile' }
                        ]}
                    />
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexBreadcrumbs
  homeHref="/"
  items={[
    { label: 'Core', href: '/core' },
    { label: 'Page' } // Último item activo
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
