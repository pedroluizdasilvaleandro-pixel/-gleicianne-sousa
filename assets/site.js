/* Funcionamento do site — normalmente não é preciso editar */
/* =========================================================
   UTILITÁRIOS
   ========================================================= */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isSet = (v) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
const DEMO = () => CONFIG.demoMode === true;
const get = (path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), CONFIG);
const digits = (v) => String(v || '').replace(/\D/g, '');
const ph = (label) => `<span class="ph" title="Informação a confirmar">[${esc(label)}]</span>`;
function fmt(v) {
  if (Array.isArray(v)) return `<ul class="dash-list">${v.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  return esc(v);
}
function val(v, phLabel, neutral = '') { return isSet(v) ? fmt(v) : (DEMO() ? ph(phLabel) : esc(neutral)); }
function row(label, v, phLabel) {
  if (isSet(v)) return `<div class="meta-row"><dt>${esc(label)}</dt><dd>${fmt(v)}</dd></div>`;
  if (!DEMO()) return '';
  return `<div class="meta-row"><dt>${esc(label)}</dt><dd>${ph(phLabel || label.toUpperCase())}</dd></div>`;
}

/* ---------- Ícones ---------- */
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.4A8.4 8.4 0 1 1 20.5 11.6z"/><path d="M9 10.5h6M9 13.5h4"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 3.5h3.2l1.6 4-2.1 1.3a11 11 0 0 0 5.5 5.5l1.3-2.1 4 1.6V17a3 3 0 0 1-3 3A15 15 0 0 1 2 6.5a3 3 0 0 1 3-3z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h18M3 16h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M2 12s3.6-6.2 10-6.2S22 12 22 12s-3.6 6.2-10 6.2S2 12 2 12z"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M5 7.6L3.8 6M8.3 5.9L7.6 4.2M12 5.4V3.6M15.7 5.9l.7-1.7M19 7.6L20.2 6"/></svg>',
  feather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M20.5 3.5C13 4 7 9 6.2 16.5l-.2 1.6 1.6-.2C15 17 20 11 20.5 3.5z"/><path d="M3.5 20.5L16 8M9 15h4.5M11.5 12.5h4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M12 20s-7.8-4.7-7.8-10.2A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.8 2.4C19.8 15.3 12 20 12 20z"/></svg>',
  heartFill: '<svg class="heart" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20s-7.8-4.7-7.8-10.2A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.8 2.4C19.8 15.3 12 20 12 20z"/></svg>'
};

/* ---------- Decorações ---------- */
const LASH_SVG = (() => {
  const P0 = [14, 38], P1 = [60, 80], P2 = [106, 38];
  let lashes = '';
  const n = 24;
  for (let i = 1; i < n; i++) {
    const t = i / n, u = 1 - t;
    const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
    const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
    let dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
    let dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
    const l = Math.hypot(dx, dy); dx /= l; dy /= l;
    const nx = -dy, ny = dx;
    const L = 9 + 15 * Math.pow(t, 1.5);
    const cx = x + nx * L * 0.55, cy = y + ny * L * 0.55;
    const ex = x + nx * L + dx * L * 0.3, ey = y + ny * L + dy * L * 0.3;
    lashes += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`;
  }
  return `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true" focusable="false">
    <path d="M30 22 Q60 6 92 20" stroke-width="1" opacity=".55"/>
    <g transform="translate(0 6)"><path d="M14 38 Q60 80 106 38" stroke-width="1.6"/><g stroke-width="1">${lashes}</g></g></svg>`;
})();
const GYPSO_SVG = (() => {
  let seed = 11;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  let stems = '', flowers = '';
  const bx = 40, by = 230;
  for (let i = 0; i < 8; i++) {
    const ang = -Math.PI / 2 + (i - 3) * 0.19 + (rnd() - 0.5) * 0.12;
    const len = 120 + rnd() * 80;
    const ex = bx + Math.cos(ang) * len + 30, ey = by + Math.sin(ang) * len;
    const cx = bx + (ex - bx) * 0.35 + (rnd() - 0.5) * 24, cy = by + (ey - by) * 0.55;
    stems += `<path d="M${bx} ${by} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`;
    const k = 4 + Math.floor(rnd() * 4);
    for (let j = 0; j < k; j++) {
      const fx = ex + (rnd() - 0.5) * 30, fy = ey + (rnd() - 0.6) * 24, r = 2.4 + rnd() * 2.3;
      stems += `<path d="M${ex.toFixed(1)} ${ey.toFixed(1)} L${fx.toFixed(1)} ${fy.toFixed(1)}" stroke-width=".5"/>`;
      flowers += `<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${r.toFixed(1)}"/>`;
    }
  }
  return `<svg viewBox="0 0 240 240" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round">${stems}</g>
    <g fill="#FBF8F4" stroke="currentColor" stroke-width=".6">${flowers}</g></svg>`;
})();
const LEAVES_SVG = (() => {
  const pts = [[38, 34, -32], [78, 66, -12], [56, 112, 24], [126, 98, -40], [150, 148, 8], [102, 164, 38], [196, 176, -18], [176, 214, 30]];
  const leaves = pts.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="36" ry="11" transform="rotate(${r} ${x} ${y})"/>`).join('');
  return `<svg viewBox="0 0 260 240" fill="currentColor" aria-hidden="true"><path d="M0 0 C70 70 130 130 250 225" fill="none" stroke="currentColor" stroke-width="3"/>${leaves}</svg>`;
})();
const BADGE_SVG = `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
  <circle cx="60" cy="60" r="58" fill="#FBF8F4"/>
  <circle cx="60" cy="60" r="34" fill="none" stroke="#C9B29C" stroke-width=".8"/>
  <defs><path id="badgeCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
  <text font-family="DM Sans, sans-serif" font-size="7.6" letter-spacing="2.6" fill="#3A2E28"><textPath href="#badgeCircle">LASH ARTIST · EDUCADORA · FORTALEZA ·</textPath></text>
  <text x="60" y="68" text-anchor="middle" font-family="Allura, cursive" font-size="30" fill="#8A6A57">Gs</text></svg>`;

/* Imagem real (src) ou demonstrativa identificada */
function media(img, opts = {}) {
  const { ratio = null, label = 'Imagem demonstrativa', eager = false } = opts;
  const t = (img && img.tone) || 'blush';
  const style = ratio ? ` style="aspect-ratio:${ratio}"` : '';
  if (img && img.src) {
    return `<div class="media"${style}><img src="${esc(img.src)}" alt="${esc(img.alt || '')}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></div>`;
  }
  const alt = (img && img.alt) || label;
  return `<div class="media tone-${t}"${style} data-replace="true" role="img" aria-label="${esc(alt)} (imagem demonstrativa)">
    <div class="ph-img">${LASH_SVG}</div>${DEMO() ? '<span class="ph-tag" aria-hidden="true">Imagem a substituir</span>' : ''}</div>`;
}

