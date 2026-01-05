import { CodeplexMarcacionRapida, CodeplexAccionMarcacionRapida } from '@codeplex-sac/navigation';
import { CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCaja } from '@codeplex-sac/layout';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

export const SpeedDialPage = () => {
    const acciones: CodeplexAccionMarcacionRapida[] = [
        { icono: <FileCopyIcon />, tituloTooltip: 'Copiar' },
        { icono: <SaveIcon />, tituloTooltip: 'Guardar' },
        { icono: <PrintIcon />, tituloTooltip: 'Imprimir' },
        { icono: <ShareIcon />, tituloTooltip: 'Compartir' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Marcación Rápida (Speed Dial)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Botón de acción flotante (FAB) que despliega menú. Vitaminado con <code>acciones</code> arreglo.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Demo Marcación Rápida">
                <CodeplexCaja sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'relative' }}>
                    <CodeplexMarcacionRapida
                        etiquetaAria="Ejemplo de Marcación Rápida"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        acciones={acciones}
                    />
                    <p className="p-4 text-gray-500">Haz hover o click en el botón + abajo a la derecha.</p>
                </CodeplexCaja>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexMarcacionRapida
  etiquetaAria="Marcación Rápida"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  acciones={[
     { icono: <SaveIcon />, tituloTooltip: 'Guardar', alHacerClick: handleSave }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
