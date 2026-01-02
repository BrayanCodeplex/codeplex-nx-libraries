import { CodeplexAvatar, CodeplexAvatarGroup, CodeplexCard, stringAvatar } from '@codeplex-sac/ui';

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
            <CodeplexCard header="Image Avatars">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                    <CodeplexAvatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                    <CodeplexAvatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                </div>
            </CodeplexCard>

            {/* Letter Avatars */}
            <CodeplexCard header="Letter Avatars">
                <div className="flex gap-4 p-4 items-center">
                    <CodeplexAvatar>H</CodeplexAvatar>
                    <CodeplexAvatar sx={{ bgcolor: '#ff5722' }}>N</CodeplexAvatar>
                    <CodeplexAvatar sx={{ bgcolor: '#673ab7' }}>OP</CodeplexAvatar>
                </div>
                <div className="flex gap-4 p-4 items-center">
                    {/* stringAvatar helper automatically handles colors */}
                    <CodeplexAvatar {...stringAvatar('Kent Dodds')} />
                    <CodeplexAvatar {...stringAvatar('Jed Watson')} />
                    <CodeplexAvatar {...stringAvatar('Tim Neutkens')} />
                </div>
            </CodeplexCard>

            {/* Sizes */}
            <CodeplexCard header="Sizes">
                <div className="flex gap-4 p-4 items-end">
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="xs"
                    />
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="sm"
                    />
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="md"
                    />
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="lg"
                    />
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="xl"
                    />
                    <CodeplexAvatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        size="xxl"
                    />
                </div>
            </CodeplexCard>

            {/* Icon Avatars (using Emojis/Spans for demo simplicity) */}
            <CodeplexCard header="Icon Avatars">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatar>
                        <span>📁</span>
                    </CodeplexAvatar>
                    <CodeplexAvatar sx={{ bgcolor: '#e91e63' }}>
                        <span>🔍</span>
                    </CodeplexAvatar>
                    <CodeplexAvatar sx={{ bgcolor: '#4caf50' }}>
                        <span>📋</span>
                    </CodeplexAvatar>
                </div>
            </CodeplexCard>

            {/* Variants */}
            <CodeplexCard header="Variants">
                <div className="flex gap-4 p-4">
                    <CodeplexAvatar sx={{ bgcolor: '#ff5722' }} variant="square">
                        N
                    </CodeplexAvatar>
                    <CodeplexAvatar sx={{ bgcolor: '#4caf50' }} variant="rounded">
                        <span>📋</span>
                    </CodeplexAvatar>
                </div>
            </CodeplexCard>

            {/* Grouped */}
            <CodeplexCard header="Grouped">
                <div className="p-4 space-y-4">
                    <CodeplexAvatarGroup max={4}>
                        <CodeplexAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                        <CodeplexAvatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <CodeplexAvatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                        <CodeplexAvatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                        <CodeplexAvatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                    </CodeplexAvatarGroup>

                    <h3 className="font-semibold text-sm mt-4">With total prop</h3>
                    <CodeplexAvatarGroup total={24}>
                        <CodeplexAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                        <CodeplexAvatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <CodeplexAvatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                        <CodeplexAvatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                    </CodeplexAvatarGroup>
                </div>
            </CodeplexCard>
        </div>
    );
};
