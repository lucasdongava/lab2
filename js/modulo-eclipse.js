/*
 * Lab. Programação II — Plataforma de estudos Java
 * Módulo "Comece aqui": Java no Eclipse (aula + simulador da interface)
 */
// ================= MÓDULO 0: ECLIPSE =================
UNITS[0] = { name: 'Comece aqui', color: 'var(--acc)', soft: 'var(--acc-s)' };
LESSONS.unshift({
  id: 'eclipse', unit: 0, title: 'Java no Eclipse: criar, abrir e entregar',
  lead: 'As aulas e a prova prática de laboratório são feitas no Eclipse. Aqui você aprende o caminho completo: instalar, criar um projeto, rodar, abrir projetos prontos e exportar para entregar.',
  body: `
<div class="note"><b>Pense assim</b><span>o <b>workspace</b> é a sua estante, cada <b>projeto</b> é uma pasta nessa estante e cada <b>classe</b> (<code>.java</code>) é uma folha dentro da pasta. O Eclipse é a mesa onde você abre tudo isso.</span></div>
<h2>1. Instalar (uma vez só)</h2>
<ol>
<li>Baixe o instalador em <b>eclipse.org/downloads</b> e escolha <b>Eclipse IDE for Java Developers</b>.</li>
<li>O pacote atual já vem com um Java embutido. Se o Eclipse reclamar que não acha o Java (JRE/JDK), instale o <b>JDK Temurin</b> em <b>adoptium.net</b> e abra o Eclipse de novo.</li>
<li>Na primeira abertura, ele pede um <b>workspace</b>: a pasta onde seus projetos ficam salvos. Use algo fácil de achar, como <code>Documentos/eclipse-workspace</code>.</li>
</ol>
<div class="note tip"><b>Nos laboratórios</b><span>o Eclipse já está instalado. Confira só onde fica o workspace, para conseguir copiar seu projeto no fim da aula.</span></div>
<h2>2. Criar o projeto e a primeira classe</h2>
<p>Siga o simulador abaixo. Ele mostra exatamente onde clicar em cada passo.</p>
{{viz:eclipse}}
<h2>3. Onde fica cada coisa</h2>
{{viz:eclipsetree}}
<h2>4. Rodar e digitar dados</h2>
<ul>
<li>Rodar: botão verde <b>▶ Run</b>, ou <b>Ctrl + F11</b>, ou clique direito na classe › <b>Run As › Java Application</b>.</li>
<li>A saída aparece na aba <b>Console</b>, embaixo.</li>
<li>Se o programa usa <code>Scanner</code>, <b>clique dentro do Console</b>, digite o valor e aperte <b>Enter</b>. O programa fica parado esperando até você digitar.</li>
<li>Para parar um programa travado (loop infinito), clique no <b>quadrado vermelho ■</b> do Console.</li>
</ul>
<h2>5. Abrir um projeto pronto (baixado ou de outro computador)</h2>
<ol>
<li>Se veio em <b>.zip</b>: <b>File › Import… › General › Existing Projects into Workspace</b> › marque <b>Select archive file</b> › escolha o .zip › <b>Finish</b>.</li>
<li>Se veio como <b>pasta</b>: mesmo caminho, mas marque <b>Select root directory</b> e aponte a pasta do projeto.</li>
<li>Se é só um arquivo <b>.java</b> solto: crie um projeto, depois arraste o arquivo para dentro da pasta <code>src</code> no Package Explorer (escolha <b>Copy files</b>).</li>
</ol>
<h2>6. Exportar para entregar</h2>
<ol>
<li>Clique no projeto no Package Explorer.</li>
<li><b>File › Export… › General › Archive File</b> › <b>Next</b>.</li>
<li>Confira se o projeto está marcado, escolha onde salvar o <b>.zip</b> (ex.: <code>NomeSobrenome_Lista1.zip</code>) e clique <b>Finish</b>.</li>
</ol>
<div class="note warn"><b>Antes de enviar</b><span>abra o .zip e confira se os arquivos <code>.java</code> estão lá dentro de <code>src</code>. Mandar só a pasta <code>bin</code> (com os <code>.class</code>) é um erro comum: sem os <code>.java</code>, ninguém consegue ler o código.</span></div>
<h2>7. Atalhos que economizam tempo na prova</h2>
<div class="tbl-wrap"><table><tr><th>Digite / aperte</th><th>O que faz</th></tr>
<tr><td><code>main</code> + Ctrl + Espaço</td><td>escreve o <code>public static void main</code> inteiro</td></tr>
<tr><td><code>sysout</code> + Ctrl + Espaço</td><td>escreve <code>System.out.println();</code></td></tr>
<tr><td>Ctrl + Espaço</td><td>autocompletar nomes de variáveis e métodos</td></tr>
<tr><td>Ctrl + Shift + O</td><td>adiciona os <code>import</code> que faltam (ex.: Scanner)</td></tr>
<tr><td>Ctrl + Shift + F</td><td>arruma a indentação do código</td></tr>
<tr><td>Ctrl + 1</td><td>sugestões para corrigir o erro sublinhado em vermelho</td></tr>
<tr><td>Ctrl + S</td><td>salva (o Eclipse compila ao salvar)</td></tr>
<tr><td>Ctrl + F11</td><td>executa</td></tr></table></div>
<h2>8. Erros comuns e como resolver</h2>
<div class="tbl-wrap"><table><tr><th>Mensagem / sintoma</th><th>Causa e solução</th></tr>
<tr><td>“Selection does not contain a main type”</td><td>A classe não tem o <code>main</code>, ou você clicou no projeto errado. Abra a classe com main e rode de dentro dela.</td></tr>
<tr><td>“The public type X must be defined in its own file”</td><td>O nome da classe é diferente do nome do arquivo. Renomeie com clique direito › <b>Refactor › Rename</b>.</td></tr>
<tr><td>“Scanner cannot be resolved to a type”</td><td>Falta <code>import java.util.Scanner;</code>. Aperte <b>Ctrl + Shift + O</b>.</td></tr>
<tr><td>Erro com <code>module-info.java</code></td><td>Apague o arquivo <code>module-info.java</code> do projeto. Na disciplina não usamos módulos.</td></tr>
<tr><td>X vermelho no projeto, mas o código parece certo</td><td><b>Project › Clean…</b> e depois salve de novo. Confira também a aba <b>Problems</b>.</td></tr>
<tr><td>Nada aparece no Console</td><td><b>Window › Show View › Console</b>. Se ainda nada aparecer, o programa pode estar esperando você digitar algo.</td></tr>
<tr><td>Sumiram as janelas do Eclipse</td><td><b>Window › Perspective › Reset Perspective…</b></td></tr></table></div>
<div class="note"><b>E este editor aqui?</b><span>Use para treinar no celular, no ônibus ou sem computador. Para a <b>prova prática</b> e para entregar trabalhos, use o Eclipse: é o ambiente onde o código é avaliado.</span></div>`,
  codes: {},
  ex: [
    { t: 'Seu primeiro projeto no Eclipse', l: 'f', d: 'No Eclipse, crie o projeto <code>Lab2</code>, a classe <code>Main</code> com main, cole este código, rode, digite seu nome no Console e exporte o projeto como <code>Lab2.zip</code>. Treine aqui antes, se quiser.', h: 'Ordem: File › New › Java Project → New › Class (marque o main) → Ctrl + F11 → clique no Console e digite → File › Export › Archive File.', in: 'Ana', s: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Bem-vindo ao Lab II, " + nome + "!");
    }
}
` }
  ]
});
EXAMPLES['eclipse:0'] = ['Ana', 'Seu nome: Ana\nBem-vindo ao Lab II, Ana!'];
PROVA.eclipse = ['Criar projeto e classe do zero, sem ajuda: <b>File › New › Java Project</b> e depois <b>New › Class</b> com main.', 'Rodar e usar o Console para digitar a entrada do Scanner.', 'Entregar certo: <b>File › Export › Archive File</b>, com os <code>.java</code> dentro de <code>src</code>.'];
QUIZ.eclipse = [
  ['Onde ficam os arquivos <code>.java</code> que você escreve?', ['na pasta bin', 'na pasta src', 'na JRE System Library'], 1, 'src = source (código-fonte). A pasta bin guarda os .class compilados.'],
  ['O programa usa Scanner e “nada acontece” depois de rodar. O que fazer?', ['rodar de novo', 'clicar no Console e digitar o valor', 'reinstalar o Eclipse'], 1, 'O programa está parado esperando a entrada. Clique no Console, digite e aperte Enter.'],
  ['Qual caminho gera o .zip para entregar?', ['File › Export › Archive File', 'File › Save As', 'Run › Export'], 0, 'Export › General › Archive File empacota o projeto inteiro.']];

// ---- simulador da tela do Eclipse ----
VIZ.eclipse = el => {
  vhead(el, 'Simulador', 'Criando um projeto no Eclipse, passo a passo', 'Avance os passos. O destaque azul mostra onde clicar.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const F = [
    { hl: 'file', menu: ['New ›', 'Open File…', 'Import…', 'Export…'], mh: 0, sub: ['Java Project', 'Package', 'Class'], sh: 0, tree: [], msg: 'Menu <b>File › New › Java Project</b>. (Se “Java Project” não aparecer, use <b>File › New › Project… › Java › Java Project</b>.)' },
    { dlg: 'proj', msg: 'Em <b>Project name</b> digite <code>Lab2</code>. Deixe o JRE como está. Se aparecer a opção <b>Create module-info.java file</b>, <b>desmarque</b>. Clique em <b>Finish</b>.', tree: [] },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📚', 'JRE System Library', 2]], msg: 'O projeto aparece no <b>Package Explorer</b>, à esquerda. Abra-o para ver a pasta <code>src</code>: é ali que o código fica.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2, 'hl'], ['📚', 'JRE System Library', 2]], ctx: ['New ›  Class', 'Refresh', 'Properties'], msg: 'Clique com o botão direito em <code>src</code> › <b>New › Class</b>.' },
    { dlg: 'class', tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📚', 'JRE System Library', 2]], msg: 'Em <b>Name</b> digite <code>Main</code> (com M maiúsculo). Marque <b>public static void main(String[] args)</b>, assim o Eclipse escreve o main para você. Clique em <b>Finish</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4, 'hl'], ['📚', 'JRE System Library', 2]], code: true, msg: 'A classe abre no editor, já com o <code>main</code>. Escreva seu código dentro dele e salve com <b>Ctrl + S</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4]], code: true, run: true, hl: 'run', msg: 'Clique no botão verde <b>▶ Run</b> (ou <b>Ctrl + F11</b>). Na primeira vez, se perguntar, escolha <b>Java Application</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4]], code: true, console: true, msg: 'A saída aparece no <b>Console</b>. Se o programa usar Scanner, clique no Console, digite e aperte Enter. ✓ Pronto, esse é o ciclo de todo exercício.' }];
  player(el, () => F, f => {
    const tree = (f.tree || []).map(([i, n, d, h]) => `<div class="ec-ti ${h ? 'hl' : ''}" style="padding-left:${d * 10}px">${i} ${n}</div>`).join('') || '<div class="ec-empty">(vazio)</div>';
    const menu = f.menu ? `<div class="ec-menu">${f.menu.map((m, k) => `<div class="${k === f.mh ? 'hl' : ''}">${m}</div>`).join('')}</div><div class="ec-menu ec-sub">${f.sub.map((m, k) => `<div class="${k === f.sh ? 'hl' : ''}">${m}</div>`).join('')}</div>` : '';
    const ctx = f.ctx ? `<div class="ec-menu ec-ctx">${f.ctx.map((m, k) => `<div class="${k === 0 ? 'hl' : ''}">${m}</div>`).join('')}</div>` : '';
    const dlg = f.dlg === 'proj' ? `<div class="ec-dlg"><b>New Java Project</b><label>Project name: <span class="ec-in hl">Lab2</span></label><label>☐ Create module-info.java file</label><div class="ec-btns"><span>Cancel</span><span class="hl">Finish</span></div></div>`
      : f.dlg === 'class' ? `<div class="ec-dlg"><b>New Java Class</b><label>Name: <span class="ec-in hl">Main</span></label><label class="hlt">☑ public static void main(String[] args)</label><div class="ec-btns"><span>Cancel</span><span class="hl">Finish</span></div></div>` : '';
    st.innerHTML = `<div class="ec">
      <div class="ec-bar"><span class="${f.hl === 'file' ? 'hl' : ''}">File</span><span>Edit</span><span>Source</span><span>Run</span><span>Window</span><span class="ec-run ${f.hl === 'run' ? 'hl' : ''}">▶</span></div>
      <div class="ec-body"><div class="ec-pe"><div class="ec-t">Package Explorer</div>${tree}</div>
      <div class="ec-ed"><div class="ec-t">${f.code ? 'Main.java' : '&nbsp;'}</div>${f.code ? `<pre>public class Main {\n  public static void main(String[] args) {\n    System.out.println("Olá!");\n  }\n}</pre>` : ''}</div></div>
      <div class="ec-con"><div class="ec-t">Console</div>${f.console ? '<pre>Olá!</pre>' : ''}</div>
      ${menu}${ctx}${dlg}</div><div class="vmsg">${f.msg}</div>`;
  }, 2600);
};
VIZ.eclipsetree = el => {
  vhead(el, 'Toque para explorar', 'Anatomia de um projeto Java', 'Toque em cada item para saber para que serve.');
  const T = [['📁 Lab2', 0, 'O <b>projeto</b>: uma pasta dentro do workspace. Um projeto por lista ou trabalho deixa tudo organizado.'], ['📂 src', 1, '<b>src</b> (source) guarda o código-fonte, os arquivos <code>.java</code>. <b>É isso que você entrega.</b>'], ['📦 (default package)', 2, 'O <b>pacote</b> organiza classes em subpastas. Na disciplina, o pacote padrão (sem nome) serve. Se for pedido um, crie com <b>New › Package</b>.'], ['☕ Main.java', 3, 'A <b>classe</b>. O nome do arquivo é sempre igual ao nome da classe pública.'], ['📚 JRE System Library', 1, 'As bibliotecas do Java (onde estão <code>Scanner</code>, <code>Math</code>, <code>String</code>…). Não mexa.'], ['📂 bin (oculta)', 1, '<b>bin</b> guarda os <code>.class</code>, que são o código compilado que o computador executa. O Eclipse gera sozinho a cada Ctrl + S.']];
  const t = add(el, `<div class="ec-tree">${T.map(([n, d], k) => `<button data-k="${k}" style="margin-left:${d * 18}px">${n}</button>`).join('')}</div>`);
  const msg = add(el, `<div class="vmsg">Toque em <b>📂 src</b>, a pasta mais importante.</div>`);
  t.onclick = e => { const b = e.target.closest('[data-k]'); if (!b) return; t.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); msg.innerHTML = T[+b.dataset.k][2]; };
};

