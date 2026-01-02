import { useState } from 'react';
import { CodeplexModal } from '@codeplex-sac/utils';
import { CodeplexButton, CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';

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

            <CodeplexCard header="Smart Modal">
                <CodeplexBox flexRow centered sx={{ p: 4 }}>
                    <CodeplexButton variant="primary" onClick={() => setOpen(true)}>
                        Abrir Modal Básica
                    </CodeplexButton>
                </CodeplexBox>

                <CodeplexModal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="¡Hola Mundo!"
                    description="Este es un modal inteligente de Codeplex. Ya viene con título, botón de cerrar y estilos."
                    width={500}
                >
                    <CodeplexButton variant="outline" onClick={() => setOpen(false)} className="mt-4">
                        Entendido
                    </CodeplexButton>
                </CodeplexModal>
            </CodeplexCard>

            <CodeplexCard header="Custom Content Modal">
                <CodeplexBox flexRow centered sx={{ p: 4 }}>
                    <CodeplexButton variant="secondary" onClick={() => setOpenCustom(true)}>
                        Abrir Modal Custom
                    </CodeplexButton>
                </CodeplexBox>

                <CodeplexModal
                    open={openCustom}
                    onClose={() => setOpenCustom(false)}
                    title="Login"
                    showCloseIcon={false}
                    width={400}
                >
                    <form className="flex flex-col gap-4">
                        <input className="border p-2 rounded" placeholder="Email" />
                        <input className="border p-2 rounded" type="password" placeholder="Password" />
                        <CodeplexButton variant="primary" onClick={() => setOpenCustom(false)}>Login</CodeplexButton>
                    </form>
                </CodeplexModal>
            </CodeplexCard>

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
