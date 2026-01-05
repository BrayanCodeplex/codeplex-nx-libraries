import { CodeplexBoton, CodeplexTarjeta, EntradaOcultaVisualmente } from '@codeplex-sac/ui';

// We use generic icons here for demo purposes, you can use MUI icons in real apps
const CloudUploadIcon = () => <span>☁️</span>;
const SendIcon = () => <span>📤</span>;
const DeleteIcon = () => <span>🗑️</span>;

export const ButtonPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Boton</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componente mejorado con Material UI. Soporta variantes avanzadas, carga de archivos,
                    navegación y personalización profunda.
                </p>
            </div>

            {/* Basic Variants */}
            <CodeplexTarjeta cabecera="Variantes Básicas">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexBoton variante="primary">Primary (Contained)</CodeplexBoton>
                    <CodeplexBoton variante="secondary">Secondary</CodeplexBoton>
                    <CodeplexBoton variante="outline">Outline</CodeplexBoton>
                    <CodeplexBoton variante="ghost">Ghost</CodeplexBoton>
                    <CodeplexBoton variante="danger">Danger</CodeplexBoton>
                    <CodeplexBoton variante="success">Success</CodeplexBoton>
                    <CodeplexBoton disabled>Disabled</CodeplexBoton>
                    <CodeplexBoton href="#text-buttons">Link (href)</CodeplexBoton>
                </div>
            </CodeplexTarjeta>

            {/* Sizes */}
            <CodeplexTarjeta cabecera="Tamaños">
                <div className="flex flex-wrap items-center gap-4 p-4">
                    <CodeplexBoton tamano="xs">Extra Pequeño (xs)</CodeplexBoton>
                    <CodeplexBoton tamano="sm">Pequeño (sm)</CodeplexBoton>
                    <CodeplexBoton tamano="md">Mediano (md)</CodeplexBoton>
                    <CodeplexBoton tamano="lg">Grande (lg)</CodeplexBoton>
                </div>
            </CodeplexTarjeta>

            {/* With Icons */}
            <CodeplexTarjeta cabecera="Con Iconos">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexBoton variante="outline" iconoIzquierda={<DeleteIcon />}>Delete</CodeplexBoton>
                    <CodeplexBoton variante="primary" iconoDerecha={<SendIcon />}>Send</CodeplexBoton>
                    <CodeplexBoton variante="secondary" iconoIzquierda="🏠">Legacy Left</CodeplexBoton>
                </div>
            </CodeplexTarjeta>

            {/* File Upload */}
            <CodeplexTarjeta cabecera="Carga de Archivos (File Upload)">
                <div className="p-4 flex flex-col gap-4">
                    <p className="text-sm text-gray-500 mb-2">
                        Usa el componente <code>EntradaOcultaVisualmente</code> junto con <code>component="label"</code> para crear botones de subida nativos y accesibles.
                    </p>
                    <div className="flex gap-4">
                        <CodeplexBoton
                            component="label"
                            variante="primary"
                            iconoIzquierda={<CloudUploadIcon />}
                        >
                            Upload files
                            <EntradaOcultaVisualmente
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </CodeplexBoton>

                        <CodeplexBoton
                            component="label"
                            variante="outline"
                            iconoIzquierda={<CloudUploadIcon />}
                        >
                            Upload single
                            <EntradaOcultaVisualmente type="file" />
                        </CodeplexBoton>
                    </div>
                </div>
            </CodeplexTarjeta>

            {/* Loading & States */}
            <CodeplexTarjeta cabecera="Estados de Carga">
                <div className="flex flex-wrap gap-4 p-4">
                    <CodeplexBoton cargando>Loading Default</CodeplexBoton>
                    <CodeplexBoton variante="primary" cargando>Processing...</CodeplexBoton>
                    <CodeplexBoton variante="outline" cargando iconoIzquierda={<CloudUploadIcon />}>Saving</CodeplexBoton>
                </div>
            </CodeplexTarjeta>

            {/* Customization Code */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ejemplo Completo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexBoton, EntradaOcultaVisualmente } from '@codeplex-sac/ui';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Botón de carga de archivos
<CodeplexBoton
  component="label"
  variante="primary"
  iconoIzquierda={<CloudUploadIcon />}
>
  Subir archivos
  <EntradaOcultaVisualmente type="file" onChange={(e) => console.log(e)} />
</CodeplexBoton>

// Botón de envío con estado de carga
<CodeplexBoton
  cargando={isLoading}
  alHacerClick={handleSubmit}
  variante="success"
  tamano="lg"
>
  Enviar formulario
</CodeplexBoton>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
