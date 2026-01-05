import { useState } from 'react';
import { CodeplexModal } from '@codeplex-sac/utils';
import { CodeplexBoton, CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';

export const ModalPage = () => {
    const [open, setOpen] = useState(false);
    const [openCustom, setOpenCustom] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Modal</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Smart Modal con estilos predeterminados (Paper, Sombra, Centrado) y props accesibles.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Smart Modal">
                <CodeplexCaja centrado sx={{ p: 4, display: 'flex', flexDirection: 'row' }}>
                    <CodeplexBoton variante="primary" alHacerClick={() => setOpen(true)}>
                        Abrir Modal Básica
                    </CodeplexBoton>
                </CodeplexCaja>

                <CodeplexModal
                    open={open}
                    onClose={() => setOpen(false)}
                    titulo="¡Hola Mundo!"
                    descripcion="Este es un modal inteligente de Codeplex. Ya viene con título, botón de cerrar y estilos."
                    ancho={500}
                >
                    <CodeplexBoton variante="outline" alHacerClick={() => setOpen(false)} className="mt-4">
                        Entendido
                    </CodeplexBoton>
                </CodeplexModal>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Custom Content Modal">
                <CodeplexCaja centrado sx={{ p: 4, display: 'flex', flexDirection: 'row' }}>
                    <CodeplexBoton variante="secondary" alHacerClick={() => setOpenCustom(true)}>
                        Abrir Modal Custom
                    </CodeplexBoton>
                </CodeplexCaja>

                <CodeplexModal
                    open={openCustom}
                    onClose={() => setOpenCustom(false)}
                    titulo="Login"
                    mostrarIconoCierre={false}
                    ancho={400}
                >
                    <form className="flex flex-col gap-4">
                        <input className="border p-2 rounded" placeholder="Email" />
                        <input className="border p-2 rounded" type="password" placeholder="Password" />
                        <CodeplexBoton variante="primary" alHacerClick={() => setOpenCustom(false)}>Login</CodeplexBoton>
                    </form>
                </CodeplexModal>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexModal
  open={open}
  onClose={handleClose}
  title="Título del Modal"
  description="Descripción accesible..."
  width={500}
>
  <ContenidoCustom />
</CodeplexModal>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
