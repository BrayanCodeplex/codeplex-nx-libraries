# @codeplex-sac/layout

Este paquete proporciona los cimientos estructurales y de navegación para aplicaciones Codeplex. Envuelve componentes primitivos de MUI y añade patrones de diseño comunes (Dashboards, Paneles, Grillas) con una API declarativa en español.

## 📦 Instalación

```bash
pnpm add @mui/material @emotion/react @emotion/styled @codeplex-sac/layout
```

---

## 🏗️ Estructura y Grilla

Bloques fundamentales para el maquetado de páginas.

### `<CodeplexCaja />` (Box)
Contenedor genérico ultra-flexible.
| Propiedad | Descripción |
| :--- | :--- |
| `centrado` | `boolean`. Centra contenido vertical y horizontalmente. |
| `pantallaCompleta` | `boolean`. Ancho y alto de viewport (100vw/vh). |
| `flexFila` / `flexColumna` | Atajos para dirección Flex. |

### `<CodeplexContenedor />` (Container)
Contenedor central con anchos máximos responsivos.
| Propiedad | Descripción |
| :--- | :--- |
| `fluido` | `boolean`. Ancho 100% sin máximos. |
| `paginaCentrada` | `boolean`. Altura 100vh y centro absoluto (ideal Login/404). |
| `anchoMaximo` | `'xs' | 'sm' | 'md' | 'lg' | 'xl'`. |
| `deshabilitarMargenes` | Elimina padding horizontal. |

### `<CodeplexCuadricula />` (Grid)
Sistema de rejilla de 12 columnas (MUI Grid v2).
| Propiedad | Descripción |
| :--- | :--- |
| `contenedor` | Activa el modo contenedor (padre). |
| `elemento` | Activa el modo ítem (hijo). |
| `espaciado` | Número (x8px) de separación. |
| `xs`, `md`, `lg`... | Número de columnas (1-12) u 'auto'. |

### `<CodeplexColumna />` (Div + Tailwind)
Alternativa ligera a Grid para columnas responsivas simples.
| Propiedad | Descripción |
| :--- | :--- |
| `xs`, `sm`, `md`... | Número de columnas (1-12). Ejemplo: `md={6}` (50%). |
| `etiqueta` | Tag HTML (default `div`). |

### `<CodeplexFila />`
Contenedor Flex horizontal con wrap automático y gutters negativos. Útil para agrupar tarjetas o inputs.
| Propiedad | Descripción |
| :--- | :--- |
| `alineacion` | `'start' | 'center' | 'end' | 'stretch'`. |
| `justificacion` | `'start' | 'center' | 'between' | 'around'`. |
| `sinMargenes` | Quita los márgenes negativos de corrección. |

### `<CodeplexPila />` (Stack)
Lista vertical u horizontal de elementos con espaciado uniforme.
| Propiedad | Descripción |
| :--- | :--- |
| `direccion` | `'fila' | 'columna'`. |
| `espaciado` | Separación entre hijos. |
| `entre` | `justify-content: space-between`. |

---

## 🧭 Navegación Principal

Componentes de alto nivel para Layouts de Aplicación (Dashboards, Landings).

### `<CodeplexBarraLateral />` (Sidebar)
Menú lateral colapsable para dashboards.
| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `elementos` | `CodeplexElementoMenuLateral[]` | Array de objetos con `id`, `etiqueta`, `icono`, `href`, `hijos`. |
| `usuario` | `CodeplexInfoUsuario` | Datos del usuario mostrados al pie. |
| `colapsado` | `boolean` | Estado controlado del colapso. |
| `alAlternar` | `(c: boolean) => void` | Callback de colapso. |

### `<CodeplexBarraNavegacion />` (Navbar)
Barra superior para Landing Pages o Apps simples.
| Propiedad | Descripción |
| :--- | :--- |
| `textoLogo` / `srcLogo` | Identidad de marca. |
| `enlaces` | Array de links simples (`etiqueta`, `href`). |
| `posicion` | `'fixed' | 'sticky' | 'static'`. |
| `children` | Slots para acciones extra (derecha). |

### `<CodeplexCabecera />` (Header Dashboard)
Barra superior para Dashboards, complementa a la Barra Lateral.
| Propiedad | Descripción |
| :--- | :--- |
| `titulo` | Título de la página actual. |
| `migasPan` | Array `{ etiqueta, href }` para Breadcrumbs. |
| `mostrarBusqueda` | `boolean`. Muestra input de búsqueda global. |
| `conteoNotificaciones` | Número para el badge de campana. |

### `<CodeplexPiePagina />` (Footer)
| Propiedad | Descripción |
| :--- | :--- |
| `derechosAutor` | String custom de copyright. |
| `redesSociales` | Objeto `{ facebook, twitter, github, linkedin }` con URLs. |

---

## 🗂️ Contenidos y Paneles

### `<CodeplexAcordeon />`
Lista de paneles expandibles.
| Propiedad | Descripción |
| :--- | :--- |
| `elementos` | Array `{ titulo, contenido, iconoIzquierda, subtitulo }`. |
| `multiple` | Permite varios abiertos a la vez. |
| `variante` | `'simple' | 'bordeado' | 'separado'`. |

### `<CodeplexPanelLateral />` (Drawer)
Panel deslizante (Off-canvas) para detalles o formularios sin salir de la página.
| Propiedad | Descripción |
| :--- | :--- |
| `abierto` | `boolean`. Controla visibilidad. |
| `lado` | `'izquierda' | 'derecha'`. |
| `tamano` | `'sm' | 'md' | 'lg' | 'xl' | 'full'`. |
| `titulo` / `descripcion` | Cabecera del panel. |
| `pie` | Slot para botones de acción (Guardar/Cancelar) fijos al fondo. |

---

## 🖼️ Multimedia

### `<CodeplexListaImagenes />`
Mosaico de imágenes (Masonry o Grid estándar).
*   **Subcomponentes**: `CodeplexElementoListaImagenes`, `CodeplexBarraElementoListaImagenes`.
*   Propiedades espejo de MUI ImageList (`columnas`, `altoFila`, `variante`).

---

### 💡 Ejemplo: Layout de Dashboard Completo

```tsx
import { 
  CodeplexCaja, 
  CodeplexBarraLateral, 
  CodeplexCabecera 
} from '@codeplex-sac/layout';

export const DashboardLayout = ({ children }) => {
  const [colapsado, setColapsado] = useState(false);

  return (
    <CodeplexCaja flexFila pantallaCompleta>
        {/* 1. Menú Lateral */}
        <CodeplexBarraLateral 
            colapsado={colapsado} 
            alAlternar={setColapsado}
            elementos={MENU_ITEMS}
        />

        {/* 2. Área Principal */}
        <CodeplexCaja flexColumna sx={{ flex: 1, overflow: 'hidden' }}>
            {/* Header */}
            <CodeplexCabecera 
                titulo="Inicio" 
                barraLateralColapsada={colapsado}
            />
            
            {/* Contenido con Scroll */}
            <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
                {children}
            </main>
        </CodeplexCaja>
    </CodeplexCaja>
  );
};
```
