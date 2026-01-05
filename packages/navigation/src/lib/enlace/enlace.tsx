import { Link, LinkProps } from '@mui/material';

export interface CodeplexEnlaceProps extends Omit<LinkProps, 'underline'> {
    /**
     * If true, renders as a button (for a11y) but looks like a link.
     */
    componente?: React.ElementType;
    subrayado?: 'none' | 'hover' | 'always';
}

export const CodeplexEnlace = ({ componente, subrayado = 'hover', ...props }: CodeplexEnlaceProps) => {
    return <Link component={componente || 'a'} underline={subrayado} {...props} />;
};
