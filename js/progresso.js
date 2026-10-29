/*
 * Lab. Programação II — Plataforma de estudos Java
 * Progresso: registra testes, execuções e exercícios resolvidos; calcula o domínio e monta o painel
 */
// ================= PROGRESSO: registro de desempenho + painel =================
const STATS = (() => {
  const blank = () => ({ quiz: {}, runs: {}, err: {}, solved: {} });
  let S = blank();
  try { const v = JSON.parse(localStorage.getItem('lp2:stats') || 'null'); if (v && v.quiz) S = v; } catch (e) {}
  const save = () => { try { localStorage.setItem('lp2:stats', JSON.stringify(S)); } catch (e) {} };
  const lessonOf = key => String(key || '').split(':')[0];
  return {
    get: () => S,
    reset() { S = blank(); save(); },
    quiz(lid, qi, ok) { const q = (S.quiz[lid] = S.quiz[lid] || {}); const r = (q[qi] = q[qi] || { n: 0, wrong: 0 }); r.n++; if (!ok) r.wrong++; r.last = ok; save(); },
    clearQuiz(lid) { if (S.quiz[lid]) Object.values(S.quiz[lid]).forEach(r => delete r.last); save(); },
    run(key, ok, cat) {
      const lid = lessonOf(key); const r = (S.runs[lid] = S.runs[lid] || { n: 0, ok: 0, fail: 0 }); r.n++; ok ? r.ok++ : r.fail++;
      if (!ok && cat) { const e = (S.err[cat] = S.err[cat] || { n: 0, l: {} }); e.n++; e.l[lid] = (e.l[lid] || 0) + 1; }
      save();
    },
    solve(key) { if (!S.solved[key]) { S.solved[key] = Date.now(); save(); return true; } return false; },
    isSolved: key => !!S.solved[key]
  };
})();

