import { CodeplexSkeleton, CodeplexCard, CodeplexButton, CodeplexAvatar } from '@codeplex-qwik/ui';

export const SkeletonPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skeleton</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Display a placeholder preview of your content before the data gets loaded.
                </p>
            </div>

            {/* Variants */}
            <CodeplexCard header="Variants">
                <div className="flex flex-col gap-4 p-4 max-w-sm">
                    {/* Text */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Text</span>
                        <CodeplexSkeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </div>

                    {/* Circular */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Circular</span>
                        <CodeplexSkeleton variant="circular" width={40} height={40} />
                    </div>

                    {/* Rectangular */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Rectangular</span>
                        <CodeplexSkeleton variant="rectangular" width={210} height={60} />
                    </div>

                    {/* Rounded */}
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Rounded</span>
                        <CodeplexSkeleton variant="rounded" width={210} height={60} />
                    </div>
                </div>
            </CodeplexCard>

            {/* Animations */}
            <CodeplexCard header="Animations">
                <div className="flex flex-col gap-4 p-4 max-w-sm">
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Pulse (Default)</span>
                        <CodeplexSkeleton />
                    </div>
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Wave</span>
                        <CodeplexSkeleton animation="wave" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">False (No animation)</span>
                        <CodeplexSkeleton animation={false} />
                    </div>
                </div>
            </CodeplexCard>

            {/* Example Usage */}
            <CodeplexCard header="Example Usage">
                <div className="flex gap-4 p-4 items-center">
                    <CodeplexSkeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <CodeplexSkeleton variant="text" width="80%" />
                        <CodeplexSkeleton variant="text" width="40%" />
                    </div>
                </div>
            </CodeplexCard>
        </div>
    );
};
