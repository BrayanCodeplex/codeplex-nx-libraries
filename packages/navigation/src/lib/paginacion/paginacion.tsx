import { Pagination, PaginationProps, Box } from '@mui/material';

export interface CodeplexPaginacionProps extends Omit<PaginationProps, 'count' | 'page' | 'onChange'> {
    total?: number;
    pagina?: number;
    alCambiar?: PaginationProps['onChange'];
    /**
     * If true, centers the pagination horizontally.
     */
    centrado?: boolean;
}

export const CodeplexPaginacion = ({
    total,
    pagina,
    alCambiar,
    centrado,
    sx,
    ...props
}: CodeplexPaginacionProps) => {
    if (centrado) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', ...sx }}>
                <Pagination count={total} page={pagina} onChange={alCambiar} {...props} />
            </Box>
        );
    }

    return <Pagination count={total} page={pagina} onChange={alCambiar} sx={sx} {...props} />;
};
