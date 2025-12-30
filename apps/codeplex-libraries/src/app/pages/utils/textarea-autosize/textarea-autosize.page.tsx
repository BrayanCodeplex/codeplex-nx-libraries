import { CodeplexTextareaAutosize } from '@codeplex-qwik/utils';
import { CodeplexCard } from '@codeplex-qwik/ui';
import { CodeplexBox } from '@codeplex-qwik/layout';

export const TextareaPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Textarea Autosize</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Textarea que crece automáticamente, estilizado para coincidir con MUI TextField.
                </p>
            </div>

            <CodeplexCard header="Variantes">
                <CodeplexBox flexCol sx={{ gap: 4, p: 4, maxWidth: 500 }}>
                    <CodeplexTextareaAutosize
                        variant="outlined"
                        placeholder="Outlined (Default)"
                        minRows={3}
                    />
                    <CodeplexTextareaAutosize
                        variant="filled"
                        placeholder="Filled Variant"
                        minRows={3}
                    />
                    <CodeplexTextareaAutosize
                        variant="standard"
                        placeholder="Standard Variant"
                        minRows={3}
                    />
                </CodeplexBox>
            </CodeplexCard>

            <CodeplexCard header="Estados (Error/Focus)">
                <CodeplexBox flexCol sx={{ gap: 4, p: 4, maxWidth: 500 }}>
                    <CodeplexTextareaAutosize
                        error
                        placeholder="Error State"
                        minRows={2}
                        defaultValue="Texto inválido..."
                    />
                </CodeplexBox>
            </CodeplexCard>
        </div>
    );
};
