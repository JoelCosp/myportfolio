# Portfolio — Momo

Portfolio estático, 100% responsive, con secciones de proyectos dinámicas
cargadas desde `data/proyectos.json`.

## Estructura

```
index.html
css/style.css
js/script.js
data/proyectos.json   ← aquí añades/editas proyectos
images/                ← sube aquí las imágenes que referencia el JSON
```

## Añadir un proyecto nuevo

Edita `data/proyectos.json` y añade un objeto dentro de
`proyectos_programacion` o `proyectos_diseno` (o crea una nueva clave, ver abajo):

```json
{
  "titulo": "Nombre del proyecto",
  "descripcion": "Descripción breve.",
  "imagen": "images/nombre.jpg",
  "link": "https://tu-url.com",
  "tags": ["Tag1", "Tag2"]
}
```

Si `link` está vacío (`""`), la tarjeta muestra "Próximamente" en vez de un enlace.

## Añadir una categoría nueva (ej. `proyectos_diseno` → otra más)

1. Añade la clave nueva en `data/proyectos.json`, ej. `proyectos_freelance`.
2. En `js/script.js`, añade una entrada en `CATEGORY_LABELS`:
   ```js
   proyectos_freelance: { label: 'Freelance', className: 'freelance' }
   ```
3. En `index.html`, añade un botón de filtro dentro de `.filters`:
   ```html
   <button class="filter-btn" data-filter="proyectos_freelance" role="tab" aria-selected="false">Freelance</button>
   ```

Todo lo demás (renderizado, filtros, animaciones) es automático.

## Imágenes

Sube las imágenes a la carpeta `images/` y referencia la ruta relativa en el
JSON (ej. `"imagen": "images/fudicode.jpg"`). Si una imagen falla, la tarjeta
muestra automáticamente un aviso de "Imagen no disponible" sin romper el diseño.

## Ver en local

El `fetch()` del JSON necesita que el sitio se sirva por http, no abriendo el
`index.html` directamente con doble clic. Opciones rápidas:

```bash
# Con Python
python3 -m http.server 8000

# Con Node
npx serve .
```

Luego abre `http://localhost:8000`.

## Desplegar

Compatible tal cual con Cloudflare Pages (arrastra la carpeta o conéctala a
tu repo de GitHub, sin build command, output directory = `/`).

## Personalizar

- **Colores/tipografías**: variables en `:root` al inicio de `css/style.css`.
- **Textos** (hero, sobre mí, contacto): directamente en `index.html`.
- **Email / redes**: sección `#contacto` en `index.html`.
