import { BottomNavigation, BottomNavigationAction, BottomNavigationProps, Paper, SxProps, Theme } from '@mui/material';

export interface CodeplexElementoNavegacionInferior {
    etiqueta: string | React.ReactNode;
    icono: React.ReactNode;
    valor: any;
    [key: string]: any; // Allow other props
}

export interface CodeplexNavegacionInferiorProps extends Omit<BottomNavigationProps, 'onChange' | 'value'> {
    elementos: CodeplexElementoNavegacionInferior[];
    // Vitamins:
    fijo?: boolean; // Fix to bottom
    conPapel?: boolean; // Wrap in Paper for elevation (typical mobile pattern)
    sxContenedor?: SxProps<Theme>; // Styles for the wrapper if fixed/paper
    alCambiar?: (event: React.SyntheticEvent, nuevoValor: any) => void;
    valor?: any;
}

export const CodeplexNavegacionInferior = ({
    elementos,
    fijo,
    conPapel = true, // Default to true as standard mobile pattern usually needs elevation
    sxContenedor,
    sx,
    alCambiar,
    valor,
    ...props
}: CodeplexNavegacionInferiorProps) => {

    const nav = (
        <BottomNavigation showLabels sx={sx} onChange={alCambiar} value={valor} {...props}>
            {elementos.map((elemento, index) => {
                const { etiqueta, icono, valor, ...rest } = elemento;
                return (
                    <BottomNavigationAction
                        key={index}
                        label={etiqueta}
                        icon={icono}
                        value={valor}
                        {...rest}
                    />
                );
            })}
        </BottomNavigation>
    );

    if (fijo) {
        return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, ...sxContenedor }} elevation={3}>
                {nav}
            </Paper>
        );
    }

    if (conPapel) {
        return (
            <Paper elevation={3} sx={sxContenedor}>
                {nav}
            </Paper>
        );
    }

    return nav;
};
