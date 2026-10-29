/*
 * Programming Lab II — interactive visualizations (English). Overrides the Portuguese ones in js/visualizacoes.js
 */

// 1) Program anatomy
VIZ.anatomia = el => {
  vhead(el, 'Tap to explore', 'The parts of a Java program', 'Tap any part of the code (or the buttons) to see what it does.');
  const P = {
    cls: ['Class', '<b>public class Main</b> creates the class, the “container” of all the code. The name <code>Main</code> must match the file name: <code>Main.java</code>.'],
    main: ['main', '<b>main</b> is the entry door. When you run, Java looks for exactly this line and starts there, from top to bottom.'],
    out: ['println', '<b>System.out.println</b> writes to the screen and moves to the next line. <code>print</code> writes without moving.'],
    str: ['String', 'Text between <b>double quotes</b> is a String. It appears on screen exactly as written.'],
    semi: ['; (semicolon)', 'The <b>;</b> marks the end of each instruction, like the period at the end of a sentence. Forgetting it is the most common error.'],
    brace: ['{ } (braces)', '<b>Braces</b> open and close blocks. Everything between <code>{</code> and <code>}</code> belongs to the outer class or method.']
  };
  const S = (p, t) => `<span data-p="${p}">${t}</span>`;
  add(el, `<div class="vcode anat">${[
    `${S('cls', 'public class Main')} ${S('brace', '{')}`,
    `    ${S('main', 'public static void main(String[] args)')} ${S('brace', '{')}`,
    `        ${S('out', 'System.out.println(')}${S('str', '"Hello, Lab II!"')}${S('out', ')')}${S('semi', ';')}`,
    `    ${S('brace', '}')}`, `${S('brace', '}')}`].map(l => `<div>${l}</div>`).join('')}</div>`);
  const chips = add(el, `<div class="chips">${Object.entries(P).map(([k, v]) => `<button data-p="${k}">${v[0]}</button>`).join('')}</div>`);
  const msg = add(el, `<div class="vmsg">Start by tapping <b>public class Main</b>.</div>`);
  const pick = k => { el.querySelectorAll('[data-p]').forEach(n => n.classList.toggle('on', n.dataset.p === k)); msg.innerHTML = P[k][1]; };
  el.addEventListener('click', e => { const n = e.target.closest('[data-p]'); if (n) pick(n.dataset.p); });
  void chips;
};

// 2) Division lab
VIZ.divisao = el => {
  vhead(el, 'Try values', 'Why does 7 / 2 give 3?', 'Change the numbers and the types and see what Java computes.');
  const f = add(el, `<div class="row-in">
    <label><select data-k="ta"><option>int</option><option>double</option></select> a =</label><input type="number" data-k="a" value="7" step="any">
    <label><select data-k="tb"><option>int</option><option>double</option></select> b =</label><input type="number" data-k="b" value="2" step="any"></div>`);
  const outp = add(el, `<div></div>`);
  const upd = () => {
    const q = k => f.querySelector(`[data-k=${k}]`).value;
    const ta = q('ta'), tb = q('tb'); let a = +q('a') || 0, b = +q('b') || 0; const notes = [];
    if (ta === 'int' && !Number.isInteger(a)) { notes.push(`int does not keep decimal places: ${a} becomes <b>${Math.trunc(a)}</b>.`); a = Math.trunc(a); }
    if (tb === 'int' && !Number.isInteger(b)) { notes.push(`int does not keep decimal places: ${b} becomes <b>${Math.trunc(b)}</b>.`); b = Math.trunc(b); }
    const inteira = ta === 'int' && tb === 'int'; let res, expl;
    const show = v => inteira ? String(v) : jnum(v);
    if (b === 0) { res = inteira ? '💥 ArithmeticException' : (a === 0 ? 'NaN' : (a > 0 ? 'Infinity' : '-Infinity')); expl = inteira ? 'Integer division by zero crashes the program with <b>ArithmeticException: / by zero</b>.' : 'With double, dividing by zero does not crash: the result is <b>Infinity</b> (or NaN for 0/0). Even so, it is almost always a bug.'; }
    else if (inteira) { const r = Math.trunc(a / b), real = a / b; res = String(r); expl = `Both are <b>int</b>, so Java does <b>integer division</b>: it computes ${+real.toFixed(4)} and <b>throws away</b> the decimal part. The remainder (<code>a % b</code>) is <b>${a % b}</b>.${Number.isInteger(real) ? '' : ' To get the exact value, turn one side into a double: <code>(double) a / b</code>.'}`; }
    else { res = jnum(a / b); expl = 'At least one side is a <b>double</b>, so Java does <b>real division</b>, with decimal places.'; }
    outp.innerHTML = `<div class="vcode"><div>${ta} a = ${show(a)};</div><div>${tb} b = ${tb === 'int' ? b : jnum(b)};</div><div class="on">System.out.println(a / b);   // → ${res}</div></div>
      <div class="stats" style="margin-top:10px"><div class="stat"><small>Result</small><b>${res}</b></div><div class="stat"><small>Division</small><b style="font-size:16px">${b === 0 ? '—' : inteira ? 'integer' : 'real'}</b></div></div>
      <div class="vmsg" style="margin-top:10px">${notes.join(' ')} ${expl}</div>`;
  };
  f.addEventListener('input', upd); upd();
};

