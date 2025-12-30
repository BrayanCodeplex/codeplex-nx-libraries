import React from 'react';
import { Portal as MuiPortal, PortalProps as MuiPortalProps } from '@mui/material';

export interface CodeplexPortalProps extends Omit<MuiPortalProps, 'container'> {
    /**
     * An HTML element, component instance, or function that returns either.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container?: MuiPortalProps['container'];
    /**
     * Convenience prop to specify the ID of the container element.
     * If provided, it overrides the `container` prop.
     */
    containerId?: string;
    children: React.ReactNode;
}

export const CodeplexPortal = ({ container, containerId, children, ...props }: CodeplexPortalProps) => {
    const [mountNode, setMountNode] = React.useState<Element | null>(null);

    React.useEffect(() => {
        if (containerId) {
            const el = document.getElementById(containerId);
            if (el) setMountNode(el);
        }
    }, [containerId]);

    const resolvedContainer = containerId ? mountNode : container;

    // If containerId is provided but element not found yet, don't render (avoid hydration mismatch or null errors)
    if (containerId && !mountNode) return null;

    return <MuiPortal container={resolvedContainer} {...props}>{children}</MuiPortal>;
};
