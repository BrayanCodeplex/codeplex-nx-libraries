import { CodeplexInsignia, CodeplexTarjeta, CodeplexAvatarUsuario } from '@codeplex-sac/ui';

export const BadgePage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Badge</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Badge generates a small badge to the top-right of its child(ren).
                </p>
            </div>

            {/* Basic Badge */}
            <CodeplexTarjeta cabecera="Basic badge">
                <div className="flex gap-8 p-4">
                    <CodeplexInsignia contenido={4} color="primary">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>

            {/* Color */}
            <CodeplexTarjeta cabecera="Color">
                <div className="flex gap-8 p-4">
                    <CodeplexInsignia contenido={4} color="secondary">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia contenido={4} color="success">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia contenido={4} color="error">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia contenido={4} color="info">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia contenido={4} color="warning">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>

            {/* Badge Visibility */}
            <CodeplexTarjeta cabecera="Badge visibility">
                <div className="flex gap-8 p-4 items-center">
                    <div className="flex flex-col gap-4 items-center">
                        <CodeplexInsignia color="secondary" contenido={0}>
                            <span className="text-2xl">📧</span>
                        </CodeplexInsignia>
                        <span className="text-xs text-gray-500">Hidden (default)</span>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <CodeplexInsignia color="secondary" contenido={0} mostrarCero>
                            <span className="text-2xl">📧</span>
                        </CodeplexInsignia>
                        <span className="text-xs text-gray-500">mostrarCero</span>
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Maximum Value */}
            <CodeplexTarjeta cabecera="Maximum value">
                <div className="flex gap-8 p-4">
                    <CodeplexInsignia color="secondary" contenido={99}>
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia color="secondary" contenido={100}>
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia color="secondary" contenido={1000} maximo={999}>
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>

            {/* Dot Badge */}
            <CodeplexTarjeta cabecera="Dot badge">
                <div className="flex gap-8 p-4">
                    <CodeplexInsignia color="secondary" variante="dot">
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>

            {/* Badge Overlap */}
            <CodeplexTarjeta cabecera="Badge overlap">
                <div className="flex gap-8 p-4 items-center">
                    <CodeplexInsignia color="secondary" contenido=" ">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-none" />
                    </CodeplexInsignia>
                    <CodeplexInsignia color="secondary" contenido=" " variante="dot">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-none" />
                    </CodeplexInsignia>
                    <CodeplexInsignia color="secondary" superposicion="circular" contenido=" ">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </CodeplexInsignia>
                    <CodeplexInsignia color="secondary" superposicion="circular" contenido=" " variante="dot">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </CodeplexInsignia>

                    <CodeplexInsignia superposicion="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variante="dot" color="success">
                        <CodeplexAvatarUsuario alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>

            {/* Badge Alignment */}
            <CodeplexTarjeta cabecera="Badge alignment">
                <div className="flex gap-8 p-4">
                    <CodeplexInsignia
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right', // Default
                        }}
                        contenido={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        contenido={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        contenido={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                    <CodeplexInsignia
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        contenido={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexInsignia>
                </div>
            </CodeplexTarjeta>
        </div>
    );
};
