import { Pagination, PaginationProps, Box } from '@mui/material';

export interface CodeplexPaginationProps extends PaginationProps {
    /**
     * If true, centers the pagination horizontally.
     */
    centered?: boolean;
}

export const CodeplexPagination = ({ centered, sx, ...props }: CodeplexPaginationProps) => {
    if (centered) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', ...sx }}>
                <Pagination {...props} />
            </Box>
        );
    }

    return <Pagination sx={sx} {...props} />;
};