// categorias de erro → o que o aluno precisa revisar
const ERRCAT = {
  semi: [() => T('e_semi'), 'estrutura'], chave: [() => T('e_chave'), 'estrutura'], sintaxe: [() => T('e_sintaxe'), 'estrutura'],
  simbolo: [() => T('e_simbolo'), 'tipos'], idx: [() => T('e_idx'), 'vetores'], str: [() => T('e_str'), 'vetores'],
  div0: [() => T('e_div0'), 'tipos'], scanner: [() => T('e_scanner'), 'entrada'], loop: [() => T('e_loop'), 'lacos'], rec: [() => T('e_rec'), 'recursao'],
  npe: [() => T('e_npe'), 'vetores'], printf: [() => T('e_printf'), 'entrada'], classe: [() => T('e_classe'), 'metodos'], outro: [() => T('e_outro'), 'estrutura']
};function errCategory(m) {
  if (m.kind === 'compile') { if (m.cat) return m.cat; const t = m.msg || ''; return /';'/.test(t) ? 'semi' : /chave|parêntese|'\}'|'\)'/.test(t) ? 'chave' : /classe/.test(t) ? 'classe' : 'sintaxe'; }
  if (m.kind === 'timeout') return 'loop';
  return { ArrayIndexOutOfBoundsException: 'idx', IndexOutOfBoundsException: 'idx', StringIndexOutOfBoundsException: 'str', ArithmeticException: 'div0', InputMismatchException: 'scanner', NoSuchElementException: 'scanner', StackOverflowError: 'rec', NullPointerException: 'npe', IllegalFormatConversionException: 'printf' }[m.name]
    || (/not defined|cannot find/.test(m.msg || '') ? 'simbolo' : 'outro');
}
// compara a saída do programa com a saída esperada do exemplo
const normOut = t => String(t).replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/, '')).filter(l => l.trim()).join('\n');
function expectedFor(key) {
  const m = /^(.+):ex(\d+)$/.exec(key || ''); if (!m) return null;
  const E = EXAMPLES[`${m[1]}:${m[2]}`]; if (!E || /…/.test(E[1])) return null;
  return E[1].split(/\n\s*\n\(/)[0];
}

// ---- cálculo de domínio ----
function lessonScore(L) {
  const S = STATS.get(), q = S.quiz[L.id] || {}, T = (QUIZ[L.id] || []).length;
  const answered = Object.values(q).filter(r => r.last !== undefined).length, right = Object.values(q).filter(r => r.last === true).length;
  const E = L.ex.length, solved = L.ex.filter((_, j) => STATS.isSolved(`${L.id}:ex${j}`)).length;
  const runs = S.runs[L.id] || { n: 0, ok: 0, fail: 0 }, isDone = done.has(L.id);
  const started = answered || solved || isDone || runs.n;
  const qScore = T ? right / T : (isDone ? 1 : 0), eScore = E ? solved / E : 1;
  const score = Math.round((0.5 * qScore + 0.35 * eScore + 0.15 * (isDone ? 1 : 0)) * 100);
  const acc = answered ? right / answered : null;
  let st = !started ? 'novo' : (acc !== null && acc < 0.5) ? 'reforcar' : score >= 75 ? 'ok' : score >= 45 ? 'atencao' : 'reforcar';
  if (runs.fail >= 4 && runs.fail > runs.ok * 2 && st === 'ok') st = 'atencao';
  return { score, st, T, answered, right, E, solved, runs, isDone, acc };
}
const ST_LBL = { ok: ['✓', T('stOk')], atencao: ['!', T('stAtt')], reforcar: ['✕', T('stRev')], novo: ['○', T('stNew')] };
const chip = st => `<span class="st st-${st}"><i>${ST_LBL[st][0]}</i>${ST_LBL[st][1]}</span>`;
function ring(p, color) {
  const r = 30, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 76 76" role="img" aria-label="${T('ringAria', p)}"><circle cx="38" cy="38" r="${r}" class="ring-bg"/><circle cx="38" cy="38" r="${r}" class="ring-fg" style="stroke:${color};stroke-dasharray:${c};--off:${c * (1 - p / 100)}" transform="rotate(-90 38 38)"/><text x="38" y="43">${p}%</text></svg>`;
}

function renderPainel() {
  const S = STATS.get(), rows = LESSONS.map(L => ({ L, ...lessonScore(L) }));
  const tq = rows.reduce((a, r) => a + r.T, 0), ta = rows.reduce((a, r) => a + r.answered, 0), tr = rows.reduce((a, r) => a + r.right, 0);
  const te = rows.reduce((a, r) => a + r.E, 0), ts = rows.reduce((a, r) => a + r.solved, 0);
  const runs = Object.values(S.runs).reduce((a, r) => ({ n: a.n + r.n, fail: a.fail + r.fail }), { n: 0, fail: 0 });
  const anyData = ta || ts || runs.n || done.size;
  let h = `<div class="crumb">${T('pnCrumb')}</div><h1>${T('pnH1')}</h1><p class="lead">${T('pnLead')}</p>`;
  h += `<div class="kpis">
    <div class="kpi"><small>${T('kDone')}</small><b>${done.size}<span>/${LESSONS.length}</span></b></div>
    <div class="kpi"><small>${T('kAcc')}</small><b>${ta ? Math.round(tr / ta * 100) + '%' : '—'}</b><span class="kn">${T('kAnswered', ta, tq)}</span></div>
    <div class="kpi"><small>${T('kEx')}</small><b>${ts}<span>/${te}</span></b><span class="kn">${T('kExN')}</span></div>
    <div class="kpi"><small>${T('kErr')}</small><b>${runs.fail}</b><span class="kn">${T('kErrN', runs.n)}</span></div></div>`;
  if (!anyData) h += `<div class="empty"><b>${T('emptyB')}</b><span>${T('emptyS')}</span><button class="btn pri" data-go="${LESSONS[0].id}">${T('startFirst')}</button></div>`;
  // próximo passo
  const weak = rows.filter(r => r.st === 'reforcar' || r.st === 'atencao').sort((a, b) => a.score - b.score)[0];
  const fresh = rows.find(r => r.st === 'novo');
  const rec = weak || fresh;
  if (rec && anyData) h += `<div class="nextstep"><div><small>${T('nextStep')}</small><b>${weak ? T('nsReview') : T('nsStart')}: ${esc(rec.L.title)}</b><span>${weak ? T('nsWeak', rec.score, !!(rec.answered && rec.acc < 1), rec.solved < rec.E) : T('nsFresh')}</span></div><button class="btn pri" data-go="${rec.L.id}">${T('goLesson')}</button></div>`;
  // unidades
  h += `<h2>${T('byUnit')}</h2><div class="units">`;
  for (const u of [0, 1, 2, 3]) {
    const R = rows.filter(r => r.L.unit === u), avg = Math.round(R.reduce((a, r) => a + r.score, 0) / R.length);
    const SR = R.filter(r => r.st !== 'novo'), savg = SR.length ? SR.reduce((a, r) => a + r.score, 0) / SR.length : 0;
    const st = !SR.length ? 'novo' : SR.some(r => r.st === 'reforcar') && savg < 60 ? 'reforcar' : savg >= 75 ? 'ok' : 'atencao';
    const prog = T('unitProg', SR.length, R.length);
    h += `<div class="ucard"><div class="uhead">${ring(avg, UNITS[u].color)}<div><small>${u ? T('unitN', u) : T('moduleStart')} · ${prog}</small><b>${UNITS[u].name}</b>${chip(st)}</div></div>
      <div class="lrows">${R.map(r => `<button class="lrow" data-go="${r.L.id}"><span class="ln-t">${esc(r.L.title)}</span><span class="ln-bar"><i style="width:${r.score}%;background:var(--st-${r.st})"></i></span><span class="ln-p">${r.st === 'novo' ? '—' : r.score + '%'}</span><span class="ln-st c-${r.st}" title="${ST_LBL[r.st][1]}">${ST_LBL[r.st][0]}</span></button>`).join('')}</div></div>`;
  }
  h += `</div>`;
  // onde erra / onde está tranquilo
  const cats = Object.entries(S.err).sort((a, b) => b[1].n - a[1].n).slice(0, 6), maxc = cats.length ? cats[0][1].n : 1;
  const wrongQ = [];
  for (const L of LESSONS) Object.entries(S.quiz[L.id] || {}).forEach(([qi, r]) => { if (r.last === false || (r.wrong && r.last === undefined)) wrongQ.push({ L, q: QUIZ[L.id][+qi], w: r.wrong }); });
  const good = rows.filter(r => r.st === 'ok');
  h += `<div class="two"><section class="pane"><h3><span class="st st-reforcar"><i>✕</i></span> ${T('whereWrong')}</h3>`;
  h += cats.length ? `<p class="pn">${T('errIntro')}</p><div class="ebars">${cats.map(([k, e]) => `<button class="ebar" data-go="${ERRCAT[k][1]}"><span class="eb-t">${ERRCAT[k][0]()}</span><span class="eb-tr"><i style="width:${e.n / maxc * 100}%"></i></span><b>${e.n}</b></button>`).join('')}</div>`
    : `<p class="pn">${T('noErr')}</p>`;
  if (wrongQ.length) h += `<h4>${T('wrongRedo')}</h4><ul class="wq">${wrongQ.slice(0, 6).map(x => `<li><button data-go="${x.L.id}"><span>${x.q[0]}</span><small>${esc(x.L.title)}${x.w > 1 ? T('wrongTimes', x.w) : ''}</small></button></li>`).join('')}</ul>`;
  h += `</section><section class="pane"><h3><span class="st st-ok"><i>✓</i></span> ${T('whereGood')}</h3>`;
  h += good.length ? `<div class="goods">${good.map(r => `<button class="good" data-go="${r.L.id}"><b>${esc(r.L.title)}</b><span>${T('goodScore', r.score, r.right, r.T, r.solved, r.E)}</span></button>`).join('')}</div>`
    : `<p class="pn">${T('noGood')}</p>`;
  h += `</section></div>`;
  h += `<div class="resetbox"><button class="btn" data-reset>${T('resetBtn')}</button><span class="rconf" hidden>${T('resetAsk')} <button class="btn pri" data-reset-yes>${T('resetYes')}</button><button class="btn" data-reset-no>${T('resetNo')}</button></span></div>`;
  return h;
}

