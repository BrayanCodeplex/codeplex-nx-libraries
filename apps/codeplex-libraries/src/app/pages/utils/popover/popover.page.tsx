import { useState } from 'react';
import { CodeplexPopover } from '@codeplex-qwik/utils';
import { CodeplexButton, CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexBox } from '@codeplex-qwik/layout';

export const PopoverPage = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popover</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Smart Popover con cabecera y estilos predeterminados.
                </p>
            </div>

            <CodeplexCard header="Demo Popover">
                <CodeplexBox flexRow centered sx={{ p: 4 }}>
                    <CodeplexButton variant="primary" onClick={handleClick}>
                        Abrir Popover
                    </CodeplexButton>
                </CodeplexBox>

                <CodeplexPopover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    title="Mi Popover"
                    showCloseIcon
                >
                    <div className="p-2">
                        <p className="text-sm text-gray-600">Este es el contenido del popover.</p>
                        <CodeplexButton size="xs" variant="ghost" className="mt-2 text-primary-600">Acción</CodeplexButton>
                    </div>
                </CodeplexPopover>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexPopover
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  title="Título"
  showCloseIcon
>
  Contenido...
</CodeplexPopover>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
