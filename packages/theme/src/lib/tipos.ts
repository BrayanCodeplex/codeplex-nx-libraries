export type CodeplexTema = 'light' | 'dark';

export interface ContextoTemaTipo {
    tema: CodeplexTema;
    alternarTema: () => void;
    establecerTema: (tema: CodeplexTema) => void;
}
