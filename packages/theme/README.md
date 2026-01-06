# @codeplex-sac/theme

Gestor de temas ligero para aplicaciones Codeplex. Maneja automáticamente el modo oscuro (`dark mode`) mediante clases CSS en el documento y persistencia en `localStorage`.

## 📦 Instalación

```bash
pnpm add @codeplex-sac/theme
```

---

## 🚀 Uso Rápido

### 1. Envolver la Aplicación

Debes envolver tu árbol de componentes (idealmente en `App.tsx` o `main.tsx`) con el `<CodeplexProveedorTema />`.

```tsx
import { CodeplexProveedorTema } from '@codeplex-sac/theme';

const Root = () => (
    <CodeplexProveedorTema temaPorDefecto="light">
        <App />
    </CodeplexProveedorTema>
);
```

### 2. Usar el Hook

Usa `usarTema()` en cualquier componente hijo para leer o cambiar el modo.

```tsx
import { usarTema } from '@codeplex-sac/theme';

const InterruptorTema = () => {
    const { tema, alternarTema } = usarTema();

    return (
        <button onClick={alternarTema}>
            {tema === 'light' ? '🌙 Activar Modo Oscuro' : '☀️ Activar Modo Claro'}
        </button>
    );
};
```

---

## 📚 API

### `<CodeplexProveedorTema />`

Componente proveedor que inicializa el tema.

| Propiedad | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Requerido** | El contenido de la aplicación. |
| `temaPorDefecto` | `'light' \| 'dark'` | `'light'` | Tema inicial si no hay preferencia guardada. |

**Comportamiento automático:**
1.  Busca en `localStorage` la clave `codeplex-theme`.
2.  Si no encuentra nada, revisa la preferencia del sistema operativo (`prefers-color-scheme`).
3.  Aplica la clase `dark` o `light` al elemento `<html>`.

### `usarTema()`

Hook para consumir el contexto. Retorna un objeto con:

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **`tema`** | `'light' \| 'dark'` | El estado actual del tema. |
| **`alternarTema`** | `() => void` | Función para cambiar al opuesto (toggle). |
| **`establecerTema`** | `(t: 'light' \| 'dark') => void` | Función para forzar un tema específico. |

---

## 🎨 Integración con Tailwind

Este paquete está diseñado para funcionar perfectamente con Tailwind CSS. Asegúrate de tener configurado tu `tailwind.config.js` para usar la estrategia de clases:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // <--- Importante
  // ...
}
```

Así, cuando `CodeplexProveedorTema` añade la clase `dark` al `html`, tus utilidades `dark:bg-slate-900` se activarán automáticamente.
