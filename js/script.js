document.addEventListener('DOMContentLoaded', () => {

  /* ---- Overlay de escaneo (una sola vez) ---- */
  const overlay = document.querySelector('.scan-overlay');
  if (overlay) {
    setTimeout(() => overlay.classList.add('is-done'), 50);
    setTimeout(() => overlay.remove(), 1600);
  }

  /* ---- Menú móvil ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Carga de proyectos desde JSON ---- */
  const grid = document.getElementById('proyectos-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let dataset = {};

  const CATEGORY_LABELS = {
    proyectos_programacion: { label: 'Programación', className: 'programacion' },
    proyectos_diseno: { label: 'Diseño', className: 'diseno' }
  };

  function buildCard(project, categoryKey) {
    const meta = CATEGORY_LABELS[categoryKey] || { label: categoryKey, className: '' };
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.category = categoryKey;

    const tagsHtml = (project.tags || [])
      .map(tag => `<span class="project-card__tag">${escapeHtml(tag)}</span>`)
      .join('');

    const hasLink = project.link && project.link.trim().length > 0;
    const hasImage = project.imagen && project.imagen.trim().length > 0;

    card.innerHTML = `
      <div class="project-card__media">
        ${hasImage
          ? `<img src="${escapeHtml(project.imagen)}" alt="${escapeHtml(project.titulo)}"
                 loading="lazy"
                 onerror="this.style.display='none'; this.parentElement.querySelector('.project-card__fallback').style.display='flex';">
             <div class="project-card__fallback" style="display:none">🖼️ Imagen no disponible</div>`
          : `<div class="project-card__fallback" style="display:flex">🖼️ Imagen no disponible</div>`}
      </div>
      <div class="project-card__body">
        <p class="project-card__cat project-card__cat--${meta.className}">${meta.label}</p>
        <h3 class="project-card__title">${escapeHtml(project.titulo)}</h3>
        <p class="project-card__desc">${escapeHtml(project.descripcion)}</p>
        <div class="project-card__tags">${tagsHtml}</div>
        ${hasLink
          ? `<a class="project-card__link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener">Abrir proyecto →</a>`
          : `<span class="project-card__link is-disabled">Próximamente</span>`}
      </div>
    `;
    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function render(filter = 'todos') {
    if (!grid) return;
    grid.innerHTML = '';
    const categories = filter === 'todos' ? Object.keys(dataset) : [filter];

    categories.forEach(categoryKey => {
      (dataset[categoryKey] || []).forEach(project => {
        grid.appendChild(buildCard(project, categoryKey));
      });
    });

    observeReveals();
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      render(btn.dataset.filter);
    });
  });

  fetch('data/proyectos.json')
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar proyectos.json');
      return res.json();
    })
    .then(json => {
      dataset = json;
      render('todos');
    })
    .catch(err => {
      console.error(err);
      if (grid) {
        grid.innerHTML = '<p style="color:var(--ink-dim); font-family:var(--font-mono); font-size:0.85rem;">No se pudieron cargar los proyectos. Sirve este sitio con un servidor local o despliégalo (Cloudflare Pages, etc.) para que el fetch funcione.</p>';
      }
    });

  /* ---- Reveal on scroll ---- */
  function observeReveals() {
    const items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  }

  document.querySelectorAll('.section__head, .about__text, .skill-chip, .contact__frame')
    .forEach(el => el.classList.add('reveal'));
  observeReveals();
});
