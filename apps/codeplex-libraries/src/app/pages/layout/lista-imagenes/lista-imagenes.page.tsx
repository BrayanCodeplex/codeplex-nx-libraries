import { CodeplexListaImagenes, CodeplexElementoListaImagenes, CodeplexBarraElementoListaImagenes } from '@codeplex-sac/layout';
import { CodeplexTarjeta } from '@codeplex-sac/ui';

// Mock Data
const datosImagenes = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        titulo: 'Desayuno',
        autor: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        titulo: 'Hamburguesa',
        autor: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        titulo: 'Cámara',
        autor: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        titulo: 'Café',
        autor: '@nolanissac',
    },
];

export const ImageListPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lista de Imágenes (Image List)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Galerías de imágenes tipo Mampostería (Masonry), Acolchado (Quilted) o Estándar.
                </p>
            </div>

            <CodeplexTarjeta cabecera="Lista de Imágenes Estándar">
                <CodeplexListaImagenes sx={{ width: 500, height: 450 }} columnas={3} altoFila={164}>
                    {datosImagenes.map((item) => (
                        <CodeplexElementoListaImagenes key={item.img}>
                            <img
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.titulo}
                                loading="lazy"
                            />
                            <CodeplexBarraElementoListaImagenes
                                titulo={item.titulo}
                                subtitulo={<span>por: {item.autor}</span>}
                                posicion="below"
                            />
                        </CodeplexElementoListaImagenes>
                    ))}
                </CodeplexListaImagenes>
            </CodeplexTarjeta>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexListaImagenes columnas={3}>
  {items.map(item => (
     <CodeplexElementoListaImagenes key={item.img}>
        <img src={item.img} />
        <CodeplexBarraElementoListaImagenes titulo={item.titulo} />
     </CodeplexElementoListaImagenes>
  ))}
</CodeplexListaImagenes>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
