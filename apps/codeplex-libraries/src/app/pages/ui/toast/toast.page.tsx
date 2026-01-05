import { useState } from 'react';
import { CodeplexNotificacion, CodeplexBoton, CodeplexNotificacionVariante, CodeplexNotificacionPosicion } from '@codeplex-sac/ui';

export const ToastPage = () => {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<CodeplexNotificacionVariante>('success');
    const [position, setPosition] = useState<CodeplexNotificacionPosicion>('bottom-right');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const triggerToast = (kind: CodeplexNotificacionVariante, pos?: CodeplexNotificacionPosicion) => {
        setVariant(kind);
        if (pos) setPosition(pos);

        if (kind === 'success') {
            setTitle('Guardado correctamente');
            setSubtitle('Los cambios se han guardado sin problemas.');
        } else if (kind === 'error') {
            setTitle('Ocurrió un error');
            setSubtitle('No pudimos procesar tu solicitud. Revisa la conexión.');
        } else if (kind === 'warning') {
            setTitle('Revisa los datos');
            setSubtitle('Hay campos obligatorios pendientes.');
        } else {
            setTitle('Información');
            setSubtitle('Este es un mensaje informativo.');
        }

        setOpen(true);
        // Note: No setTimeout needed, Snackbar handles auto-hide via duration prop
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Toast (Snackbar)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Notificaciones flotantes temporales. Implementado con Material UI Snackbar y Alert.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Variantes</h2>
                <div className="flex flex-wrap gap-3">
                    <CodeplexBoton variante="success" alHacerClick={() => triggerToast('success')}>Success</CodeplexBoton>
                    <CodeplexBoton variante="danger" alHacerClick={() => triggerToast('error')}>Error</CodeplexBoton>
                    <CodeplexBoton variante="primary" color="info" alHacerClick={() => triggerToast('info')}>Info</CodeplexBoton>
                    <CodeplexBoton variante="primary" color="warning" alHacerClick={() => triggerToast('warning')}>Warning</CodeplexBoton>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Posiciones</h2>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('success', 'top-left')}>Top Left</CodeplexBoton>
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('info', 'top-center')}>Top Center</CodeplexBoton>
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('warning', 'top-right')}>Top Right</CodeplexBoton>
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('success', 'bottom-left')}>Bottom Left</CodeplexBoton>
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('info', 'bottom-center')}>Bottom Center</CodeplexBoton>
                    <CodeplexBoton variante="outline" tamano="sm" alHacerClick={() => triggerToast('error', 'bottom-right')}>Bottom Right</CodeplexBoton>
                </div>
            </section>

            <CodeplexNotificacion
                open={open}
                variante={variant}
                posicion={position}
                titulo={title}
                subtitulo={subtitle}
                mostrarIcono
                cerrable
                duracion={4000} // Custom duration
                onClose={() => setOpen(false)}
            />

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexNotificacion } from '@codeplex-sac/ui';

/* El Snackbar se cierra automáticamente después de 6s por defecto */
<CodeplexNotificacion
  open={isOpen}
  titulo="Operación Exitosa"
  onClose={() => setIsOpen(false)}
/>`}</code>
                    </pre>
                </div>
            </section>

            {/* Código máximo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código personalizado
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexNotificacion } from '@codeplex-sac/ui';

// Toast completo controlado por estado
<CodeplexNotificacion
  open={showToast}
  variante="error"
  posicion="top-right"
  titulo="Error de Conexión"
  subtitulo="No se pudo guardar los cambios. Intente nuevamente."
  mostrarIcono={true}
  cerrable={true}
  duracion={3000} // 3 segundos
  onClose={() => setShowToast(false)}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
