# @codeplex-sac/utils

Utilidades de bajo nivel y componentes auxiliares para la construcción de interfaces complejas.

## 📦 Instalación

```bash
pnpm add @mui/material @codeplex-sac/utils
```

---

## 🛠️ Utilidades de Comportamiento

### `<CodeplexDetectorClickFuera />` (Click Away Listener)
Detecta clics fuera del elemento hijo. Ideal para cerrar menús o dropdowns customizados.

```tsx
<CodeplexDetectorClickFuera alHacerClickFuera={() => setAbierto(false)}>
    <div className="menu-dropdown">
        ...
    </div>
</CodeplexDetectorClickFuera>
```
| Propiedad | Descripción |
| :--- | :--- |
| `alHacerClickFuera` | Callback ejecutado al detectar clic fuera. |

### `<CodeplexPortal />`
Renderiza hijos en un nodo DOM diferente (react portals).

| Propiedad | Descripción |
| :--- | :--- |
| `containerId` | ID del elemento DOM destino. |
| `container` | Referencia directa al nodo DOM (opcional). |

---

## 🪟 Ventanas y Capas

### `<CodeplexModal />`
Wrapper simplificado para Modales.
| Propiedad | Descripción |
| :--- | :--- |
| `titulo` | Título pre-estilizado en la cabecera. |
| `descripcion` | Texto descriptivo (`aria-describedby`). |
| `ancho` | Ancho del modal (default: 400). |
| `mostrarIconoCierre` | `boolean`. Botón "X" en la esquina. |

### `<CodeplexPopover />`
Popups anclados a elementos.
| Propiedad | Descripción |
| :--- | :--- |
| `title` | Título del popover. |
| `showCloseIcon` | Muestra botón de cierre. |
| `anchorEl` | Elemento al que se ancla. |

### `<CodeplexPopper />`
Posicionamiento avanzado (base de Tooltips/Popovers) usando Popper.js.
| Propiedad | Descripción |
| :--- | :--- |
| `withPaper` | `boolean`. Envuelve el contenido en un Paper elevado. |
| `closeOnClickAway` | `boolean`. Cierra al hacer clic fuera. |

---

## 📝 Entradas Especiales

### `<CodeplexTextareaAutosize />`
Textarea que crece con el contenido pero mantiene el estilo visual de los Inputs de Material UI.
| Propiedad | Descripción |
| :--- | :--- |
| `variant` | `'outlined' \| 'filled' \| 'standard'`. |
| `minRows` | Filas mínimas iniciales. |
| `error` | Estado visual de error (borde rojo). |

---

## 🎞️ Transiciones

Wrappers con timeouts por defecto suavizados para animaciones consistentes. Use las props estándar de MUI como `in`, `mountOnEnter`, `unmountOnExit`.

*   `CodeplexColapso` (Collapse)
*   `CodeplexDesvanecimiento` (Fade)
*   `CodeplexCrecimiento` (Grow)
*   `CodeplexZoom`
*   `CodeplexDeslizamiento` (Slide) - Prop extra: `direction` ('up', 'down', 'left', 'right').

```tsx
<CodeplexDesvanecimiento in={visible}>
    <div>Contenido animado</div>
</CodeplexDesvanecimiento>
```
