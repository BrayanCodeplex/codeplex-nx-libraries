import { CodeplexEnlace } from '@codeplex-sac/navigation';
import { CodeplexTarjeta, CodeplexBoton } from '@codeplex-sac/ui';
import { CodeplexPila } from '@codeplex-sac/layout';

export const LinkPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Enlace (Link)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Estiliza enlaces consistentes con el tema.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Variantes de Enlace">
                <CodeplexPila espaciado={2} p={2}>
                    <CodeplexEnlace href="#" subrayado="none">Sin Subrayado</CodeplexEnlace>
                    <CodeplexEnlace href="#" subrayado="hover">Subrayado al Pasar (Default)</CodeplexEnlace>
                    <CodeplexEnlace href="#" subrayado="always">Subrayado Siempre</CodeplexEnlace>

                    <CodeplexEnlace href="#" color="secondary" onClick={(e) => { e.preventDefault(); alert('Clic!'); }}>
                        Color Secundario
                    </CodeplexEnlace>

                    <CodeplexEnlace componente="button" variante="body2" onClick={() => alert('Soy un botón!')}>
                        Enlace Botón (componente="button")
                    </CodeplexEnlace>
                </CodeplexPila>
            </CodeplexTarjeta>
        </div>
    );
};
