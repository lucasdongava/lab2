/*
 * Lab. Programação II — Plataforma de estudos Java
 * Aplicação: navegação, transições, editor CodeMirror, execução e progresso
 */
// ================= APP =================
const $ = s => document.querySelector(s);
const store = {
  get(k, d) { try { const v = localStorage.getItem('lp2:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('lp2:' + k, JSON.stringify(v)); } catch (e) {} }
};
// pede ao navegador para não apagar o progresso sozinho (não protege contra limpeza manual)
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LV = { f: T('lvF'), m: T('lvM'), d: T('lvD') };
const done = new Set(store.get('done', []));
const isNarrow = () => matchMedia('(max-width:1180px)').matches;
const isPhone = () => matchMedia('(max-width:760px)').matches;
let view = 'inicio';

// ---------- tema ----------
(() => { const t = store.get('tema', null); if (t) document.documentElement.dataset.theme = t; })();
$('#themeBtn').onclick = () => {
  const cur = document.documentElement.dataset.theme || 'light';
  const nx = cur === 'dark' ? 'light' : 'dark'; const apply = () => { document.documentElement.dataset.theme = nx; }; store.set('tema', nx);
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(apply); else apply();
};
// quando o site é exibido dentro da landing page, acompanha o tema dela (sem gravar a preferência)
addEventListener('message', e => { const t = e.source === parent && e.data && e.data.estudosTema; if (t === 'light' || t === 'dark') { document.documentElement.dataset.theme = t;  } });

// ---------- idioma ----------
(() => {
  const box = $('#lang'), btn = $('#langBtn'), menu = $('#langMenu');
  const close = () => { box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.onclick = e => { e.stopPropagation(); const open = !box.classList.contains('open'); box.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
  menu.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { close(); if (b.dataset.l !== LANG) { saveDraft(); setLang(b.dataset.l); } });
  document.addEventListener('click', e => { if (!box.contains(e.target)) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ---------- toast ----------
let toastT; function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1800); }

// ---------- sidebar ----------
function renderSide() {
  let h = `<div class="side-head"><div><b>${T('sideLessons')}</b><small>${T('sideCount', done.size, LESSONS.length)}</small></div><button class="icon-btn" data-close aria-label="${T('closeMenuAria')}">✕</button></div><div class="nav-home"><button data-go="inicio" class="${view === 'inicio' ? 'on' : ''}">${T('navHome')}</button><button data-go="projetos" class="${view === 'projetos' ? 'on' : ''}">${T('navProjects')}</button><button data-go="resumo" class="${view === 'resumo' ? 'on' : ''}">${T('navSummary')}</button></div>`;
  for (const u of [0, 1, 2, 3]) {
    h += `<div class="unit"><div class="unit-h"><b style="background:${UNITS[u].color}">${u || '★'}</b>${UNITS[u].name}</div>`;
    for (const L of LESSONS.filter(l => l.unit === u))
      h += `<button style="--i:${LESSONS.indexOf(L) + 2}" class="lesson-btn ${view === L.id ? 'on' : ''} ${done.has(L.id) ? 'done' : ''}" data-go="${L.id}"><span class="dot">${done.has(L.id) ? '✓' : ''}</span>${esc(L.title)}</button>`;
    h += `</div>`;
  }
  h += `<div class="nav-foot"><button data-go="painel" class="${view === 'painel' ? 'on' : ''}">${T('navProgress')}</button></div>`;
  $('#side').innerHTML = h;
  if (justDone) { const b = $(`#side [data-go="${justDone}"]`); if (b) b.classList.add('just'); justDone = null; }
  placeSideInd();
  $('#progTxt').textContent = T('progTxt', done.size, LESSONS.length);
  $('.top-prog').classList.toggle('on', view === 'painel');
  $('#progBar').style.width = (done.size / LESSONS.length * 100) + '%';
}
$('#side').addEventListener('click', e => { if (e.target.closest('[data-close]')) return closeDrawer(); const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); });
$('#logoHome').addEventListener('click', e => { e.preventDefault(); closeDrawer(); go('inicio'); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
(() => { let x0 = null; const sd = $('#side'); sd.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true }); sd.addEventListener('touchend', e => { if (x0 != null && e.changedTouches[0].clientX - x0 < -60) closeDrawer(); x0 = null; }, { passive: true }); })();
const closeDrawer = () => { $('#side').classList.remove('open'); $('#scrim').classList.remove('on'); $('#menuBtn').setAttribute('aria-expanded', 'false'); };
$('.top-prog').setAttribute('role', 'button'); $('.top-prog').tabIndex = 0; $('.top-prog').title = T('progTitle');
$('.top-prog').onclick = () => go('painel'); $('.top-prog').onkeydown = e => { if (e.key === 'Enter') go('painel'); };
$('#menuBtn').onclick = () => { const o = $('#side').classList.toggle('open'); $('#scrim').classList.toggle('on', o); $('#menuBtn').setAttribute('aria-expanded', String(o)); if (o) { const on = $('#side .lesson-btn.on'); if (on) on.scrollIntoView({ block: 'center' }); } };
$('#scrim').onclick = closeDrawer;
// computador: recolher/mostrar a sidebar (lembra a escolha)
(() => {
  const btn = $('#collapseBtn');
  const apply = off => { document.body.classList.toggle('side-off', off); btn.setAttribute('aria-expanded', String(!off)); btn.setAttribute('aria-label', off ? T('showSideAria') : T('collapseAria')); };
  apply(!!store.get('sideOff', false));
  btn.onclick = () => { const off = !document.body.classList.contains('side-off'); apply(off); store.set('sideOff', off); };
})();

// ---------- páginas ----------
function snippet(L, key) {
  return `<div class="snip"><div class="snip-h"><span>Main.java</span><button data-load="${L.id}|${key}">${T('openInEditor')}</button></div><pre data-hl="${L.id}|${key}"></pre></div>`;
}
function renderLesson(L) {
  const U = UNITS[L.unit], i = LESSONS.indexOf(L), prev = LESSONS[i - 1], next = LESSONS[i + 1];
  let h = `<div class="crumb" style="color:${U.color}">${L.unit ? T('crumbUnit', L.unit) : ''}${U.name}</div><h1>${esc(L.title)}</h1><p class="lead">${L.lead}</p>`;
  h += L.body.replace(/\{\{code:(\w+)\}\}/g, (a, k) => snippet(L, k)).replace(/\{\{viz:(\w+)\}\}/g, (a, k) => `<div class="viz" data-viz="${k}"></div>`).replace(/\{\{fig:(\w+)\}\}/g, (a, k) => FIG[k] ? FIG[k]() : '');
  if (PROVA[L.id]) h += `<div class="prova"><div class="prova-h">${T('examTitle')}</div><ul>${PROVA[L.id].map(x => `<li>${x}</li>`).join('')}</ul></div>`;
  if (QUIZ[L.id]) h += `<h2>${T('quizTitle')}</h2><p style="color:var(--fg2)">${T('quizIntro')}</p><div class="quiz">` + QUIZ[L.id].map((q, qi) => `<div class="q"><p>${qi + 1}. ${q[0]}</p><div class="opts">${q[1].map((o, oi) => `<button class="opt" data-qa="${L.id}|${qi}|${oi}">${o}</button>`).join('')}</div><div class="qx"><div></div></div></div>`).join('') + `</div><div class="quiz-foot"><button class="btn" data-requiz="${L.id}">${T('requiz')}</button></div>`;
  h += `<h2>${T('practice')}</h2>` + METODO + `<div class="ex-list">` + L.ex.map((x, j) => { const E = EXAMPLES[`${L.id}:${j}`]; return `
    <div class="ex"><div class="ex-top"><h4>${esc(x.t)}<span class="lvl ${x.l}">${LV[x.l]}</span>${STATS.isSolved(`${L.id}:ex${j}`) ? `<span class="solved">${T('solved')}</span>` : ''}</h4></div>
    <p>${x.d}</p>
    ${E ? `<div class="exio-l">${T('runExample')}</div><div class="exio">${E[0] ? `<div><small>${T('inLbl')}</small><pre>${esc(E[0])}</pre></div>` : ''}<div><small>${T('outLbl')}</small><pre>${esc(E[1])}</pre></div></div>` : ''}
    <div class="ex-act"><button class="btn pri" data-ex="${L.id}|${j}">${T('practiceBtn')}</button><button class="btn" data-hint>${T('seeHint')}</button></div>
    <div class="hint"><div>${x.h}</div></div></div>`; }).join('') + `</div>`;
  const nx = next ? { id: next.id, t: next.title } : { id: 'projetos', t: T('navProjects') }, isDone = done.has(L.id);
  h += `<div class="lesson-foot">
    <div class="up-next"><span>${T('upNext')}</span><b>${esc(nx.t)}</b></div>
    <div class="foot-bar">
      ${prev ? `<button class="btn fb fb-prev" data-go="${prev.id}" title="${esc(prev.title)}" aria-label="${esc(T('prevAria', prev.title))}"><span aria-hidden="true">←</span><span class="t">${T('prev')}</span></button>` : ''}
      <button class="btn fb fb-done ${isDone ? 'is' : ''}" data-done="${L.id}" aria-pressed="${isDone}"><span class="ck" aria-hidden="true">${isDone ? '✓' : ''}</span>${isDone ? T('completed') : T('complete')}</button>
      <button class="btn pri fb fb-next" data-go="${nx.id}" aria-label="${esc(T('nextAria', nx.t))}">${T('next')} <span aria-hidden="true">→</span></button>
    </div>
  </div>`;
  return h;
}
function renderHome() {
  const last = LESSONS.find(l => l.id === store.get('last', '')) || LESSONS.find(l => !done.has(l.id)) || LESSONS[0];
  let h = `<h1>${T('homeH1')}</h1>
  <p class="lead">${T('homeLead', LESSONS.length)}</p>
  <div class="hero"><b>${T('continueH')}</b><span style="color:var(--fg2)">${esc(last.title)}${last.unit ? T('unitWord', last.unit) : ''}</span><button class="btn pri" data-go="${last.id}">${T('openLesson')}</button></div>
  <button class="unit-card" data-go="eclipse" style="width:100%;border-color:var(--acc);margin-bottom:8px"><span class="n" style="color:var(--acc)">${T('startHere')}</span><b>${T('eclipseT')}</b><span>${T('eclipseD')}</span></button>
  <button class="unit-card rs-cta" data-go="resumo" style="width:100%;margin-bottom:8px"><span class="n" style="color:var(--acc)">${T('examSoon')}</span><b>${T('sum3')}</b><span>${T('sum3d')}</span></button>
  <button class="unit-card" data-go="painel" style="width:100%;margin-bottom:8px"><span class="n" style="color:var(--fg3)">${T('panelTag')}</span><b>${T('yourProg')}</b><span>${T('yourProgD')}</span></button>
  <h2>${T('unitsH')}</h2><div class="unit-cards">`;
  for (const u of [1, 2, 3]) {
    const ls = LESSONS.filter(l => l.unit === u), d = ls.filter(l => done.has(l.id)).length;
    h += `<button class="unit-card" data-go="${ls[0].id}"><span class="n" style="color:${UNITS[u].color}">${T('unitUpper', u)}</span><b>${UNITS[u].name}</b><span>${ls.map(l => l.title).join(' · ')}</span><div class="mini"><i style="width:${d / ls.length * 100}%;background:${UNITS[u].color}"></i></div></button>`;
  }
  h += `</div>
  <h2>${T('editorHowH')}</h2>
  <ul><li>${T('edLi1')}</li>
  <li>${isNarrow() ? T('edLi2Narrow') : T('edLi2Wide')}</li>
  <li>${T('edLi3')}</li>
  <li>${T('edLi4')}</li>
  <li>${T('edLi5')}</li></ul>
  <h2>${T('solveAny')}</h2>` + METODO + `
  <h2>${T('plan8')}</h2>` + PLAN.map(([w, t]) => `<div class="week"><b>${w}</b><span>${t}</span></div>`).join('');
  return h;
}
function renderProjects() {
  let h = `<div class="crumb" style="color:var(--acc)">${T('prCrumb')}</div><h1>${T('prH1')}</h1>
  <p class="lead">${T('prLead')}</p><div class="grid">`;
  PROJECTS.forEach((p, i) => { h += `<div class="card"><span class="tag" style="color:${UNITS[p.u].color}">${T('prUnit', p.u)}</span><h4>${esc(p.t)}</h4><p>${p.d}</p><p style="font-size:12.5px"><b>${T('prUses')}</b> ${p.k.map(k => `<code>${esc(k)}</code>`).join(' ')}</p><button class="btn pri" data-proj="${i}">${T('prStart')}</button></div>`; });
  h += `</div><h2>${T('prBefore')}</h2>
  <ul>${T('prLi').map(x => `<li>${x}</li>`).join('\n  ')}</ul>`;
  return h;
}
let justDone = null, sideTop = null, swapT;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function reveal(root) {
  if (!('IntersectionObserver' in window) || reduced()) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  root.querySelectorAll('.crumb,h1,.lead,h2,.note,.snip,.viz,.fig,.tbl-wrap,.prova,.quiz .q,.method,.ex,.card,.unit-card,.hero,.week,.lesson-foot').forEach(n => {
    n.classList.add('rv'); const sib = [...n.parentElement.children].filter(c => c.classList.contains('rv')); n.style.transitionDelay = Math.min(sib.indexOf(n), 5) * 55 + 'ms'; io.observe(n);
  });
}
function placeSideInd() {
  const sd = $('#side'), on = sd.querySelector('.lesson-btn.on'); let ind = sd.querySelector('.side-ind');
  if (!ind) { ind = document.createElement('div'); ind.className = 'side-ind'; sd.prepend(ind); }
  if (!on) { ind.style.opacity = 0; return; }
  const y = on.offsetTop, set = () => { ind.style.transform = `translate(${on.offsetLeft}px, ${y}px)`; ind.style.width = on.offsetWidth + 'px'; ind.style.height = on.offsetHeight + 'px'; ind.style.opacity = 1; };
  if (sideTop == null || reduced()) { ind.style.transition = 'none'; set(); void ind.offsetWidth; ind.style.transition = ''; }
  else { ind.style.transition = 'none'; ind.style.transform = `translate(${on.offsetLeft}px, ${sideTop}px)`; ind.style.width = on.offsetWidth + 'px'; ind.style.height = on.offsetHeight + 'px'; ind.style.opacity = 1; void ind.offsetWidth; ind.style.transition = ''; set(); }
  sideTop = y;
}
function go(id, keepScroll) {
  const li = $('#lessonIn');
  if (!keepScroll && li.childElementCount && !reduced() && view !== id) { li.classList.add('leave'); clearTimeout(swapT); swapT = setTimeout(() => render(id, keepScroll), 170); view = id; renderSide(); closeDrawer(); return; }
  render(id, keepScroll);
}
function render(id, keepScroll) {
  view = id; closeDrawer();
  const L = LESSONS.find(l => l.id === id);
  const li = $('#lessonIn');
  li.innerHTML = L ? renderLesson(L) : id === 'projetos' ? renderProjects() : id === 'painel' ? renderPainel() : id === 'resumo' ? renderResumo() : renderHome();
  if (id === 'resumo') li.querySelectorAll('pre[data-hl]').forEach(pre => { if (window.CodeMirror && CodeMirror.runMode) { const t = pre.textContent; pre.textContent = ''; CodeMirror.runMode(t, 'text/x-java', pre); } });
  if (id === 'painel') requestAnimationFrame(() => li.querySelectorAll('.ring-fg').forEach(c => c.classList.add('go')));
  li.classList.remove('leave');
  if (!keepScroll) reveal(li);
  $('#lessonIn').querySelectorAll('.viz[data-viz]').forEach(el => { try { VIZ[el.dataset.viz] && VIZ[el.dataset.viz](el); } catch (e) { console.error(e); } });
  if (L) { store.set('last', id); $('#lessonIn').querySelectorAll('pre[data-hl]').forEach(pre => { const [lid, k] = pre.dataset.hl.split('|'); const code = LESSONS.find(x => x.id === lid).codes[k]; if (window.CodeMirror && CodeMirror.runMode) CodeMirror.runMode(code, 'text/x-java', pre); else pre.textContent = code; }); }
  try { history.replaceState(null, '', '#' + id); } catch (e) {}
  if (!keepScroll) $('#lesson').scrollTop = 0;
  renderSide(); if (isNarrow()) setMode('lesson');
}
$('#lessonIn').addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.go) go(t.dataset.go);
  else if (t.dataset.load) { const [lid, k] = t.dataset.load.split('|'), L = LESSONS.find(x => x.id === lid); openFile(`${lid}:${k}`, `${L.title} · ${T('exampleSuffix')}`, L.codes[k], (L.codeIn || {})[k] || ''); }
  else if (t.dataset.ex) { const [lid, j] = t.dataset.ex.split('|'), x = LESSONS.find(l => l.id === lid).ex[+j]; openFile(`${lid}:ex${j}`, x.t, x.s, x.in || ''); }
  else if (t.dataset.qa) { const [lid, qi, oi] = t.dataset.qa.split('|'), q = QUIZ[lid][+qi], box = t.closest('.q'); STATS.quiz(lid, +qi, +oi === q[2]); box.querySelectorAll('.opt').forEach((b, k) => { b.disabled = true; if (k === q[2]) b.classList.add('ok'); else if (b === t) b.classList.add('bad'); }); const x = box.querySelector('.qx'); x.classList.add('open'); x.firstElementChild.innerHTML = (+oi === q[2] ? `<b style="color:var(--ok)">${T('qRight')}</b> ` : `<b style="color:var(--o-err)">${T('qWrong')}</b> `) + q[3]; }
  else if (t.dataset.jump) { const el = document.getElementById(t.dataset.jump); if (el) el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); }
  else if (t.classList.contains('fc')) t.classList.toggle('flip');
  else if (t.dataset.requiz) { STATS.clearQuiz(t.dataset.requiz); go(t.dataset.requiz, true); toast(T('tRequiz')); }
  else if (t.hasAttribute('data-reset')) { t.nextElementSibling.hidden = false; t.hidden = true; }
  else if (t.hasAttribute('data-reset-no')) { const b = t.closest('.resetbox'); b.querySelector('.rconf').hidden = true; b.querySelector('[data-reset]').hidden = false; }
  else if (t.hasAttribute('data-reset-yes')) { STATS.reset(); go('painel', true); toast(T('tReset')); }
  else if (t.hasAttribute('data-method')) { const m = t.closest('.method').querySelector('.method-ex'); const o = m.classList.toggle('open'); t.textContent = o ? T('hideEx') : T('seeEx'); }
  else if (t.hasAttribute('data-hint')) { const h = t.closest('.ex').querySelector('.hint'); const o = h.classList.toggle('open'); t.textContent = o ? T('hideHint') : T('seeHint'); }
  else if (t.dataset.done) { const id = t.dataset.done; done.has(id) ? done.delete(id) : (done.add(id), justDone = id); store.set('done', [...done]); go(id, true); if (done.has(id)) toast(T('tDone')); }
  else if (t.dataset.proj) { const p = PROJECTS[+t.dataset.proj]; openFile('proj:' + t.dataset.proj, p.t, `// ${T('prTplProject')}: ${p.t}\n// ${p.d}\n// ${T('prTplUses')}: ${p.k.join(', ')}\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n    }\n}\n`, ''); }
});

// ---------- editor ----------
const WELCOME = T('welcome');
let ed;
if (window.CodeMirror) {
  ed = CodeMirror($('#editorWrap'), {
    value: '', mode: 'text/x-java', lineNumbers: true, indentUnit: 4, tabSize: 4, indentWithTabs: false,
    matchBrackets: true, autoCloseBrackets: true, styleActiveLine: true, lineWrapping: isPhone(), viewportMargin: 50,
    extraKeys: { 'Ctrl-Enter': () => run(), 'Cmd-Enter': () => run(), Tab: cm => cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('    '), 'Shift-Tab': cm => cm.indentSelection('subtract') }
  });
} else { // fallback simples se o CDN não carregar
  const ta = document.createElement('textarea'); ta.spellcheck = false; ta.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;background:var(--code-bg);color:var(--code-fg);border:0;padding:12px;font:14px/1.6 JetBrains Mono,monospace;resize:none;outline:0'; $('#editorWrap').appendChild(ta);
  ed = { getValue: () => ta.value, setValue: v => ta.value = v, on() {}, refresh() {}, focus: () => ta.focus(), replaceSelection: s => ta.setRangeText(s, ta.selectionStart, ta.selectionEnd, 'end'), execCommand() {}, undo() {}, addLineClass() {}, removeLineClass() {}, scrollIntoView() {}, setCursor() {}, lineCount: () => 0 };
}
let file = { key: 'livre', title: 'Main.java', starter: WELCOME };
function saveDraft() { store.set(LK('code:' + file.key), ed.getValue()); store.set(LK('in:' + file.key), $('#stdin').value); }
function openFile(key, title, code, stdin) {
  saveDraft();
  file = { key, title, starter: code, stdinStarter: stdin };
  $('#fileName').textContent = title;
  ed.setValue(store.get(LK('code:' + key), code));
  $('#stdin').value = store.get(LK('in:' + key), stdin);
  clearErr(); store.set(LK('file'), file);
  setOut(`<span class="sys">${esc(T('loaded', title, !!stdin))}</span>`);
  setMode('code'); if (!isNarrow()) { ed.focus(); const ide = $('#ide'); ide.classList.remove('flash'); void ide.offsetWidth; ide.classList.add('flash'); }
  toast(T('tOpened'));
}
let saveT; ed.on('change', () => { clearErr(); clearTimeout(saveT); saveT = setTimeout(saveDraft, 400); });
$('#stdin').addEventListener('input', () => { clearTimeout(saveT); saveT = setTimeout(saveDraft, 400); });
$('#resetBtn').onclick = () => { ed.setValue(file.starter); $('#stdin').value = file.stdinStarter || ''; saveDraft(); toast(T('tCodeReset')); };
$('#copyBtn').onclick = async () => { try { await navigator.clipboard.writeText(ed.getValue()); toast(T('tCopied')); } catch (e) { if (ed.execCommand) ed.execCommand('selectAll'); toast(T('tSelected')); } };

// teclas de símbolos (celular)
const KEYS = ['Tab', '{', '}', '(', ')', ';', '"', '=', '+', '-', '*', '/', '<', '>', '[', ']', '!', '&', '|', '%', "'", '.', ',', ':', '←', '→', T('keyUndo')];
$('#keys').innerHTML = KEYS.map(k => `<button class="${k.length > 1 && !/^[←→]$/.test(k) ? 'w' : ''}" data-k="${esc(k)}">${esc(k)}</button>`).join('');
$('#keys').addEventListener('pointerdown', e => { if (e.target.closest('button')) e.preventDefault(); });
$('#keys').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const k = b.dataset.k;
  if (k === 'Tab') ed.replaceSelection('    '); else if (k === '←') ed.execCommand('goCharLeft'); else if (k === '→') ed.execCommand('goCharRight'); else if (k === T('keyUndo')) ed.undo(); else ed.replaceSelection(k);
  ed.focus();
});

