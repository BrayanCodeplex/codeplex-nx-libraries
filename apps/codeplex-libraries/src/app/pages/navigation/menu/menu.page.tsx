import { useState } from 'react';
import { CodeplexMenu, CodeplexMenuItemType } from '@codeplex-sac/navigation';
import { CodeplexCard, CodeplexButton } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';
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

    const items: CodeplexMenuItemType[] = [
        { label: 'Profile', icon: <PersonIcon />, onClick: handleClose },
        { label: 'My account', icon: <SettingsIcon />, onClick: handleClose },
        { label: 'Logout', icon: <LogoutIcon />, onClick: handleClose, divider: true },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Menu</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Menú desplegable vitaminado con propiedad <code>items</code>.
                </p>
            </div>

            <CodeplexCard header="Data-Driven Menu">
                <CodeplexBox centered sx={{ p: 4, height: 200 }}>
                    <CodeplexButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        variant="primary"
                    >
                        Dashboard
                    </CodeplexButton>
                    <CodeplexMenu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        items={items}
                    />
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexMenu
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  items={[
    { label: 'Profile', icon: <PersonIcon /> },
    { label: 'Logout', onClick: logout }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
