import { CodeplexButton, CodeplexCard, VisuallyHiddenInput } from '@codeplex-sac/ui';
// We use generic icons here for demo purposes, you can use MUI icons in real apps
const CloudUploadIcon = () => <span>☁️</span>;
const SendIcon = () => <span>📤</span>;
const DeleteIcon = () => <span>🗑️</span>;

export const ButtonPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Button</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente mejorado con Material UI. Soporta variantes avanzadas, carga de archivos,
                    navegación y personalización profunda.
                </p>
            </div>

            {/* Basic Variants */}
            <CodeplexCard header="Variantes Básicas">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexButton variant="primary">Primary</CodeplexButton>
                    <CodeplexButton variant="secondary">Secondary</CodeplexButton>
                    <CodeplexButton variant="outline">Outline</CodeplexButton>
                    <CodeplexButton variant="ghost">Ghost</CodeplexButton>
                    <CodeplexButton variant="danger">Danger</CodeplexButton>
                    <CodeplexButton variant="success">Success</CodeplexButton>
                    <CodeplexButton disabled>Disabled</CodeplexButton>
                    <CodeplexButton href="#text-buttons">Link (href)</CodeplexButton>
                </div>
            </CodeplexCard>

            {/* Sizes */}
            <CodeplexCard header="Tamaños">
                <div className="flex flex-wrap items-center gap-4 p-4">
                    <CodeplexButton size="xs">Extra Small (xs)</CodeplexButton>
                    <CodeplexButton size="sm">Small (sm)</CodeplexButton>
                    <CodeplexButton size="md">Medium (md)</CodeplexButton>
                    <CodeplexButton size="lg">Large (lg)</CodeplexButton>
                </div>
            </CodeplexCard>

            {/* With Icons */}
            <CodeplexCard header="Con Iconos">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexButton variant="outline" startIcon={<DeleteIcon />}>Delete</CodeplexButton>
                    <CodeplexButton variant="primary" endIcon={<SendIcon />}>Send</CodeplexButton>
                    <CodeplexButton variant="secondary" leftIcon="🏠">Legacy Left</CodeplexButton>
                </div>
            </CodeplexCard>

            {/* File Upload */}
            <CodeplexCard header="Carga de Archivos (File Upload)">
                <div className="p-4 flex flex-col gap-4">
                    <p className="text-sm text-gray-500 mb-2">
                        Usa el componente <code>VisuallyHiddenInput</code> junto con <code>component="label"</code> para crear botones de subida nativos y accesibles.
                    </p>
                    <div className="flex gap-4">
                        <CodeplexButton
                            component="label"
                            variant="primary"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </CodeplexButton>

                        <CodeplexButton
                            component="label"
                            variant="outline"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload single
                            <VisuallyHiddenInput type="file" />
                        </CodeplexButton>
                    </div>
                </div>
            </CodeplexCard>

            {/* Loading & States */}
            <CodeplexCard header="Estados de Carga">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexButton loading>Loading Default</CodeplexButton>
                    <CodeplexButton variant="primary" loading>Processing...</CodeplexButton>
                    <CodeplexButton variant="outline" loading startIcon={<CloudUploadIcon />}>Saving</CodeplexButton>
                </div>
            </CodeplexCard>

            {/* Customization Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ejemplo Completo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexButton, VisuallyHiddenInput } from '@codeplex-sac/ui';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// File Upload Button
<CodeplexButton
  component="label"
  variant="primary"
  startIcon={<CloudUploadIcon />}
>
  Upload files
  <VisuallyHiddenInput type="file" onChange={(e) => console.log(e)} />
</CodeplexButton>

// Submit Button with Loading
<CodeplexButton
  loading={isLoading}
  onClick={handleSubmit}
  variant="success"
  size="lg"
>
  Submit form
</CodeplexButton>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
