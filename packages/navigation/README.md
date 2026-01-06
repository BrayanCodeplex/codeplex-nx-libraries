# @codeplex-sac/navigation

Colección de componentes de navegación diseñada para cubrir todas las necesidades de movimiento dentro de las aplicaciones Codeplex, desde menús simples hasta complejos flujos de pasos.

## 📦 Instalación

```bash
pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material @codeplex-sac/navigation
```

---

## 🧭 Menús y Barras

### `<CodeplexCajonLateral />` (Drawer)
Panel deslizante para menús principales o filtros. Soporta modo "Deslizable" (Swipeable) para móviles.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `abierto` | `boolean` | Controla la visibilidad. |
| `anclaje` | `'left' \| 'right'` | Lado de aparición. |
| `deslizable` | `boolean` | Activa soporte táctil (SwipeableDrawer). |
| `ancho` | `number \| string` | Ancho del panel (default: 280). |
| `cabecera` | `ReactNode` | Contenido superior fijo (Logo, Título). |
| `pie` | `ReactNode` | Contenido inferior fijo. |

```tsx
<CodeplexCajonLateral 
    abierto={open} 
    anclaje="left" 
    cabecera={<Logo />} 
    pie={<LogOutButton />}
>
    <ListaMenu />
</CodeplexCajonLateral>
```

### `<CodeplexNavegacionInferior />` (Bottom Nav)
Barra de pestañas inferior, el estándar para apps móviles.

| Propiedad | Descripción |
| :--- | :--- |
| `elementos` | Array `{ etiqueta, icono, valor }`. |
| `fijo` | `boolean`. Fija la barra al fondo de la pantalla (`position: fixed`). |
| `conPapel` | `boolean`. Añade elevación y fondo (Paper). |

---

## 📍 Ubicación y Flujo

### `<CodeplexMigasPan />` (Breadcrumbs)
Muestra la ruta actual. Añade automáticamente un icono de "Inicio" si se define `rutaInicio`.

```tsx
<CodeplexMigasPan 
    rutaInicio="/"
    elementos={[
        { etiqueta: 'Configuración', href: '/settings' },
        { etiqueta: 'Perfil', href: '/settings/profile' }, // Último activo
    ]} 
/>
```

### `<CodeplexPasos />` (Stepper)
Ideal para wizards o formularios largos.

| Propiedad | Descripción |
| :--- | :--- |
| `pasos` | Array `{ etiqueta, leyenda, opcional, error, completado }`. |
| `pasoActivo` | Índice del paso actual (0-based). |
| `noLineal` | `boolean`. Permite saltar entre pasos haciendo clic. |
| `etiquetaAlternativa` | `boolean`. Pone los textos debajo de los círculos. |

### `<CodeplexPaginacion />`
Navegación entre páginas de datos.

| Propiedad | Descripción |
| :--- | :--- |
| `total` | Número total de páginas (`count`). |
| `pagina` | Página actual. |
| `centrado` | `boolean`. Centra horizontalmente el paginador. |

---

## 🔗 Interacción

### `<CodeplexPestanas />` (Tabs)
Organización de contenido en pestañas.

| Propiedad | Descripción |
| :--- | :--- |
| `elementos` | Array `{ etiqueta, valor, icono, disabled }`. |
| `valor` | Valor de la pestaña activa. |
| `centrado` | `boolean`. Centra las pestañas en el contenedor. |

### `<CodeplexEnlace />` (Link)
Enlace estilizado estándar.

| Propiedad | Descripción |
| :--- | :--- |
| `subrayado` | `'none' \| 'hover' \| 'always'`. |
| `componente` | Permite cambiar el nodo raíz (útil para `react-router-dom Link`). |

```tsx
<CodeplexEnlace componente={RouterLink} to="/home">
    Ir al Inicio
</CodeplexEnlace>
```

### `<CodeplexMarcacionRapida />` (Speed Dial)
Botón flotante (FAB) que despliega acciones secundarias.

| Propiedad | Descripción |
| :--- | :--- |
| `acciones` | Array `{ icono, tituloTooltip, alHacerClick }`. |
| `direction` | Dirección de apertura (`up`, `down`, `left`, `right`). |

### `<CodeplexMenu />`
Menú emergente estándar (Dropdown).

| Propiedad | Descripción |
| :--- | :--- |
| `elementos` | Array `{ etiqueta, icono, alHacerClick }`. |
| `elementoAnclaje` | Elemento HTML al que se pega el menú. |

---

## 🎨 Patrones Comunes

### Navegación Móvil Fija
Para crear una app móvil con barra inferior fija:
```tsx
<CodeplexNavegacionInferior
    fijo
    valor={pestana}
    alCambiar={(_, v) => setPestana(v)}
    elementos={[
        { label: 'Inicio', valor: 'home', icon: <HomeIcon /> },
        { label: 'Perfil', valor: 'profile', icon: <PersonIcon /> }
    ]}
/>
```

### Wizard de Registro
```tsx
<CodeplexPasos
    pasoActivo={paso}
    etiquetaAlternativa
    pasos={[
        { etiqueta: 'Cuenta', leyenda: 'Datos de acceso' },
        { etiqueta: 'Perfil', opcional: true },
        { etiqueta: 'Confirmación' }
    ]}
/>
```
