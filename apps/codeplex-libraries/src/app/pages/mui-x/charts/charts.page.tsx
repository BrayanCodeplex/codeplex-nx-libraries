import { CodeplexLineChart, CodeplexBarChart, CodeplexPieChart } from '@codeplex-qwik/charts';
import { CodeplexGrid, CodeplexBox } from '@codeplex-qwik/layout';

export const ChartsPage = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MUI X Charts</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Componentes de gráficos vitaminados para visualización de datos.
                </p>
            </div>

            <CodeplexGrid container spacing={4}>
                {/* Line Chart */}
                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexLineChart
                        title="Ventas Mensuales"
                        subTitle="Comparativa año actual vs anterior"
                        series={[
                            { data: [35, 44, 24, 34, 51, 6], label: '2023' },
                            { data: [51, 6, 49, 30, 9, 30], label: '2022' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'] }]}
                        height={350}
                    />
                </CodeplexGrid>

                {/* Bar Chart */}
                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexBarChart
                        title="Ingresos por Categoría"
                        series={[
                            { data: [3, 4, 1, 6, 5], label: 'Series A' },
                            { data: [4, 3, 1, 5, 8], label: 'Series B' },
                        ]}
                        xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }]}
                        height={350}
                    />
                </CodeplexGrid>

                {/* Pie Chart */}
                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexPieChart
                        title="Distribución de Usuarios"
                        subTitle="Por dispositivo"
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Desktop' },
                                    { id: 1, value: 15, label: 'Mobile' },
                                    { id: 2, value: 20, label: 'Tablet' },
                                ],
                            },
                        ]}
                        height={300}
                    />
                </CodeplexGrid>

                {/* Custom Color Palette */}
                <CodeplexGrid size={{ xs: 12, md: 6 }}>
                    <CodeplexBarChart
                        title="Colores Personalizados"
                        series={[
                            { data: [10, 20, 30], color: '#ff5252', label: 'Rojo' },
                            { data: [15, 25, 35], color: '#448aff', label: 'Azul' },
                        ]}
                        xAxis={[{ scaleType: 'band', data: ['X', 'Y', 'Z'] }]}
                        height={300}
                        colors={['#ff5252', '#448aff']}
                    />
                </CodeplexGrid>
            </CodeplexGrid>
        </div>
    );
};
