import { CodeplexImageList, CodeplexImageListItem, CodeplexImageListItemBar } from '@codeplex-qwik/layout';
import { CodeplexCard } from '@codeplex-qwik/ui';

// Mock Data
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
];

export const ImageListPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Image List</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Galerías de imágenes tipo Masonry, Quilted o Standard.
                </p>
            </div>

            <CodeplexCard header="Standard Image List">
                <CodeplexImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                        <CodeplexImageListItem key={item.img}>
                            <img
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <CodeplexImageListItemBar
                                title={item.title}
                                subtitle={<span>by: {item.author}</span>}
                                position="below"
                            />
                        </CodeplexImageListItem>
                    ))}
                </CodeplexImageList>
            </CodeplexCard>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Código</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`<CodeplexImageList cols={3}>
  {items.map(item => (
     <CodeplexImageListItem key={item.img}>
        <img src={item.img} />
        <CodeplexImageListItemBar title={item.title} />
     </CodeplexImageListItem>
  ))}
</CodeplexImageList>`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
