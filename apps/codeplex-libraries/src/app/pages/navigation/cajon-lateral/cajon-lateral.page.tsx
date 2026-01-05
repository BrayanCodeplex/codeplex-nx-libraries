import { useState } from 'react';
import { CodeplexCajonLateral } from '@codeplex-sac/navigation';
import { CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { CodeplexCaja, CodeplexPila } from '@codeplex-sac/layout';
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cajón Lateral (Drawer)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Panel lateral de navegación. Vitaminado con Cabecera, Pie, Icono de Cierre y Ancho fácil.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Demos de Cajón Lateral">
                <CodeplexPila espaciado={2} direccion="row" sx={{ p: 4 }}>
                    <CodeplexBoton variante="primary" alHacerClick={() => setOpenRight(true)}>
                        Abrir Cajón Derecho (Estándar)
                    </CodeplexBoton>
                    <CodeplexBoton variante="secondary" alHacerClick={() => setOpenBottom(true)}>
                        Abrir Cajón Inferior (Deslizable)
                    </CodeplexBoton>
                </CodeplexPila>
            </CodeplexTarjeta>

            {/* Standard Right Drawer */}
            <CodeplexCajonLateral
                anclaje="right"
                abierto={openRight}
                alCerrar={() => setOpenRight(false)}
                mostrarIconoCierre
                ancho={320}
                cabecera={<Typography variant="h6">Configuración</Typography>}
                pie={
                    <CodeplexCaja centrado sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        © 2025 Codeplex
                    </CodeplexCaja>
                }
            >
                <div className="p-4">
                    <p className="mb-4 text-gray-600">Este es un Cajón estándar con ancho fijo de 320px, Cabecera y Pie.</p>
                    <Divider className="my-4" />
                    {listContent}
                </div>
            </CodeplexCajonLateral>

            {/* Swipeable Bottom Drawer */}
            <CodeplexCajonLateral
                anclaje="bottom"
                deslizable
                abierto={openBottom}
                alCerrar={() => setOpenBottom(false)}
                alAbrir={() => setOpenBottom(true)}
                mostrarIconoCierre
                cabecera={<Typography variant="h6" align="center">Menú Móvil</Typography>}
                ancho="auto" // Auto width for bottom drawer usually implies full width
                propsPapel={{
                    sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
                }}
            >
                <div className="p-4">
                    {listContent}
                </div>
            </CodeplexCajonLateral>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexCajonLateral
  anclaje="right"
  abierto={open}
  alCerrar={toggle}
  ancho={300}
  mostrarIconoCierre
  cabecera={<h3>Título</h3>}
  pie={<span>Pie de página</span>}
>
  {contenido}
</CodeplexCajonLateral>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
