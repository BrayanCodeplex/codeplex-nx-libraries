import React, { useState } from 'react';
import { CodeplexAlerta, CodeplexBoton, CodeplexTarjeta } from '@codeplex-sac/ui';

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
            <CodeplexTarjeta cabecera="Severidad (Variantes)">
                <div className="p-4 space-y-4">
                    <CodeplexAlerta variante="info" titulo="Información">
                        This is an info alert — check it out!
                    </CodeplexAlerta>
                    <CodeplexAlerta variante="success" titulo="Éxito">
                        This is a success alert — check it out!
                    </CodeplexAlerta>
                    <CodeplexAlerta variante="warning" titulo="Advertencia">
                        This is a warning alert — check it out!
                    </CodeplexAlerta>
                    <CodeplexAlerta variante="danger" titulo="Error">
                        This is an error/danger alert — check it out!
                    </CodeplexAlerta>
                </div>
            </CodeplexTarjeta>

            {/* Styles: Filled & Outlined */}
            <CodeplexTarjeta cabecera="Estilos Visuales (Design)">
                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Filled</h3>
                        <div className="space-y-2">
                            <CodeplexAlerta diseno="filled" variante="success" titulo="Filled Success" />
                            <CodeplexAlerta diseno="filled" variante="danger" titulo="Filled Error" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Outlined</h3>
                        <div className="space-y-2">
                            <CodeplexAlerta diseno="outlined" variante="info" titulo="Outlined Info" />
                            <CodeplexAlerta diseno="outlined" variante="warning" titulo="Outlined Warning" />
                        </div>
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Actions */}
            <CodeplexTarjeta cabecera="Acciones Personalizadas">
                <div className="p-4 space-y-4">
                    <CodeplexAlerta
                        variante="warning"
                        alCerrar={() => alert('Closed!')}
                        titulo="Alert with close action"
                    >
                        Click the X to close me (triggers callback).
                    </CodeplexAlerta>

                    <CodeplexAlerta
                        className="mb-2"
                        variante="success"
                        accion={
                            <CodeplexBoton color="inherit" tamano="sm" variante="ghost">
                                UNDO
                            </CodeplexBoton>
                        }
                    >
                        This alert has a custom action button.
                    </CodeplexAlerta>
                </div>
            </CodeplexTarjeta>

            {/* Dismissible Interaction */}
            <CodeplexTarjeta cabecera="Interacción: Dismissible">
                <div className="p-4">
                    <CodeplexBoton
                        variante="primary"
                        disabled={open}
                        alHacerClick={() => setOpen(true)}
                        className="mb-4"
                    >
                        Re-open Alert
                    </CodeplexBoton>

                    <CodeplexAlerta
                        abierto={open}
                        alCerrar={() => setOpen(false)}
                        variante="info"
                        titulo="Dismissible Alert"
                    >
                        This alert handles its open state externally via props.
                    </CodeplexAlerta>
                </div>
            </CodeplexTarjeta>

            {/* Complete Example Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ejemplo Completo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexAlert, CodeplexButton } from '@codeplex-sac/ui';

// Alerta compleja con acción y estilo filled
<CodeplexAlerta
  diseno="filled"
  variante="warning"
  titulo="Confirmación Requerida"
  accion={
    <CodeplexBoton color="inherit" size="sm">
      VERIFICAR
    </CodeplexBoton>
  }
>
  Es necesario verificar tu correo electrónico para continuar.
</CodeplexAlerta>

// Alerta simple outline
<CodeplexAlerta 
  diseno="outlined" 
  variante="info" 
  titulo="Nota Informativa" 
/>`}</code>
                    </pre>
                </div>
            </section >
        </div >
    );
};
