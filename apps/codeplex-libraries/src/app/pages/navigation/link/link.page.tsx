import { CodeplexLink } from '@codeplex-qwik/navigation';
import { CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { CodeplexStack } from '@codeplex-qwik/layout';

export const LinkPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Link</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Estiliza enlaces (anchors) consistentes con el tema.
                </p>
            </div>

            <CodeplexCard header="Variantes de Enlace">
                <CodeplexStack spacing={2} p={2}>
                    <CodeplexLink href="#" underline="none">Underline None</CodeplexLink>
                    <CodeplexLink href="#" underline="hover">Underline Hover (Default)</CodeplexLink>
                    <CodeplexLink href="#" underline="always">Underline Always</CodeplexLink>

                    <CodeplexLink href="#" color="secondary" onClick={(e) => { e.preventDefault(); alert('Clicked!'); }}>
                        Secondary Color
                    </CodeplexLink>

                    <CodeplexLink component="button" variant="body2" onClick={() => alert('I am a button!')}>
                        Button Link (component="button")
                    </CodeplexLink>
                </CodeplexStack>
            </CodeplexCard>
        </div>
    );
};
