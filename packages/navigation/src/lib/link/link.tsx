import { Link, LinkProps } from '@mui/material';

export interface CodeplexLinkProps extends LinkProps {
    /**
     * If true, renders as a button (for a11y) but looks like a link.
     */
    component?: React.ElementType;
}

export const CodeplexLink = ({ component, ...props }: CodeplexLinkProps) => {
    return <Link component={component || 'a'} {...props} />;
};
