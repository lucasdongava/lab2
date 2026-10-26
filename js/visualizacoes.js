/*
 * Lab. Programação II — Plataforma de estudos Java
 * Visualizações interativas (com atualização incremental do DOM para animar cada passo) e figuras explicativas
 */
// ================= VISUALIZAÇÕES INTERATIVAS =================
const VIZ = {};
function vhead(el, tag, title, sub) { el.innerHTML = `<div class="viz-h"><span class="tag">${tag}</span><b>${title}</b></div>${sub ? `<p class="vsub">${sub}</p>` : ''}`; }
// ---- morph: atualiza só o que mudou, para as transições CSS animarem entre os passos ----
const IH = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
function morph(el, html) { const t = document.createElement(el.tagName === 'TBODY' ? 'table' : 'div'); IH.set.call(t, html); patchKids(el, t); }
function isNew(n) { if (n.nodeType === 1) n.classList.add('m-new'); return n; }
function patchKids(a, b) {
  const bc = [...b.childNodes].filter(n => n.nodeType !== 3 || n.data.trim() || b.childNodes.length === 1);
  const keyed = bc.length && bc.every(n => n.nodeType === 1 && n.dataset.key != null);
  if (keyed) {
    const keys = new Set(bc.map(n => n.dataset.key)), old = new Map();
    [...a.childNodes].forEach(n => { if (n.nodeType === 1 && n.dataset.key != null && keys.has(n.dataset.key)) old.set(n.dataset.key, n); else n.remove(); });
    bc.forEach((nb, i) => { let na = old.get(nb.dataset.key); if (na) patch(na, nb); else na = isNew(nb); if (a.children[i] !== na) a.insertBefore(na, a.children[i] || null); });
    return;
  }
  const ac = [...a.childNodes].filter(n => n.nodeType !== 3 || n.data.trim() || a.childNodes.length === 1);
  bc.forEach((nb, i) => {
    const na = ac[i];
    if (!na) { a.appendChild(isNew(nb)); return; }
    if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) { a.replaceChild(isNew(nb), na); return; }
    if (na.nodeType === 3) { if (na.data !== nb.data) na.data = nb.data; return; }
    patch(na, nb);
  });
  for (let i = bc.length; i < ac.length; i++) ac[i].remove();
}
function patch(a, b) {
  for (const { name } of [...a.attributes]) if (!b.hasAttribute(name)) a.removeAttribute(name);
  for (const { name, value } of [...b.attributes]) if (a.getAttribute(name) !== value) a.setAttribute(name, value);
  if (a.classList.contains('vmsg')) { if (IH.get.call(a) !== IH.get.call(b)) { IH.set.call(a, IH.get.call(b)); a.classList.remove('flash'); void a.offsetWidth; a.classList.add('flash'); } return; }
  patchKids(a, b);
}
function add(el, html) {
  const d = document.createElement('div'); IH.set.call(d, html); const n = d.firstElementChild; el.appendChild(n);
  Object.defineProperty(n, 'innerHTML', { configurable: true, get() { return IH.get.call(n); }, set(v) { morph(n, v); } });
  return n;
}
const jnum = x => Number.isInteger(x) ? x + '.0' : String(+x.toFixed(4));
function cellsHTML(arr, cls, under) { return `<div class="cells">${arr.map((v, i) => `<div class="cell ${cls ? cls(i) : ''}"><b>${v}</b><small>[${i}]</small><em>${under ? under(i) : ''}</em></div>`).join('')}</div>`; }

// player: avança/volta por quadros pré-calculados
function player(el, build, draw, speed = 900) {
  const ctl = add(el, `<div class="vctl"><div class="vprog"><i></i></div><button data-a="prev" aria-label="Voltar um passo">◀</button><button data-a="play" class="pri"></button><button data-a="next">Próximo ▸</button><button data-a="reset" aria-label="Recomeçar">↺</button><span class="vstep"></span></div>`);
  let F = build(), i = 0, t = null;
  const B = k => ctl.querySelector(`[data-a=${k}]`);
  const stop = () => { clearInterval(t); t = null; };
  const show = () => { draw(F[i], i, F); ctl.querySelector('.vstep').textContent = `passo ${i + 1} de ${F.length}`; ctl.querySelector('.vprog i').style.transform = `scaleX(${(i + 1) / F.length})`; el.classList.toggle('playing', !!t); B('prev').disabled = !i; B('next').disabled = i >= F.length - 1; B('play').textContent = t ? '⏸ Pausar' : i >= F.length - 1 ? '↺ De novo' : '▶ Animar'; };
  ctl.onclick = e => {
    const a = e.target.closest('button')?.dataset.a; if (!a) return;
    if (a === 'prev') { stop(); i = Math.max(0, i - 1); }
    if (a === 'next') { stop(); i = Math.min(F.length - 1, i + 1); }
    if (a === 'reset') { stop(); i = 0; }
    if (a === 'play') { if (t) stop(); else { if (i >= F.length - 1) i = 0; t = setInterval(() => { if (!el.isConnected || i >= F.length - 1) { stop(); if (el.isConnected) show(); return; } i++; show(); }, speed); } }
    show();
  };
  show();
  return { reload() { stop(); F = build(); i = 0; show(); } };
}
const codeBox = (lines, on) => `<div class="vcode">${lines.map((l, i) => `<div class="${i === on ? 'on' : ''}">${l || ' '}</div>`).join('')}</div>`;
const vbox = (name, val, chg, note) => `<div class="vbox ${chg ? 'chg' : ''}"><span>${name}</span><b>${val}</b>${note ? `<small>${note}</small>` : ''}</div>`;

// 1) Anatomia do programa
VIZ.anatomia = el => {
  vhead(el, 'Toque para explorar', 'As partes de um programa Java', 'Toque em qualquer parte do código (ou nos botões) para ver o que ela faz.');
  const P = {
    cls: ['Classe', '<b>public class Main</b> cria a classe, o “recipiente” de todo o código. O nome <code>Main</code> precisa ser igual ao nome do arquivo: <code>Main.java</code>.'],
    main: ['main', '<b>main</b> é a porta de entrada. Quando você executa, o Java procura exatamente esta linha e começa por ela, de cima para baixo.'],
    out: ['println', '<b>System.out.println</b> escreve na tela e pula para a próxima linha. <code>print</code> escreve sem pular.'],
    str: ['String', 'Texto entre <b>aspas duplas</b> é uma String. Ele aparece na tela exatamente como está escrito.'],
    semi: ['; (ponto e vírgula)', 'O <b>;</b> marca o fim de cada instrução, como o ponto final de uma frase. Esquecer é o erro mais comum.'],
    brace: ['{ } (chaves)', 'As <b>chaves</b> abrem e fecham blocos. Tudo entre <code>{</code> e <code>}</code> pertence à classe ou ao método de fora.']
  };
  const S = (p, t) => `<span data-p="${p}">${t}</span>`;
  add(el, `<div class="vcode anat">${[
    `${S('cls', 'public class Main')} ${S('brace', '{')}`,
    `    ${S('main', 'public static void main(String[] args)')} ${S('brace', '{')}`,
    `        ${S('out', 'System.out.println(')}${S('str', '"Olá, Lab II!"')}${S('out', ')')}${S('semi', ';')}`,
    `    ${S('brace', '}')}`, `${S('brace', '}')}`].map(l => `<div>${l}</div>`).join('')}</div>`);
  const chips = add(el, `<div class="chips">${Object.entries(P).map(([k, v]) => `<button data-p="${k}">${v[0]}</button>`).join('')}</div>`);
  const msg = add(el, `<div class="vmsg">Comece tocando em <b>public class Main</b>.</div>`);
  const pick = k => { el.querySelectorAll('[data-p]').forEach(n => n.classList.toggle('on', n.dataset.p === k)); msg.innerHTML = P[k][1]; };
  el.addEventListener('click', e => { const n = e.target.closest('[data-p]'); if (n) pick(n.dataset.p); });
  void chips;
};

