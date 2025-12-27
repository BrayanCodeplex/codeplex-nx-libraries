import { CodeplexBadge, CodeplexCard, CodeplexAvatar } from '@codeplex-qwik/ui';

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
            <CodeplexCard header="Basic badge">
                <div className="flex gap-8 p-4">
                    <CodeplexBadge badgeContent={4} color="primary">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                </div>
            </CodeplexCard>

            {/* Color */}
            <CodeplexCard header="Color">
                <div className="flex gap-8 p-4">
                    <CodeplexBadge badgeContent={4} color="secondary">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge badgeContent={4} color="success">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge badgeContent={4} color="error">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge badgeContent={4} color="info">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge badgeContent={4} color="warning">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                </div>
            </CodeplexCard>

            {/* Badge Visibility */}
            <CodeplexCard header="Badge visibility">
                <div className="flex gap-8 p-4 items-center">
                    <div className="flex flex-col gap-4 items-center">
                        <CodeplexBadge color="secondary" badgeContent={0}>
                            <span className="text-2xl">📧</span>
                        </CodeplexBadge>
                        <span className="text-xs text-gray-500">Hidden (default)</span>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <CodeplexBadge color="secondary" badgeContent={0} showZero>
                            <span className="text-2xl">📧</span>
                        </CodeplexBadge>
                        <span className="text-xs text-gray-500">showZero</span>
                    </div>
                </div>
            </CodeplexCard>

            {/* Maximum Value */}
            <CodeplexCard header="Maximum value">
                <div className="flex gap-8 p-4">
                    <CodeplexBadge color="secondary" badgeContent={99}>
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge color="secondary" badgeContent={100}>
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge color="secondary" badgeContent={1000} max={999}>
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                </div>
            </CodeplexCard>

            {/* Dot Badge */}
            <CodeplexCard header="Dot badge">
                <div className="flex gap-8 p-4">
                    <CodeplexBadge color="secondary" variant="dot">
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                </div>
            </CodeplexCard>

            {/* Badge Overlap */}
            <CodeplexCard header="Badge overlap">
                <div className="flex gap-8 p-4 items-center">
                    <CodeplexBadge color="secondary" badgeContent=" ">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-none" />
                    </CodeplexBadge>
                    <CodeplexBadge color="secondary" badgeContent=" " variant="dot">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-none" />
                    </CodeplexBadge>
                    <CodeplexBadge color="secondary" overlap="circular" badgeContent=" ">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </CodeplexBadge>
                    <CodeplexBadge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </CodeplexBadge>

                    <CodeplexBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" color="success">
                        <CodeplexAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                    </CodeplexBadge>
                </div>
            </CodeplexCard>

            {/* Badge Alignment */}
            <CodeplexCard header="Badge alignment">
                <div className="flex gap-8 p-4">
                    <CodeplexBadge
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right', // Default
                        }}
                        badgeContent={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        badgeContent={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                    <CodeplexBadge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        badgeContent={1}
                        color="primary"
                    >
                        <span className="text-2xl">📧</span>
                    </CodeplexBadge>
                </div>
            </CodeplexCard>
        </div>
    );
};
