# 📦 Guía de Publicación a NPM (usando PNPM)

Esta guía detalla paso a paso cómo compilar y subir tus paquetes (`@codeplex-sac/ui`, `@codeplex-sac/theme`, `@codeplex-sac/layout`, `@codeplex-sac/data-view`) al registro público de NPM utilizando **pnpm**.

## 1. Prerrequisitos

Asegúrate de tener una cuenta en [npmjs.com](https://www.nodejs.com/).

### Login en la consola
Abre tu terminal en la raíz del proyecto y loguéate:

```bash
pnpm login
```
*Sigue las instrucciones en pantalla para autenticarte vía navegador.*

---

## 2. Preparación y Compilación

Debes construir los paquetes para generar los archivos listos para producción.

### Ejecutar Build
Compila todos los paquetes con un solo comando usando Nx (a través de pnpm):

```bash
pnpm nx run-many -t build --projects=ui,theme,layout,data-view
```

Esto generará los artefactos en la carpeta `dist/packages/`.

---

## 3. Versionado (Opcional pero Recomendado)

Antes de publicar, es buena práctica actualizar el número de versión.

Puedes hacerlo manualmente editando el archivo `packages/ui/package.json`, etc.
O usando CLI:

```bash
cd packages/ui
pnpm version patch # o minor, major
```
*(Recuerda recompilar si el número de versión se inserta en el código fuente).*

---

## 4. Publicación

La publicación se realiza **desde la carpeta de distribución** (`dist`).
Al usar `pnpm publish` desde una carpeta que no es la raíz, actuará de forma similar a `npm publish`.

### Paso a paso por paquete:

#### A. Publicar Theme (Dependencia base)
```bash
cd dist/packages/theme
pnpm publish --access public --no-git-checks
cd ../../..
```

#### B. Publicar UI
```bash
cd dist/packages/ui
pnpm publish --access public --no-git-checks
cd ../../..
```

#### C. Publicar Layout
```bash
cd dist/packages/layout
pnpm publish --access public --no-git-checks
cd ../../..
```

#### D. Publicar Data View
```bash
cd dist/packages/data-view
pnpm publish --access public --no-git-checks
cd ../../..
```

> **Nota:** El flag `--no-git-checks` es útil cuando publicas desde `dist` para evitar que pnpm se queje de que no estás en la raíz del repo git.

### Solución de Problemas: Error 403 (2FA)

Si recibes un error `E403 Forbidden` mencionando "Two-factor authentication", significa que tu cuenta tiene 2FA activado (lo cual es estándar).

**Solución rápida:**
Ejecuta el comando agregando tu código de autenticación (OTP) de tu app (Google Authenticator, Authy, etc):

```bash
pnpm publish --access public --no-git-checks --otp=123456
```
*(Reemplaza 123456 por tu código real).*

---

## 5. Verificación en NPMJS.com

1.  Ve a tu perfil: `https://www.npmjs.com/~tu-usuario`.
2.  Verifica que los paquetes y versiones (ej: `0.0.1`) aparezcan listados.
3.  Revisa la pestaña "Code" para asegurar que la estructura es correcta.

## 6. Instalación en otro proyecto

Para instalar tus nuevos paquetes en otro proyecto usando pnpm:

```bash
pnpm add @codeplex-sac/ui @codeplex-sac/theme
```
