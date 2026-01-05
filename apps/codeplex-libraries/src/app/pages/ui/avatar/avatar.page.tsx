import { CodeplexAvatarUsuario, CodeplexGrupoAvatares, CodeplexTarjeta, avatarCadena } from '@codeplex-sac/ui';

export const AvatarPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Avatar</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Avatars are found throughout material design with uses in everything from tables to dialog menus.
                </p>
            </div>

            {/* Image Avatars */}
            <CodeplexTarjeta cabecera="Image Avatars">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatarUsuario alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                    <CodeplexAvatarUsuario alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                    <CodeplexAvatarUsuario alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                </div>
            </CodeplexTarjeta>

            {/* Letter Avatars */}
            <CodeplexTarjeta cabecera="Letter Avatars">
                <div className="flex gap-4 p-4 items-center">
                    <CodeplexAvatarUsuario>H</CodeplexAvatarUsuario>
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#ff5722' }}>N</CodeplexAvatarUsuario>
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#673ab7' }}>OP</CodeplexAvatarUsuario>
                </div>
                <div className="flex gap-4 p-4 items-center">
                    {/* avatarCadena helper automatically handles colors */}
                    <CodeplexAvatarUsuario {...avatarCadena('Kent Dodds')} />
                    <CodeplexAvatarUsuario {...avatarCadena('Jed Watson')} />
                    <CodeplexAvatarUsuario {...avatarCadena('Tim Neutkens')} />
                </div>
            </CodeplexTarjeta>

            {/* Sizes */}
            <CodeplexTarjeta cabecera="Sizes">
                <div className="flex gap-4 p-4 items-end">
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="xs"
                    />
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="sm"
                    />
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="md"
                    />
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="lg"
                    />
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="xl"
                    />
                    <CodeplexAvatarUsuario
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        tamano="xxl"
                    />
                </div>
            </CodeplexTarjeta>

            {/* Icon Avatars (using Emojis/Spans for demo simplicity) */}
            <CodeplexTarjeta cabecera="Icon Avatars">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatarUsuario>
                        <span>📁</span>
                    </CodeplexAvatarUsuario>
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#e91e63' }}>
                        <span>🔍</span>
                    </CodeplexAvatarUsuario>
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#4caf50' }}>
                        <span>📋</span>
                    </CodeplexAvatarUsuario>
                </div>
            </CodeplexTarjeta>

            {/* Variants */}
            <CodeplexTarjeta cabecera="Variants">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#ff5722' }} variante="square">
                        N
                    </CodeplexAvatarUsuario>
                    <CodeplexAvatarUsuario sx={{ bgcolor: '#4caf50' }} variante="rounded">
                        <span>📋</span>
                    </CodeplexAvatarUsuario>
                </div>
            </CodeplexTarjeta>

            {/* Grouped */}
            <CodeplexTarjeta cabecera="Grouped">
                <div className="p-4 space-y-4">
                    <CodeplexGrupoAvatares maximo={4}>
                        <CodeplexAvatarUsuario alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                        <CodeplexAvatarUsuario alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <CodeplexAvatarUsuario alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                        <CodeplexAvatarUsuario alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                        <CodeplexAvatarUsuario alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                    </CodeplexGrupoAvatares>

                    <h3 className="font-semibold text-sm mt-4">With total prop</h3>
                    <CodeplexGrupoAvatares total={24}>
                        <CodeplexAvatarUsuario alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                        <CodeplexAvatarUsuario alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <CodeplexAvatarUsuario alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                        <CodeplexAvatarUsuario alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                    </CodeplexGrupoAvatares>
                </div>
            </CodeplexTarjeta>
        </div>
    );
};