/* =========================================================
   CONTATO, LOCALIZAÇÃO E HORÁRIOS
   ========================================================= */
const MSG = {
  schedule:  () => `${CONFIG.contact.greeting} Gostaria de consultar horários para um atendimento.`,
  service:   (name) => `${CONFIG.contact.greeting} Gostaria de consultar informações e horários para ${name}.`,
  portfolio: () => `${CONFIG.contact.greeting} Vi seus trabalhos no site e gostaria de conhecer as possibilidades para mim.`,
  courses:   () => `${CONFIG.contact.greeting} Gostaria de saber quais cursos estão disponíveis.`,
  mentoring: () => `${CONFIG.contact.greeting} Gostaria de conversar sobre a mentoria.`
};
function waLink(message) {
  const n = digits(CONFIG.contact.whatsapp);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}
function addressText() {
  const L = CONFIG.location;
  if (!isSet(L.street)) return null;
  return [L.street, L.neighborhood, `${L.city} - ${L.state}`, L.postalCode].filter(isSet).join(', ');
}
function mapsQuery() {
  const L = CONFIG.location;
  if (isSet(L.lat) && isSet(L.lng)) return `${L.lat},${L.lng}`;
  return addressText();
}
function directionsLink() {
  if (isSet(CONFIG.google.profileUrl)) return CONFIG.google.profileUrl;
  const q = mapsQuery();
  return q ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}` : null;
}
const DAY_ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAY_PT = { Mo: 'Seg', Tu: 'Ter', We: 'Qua', Th: 'Qui', Fr: 'Sex', Sa: 'Sáb', Su: 'Dom' };
const DAY_SCHEMA = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };
function daysLabel(days) {
  const idx = days.map((d) => DAY_ORDER.indexOf(d)).filter((i) => i >= 0).sort((a, b) => a - b);
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (idx.length > 2 && contiguous) return `${DAY_PT[DAY_ORDER[idx[0]]]} a ${DAY_PT[DAY_ORDER[idx[idx.length - 1]]]}`;
  return idx.map((i) => DAY_PT[DAY_ORDER[i]]).join(', ');
}
function hoursLines() {
  return (CONFIG.hours || []).map((h) => `${daysLabel(h.days)} · ${h.opens}–${h.closes}`);
}

/* =========================================================
   HIDRATAÇÃO — aplica o CONFIG ao HTML estático
   ========================================================= */
function hydrate() {
  /* Ícones e decorações */
  $$('[data-icon]').forEach((el) => { el.outerHTML = ICONS[el.dataset.icon] || ''; });
  $$('[data-deco]').forEach((el) => {
    const k = el.dataset.deco;
    if (k === 'leaves') el.outerHTML = `<div class="leaf-shadow" aria-hidden="true">${LEAVES_SVG}</div>`;
    if (k === 'gypso') el.outerHTML = `<div class="gypso" aria-hidden="true">${GYPSO_SVG}</div>`;
    if (k === 'badge') el.innerHTML = BADGE_SVG;
  });

  /* Imagens */
  $$('[data-img]').forEach((slot) => {
    const img = get(slot.dataset.img);
    if (slot.dataset.ratio) slot.style.aspectRatio = slot.dataset.ratio;
    slot.innerHTML = media(img, { label: slot.dataset.label, eager: slot.hasAttribute('data-eager') });
  });

  /* Links de WhatsApp (sem número → âncora #contato, nunca link quebrado) */
  $$('[data-wa]').forEach((a) => {
    const fn = MSG[a.dataset.wa];
    const url = fn ? waLink(fn(a.dataset.waArg)) : null;
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else if (DEMO()) a.title = 'WhatsApp ainda não configurado no CONFIG';
  });

  /* Outros links */
  const hrefs = {
    instagram: CONFIG.social.instagram,
    tel: isSet(CONFIG.contact.phone) ? `tel:+${digits(CONFIG.contact.phone)}` : null,
    directions: directionsLink()
  };
  $$('[data-href]').forEach((a) => {
    const h = hrefs[a.dataset.href];
    if (h) { a.href = h; a.hidden = false; if (!h.startsWith('tel:')) { a.target = '_blank'; a.rel = 'noopener'; } }
    else if (a.dataset.href !== 'instagram') a.hidden = true;
  });

  /* Textos com dados do CONFIG */
  $$('[data-cfg]').forEach((el) => {
    const v = el.dataset.cfg === '@address' ? addressText() : get(el.dataset.cfg);
    el.innerHTML = val(v, el.dataset.ph, el.dataset.neutral);
  });

  /* Serviços */
  $$('[data-svc-details]').forEach((dl) => {
    const s = CONFIG.services[dl.dataset.svcDetails];
    if (!s) return;
    dl.innerHTML = s.details.map((d) => row(d.label, d.value, d.ph)).join('')
      + row('Duração', s.duration, 'TEMPO DE DURAÇÃO') + row('Valor', s.price, 'PREÇO')
      + row('Orientações prévias', s.prep, 'ORIENTAÇÕES PRÉVIAS');
    if (!dl.innerHTML.trim()) dl.closest('details').hidden = true;
  });
  $$('[data-svc][data-optional]').forEach((card) => {
    const s = CONFIG.services[card.dataset.svc];
    if (!DEMO() && !(s && s.details.some((d) => isSet(d.value)))) card.hidden = true;
  });

  /* Estilos */
  let visibleStyles = 0;
  $$('[data-style]').forEach((card) => {
    const st = CONFIG.styles[+card.dataset.style] || {};
    if (st.confirmed) { visibleStyles++; return; }
    if (DEMO()) { visibleStyles++; card.insertAdjacentHTML('beforeend', `<p style="margin-top:.8rem">${ph('CONFIRMAR SE A TÉCNICA É OFERECIDA')}</p>`); }
    else card.hidden = true;
  });
  const stSec = $('[data-styles-section]');
  if (stSec && !visibleStyles) stSec.hidden = true;

  /* Credenciais */
  const cr = CONFIG.credentials, credBox = $('[data-creds]');
  if (credBox && cr.show && cr.items.length) {
    credBox.innerHTML = `<div class="creds" style="border-color:var(--line)">${cr.items.map((c) =>
      `<div class="cred" style="border-color:var(--line)"><span class="cred-value" style="color:var(--rose)">${esc(c.value)}</span><span class="cred-label" style="color:var(--warm)">${esc(c.label)}</span></div>`).join('')}</div>
      <p class="creds-note" style="color:var(--warm)">${esc(cr.note)}${DEMO() ? ' ' + ph('CONFIRMAR ANTES DE PUBLICAR') : ''}</p>`;
  }

  /* Cursos e mentoria */
  const courses = CONFIG.courses.filter((c) => DEMO() || isSet(c.name));
  const cl = $('[data-courses]');
  if (!cl) { /* página sem cursos */ } else if (courses.length) {
    cl.innerHTML = courses.map((c) => `<li>${val(c.name, c.ph)}
      <small>${[isSet(c.format) || DEMO() ? 'Formato: ' + val(c.format, 'PRESENCIAL OU ONLINE') : '', isSet(c.nextClass) || DEMO() ? 'Próxima turma: ' + val(c.nextClass, 'CONFIRMAR') : ''].filter(Boolean).join(' · ')}</small></li>`).join('');
  } else cl.remove();
  const M = CONFIG.mentoring;
  const md = $('[data-mentoring]');
  if (md) md.innerHTML = row('Para quem é', M.audience, 'PÚBLICO-ALVO') + row('Formato', M.format, 'INDIVIDUAL, GRUPO, PRESENCIAL OU ONLINE') + row('Como participar', M.howTo, 'PROCESSO DE INSCRIÇÃO');
  if (md && !md.innerHTML.trim()) md.remove();

  renderContactInfo();
  renderGallery();

  if (DEMO()) { $$('#demoNote, #privacyDemo, [data-demo-only]').forEach((el) => { el.hidden = false; }); }
  $('#year').textContent = new Date().getFullYear();
}

function renderContactInfo() {
  const C = CONFIG;
  const wa = waLink(MSG.schedule());
  const addr = addressText();
  const hours = hoursLines();
  const dir = directionsLink();

  const items = [];
  items.push(`<li>${ICONS.pin}<div><span class="k">Endereço</span>${addr ? esc(addr) : (DEMO() ? ph('ENDEREÇO DO ESTÚDIO') + '<br>' : '') + esc(`${C.location.city} · ${C.location.state}`)}</div></li>`);
  if (hours.length || DEMO()) items.push(`<li>${ICONS.clock}<div><span class="k">Horários</span>${hours.length ? hours.map(esc).join('<br>') : ph('HORÁRIOS DE ATENDIMENTO')}</div></li>`);
  if (wa) items.push(`<li>${ICONS.chat}<div><span class="k">WhatsApp</span><a href="${wa}" target="_blank" rel="noopener" data-track="whatsapp">${esc(C.contact.phoneDisplay || 'Conversar pelo WhatsApp')}</a></div></li>`);
  else if (DEMO()) items.push(`<li>${ICONS.chat}<div><span class="k">WhatsApp</span>${ph('WHATSAPP COM DDD')}</div></li>`);
  if (isSet(C.contact.phone)) items.push(`<li>${ICONS.phone}<div><span class="k">Telefone</span><a href="tel:+${digits(C.contact.phone)}" data-track="call">${esc(C.contact.phoneDisplay || C.contact.phone)}</a></div></li>`);
  items.push(`<li>${ICONS.instagram}<div><span class="k">Instagram</span><a href="${esc(C.social.instagram)}" target="_blank" rel="noopener" data-track="instagram">${esc(C.social.instagramHandle)}</a></div></li>`);
  if ($('#infoList')) $('#infoList').innerHTML = items.join('');

  const actions = [];
  if (dir) actions.push(`<a class="btn btn--primary btn--sm" href="${esc(dir)}" target="_blank" rel="noopener" data-track="directions">${ICONS.pin}<span>Como chegar</span></a>`);
  if (isSet(C.google.reviewUrl)) actions.push(`<a class="btn btn--ghost btn--sm" href="${esc(C.google.reviewUrl)}" target="_blank" rel="noopener" data-track="review">${ICONS.star}<span>Avaliar no Google</span></a>`);
  else if (DEMO()) actions.push(`<span>${ph('LINK DE AVALIAÇÃO DO PERFIL NO GOOGLE')}</span>`);
  if ($('#asideActions')) $('#asideActions').innerHTML = actions.join('');

  /* Mapa: carregado só após clique (privacidade e velocidade) */
  const box = $('#mapBox');
  const q = mapsQuery();
  if (!box) { /* sem mapa nesta página */ } else if (q) {
    box.innerHTML = `<div><button type="button" class="btn btn--ghost btn--sm" id="loadMap">${ICONS.pin}<span>Mostrar mapa</span></button><p>O mapa é carregado do Google Maps.</p></div>`;
  } else if (DEMO()) {
    box.innerHTML = `<div>${ph('MAPA APARECE QUANDO O ENDEREÇO FOR CADASTRADO')}</div>`;
  } else box.remove();

  /* Rodapé */
  const fc = [];
  if (wa) fc.push(`<li><a href="${wa}" target="_blank" rel="noopener" data-track="whatsapp">${ICONS.chat}${esc(C.contact.phoneDisplay || 'WhatsApp')}</a></li>`);
  else if (DEMO()) fc.push(`<li><span class="footer-text">${ph('WHATSAPP COM DDD')}</span></li>`);
  fc.push(`<li><span class="footer-text">${addr ? esc(addr) : (DEMO() ? ph('ENDEREÇO DO ESTÚDIO') + '<br>' : '') + esc(`${C.location.city} · ${C.location.state}`)}</span></li>`);
  fc.push(`<li><a href="${esc(C.social.instagram)}" target="_blank" rel="noopener" data-track="instagram">${ICONS.instagram}${esc(C.social.instagramHandle)}</a></li>`);
  fc.push(`<li><a href="${esc(C.social.linktree)}" target="_blank" rel="noopener">${ICONS.link}Todos os links</a></li>`);
  $('#footerContact').innerHTML = fc.join('');
  $('#footerHours').innerHTML = hours.length
    ? hours.map((h) => `<li><span class="footer-text">${esc(h)}</span></li>`).join('')
    : `<li><span class="footer-text">${DEMO() ? ph('HORÁRIOS DE ATENDIMENTO') : 'Atendimento com agendamento prévio.'}</span></li>`;
}

/* =========================================================
   GALERIA, FILTROS E LIGHTBOX
   ========================================================= */
const CAT_LABELS = { cilios: 'Extensão de cílios', sobrancelhas: 'Sobrancelhas', bastidores: 'Bastidores' };
function renderGallery() {
  if (!$('#portfolioGrid')) return;
  $('#portfolioGrid').innerHTML = CONFIG.gallery.map((g, i) =>
    `<button type="button" class="g-item reveal" data-img-id="${i}" data-cat="${esc(g.cat)}" aria-label="Ampliar imagem: ${esc(g.alt)}">
      ${media(g, { ratio: g.ratio })}<span class="g-zoom" aria-hidden="true">${ICONS.zoom}</span></button>`).join('');
}
function applyFilter(btn) {
  const k = btn.dataset.filter;
  $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  let count = 0;
  $$('#portfolioGrid .g-item').forEach((it) => {
    const show = k === 'todos' || it.dataset.cat === k;
    it.hidden = !show;
    if (show) { count++; it.classList.add('in'); }
  });
  $('#galleryEmpty').hidden = count > 0;
  $('#filterStatus').textContent = `${count} ${count === 1 ? 'imagem exibida' : 'imagens exibidas'}.`;
}
const LB = { list: [], i: 0, last: null };
function openLightbox(trigger) {
  const btns = $$('#portfolioGrid .g-item').filter((b) => !b.hidden);
  LB.list = btns.map((b) => +b.dataset.imgId);
  LB.i = Math.max(0, btns.indexOf(trigger));
  LB.last = trigger;
  showLightbox();
  $('#lightbox').hidden = false;
  document.body.classList.add('lock');
  $('#lbClose').focus();
}
function closeLightbox() {
  const lb = $('#lightbox');
  if (lb.hidden) return;
  lb.hidden = true;
  $('#lbStage').innerHTML = '';
  document.body.classList.remove('lock');
  if (LB.last) LB.last.focus();
}
function showLightbox() {
  const img = CONFIG.gallery[LB.list[LB.i]];
  if (!img) return;
  const [w, h] = String(img.ratio || '4/5').split('/').map(Number);
  $('#lbStage').innerHTML = img.src
    ? `<img class="lb-img" src="${esc(img.src)}" alt="${esc(img.alt)}">`
    : `<div class="lb-media" style="--ar:${w}/${h};--arn:${(w / h).toFixed(4)}">${media(img)}</div>`;
  const m = $('#lbStage .lb-media .media'); if (m) { m.style.width = '100%'; m.style.height = '100%'; }
  const cap = isSet(img.caption) ? esc(img.caption) : (DEMO() ? ph('LEGENDA A CONFIRMAR') : '');
  $('#lbCaption').innerHTML = `<small>${esc(CAT_LABELS[img.cat] || '')}</small>${cap}`;
  $('#lbCounter').textContent = `${LB.i + 1} / ${LB.list.length}`;
  $('#lbPrev').disabled = $('#lbNext').disabled = LB.list.length < 2;
}
function stepLightbox(d) {
  if (LB.list.length < 2) return;
  LB.i = (LB.i + d + LB.list.length) % LB.list.length;
  showLightbox();
}

/* =========================================================
   FORMULÁRIO → WHATSAPP
   ========================================================= */
const INTEREST_TEXT = { Procedimento: 'um procedimento', Curso: 'um curso', Mentoria: 'a mentoria', Outro: 'outro assunto' };
function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function fillServiceOptions(interest) {
  const sel = $('#f-servico'), wrap = $('#wrap-servico'), label = $('#l-servico');
  let opts = [];
  if (interest === 'Procedimento') {
    opts = $$('[data-svc]').filter((c) => !c.hidden).map((c) => $('h3', c).textContent).concat('Ainda não sei — quero orientação');
    label.firstChild.textContent = 'Procedimento desejado ';
  } else if (interest === 'Curso') {
    const named = CONFIG.courses.filter((c) => isSet(c.name)).map((c) => c.name);
    opts = (named.length ? named : ['Cursos de formação']).concat('Ainda não sei — quero orientação');
    label.firstChild.textContent = 'Curso desejado ';
  } else if (interest === 'Mentoria') {
    opts = ['Mentoria'];
    label.firstChild.textContent = 'Serviço ou curso desejado ';
  }
  wrap.hidden = interest === 'Outro';
  $('#opt-msg').textContent = interest === 'Outro' ? '(obrigatória)' : '(opcional)';
  sel.disabled = !interest || interest === 'Outro';
  sel.innerHTML = interest
    ? '<option value="">Selecione</option>' + opts.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')
    : '<option value="">Escolha primeiro o interesse</option>';
  if (opts.length === 1) sel.value = opts[0];
}
function setError(input, msg) {
  const err = document.getElementById(input.getAttribute('aria-describedby'));
  if (msg) { input.setAttribute('aria-invalid', 'true'); if (err) err.textContent = msg; }
  else { input.removeAttribute('aria-invalid'); if (err && err.classList.contains('err')) err.textContent = ''; }
  return !msg;
}
function validateForm() {
  const nome = $('#f-nome'), whats = $('#f-whats'), interesse = $('#f-interesse'), servico = $('#f-servico'), msg = $('#f-msg');
  const r = [];
  r.push([nome, setError(nome, nome.value.trim().length < 2 ? 'Informe seu nome.' : '')]);
  const d = digits(whats.value);
  r.push([whats, setError(whats, d.length < 10 || d.length > 13 ? 'Informe um WhatsApp válido, com DDD.' : '')]);
  r.push([interesse, setError(interesse, !interesse.value ? 'Selecione seu interesse.' : '')]);
  if (interesse.value && interesse.value !== 'Outro') r.push([servico, setError(servico, !servico.value ? 'Selecione uma opção.' : '')]);
  else setError(servico, '');
  if (interesse.value === 'Outro') r.push([msg, setError(msg, msg.value.trim().length < 5 ? 'Conte brevemente o assunto da mensagem.' : '')]);
  else setError(msg, '');
  const bad = r.find((x) => !x[1]);
  return bad ? bad[0] : null;
}
function buildMessage() {
  const nome = $('#f-nome').value.trim(), interesse = $('#f-interesse').value, servico = $('#f-servico').value;
  const extra = $('#f-msg').value.trim(), data = $('#f-data').value;
  let txt = `${CONFIG.contact.greeting} Meu nome é ${nome}. Tenho interesse em ${INTEREST_TEXT[interesse]}.`;
  if (interesse !== 'Outro' && servico) txt += ` Gostaria de saber mais sobre ${servico.startsWith('Ainda não sei') ? 'as opções disponíveis' : servico}.`;
  if (extra) txt += ` ${extra}`;
  if (data) { const [y, m, d] = data.split('-'); txt += `\nPreferência de data: ${d}/${m}/${y}.`; }
  txt += `\nMeu WhatsApp: ${maskPhone($('#f-whats').value)}.`;
  return txt;
}
function initForm() {
  const form = $('#contactForm');
  if (!form) return;
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $('#f-data').min = today.toISOString().slice(0, 10);
  const whats = $('#f-whats');
  whats.addEventListener('input', () => { whats.value = maskPhone(whats.value); });
  $('#f-interesse').addEventListener('change', (e) => { fillServiceOptions(e.target.value); setError(e.target, ''); });
  $$('.input', form).forEach((el) => el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') setError(el, ''); }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = $('#formStatus');
    status.className = 'form-status';
    status.innerHTML = '';
    const bad = validateForm();
    if (bad) { status.classList.add('error'); status.innerHTML = '<strong>Revise os campos destacados.</strong>'; bad.focus(); return; }
    const message = buildMessage();
    const url = waLink(message);
    if (!url) {
      status.classList.add('warn');
      status.innerHTML = `<strong>Configuração pendente</strong>
        <p>${DEMO() ? 'O número de WhatsApp ainda não foi cadastrado no CONFIG, por isso a mensagem não pode ser aberta no WhatsApp.' : 'O envio pelo WhatsApp está indisponível no momento. Fale com a profissional pelo Instagram.'}</p>
        <div class="preview">${esc(message)}</div>
        <div class="btn-row"><button type="button" class="btn btn--ghost btn--sm" data-copy>Copiar mensagem</button>
        <a class="btn btn--ghost btn--sm" href="${esc(CONFIG.social.instagram)}" target="_blank" rel="noopener">${ICONS.instagram}<span>Abrir Instagram</span></a></div>`;
      status.dataset.message = message;
      status.focus();
      return;
    }
    track('form');
    const btn = $('#f-submit');
    btn.classList.add('is-loading');
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Preparando mensagem…</span>';
    window.open(url, '_blank', 'noopener');
    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.innerHTML = `${ICONS.chat}<span>Preparar mensagem no WhatsApp</span>`;
      status.classList.add('ok');
      status.innerHTML = `<strong>Mensagem preparada! Agora é só revisar e enviar pelo WhatsApp.</strong>
        <p>O WhatsApp não abriu? <a href="${url}" target="_blank" rel="noopener">Clique aqui para abrir a conversa</a>.</p>`;
      status.focus();
    }, 500);
  });
}

/* =========================================================
   GOOGLE ADS / ANALYTICS — conversões com consentimento (LGPD)
   ========================================================= */
const CONSENT_KEY = 'gs-consent';
function readConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
function saveConsent(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* sem armazenamento */ } }
function trackingIds() { return [CONFIG.tracking.ga4, CONFIG.tracking.googleAds].filter(isSet); }
function setupTracking() {
  const ids = trackingIds();
  if (!ids.length) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ids[0]);
  document.head.appendChild(s);
  gtag('js', new Date());
  ids.forEach((id) => gtag('config', id));
  const saved = readConsent();
  if (saved) applyConsent(saved === 'granted');
  else $('#consent').hidden = false;
}
function applyConsent(granted) {
  if (typeof window.gtag !== 'function') return;
  const v = granted ? 'granted' : 'denied';
  gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
}
function track(kind) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'lead_click', lead_method: kind });
  if (typeof window.gtag !== 'function') return;
  gtag('event', 'generate_lead', { method: kind });
  const conv = CONFIG.tracking.conversions[kind];
  if (isSet(conv)) gtag('event', 'conversion', { send_to: conv });
}

/* =========================================================
   SEO — dados estruturados apenas com informações confirmadas
   ========================================================= */
function setupSEO() {
  /* Schemas com links relativos (blog) viram URLs absolutas */
  $$('script[data-relative]').forEach((el) => {
    try {
      el.textContent = el.textContent.replace(/"item":\s*"([^"]+)"/g, (m, u) => `"item": "${new URL(u, location.href).href}"`);
    } catch (e) { /* mantém como está */ }
  });
  const S = CONFIG.seo;
  const addMeta = (attr, name, content) => { const m = document.createElement('meta'); m.setAttribute(attr, name); m.content = content; document.head.appendChild(m); };
  const pagePath = document.documentElement.dataset.path || '';
  if (isSet(S.siteUrl)) { const u = S.siteUrl.replace(/\/$/, '') + '/' + pagePath; addMeta('property', 'og:url', u); const l = document.createElement('link'); l.rel = 'canonical'; l.href = u; document.head.appendChild(l); }
  if (isSet(S.ogImage)) addMeta('property', 'og:image', S.ogImage);
  if (isSet(S.favicon)) { const l = document.createElement('link'); l.rel = 'icon'; l.href = S.favicon; document.head.appendChild(l); }

  if (pagePath !== '') return; /* dados do negócio só na página inicial */
  const L = CONFIG.location, C = CONFIG.contact;
  const phone = digits(C.phone || C.whatsapp);
  let data;
  if (isSet(L.street) && phone) {
    data = {
      '@type': 'BeautySalon',
      name: CONFIG.business.name,
      telephone: '+' + phone,
      address: { '@type': 'PostalAddress', streetAddress: L.street, addressLocality: L.city, addressRegion: L.state, addressCountry: 'BR' },
      sameAs: [CONFIG.social.instagram, CONFIG.google.profileUrl].filter(isSet)
    };
    if (isSet(L.postalCode)) data.address.postalCode = L.postalCode;
    if (isSet(L.lat) && isSet(L.lng)) data.geo = { '@type': 'GeoCoordinates', latitude: L.lat, longitude: L.lng };
    if (isSet(CONFIG.google.profileUrl)) data.hasMap = CONFIG.google.profileUrl;
    if (isSet(S.siteUrl)) data.url = S.siteUrl;
    if (isSet(S.ogImage)) data.image = S.ogImage;
    if (isSet(CONFIG.hours)) data.openingHoursSpecification = CONFIG.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => DAY_SCHEMA[d]), opens: h.opens, closes: h.closes }));
  } else {
    data = { '@type': 'Person', name: CONFIG.business.fullName || CONFIG.business.name, jobTitle: 'Lash designer e educadora', sameAs: [CONFIG.social.instagram, CONFIG.social.linktree] };
  }
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(Object.assign({ '@context': 'https://schema.org' }, data));
  document.head.appendChild(s);
}

/* =========================================================
   MENU, CABEÇALHO E NAVEGAÇÃO POR SEÇÕES
   ========================================================= */
function openMenu() {
  const menu = $('#mobileMenu'), t = $('#menuToggle');
  menu.hidden = false;
  t.setAttribute('aria-expanded', 'true'); t.setAttribute('aria-label', 'Fechar menu'); t.innerHTML = ICONS.close;
  document.body.classList.add('lock');
  updateHeader();
  $('a', menu).focus();
}
function closeMenu(returnFocus = true) {
  const menu = $('#mobileMenu'), t = $('#menuToggle');
  if (menu.hidden) return;
  menu.hidden = true;
  t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-label', 'Abrir menu'); t.innerHTML = ICONS.menu;
  document.body.classList.remove('lock');
  updateHeader();
  if (returnFocus) t.focus();
}
function updateHeader() {
  $('#siteHeader').classList.toggle('is-solid', window.scrollY > 12 || !$('#mobileMenu').hidden);
}
function trapFocus(e, container, extra = []) {
  const f = [...extra, ...$$('a[href], button:not([disabled])', container)].filter((el) => el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;
  const ids = ['servicos', 'resultados', 'sobre', 'formacao', 'duvidas', 'contato'];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      $$('[data-nav]').forEach((a) => {
        if (a.dataset.nav === en.target.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}
function initReveal() {
  const els = $$('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
function init() {
  hydrate();
  setupSEO();
  setupTracking();
  initForm();
  initReveal();
  initScrollSpy();
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1100) closeMenu(false); });

  document.addEventListener('click', (e) => {
    const t = e.target;
    const tr = t.closest('[data-track]');
    if (tr && !(tr.dataset.wa && !tr.href.startsWith('https://wa.me'))) track(tr.dataset.track);
    if (t.closest('#menuToggle')) { $('#mobileMenu').hidden ? openMenu() : closeMenu(); return; }
    if (t.closest('#mobileMenu a')) closeMenu(false);
    const g = t.closest('.g-item'); if (g) { openLightbox(g); return; }
    const f = t.closest('[data-filter]'); if (f) { applyFilter(f); return; }
    if (t.closest('#lbClose')) { closeLightbox(); return; }
    if (t.closest('#lbPrev')) { stepLightbox(-1); return; }
    if (t.closest('#lbNext')) { stepLightbox(1); return; }
    if (t.id === 'lbStage' || t.id === 'lightbox') { closeLightbox(); return; }
    if (t.closest('#loadMap')) {
      const box = $('#mapBox');
      box.classList.add('has-map');
      box.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(mapsQuery())}&output=embed" title="Mapa com a localização do atendimento" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      return;
    }
    const c = t.closest('[data-copy]');
    if (c && navigator.clipboard) { navigator.clipboard.writeText($('#formStatus').dataset.message || '').then(() => { c.textContent = 'Mensagem copiada'; }).catch(() => {}); return; }
    const cs = t.closest('[data-consent]');
    if (cs) { saveConsent(cs.dataset.consent); applyConsent(cs.dataset.consent === 'granted'); $('#consent').hidden = true; return; }
    if (t.closest('[data-open-privacy]')) { const d = $('#privacy'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); return; }
    if (t.closest('[data-close-privacy]') || t.id === 'privacy') { const d = $('#privacy'); if (d.close) d.close(); else d.removeAttribute('open'); }
  });

  document.addEventListener('keydown', (e) => {
    const lbOpen = !!$('#lightbox') && !$('#lightbox').hidden, menuOpen = !$('#mobileMenu').hidden;
    if (e.key === 'Escape') { if (lbOpen) closeLightbox(); else if (menuOpen) closeMenu(); }
    if (lbOpen) {
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'Tab') trapFocus(e, $('#lightbox'));
    } else if (menuOpen && e.key === 'Tab') trapFocus(e, $('#mobileMenu'), [$('#menuToggle')]);
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
