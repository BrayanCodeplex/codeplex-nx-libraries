import React, { useState } from 'react';
import { CodeplexAlert, CodeplexButton, CodeplexCard } from '@codeplex-qwik/ui';

export const AlertPage = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alert</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Mensajes breves e importantes para el usuario, ahora con la potencia de Material UI.
                </p>
            </div>

            {/* Basic Severity */}
            <CodeplexCard header="Severidad (Variantes)">
                <div className="p-4 space-y-4">
                    <CodeplexAlert variant="info" title="Información">
                        This is an info alert — check it out!
                    </CodeplexAlert>
                    <CodeplexAlert variant="success" title="Éxito">
                        This is a success alert — check it out!
                    </CodeplexAlert>
                    <CodeplexAlert variant="warning" title="Advertencia">
                        This is a warning alert — check it out!
                    </CodeplexAlert>
                    <CodeplexAlert variant="danger" title="Error">
                        This is an error/danger alert — check it out!
                    </CodeplexAlert>
                </div>
            </CodeplexCard>

            {/* Styles: Filled & Outlined */}
            <CodeplexCard header="Estilos Visuales (Design)">
                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Filled</h3>
                        <div className="space-y-2">
                            <CodeplexAlert design="filled" variant="success" title="Filled Success" />
                            <CodeplexAlert design="filled" variant="danger" title="Filled Error" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Outlined</h3>
                        <div className="space-y-2">
                            <CodeplexAlert design="outlined" variant="info" title="Outlined Info" />
                            <CodeplexAlert design="outlined" variant="warning" title="Outlined Warning" />
                        </div>
                    </div>
                </div>
            </CodeplexCard>

            {/* Actions */}
            <CodeplexCard header="Acciones Personalizadas">
                <div className="p-4 space-y-4">
                    <CodeplexAlert
                        variant="warning"
                        onClose={() => alert('Closed!')}
                        title="Alert with close action"
                    >
                        Click the X to close me (triggers callback).
                    </CodeplexAlert>

                    <CodeplexAlert
                        variant="success"
                        action={
                            <CodeplexButton color="inherit" size="sm" variant="ghost">
                                UNDO
                            </CodeplexButton>
                        }
                    >
                        This alert has a custom action button.
                    </CodeplexAlert>
                </div>
            </CodeplexCard>

            {/* Dismissible Interaction */}
            <CodeplexCard header="Interacción: Dismissible">
                <div className="p-4">
                    <CodeplexButton
                        variant="primary"
                        disabled={open}
                        onClick={() => setOpen(true)}
                        className="mb-4"
                    >
                        Re-open Alert
                    </CodeplexButton>

                    <CodeplexAlert
                        open={open}
                        onClose={() => setOpen(false)}
                        variant="info"
                        title="Dismissible Alert"
                    >
                        This alert handles its open state externally via props.
                    </CodeplexAlert>
                </div>
            </CodeplexCard>

            {/* Complete Example Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ejemplo Completo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexAlert, CodeplexButton } from '@codeplex-qwik/ui';

// Alerta compleja con acción y estilo filled
<CodeplexAlert
  design="filled"
  variant="warning"
  title="Confirmación Requerida"
  action={
    <CodeplexButton color="inherit" size="sm">
      VERIFICAR
    </CodeplexButton>
  }
>
  Es necesario verificar tu correo electrónico para continuar.
</CodeplexAlert>

// Alerta simple outline
<CodeplexAlert 
  design="outlined" 
  variant="info" 
  title="Nota Informativa" 
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
