# Joel Cosp — Portfolio

Programador full stack y diseñador gráfico. Construyo software de principio
a fin (arquitectura, código, integraciones) y diseño la identidad visual que
lo acompaña. Un perfil completo, sin depender de terceros para cerrar el
círculo entre lo técnico y lo visual.

**Contacto**
- 📧 joelc456789@gmail.com
- 📱 657 809 586
- 💻 [github.com/devfrontaltech](https://github.com/devfrontaltech)

## Habilidades

**Desarrollo full stack**
HTML / CSS / JavaScript · TypeScript · React · Node.js · Firebase (Auth +
Firestore) · SQL / NoSQL · APIs REST · Stripe · Cloudflare Pages · Git &
GitHub · Automatización (n8n / Make) · IA generativa & prompting · Agentes
IA / integraciones LLM

**Diseño gráfico**
Adobe Illustrator · Adobe Photoshop · Adobe InDesign · Figma · Creative
Cloud · Diseño UI/UX · Branding & identidad visual

## Proyectos

Consulta la sección **Proyectos** del portfolio (`index.html`), donde se
listan de forma dinámica desde `data/proyectos.json`, filtrables por
Programación y Diseño.

---

## Documentación técnica del repositorio

### Estructura

```
index.html
css/style.css
js/script.js
data/proyectos.json   ← contenido dinámico de proyectos
images/                ← imágenes que referencia el JSON
```

### Añadir un proyecto nuevo

Edita `data/proyectos.json` y añade un objeto dentro de
`proyectos_programacion` o `proyectos_diseno`:

```json
{
  "titulo": "Nombre del proyecto",
  "descripcion": "Descripción breve.",
  "imagen": "images/nombre.jpg",
  "link": "https://tu-url.com",
  "tags": ["Tag1", "Tag2"]
}
```

- Si `link` está vacío (`""`), la tarjeta muestra "Próximamente".
- Si `imagen` está vacía o la ruta falla, la tarjeta muestra automáticamente
  "🖼️ Imagen no disponible" sin romper el diseño.

### Añadir una categoría nueva

1. Añade la clave nueva en `data/proyectos.json`, ej. `proyectos_freelance`.
2. En `js/script.js`, añade una entrada en `CATEGORY_LABELS`:
   ```js
   proyectos_freelance: { label: 'Freelance', className: 'freelance' }
   ```
3. En `index.html`, añade un botón de filtro dentro de `.filters`:
   ```html
   <button class="filter-btn" data-filter="proyectos_freelance" role="tab" aria-selected="false">Freelance</button>
   ```

### Ver en local

El `fetch()` del JSON necesita que el sitio se sirva por http, no abriendo
`index.html` con doble clic:

\`\`\`bash
# Con Python
python3 -m http.server 8000

# Con Node
npx serve .
\`\`\`

Luego abre `http://localhost:8000`.

### Desplegar

Compatible tal cual con Cloudflare Pages: sin build command, output
directory = `/` (raíz del repo).

### Personalizar

- **Colores/tipografías**: variables en `:root` al inicio de `css/style.css`.
- **Textos** (hero, sobre mí, contacto): directamente en `index.html`.
