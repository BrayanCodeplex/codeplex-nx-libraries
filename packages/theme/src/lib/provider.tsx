import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CodeplexTheme, ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'codeplex-theme';

export interface CodeplexThemeProviderProps {
    children: ReactNode;
    defaultTheme?: CodeplexTheme;
}

export const CodeplexThemeProvider: React.FC<CodeplexThemeProviderProps> = ({
    children,
    defaultTheme = 'light',
}) => {
    // Initialize state lazily to avoid hydration mismatch if possible, 
    // but for SPA simple effect is fine. 
    // We prefer reading from localStorage immediately to prevent flash.
    const [theme, setThemeState] = useState<CodeplexTheme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(THEME_STORAGE_KEY) as CodeplexTheme;
            if (saved === 'light' || saved === 'dark') {
                return saved;
            }
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return defaultTheme;
    });

    const applyTheme = useCallback((newTheme: CodeplexTheme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    const setTheme = useCallback((newTheme: CodeplexTheme) => {
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
