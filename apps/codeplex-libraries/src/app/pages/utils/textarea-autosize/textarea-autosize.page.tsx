import { CodeplexTextareaAutosize } from '@codeplex-sac/utils';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';

export const TextareaPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Textarea Autosize</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Textarea que crece automáticamente, estilizado para coincidir con MUI TextField.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Variantes">
                <CodeplexCaja flexColumna sx={{ gap: 4, p: 4, maxWidth: 500 }}>
                    <CodeplexTextareaAutosize
                        variante="outlined"
                        placeholder="Outlined (Default)"
                        minRows={3}
                    />
                    <CodeplexTextareaAutosize
                        variante="filled"
                        placeholder="Filled Variant"
                        minRows={3}
                    />
                    <CodeplexTextareaAutosize
                        variante="standard"
                        placeholder="Standard Variant"
                        minRows={3}
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>

            <CodeplexTarjeta cabecera="Estados (Error/Focus)">
                <CodeplexCaja flexColumna sx={{ gap: 4, p: 4, maxWidth: 500 }}>
                    <CodeplexTextareaAutosize
                        error
                        placeholder="Error State"
                        minRows={2}
                        defaultValue="Texto inválido..."
                    />
                </CodeplexCaja>
            </CodeplexTarjeta>
        </div>
    );
};