// 2) Laboratório da divisão
VIZ.divisao = el => {
  vhead(el, 'Teste valores', 'Por que 7 / 2 dá 3?', 'Troque os números e os tipos e veja o que o Java calcula.');
  const f = add(el, `<div class="row-in">
    <label><select data-k="ta"><option>int</option><option>double</option></select> a =</label><input type="number" data-k="a" value="7" step="any">
    <label><select data-k="tb"><option>int</option><option>double</option></select> b =</label><input type="number" data-k="b" value="2" step="any"></div>`);
  const outp = add(el, `<div></div>`);
  const upd = () => {
    const q = k => f.querySelector(`[data-k=${k}]`).value;
    const ta = q('ta'), tb = q('tb'); let a = +q('a') || 0, b = +q('b') || 0; const notes = [];
    if (ta === 'int' && !Number.isInteger(a)) { notes.push(`int não guarda casas decimais: ${a} vira <b>${Math.trunc(a)}</b>.`); a = Math.trunc(a); }
    if (tb === 'int' && !Number.isInteger(b)) { notes.push(`int não guarda casas decimais: ${b} vira <b>${Math.trunc(b)}</b>.`); b = Math.trunc(b); }
    const inteira = ta === 'int' && tb === 'int'; let res, expl;
    const show = v => inteira ? String(v) : jnum(v);
    if (b === 0) { res = inteira ? '💥 ArithmeticException' : (a === 0 ? 'NaN' : (a > 0 ? 'Infinity' : '-Infinity')); expl = inteira ? 'Divisão inteira por zero trava o programa com <b>ArithmeticException: / by zero</b>.' : 'Com double, dividir por zero não trava: o resultado é <b>Infinity</b> (ou NaN para 0/0). Mesmo assim, quase sempre é um bug.'; }
    else if (inteira) { const r = Math.trunc(a / b), real = a / b; res = String(r); expl = `Os dois são <b>int</b>, então o Java faz <b>divisão inteira</b>: calcula ${+real.toFixed(4)} e <b>joga fora</b> a parte decimal. O resto (<code>a % b</code>) é <b>${a % b}</b>.${Number.isInteger(real) ? '' : ' Para ter o valor exato, transforme um dos lados em double: <code>(double) a / b</code>.'}`; }
    else { res = jnum(a / b); expl = 'Pelo menos um lado é <b>double</b>, então o Java faz a <b>divisão real</b>, com casas decimais.'; }
    outp.innerHTML = `<div class="vcode"><div>${ta} a = ${show(a)};</div><div>${tb} b = ${tb === 'int' ? b : jnum(b)};</div><div class="on">System.out.println(a / b);   // → ${res}</div></div>
      <div class="stats" style="margin-top:10px"><div class="stat"><small>Resultado</small><b>${res}</b></div><div class="stat"><small>Divisão</small><b style="font-size:16px">${b === 0 ? '—' : inteira ? 'inteira' : 'real'}</b></div></div>
      <div class="vmsg" style="margin-top:10px">${notes.join(' ')} ${expl}</div>`;
  };
  f.addEventListener('input', upd); upd();
};

