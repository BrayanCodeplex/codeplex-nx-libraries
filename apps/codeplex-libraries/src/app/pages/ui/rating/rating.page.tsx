import { useState } from 'react';
import { CodeplexRating, CodeplexCard } from '@codeplex-sac/ui';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';

const StyledHeartRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export const RatingPage = () => {
    const [ratingValue, setRatingValue] = useState<number | null>(3);
    const [feedbackValue, setFeedbackValue] = useState<number | null>(2);

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rating</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Wrapper de MUI Rating con soporte para variantes, tooltips y diseño personalizado.
                </p>
            </div>

            <CodeplexCard header={<h2 className="text-xl font-bold">Interactivo Controlado</h2>}>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Valor actual: {ratingValue}</span>
                    </div>
                    <CodeplexRating
                        value={ratingValue || 0}
                        max={5}
                        size="large"
                        onChange={(v) => setRatingValue(v)}
                        showValue
                    />
                    <p className="text-sm text-gray-500">Haz click en las estrellas.</p>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Variantes de Color</h2>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Warning (Default)</p>
                        <CodeplexRating value={4} variant="warning" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Success</p>
                        <CodeplexRating value={5} variant="success" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Error</p>
                        <CodeplexRating value={2} variant="error" readOnly />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Primary</p>
                        <CodeplexRating value={3} variant="primary" readOnly />
                    </div>
                </div>
            </CodeplexCard>

            <CodeplexCard header={<h2 className="text-xl font-bold">Custom Icon (Hearts)</h2>}>
                <div className="p-4">
                    <StyledHeartRating
                        name="customized-color"
                        defaultValue={2}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </div>
            </CodeplexCard>

            <CodeplexCard className="border border-blue-100 dark:border-blue-900/30">
                <div className="p-6 flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Experiencia con Feedback</h2>
                    <p className="text-sm text-gray-500">Pasa el mouse sobre las estrellas.</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <CodeplexRating
                            value={feedbackValue || 0}
                            max={5}
                            size="large"
                            variant="primary"
                            tooltips={['Terrible 😡', 'Malo 😞', 'Regular 😐', 'Bueno 🙂', 'Excelente 🤩']}
                            onChange={(v) => setFeedbackValue(v)}
                        />
                    </div>
                </div>
            </CodeplexCard>

            {/* Código mínimo */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código de ejemplo
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`import { CodeplexRating } from '@codeplex-sac/ui';

<CodeplexRating value={4} onChange={(val) => console.log(val)} />`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};
