import { useContext } from 'react';
import { ContextoTema } from './proveedor';
import { ContextoTemaTipo } from './tipos';

export const usarTema = (): ContextoTemaTipo => {
    const context = useContext(ContextoTema);
    if (!context) {
        throw new Error('usarTema debe ser usado dentro de un CodeplexProveedorTema');
    }
    return context;
};

// Alias for backward compatibility if needed, but aiming for Spanish
export const useTheme = usarTema;
