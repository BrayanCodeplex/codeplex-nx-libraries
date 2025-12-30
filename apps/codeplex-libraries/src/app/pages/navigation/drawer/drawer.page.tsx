import { useState } from 'react';
import { CodeplexDrawer } from '@codeplex-qwik/navigation';
import { CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { CodeplexBox, CodeplexStack } from '@codeplex-qwik/layout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';

export const DrawerPage = () => {
    const [openRight, setOpenRight] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);

    const listContent = (
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Drawer</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Panel lateral de navegación. Vitaminado con Header, Footer, Close Icon y Ancho fácil.
                </p>
            </div>

            <CodeplexCard header="Demos de Drawer">
                <CodeplexStack spacing={2} direction="row" sx={{ p: 4 }}>
                    <CodeplexButton variant="primary" onClick={() => setOpenRight(true)}>
                        Abrir Drawer Derecho (Standard)
                    </CodeplexButton>
                    <CodeplexButton variant="secondary" onClick={() => setOpenBottom(true)}>
                        Abrir Drawer Inferior (Swipeable)
                    </CodeplexButton>
                </CodeplexStack>
            </CodeplexCard>

            {/* Standard Right Drawer */}
            <CodeplexDrawer
                anchor="right"
                open={openRight}
                onClose={() => setOpenRight(false)}
                showCloseIcon
                width={320}
                header={<Typography variant="h6">Configuración</Typography>}
                footer={
                    <CodeplexBox centered sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        © 2025 Codeplex
                    </CodeplexBox>
                }
            >
                <div className="p-4">
                    <p className="mb-4 text-gray-600">Este es un Drawer estándar con ancho fijo de 320px, Header y Footer.</p>
                    <Divider className="my-4" />
                    {listContent}
                </div>
            </CodeplexDrawer>

            {/* Swipeable Bottom Drawer */}
            <CodeplexDrawer
                anchor="bottom"
                swipeable
                open={openBottom}
                onClose={() => setOpenBottom(false)}
                onOpen={() => setOpenBottom(true)}
                showCloseIcon
                header={<Typography variant="h6" align="center">Menú Móvil</Typography>}
                width="auto" // Auto width for bottom drawer usually implies full width
                PaperProps={{
                    sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
                }}
            >
                <div className="p-4">
                    {listContent}
                </div>
            </CodeplexDrawer>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexDrawer
  anchor="right"
  open={open}
  onClose={toggle}
  width={300}
  showCloseIcon
  header={<h3>Título</h3>}
  footer={<span>Pie de página</span>}
>
  {contenido}
</CodeplexDrawer>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
