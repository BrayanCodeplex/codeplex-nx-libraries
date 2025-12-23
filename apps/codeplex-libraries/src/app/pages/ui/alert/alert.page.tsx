import { CodeplexAlert, CodeplexCard } from '@codeplex/ui';

export const AlertPage = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alert</h1>
                <p className="text-gray-600 dark:text-gray-400">Mensajes de retroalimentación contextual para el usuario.</p>
            </div>

            <CodeplexCard header="Variantes de Color">
                <div className="space-y-4 p-4">
                    <CodeplexAlert variant="info" title="Información" description="Este es un mensaje informativo estándar." />
                    <CodeplexAlert variant="success" title="Éxito" description="La operación se completó correctamente." />
                    <CodeplexAlert variant="warning" title="Advertencia" description="Tenga precaución con esta acción." />
                    <CodeplexAlert variant="danger" title="Error" description="Ha ocurrido un error inesperado." />
                </div>
            </CodeplexCard>

            <CodeplexCard header="Configuraciones">
                <div className="space-y-4 p-4">
                    <CodeplexAlert variant="info" description="Alerta sin título, solo descripción." />
                    <CodeplexAlert variant="success" title="Solo Título" />
                    {/* <CodeplexAlert variant="warning" title="Dismissible" description="Esta alerta se puede cerrar." dismissible /> */}
                </div>
            </CodeplexCard>
        </div>
    );
};
