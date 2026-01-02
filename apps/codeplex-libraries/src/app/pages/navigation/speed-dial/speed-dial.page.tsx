import { CodeplexSpeedDial } from '@codeplex-sac/navigation';
import { CodeplexCard } from '@codeplex-sac/ui';
import { CodeplexBox } from '@codeplex-sac/layout';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

export const SpeedDialPage = () => {
    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy', tooltipTitle: 'Copy' },
        { icon: <SaveIcon />, name: 'Save', tooltipTitle: 'Save' },
        { icon: <PrintIcon />, name: 'Print', tooltipTitle: 'Print' },
        { icon: <ShareIcon />, name: 'Share', tooltipTitle: 'Share' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Speed Dial</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Botón de acción flotante (FAB) que despliega menú. Vitaminado con <code>actions</code> array.
                </p>
            </div>

            <CodeplexCard header="Demo Speed Dial">
                <CodeplexBox sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'relative' }}>
                    <CodeplexSpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        actions={actions}
                    />
                    <p className="p-4 text-gray-500">Haz hover o click en el botón + abajo a la derecha.</p>
                </CodeplexBox>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexSpeedDial
  ariaLabel="SpeedDial"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  actions={[
     { icon: <SaveIcon />, tooltipTitle: 'Save', onClick: handleSave }
  ]}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
