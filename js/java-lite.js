/*
 * Lab. Programação II — Plataforma de estudos Java
 * Compilador didático: traduz o Java da disciplina para JavaScript e executa num Web Worker
 */
// ================= JAVA → JS (subconjunto da disciplina) =================
const JavaLite = (() => {
  const TR = (...a) => T(...a);   // alias: algumas funcoes abaixo declaram uma variavel local chamada T
  class CErr extends Error { constructor(msg, line, cat) { super(msg); this.line = line; this.cat = cat; } }
  const isId = c => !!c && /[A-Za-z0-9_$]/.test(c);
  const lineAt = (s, i) => s.slice(0, i).split('\n').length;
  const onlyNL = t => t.replace(/[^\n]/g, '');
  const INT = /^(int|long|short|byte)$/;
  const TYPEKW = /^(int|long|short|byte|double|float|char|boolean|String|final)$/;

  // 1) remove comentários, guarda strings/chars em placeholders
  function protect(src) {
    let out = '', lits = [], i = 0; const n = src.length;
    while (i < n) {
      const c = src[i], d = src[i + 1];
      if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && d === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') out += '\n'; i++; } i += 2; out += ' '; continue; }
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < n && src[j] !== c && src[j] !== '\n') { if (src[j] === '\\') j++; j++; }
        if (src[j] !== c) throw new CErr(c === '"' ? T('cStr') : T('cChar'), lineAt(src, i), 'sintaxe');
        const body = src.slice(i + 1, j);
        lits.push(c === '"' ? '"' + body + '"' : '"' + body.replace(/"/g, '\\"') + '"');
        out += `__L${lits.length - 1}__`; i = j + 1; continue;
      }
      out += c; i++;
    }
    return { code: out, lits };
  }
  function matchFwd(s, i) { const o = s[i], cl = { '(': ')', '[': ']', '{': '}' }[o]; let d = 0; for (let j = i; j < s.length; j++) { if (s[j] === o) d++; else if (s[j] === cl && --d === 0) return j; } return s.length - 1; }
  function matchBack(s, i) { const cl = s[i], o = { ')': '(', ']': '[', '}': '{' }[cl]; let d = 0; for (let j = i; j >= 0; j--) { if (s[j] === cl) d++; else if (s[j] === o && --d === 0) return j; } return 0; }
  const wsB = (s, i) => { while (i >= 0 && /\s/.test(s[i])) i--; return i; };
  const wsF = (s, i) => { while (i < s.length && /\s/.test(s[i])) i++; return i; };

  // 2) checagens de "compilação": chaves, parênteses, ponto e vírgula
  function syntaxCheck(code) {
    const st = [], lines = code.split('\n'), ctx = [];
    let pd = 0, line = 1, prevSig = '';
    for (let i = 0; i < code.length; i++) {
      const c = code[i];
      if (c === '\n') { ctx[line] = { init: st.length && st[st.length - 1].t === 'init', paren: pd > 0 }; line++; continue; }
      if (c === '(') pd++; else if (c === ')') { pd--; if (pd < 0) throw new CErr(TR('cParenExtra'), line, 'chave'); }
      else if (c === '{') { const t = (prevSig === '=' || prevSig === ']' || (prevSig === ',' || prevSig === '{') && st.length && st[st.length - 1].t === 'init') ? 'init' : 'block'; st.push({ t, line }); }
      else if (c === '}') { if (!st.length) throw new CErr(TR('cBraceExtra'), line, 'chave'); st.pop(); }
      if (!/\s/.test(c)) prevSig = c;
    }
    ctx[line] = { init: false, paren: pd > 0 };
    if (st.length) throw new CErr(TR('cEof', st.length), line, 'chave');
    if (pd > 0) throw new CErr(TR('cParenMissing'), line, 'chave');
    for (let k = 0; k < lines.length; k++) {
      const t = lines[k].trim(); if (!t) continue;
      const c = ctx[k + 1] || {}; if (c.init || c.paren) continue;
      if (/^[{}]/.test(t) && !/^\}\s*while\b/.test(t)) continue;
      if (/^(if|for|while|else|do|switch|try|catch|finally|case|default|import|package|public|private|protected|static|class|final|abstract)\b/.test(t) || t[0] === '@') continue;
      if (/(\+\+|--)$/.test(t) || !/[;{},(\[+\-*\/%=&|?:<>!.]$/.test(t)) {
        let nx = ''; for (let m = k + 1; m < lines.length; m++) { if (lines[m].trim()) { nx = lines[m].trim(); break; } }
        if (/^[.+\-*\/%&|?:)\]{]/.test(nx) && !/^(\+\+|--)/.test(nx)) continue;
        if (/\)$/.test(t) && /^[A-Za-z_][\w<>\[\],\s]*\s+[A-Za-z_]\w*\s*\(.*\)$/.test(t)) continue; // assinatura de método sem {
        throw new CErr(TR('cSemi'), k + 1, 'semi');
      }
    }
  }

  function transpile(src) {
    let { code, lits } = protect(src);
    syntaxCheck(code);
    // nomes que são palavras reservadas em JS mas não em Java
    code = code.replace(/(?<![\w$.])(function|delete|in|typeof|arguments|eval|yield|await|with|export|debugger|undefined|let|of)(?![\w$])/g, '$_$1');

    // classes
    const classes = [...code.matchAll(/\b(?:enum|interface|record|class)\s+([A-Za-z_]\w*)/g)];
    if (!classes.length) throw new CErr(TR('cNoClass'), 1, 'classe');
    if (classes.length > 1) throw new CErr(TR('cManyClasses', classes.length, classes.map(c => c[1]).join(', ')), lineAt(code, classes[1].index), 'classe');
    const mainClass = classes[0][1];
    if (!/\bstatic\s+void\s+main\s*\(/.test(code)) throw new CErr(TR('cNoMain'), 1, 'sintaxe');
    if (/\bnew\s+[A-Z]\w*\s*\(/.test(code.replace(/\bnew\s+(Scanner|Random|StringBuilder|ArrayList|LinkedList|HashMap|HashSet|TreeMap|Integer|Double|String|int|double)\b/g, '')) && new RegExp('\\bnew\\s+' + mainClass + '\\s*\\(').test(code))
      throw new CErr(TR('cNewMain', mainClass), 1, 'sintaxe');

    // 3) divisão inteira: coleta declarações com tipo
    const decls = [], intM = new Set(['__idiv']), dblM = new Set(['__dbl']), rets = Object.create(null);
    const reD = /\b(int|long|short|byte|double|float|char|boolean|String)\s*((?:\[\s*\]\s*)*)\s+([A-Za-z_$][\w$]*)\s*((?:\[\s*\]\s*)*)/g; let m;
    while ((m = reD.exec(code))) {
      const after = code.slice(reD.lastIndex).match(/^\s*(\S)/), dims = (m[2] + m[4]).split('[').length - 1;
      if (after && after[1] === '(') { const k2 = m[3]; if (!(k2 in rets)) rets[k2] = []; rets[k2].push(dims ? 'arr' : m[1]); continue; }
      decls.push({ n: m[3], p: m.index, b: m[1], d: dims });
      if (after && (after[1] === ',' || after[1] === '=')) {
        let dp = 0;
        for (let j = reD.lastIndex; j < code.length; j++) {
          const ch = code[j];
          if ('([{'.includes(ch)) dp++; else if (')]}'.includes(ch)) { if (!dp) break; dp--; }
          else if (ch === ';' && !dp) break;
          else if (ch === ',' && !dp) { const mm = code.slice(j + 1).match(/^\s*([A-Za-z_$][\w$]*)\s*((?:\[\s*\]\s*)*)/); if (!mm || TYPEKW.test(mm[1])) break; decls.push({ n: mm[1], p: j, b: m[1], d: dims + mm[2].split('[').length - 1 }); }
        }
      }
    }
    for (const n in rets) { if (rets[n].every(t => INT.test(t))) intM.add(n); if (rets[n].every(t => /^(double|float)$/.test(t))) dblM.add(n); }
    const typeAt = (n, p) => { let r = null; for (const d of decls) if (d.n === n && d.p <= p) r = d; return r; };
    const splitTop = (e, seps) => { const out = []; let dp = 0, st = 0, prev = ''; for (let i = 0; i < e.length; i++) { const c = e[i]; if ('(['.includes(c)) dp++; else if (')]'.includes(c)) dp--; else if (!dp && seps.includes(c) && /[\w$)\]]/.test(prev)) { out.push(e.slice(st, i)); st = i + 1; } if (!/\s/.test(c)) prev = c; } out.push(e.slice(st)); return out; };
    const topBrackets = r => { let dp = 0, n = 0; for (const c of r) { if (c === '[') { if (!dp) n++; dp++; } else if (c === ']') dp--; else if (c === '(' && !dp) break; } return n; };
    function isIntExpr(e, p) { if (/[<>=!&|?]/.test(e.replace(/__L\d+__/g, ''))) return false; return splitTop(e, '+-*/%').every(t => isIntPrim(t.replace(/^[\s+\-]+/, ''), p)); }
    function isIntPrim(t, p) {
      t = t.trim(); let k;
      if ((k = t.match(/^\(\s*(int|long|short|byte|double|float|char)\s*\)\s*([\s\S]*)$/))) return INT.test(k[1]);
      if (/^\d+[lL]?$/.test(t)) return true;
      if (/^[\d.]/.test(t)) return false;
      if (t[0] === '(') return isIntExpr(t.slice(1, -1), p);
      if (/\.(length|size\(\s*\)|length\(\s*\)|nextInt\(\s*\)|indexOf\([\s\S]*\)|compareTo\([\s\S]*\))$/.test(t) || /^Integer\.parseInt\(/.test(t)) return true;
      if ((k = t.match(/^Math\.(max|min|abs)\s*\(([\s\S]*)\)$/))) return splitTop(k[2], ',').every(a => isIntExpr(a, p));
      if (!(k = t.match(/^([A-Za-z_$][\w$]*)\s*([\s\S]*)$/))) return false;
      if (k[2].startsWith('(')) return intM.has(k[1]);
      if (k[2].startsWith('.')) return false;
      const d = typeAt(k[1], p); return !!d && INT.test(d.b) && d.d === topBrackets(k[2]);
    }
    function primBack(s, i) {
      let j = i;
      for (;;) {
        j = wsB(s, j); const c = s[j];
        if (c === ')' || c === ']') { const o = matchBack(s, j); const k = wsB(s, o - 1); if (k >= 0 && (c === ']' || isId(s[k]))) { j = k; continue; } return o; }
        if (isId(c)) { while (j >= 0 && isId(s[j])) j--; const k = wsB(s, j); if (k >= 0 && s[k] === '.') { j = k - 1; continue; } return j + 1; }
        return j + 1;
      }
    }
    function primFwd(s, i) {
      i = wsF(s, i); let j = i;
      while (s[j] === '-' || s[j] === '+') j = wsF(s, j + 1);
      const cm = s.slice(j).match(/^\(\s*(int|long|short|byte|double|float|char|String)\s*\)\s*/);
      if (cm) { const r = primFwd(s, j + cm[0].length); return { s: i, e: r.e }; }
      if (s[j] === '(') j = matchFwd(s, j) + 1; else while (j < s.length && isId(s[j])) j++;
      for (;;) { const k = wsF(s, j); if (s[k] === '.' && isId(s[k + 1])) { j = k + 1; while (isId(s[j])) j++; continue; } if (s[k] === '(' || s[k] === '[') { j = matchFwd(s, k) + 1; continue; } break; }
      return { s: i, e: j };
    }
    const castBefore = (s, st) => { const mm = s.slice(Math.max(0, st - 30), st).match(/\(\s*(?:int|long|short|byte|double|float|char)\s*\)\s*$/); return mm ? st - mm[0].length : st; };
    let pos = 0, delta = 0;
    for (;;) {
      const k = code.indexOf('/', pos); if (k < 0) break;
      if (code[k + 1] === '=') { pos = k + 2; continue; }
      let L = castBefore(code, primBack(code, k - 1));
      for (;;) { const q = wsB(code, L - 1); if (q >= 0 && '*/%'.includes(code[q]) && code[q + 1] !== '=') L = castBefore(code, primBack(code, q - 1)); else break; }
      const R = primFwd(code, k + 1), lt = code.slice(L, k), rt = code.slice(R.s, R.e), op = k - delta;
      if (lt.trim() && rt.trim() && isIntExpr(lt, op) && isIntPrim(rt.replace(/^[\s+\-]+/, ''), op)) {
        const rep = `__idiv(${lt.trim()}, ${rt.trim()})`;
        code = code.slice(0, L) + rep + onlyNL(code.slice(L, R.e)) + code.slice(R.e);
        delta += rep.length - (R.e - L); pos = L + 7;
      } else pos = k + 1;
    }
    // doubles impressos como no Java (8 → "8.0") quando concatenados a texto ou no println
    const isDblPrim = (t, p) => {
      t = t.trim().replace(/^[+\-]\s*/, ''); let k;
      if (/^\(\s*(double|float)\s*\)/.test(t) || /^\d*\.\d+([eE][+-]?\d+)?$|^\d+\.\d*$|^\d+[dDfF]$/.test(t)) return true;
      if (/^Math\.(sqrt|pow|random|floor|ceil|log|log10|exp|sin|cos|tan|cbrt|hypot)\s*\(/.test(t) || /\.(nextDouble|parseDouble)\s*\(/.test(t)) return true;
      if (t[0] === '(') return isDblExpr(t.slice(1, -1), p);
      if (!(k = t.match(/^([A-Za-z_$][\w$]*)\s*([\s\S]*)$/))) return false;
      if (k[2].startsWith('(')) return dblM.has(k[1]);
      if (k[2].startsWith('.')) return false;
      const d = typeAt(k[1], p); return !!d && /^(double|float)$/.test(d.b) && d.d === topBrackets(k[2]);
    };
    const isDblExpr = (e, p) => !/__L\d+__|[<>=!&|?]/.test(e) && splitTop(e, '+-*/%').some(t => isDblPrim(t, p));
    for (let p = 0; ;) {
      const re = /__L\d+__\s*\+\s*|println\s*\(\s*/g; re.lastIndex = p; const mm = re.exec(code); if (!mm) break;
      const R = primFwd(code, mm.index + mm[0].length), t = code.slice(R.s, R.e);
      if (t.trim() && !/^__L/.test(t.trim()) && isDblPrim(t, R.s - delta) && (mm[0][0] === '_' || /^\s*\)/.test(code.slice(R.e)))) { code = code.slice(0, R.s) + `__dd(${t})` + code.slice(R.e); }
      p = mm.index + mm[0].length;
    }
    for (let p = 0; ;) { // x + "texto"
      const re = /\+\s*__L\d+__/g; re.lastIndex = p; const mm = re.exec(code); if (!mm) break;
      let L = castBefore(code, primBack(code, mm.index - 1)); const t = code.slice(L, mm.index);
      const before = code[wsB(code, L - 1)];
      if (t.trim() && before !== '+' && before !== '*' && before !== '/' && isDblPrim(t, L - delta)) { code = code.slice(0, L) + `__dd(${t.trim()}) ` + code.slice(mm.index); p = L + 6 + t.length; } else p = mm.index + 1;
    }
    // casts
    for (let p = 0; ;) {
      const re = /\(\s*(int|long|short|byte|double|float|char|String)\s*\)/g; re.lastIndex = p; const cm = re.exec(code); if (!cm) break;
      const P = primFwd(code, cm.index + cm[0].length), inner = code.slice(P.s, P.e);
      const f = INT.test(cm[1]) ? '__int' : cm[1] === 'char' ? '__chr' : cm[1] === 'String' ? '' : '__dbl';
      code = code.slice(0, cm.index) + `${f}(${inner})` + code.slice(P.e); p = cm.index + 1;
    }
    // imports, anotações, classe principal
    code = code.replace(/^\s*(import|package)\b[^;]*;/gm, '').replace(/@\w+(\([^)]*\))?/g, '');
    const cls = code.match(/((?:public|final|abstract)\s+)*class\s+\w+[^{]*\{/);
    const ob = cls.index + cls[0].length - 1, cb = matchFwd(code, ob);
    code = code.slice(0, cls.index) + onlyNL(cls[0]) + code.slice(ob + 1, cb) + code.slice(cb + 1);
    // métodos → function (com sobrecarga por nº de parâmetros)
    const meths = {};
    code = code.replace(/((?:\b(?:public|private|protected|static|final|synchronized)\s+)*)\b([A-Za-z_$][\w$]*(?:\s*<[^>()]*>)?(?:\s*\[\s*\])*)\s+([A-Za-z_$][\w$]*)\s*\(([^()]*)\)\s*(?:throws\s+[\w.,\s]+)?\{/g, (all, mod, type, name, params) => {
      if (/^(if|for|while|switch|catch|synchronized|return|new|else|do|try)$/.test(name) || /^(else|new|return|throw|case)$/.test(type)) return all;
      const ps = params.trim() ? params.split(',').map(p => { const mm = p.trim().replace(/\[\s*\]/g, '').match(/(\.\.\.)?\s*([A-Za-z_$][\w$]*)$/); return (mm[1] ? '...' : '') + mm[2]; }) : [];
      (meths[name] = meths[name] || []).push(ps.length);
      return `${onlyNL(all)}function ${name}@@${ps.length}(${ps.join(', ')}) {`;
    });
    let disp = '';
    for (const [n, ar] of Object.entries(meths)) {
      if (new Set(ar).size > 1) { code = code.replace(new RegExp(`function ${n}@@(\\d+)\\(`, 'g'), `function ${n}__$1(`); disp += `function ${n}(...a){const f={${[...new Set(ar)].map(x => `${x}:${n}__${x}`).join(',')}}[a.length];if(!f)throw new ReferenceError("${n} is not defined");return f(...a);}`; }
      else code = code.replace(new RegExp(`function ${n}@@\\d+\\(`, 'g'), `function ${n}(`);
    }
    // modificadores restantes (campos) e declarações → let
    code = code.replace(/\b(public|private|protected|static|final|transient|volatile)\s+/g, '');
    const T = '(?:int|long|short|byte|double|float|char|boolean|String|var|Object|Scanner|Random|StringBuilder|Integer|Double|Character|Boolean|Long|(?:ArrayList|List|LinkedList|HashMap|Map|TreeMap|HashSet|Set)\\s*<[^;=(){}]*?>)';
    code = code.replace(new RegExp(`\\b(${T})((?:\\s*\\[\\s*\\])*)\\s+(?=[A-Za-z_$][\\w$]*\\s*(?:\\[\\s*\\]\\s*)*(?:=|;|,|:|\\)))`, 'g'), (a, t, br, off, s) => {
      const nx = s.slice(off + a.length).match(/^([A-Za-z_$][\w$]*)\s*;/);
      if (nx && !br) { const dv = /^(int|long|short|byte|double|float)$/.test(t) ? '0' : t === 'boolean' ? 'false' : t === 'char' ? '"\\u0000"' : 'null'; return `let ${nx[1]} = ${dv}; //`; }
      return 'let ';
    });
    code = code.replace(/let ([\w$]+) = ([^;]+); \/\/\1\s*;/g, 'let $1 = $2;');
    code = code.replace(/\blet\s+([\w$]+)\s*(?:\[\s*\]\s*)+/g, 'let $1 ');
    code = code.replace(/for\s*\(\s*let\s+([\w$]+)\s*:/g, 'for (let $1 of ');
    // arrays
    code = code.replace(/new\s+(int|long|short|byte|double|float|char|boolean|String|[A-Z]\w*)\s*(?=\[)/g, (a, t) => `@@NEW_${t}@@`);
    for (let k; (k = code.indexOf('@@NEW_')) >= 0;) {
      const e = code.indexOf('@@', k + 6), t = code.slice(k + 6, e); let j = e + 2; const dims = [];
      while (code[wsF(code, j)] === '[') { const a = wsF(code, j), b = matchFwd(code, a); dims.push(code.slice(a + 1, b).trim()); j = b + 1; }
      const q = wsF(code, j);
      if (code[q] === '{') { code = code.slice(0, k) + code.slice(q); continue; }
      const dv = /^(int|long|short|byte|double|float)$/.test(t) ? '0' : t === 'boolean' ? 'false' : t === 'char' ? '"\\u0000"' : 'null';
      const tag = { int: '[I', long: '[J', double: '[D', float: '[F', char: '[C', boolean: '[Z', String: '[Ljava.lang.String;' }[t] || '[L' + t + ';';
      code = code.slice(0, k) + `__arr(${dv}, "${tag}", ${dims.map(d => d || 'undefined').join(', ')})` + code.slice(j);
    }
    for (let p = 0; ;) { // inicializadores { ... }
      const re = /(=|return)\s*\{|(?<![\w$\])])\{(?=\s*[\d"\-{_]|\s*__L)/g; re.lastIndex = p; const mm = re.exec(code); if (!mm) break;
      const o = code.indexOf('{', mm.index); if (!mm[1]) { const pv = code[wsB(code, o - 1)]; if (pv !== '=' && pv !== '(' && pv !== ',') { p = o + 1; continue; } }
      const c = matchFwd(code, o); const inner = code.slice(o + 1, c).replace(/\{/g, '[').replace(/\}/g, ']');
      code = code.slice(0, o) + `__lit([${inner}])` + code.slice(c + 1); p = o + 1;
    }
    // catch múltiplo → um catch só
    for (let p = 0; ;) {
      const re = /catch\s*\(\s*([\w.\s|]+?)\s+([\w$]+)\s*\)\s*\{/g; re.lastIndex = p; let mm = re.exec(code); if (!mm) break;
      const start = mm.index; let end, parts = [];
      for (;;) { const o = mm.index + mm[0].length - 1; end = matchFwd(code, o); parts.push({ t: mm[1].split('|').map(x => '"' + x.trim().split('.').pop() + '"'), v: mm[2], b: code.slice(o + 1, end) }); const q = wsF(code, end + 1); const re2 = /catch\s*\(\s*([\w.\s|]+?)\s+([\w$]+)\s*\)\s*\{/y; re2.lastIndex = q; const m2 = re2.exec(code); if (!m2) break; mm = m2; }
      const body = parts.map((x, i) => `${i ? 'else ' : ''}if (__is(__e, [${x.t}])) { let ${x.v} = __e;${x.b}}`).join(' ') + ' else throw __e;';
      code = code.slice(0, start) + `catch (__e0) { const __e = __wrap(__e0); ${body} }` + code.slice(end + 1); p = start + 10;
    }
    code = code
      .replace(/new\s+([A-Za-z_]\w*)\s*<[^>]*>\s*\(/g, 'new $1(')
      .replace(/\.length\s*\(\s*\)/g, '.length')
      .replace(/\b(\d+(?:\.\d+)?)[lLfFdD]\b/g, '$1')
      .replace(new RegExp(`\\b${mainClass}\\.`, 'g'), '')
      .replace(/\bSystem\.out\./g, '__out.').replace(/\bSystem\.err\./g, '__err.').replace(/\bSystem\.in\b/g, '__stdin')
      .replace(/\bSystem\.exit\s*\(/g, '__exit(').replace(/\bSystem\.currentTimeMillis\s*\(\s*\)/g, 'Date.now()').replace(/\bSystem\.nanoTime\s*\(\s*\)/g, '__nano()')
      .replace(/\bString\.format\s*\(/g, '__fmt(').replace(/\bString\.valueOf\s*\(/g, '__str(').replace(/\bString\.join\s*\(/g, '__join(')
      .replace(/__L(\d+)__/g, (a, i) => lits[+i]);
    return '"use strict";' + code + '\n;' + disp + ';main(__lit([]));';
  }
  return { transpile, CErr };
})();

// ================= RUNTIME (roda dentro do Web Worker) =================
function JAVA_RUNTIME() {
  const G = self; let OUT = [], outLen = 0, last = Date.now(), STDIN = '';
  const flush = () => { if (OUT.length) { G.postMessage({ t: 'out', d: OUT.join('') }); OUT = []; } last = Date.now(); };
  class Stop extends Error {} class Exit extends Error {}
  const write = (s, err) => { outLen += s.length; if (outLen > 300000) throw new Stop('Saída muito grande — interrompido (loop infinito?)'); if (err) { flush(); G.postMessage({ t: 'err', d: s }); return; } OUT.push(s); if (Date.now() - last > 60) flush(); };
  const RAW = new WeakMap();
  const jstr = x => x === null || x === undefined ? 'null' : typeof x === 'number' ? (Object.is(x, -0) ? '-0.0' : String(x)) : String(x);
  // exceções
  class Throwable extends Error { constructor(msg) { super(msg == null ? '' : String(msg)); this.jmsg = msg == null ? null : String(msg); } getMessage() { return this.jmsg; } get jname() { return (this.constructor.pkg || 'java.lang') + '.' + this.constructor.jn; } toString() { return this.jname + (this.jmsg != null ? ': ' + this.jmsg : ''); } printStackTrace() { write(this.toString() + '\n\tat Main.main(Main.java)\n', true); } }
  Throwable.jn = 'Throwable';
  const mk = (n, parent, pkg) => { const C = class extends parent {}; C.jn = n; C.pkg = pkg; G[n] = C; return C; };
  const Exc = mk('Exception', Throwable), Err = mk('Error', Throwable), RT = mk('RuntimeException', Exc);
  mk('ArithmeticException', RT); const IOOB = mk('IndexOutOfBoundsException', RT); mk('ArrayIndexOutOfBoundsException', IOOB); mk('StringIndexOutOfBoundsException', IOOB);
  mk('NullPointerException', RT); const IAE = mk('IllegalArgumentException', RT); mk('NumberFormatException', IAE); mk('IllegalStateException', RT); mk('ClassCastException', RT); mk('UnsupportedOperationException', RT);
  const NSE = mk('NoSuchElementException', RT, 'java.util'); mk('InputMismatchException', NSE, 'java.util'); mk('IllegalFormatConversionException', IAE, 'java.util');
  mk('StackOverflowError', Err); mk('InterruptedException', Exc); mk('IOException', Exc, 'java.io');
  G.__wrap = e => { if (e instanceof Throwable || e instanceof Stop || e instanceof Exit) return e; if (e instanceof RangeError && /call stack/i.test(e.message)) return new StackOverflowError(); if (e instanceof TypeError && /null|undefined/.test(e.message)) return new NullPointerException(); return e; };
  G.__is = (e, names) => names.some(n => n === 'Throwable' ? e instanceof Throwable : G[n] && e instanceof G[n]);
  // arrays com checagem de índice
  function wrapArr(a, tag) {
    const h = (Math.random() * 0x7fffffff | 0).toString(16);
    const chk = (t, k) => { const i = +k; if (!(i >= 0 && i < t.length)) throw new ArrayIndexOutOfBoundsException(`Index ${k} out of bounds for length ${t.length}`); };
    const p = new Proxy(a, {
      get(t, k, r) { if (typeof k === 'string' && /^-?\d+$/.test(k)) { chk(t, k); return t[k]; } if (k === 'toString') return () => tag + '@' + h; if (k === 'clone') return () => wrapArr(t.slice(), tag); if (k === 'equals') return o => o === p; return Reflect.get(t, k, r); },
      set(t, k, v) { if (typeof k === 'string' && /^-?\d+$/.test(k)) chk(t, k); t[k] = v; return true; }
    });
    RAW.set(p, a); return p;
  }
  const raw = a => RAW.get(a) || a;
  G.__arr = (dv, tag, ...dims) => { const mk2 = (d) => { const n = dims[d]; if (n === undefined) return null; if (n < 0) throw new Error('NegativeArraySizeException: ' + n); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = d === dims.length - 1 ? dv : mk2(d + 1); return wrapArr(a, '['.repeat(dims.length - 1 - d) + tag); }; return mk2(0); };
  G.__lit = a => { const w = x => Array.isArray(x) ? wrapArr(x.map(w), x.length && Array.isArray(x[0]) ? '[[I' : x.every(v => typeof v === 'number' && Number.isInteger(v)) ? '[I' : x.every(v => typeof v === 'number') ? '[D' : '[Ljava.lang.String;') : x; return w(a); };
  // conversões
  G.__idiv = (a, b) => { a = typeof a === 'string' ? a.charCodeAt(0) : a; b = typeof b === 'string' ? b.charCodeAt(0) : b; if (b === 0) throw new ArithmeticException('/ by zero'); return Math.trunc(a / b); };
  G.__int = x => typeof x === 'string' ? x.charCodeAt(0) : (Number.isNaN(+x) ? 0 : Math.trunc(+x));
  G.__dbl = x => typeof x === 'string' ? x.charCodeAt(0) : +x;
  G.__chr = x => typeof x === 'number' ? String.fromCharCode(x) : String(x)[0];
  G.__dd = x => { if (typeof x !== 'number' || !isFinite(x)) return jstr(x); const a = Math.abs(x); if (a >= 1e7 || (a < 1e-3 && a > 0)) { let [mn, ex] = x.toExponential().split('e'); if (!mn.includes('.')) mn += '.0'; return mn + 'E' + (+ex); } return Number.isInteger(x) ? x + '.0' : String(x); };
  G.__str = x => Array.isArray(x) ? raw(x).join('') : jstr(x);
  G.__join = (sep, ...a) => (a.length === 1 && a[0] && a[0][Symbol.iterator] && typeof a[0] !== 'string' ? [...a[0]] : a).map(jstr).join(sep);
  G.__nano = () => Math.round(performance.now() * 1e6);
  G.__exit = c => { throw new Exit(String(c)); };
  // printf / String.format
  const fmt = G.__fmt = (f, ...a) => { let i = 0; return String(f).replace(/%([-#+ 0,(]*)(\d+)?(?:\.(\d+))?([a-zA-Z%])/g, (m0, fl, w, p, c) => {
    if (c === 'n') return '\n'; if (c === '%') return '%';
    if (i >= a.length) throw new IllegalFormatConversionException(`MissingFormatArgument: Format specifier '%${c}'`);
    const v = a[i++]; let s;
    switch (c) {
      case 'd': if (typeof v !== 'number' || !Number.isInteger(v)) throw new IllegalFormatConversionException(`d != ${typeof v === 'number' ? 'java.lang.Double' : 'java.lang.String'}`); s = String(v); if (fl.includes(',')) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); break;
      case 'f': if (typeof v !== 'number') throw new IllegalFormatConversionException('f != java.lang.' + (typeof v === 'string' ? 'String' : 'Object')); s = v.toFixed(p === undefined ? 6 : +p); if (fl.includes(',')) { const [ip, dp] = s.split('.'); s = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dp ? '.' + dp : ''); } break;
      case 'e': case 'E': s = (+v).toExponential(p === undefined ? 6 : +p).replace(/e([+-])(\d)$/, 'e$10$2'); if (c === 'E') s = s.toUpperCase(); break;
      case 's': case 'S': s = jstr(v); if (p !== undefined) s = s.slice(0, +p); if (c === 'S') s = s.toUpperCase(); break;
      case 'c': s = typeof v === 'number' ? String.fromCharCode(v) : String(v); break;
      case 'b': s = String(v !== null && v !== false && v !== undefined); break;
      case 'x': case 'X': s = (v >>> 0).toString(16); if (c === 'X') s = s.toUpperCase(); break;
      default: s = m0;
    }
    if (fl.includes('+') && /[df]/.test(c) && v >= 0) s = '+' + s;
    if (w && s.length < +w) { if (fl.includes('-')) s = s.padEnd(+w); else if (fl.includes('0') && /[dfx]/.test(c)) { const ng = s[0] === '-'; s = (ng ? '-' : '') + s.slice(ng ? 1 : 0).padStart(+w - (ng ? 1 : 0), '0'); } else s = s.padStart(+w); }
    return s; }); };
  const mkOut = err => ({ println(x) { write((arguments.length ? (Array.isArray(x) && RAW.get(x) && /^\[C/.test(String(x)) ? raw(x).join('') : jstr(x)) : '') + '\n', err); }, print(x) { write(jstr(x), err); }, printf(f, ...a) { write(fmt(f, ...a), err); return this; }, format(f, ...a) { write(fmt(f, ...a), err); return this; }, flush() {} });
  G.__out = mkOut(false); G.__err = mkOut(true); G.__stdin = { __stdin: true };
  // Scanner
  G.Scanner = class Scanner {
    constructor(src) { this.s = src && src.__stdin ? STDIN : String(src ?? ''); this.p = 0; this.nl = -1; this.echo = src && src.__stdin; }
    _ws() { while (this.p < this.s.length && /\s/.test(this.s[this.p])) this.p++; }
    _e(t) { if (!this.echo) return; let q = this.p; while (q < this.s.length && /[ \t\r]/.test(this.s[q])) q++; const eol = q >= this.s.length || this.s[q] === '\n'; flush(); G.postMessage({ t: 'in', d: t + (eol ? '\n' : ' ') }); if (eol) this.nl = q; }
    hasNext() { let q = this.p; while (q < this.s.length && /\s/.test(this.s[q])) q++; return q < this.s.length; }
    hasNextLine() { return this.p < this.s.length; }
    hasNextInt() { const sv = this.p; try { this.next(true); return /^[+-]?\d+$/.test(this._last); } catch (e) { return false; } finally { this.p = sv; } }
    hasNextDouble() { const sv = this.p; try { this.next(true); return !isNaN(parseFloat(this._last.replace(',', '.'))); } catch (e) { return false; } finally { this.p = sv; } }
    next(peek) { this._ws(); if (this.p >= this.s.length) throw new NoSuchElementException(); const st = this.p; while (this.p < this.s.length && !/\s/.test(this.s[this.p])) this.p++; const t = this._last = this.s.slice(st, this.p); if (!peek) this._e(t); return t; }
    nextInt() { const sv = this.p, t = this.next(true); if (!/^[+-]?\d+$/.test(t)) { this.p = sv; throw new InputMismatchException(`For input string: "${t}"`); } this._e(t); return parseInt(t, 10); }
    nextLong() { return this.nextInt(); } nextShort() { return this.nextInt(); } nextByte() { return this.nextInt(); }
    nextDouble() { const sv = this.p, t = this.next(true); if (!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)([eE][+-]?\d+)?$/.test(t)) { this.p = sv; throw new InputMismatchException(`For input string: "${t}"`); } this._e(t); return parseFloat(t.replace(',', '.')); }
    nextFloat() { return this.nextDouble(); }
    nextBoolean() { const sv = this.p, t = this.next(true); if (!/^(true|false)$/i.test(t)) { this.p = sv; throw new InputMismatchException(t); } this._e(t); return t.toLowerCase() === 'true'; }
    nextLine() { if (this.p >= this.s.length) throw new NoSuchElementException('No line found'); let e = this.s.indexOf('\n', this.p); if (e < 0) e = this.s.length; const r = this.s.slice(this.p, e).replace(/\r$/, ''); if (this.echo && !(e === this.nl && !r.trim())) { flush(); G.postMessage({ t: 'in', d: r + '\n' }); } this.p = e + 1; return r; }
    close() {}
  };
  G.Random = class Random { constructor() {} nextInt(a, b) { if (a === undefined) return (Math.random() * 2 ** 32) | 0; if (b === undefined) { if (a <= 0) throw new IllegalArgumentException('bound must be positive'); return Math.floor(Math.random() * a); } return a + Math.floor(Math.random() * (b - a)); } nextDouble() { return Math.random(); } nextBoolean() { return Math.random() < .5; } };
  G.StringBuilder = class StringBuilder { constructor(s) { this.v = s == null || typeof s === 'number' ? '' : String(s); } append(x) { this.v += Array.isArray(x) ? raw(x).join('') : jstr(x); return this; } insert(i, x) { this.v = this.v.slice(0, i) + jstr(x) + this.v.slice(i); return this; } reverse() { this.v = [...this.v].reverse().join(''); return this; } toString() { return this.v; } get length() { return this.v.length; } charAt(i) { return this.v.charAt(i); } setCharAt(i, c) { this.v = this.v.slice(0, i) + c + this.v.slice(i + 1); } deleteCharAt(i) { this.v = this.v.slice(0, i) + this.v.slice(i + 1); return this; } delete(a, b) { this.v = this.v.slice(0, a) + this.v.slice(b); return this; } indexOf(s) { return this.v.indexOf(s); } setLength(n) { this.v = this.v.slice(0, n); } isEmpty() { return !this.v.length; } };
  G.ArrayList = G.LinkedList = class ArrayList { constructor(c) { this.a = c && c[Symbol.iterator] && typeof c !== 'number' ? [...c] : []; } _c(i) { if (!(i >= 0 && i < this.a.length)) throw new IndexOutOfBoundsException(`Index ${i} out of bounds for length ${this.a.length}`); } add(i, x) { if (arguments.length === 2) this.a.splice(i, 0, x); else this.a.push(i); return true; } addAll(c) { this.a.push(...c); return true; } get(i) { this._c(i); return this.a[i]; } set(i, x) { this._c(i); const o = this.a[i]; this.a[i] = x; return o; } remove(x) { if (typeof x === 'number' && Number.isInteger(x)) { this._c(x); return this.a.splice(x, 1)[0]; } const i = this.a.findIndex(v => v === x); if (i < 0) return false; this.a.splice(i, 1); return true; } size() { return this.a.length; } isEmpty() { return !this.a.length; } contains(x) { return this.a.includes(x); } indexOf(x) { return this.a.indexOf(x); } clear() { this.a = []; } addFirst(x) { this.a.unshift(x); } addLast(x) { this.a.push(x); } getFirst() { return this.get(0); } getLast() { return this.get(this.a.length - 1); } removeFirst() { this._c(0); return this.a.shift(); } removeLast() { this._c(0); return this.a.pop(); } sort(c) { this.a.sort(c ? (x, y) => c.compare ? c.compare(x, y) : c(x, y) : cmp); } toString() { return '[' + this.a.map(jstr).join(', ') + ']'; } [Symbol.iterator]() { return this.a[Symbol.iterator](); } forEach(f) { this.a.forEach(x => f(x)); } };
  G.List = { of: (...a) => new ArrayList(a) };
  G.HashMap = G.TreeMap = class HashMap { constructor() { this.m = new Map(); } put(k, v) { const o = this.m.has(k) ? this.m.get(k) : null; this.m.set(k, v); return o; } get(k) { return this.m.has(k) ? this.m.get(k) : null; } getOrDefault(k, d) { return this.m.has(k) ? this.m.get(k) : d; } containsKey(k) { return this.m.has(k); } containsValue(v) { return [...this.m.values()].includes(v); } remove(k) { const o = this.get(k); this.m.delete(k); return o; } size() { return this.m.size; } isEmpty() { return !this.m.size; } keySet() { return new ArrayList(this.constructor.name === 'TreeMap' ? [...this.m.keys()].sort(cmp) : this.m.keys()); } values() { return new ArrayList(this.m.values()); } entrySet() { return new ArrayList([...this.m].map(([k, v]) => ({ getKey: () => k, getValue: () => v, toString: () => jstr(k) + '=' + jstr(v) }))); } toString() { return '{' + [...this.m].map(([k, v]) => jstr(k) + '=' + jstr(v)).join(', ') + '}'; } };
  G.HashSet = class HashSet { constructor(c) { this.s = new Set(c || []); } add(x) { const h = this.s.has(x); this.s.add(x); return !h; } contains(x) { return this.s.has(x); } remove(x) { return this.s.delete(x); } size() { return this.s.size; } isEmpty() { return !this.s.size; } toString() { return '[' + [...this.s].map(jstr).join(', ') + ']'; } [Symbol.iterator]() { return this.s[Symbol.iterator](); } };
  const cmp = (x, y) => typeof x === 'string' ? (x < y ? -1 : x > y ? 1 : 0) : x - y;
  G.Arrays = {
    toString: a => a == null ? 'null' : '[' + [...raw(a)].map(jstr).join(', ') + ']',
    deepToString: a => a == null ? 'null' : '[' + [...raw(a)].map(x => Array.isArray(x) ? Arrays.deepToString(x) : jstr(x)).join(', ') + ']',
    sort: (a, f, t) => { const r = raw(a); if (typeof f === 'number') { const part = r.slice(f, t).sort(cmp); r.splice(f, part.length, ...part); } else r.sort(f ? (x, y) => f.compare ? f.compare(x, y) : f(x, y) : cmp); },
    fill: (a, v) => { raw(a).fill(v); }, equals: (a, b) => raw(a).length === raw(b).length && raw(a).every((x, i) => x === raw(b)[i]),
    copyOf: (a, n) => { const r = raw(a), o = r.slice(0, n); while (o.length < n) o.push(typeof r[0] === 'number' ? 0 : null); return __lit(o); },
    copyOfRange: (a, f, t) => __lit(raw(a).slice(f, t)), asList: (...a) => new ArrayList(a.length === 1 && Array.isArray(a[0]) ? raw(a[0]) : a),
    stream: a => ({ sum: () => raw(a).reduce((s, x) => s + x, 0), max: () => ({ getAsInt: () => Math.max(...raw(a)) }), min: () => ({ getAsInt: () => Math.min(...raw(a)) }) })
  };
  G.Collections = { sort: (l, c) => l.sort(c), reverse: l => l.a.reverse(), max: l => [...l.a].sort(cmp).pop(), min: l => [...l.a].sort(cmp)[0], shuffle: l => l.a.sort(() => Math.random() - .5), swap: (l, i, j) => { [l.a[i], l.a[j]] = [l.a[j], l.a[i]]; } };
  G.Integer = { MAX_VALUE: 2147483647, MIN_VALUE: -2147483648, parseInt(s, r) { s = String(s); if (!(r ? s.length : /^[+-]?\d+$/.test(s))) throw new NumberFormatException(`For input string: "${s}"`); return parseInt(s, r || 10); }, valueOf(s) { return typeof s === 'number' ? s : Integer.parseInt(s); }, toString: (n, r) => n.toString(r || 10), toBinaryString: n => (n >>> 0).toString(2), compare: (a, b) => a < b ? -1 : a > b ? 1 : 0, max: Math.max, min: Math.min, sum: (a, b) => a + b };
  G.Long = { ...G.Integer, MAX_VALUE: Number.MAX_SAFE_INTEGER, MIN_VALUE: Number.MIN_SAFE_INTEGER, parseLong: G.Integer.parseInt };
  G.Double = { MAX_VALUE: Number.MAX_VALUE, MIN_VALUE: Number.MIN_VALUE, POSITIVE_INFINITY: Infinity, NEGATIVE_INFINITY: -Infinity, NaN: NaN, parseDouble(s) { s = String(s).trim(); if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?[dDfF]?$/.test(s)) throw new NumberFormatException(`For input string: "${s}"`); return parseFloat(s); }, valueOf(s) { return typeof s === 'number' ? s : Double.parseDouble(s); }, compare: (a, b) => a < b ? -1 : a > b ? 1 : 0, isNaN: Number.isNaN, toString: String };
  G.Boolean = { parseBoolean: s => String(s).toLowerCase() === 'true', TRUE: true, FALSE: false };
  G.Character = { isDigit: c => /^\d$/.test(c), isLetter: c => /^\p{L}$/u.test(c), isLetterOrDigit: c => /^[\p{L}\d]$/u.test(c), isUpperCase: c => c !== c.toLowerCase(), isLowerCase: c => c !== c.toUpperCase(), isWhitespace: c => /^\s$/.test(c), toUpperCase: c => typeof c === 'number' ? String.fromCharCode(c).toUpperCase().charCodeAt(0) : c.toUpperCase(), toLowerCase: c => typeof c === 'number' ? String.fromCharCode(c).toLowerCase().charCodeAt(0) : c.toLowerCase(), getNumericValue: c => parseInt(c, 36), toString: c => String(c) };
  G.Thread = { sleep() {} };
  Math.floorDiv = (a, b) => Math.floor(a / b); Math.floorMod = (a, b) => ((a % b) + b) % b; Math.toRadians = d => d * Math.PI / 180; Math.toDegrees = r => r * 180 / Math.PI; Math.signum = Math.sign;
  // Strings com a semântica do Java
  const SP = String.prototype, oRep = SP.replace, oSplit = SP.split, oSub = SP.substring, oChar = SP.charAt;
  Object.assign(SP, {
    equals(o) { return o != null && String(this) === String(o); }, equalsIgnoreCase(o) { return o != null && this.toLowerCase() === String(o).toLowerCase(); },
    isEmpty() { return this.length === 0; }, isBlank() { return !this.trim(); }, contains(s) { return this.includes(String(s)); }, strip() { return this.trim(); },
    compareTo(o) { o = String(o); const n = Math.min(this.length, o.length); for (let i = 0; i < n; i++) if (this.charCodeAt(i) !== o.charCodeAt(i)) return this.charCodeAt(i) - o.charCodeAt(i); return this.length - o.length; },
    compareToIgnoreCase(o) { return this.toLowerCase().compareTo(String(o).toLowerCase()); },
    toCharArray() { return wrapArr([...this], '[C'); }, matches(r) { return new RegExp('^(?:' + r + ')$').test(this); },
    charAt(i) { if (!(i >= 0 && i < this.length)) throw new StringIndexOutOfBoundsException(`Index ${i} out of bounds for length ${this.length}`); return oChar.call(this, i); },
    substring(a, b) { const e = b === undefined ? this.length : b; if (a < 0 || e > this.length || a > e) throw new StringIndexOutOfBoundsException(`begin ${a}, end ${e}, length ${this.length}`); return oSub.call(this, a, e); },
    split(sep, lim) { if (typeof sep !== 'string') return oSplit.call(this, sep, lim); const r = oSplit.call(String(this), new RegExp(sep)); if (!lim) while (r.length > 1 && r[r.length - 1] === '') r.pop(); return r; },
    replace(a, b) { if (a instanceof RegExp || typeof b === 'function') return oRep.call(this, a, b); return oSplit.call(String(this), String(a)).join(String(b)); },
    replaceAll(r, s) { return oRep.call(this, new RegExp(r, 'g'), String(s).replace(/\$(\d)/g, '$$$1')); },
    hashCode() { let h = 0; for (let i = 0; i < this.length; i++) h = (h * 31 + this.charCodeAt(i)) | 0; return h; }
  });
  G.__javaName = e => e instanceof Throwable ? e.toString() : null;
  G.onmessage = ev => {
    STDIN = ev.data.stdin || '';
    const t0 = performance.now();
    try { const fn = new Function(ev.data.js); fn(); flush(); G.postMessage({ t: 'done', ms: performance.now() - t0 }); }
    catch (e0) {
      flush(); const e = __wrap(e0);
      if (e instanceof Exit) { G.postMessage({ t: 'done', ms: performance.now() - t0, exit: e.message }); return; }
      if (e instanceof Stop) { G.postMessage({ t: 'fail', kind: 'stop', msg: e.message }); return; }
      const ln = (String(e0.stack || '').match(/<anonymous>:(\d+):\d+/) || [])[1];
      G.postMessage({ t: 'fail', kind: e instanceof SyntaxError ? 'syntax' : e instanceof Throwable ? 'java' : 'js', name: e instanceof Throwable ? e.constructor.jn : e.name, msg: e instanceof Throwable ? e.toString() : e.message, line: ln ? +ln - 2 : null });
    }
  };
}

