import { THEME_COLORS } from '../theme';
import { startDemo } from './demo';

const root = document.documentElement;
const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends HTMLElement>(selector: string) => document.querySelectorAll<T>(selector);

/** Parámetro de la URL que guarda el filtro de stack: `?tec=rust`. */
const PARAM = 'tec';

/* Idioma: el enlace conserva el filtro y el ancla al cambiar de página. */
function syncLang(): void {
  $$<HTMLAnchorElement>('a[data-lang-switch]').forEach((a) => {
    a.href = (a.dataset.langSwitch ?? '/') + location.search + location.hash;
  });
}

/* Tema */
function syncTheme(): void {
  const theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
  $$('[data-theme-set]').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.themeSet === theme)),
  );
  $$<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.removeAttribute('media');
    m.content = THEME_COLORS[theme];
  });
}
$$('[data-theme-set]').forEach((b) =>
  b.addEventListener('click', () => {
    root.dataset.theme = b.dataset.themeSet === 'dark' ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch {
      /* sin almacenamiento: el cambio vale solo para esta visita */
    }
    syncTheme();
  }),
);
syncTheme();

/* Menú móvil: con el panel abierto, lo que queda detrás no recibe foco; al cerrarlo, el foco vuelve
   al botón del menú (salvo si se cerró al pulsar un enlace, que ya lleva al visitante a su destino). */
const menu = $('#menu');
const burger = $('.burger');
let viaLink = false;
menu?.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a') && menu.matches(':popover-open')) {
    viaLink = true;
    menu.hidePopover();
  }
});
menu?.addEventListener('toggle', (e) => {
  const open = (e as ToggleEvent).newState === 'open';
  $$('main, footer, .skip, .bar > :not(#menu)').forEach((el) => el.toggleAttribute('inert', open));
  if (!open && !viaLink) burger?.focus();
  viaLink = false;
});
/* Si la ventana pasa a escritorio con el panel abierto, se cierra (el menú vuelve a ser la barra). */
const desktop = matchMedia('(min-width: 1024px)');
desktop.addEventListener('change', () => {
  if (desktop.matches && menu?.matches(':popover-open')) {
    viaLink = true;
    menu.hidePopover();
  }
});

/* Copiar email */
$$<HTMLButtonElement>('[data-copy]').forEach((b) =>
  b.addEventListener('click', async () => {
    const out = $('#copy-status');
    if (!out) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copy ?? '');
      out.textContent = b.dataset.ok ?? '';
    } catch {
      out.textContent = b.dataset.err ?? '';
    }
  }),
);

/* Filtro de stack: atenúa los compartimentos que no usan la tecnología. */
const status = $('#tec-status');
const matches = $('#tec-matches');
const pill = $('#tec-pill');
const pillText = $('#tec-pill-text');

function setFilter(requested: string | null): void {
  const id = requested && $(`[data-tech="${CSS.escape(requested)}"]`) ? requested : null;
  if (id) root.dataset.filter = id;
  else delete root.dataset.filter;

  $$('[data-nets]').forEach((el) =>
    el.toggleAttribute('data-match', !!id && (el.dataset.nets ?? '').split(' ').includes(id)),
  );
  $$('[data-tech]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tech === id)));
  $$('[data-chip]').forEach((c) => c.toggleAttribute('data-on', !!id && c.dataset.chip === id));
  $$('[data-tec-clear]').forEach((b) => {
    if (b.closest('#tec-pill')) return;
    b.hidden = !id;
  });
  pill?.toggleAttribute('data-open', !!id);

  if (status && matches) {
    matches.replaceChildren();
    status.textContent = '';
    if (id) {
      const found = [...$$('[data-match][id]')];
      const projects = found.filter((el) => el.hasAttribute('data-project'));
      const tech = $(`[data-tech="${CSS.escape(id)}"]`)?.textContent?.trim() ?? id;
      const template = (projects.length === 1 ? status.dataset.one : status.dataset.many) ?? '';
      status.textContent = template.replace('{n}', String(projects.length)).replace('{tech}', tech);
      if (pillText) pillText.textContent = status.textContent;
      for (const el of projects) {
        const a = document.createElement('a');
        a.href = `#${el.id}`;
        a.textContent = el.dataset.label ?? el.id;
        const li = document.createElement('li');
        li.append(a);
        matches.append(li);
      }
    }
  }

  const url = new URL(location.href);
  if (id) url.searchParams.set(PARAM, id);
  else url.searchParams.delete(PARAM);
  history.replaceState(null, '', url);
  syncLang();
}

$$('[data-tech]').forEach((b) =>
  b.addEventListener('click', () =>
    setFilter(root.dataset.filter === b.dataset.tech ? null : (b.dataset.tech ?? null)),
  ),
);
/* Al quitar el filtro el foco no se pierde: va a la tecnología que estaba activa o, si no, al título. */
$$('[data-tec-clear]').forEach((b) =>
  b.addEventListener('click', (e) => {
    const previous = root.dataset.filter;
    setFilter(null);
    const target = (previous && $(`[data-tech="${CSS.escape(previous)}"]`)) || $('#stack-title');
    // Con ratón no se mueve la página; con teclado el foco tiene que quedar a la vista.
    target?.focus({ preventScroll: e.detail > 0 });
  }),
);
setFilter(new URLSearchParams(location.search).get(PARAM));
addEventListener('hashchange', syncLang);

/* Demo del verificador: con movimiento reducido se queda en su estado final. */
const demo = $('[data-demo]');
if (demo) startDemo(demo);
