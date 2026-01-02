import { useState, useRef } from 'react';
import { CodeplexPopper } from '@codeplex-sac/utils';
import { CodeplexButton, CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';

export const PopperPage = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popper</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Smart Popper que incluye Paper (sombra), ClickAwayListener automático y Transiciones.
                </p>
            </div>

            <CodeplexCard header="Demo Popper Inteligente">
                <CodeplexBox flexRow centered sx={{ p: 4, gap: 2 }}>
                    <CodeplexButton
                        ref={anchorRef}
                        variant="secondary"
                        onClick={handleToggle}
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                    >
                        Toggle Popper
                    </CodeplexButton>
                </CodeplexBox>

                <CodeplexPopper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    closeOnClickAway
                    onClose={handleClose as any}
                    title="Notificaciones"
                    contentSx={{ minWidth: 200 }}
                >
                    <div className="flex flex-col gap-2">
                        <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">Item 1</div>
                        <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">Item 2</div>
                        <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">Item 3</div>
                    </div>
                </CodeplexPopper>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexPopper
  open={open}
  anchorEl={anchorRef.current}
  title="Titulo Popper"
  closeOnClickAway
  onClose={handleClose}
>
   Contenido...
</CodeplexPopper>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
