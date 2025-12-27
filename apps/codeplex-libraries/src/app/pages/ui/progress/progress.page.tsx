import { CodeplexProgress, CodeplexSpinner, CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { useState, useEffect } from 'react';

export const ProgressPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress & Spinner</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Feedback indicators for running processes.
                </p>
            </div>

            {/* Circular Progress (Spinner) */}
            <CodeplexCard header="Circular Progress (Spinner)">
                <div className="flex flex-col gap-6 p-4">
                    <div className="flex gap-8 items-center">
                        <CodeplexSpinner size="sm" />
                        <CodeplexSpinner size="md" />
                        <CodeplexSpinner size="lg" />
                        <CodeplexSpinner size="xl" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <CodeplexSpinner color="secondary" />
                        <CodeplexSpinner color="success" />
                        <CodeplexSpinner color="warning" />
                        <CodeplexSpinner color="error" />
                        <CodeplexSpinner color="info" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <CodeplexSpinner label="Loading..." />
                        <CodeplexSpinner label="Processing..." labelPosition="bottom" />
                        <CodeplexSpinner type="dots" color="primary" size="lg" />
                        <CodeplexSpinner type="ping" color="secondary" size="lg" />
                    </div>
                </div>
            </CodeplexCard>

            {/* Linear Progress */}
            <CodeplexCard header="Linear Progress">
                <div className="space-y-6 p-4">
                    {/* Basic */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Indeterminate</h4>
                        <CodeplexProgress indeterminate />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Determinate ({Math.round(progress)}%)</h4>
                        <CodeplexProgress value={progress} />
                    </div>

                    {/* Colors */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Colors</h4>
                        <CodeplexProgress value={50} variant="secondary" />
                        <CodeplexProgress value={60} variant="success" />
                        <CodeplexProgress value={70} variant="warning" />
                        <CodeplexProgress value={80} variant="error" />
                    </div>

                    {/* Sizes */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Sizes</h4>
                        <CodeplexProgress value={30} size="sm" />
                        <CodeplexProgress value={50} size="md" />
                        <CodeplexProgress value={70} size="lg" />
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Features</h4>
                        <CodeplexProgress value={65} label="Uploading file..." showPercentage />
                        <CodeplexProgress value={85} size="lg" label="Inside Label" labelInside showPercentage />
                        <CodeplexProgress value={progress} striped animated label="Striped & Animated" />
                    </div>
                </div>
            </CodeplexCard>
        </div>
    );
};
