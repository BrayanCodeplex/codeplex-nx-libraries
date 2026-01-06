# @codeplex-sac/date-pickers

Este paquete proporciona componentes de selección de fecha y hora estandarizados para el ecosistema Codeplex, construidos sobre **MUI X Date Pickers** y **Day.js**, totalmente localizados al español.

## 🚀 Componentes Incluidos

### Selectores (Inputs)
*   📅 **CodeplexSelectorFecha**: Input para fecha (Día/Mes/Año).
*   🕒 **CodeplexSelectorFechaHora**: Input para fecha y hora exacta.
*   ⏰ **CodeplexSelectorHora**: Input solo para hora.

### Visualización
*   📟 **CodeplexRelojDigital**: Reloj digital visual para selección rápida de hora.

### Utilidades
*   🌐 **CodeplexProveedorFechas**: Contexto necesario para localización (ES).

---

### 📦 Instalación

```bash
# Instala las dependencias y el paquete
pnpm add @mui/x-date-pickers dayjs @codeplex-sac/date-pickers
```

### 💻 Uso Básico

Para que los selectores funcionen, **debes envolver tu aplicación (o la parte que los use)** con el `CodeplexProveedorFechas`.

```tsx
import { CodeplexProveedorFechas, CodeplexSelectorFecha } from '@codeplex-sac/date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export const MiFormulario = () => {
    const [fecha, setFecha] = useState<Dayjs | null>(dayjs());

    return (
        // 1. Proveedor (Puede estar en App.tsx o main.tsx)
        <CodeplexProveedorFechas>
            
            {/* 2. Selector de Fecha */}
            <CodeplexSelectorFecha
                etiqueta="Fecha de Nacimiento"
                value={fecha}
                onChange={(newValue) => setFecha(newValue)}
                textoAyuda="Seleccione una fecha válida"
            />

        </CodeplexProveedorFechas>
    );
};
```

---

### 📚 API de Componentes

#### Selectores de Fecha/Hora

Los componentes `<CodeplexSelectorFecha />`, `<CodeplexSelectorFechaHora />` y `<CodeplexSelectorHora />` comparten la misma API unificada:

| Propiedad | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **`etiqueta`** | `string` | - | Reemplaza a `label`. El título del input. |
| **`value`** | `Dayjs \| null` | - | El valor controlado tipo Dayjs. |
| **`onChange`** | `(value: Dayjs \| null) => void` | - | Callback al cambiar el valor. |
| `textoAyuda` | `string` | - | Mensaje debajo del input (helperText). |
| `error` | `boolean` | `false` | Pone el input en estado de error (rojo). |
| `anchoCompleto` | `boolean` | `true` | Si ocupa el 100% del contenedor padre. |
| `disabled` | `boolean` | `false` | Deshabilita el input. |
| `readOnly` | `boolean` | `false` | Modo solo lectura. |
| `slotProps` | `object` | `{}` | Acceso a props internas de MUI. |

#### `<CodeplexRelojDigital />`

Un componente visual de reloj (sin input de texto).

| Propiedad | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| **`value`** | `Dayjs \| null` | - | El valor seleccionado. |
| **`onChange`** | `(value: Dayjs \| null) => void` | - | Callback al seleccionar hora. |
| `conPapel` | `boolean` | `true` | Envuelve el reloj en una tarjeta (`Paper`) con sombra. |

#### `<CodeplexProveedorFechas />`

Componente contenedor obligatorio.

| Propiedad | Descripción |
| :--- | :--- |
| `children` | Los componentes de tu app. |
| `idioma` | Locale de dayjs (por defecto `'es'`). |

---

### 🎨 Ejemplos

#### Selector de Hora

```tsx
import { CodeplexSelectorHora } from '@codeplex-sac/date-pickers';

<CodeplexSelectorHora
    etiqueta="Hora de Inicio"
    value={hora}
    onChange={setHora}
    anchoCompleto
/>
```

#### Reloj Digital Independiente

```tsx
import { CodeplexRelojDigital } from '@codeplex-sac/date-pickers';

<CodeplexRelojDigital 
    conPapel={false} // Sin borde/fondo
    onChange={manejarCambioHora}
/>
```

### ⚠️ Notas Importantes (Day.js)

Recuerda que todos los valores (`value`) deben ser objetos `dayjs()`.
*   ✅ `dayjs('2024-01-01')`
*   ❌ `new Date()`

El paquete ya incluye e inicializa `dayjs/locale/es`.
