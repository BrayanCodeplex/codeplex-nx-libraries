import { CodeplexCabecera, CodeplexCaja } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';

export const HeaderPage = () => {
    const handleSearch = (query: string) => {
        console.log('Buscando:', query);
    };

    const handleNotifications = () => {
        console.log('Click en notificaciones');
    };

    const handleProfile = () => {
        console.log('Click en perfil');
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cabecera (Header)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente de cabecera completo con búsqueda, notificaciones, perfil y migas de pan.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Cabecera Completa">
                <CodeplexCaja sx={{ height: 100, position: 'relative', border: '1px solid #eee', overflow: 'hidden' }}>
                    <CodeplexCabecera
                        titulo="Mi Aplicación"
                        usuario={{
                            nombre: 'Juan Pérez',
                            rol: 'Administrador',
                            avatar: 'https://i.pravatar.cc/150?u=codeplex'
                        }}
                        migasPan={[
                            { etiqueta: 'Inicio', href: '#' },
                            { etiqueta: 'Configuración', href: '#' },
                            { etiqueta: 'Perfil', activo: true }
                        ]}
                        mostrarBusqueda
                        alBuscar={handleSearch}
                        conteoNotificaciones={3}
                        alNotificaciones={handleNotifications}
                        alPerfil={handleProfile}
                        style={{ position: 'absolute' }} // Para el demo
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Solo Título y Usuario">
                <CodeplexCaja sx={{ height: 80, position: 'relative', border: '1px solid #eee', overflow: 'hidden' }}>
                    <CodeplexCabecera
                        titulo="Dashboard Simple"
                        usuario={{
                            nombre: 'Maria Gomez'
                        }}
                        mostrarBusqueda={false}
                        style={{ position: 'absolute' }}
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexCabecera
  titulo="Mi App"
  migasPan={[{ etiqueta: 'Inicio' }]}
  usuario={{ nombre: 'Juan' }}
  mostrarBusqueda
  conteoNotificaciones={5}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
