import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CodeplexTema, ContextoTemaTipo } from './tipos';

export const ContextoTema = createContext<ContextoTemaTipo | undefined>(undefined);

const CLAVE_ALMACENAMIENTO_TEMA = 'codeplex-theme';

export interface CodeplexProveedorTemaProps {
    children: ReactNode;
    temaPorDefecto?: CodeplexTema;
}

export const CodeplexProveedorTema: React.FC<CodeplexProveedorTemaProps> = ({
    children,
    temaPorDefecto = 'light',
}) => {
    // Initialize state lazily to avoid hydration mismatch if possible, 
    // but for SPA simple effect is fine. 
    // We prefer reading from localStorage immediately to prevent flash.
    const [tema, setTemaState] = useState<CodeplexTema>(() => {
        if (typeof window !== 'undefined') {
            const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO_TEMA) as CodeplexTema;
            if (guardado === 'light' || guardado === 'dark') {
                return guardado;
            }
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return temaPorDefecto;
    });

    const aplicarTema = useCallback((nuevoTema: CodeplexTema) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(nuevoTema);
        localStorage.setItem(CLAVE_ALMACENAMIENTO_TEMA, nuevoTema);
    }, []);

    useEffect(() => {
        aplicarTema(tema);
    }, [tema, aplicarTema]);

    const establecerTema = useCallback((nuevoTema: CodeplexTema) => {
        setTemaState(nuevoTema);
    }, []);

    const alternarTema = useCallback(() => {
        setTemaState((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ContextoTema.Provider value={{ tema, alternarTema, establecerTema }}>
            {children}
        </ContextoTema.Provider>
    );
};

// Aliases for compat
export const CodeplexThemeProvider = ({ defaultTheme, ...props }: any) => (
    <CodeplexProveedorTema temaPorDefecto={defaultTheme} {...props} />
);
export const ThemeContext = ContextoTema;