// abas Saída / Entrada
function ioTab(which) {
  document.querySelectorAll('.io-tab').forEach(t => t.classList.toggle('on', t.dataset.io === which));
  $('#out').hidden = which !== 'out'; $('#stdin').hidden = which !== 'in';
  if (which === 'in' && !isPhone()) $('#stdin').focus();
}
document.querySelectorAll('.io-tab').forEach(t => t.onclick = () => ioTab(t.dataset.io));

// modo Aula ⇄ Código (tablet/celular)
function placeInd() { const b = document.querySelector('.tabbar button.on'), ind = $('.tb-ind'); if (!b || !ind) return; ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`; }
function setMode(m) {
  const was = document.body.classList.contains('code');
  document.body.classList.toggle('code', m === 'code');
  $('#tbLesson').classList.toggle('on', m !== 'code'); $('#tbCode').classList.toggle('on', m === 'code');
  placeInd();
  if (m === 'code' && !was) { ed.refresh(); setTimeout(() => ed.refresh(), 460); }
}
if (window.ResizeObserver) { const ro = new ResizeObserver(placeInd); ['#tbLesson', '#tbCode'].forEach(s => ro.observe($(s))); }
$('#tbLesson').onclick = () => setMode('lesson');
$('#tbCode').onclick = () => setMode('code');
$('#codeBtn').onclick = () => setMode(document.body.classList.contains('code') ? 'lesson' : 'code');

// ---------- execução ----------
const out = $('#out');
function setOut(html) { out.innerHTML = html; }
function addOut(text, cls) { const last = out.lastChild; if (!cls && last && last.nodeType === 3) last.appendData(text); else if (cls) { const s = document.createElement('span'); s.className = cls; s.textContent = text; out.appendChild(s); } else out.appendChild(document.createTextNode(text)); }
let errLine = null;
function clearErr() { if (errLine != null) { ed.removeLineClass(errLine, 'background', 'err-line'); errLine = null; } }
function markErr(line) { if (!line || line < 1 || line > ed.lineCount()) return; clearErr(); errLine = line - 1; ed.addLineClass(errLine, 'background', 'err-line'); ed.scrollIntoView({ line: errLine, ch: 0 }, 60); }
const explain = name => { const k = 'ex_' + name; return I18N.pt[k] !== undefined ? T(k) : null; };
let worker, timer, runStart;
function run() {
  saveDraft(); clearErr();
  if (worker) { worker.terminate(); worker = null; }
  ioTab('out'); setOut('');
  setMode('code');
  let js;
  try { js = JavaLite.transpile(ed.getValue()); }
  catch (e) {
    if (e instanceof JavaLite.CErr) { STATS.run(file.key, false, errCategory({ kind: 'compile', msg: e.message, cat: e.cat })); addOut(T('compileErr') + (e.line ? T('atLine', e.line) : '') + '\n', 'err'); addOut(e.message + '\n', 'err'); markErr(e.line); }
    else { addOut(T('cantParse') + e.message + '\n', 'err'); }
    $('#ioMeta').textContent = T('ioCompileErr'); return;
  }
  const blob = new Blob([`(${JAVA_RUNTIME.toString()})();`], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  try { worker = new Worker(url); } catch (e) { addOut(T('workerBlocked'), 'err'); return; }
  let stdout = '', echoed = '';
  const checkExpected = () => {
    const exp = expectedFor(file.key); if (!exp) return;
    const want = normOut(exp), got = normOut(stdout);
    const withIn = normOut(out.textContent);
    if (got === want || withIn === want) { const first = STATS.solve(file.key); addOut(T('okMatch'), 'okl'); if (first) toast(T('tSolved')); }
    else addOut(T('noMatch'), 'sys');
  };
  setRunning(true); runStart = performance.now(); $('#ioMeta').textContent = T('ioRunning');
  worker.onmessage = ev => {
    const m = ev.data;
    if (m.t === 'out') { addOut(m.d); stdout += m.d; }
    else if (m.t === 'in') { addOut(m.d, 'inp'); echoed += m.d; }
    else if (m.t === 'err') addOut(m.d, 'err');
    else if (m.t === 'done') { finish(); if (m.exit != null) addOut(`\nSystem.exit(${m.exit})\n`, 'sys'); $('#ioMeta').textContent = T('ioDone', Math.max(1, Math.round(m.ms))); if (!out.textContent.trim()) addOut(T('noPrint'), 'sys'); STATS.run(file.key, true); checkExpected(); }
    else if (m.t === 'fail') {
      finish(); $('#ioMeta').textContent = T('ioError'); STATS.run(file.key, false, errCategory(m));
      if (m.kind === 'stop') { addOut('\n' + T('outTooBig') + '\n', 'err'); return; }
      if (m.kind === 'java') {
        addOut(`\nException in thread "main" ${m.msg}\n`, 'err');
        const ex = explain(m.name); if (ex) addOut('→ ' + ex + '\n', 'sys');
        if (m.name === 'NoSuchElementException' || m.name === 'InputMismatchException') addOut(T('tapInput'), 'sys');
      } else {
        let msg = String(m.msg).replace(/\$_(\w+)/g, '$1'); let k;
        if ((k = msg.match(/^(\w+) is not defined/))) msg = T('cannotFind', k[1]);
        else if ((k = msg.match(/(\S+) is not a function/))) msg = T('notMethod', k[1].split('.').pop());
        else if (m.kind === 'syntax') msg = T('syntaxErr', msg);
        else if (/Assignment to constant/.test(msg)) msg = T('finalVar');
        else if (/already been declared/.test(msg)) msg = T('declTwice', msg.split(' ')[1] || '');
        addOut(T('errWord') + msg + '\n', 'err');
      }
      if (m.line) { markErr(m.line); addOut(T('atLineOut', m.line), 'sys'); }
    }
  };
  worker.onerror = e => { finish(); addOut(T('errWord') + (e.message || T('runFail')) + '\n', 'err'); e.preventDefault(); };
  worker.postMessage({ js, stdin: $('#stdin').value });
  timer = setTimeout(() => { if (worker) { worker.terminate(); worker = null; } finish(); addOut(T('timeoutMsg'), 'err'); $('#ioMeta').textContent = T('ioTimeout'); STATS.run(file.key, false, 'loop'); }, 6000);
  function finish() { clearTimeout(timer); setRunning(false); URL.revokeObjectURL(url); if (worker) { worker.terminate(); worker = null; } }
}
function setRunning(on) { [$('#runBtn'), $('#tbRun')].forEach(b => { b.disabled = on; }); $('#runBtn').innerHTML = on ? `… <span class="t">${T('runningWord')}</span>` : `▶ <span class="t">${T('run')}</span>`; $('#tbRun').textContent = on ? T('tbRunning') : T('tbRun'); }
$('#runBtn').onclick = run; $('#tbRun').onclick = run;

// ---------- início ----------
(() => {
  const f = store.get(LK('file'), null);
  if (f && f.key) { file = f; $('#fileName').textContent = f.title; ed.setValue(store.get(LK('code:' + f.key), f.starter)); $('#stdin').value = store.get(LK('in:' + f.key), f.stdinStarter || ''); }
  else ed.setValue(store.get(LK('code:livre'), WELCOME));
  const h = (location.hash || '').slice(1);
  go(LESSONS.some(l => l.id === h) || h === 'projetos' || h === 'painel' || h === 'resumo' ? h : 'inicio');
  setOut(`<span class="sys">${T('startInfo')}</span>`);
  addEventListener('resize', () => { if (window.CodeMirror && ed.setOption) ed.setOption('lineWrapping', isPhone()); });
})();

