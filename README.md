# MODO — Academia digital

Sitio web estático, adaptable a móviles, tablets y computadoras. Está preparado para publicarse en GitHub Pages, Netlify o Vercel sin instalar dependencias.

## 1. Estructura de carpetas

```text
MODO/
├── index.html
├── styles.css
├── app.js
├── courses.js
├── README.md
└── assets/
    └── img/
        ├── COOL.jpg
        ├── tarifario-referencia.jpg
        └── cursos/
            ├── cocina.jpg
            └── guaripola.jpg
```

Crea la carpeta `assets/img/cursos/` y coloca allí las portadas de los cursos. Si aún no tienes las imágenes, el sitio mostrará el símbolo de cada curso.

## 2. Cómo añadir un curso manualmente

Abre `courses.js`. Dentro de `window.MODO_COURSES`, añade un objeto separado por comas. Ejemplo:

```js
{
  id: "reposteria",
  title: "Repostería creativa",
  category: "Gastronomía",
  level: "Inicial",
  description: "Aprende técnicas de repostería desde cero.",
  cover: "assets/img/cursos/reposteria.jpg",
  symbol: "✦",
  lessons: [
    { title: "Capítulo 1 · Ingredientes y utensilios", youtube: "https://www.youtube.com/watch?v=ID_DEL_VIDEO" },
    { title: "Capítulo 2 · Preparación", youtube: "https://youtu.be/ID_DEL_VIDEO" }
  ]
}
```

- `id`: identificador único, sin espacios ni tildes.
- `title`: nombre visible.
- `category`: categoría del curso.
- `level`: nivel sugerido.
- `description`: descripción breve.
- `cover`: ruta de la portada.
- `symbol`: carácter decorativo si no carga la portada.
- `lessons`: capítulos. Cada capítulo necesita `title` y `youtube`.

**Importante:** reemplaza `ID_DEL_VIDEO` por el identificador real de YouTube. Los enlaces de ejemplo que vienen en el catálogo inicial son marcadores y aparecerán como “En preparación” hasta que los sustituyas.

## 3. Tamaño recomendado de las portadas

- Recomendado: **1200 × 675 px** (16:9).
- Formato: JPG o WebP.
- Peso ideal: menos de 300 KB.
- Evita texto pequeño dentro de la imagen; el título ya aparece debajo.
- Guarda cada imagen en `assets/img/cursos/` y escribe la ruta exacta en `cover`.

## 4. Cambiar el logo

Reemplaza `assets/img/COOL.jpg` por tu nuevo archivo conservando exactamente ese nombre, o cambia la ruta en `index.html`. La imagen que compartiste se ha copiado como `COOL.jpg`.

## 5. Cambiar precios y equipo

En `courses.js` modifica:
- `window.MODO_PRICES`: nombre del servicio y precio en Bs.
- `window.MODO_TEAM`: nombre y cargo de cada integrante.

Los cargos de Camila, Natalia y Luciana Solís se han redactado como propuestas institucionales; confirma los títulos oficiales antes de publicar.

## 6. Usuarios y contraseñas: limitación importante

Esta versión implementa registro e inicio de sesión **local**, sin correo ni servidor. Las cuentas se guardan en `localStorage` del navegador y la sesión en `sessionStorage`. Por eso:
- La cuenta solo existe en ese dispositivo y navegador.
- Si se borran los datos del navegador, se pierde la cuenta.
- No sincroniza cuentas entre teléfonos o computadoras.
- No es un sistema seguro para contenido de pago: las contraseñas se guardan localmente y el catálogo/código es visible para cualquier visitante.

Para una academia que venda cursos de verdad y deba proteger los videos, será necesario añadir autenticación y base de datos en un backend (por ejemplo Firebase Authentication + Firestore) y controlar el acceso desde el servidor. Los enlaces públicos de YouTube no pueden mantenerse privados si se comparte el enlace.

## 7. Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `modo-academia`.
2. Sube el contenido de esta carpeta, respetando la estructura.
3. En el repositorio abre **Settings → Pages**.
4. En “Build and deployment”, elige **Deploy from a branch**.
5. Selecciona `main` y `/ (root)`, guarda.
6. Espera la publicación y abre la URL que GitHub Pages te indique.

No cambies los nombres de `index.html`, `styles.css`, `app.js` ni `courses.js`.

## 8. Prueba local

Abre `index.html` con un navegador moderno. Para una prueba más fiel a GitHub Pages puedes usar la extensión Live Server de Visual Studio Code. No se necesita compilar ni instalar paquetes.
