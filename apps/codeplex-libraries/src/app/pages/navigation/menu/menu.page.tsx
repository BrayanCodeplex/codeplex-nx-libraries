import { useState } from 'react';
import { CodeplexMenu, CodeplexElementoMenu } from '@codeplex-sac/navigation';
import { CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

export const MenuPage = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const items: CodeplexElementoMenu[] = [
        { etiqueta: 'Perfil', icono: <PersonIcon />, alHacerClick: handleClose },
        { etiqueta: 'Mi Cuenta', icono: <SettingsIcon />, alHacerClick: handleClose },
        { etiqueta: 'Cerrar Sesión', icono: <LogoutIcon />, alHacerClick: handleClose, divider: true },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Menú</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Menú desplegable vitaminado con propiedad <code>elementos</code>.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Menú Basado en Datos">
                <CodeplexBox centered sx={{ p: 4, height: 200 }}>
                    <CodeplexBoton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        alHacerClick={handleClick}
                        variante="primary"
                    >
                        Panel de Control
                    </CodeplexBoton>
                    <CodeplexMenu
                        id="basic-menu"
                        elementoAnclaje={anchorEl}
                        abierto={open}
                        alCerrar={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        elementos={items}
                    />
                </CodeplexBox>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexMenu
  abierto={open}
  elementoAnclaje={anchorEl}
  alCerrar={handleClose}
  elementos={[
    { etiqueta: 'Perfil', icono: <PersonIcon /> },
    { etiqueta: 'Cerrar Sesión', alHacerClick: logout }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
