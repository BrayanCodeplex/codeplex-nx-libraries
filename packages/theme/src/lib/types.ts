export type CodeplexTheme = 'light' | 'dark';

export interface ThemeContextType {
    theme: CodeplexTheme;
    toggleTheme: () => void;
    setTheme: (theme: CodeplexTheme) => void;
}
