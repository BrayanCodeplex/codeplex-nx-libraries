import { render, screen, fireEvent } from '@testing-library/react';
import { CodeplexProveedorTema, usarTema } from '../index';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Component to test hook usage
const ComponentePrueba = () => {
  const { tema, alternarTema } = usarTema();
  return (
    <button onClick={alternarTema} data-testid="boton-alternar">
      {tema}
    </button>
  );
};

describe('CodeplexProveedorTema', () => {
  beforeEach(() => {
    // Clear localStorage and document classList
    localStorage.clear();
    document.documentElement.className = '';

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('debería aplicar el tema por defecto (light)', () => {
    render(
      <CodeplexProveedorTema>
        <div>Prueba</div>
      </CodeplexProveedorTema>
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('codeplex-theme')).toBe('light');
  });

  it('debería alternar el tema', () => {
    render(
      <CodeplexProveedorTema>
        <ComponentePrueba />
      </CodeplexProveedorTema>
    );

    const btn = screen.getByTestId('boton-alternar');
    expect(btn.textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    fireEvent.click(btn);

    expect(btn.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('codeplex-theme')).toBe('dark');
  });

  it('debería respetar la propiedad temaPorDefecto', () => {
    render(
      <CodeplexProveedorTema temaPorDefecto="dark" >
        <div>Prueba</div>
      </CodeplexProveedorTema>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
