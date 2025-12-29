# @codeplex-qwik/data-view

Este paquete contiene componentes avanzados de visualización de datos, centrados principalmente en **CodeplexTable**.

## CodeplexTable

`CodeplexTable` es un wrapper robusto y estilizado sobre [Material React Table V3](https://www.material-react-table.com/), diseñado para ofrecer:

*   🎨 **Estilado Premium**: Sombras suaves, bordes redondeados y una estética limpia lista para usar.
*   🇪🇸 **Localización Automática**: Configurado en **Español** por defecto.
*   ⚡ **Flexibilidad Total**: Permite sobrescribir cualquier configuración de MRT a través de la prop `options`.
*   📦 **Re-exportaciones Útiles**: Exporta utilidades de MRT para facilitar la creación de toolbars personalizados.

---

### Instalación

Asegúrate de tener las dependencias necesarias en tu proyecto:

```bash
pnpm add material-react-table @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-date-pickers dayjs
```

### Uso Básico

```tsx
import { CodeplexTable, type MRT_ColumnDef } from '@codeplex-qwik/data-view';
import { useMemo } from 'react';

// 1. Definir la forma de tus datos
type Usuario = {
  id: string;
  nombre: string;
  correo: string;
};

export const MiTabla = () => {
  // 2. Definir columnas
  const columns = useMemo<MRT_ColumnDef<Usuario>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre Completo',
      },
      {
        accessorKey: 'correo',
        header: 'Email',
      },
    ],
    []
  );

  // 3. Tus datos
  const data = [
    { id: '1', nombre: 'Juan Pérez', correo: 'juan@example.com' },
    { id: '2', nombre: 'Ana Gómez', correo: 'ana@example.com' },
  ];

  return (
    <CodeplexTable
      title="Usuarios del Sistema"
      columns={columns}
      data={data}
    />
  );
};
```

### Props

| Prop | Tipo | Descripción |
|Ref |Ref |Ref |
| --- | --- | --- |
| `data` | `TData[]` | **Requerido**. Array de objetos con los datos a mostrar. |
| `columns` | `MRT_ColumnDef<TData>[]` | **Requerido**. Definición de las columnas. |
| `title` | `string` | Opcional. Muestra un título estilizado en la parte superior izquierda. |
| `loading` | `boolean` | Opcional. Muestra un indicador de carga (skeleton/spinner). |
| `options` | `Partial<MRT_TableOptions<TData>>` | Opcional. Objeto de configuración profunda. **Aquí puedes sobrescribir CUALQUIER propiedad de Material React Table** (paginación, toolbars, acciones, temas, etc.). |

---

### Uso Avanzado: Personalización Total

Puedes usar la prop `options` para habilitar características avanzadas como selección de filas, expansión, edición, filtros personalizados, etc.

```tsx
<CodeplexTable
  columns={columns}
  data={data}
  loading={isLoading}
  options={{
    // Habilitar características de MRT
    enableRowSelection: true,
    enableColumnOrdering: true,
    enablePinning: true,
    
    // Personalizar Toolbar Superior
    renderTopToolbarCustomActions: ({ table }) => (
      <Button onClick={() => console.log(table.getSelectedRowModel())}>
        Acción en Lote
      </Button>
    ),

    // Props de MUI (Estilos profundos)
    muiTableHeadCellProps: {
      sx: { color: 'primary.main' },
    },
    
    // Paginación personalizada
    initialState: {
        pagination: { pageSize: 20, pageIndex: 0 }
    }
  }}
/>
```

### Localización

El componente viene traducido al **Español** (`MRT_Localization_ES`) por defecto. Si necesitas cambiarlo (por ejemplo a Inglés), puedes hacerlo vía `options`:

```tsx
import { MRT_Localization_EN } from 'material-react-table/locales/en';

<CodeplexTable
  // ...
  options={{
    localization: MRT_Localization_EN
  }}
/>
```

### Componentes Exportados

Para facilitar la personalización (especialmente en Custom Toolbars), el paquete re-exporta:

*   `MRT_GlobalFilterTextField`: El campo de búsqueda global.
*   `MRT_ToggleFiltersButton`: El botón para mostrar/ocultar filtros de columna.
*   Tipos: `MRT_ColumnDef`, `MRT_RowData`, `MRT_TableOptions`.

Importalos directamente:

```tsx
import { MRT_GlobalFilterTextField } from '@codeplex-qwik/data-view';
```