// 3) Scanner: o cursor que lê a entrada
VIZ.scanner = el => {
  vhead(el, 'Passo a passo', 'Como o Scanner lê o que você digita', 'Tudo que é digitado vai para uma fila de caracteres. O Scanner tem um cursor ▲ que anda por ela.');
  const tabs = add(el, `<div class="vtabs"><button class="vbtn on" data-s="0">Caso normal</button><button class="vbtn" data-s="1">A armadilha do nextLine</button></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const SC = [
    { input: 'Maria Souza\n20\n', code: ['String nome = sc.nextLine();', 'int idade = sc.nextInt();'],
      steps: [[0, -1, {}, 'O que foi digitado (incluindo cada <b>Enter ⏎</b>) fica guardado. O cursor ▲ começa no início.', 0, 0],
        [12, 0, { nome: '"Maria Souza"' }, '<code>nextLine()</code> lê <b>tudo até o Enter</b> e consome o ⏎ também. O cursor pula para a próxima linha.', 0, 12],
        [14, 1, { nome: '"Maria Souza"', idade: '20' }, '<code>nextInt()</code> lê só o número <b>20</b> e para <b>antes</b> do ⏎. Esse ⏎ que sobrou é a origem da armadilha.', 12, 14]] },
    { input: '20\nMaria\n', code: ['int idade = sc.nextInt();', 'String nome = sc.nextLine();', 'sc.nextLine();          // a correção', 'String nome = sc.nextLine();'],
      steps: [[0, -1, {}, 'Agora a ordem é inversa: primeiro um número, depois um texto.', 0, 0],
        [2, 0, { idade: '20' }, '<code>nextInt()</code> lê <b>20</b> e o cursor para <b>antes do ⏎</b>.', 0, 2],
        [3, 1, { idade: '20', nome: '""  ← vazio!' }, '<code>nextLine()</code> lê “até o Enter”, mas o Enter está bem ali. Resultado: <b>nome fica vazio</b> e “Maria” nem foi lida.', 2, 3],
        [3, 2, { idade: '20' }, '<b>Correção:</b> logo depois do <code>nextInt()</code>, chame um <code>sc.nextLine();</code> extra só para descartar o ⏎ que sobrou.', 2, 3],
        [9, 3, { idade: '20', nome: '"Maria"' }, 'Agora sim o próximo <code>nextLine()</code> lê <b>"Maria"</b>.', 3, 9]] }
  ];
  let sc = 0, P;
  const draw = s => {
    const [pos, line, vars, msg, rs, re] = s, S = SC[sc];
    const chars = [...S.input].map((c, i) => `<span class="${i < rs ? 'used' : ''} ${i >= rs && i < re ? 'read' : ''} ${c === '\n' ? 'nl' : ''} ${i === pos ? 'cur' : ''}">${c === '\n' ? '⏎' : c === ' ' ? '␣' : c}</span>`).join('');
    st.innerHTML = `<div class="buf" style="margin-bottom:14px">${chars}<span class="${pos >= S.input.length ? 'cur' : ''}" style="background:none"></span></div>
      ${codeBox(S.code, line)}
      <div class="mem"><div class="mem-col on"><h5>variáveis</h5>${Object.keys(vars).length ? Object.entries(vars).map(([k, v]) => vbox(k, v)).join('') : '<small style="color:var(--fg3)">nenhuma ainda</small>'}</div></div>
      <div class="vmsg">${msg}</div>`;
  };
  P = player(el, () => SC[sc].steps, draw, 1600);
  tabs.onclick = e => { const b = e.target.closest('[data-s]'); if (!b) return; sc = +b.dataset.s; tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); P.reload(); };
};

// 4) if / else com nota
VIZ.ifnota = el => {
  vhead(el, 'Arraste', 'O Java testa as condições de cima para baixo', 'Mude a nota. Só o primeiro bloco verdadeiro executa, e os de baixo nem são testados.');
  const r = add(el, `<div class="row-in"><label>nota =</label><input type="range" min="0" max="10" step="0.1" value="7.8"><span class="big" style="min-width:64px">7.8</span></div>`);
  const box = add(el, `<div class="conds"></div>`), msg = add(el, `<div class="vmsg"></div>`);
  const C = [['nota >= 9', n => n >= 9, 'Conceito A'], ['nota >= 7', n => n >= 7, 'Conceito B'], ['nota >= 6', n => n >= 6, 'Conceito C'], ['else', () => true, 'Reprovado']];
  const upd = () => {
    const n = +r.querySelector('input').value; r.querySelector('.big').textContent = n.toFixed(1);
    const k = C.findIndex(c => c[1](n));
    box.innerHTML = C.map((c, i) => `<div class="cond ${i < k ? 'no' : i === k ? 'yes' : 'skip'}"><span>${i === 0 ? 'if' : i === 3 ? '' : 'else if'} ${i === 3 ? 'else' : `(${c[0]})`}</span><span class="r">${i < k ? `${n.toFixed(1)} ${c[0].slice(5)} ? falso → pula` : i === k ? (i === 3 ? 'nenhuma foi verdadeira → executa' : 'verdadeiro → executa') : 'não é testado'}</span></div>`).join('');
    msg.innerHTML = `Saída: <b>${C[k][2]}</b>. ${k ? `O Java testou ${k + (k === 3 ? 0 : 1)} condição(ões) até achar o caminho.` : 'A primeira condição já foi verdadeira, então as outras foram ignoradas.'} ${n >= 7 && n < 9 ? 'Repare: 7.8 também é ≥ 6, mas o <code>else if (nota >= 6)</code> nunca chega a ser testado.' : ''}`;
  };
  r.addEventListener('input', upd); upd();
};

// 5) for passo a passo
VIZ.forpasso = el => {
  vhead(el, 'Passo a passo', 'O que acontece em cada volta do for', 'O for tem 3 partes: <b>início</b> (roda uma vez), <b>condição</b> (testada antes de cada volta) e <b>incremento</b> (depois de cada volta).');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const build = () => {
    const F = []; let soma = 0, i; const rows = [];
    F.push({ ln: 0, seg: null, i: '—', soma, ch: 'soma', msg: 'Cria <code>soma</code> valendo 0. Ela vai acumular o total.', rows: [] });
    i = 1; F.push({ ln: 1, seg: 'ini', i, soma, ch: 'i', msg: '<b>Início</b>: cria <code>i = 1</code>. Essa parte só roda uma vez.', rows: [] });
    for (; ;) {
      const ok = i <= 4;
      F.push({ ln: 1, seg: 'cond', i, soma, msg: `<b>Condição</b>: ${i} <= 4 é <b>${ok ? 'verdadeiro' : 'falso'}</b> → ${ok ? 'entra no laço' : 'sai do laço'}.`, rows: rows.slice() });
      if (!ok) break;
      const antes = soma; soma += i; rows.push([i, antes, soma]);
      F.push({ ln: 2, i, soma, ch: 'soma', msg: `<b>Corpo</b>: soma = ${antes} + ${i} = <b>${soma}</b>.`, rows: rows.slice() });
      i++; F.push({ ln: 1, seg: 'inc', i, soma, ch: 'i', msg: `<b>Incremento</b>: <code>i++</code> → i passa a valer ${i}. Volta para a condição.`, rows: rows.slice() });
    }
    F.push({ ln: 4, i: '—', soma, msg: `Fora do laço. Imprime <b>${soma}</b>. Repare que <code>i</code> não existe mais aqui: ela só vive dentro do for.`, rows: rows.slice(), out: soma });
    return F;
  };
  const seg = (s, k, t) => `<span class="${s === k ? 'on' : ''}">${t}</span>`;
  player(el, build, f => {
    const L = ['int soma = 0;', `for (${seg(f.seg, 'ini', 'int i = 1')}; ${seg(f.seg, 'cond', 'i <= 4')}; ${seg(f.seg, 'inc', 'i++')}) {`, '    soma = soma + i;', '}', 'System.out.println(soma);'];
    st.innerHTML = `${codeBox(L, f.ln)}
      <div class="stats"><div class="stat"><small>i</small><b>${f.i}</b></div><div class="stat"><small>soma</small><b>${f.soma}</b></div><div class="stat"><small>saída</small><b>${f.out ?? ''}</b></div></div>
      <div class="vmsg">${f.msg}</div>
      ${f.rows.length ? `<div class="tbl-wrap" style="margin:0"><table><tr><th>volta</th><th>i</th><th>soma antes</th><th>soma depois</th></tr>${f.rows.map((r, k) => `<tr data-key="r${k}"><td>${k + 1}ª</td><td>${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join('')}</table></div>` : ''}`;
  }, 1100);
};

// 6) Vetor: índices
VIZ.vetor = el => {
  vhead(el, 'Toque nas caixas', 'Um vetor é uma fileira de caixas numeradas', 'Cada caixa tem um <b>índice</b> (a posição, começando em 0). Toque numa caixa ou digite um índice.');
  const v = [7, 9, 5, 10, 8];
  const f = add(el, `<div class="row-in"><label>índice</label><input type="number" value="2" step="1"><span style="color:var(--fg2)">int[] notas = {7, 9, 5, 10, 8};</span></div>`);
  const cells = add(el, `<div></div>`), msg = add(el, `<div class="vmsg"></div>`);
  add(el, `<div class="stats"><div class="stat"><small>notas.length</small><b>5</b></div><div class="stat"><small>primeiro índice</small><b>0</b></div><div class="stat"><small>último índice</small><b>4</b></div></div>`);
  const inp = f.querySelector('input');
  const upd = () => {
    const i = Math.trunc(+inp.value), ok = i >= 0 && i < v.length;
    cells.innerHTML = `<div class="cells">${v.map((x, k) => `<button class="cell ${k === i ? 'cmp' : ''}" data-i="${k}"><b>${x}</b><small>[${k}]</small><em>${k === i ? '▲' : ''}</em></button>`).join('')}<div class="cell ${!ok && i >= v.length ? 'bad' : 'dim'}" style="opacity:.6"><b style="border-style:dashed">?</b><small>[5]</small><em></em></div></div>`;
    msg.innerHTML = ok ? `<code>notas[${i}]</code> vale <b>${v[i]}</b>. É a ${i + 1}ª caixa: o índice é sempre <b>posição − 1</b>.`
      : `<b style="color:var(--o-err)">ArrayIndexOutOfBoundsException</b>: Index ${i} out of bounds for length 5. As caixas vão de [0] a [4]. ${i === 5 ? 'Esse erro costuma vir de usar <code>i &lt;= v.length</code> no for em vez de <code>i &lt; v.length</code>.' : ''}`;
  };
  cells.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { inp.value = b.dataset.i; upd(); } });
  inp.addEventListener('input', upd); upd();
};

