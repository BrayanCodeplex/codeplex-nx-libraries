# @codeplex-sac/ui

Biblioteca de componentes atómicos y moleculares para interfaces Codeplex. Envuelve Material UI con estilos personalizados, valores por defecto mejorados y una API en español.

## 📦 Instalación

```bash
pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material @codeplex-sac/ui
```

---

## 🔘 Entradas y Formularios

### `<CodeplexBoton />`
Botón vitaminado con soporte para estados de carga e iconos.

```tsx
<CodeplexBoton 
    variante="primary" 
    texto="Guardar Cambios" 
    cargando={guardando} 
    alHacerClick={guardar} 
/>
```
| Propiedad | Descripción |
| :--- | :--- |
| `variante` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'`. |
| `tamano` | `'xs' \| 'sm' \| 'md' \| 'lg'`. |
| `cargando` | `boolean`. Muestra spinner y deshabilita. |
| `iconoIzquierda` | Nodo React para icono previo al texto. |

### `<CodeplexCampoTexto />` (TextField)
Input de texto estilizado.
| Propiedad | Descripción |
| :--- | :--- |
| `etiqueta` | Label flotante. |
| `textoAyuda` | Mensaje inferior (helperText). |
| `error` | Estado de error visual. |

### `<CodeplexSelector />` (Select/Dropdown)
Selector simple o múltiple con soporte para chips.
| Propiedad | Descripción |
| :--- | :--- |
| `opciones` | Array `{ valor, etiqueta, deshabilitado }`. |
| `multiple` | `boolean`. Permite selección múltiple (usa Chips). |
| `marcador` | Placeholder (texto cuando está vacío). |

### Otros Inputs
*   **`<CodeplexCasilla />` (Checkbox)**: `etiqueta`, `marcado`, `alCambiar`.
*   **`<CodeplexInterruptor />` (Switch)**: `etiqueta`, `marcado`, `alCambiar`.
*   **`<CodeplexGrupoRadio />`**: `opciones`, `direccion` ('fila'/'columna').
*   **`<CodeplexAutocompletado />`**: Búsqueda y selección asíncrona.

---

## 💬 Feedback y Alertas

### `<CodeplexAlerta />`
Mensajes de estado con iconos semánticos.
```tsx
<CodeplexAlerta 
    variante="warning" 
    titulo="Atención" 
    descripcion="Tu sesión expirará pronto." 
    cerrable 
/>
```
| Propiedad | Descripción |
| :--- | :--- |
| `variante` | `'info' \| 'success' \| 'warning' \| 'danger'`. |
| `diseno` | `'standard' \| 'filled' \| 'outlined'`. |
| `cerrable` | Muestra botón X para cerrar localmente. |

### `<CodeplexDialogo />` (Modal)
Ventana emergente compuesta.
*   **Subcomponentes**: `CodeplexDialogoTitulo`, `CodeplexDialogoContenido`, `CodeplexDialogoAcciones`.
```tsx
<CodeplexDialogo open={abierto} onClose={cerrar}>
    <CodeplexDialogoTitulo>Confirmar</CodeplexDialogoTitulo>
    <CodeplexDialogoContenido>¿Seguro que deseas eliminar?</CodeplexDialogoContenido>
    <CodeplexDialogoAcciones>
        <CodeplexBoton variante="ghost" texto="Cancelar" onClick={cerrar} />
        <CodeplexBoton variante="danger" texto="Eliminar" onClick={eliminar} />
    </CodeplexDialogoAcciones>
</CodeplexDialogo>
```

### `<CodeplexCargando />` (Spinner/Skeleton)
Indicadores de progreso.
*   Usa `tipo="circular"` o `tipo="lineal"` para barras de progreso.
*   Usa `<CodeplexEsqueleto />` para placeholders de carga (shimmer).

---

## 📊 Visualización de Datos

### `<CodeplexTarjeta />` (Card)
Contenedor elevado para agrupamiento de información.
| Propiedad | Descripción |
| :--- | :--- |
| `titulo` | Cabecera opcional. |
| `sombra` | Nivel de elevación (`none`, `sm`, `md`...). |
| `borde` | `boolean`. Añade borde sutil. |

### `<CodeplexEtiqueta />` y `<CodeplexInsignia />` (Tag/Badge)
*   **Insignia**: Contador o punto sobre un elemento (ej. notificaciones).
*   **Etiqueta**: Chips de texto (ej. "Activo", "Pendiente") con colores semánticos.

### `<CodeplexAvatarUsuario />`
Muestra imagen de perfil o iniciales.
| Propiedad | Descripción |
| :--- | :--- |
| `nombre` | Genera iniciales si no hay imagen. |
| `src` | URL de la imagen. |
| `tamano` | `'sm'`, `'md'`, `'lg'`, `'xl'`. |

---

## 📋 Lista Completa de Componentes

| Categoría | Componentes Disponibles |
| :--- | :--- |
| **Entradas** | `Autocompletado`, `Boton`, `CampoNumero`, `CampoTexto`, `Casilla`, `Deslizador`, `GrupoBotones`, `GrupoRadio`, `Interruptor`, `Selector`, `Valoracion`. |
| **Feedback** | `Alerta`, `Anuncio`, `Cargando`, `Dialogo`, `MensajeEmergente` (Toast), `Notificacion`, `Progreso`, `Esqueleto`. |
| **Datos** | `AvatarUsuario`, `Etiqueta`, `Insignia` (Badge), `ListaTransferencia`, `Tarjeta`. |
| **Utilidades** | `AyudaEntrada`, `EncabezadoPrincipal`, `Teclado` (Virtual). |

---

> **Nota de Diseño**: Todos los componentes siguen el patrón de "API en Español". Si buscas una propiedad de MUI (ej. `onClick`), busca su equivalente (ej. `alHacerClick`). Las propiedades nativas de HTML y muchas de MUI se pasan directamente (`...props`).