// 3) Scanner: the cursor that reads the input
VIZ.scanner = el => {
  vhead(el, 'Step by step', 'How Scanner reads what you type', 'Everything typed goes into a queue of characters. Scanner has a ▲ cursor that moves along it.');
  const tabs = add(el, `<div class="vtabs"><button class="vbtn on" data-s="0">Normal case</button><button class="vbtn" data-s="1">The nextLine trap</button></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const SC = [
    { input: 'Maria Souza\n20\n', code: ['String name = sc.nextLine();', 'int age = sc.nextInt();'],
      steps: [[0, -1, {}, 'What was typed (including each <b>Enter ⏎</b>) is stored. The ▲ cursor starts at the beginning.', 0, 0],
        [12, 0, { name: '"Maria Souza"' }, '<code>nextLine()</code> reads <b>everything up to the Enter</b> and consumes the ⏎ too. The cursor jumps to the next line.', 0, 12],
        [14, 1, { name: '"Maria Souza"', age: '20' }, '<code>nextInt()</code> reads only the number <b>20</b> and stops <b>before</b> the ⏎. That leftover ⏎ is the origin of the trap.', 12, 14]] },
    { input: '20\nMaria\n', code: ['int age = sc.nextInt();', 'String name = sc.nextLine();', 'sc.nextLine();          // the fix', 'String name = sc.nextLine();'],
      steps: [[0, -1, {}, 'Now the order is reversed: first a number, then a text.', 0, 0],
        [2, 0, { age: '20' }, '<code>nextInt()</code> reads <b>20</b> and the cursor stops <b>before the ⏎</b>.', 0, 2],
        [3, 1, { age: '20', name: '""  ← empty!' }, '<code>nextLine()</code> reads “up to the Enter”, but the Enter is right there. Result: <b>name is empty</b> and “Maria” was not even read.', 2, 3],
        [3, 2, { age: '20' }, '<b>The fix:</b> right after <code>nextInt()</code>, call an extra <code>sc.nextLine();</code> just to discard the leftover ⏎.', 2, 3],
        [9, 3, { age: '20', name: '"Maria"' }, 'Now the next <code>nextLine()</code> reads <b>"Maria"</b>.', 3, 9]] }
  ];
  let sc = 0, P;
  const draw = s => {
    const [pos, line, vars, msg, rs, re] = s, S = SC[sc];
    const chars = [...S.input].map((c, i) => `<span class="${i < rs ? 'used' : ''} ${i >= rs && i < re ? 'read' : ''} ${c === '\n' ? 'nl' : ''} ${i === pos ? 'cur' : ''}">${c === '\n' ? '⏎' : c === ' ' ? '␣' : c}</span>`).join('');
    st.innerHTML = `<div class="buf" style="margin-bottom:14px">${chars}<span class="${pos >= S.input.length ? 'cur' : ''}" style="background:none"></span></div>
      ${codeBox(S.code, line)}
      <div class="mem"><div class="mem-col on"><h5>variables</h5>${Object.keys(vars).length ? Object.entries(vars).map(([k, v]) => vbox(k, v)).join('') : '<small style="color:var(--fg3)">none yet</small>'}</div></div>
      <div class="vmsg">${msg}</div>`;
  };
  P = player(el, () => SC[sc].steps, draw, 1600);
  tabs.onclick = e => { const b = e.target.closest('[data-s]'); if (!b) return; sc = +b.dataset.s; tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); P.reload(); };
};

// 4) if / else with a grade
VIZ.ifnota = el => {
  vhead(el, 'Drag', 'Java tests the conditions from top to bottom', 'Change the grade. Only the first true block runs, and the ones below are not even tested.');
  const r = add(el, `<div class="row-in"><label>grade =</label><input type="range" min="0" max="10" step="0.1" value="7.8"><span class="big" style="min-width:64px">7.8</span></div>`);
  const box = add(el, `<div class="conds"></div>`), msg = add(el, `<div class="vmsg"></div>`);
  const C = [['grade >= 9', n => n >= 9, 'Grade A'], ['grade >= 7', n => n >= 7, 'Grade B'], ['grade >= 6', n => n >= 6, 'Grade C'], ['else', () => true, 'Failed']];
  const upd = () => {
    const n = +r.querySelector('input').value; r.querySelector('.big').textContent = n.toFixed(1);
    const k = C.findIndex(c => c[1](n));
    box.innerHTML = C.map((c, i) => `<div class="cond ${i < k ? 'no' : i === k ? 'yes' : 'skip'}"><span>${i === 0 ? 'if' : i === 3 ? '' : 'else if'} ${i === 3 ? 'else' : `(${c[0]})`}</span><span class="r">${i < k ? `${n.toFixed(1)} ${c[0].slice(6)} ? false → skip` : i === k ? (i === 3 ? 'none was true → runs' : 'true → runs') : 'not tested'}</span></div>`).join('');
    msg.innerHTML = `Output: <b>${C[k][2]}</b>. ${k ? `Java tested ${k + (k === 3 ? 0 : 1)} condition(s) until it found the path.` : 'The first condition was already true, so the others were ignored.'} ${n >= 7 && n < 9 ? 'Notice: 7.8 is also ≥ 6, but the <code>else if (grade >= 6)</code> is never even tested.' : ''}`;
  };
  r.addEventListener('input', upd); upd();
};

// 5) for step by step
VIZ.forpasso = el => {
  vhead(el, 'Step by step', 'What happens on each lap of the for', 'The for has 3 parts: <b>init</b> (runs once), <b>condition</b> (tested before each lap) and <b>increment</b> (after each lap).');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const build = () => {
    const F = []; let soma = 0, i; const rows = [];
    F.push({ ln: 0, seg: null, i: '—', soma, ch: 'sum', msg: 'Creates <code>sum</code> holding 0. It will accumulate the total.', rows: [] });
    i = 1; F.push({ ln: 1, seg: 'ini', i, soma, ch: 'i', msg: '<b>Init</b>: creates <code>i = 1</code>. This part only runs once.', rows: [] });
    for (; ;) {
      const ok = i <= 4;
      F.push({ ln: 1, seg: 'cond', i, soma, msg: `<b>Condition</b>: ${i} <= 4 is <b>${ok ? 'true' : 'false'}</b> → ${ok ? 'enters the loop' : 'leaves the loop'}.`, rows: rows.slice() });
      if (!ok) break;
      const antes = soma; soma += i; rows.push([i, antes, soma]);
      F.push({ ln: 2, i, soma, ch: 'sum', msg: `<b>Body</b>: sum = ${antes} + ${i} = <b>${soma}</b>.`, rows: rows.slice() });
      i++; F.push({ ln: 1, seg: 'inc', i, soma, ch: 'i', msg: `<b>Increment</b>: <code>i++</code> → i becomes ${i}. Back to the condition.`, rows: rows.slice() });
    }
    F.push({ ln: 4, i: '—', soma, msg: `Outside the loop. Prints <b>${soma}</b>. Notice that <code>i</code> no longer exists here: it only lives inside the for.`, rows: rows.slice(), out: soma });
    return F;
  };
  const seg = (s, k, t) => `<span class="${s === k ? 'on' : ''}">${t}</span>`;
  player(el, build, f => {
    const L = ['int sum = 0;', `for (${seg(f.seg, 'ini', 'int i = 1')}; ${seg(f.seg, 'cond', 'i <= 4')}; ${seg(f.seg, 'inc', 'i++')}) {`, '    sum = sum + i;', '}', 'System.out.println(sum);'];
    st.innerHTML = `${codeBox(L, f.ln)}
      <div class="stats"><div class="stat"><small>i</small><b>${f.i}</b></div><div class="stat"><small>sum</small><b>${f.soma}</b></div><div class="stat"><small>output</small><b>${f.out ?? ''}</b></div></div>
      <div class="vmsg">${f.msg}</div>
      ${f.rows.length ? `<div class="tbl-wrap" style="margin:0"><table><tr><th>lap</th><th>i</th><th>sum before</th><th>sum after</th></tr>${f.rows.map((r, k) => `<tr data-key="r${k}"><td>${k + 1}</td><td>${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join('')}</table></div>` : ''}`;
  }, 1100);
};

// 6) Array: indexes
VIZ.vetor = el => {
  vhead(el, 'Tap the boxes', 'An array is a row of numbered boxes', 'Each box has an <b>index</b> (the position, starting at 0). Tap a box or type an index.');
  const v = [7, 9, 5, 10, 8];
  const f = add(el, `<div class="row-in"><label>index</label><input type="number" value="2" step="1"><span style="color:var(--fg2)">int[] grades = {7, 9, 5, 10, 8};</span></div>`);
  const cells = add(el, `<div></div>`), msg = add(el, `<div class="vmsg"></div>`);
  add(el, `<div class="stats"><div class="stat"><small>grades.length</small><b>5</b></div><div class="stat"><small>first index</small><b>0</b></div><div class="stat"><small>last index</small><b>4</b></div></div>`);
  const inp = f.querySelector('input');
  const upd = () => {
    const i = Math.trunc(+inp.value), ok = i >= 0 && i < v.length;
    cells.innerHTML = `<div class="cells">${v.map((x, k) => `<button class="cell ${k === i ? 'cmp' : ''}" data-i="${k}"><b>${x}</b><small>[${k}]</small><em>${k === i ? '▲' : ''}</em></button>`).join('')}<div class="cell ${!ok && i >= v.length ? 'bad' : 'dim'}" style="opacity:.6"><b style="border-style:dashed">?</b><small>[5]</small><em></em></div></div>`;
    msg.innerHTML = ok ? `<code>grades[${i}]</code> is <b>${v[i]}</b>. It is box number ${i + 1}: the index is always <b>position − 1</b>.`
      : `<b style="color:var(--o-err)">ArrayIndexOutOfBoundsException</b>: Index ${i} out of bounds for length 5. The boxes go from [0] to [4]. ${i === 5 ? 'This error usually comes from using <code>i &lt;= v.length</code> in the for instead of <code>i &lt; v.length</code>.' : ''}`;
  };
  cells.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { inp.value = b.dataset.i; upd(); } });
  inp.addEventListener('input', upd); upd();
};

