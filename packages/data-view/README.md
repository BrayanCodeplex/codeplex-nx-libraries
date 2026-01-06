# @codeplex-sac/data-view

Este paquete contiene la **CodeplexTabla**, el componente de visualización de datos definitivo para el ecosistema Codeplex.

## 🚀 CodeplexTabla

`CodeplexTabla` es una evolución "ultra-funcional" sobre [Material React Table V3](https://www.material-react-table.com/), diseñada para reducir el tiempo de desarrollo de días a minutos.

**Características Principales:**
*   🇪🇸 **API 100% en Español**: Propiedades intuitivas como `datos`, `columnas`, `fijarFilas`.
*   🔋 **Defaults Inteligentes**: Selección, ordenamiento, búsqueda y paginación activados por defecto.
*   🖌️ **Estilo Premium**: Modo "Headless" pre-configurado con bordes, sombras y espaciados cuidados.
*   🧠 **Funciones Avanzadas Simplificadas**: Agrupación, Totales, Pinning y Filtros Avanzados con flags simples.

---

### 📦 Instalación

```bash
# Instala las dependencias peer
pnpm add material-react-table @mui/material @mui/icons-material @emotion/react @mui/x-date-pickers dayjs
```

### 💻 Uso Básico

```tsx
import { CodeplexTabla, type MRT_ColumnDef } from '@codeplex-sac/data-view';

const columnas = [
    { accessorKey: 'nombre', header: 'Nombre' },
    { accessorKey: 'precio', header: 'Precio' },
];

const datos = [
    { nombre: 'Producto A', precio: 100 },
    { nombre: 'Producto B', precio: 200 },
];

export const MiPantalla = () => (
    <CodeplexTabla
        titulo="Inventario"
        datos={datos}
        columnas={columnas}
        habilitarExportacion // Activa botón de exportar
        seleccionable // Activa checkboxes
    />
);
```

---

### 📚 API de Propiedades (Props)

| Propiedad | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **`datos`** | `TData[]` | **Requerido** | Array de objetos fuente. |
| **`columnas`** | `MRT_ColumnDef[]` | **Requerido** | Definición de columnas. |
| **`titulo`** | `string` | `''` | Título mostrado en la cabecera. |
| **`cargando`** | `boolean` | `false` | Muestra indicador de progreso y bloquea interacción. |
| `habilitarExportacion` | `boolean` | `false` | Muestra botón y menú de exportación (CSV/Excel/PDF). |
| `filtrosAvanzados` | `boolean` | `false` | Activa facetas, autocompletado y modos (contiene, empieza con...). |
| `agrupamiento` | `boolean` | `false` | Permite al usuario arrastrar columnas para agrupar filas. |
| `fijarColumnas` | `boolean` | `false` | Fija automáticamente la selección (Izq) y acciones (Der). Permite pinning manual. |
| **`fijarFilas`** | `boolean` | `false` | Habilita el anclaje de filas (`row pinning`) superior/inferior. |
| **`mostrarTotales`** | `boolean` | `false` | Habilita el pie de página fijo (`sticky footer`) para agregaciones. |
| `ordenarFilas` | `boolean` | `false` | Permite Drag & Drop de filas (desactiva ordenamiento por columnas). |
| `seleccionable` | `boolean` | `true` | Muestra columnas de checkboxes para selección múltiple. |
| `expandible` | `boolean` | `false` | Permite expandir filas para ver sub-filas (árbol). |
| `scrollInfinito` | `boolean` | `false` | Cambia paginación por scroll infinito (requiere `onCargarMas`). |
| `opciones` | `MRT_TableOptions` | `{}` | **Poder Total**. Sobrescribe cualquier configuración interna de MRT. |

### 🛠️ Interacciones y Eventos

| Propiedad | Descripción |
| :--- | :--- |
| `onEditar` | `(row) => void`. Activa botón de lápiz. |
| `onEliminar` | `(row) => void`. Activa botón de basura. |
| `accionesMenu` | `({ row, closeMenu }) => ReactNode[]`. Inyecta items en el menú de 3 puntos. |
| `onCargarMas` | Callback para scroll infinito. |

---

### 🎨 Ejemplos Avanzados

#### 1. Totales y Formato Financiero

Para mostrar totales en el pie de página:
1. Activa `mostrarTotales`.
2. Configura la columna con `aggregationFn` y `Footer`.

```tsx
<CodeplexTabla
    mostrarTotales
    columnas={[
        {
            accessorKey: 'monto',
            header: 'Monto',
            // Alinear a la derecha
            muiTableHeadCellProps: { align: 'right' },
            muiTableBodyCellProps: { align: 'right' },
            muiTableFooterCellProps: { align: 'right' },
            // Formato Moneda
            Cell: ({ cell }) => cell.getValue<number>().toLocaleString('es-PE', { style: 'currency', currency: 'PEN' }),
            // Lógica de Totales
            aggregationFn: 'sum',
            Footer: ({ table }) => {
                const total = table.getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.getValue<number>('monto'), 0);
                return <Box>Total: {total}</Box>;
            }
        }
    ]}
/>
```

#### 2. Jerarquía Visual (Headers Anidados)

Usa la propiedad `columns` dentro de una columna para crear grupos, y `meta` para colores.

```tsx
{
    header: 'Finanzas',
    meta: { headerBackgroundColor: '#e3f2fd' }, // Color de fondo del grupo
    columns: [
        { accessorKey: 'ingreso', header: 'Ingreso' },
        { accessorKey: 'egreso', header: 'Egreso' }
    ]
}
```

#### 3. Modo Headless (Arquitectura Manual)

`CodeplexTabla` ahora se construye internamente de forma manual para máximo control visual. Si necesitas inyectar componentes entre el toolbar y la tabla, puedes usar los sub-componentes exportados:

```tsx
import { MRT_TableContainer, MRT_TopToolbar, ... } from '@codeplex-sac/data-view';
// ... Puedes armar tu propia estructura si CodeplexTabla te queda chica, 
// o usar la prop `opciones` para inyectar componentes en `renderTopToolbarCustomActions`.
```

### 🧩 Componentes Exportados

Además de `CodeplexTabla`, exportamos las piezas de MRT para que no tengas que importar de dos librerías:

*   `MRT_ColumnDef` (Tipos)
*   `MRT_Row` (Tipos)
*   `MRT_GlobalFilterTextField` (Input de búsqueda suelto)
*   `MRT_TablePagination` (Paginación suelta)
*   `MRT_ExpandAllButton` (Botón expandir todo)
*   ... ¡y todos los demás sub-componentes de MRT!