// 7) Busca sequencial animada
VIZ.buscaseq = el => {
  vhead(el, 'Simulação', 'Busca sequencial passo a passo', 'Escolha o valor procurado e acompanhe: uma comparação por casa, da esquerda para a direita.');
  const v = [42, 7, 19, 3, 88, 25, 61, 14];
  const f = add(el, `<div class="row-in"><label>procurar</label><input type="number" value="88"><span class="vtabs">${[42, 25, 50].map(x => `<button class="vbtn" data-v="${x}">${x}</button>`).join('')}</span></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const inp = f.querySelector('input');
  const build = () => {
    const alvo = Math.trunc(+inp.value), F = [{ i: -1, c: 0, msg: `Procurando <b>${alvo}</b>. Começa pela posição 0.` }];
    for (let i = 0; i < v.length; i++) {
      const hit = v[i] === alvo;
      F.push({ i, c: i + 1, hit, msg: `v[${i}] = ${v[i]} é igual a ${alvo}? ${hit ? `<b>Sim!</b> Devolve a posição <b>${i}</b>.` : 'Não → próxima casa.'}` });
      if (hit) return F;
    }
    F.push({ i: v.length, c: v.length, miss: true, msg: `Chegou ao fim sem achar: devolve <b>-1</b>. Foram ${v.length} comparações, o <b>pior caso</b>.` });
    return F;
  };
  const P = player(el, build, s => {
    st.innerHTML = cellsHTML(v, i => i === s.i ? (s.hit ? 'hit' : 'cmp') : i < s.i ? 'seen' : '', i => i === s.i && !s.hit ? '▲ i' : i === s.i ? '✓' : '') +
      `<div class="stats"><div class="stat"><small>comparações</small><b>${s.c}</b></div><div class="stat"><small>resultado</small><b>${s.hit ? s.i : s.miss ? -1 : '…'}</b></div></div><div class="vmsg">${s.msg}</div>`;
  }, 800);
  inp.addEventListener('change', () => P.reload());
  f.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { inp.value = b.dataset.v; P.reload(); } });
};

// 8) Busca binária animada
VIZ.buscabin = el => {
  vhead(el, 'Simulação', 'Busca binária: metade fora a cada passo', 'O vetor está <b>ordenado</b>. A cada passo olhamos o meio e descartamos a metade onde o valor não pode estar.');
  const v = [2, 5, 8, 12, 16, 23, 38, 45, 56, 63, 72, 80, 91, 97, 99];
  const f = add(el, `<div class="row-in"><label>procurar</label><input type="number" value="72"><span class="vtabs">${[23, 99, 40].map(x => `<button class="vbtn" data-v="${x}">${x}</button>`).join('')}</span></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const inp = f.querySelector('input');
  const build = () => {
    const alvo = Math.trunc(+inp.value); let ini = 0, fim = v.length - 1, n = 0;
    const F = [{ ini, fim, meio: -1, n, msg: `Procurando <b>${alvo}</b>. No início, a busca cobre o vetor todo: início = 0, fim = ${fim}.`, rows: [] }];
    const rows = [];
    while (ini <= fim) {
      const meio = Math.trunc((ini + fim) / 2); n++;
      const row = [n, ini, fim, meio, v[meio]];
      if (v[meio] === alvo) { rows.push([...row, 'achou']); F.push({ ini, fim, meio, n, hit: true, rows: rows.slice(), msg: `meio = (${ini} + ${fim}) / 2 = <b>${meio}</b>. v[${meio}] = ${v[meio]} é o valor procurado: <b>achou em ${n} passo(s)</b>.` }); return F; }
      const esq = alvo < v[meio];
      rows.push([...row, esq ? 'fim = meio − 1' : 'início = meio + 1']);
      F.push({ ini, fim, meio, n, rows: rows.slice(), msg: `meio = (${ini} + ${fim}) / 2 = <b>${meio}</b> → v[${meio}] = ${v[meio]}. ${alvo} ${esq ? '<' : '>'} ${v[meio]}, então ele só pode estar à <b>${esq ? 'esquerda' : 'direita'}</b>: ${esq ? `fim = ${meio - 1}` : `início = ${meio + 1}`}.` });
      if (esq) fim = meio - 1; else ini = meio + 1;
    }
    F.push({ ini, fim, meio: -1, n, miss: true, rows: rows.slice(), msg: `início (${ini}) passou do fim (${fim}): o intervalo ficou vazio. Não existe → devolve <b>-1</b>. Só ${n} comparações, mesmo sem achar.` });
    return F;
  };
  const P = player(el, build, s => {
    st.innerHTML = cellsHTML(v, i => i === s.meio ? (s.hit ? 'hit' : 'cmp') : (i < s.ini || i > s.fim ? 'dim' : ''), i => [i === s.ini && !s.miss ? 'ini' : '', i === s.meio ? 'meio' : '', i === s.fim && !s.miss ? 'fim' : ''].filter(Boolean).join('/')) +
      `<div class="vmsg">${s.msg}</div>` +
      (s.rows.length ? `<div class="tbl-wrap" style="margin:0"><table><tr><th>passo</th><th>início</th><th>fim</th><th>meio</th><th>v[meio]</th><th>decisão</th></tr>${s.rows.map((r, k) => `<tr data-key="r${k}">${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>` : '');
  }, 1500);
  inp.addEventListener('change', () => P.reload());
  f.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { inp.value = b.dataset.v; P.reload(); } });
};

// 9) Sequencial × binária (comparação de custo)
VIZ.cmpbusca = el => {
  vhead(el, 'Arraste', 'Quantas comparações no pior caso?', 'Aumente o tamanho do vetor e compare as duas buscas.');
  const N = [10, 100, 1000, 10000, 100000, 1000000, 1000000000];
  const r = add(el, `<div class="row-in"><label>n =</label><input type="range" min="0" max="6" step="1" value="2"><span class="big" style="min-width:150px"></span></div>`);
  add(el, `<div class="legend"><span><i style="background:var(--c1)"></i>Sequencial · O(n)</span><span><i style="background:var(--c2)"></i>Binária · O(log n)</span></div>`);
  const box = add(el, `<div class="cmpbar"></div>`), msg = add(el, `<div class="vmsg"></div>`);
  const fmt = x => x.toLocaleString('pt-BR');
  const upd = () => {
    const n = N[+r.querySelector('input').value], b = Math.floor(Math.log2(n)) + 1;
    r.querySelector('.big').textContent = fmt(n);
    box.innerHTML = `<div class="ln"><span>Sequencial</span><div class="tr"><i style="width:100%;background:var(--c1)"></i><span style="color:#fff">${fmt(n)}</span></div></div>
      <div class="ln"><span>Binária</span><div class="tr"><i style="width:${Math.max(b / n * 100, .6)}%;background:var(--c2)"></i><span style="left:${Math.min(Math.max(b / n * 100, .6), 90) + 2}%">${b}</span></div></div>`;
    msg.innerHTML = `Com ${fmt(n)} elementos, a binária faz no máximo <b>${b}</b> comparações contra <b>${fmt(n)}</b> da sequencial: <b>${fmt(Math.round(n / b))} vezes menos</b>. Cada vez que o vetor dobra, a binária precisa de só <b>+1</b> passo.`;
  };
  r.addEventListener('input', upd); upd();
};

// 10) Ordenação animada (bubble / selection)
function sortFrames(kind, a0) {
  const a = a0.slice(), F = [], done = new Set(), ids = a0.map((_, k) => k); let c = 0, t = 0;
  const push = (o, msg) => F.push({ a: a.slice(), ids: ids.slice(), done: new Set(done), c, t, msg, ...o });
  const sw = (x, y) => { [a[x], a[y]] = [a[y], a[x]]; [ids[x], ids[y]] = [ids[y], ids[x]]; };
  push({}, `Vetor inicial: <b>[${a.join(', ')}]</b>.`);
  if (kind === 'bubble') {
    for (let i = 0; i < a.length - 1; i++) {
      let trocou = false;
      for (let j = 0; j < a.length - 1 - i; j++) {
        c++; const sw = a[j] > a[j + 1], swp = (x, y) => { [a[x], a[y]] = [a[y], a[x]]; [ids[x], ids[y]] = [ids[y], ids[x]]; };
        push({ cmp: [j, j + 1] }, `Passada ${i + 1}: compara v[${j}] = ${a[j]} com v[${j + 1}] = ${a[j + 1]}. ${sw ? `${a[j]} > ${a[j + 1]} → <b>troca</b>.` : 'Já estão em ordem → não troca.'}`);
        if (sw) { swp(j, j + 1); t++; trocou = true; push({ swap: [j, j + 1] }, `Trocou: agora <b>[${a.join(', ')}]</b>.`); }
      }
      done.add(a.length - 1 - i);
      push({ pass: i + 1 }, `Fim da passada ${i + 1}: o maior que sobrou (<b>${a[a.length - 1 - i]}</b>) “borbulhou” para a posição ${a.length - 1 - i}. Vetor: <b>[${a.join(', ')}]</b>.`);
      if (!trocou) { a.forEach((_, k) => done.add(k)); push({}, `Nenhuma troca nesta passada → o vetor <b>já está ordenado</b>. Para aqui (otimização).`); return F; }
    }
  } else {
    for (let i = 0; i < a.length - 1; i++) {
      let m = i; push({ min: m, at: i }, `Passada ${i + 1}: procurar o menor entre as posições ${i} e ${a.length - 1}. Começa achando que é v[${i}] = ${a[i]}.`);
      for (let j = i + 1; j < a.length; j++) {
        c++; const menor = a[j] < a[m];
        push({ min: m, cmp: [j], at: i }, `Compara v[${j}] = ${a[j]} com o menor até agora (${a[m]}). ${menor ? `<b>${a[j]} é menor</b> → novo menor.` : 'Não é menor.'}`);
        if (menor) m = j;
      }
      if (m !== i) { sw(i, m); t++; }
      done.add(i);
      push({ swap: m !== i ? [i, m] : null, pass: i + 1 }, `${m !== i ? `Troca v[${i}] com v[${m}]` : `O menor já estava na posição ${i}, sem troca`}. Fim da passada ${i + 1}: <b>[${a.join(', ')}]</b>.`);
    }
  }
  a.forEach((_, k) => done.add(k)); push({}, `Pronto! <b>${c}</b> comparações e <b>${t}</b> trocas.`);
  return F;
}
function sortViz(kind) {
  return el => {
    vhead(el, 'Simulação', kind === 'bubble' ? 'Bubble Sort em ação' : 'Selection Sort em ação', kind === 'bubble' ? 'Compara vizinhos e troca. Siga o texto embaixo: é exatamente o que a prova pede para simular.' : 'Acha o menor e coloca na frente. Siga o texto: é o que a prova pede para simular.');
    let arr = [5, 3, 8, 1, 9, 2, 7, 4];
    const tb = add(el, `<div class="vtabs"><button class="vbtn" data-a="shuf">🔀 Embaralhar</button><button class="vbtn" data-a="worst">Pior caso</button><button class="vbtn" data-a="best">Já ordenado</button></div>`);
    add(el, `<div class="legend"><span><i style="background:var(--c1)"></i>Comparando</span><span><i style="background:var(--c2)"></i>${kind === 'bubble' ? 'Trocando' : 'Menor até agora / troca'}</span><span><i style="background:var(--c3)"></i>No lugar certo</span></div>`);
    const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
    const P = player(el, () => sortFrames(kind, arr), s => {
      const mx = Math.max(...s.a);
      const n = s.a.length;
      st.innerHTML = `<div class="bars sb">${s.ids.map((_, id) => { const k = s.ids.indexOf(id), x = s.a[k]; const cl = s.swap && s.swap.includes(k) ? 'swap' : s.cmp && s.cmp.includes(k) ? 'cmp' : s.min === k ? 'min' : s.done.has(k) ? 'done' : ''; return `<div class="sbar ${cl}" style="width:${100 / n}%;transform:translateX(${k * 100}%)"><i style="height:${x / mx * 100}%"></i><span>${x}</span></div>`; }).join('')}</div>
        <div class="stats"><div class="stat"><small>comparações</small><b>${s.c}</b></div><div class="stat"><small>trocas</small><b>${s.t}</b></div></div>
        <div class="vmsg">${s.msg}</div>`;
    }, 700);
    tb.onclick = e => { const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return; if (a === 'shuf') { arr = arr.slice().sort(() => Math.random() - .5); } if (a === 'worst') arr = [9, 8, 7, 5, 4, 3, 2, 1]; if (a === 'best') arr = [1, 2, 3, 4, 5, 7, 8, 9]; P.reload(); };
  };
}
VIZ.bubble = sortViz('bubble');
VIZ.selection = sortViz('selection');

// 11) Gráfico de complexidade
VIZ.complex = el => {
  vhead(el, 'Gráfico', 'Como o trabalho cresce com o tamanho do vetor', 'Passe o dedo ou o mouse sobre o gráfico para ver os valores.');
  const S = [{ n: 'O(n²) · Bubble / Selection', c: 'var(--c2)', f: n => n * n }, { n: 'O(n) · busca sequencial', c: 'var(--c1)', f: n => n }, { n: 'O(log n) · busca binária', c: 'var(--c3)', f: n => Math.ceil(Math.log2(n + 1)) }];
  add(el, `<div class="legend">${S.map(s => `<span><i style="background:${s.c}"></i>${s.n}</span>`).join('')}</div>`);
  const W = 600, H = 300, m = { l: 56, r: 20, t: 14, b: 40 }, NX = 30, MY = 900;
  const x = n => m.l + (n - 1) / (NX - 1) * (W - m.l - m.r), y = v => H - m.b - Math.min(v, MY) / MY * (H - m.t - m.b);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Eixo x: tamanho n de 1 a 30. Linhas de crescimento: n ao quadrado sobe rápido até 900 com n igual a 30; n e log de n ficam perto de zero">`;
  for (const v of [0, 300, 600, 900]) svg += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  for (const n of [1, 10, 20, 30]) svg += `<text x="${x(n)}" y="${H - 12}" text-anchor="middle">${n}</text>`;
  svg += ``;
  for (const s of S) { const pts = Array.from({ length: NX }, (_, i) => `${x(i + 1).toFixed(1)},${y(s.f(i + 1)).toFixed(1)}`).join(' '); svg += `<polyline points="${pts}" fill="none" stroke="${s.c}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`; }
  svg += `<text class="lbl" x="${x(21)}" y="${y(441) - 10}" style="fill:var(--c2)">n²</text><text class="lbl" x="${x(30) - 4}" y="${y(30) - 56}" text-anchor="end" style="fill:var(--c1)">n</text><text class="lbl" x="${x(30) - 4}" y="${y(5) - 30}" text-anchor="end" style="fill:var(--c3)">log n</text>`;
  svg += `<line class="xh" y1="${m.t}" y2="${H - m.b}" stroke="var(--fg3)" stroke-dasharray="3 3" opacity="0"/>${S.map((s, k) => `<circle class="pt${k}" r="5" fill="${s.c}" stroke="var(--panel)" stroke-width="2" opacity="0"/>`).join('')}`;
  svg += `<rect x="${m.l}" y="0" width="${W - m.l - m.r}" height="${H - m.b}" fill="transparent" class="hit"/></svg>`;
  const ch = add(el, `<div class="chart">${svg}<div class="ctip"></div></div>`);
  const msg = add(el, `<div class="vmsg">Com <b>30</b> elementos: ordenar com Bubble/Selection custa cerca de <b>900</b> comparações, a busca sequencial <b>30</b> e a binária só <b>5</b>. Por isso, em vetores grandes, a escolha do algoritmo importa mais que a velocidade do computador.</div>`);
  void msg;
  const sv = ch.querySelector('svg'), tip = ch.querySelector('.ctip');
  const move = e => {
    const r = sv.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W;
    const n = Math.min(NX, Math.max(1, Math.round((px - m.l) / (W - m.l - m.r) * (NX - 1) + 1)));
    sv.querySelector('.xh').setAttribute('x1', x(n)); sv.querySelector('.xh').setAttribute('x2', x(n)); sv.querySelector('.xh').setAttribute('opacity', 1);
    S.forEach((s, k) => { const c = sv.querySelector('.pt' + k); c.setAttribute('cx', x(n)); c.setAttribute('cy', y(s.f(n))); c.setAttribute('opacity', 1); });
    tip.innerHTML = `<b>n = ${n}</b><br>${S.map(s => `<i style="background:${s.c}"></i>${s.n.split(' · ')[0]}: <b>${s.f(n)}</b>`).join('<br>')}`;
    const tx = x(n) / W * r.width; tip.style.left = (tx > r.width / 2 ? tx - tip.offsetWidth - 12 : tx + 12) + 'px'; tip.style.top = '8px'; tip.style.opacity = 1;
  };
  sv.addEventListener('pointermove', move); sv.addEventListener('pointerdown', move);
  sv.addEventListener('pointerleave', () => { tip.style.opacity = 0; sv.querySelector('.xh').setAttribute('opacity', 0); S.forEach((_, k) => sv.querySelector('.pt' + k).setAttribute('opacity', 0)); });
};

// 12) Chamada de método
VIZ.chamada = el => {
  vhead(el, 'Passo a passo', 'O caminho de uma chamada de método', 'Os valores vão do main para o método e o resultado volta pelo return.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const L = ['static double media(double a, double b) {', '    double s = a + b;', '    return s / 2;', '}', '', '// dentro do main:', 'double m = media(7, 9);', 'System.out.println(m);'];
  const F = [
    { ln: 6, on: 'main', main: {}, met: null, arrow: '', msg: 'O main chega na linha <code>media(7, 9)</code> e <b>pausa</b>: antes de guardar em <code>m</code>, precisa do resultado.' },
    { ln: 0, on: 'met', main: {}, met: { a: '7.0', b: '9.0' }, arrow: '7, 9 →', msg: 'O Java entra em <code>media</code> e <b>copia</b> os argumentos para os parâmetros: a = 7, b = 9 (viram double).' },
    { ln: 1, on: 'met', main: {}, met: { a: '7.0', b: '9.0', s: '16.0' }, ch: 's', msg: 'Calcula <code>s = a + b</code> = 16.0. A variável <code>s</code> só existe dentro deste método.' },
    { ln: 2, on: 'met', main: {}, met: { a: '7.0', b: '9.0', s: '16.0' }, arrow: '← 8.0', msg: '<code>return s / 2</code> devolve <b>8.0</b> e <b>encerra</b> o método. As variáveis a, b e s deixam de existir.' },
    { ln: 6, on: 'main', main: { m: '8.0' }, met: null, ch: 'm', arrow: '', msg: 'De volta ao main: a chamada é “trocada” pelo valor devolvido e <code>m</code> recebe 8.0.' },
    { ln: 7, on: 'main', main: { m: '8.0' }, met: null, arrow: '', msg: 'Imprime <b>8.0</b>. Resumo: entra com argumentos, sai com um valor.' }];
  player(el, () => F, f => {
    st.innerHTML = codeBox(L, f.ln) + `<div class="mem"><div class="mem-col ${f.on === 'main' ? 'on' : ''}"><h5>main</h5>${Object.entries(f.main).map(([k, v]) => vbox(k, v, f.ch === k)).join('') || '<small style="color:var(--fg3)">esperando…</small>'}</div>
      <div class="arrow" style="align-self:center">${f.arrow || ''}</div>
      <div class="mem-col ${f.met ? 'on' : 'off'}"><h5>media(a, b)</h5>${f.met ? Object.entries(f.met).map(([k, v]) => vbox(k, v, f.ch === k)).join('') : '<small style="color:var(--fg3)">não está executando</small>'}</div></div><div class="vmsg">${f.msg}</div>`;
  }, 1700);
};

// 13) Valor × referência
VIZ.referencia = el => {
  vhead(el, 'Passo a passo', 'Cópia do valor × cópia do endereço', 'Veja por que mudar um int no método não muda nada fora, mas mudar um vetor muda.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const F = [
    { main: [['n', '5']], met: null, heap: null, msg: 'No main, <code>n = 5</code>. Um <b>int</b> guarda o próprio número dentro da variável.' },
    { main: [['n', '5']], met: ['dobrarNumero(x)', [['x', '5']]], heap: null, ch: 'x', msg: 'Chamou <code>dobrarNumero(n)</code>: o Java <b>copia o valor</b> 5 para <code>x</code>. São duas caixas diferentes.' },
    { main: [['n', '5']], met: ['dobrarNumero(x)', [['x', '10']]], heap: null, ch: 'x', msg: '<code>x = x * 2</code> muda só a cópia. A caixa <code>n</code> do main continua <b>5</b>.' },
    { main: [['n', '5']], met: null, heap: null, ch: 'n', msg: 'O método acabou e <code>x</code> sumiu. <b>n continua 5</b>.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: null, heap: [1, 2, 3], msg: 'Agora um vetor. A variável <code>v</code> <b>não guarda os números</b>: guarda o <b>endereço</b> (#A1) de onde o vetor está na memória.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: ['dobrarVetor(v)', [['v', '→ #A1']]], heap: [1, 2, 3], ch: 'v', msg: 'Chamou <code>dobrarVetor(v)</code>: o Java copia o <b>endereço</b>. As duas variáveis apontam para o <b>mesmo</b> vetor.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: ['dobrarVetor(v)', [['v', '→ #A1']]], heap: [2, 4, 6], hch: true, msg: 'O método altera <code>v[i]</code> → muda o vetor que está em #A1, que é o mesmo que o main enxerga.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: null, heap: [2, 4, 6], hch: true, msg: 'De volta ao main: <code>v</code> agora mostra <b>[2, 4, 6]</b>. <b>Primitivo</b>: copia o valor. <b>Vetor</b>: copia o endereço.' }];
  player(el, () => F, f => {
    st.innerHTML = `<div class="mem"><div class="mem-col ${!f.met ? 'on' : ''}"><h5>main</h5>${f.main.map(([k, v]) => vbox(k, v, f.ch === k)).join('')}</div>
      <div class="mem-col ${f.met ? 'on' : 'off'}"><h5>${f.met ? f.met[0] : 'método'}</h5>${f.met ? f.met[1].map(([k, v]) => vbox(k, v, f.ch === k)).join('') : '<small style="color:var(--fg3)">não está executando</small>'}</div>
      <div class="mem-col ${f.heap ? '' : 'off'}"><h5>memória de vetores · #A1</h5>${f.heap ? cellsHTML(f.heap, () => f.hch ? 'cmp' : '') : '<small style="color:var(--fg3)">vazia</small>'}</div></div><div class="vmsg">${f.msg}</div>`;
  }, 1800);
};

// 14) Pilha de chamadas da recursão
VIZ.pilha = el => {
  vhead(el, 'Passo a passo', 'A pilha de chamadas do fatorial', 'Cada chamada fica “esperando” a de baixo terminar. Depois as respostas voltam multiplicando.');
  const r = add(el, `<div class="row-in"><label>fatorial(</label><input type="range" min="1" max="6" value="4" style="max-width:200px"><span class="big">4</span><label>)</label></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const build = () => {
    const n = +r.querySelector('input').value; r.querySelector('.big').textContent = n;
    const F = [], stack = [];
    for (let k = n; k >= 1; k--) {
      stack.push({ k, w: k > 1 ? `espera ${k} × fatorial(${k - 1})` : 'caso base!' });
      F.push({ s: stack.map(x => ({ ...x })), msg: k > 1 ? `Chamou <code>fatorial(${k})</code>. ${k} não é ≤ 1, então precisa de <code>fatorial(${k - 1})</code>: <b>empilha</b> mais uma chamada.` : `<code>fatorial(1)</code>: <b>caso base</b>. Devolve 1 direto, sem chamar de novo. Agora a pilha começa a voltar.` });
    }
    let val = 1;
    stack[stack.length - 1].w = 'devolve 1'; stack[stack.length - 1].ret = true;
    F.push({ s: stack.map(x => ({ ...x })), msg: 'O topo devolve <b>1</b> para quem chamou.' });
    for (let k = 2; k <= n; k++) {
      stack.pop(); val *= k; const top = stack[stack.length - 1]; top.w = `${k} × ${val / k} = devolve ${val}`; top.ret = true;
      F.push({ s: stack.map(x => ({ ...x })), msg: `<code>fatorial(${k})</code> recebe ${val / k} e calcula ${k} × ${val / k} = <b>${val}</b>. Sai da pilha devolvendo ${val}.` });
    }
    F.push({ s: [], msg: `Resultado final: <code>fatorial(${n})</code> = <b>${val}</b>. Foram ${n} chamadas empilhadas. Sem caso base, a pilha cresceria até dar <b>StackOverflowError</b>.` });
    return F;
  };
  const P = player(el, build, f => {
    st.innerHTML = `<div class="stack">${f.s.slice().reverse().map((x, i) => `<div data-key="f${x.k}" class="frame ${i === 0 ? 'top' : ''} ${x.ret ? 'ret' : ''}"><span>fatorial(${x.k})</span><span class="r">${x.w}</span></div>`).join('') || '<div data-key="vazia" class="frame ret"><span>pilha vazia</span><span class="r">✓ terminou</span></div>'}</div><small style="color:var(--fg3)">▲ topo da pilha (quem está executando agora)</small><div class="vmsg">${f.msg}</div>`;
  }, 1300);
  r.addEventListener('input', () => P.reload());
};

// 15) Mapa do programa modularizado
VIZ.mapa = el => {
  vhead(el, 'Toque nos métodos', 'Mapa do programa de notas', 'O main chama cada método. Toque em um para ver o que ele recebe e devolve.');
  const M = { lerNotas: ['Scanner sc, int qtd', 'double[]', 'Lê qtd notas do teclado e devolve o vetor preenchido.'], media: ['double[] v', 'double', 'Soma tudo e divide pelo tamanho.'], maior: ['double[] v', 'double', 'Percorre o vetor guardando o maior valor visto.'], situacao: ['double media', 'String', 'Decide Aprovado / Prova final / Reprovado.'] };
  const t = add(el, `<div class="tree"><button class="root on" data-m="main">main</button><div class="arrow">↓ chama ↓</div><div class="lvl">${Object.keys(M).map(k => `<button data-m="${k}">${k}()</button>`).join('')}</div></div>`);
  const msg = add(el, `<div class="vmsg">O <b>main</b> só organiza: lê a quantidade, chama os métodos na ordem e imprime. Nenhum cálculo fica nele.</div>`);
  t.onclick = e => { const b = e.target.closest('[data-m]'); if (!b) return; t.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); const k = b.dataset.m; msg.innerHTML = k === 'main' ? 'O <b>main</b> só organiza: lê a quantidade, chama os métodos na ordem e imprime. Nenhum cálculo fica nele.' : `<b>${k}</b> recebe <code>${M[k][0]}</code> e devolve <code>${M[k][1]}</code>. ${M[k][2]}`; };
};

// ================= FIGURAS: explicações visuais =================
const fig = (body, cap) => `<figure class="fig">${body}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const arrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--fg3)"/></marker></defs>`;
const FIG = {
  // aninhamento arquivo > classe > método > instruções
  estrutura: () => fig(`<div class="nest n0"><span class="nl">📄 Main.java · arquivo</span>
      <div class="nest n1"><span class="nl">public class Main { … }</span>
        <div class="nest n2"><span class="nl">public static void main(String[] args) { … }</span>
          <div class="nest n3"><code>System.out.println("Olá");</code><code>int x = 5;</code><code>…</code></div>
        </div></div></div>`, 'Uma coisa dentro da outra: o arquivo guarda a classe, a classe guarda o main e o main guarda as instruções.'),

  // variáveis como caixas
  caixas: () => fig(`<div class="boxes">${[
      ['int', 'idade', '19', 'inteiros'], ['double', 'media', '7.5', 'decimais'], ['char', 'op', "'+'", '1 caractere'], ['boolean', 'ok', 'true', 'sim / não'], ['String', 'nome', '"Ana"', 'texto']
    ].map(([t, n, v, d]) => `<div class="vb"><small class="vt">${t}</small><div class="vv">${v}</div><b>${n}</b><small>${d}</small></div>`).join('')}</div>`,
    'Cada variável é uma caixa com etiqueta (o nome) e formato (o tipo). O tipo decide o que cabe dentro.'),

  // do teclado à variável
  scanfluxo: () => fig(`<div class="flow">
      <div class="fnode"><span class="ic">⌨️</span><b>Você digita</b><code>Maria⏎ 20⏎</code></div><span class="fa"></span>
      <div class="fnode acc"><span class="ic">🔎</span><b>Scanner sc</b><small>lê a fila de caracteres</small></div><span class="fa"></span>
      <div class="fcol"><div class="fnode"><code>sc.nextLine()</code><span>→ nome = "Maria"</span></div><div class="fnode"><code>sc.nextInt()</code><span>→ idade = 20</span></div></div>
    </div>`, 'O Scanner é o intermediário entre o teclado e as variáveis. Cada método lê um pedaço da fila.'),

  // fluxograma if/else
  iffluxo: () => fig(`<svg class="fsvg" viewBox="0 0 340 290" role="img" aria-label="Fluxograma: se nota maior ou igual a 7, Aprovado; senão, Reprovado; depois o programa continua">${arrowDefs('ai')}
      <rect x="110" y="6" width="120" height="32" rx="16" class="s-pill"/><text x="170" y="27" class="s-t">nota = 7.8</text>
      <path d="M170 38V62" class="s-ln" marker-end="url(#ai)"/>
      <path d="M170 64L250 100L170 136L90 100Z" class="s-dia"/><text x="170" y="105" class="s-t b">nota >= 7 ?</text>
      <path d="M90 100H60V160" class="s-ln ok" marker-end="url(#ai)"/><text x="70" y="92" class="s-lab ok">sim</text>
      <path d="M250 100H280V160" class="s-ln no" marker-end="url(#ai)"/><text x="270" y="92" class="s-lab no">não</text>
      <rect x="10" y="162" width="100" height="36" rx="10" class="s-box ok"/><text x="60" y="185" class="s-t">"Aprovado"</text>
      <rect x="230" y="162" width="100" height="36" rx="10" class="s-box"/><text x="280" y="185" class="s-t">"Reprovado"</text>
      <path d="M60 198V236H150" class="s-ln" marker-end="url(#ai)"/><path d="M280 198V236H190" class="s-ln" marker-end="url(#ai)"/>
      <rect x="100" y="240" width="140" height="32" rx="16" class="s-pill"/><text x="170" y="261" class="s-t">continua o programa</text>
      <circle r="6" class="s-dot"><animateMotion dur="4s" repeatCount="indefinite" path="M170 22V100H60V180V236H170V256"/></circle>
    </svg>`, 'O losango é a pergunta. O programa segue só um dos caminhos e depois os dois se juntam de novo.'),

  // fluxograma do for
  forfluxo: () => fig(`<svg class="fsvg" viewBox="0 0 340 330" role="img" aria-label="Fluxograma do for: início i igual a 1, testa i menor ou igual a 4, se sim executa o corpo e i++ e volta ao teste, se não sai do laço">${arrowDefs('af')}
      <rect x="110" y="6" width="120" height="34" rx="10" class="s-box"/><text x="170" y="28" class="s-t">int i = 1</text>
      <text x="246" y="28" class="s-lab">① início</text>
      <path d="M170 40V64" class="s-ln" marker-end="url(#af)"/>
      <path d="M170 66L240 100L170 134L100 100Z" class="s-dia"/><text x="170" y="105" class="s-t b">i <= 4 ?</text>
      <text x="246" y="128" class="s-lab">② condição</text>
      <path d="M170 134V160" class="s-ln ok" marker-end="url(#af)"/><text x="178" y="152" class="s-lab ok">sim</text>
      <rect x="90" y="162" width="160" height="34" rx="10" class="s-box ok"/><text x="170" y="184" class="s-t">corpo: soma += i</text>
      <path d="M170 196V220" class="s-ln" marker-end="url(#af)"/>
      <rect x="120" y="222" width="100" height="34" rx="10" class="s-box"/><text x="170" y="244" class="s-t">i++</text>
      <text x="226" y="244" class="s-lab">③ incremento</text>
      <path d="M120 239H40V100H98" class="s-ln loop" marker-end="url(#af)"/><text x="30" y="172" class="s-lab" transform="rotate(-90 30 172)">repete</text>
      <path d="M240 100H306V300H232" class="s-ln no" marker-end="url(#af)"/><text x="262" y="92" class="s-lab no">não</text>
      <rect x="110" y="284" width="120" height="32" rx="16" class="s-pill"/><text x="170" y="305" class="s-t">sai do for</text>
      <circle r="6" class="s-dot"><animateMotion dur="7s" repeatCount="indefinite" path="M170 23V100V179V239H40V100H170V179V239H40V100H306V300H170"/></circle>
    </svg>`, 'A bolinha mostra o caminho: o teste ② acontece antes de cada volta. Quando dá falso, o for termina.'),

  // método como máquina
  maquina: () => fig(`<div class="flow">
      <div class="fcol"><small class="fl">argumentos</small><div class="chips2"><span class="chipv">7</span><span class="chipv">9</span></div></div><span class="fa"></span>
      <div class="mach"><small>static double</small><b>media(a, b)</b><code>return (a + b) / 2;</code></div><span class="fa"></span>
      <div class="fcol"><small class="fl">retorno</small><span class="chipv out">8.0</span></div>
    </div>`, 'Entra o que está entre parênteses, sai o que vem depois do return. Quem chama não precisa saber o que acontece lá dentro.'),

  // busca binária cortando o vetor pela metade
  metade: () => {
    const steps = [[0, 15, 7], [8, 15, 11], [8, 10, 9], [10, 10, 10]];
    return fig(`<div class="halves">${steps.map(([a, b, m], k) => `<div class="hrow"><small>passo ${k + 1} · ${b - a + 1} candidato${b > a ? 's' : ''}</small><div class="hcells">${Array.from({ length: 16 }, (_, i) => `<i class="${i === m ? (k === 3 ? 'hit' : 'mid') : i >= a && i <= b ? 'on' : ''}"></i>`).join('')}</div></div>`).join('')}</div>`,
      'Procurando a posição 10 entre 16: cada passo olha o meio (escuro) e descarta metade. Em 4 passos acha. Com 1 milhão, seriam 20.');
  },

  // vetor após cada passada (bubble)
  passadas: () => fig(passRows([[5, 1, 4, 2, 8, 0], [1, 4, 2, 5, 8, 1], [1, 2, 4, 5, 8, 2], [1, 2, 4, 5, 8, 5]], 'end', ['início', '1ª passada', '2ª passada', '3ª passada (sem trocas → para)']),
    'Formato de resposta que a prova pede: o vetor depois de cada passada. Em verde, a parte que já está no lugar certo.'),
  selpass: () => fig(passRows([[29, 10, 14, 37, 13, 0], [10, 29, 14, 37, 13, 1], [10, 13, 14, 37, 29, 2], [10, 13, 14, 37, 29, 3], [10, 13, 14, 29, 37, 5]], 'start', ['início', 'i = 0 (menor: 10)', 'i = 1 (menor: 13)', 'i = 2 (14 já no lugar)', 'i = 3 (menor: 29)']),
    'No Selection, a parte ordenada cresce pela esquerda: a cada passada, o menor que sobrou vai para a frente.'),

  // recursão como bonecas russas
  bonecas: () => {
    const lv = [4, 3, 2, 1], val = { 4: 24, 3: 6, 2: 2, 1: 1 };
    const doll = k => `<div class="doll"><div class="dh"><span>fatorial(${k})${k > 1 ? ` = ${k} × fatorial(${k - 1})` : ' → caso base'}</span><b>= ${val[k]}</b></div>${k > 1 ? doll(k - 1) : ''}</div>`;
    return fig(doll(lv[0]), 'Cada chamada abre uma menor dentro dela, até o caso base. Depois os resultados voltam de dentro para fora: 1 → 2 → 6 → 24.');
  }
};
function passRows(rows, side, labels) {
  return `<div class="passes">${rows.map((r, k) => { const d = r[5], n = 5; return `<div class="prow"><small>${labels[k]}</small><div class="pcells">${r.slice(0, 5).map((v, i) => `<span class="${side === 'end' ? (i >= n - d ? 'ok' : '') : (i < d ? 'ok' : '')}">${v}</span>`).join('')}</div></div>`; }).join('')}</div>`;
}