// 7) Animated sequential search
VIZ.buscaseq = el => {
  vhead(el, 'Simulation', 'Sequential search step by step', 'Pick the value to look for and follow along: one comparison per cell, from left to right.');
  const v = [42, 7, 19, 3, 88, 25, 61, 14];
  const f = add(el, `<div class="row-in"><label>search for</label><input type="number" value="88"><span class="vtabs">${[42, 25, 50].map(x => `<button class="vbtn" data-v="${x}">${x}</button>`).join('')}</span></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const inp = f.querySelector('input');
  const build = () => {
    const alvo = Math.trunc(+inp.value), F = [{ i: -1, c: 0, msg: `Looking for <b>${alvo}</b>. Starts at position 0.` }];
    for (let i = 0; i < v.length; i++) {
      const hit = v[i] === alvo;
      F.push({ i, c: i + 1, hit, msg: `Is v[${i}] = ${v[i]} equal to ${alvo}? ${hit ? `<b>Yes!</b> Returns position <b>${i}</b>.` : 'No → next cell.'}` });
      if (hit) return F;
    }
    F.push({ i: v.length, c: v.length, miss: true, msg: `Reached the end without finding it: returns <b>-1</b>. That was ${v.length} comparisons, the <b>worst case</b>.` });
    return F;
  };
  const P = player(el, build, s => {
    st.innerHTML = cellsHTML(v, i => i === s.i ? (s.hit ? 'hit' : 'cmp') : i < s.i ? 'seen' : '', i => i === s.i && !s.hit ? '▲ i' : i === s.i ? '✓' : '') +
      `<div class="stats"><div class="stat"><small>comparisons</small><b>${s.c}</b></div><div class="stat"><small>result</small><b>${s.hit ? s.i : s.miss ? -1 : '…'}</b></div></div><div class="vmsg">${s.msg}</div>`;
  }, 800);
  inp.addEventListener('change', () => P.reload());
  f.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { inp.value = b.dataset.v; P.reload(); } });
};

// 8) Animated binary search
VIZ.buscabin = el => {
  vhead(el, 'Simulation', 'Binary search: half goes away at each step', 'The array is <b>sorted</b>. At each step we look at the middle and discard the half where the value cannot be.');
  const v = [2, 5, 8, 12, 16, 23, 38, 45, 56, 63, 72, 80, 91, 97, 99];
  const f = add(el, `<div class="row-in"><label>search for</label><input type="number" value="72"><span class="vtabs">${[23, 99, 40].map(x => `<button class="vbtn" data-v="${x}">${x}</button>`).join('')}</span></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const inp = f.querySelector('input');
  const build = () => {
    const alvo = Math.trunc(+inp.value); let ini = 0, fim = v.length - 1, n = 0;
    const F = [{ ini, fim, meio: -1, n, msg: `Looking for <b>${alvo}</b>. At the start, the search covers the whole array: start = 0, end = ${fim}.`, rows: [] }];
    const rows = [];
    while (ini <= fim) {
      const meio = Math.trunc((ini + fim) / 2); n++;
      const row = [n, ini, fim, meio, v[meio]];
      if (v[meio] === alvo) { rows.push([...row, 'found']); F.push({ ini, fim, meio, n, hit: true, rows: rows.slice(), msg: `mid = (${ini} + ${fim}) / 2 = <b>${meio}</b>. v[${meio}] = ${v[meio]} is the value we want: <b>found in ${n} step(s)</b>.` }); return F; }
      const esq = alvo < v[meio];
      rows.push([...row, esq ? 'end = mid − 1' : 'start = mid + 1']);
      F.push({ ini, fim, meio, n, rows: rows.slice(), msg: `mid = (${ini} + ${fim}) / 2 = <b>${meio}</b> → v[${meio}] = ${v[meio]}. ${alvo} ${esq ? '<' : '>'} ${v[meio]}, so it can only be on the <b>${esq ? 'left' : 'right'}</b>: ${esq ? `end = ${meio - 1}` : `start = ${meio + 1}`}.` });
      if (esq) fim = meio - 1; else ini = meio + 1;
    }
    F.push({ ini, fim, meio: -1, n, miss: true, rows: rows.slice(), msg: `start (${ini}) went past end (${fim}): the range is empty. It does not exist → returns <b>-1</b>. Only ${n} comparisons, even without finding it.` });
    return F;
  };
  const P = player(el, build, s => {
    st.innerHTML = cellsHTML(v, i => i === s.meio ? (s.hit ? 'hit' : 'cmp') : (i < s.ini || i > s.fim ? 'dim' : ''), i => [i === s.ini && !s.miss ? 'start' : '', i === s.meio ? 'mid' : '', i === s.fim && !s.miss ? 'end' : ''].filter(Boolean).join('/')) +
      `<div class="vmsg">${s.msg}</div>` +
      (s.rows.length ? `<div class="tbl-wrap" style="margin:0"><table><tr><th>step</th><th>start</th><th>end</th><th>mid</th><th>v[mid]</th><th>decision</th></tr>${s.rows.map((r, k) => `<tr data-key="r${k}">${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>` : '');
  }, 1500);
  inp.addEventListener('change', () => P.reload());
  f.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { inp.value = b.dataset.v; P.reload(); } });
};

// 9) Sequential × binary (cost comparison)
VIZ.cmpbusca = el => {
  vhead(el, 'Drag', 'How many comparisons in the worst case?', 'Increase the array size and compare the two searches.');
  const N = [10, 100, 1000, 10000, 100000, 1000000, 1000000000];
  const r = add(el, `<div class="row-in"><label>n =</label><input type="range" min="0" max="6" step="1" value="2"><span class="big" style="min-width:150px"></span></div>`);
  add(el, `<div class="legend"><span><i style="background:var(--c1)"></i>Sequential · O(n)</span><span><i style="background:var(--c2)"></i>Binary · O(log n)</span></div>`);
  const box = add(el, `<div class="cmpbar"></div>`), msg = add(el, `<div class="vmsg"></div>`);
  const fmt = x => x.toLocaleString('en-US');
  const upd = () => {
    const n = N[+r.querySelector('input').value], b = Math.floor(Math.log2(n)) + 1;
    r.querySelector('.big').textContent = fmt(n);
    box.innerHTML = `<div class="ln"><span>Sequential</span><div class="tr"><i style="width:100%;background:var(--c1)"></i><span style="color:#fff">${fmt(n)}</span></div></div>
      <div class="ln"><span>Binary</span><div class="tr"><i style="width:${Math.max(b / n * 100, .6)}%;background:var(--c2)"></i><span style="left:${Math.min(Math.max(b / n * 100, .6), 90) + 2}%">${b}</span></div></div>`;
    msg.innerHTML = `With ${fmt(n)} elements, binary search makes at most <b>${b}</b> comparisons against <b>${fmt(n)}</b> for sequential: <b>${fmt(Math.round(n / b))} times fewer</b>. Each time the array doubles, binary search needs only <b>+1</b> step.`;
  };
  r.addEventListener('input', upd); upd();
};

// 10) Animated sorting (bubble / selection)
function sortFrames(kind, a0) {
  const a = a0.slice(), F = [], done = new Set(), ids = a0.map((_, k) => k); let c = 0, t = 0;
  const push = (o, msg) => F.push({ a: a.slice(), ids: ids.slice(), done: new Set(done), c, t, msg, ...o });
  const sw = (x, y) => { [a[x], a[y]] = [a[y], a[x]]; [ids[x], ids[y]] = [ids[y], ids[x]]; };
  push({}, `Initial array: <b>[${a.join(', ')}]</b>.`);
  if (kind === 'bubble') {
    for (let i = 0; i < a.length - 1; i++) {
      let trocou = false;
      for (let j = 0; j < a.length - 1 - i; j++) {
        c++; const sw = a[j] > a[j + 1], swp = (x, y) => { [a[x], a[y]] = [a[y], a[x]]; [ids[x], ids[y]] = [ids[y], ids[x]]; };
        push({ cmp: [j, j + 1] }, `Pass ${i + 1}: compare v[${j}] = ${a[j]} with v[${j + 1}] = ${a[j + 1]}. ${sw ? `${a[j]} > ${a[j + 1]} → <b>swap</b>.` : 'Already in order → no swap.'}`);
        if (sw) { swp(j, j + 1); t++; trocou = true; push({ swap: [j, j + 1] }, `Swapped: now <b>[${a.join(', ')}]</b>.`); }
      }
      done.add(a.length - 1 - i);
      push({ pass: i + 1 }, `End of pass ${i + 1}: the largest remaining (<b>${a[a.length - 1 - i]}</b>) “bubbled” to position ${a.length - 1 - i}. Array: <b>[${a.join(', ')}]</b>.`);
      if (!trocou) { a.forEach((_, k) => done.add(k)); push({}, `No swap in this pass → the array is <b>already sorted</b>. Stop here (optimization).`); return F; }
    }
  } else {
    for (let i = 0; i < a.length - 1; i++) {
      let m = i; push({ min: m, at: i }, `Pass ${i + 1}: find the smallest between positions ${i} and ${a.length - 1}. Starts by assuming it is v[${i}] = ${a[i]}.`);
      for (let j = i + 1; j < a.length; j++) {
        c++; const menor = a[j] < a[m];
        push({ min: m, cmp: [j], at: i }, `Compare v[${j}] = ${a[j]} with the smallest so far (${a[m]}). ${menor ? `<b>${a[j]} is smaller</b> → new smallest.` : 'Not smaller.'}`);
        if (menor) m = j;
      }
      if (m !== i) { sw(i, m); t++; }
      done.add(i);
      push({ swap: m !== i ? [i, m] : null, pass: i + 1 }, `${m !== i ? `Swap v[${i}] with v[${m}]` : `The smallest was already at position ${i}, no swap`}. End of pass ${i + 1}: <b>[${a.join(', ')}]</b>.`);
    }
  }
  a.forEach((_, k) => done.add(k)); push({}, `Done! <b>${c}</b> comparisons and <b>${t}</b> swaps.`);
  return F;
}
function sortViz(kind) {
  return el => {
    vhead(el, 'Simulation', kind === 'bubble' ? 'Bubble Sort in action' : 'Selection Sort in action', kind === 'bubble' ? 'Compares neighbors and swaps. Follow the text below: it is exactly what the exam asks you to simulate.' : 'Finds the smallest and puts it in front. Follow the text: it is what the exam asks you to simulate.');
    let arr = [5, 3, 8, 1, 9, 2, 7, 4];
    const tb = add(el, `<div class="vtabs"><button class="vbtn" data-a="shuf">🔀 Shuffle</button><button class="vbtn" data-a="worst">Worst case</button><button class="vbtn" data-a="best">Already sorted</button></div>`);
    add(el, `<div class="legend"><span><i style="background:var(--c1)"></i>Comparing</span><span><i style="background:var(--c2)"></i>${kind === 'bubble' ? 'Swapping' : 'Smallest so far / swap'}</span><span><i style="background:var(--c3)"></i>In the right place</span></div>`);
    const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
    const P = player(el, () => sortFrames(kind, arr), s => {
      const mx = Math.max(...s.a);
      const n = s.a.length;
      st.innerHTML = `<div class="bars sb">${s.ids.map((_, id) => { const k = s.ids.indexOf(id), x = s.a[k]; const cl = s.swap && s.swap.includes(k) ? 'swap' : s.cmp && s.cmp.includes(k) ? 'cmp' : s.min === k ? 'min' : s.done.has(k) ? 'done' : ''; return `<div class="sbar ${cl}" style="width:${100 / n}%;transform:translateX(${k * 100}%)"><i style="height:${x / mx * 100}%"></i><span>${x}</span></div>`; }).join('')}</div>
        <div class="stats"><div class="stat"><small>comparisons</small><b>${s.c}</b></div><div class="stat"><small>swaps</small><b>${s.t}</b></div></div>
        <div class="vmsg">${s.msg}</div>`;
    }, 700);
    tb.onclick = e => { const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return; if (a === 'shuf') { arr = arr.slice().sort(() => Math.random() - .5); } if (a === 'worst') arr = [9, 8, 7, 5, 4, 3, 2, 1]; if (a === 'best') arr = [1, 2, 3, 4, 5, 7, 8, 9]; P.reload(); };
  };
}
VIZ.bubble = sortViz('bubble');
VIZ.selection = sortViz('selection');

// 11) Complexity chart
VIZ.complex = el => {
  vhead(el, 'Chart', 'How the work grows with the array size', 'Move your finger or the mouse over the chart to see the values.');
  const S = [{ n: 'O(n²) · Bubble / Selection', c: 'var(--c2)', f: n => n * n }, { n: 'O(n) · sequential search', c: 'var(--c1)', f: n => n }, { n: 'O(log n) · binary search', c: 'var(--c3)', f: n => Math.ceil(Math.log2(n + 1)) }];
  add(el, `<div class="legend">${S.map(s => `<span><i style="background:${s.c}"></i>${s.n}</span>`).join('')}</div>`);
  const W = 600, H = 300, m = { l: 56, r: 20, t: 14, b: 40 }, NX = 30, MY = 900;
  const x = n => m.l + (n - 1) / (NX - 1) * (W - m.l - m.r), y = v => H - m.b - Math.min(v, MY) / MY * (H - m.t - m.b);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="X axis: size n from 1 to 30. Growth lines: n squared climbs fast up to 900 when n is 30; n and log n stay near zero">`;
  for (const v of [0, 300, 600, 900]) svg += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  for (const n of [1, 10, 20, 30]) svg += `<text x="${x(n)}" y="${H - 12}" text-anchor="middle">${n}</text>`;
  svg += ``;
  for (const s of S) { const pts = Array.from({ length: NX }, (_, i) => `${x(i + 1).toFixed(1)},${y(s.f(i + 1)).toFixed(1)}`).join(' '); svg += `<polyline points="${pts}" fill="none" stroke="${s.c}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`; }
  svg += `<text class="lbl" x="${x(21)}" y="${y(441) - 10}" style="fill:var(--c2)">n²</text><text class="lbl" x="${x(30) - 4}" y="${y(30) - 56}" text-anchor="end" style="fill:var(--c1)">n</text><text class="lbl" x="${x(30) - 4}" y="${y(5) - 30}" text-anchor="end" style="fill:var(--c3)">log n</text>`;
  svg += `<line class="xh" y1="${m.t}" y2="${H - m.b}" stroke="var(--fg3)" stroke-dasharray="3 3" opacity="0"/>${S.map((s, k) => `<circle class="pt${k}" r="5" fill="${s.c}" stroke="var(--panel)" stroke-width="2" opacity="0"/>`).join('')}`;
  svg += `<rect x="${m.l}" y="0" width="${W - m.l - m.r}" height="${H - m.b}" fill="transparent" class="hit"/></svg>`;
  const ch = add(el, `<div class="chart">${svg}<div class="ctip"></div></div>`);
  const msg = add(el, `<div class="vmsg">With <b>30</b> elements: sorting with Bubble/Selection costs about <b>900</b> comparisons, sequential search <b>30</b> and binary search only <b>5</b>. That is why, on large arrays, the choice of algorithm matters more than the speed of the computer.</div>`);
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

// 12) Method call
VIZ.chamada = el => {
  vhead(el, 'Step by step', 'The path of a method call', 'The values go from main to the method and the result comes back through the return.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const L = ['static double average(double a, double b) {', '    double s = a + b;', '    return s / 2;', '}', '', '// inside main:', 'double m = average(7, 9);', 'System.out.println(m);'];
  const F = [
    { ln: 6, on: 'main', main: {}, met: null, arrow: '', msg: 'main reaches the line <code>average(7, 9)</code> and <b>pauses</b>: before storing in <code>m</code>, it needs the result.' },
    { ln: 0, on: 'met', main: {}, met: { a: '7.0', b: '9.0' }, arrow: '7, 9 →', msg: 'Java enters <code>average</code> and <b>copies</b> the arguments into the parameters: a = 7, b = 9 (they become double).' },
    { ln: 1, on: 'met', main: {}, met: { a: '7.0', b: '9.0', s: '16.0' }, ch: 's', msg: 'Computes <code>s = a + b</code> = 16.0. The variable <code>s</code> only exists inside this method.' },
    { ln: 2, on: 'met', main: {}, met: { a: '7.0', b: '9.0', s: '16.0' }, arrow: '← 8.0', msg: '<code>return s / 2</code> returns <b>8.0</b> and <b>ends</b> the method. The variables a, b and s stop existing.' },
    { ln: 6, on: 'main', main: { m: '8.0' }, met: null, ch: 'm', arrow: '', msg: 'Back in main: the call is “replaced” by the returned value and <code>m</code> receives 8.0.' },
    { ln: 7, on: 'main', main: { m: '8.0' }, met: null, arrow: '', msg: 'Prints <b>8.0</b>. Summary: goes in with arguments, comes out with a value.' }];
  player(el, () => F, f => {
    st.innerHTML = codeBox(L, f.ln) + `<div class="mem"><div class="mem-col ${f.on === 'main' ? 'on' : ''}"><h5>main</h5>${Object.entries(f.main).map(([k, v]) => vbox(k, v, f.ch === k)).join('') || '<small style="color:var(--fg3)">waiting…</small>'}</div>
      <div class="arrow" style="align-self:center">${f.arrow || ''}</div>
      <div class="mem-col ${f.met ? 'on' : 'off'}"><h5>average(a, b)</h5>${f.met ? Object.entries(f.met).map(([k, v]) => vbox(k, v, f.ch === k)).join('') : '<small style="color:var(--fg3)">not running</small>'}</div></div><div class="vmsg">${f.msg}</div>`;
  }, 1700);
};

// 13) Value × reference
VIZ.referencia = el => {
  vhead(el, 'Step by step', 'Copy of the value × copy of the address', 'See why changing an int in the method changes nothing outside, but changing an array does.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const F = [
    { main: [['n', '5']], met: null, heap: null, msg: 'In main, <code>n = 5</code>. An <b>int</b> keeps the number itself inside the variable.' },
    { main: [['n', '5']], met: ['doubleNumber(x)', [['x', '5']]], heap: null, ch: 'x', msg: 'Called <code>doubleNumber(n)</code>: Java <b>copies the value</b> 5 into <code>x</code>. They are two different boxes.' },
    { main: [['n', '5']], met: ['doubleNumber(x)', [['x', '10']]], heap: null, ch: 'x', msg: '<code>x = x * 2</code> changes only the copy. The <code>n</code> box in main is still <b>5</b>.' },
    { main: [['n', '5']], met: null, heap: null, ch: 'n', msg: 'The method ended and <code>x</code> vanished. <b>n is still 5</b>.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: null, heap: [1, 2, 3], msg: 'Now an array. The variable <code>v</code> <b>does not hold the numbers</b>: it holds the <b>address</b> (#A1) of where the array is in memory.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: ['doubleArray(v)', [['v', '→ #A1']]], heap: [1, 2, 3], ch: 'v', msg: 'Called <code>doubleArray(v)</code>: Java copies the <b>address</b>. Both variables point to the <b>same</b> array.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: ['doubleArray(v)', [['v', '→ #A1']]], heap: [2, 4, 6], hch: true, msg: 'The method changes <code>v[i]</code> → changes the array at #A1, the same one main sees.' },
    { main: [['n', '5'], ['v', '→ #A1']], met: null, heap: [2, 4, 6], hch: true, msg: 'Back in main: <code>v</code> now shows <b>[2, 4, 6]</b>. <b>Primitive</b>: copies the value. <b>Array</b>: copies the address.' }];
  player(el, () => F, f => {
    st.innerHTML = `<div class="mem"><div class="mem-col ${!f.met ? 'on' : ''}"><h5>main</h5>${f.main.map(([k, v]) => vbox(k, v, f.ch === k)).join('')}</div>
      <div class="mem-col ${f.met ? 'on' : 'off'}"><h5>${f.met ? f.met[0] : 'method'}</h5>${f.met ? f.met[1].map(([k, v]) => vbox(k, v, f.ch === k)).join('') : '<small style="color:var(--fg3)">not running</small>'}</div>
      <div class="mem-col ${f.heap ? '' : 'off'}"><h5>array memory · #A1</h5>${f.heap ? cellsHTML(f.heap, () => f.hch ? 'cmp' : '') : '<small style="color:var(--fg3)">empty</small>'}</div></div><div class="vmsg">${f.msg}</div>`;
  }, 1800);
};

// 14) Recursion call stack
VIZ.pilha = el => {
  vhead(el, 'Step by step', 'The call stack of factorial', 'Each call stays “waiting” for the one below it to finish. Then the answers come back multiplying.');
  const r = add(el, `<div class="row-in"><label>factorial(</label><input type="range" min="1" max="6" value="4" style="max-width:200px"><span class="big">4</span><label>)</label></div>`);
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const build = () => {
    const n = +r.querySelector('input').value; r.querySelector('.big').textContent = n;
    const F = [], stack = [];
    for (let k = n; k >= 1; k--) {
      stack.push({ k, w: k > 1 ? `waits ${k} × factorial(${k - 1})` : 'base case!' });
      F.push({ s: stack.map(x => ({ ...x })), msg: k > 1 ? `Called <code>factorial(${k})</code>. ${k} is not ≤ 1, so it needs <code>factorial(${k - 1})</code>: <b>pushes</b> one more call.` : `<code>factorial(1)</code>: <b>base case</b>. Returns 1 directly, without calling again. Now the stack starts to unwind.` });
    }
    let val = 1;
    stack[stack.length - 1].w = 'returns 1'; stack[stack.length - 1].ret = true;
    F.push({ s: stack.map(x => ({ ...x })), msg: 'The top returns <b>1</b> to whoever called it.' });
    for (let k = 2; k <= n; k++) {
      stack.pop(); val *= k; const top = stack[stack.length - 1]; top.w = `${k} × ${val / k} = returns ${val}`; top.ret = true;
      F.push({ s: stack.map(x => ({ ...x })), msg: `<code>factorial(${k})</code> receives ${val / k} and computes ${k} × ${val / k} = <b>${val}</b>. Leaves the stack returning ${val}.` });
    }
    F.push({ s: [], msg: `Final result: <code>factorial(${n})</code> = <b>${val}</b>. That was ${n} stacked calls. Without a base case, the stack would grow until <b>StackOverflowError</b>.` });
    return F;
  };
  const P = player(el, build, f => {
    st.innerHTML = `<div class="stack">${f.s.slice().reverse().map((x, i) => `<div data-key="f${x.k}" class="frame ${i === 0 ? 'top' : ''} ${x.ret ? 'ret' : ''}"><span>factorial(${x.k})</span><span class="r">${x.w}</span></div>`).join('') || '<div data-key="vazia" class="frame ret"><span>empty stack</span><span class="r">✓ finished</span></div>'}</div><small style="color:var(--fg3)">▲ top of the stack (what is running now)</small><div class="vmsg">${f.msg}</div>`;
  }, 1300);
  r.addEventListener('input', () => P.reload());
};

// 15) Map of the modularized program
VIZ.mapa = el => {
  vhead(el, 'Tap the methods', 'Map of the grades program', 'main calls each method. Tap one to see what it receives and returns.');
  const M = { readGrades: ['Scanner sc, int count', 'double[]', 'Reads count grades from the keyboard and returns the filled array.'], average: ['double[] v', 'double', 'Adds everything up and divides by the size.'], highest: ['double[] v', 'double', 'Walks the array keeping the largest value seen.'], status: ['double average', 'String', 'Decides Passed / Final exam / Failed.'] };
  const t = add(el, `<div class="tree"><button class="root on" data-m="main">main</button><div class="arrow">↓ calls ↓</div><div class="lvl">${Object.keys(M).map(k => `<button data-m="${k}">${k}()</button>`).join('')}</div></div>`);
  const msg = add(el, `<div class="vmsg"><b>main</b> only organizes: it reads the quantity, calls the methods in order and prints. No calculation lives in it.</div>`);
  t.onclick = e => { const b = e.target.closest('[data-m]'); if (!b) return; t.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); const k = b.dataset.m; msg.innerHTML = k === 'main' ? '<b>main</b> only organizes: it reads the quantity, calls the methods in order and prints. No calculation lives in it.' : `<b>${k}</b> receives <code>${M[k][0]}</code> and returns <code>${M[k][1]}</code>. ${M[k][2]}`; };
};

// ================= FIGURES: visual explanations =================
Object.assign(FIG, {
  // nesting file > class > method > statements
  estrutura: () => fig(`<div class="nest n0"><span class="nl">📄 Main.java · file</span>
      <div class="nest n1"><span class="nl">public class Main { … }</span>
        <div class="nest n2"><span class="nl">public static void main(String[] args) { … }</span>
          <div class="nest n3"><code>System.out.println("Hi");</code><code>int x = 5;</code><code>…</code></div>
        </div></div></div>`, 'One thing inside the other: the file holds the class, the class holds main and main holds the statements.'),

  // variables as boxes
  caixas: () => fig(`<div class="boxes">${[
      ['int', 'age', '19', 'integers'], ['double', 'average', '7.5', 'decimals'], ['char', 'op', "'+'", '1 character'], ['boolean', 'ok', 'true', 'yes / no'], ['String', 'name', '"Ana"', 'text']
    ].map(([t, n, v, d]) => `<div class="vb"><small class="vt">${t}</small><div class="vv">${v}</div><b>${n}</b><small>${d}</small></div>`).join('')}</div>`,
    'Each variable is a box with a label (the name) and a shape (the type). The type decides what fits inside.'),

  // from the keyboard to the variable
  scanfluxo: () => fig(`<div class="flow">
      <div class="fnode"><span class="ic">⌨️</span><b>You type</b><code>Maria⏎ 20⏎</code></div><span class="fa"></span>
      <div class="fnode acc"><span class="ic">🔎</span><b>Scanner sc</b><small>reads the character queue</small></div><span class="fa"></span>
      <div class="fcol"><div class="fnode"><code>sc.nextLine()</code><span>→ name = "Maria"</span></div><div class="fnode"><code>sc.nextInt()</code><span>→ age = 20</span></div></div>
    </div>`, 'Scanner is the go-between from the keyboard to the variables. Each method reads one piece of the queue.'),

  // if/else flowchart
  iffluxo: () => fig(`<svg class="fsvg" viewBox="0 0 340 290" role="img" aria-label="Flowchart: if grade is greater than or equal to 7, Passed; otherwise, Failed; then the program continues">${arrowDefs('ai')}
      <rect x="110" y="6" width="120" height="32" rx="16" class="s-pill"/><text x="170" y="27" class="s-t">grade = 7.8</text>
      <path d="M170 38V62" class="s-ln" marker-end="url(#ai)"/>
      <path d="M170 64L250 100L170 136L90 100Z" class="s-dia"/><text x="170" y="105" class="s-t b">grade >= 7 ?</text>
      <path d="M90 100H60V160" class="s-ln ok" marker-end="url(#ai)"/><text x="70" y="92" class="s-lab ok">yes</text>
      <path d="M250 100H280V160" class="s-ln no" marker-end="url(#ai)"/><text x="270" y="92" class="s-lab no">no</text>
      <rect x="10" y="162" width="100" height="36" rx="10" class="s-box ok"/><text x="60" y="185" class="s-t">"Passed"</text>
      <rect x="230" y="162" width="100" height="36" rx="10" class="s-box"/><text x="280" y="185" class="s-t">"Failed"</text>
      <path d="M60 198V236H150" class="s-ln" marker-end="url(#ai)"/><path d="M280 198V236H190" class="s-ln" marker-end="url(#ai)"/>
      <rect x="100" y="240" width="140" height="32" rx="16" class="s-pill"/><text x="170" y="261" class="s-t">program continues</text>
      <circle r="6" class="s-dot"><animateMotion dur="4s" repeatCount="indefinite" path="M170 22V100H60V180V236H170V256"/></circle>
    </svg>`, 'The diamond is the question. The program follows only one of the paths and then they join again.'),

  // for flowchart
  forfluxo: () => fig(`<svg class="fsvg" viewBox="0 0 340 330" role="img" aria-label="For flowchart: init i equals 1, test i less than or equal to 4, if yes run the body and i++ and go back to the test, if not leave the loop">${arrowDefs('af')}
      <rect x="110" y="6" width="120" height="34" rx="10" class="s-box"/><text x="170" y="28" class="s-t">int i = 1</text>
      <text x="246" y="28" class="s-lab">① init</text>
      <path d="M170 40V64" class="s-ln" marker-end="url(#af)"/>
      <path d="M170 66L240 100L170 134L100 100Z" class="s-dia"/><text x="170" y="105" class="s-t b">i <= 4 ?</text>
      <text x="246" y="128" class="s-lab">② condition</text>
      <path d="M170 134V160" class="s-ln ok" marker-end="url(#af)"/><text x="178" y="152" class="s-lab ok">yes</text>
      <rect x="90" y="162" width="160" height="34" rx="10" class="s-box ok"/><text x="170" y="184" class="s-t">body: sum += i</text>
      <path d="M170 196V220" class="s-ln" marker-end="url(#af)"/>
      <rect x="120" y="222" width="100" height="34" rx="10" class="s-box"/><text x="170" y="244" class="s-t">i++</text>
      <text x="226" y="244" class="s-lab">③ increment</text>
      <path d="M120 239H40V100H98" class="s-ln loop" marker-end="url(#af)"/><text x="30" y="172" class="s-lab" transform="rotate(-90 30 172)">repeat</text>
      <path d="M240 100H306V300H232" class="s-ln no" marker-end="url(#af)"/><text x="262" y="92" class="s-lab no">no</text>
      <rect x="110" y="284" width="120" height="32" rx="16" class="s-pill"/><text x="170" y="305" class="s-t">leaves the for</text>
      <circle r="6" class="s-dot"><animateMotion dur="7s" repeatCount="indefinite" path="M170 23V100V179V239H40V100H170V179V239H40V100H306V300H170"/></circle>
    </svg>`, 'The dot shows the path: the test ② happens before each lap. When it is false, the for ends.'),

  // method as a machine
  maquina: () => fig(`<div class="flow">
      <div class="fcol"><small class="fl">arguments</small><div class="chips2"><span class="chipv">7</span><span class="chipv">9</span></div></div><span class="fa"></span>
      <div class="mach"><small>static double</small><b>average(a, b)</b><code>return (a + b) / 2;</code></div><span class="fa"></span>
      <div class="fcol"><small class="fl">return</small><span class="chipv out">8.0</span></div>
    </div>`, 'What is in the parentheses goes in, what comes after return comes out. Whoever calls it does not need to know what happens inside.'),

  // binary search cutting the array in half
  metade: () => {
    const steps = [[0, 15, 7], [8, 15, 11], [8, 10, 9], [10, 10, 10]];
    return fig(`<div class="halves">${steps.map(([a, b, m], k) => `<div class="hrow"><small>step ${k + 1} · ${b - a + 1} candidate${b > a ? 's' : ''}</small><div class="hcells">${Array.from({ length: 16 }, (_, i) => `<i class="${i === m ? (k === 3 ? 'hit' : 'mid') : i >= a && i <= b ? 'on' : ''}"></i>`).join('')}</div></div>`).join('')}</div>`,
      'Looking for position 10 among 16: each step looks at the middle (dark) and discards half. It finds it in 4 steps. With 1 million, it would be 20.');
  },

  // array after each pass (bubble)
  passadas: () => fig(passRows([[5, 1, 4, 2, 8, 0], [1, 4, 2, 5, 8, 1], [1, 2, 4, 5, 8, 2], [1, 2, 4, 5, 8, 5]], 'end', ['start', '1st pass', '2nd pass', '3rd pass (no swaps → stops)']),
    'The answer format the exam asks for: the array after each pass. In green, the part that is already in the right place.'),
  selpass: () => fig(passRows([[29, 10, 14, 37, 13, 0], [10, 29, 14, 37, 13, 1], [10, 13, 14, 37, 29, 2], [10, 13, 14, 37, 29, 3], [10, 13, 14, 29, 37, 5]], 'start', ['start', 'i = 0 (smallest: 10)', 'i = 1 (smallest: 13)', 'i = 2 (14 already in place)', 'i = 3 (smallest: 29)']),
    'In Selection, the sorted part grows from the left: on each pass, the smallest remaining goes to the front.'),

  // recursion as Russian dolls
  bonecas: () => {
    const lv = [4, 3, 2, 1], val = { 4: 24, 3: 6, 2: 2, 1: 1 };
    const doll = k => `<div class="doll"><div class="dh"><span>factorial(${k})${k > 1 ? ` = ${k} × factorial(${k - 1})` : ' → base case'}</span><b>= ${val[k]}</b></div>${k > 1 ? doll(k - 1) : ''}</div>`;
    return fig(doll(lv[0]), 'Each call opens a smaller one inside it, down to the base case. Then the results come back from the inside out: 1 → 2 → 6 → 24.');
  }
});
