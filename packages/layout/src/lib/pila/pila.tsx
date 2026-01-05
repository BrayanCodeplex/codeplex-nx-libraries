import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

export interface CodeplexPilaProps extends Omit<MuiStackProps, 'direction' | 'spacing'> {
    /**
     * Define la dirección de la pila.
     */
    direccion?: MuiStackProps['direction'] | 'fila' | 'columna' | 'fila-reversa' | 'columna-reversa';
    /**
     * Define el espaciado entre los elementos.
     */
    espaciado?: MuiStackProps['spacing'];
    /**
     * Centra los hijos horizontal y verticalmente.
     */
    centrado?: boolean;
    /**
     * Aplica justifyContent: 'space-between'
     */
    entre?: boolean;
}

export const CodeplexPila = ({
    direccion,
    espaciado,
    centrado,
    entre,
    sx,
    alignItems,
    justifyContent,
    ...props
}: CodeplexPilaProps) => {
    let estilos = { ...sx };
    let alinear = alignItems;
    let justificar = justifyContent;

    if (centrado) {
        alinear = alinear || 'center';
        justificar = justificar || 'center';
    }
    if (entre) {
        justificar = 'space-between';
    }

    const mapDirection = (d: any): any => {
        if (d === 'fila') return 'row';
        if (d === 'columna') return 'column';
        if (d === 'fila-reversa') return 'row-reverse';
        if (d === 'columna-reversa') return 'column-reverse';
        return d;
    };

    return (
        <MuiStack
            direction={mapDirection(direccion)}
            spacing={espaciado}
            sx={estilos}
            alignItems={alinear}
            justifyContent={justificar}
            {...props}
        />
    );
};
