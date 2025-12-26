import { useState } from 'react';
import { CodeplexToast, CodeplexButton, CodeplexToastVariant, CodeplexToastPosition } from '@codeplex-qwik/ui';

export const ToastPage = () => {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<CodeplexToastVariant>('success');
    const [position, setPosition] = useState<CodeplexToastPosition>('bottom-right');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const triggerToast = (kind: CodeplexToastVariant, pos?: CodeplexToastPosition) => {
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
        // Auto-close simulation
        setTimeout(() => setOpen(false), 3000);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CodeplexToast</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Notificaciones flotantes controladas. Ideal para respuestas de APIs.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Variantes</h2>
                <div className="flex flex-wrap gap-3">
                    <CodeplexButton variant="success" onClick={() => triggerToast('success')}>Success</CodeplexButton>
                    <CodeplexButton variant="danger" onClick={() => triggerToast('error')}>Error</CodeplexButton>
                    <CodeplexButton variant="secondary" onClick={() => triggerToast('info')}>Info</CodeplexButton>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Posiciones</h2>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('success', 'top-left')}>Top Left</button>
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('info', 'top-center')}>Top Center</button>
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('warning', 'top-right')}>Top Right</button>
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('success', 'bottom-left')}>Bottom Left</button>
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('info', 'bottom-center')}>Bottom Center</button>
                    <button className="px-3 py-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => triggerToast('error', 'bottom-right')}>Bottom Right</button>
                </div>
            </section>

            <CodeplexToast
                open={open}
                variant={variant}
                position={position}
                title={title}
                subtitle={subtitle}
                showIcon
                dismissible
                onClose={() => setOpen(false)}
            />

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código mínimo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexToast } from '@codeplex-qwik/ui';

<CodeplexToast
  open={isOpen}
  title="Operación Exitosa"
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
                        <code>{`import { CodeplexToast } from '@codeplex-qwik/ui';

// Toast completo controlado por estado
<CodeplexToast
  open={showToast}
  variant="error"
  position="top-right"
  title="Error de Conexión"
  subtitle="No se pudo guardar los cambios. Intente nuevamente."
  showIcon={true}
  dismissible={true}
  onClose={() => setShowToast(false)}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
