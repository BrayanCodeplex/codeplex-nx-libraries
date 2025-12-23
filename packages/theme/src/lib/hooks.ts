import { useContext } from 'react';
import { ThemeContext } from './provider';
import { ThemeContextType } from './types';

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CodeplexThemeProvider');
    }
    return context;
};
