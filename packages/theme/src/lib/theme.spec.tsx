import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { CodeplexThemeProvider, useTheme } from '../index';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Component to test hook usage
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} data-testid="toggle-btn">
      {theme}
    </button>
  );
};

describe('CodeplexThemeProvider', () => {
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

  it('should apply default theme (light)', () => {
    render(
      <CodeplexThemeProvider>
        <div>Test </div>
      </CodeplexThemeProvider>
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('codeplex-theme')).toBe('light');
  });

  it('should toggle theme', () => {
    render(
      <CodeplexThemeProvider>
        <TestComponent />
      </CodeplexThemeProvider>
    );

    const btn = screen.getByTestId('toggle-btn');
    expect(btn.textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    fireEvent.click(btn);

    expect(btn.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('codeplex-theme')).toBe('dark');
  });

  it('should respect defaultTheme prop', () => {
    render(
      <CodeplexThemeProvider defaultTheme="dark" >
        <div>Test </div>
      </CodeplexThemeProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
