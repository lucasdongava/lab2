/*
 * Lab. Programação II — Plataforma de estudos Java
 * Resumo das 3 unidades para a prova: regras, códigos-modelo, simulações, erros clássicos e cartões
 */
// ================= RESUMO PARA A PROVA =================
const escR = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const C = s => `<pre class="mini" data-hl>${escR(s.replace(/^\n/, ''))}</pre>`;
const KEY = t => `<div class="key">${t}</div>`;
const RESUMO = [
{ u: 1, id: 'r-u1', title: 'Unidade 1 · Fundamentos', blocks: [
  ['Esqueleto do programa', `${C(`
public class Main {                       // nome = nome do arquivo (Main.java)
    public static void main(String[] args) {
        System.out.println("Olá");        // escreve e pula linha
    }
}`)}<ul><li><code>print</code> não pula linha · <code>println</code> pula · <code>printf</code> formata.</li><li>Toda instrução termina com <code>;</code> e todo bloco abre <code>{</code> e fecha <code>}</code>.</li></ul>`],
  ['Tipos e variáveis', `<div class="tbl-wrap"><table><tr><th>tipo</th><th>guarda</th><th>exemplo</th></tr>
<tr><td><code>int</code></td><td>inteiro</td><td><code>int n = 10;</code></td></tr>
<tr><td><code>double</code></td><td>decimal</td><td><code>double m = 7.5;</code></td></tr>
<tr><td><code>char</code></td><td>1 caractere (aspas simples)</td><td><code>char c = 'A';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean ok = true;</code></td></tr>
<tr><td><code>String</code></td><td>texto (aspas duplas)</td><td><code>String s = "Ana";</code></td></tr></table></div>
${KEY('<b>Cast:</b> <code>(int) 7.9</code> = 7 (corta, não arredonda) · <code>(double) 7 / 2</code> = 3.5')}`],
  ['Operadores — a pegadinha da divisão', `<div class="calc">
<div><code>7 / 2</code><b>3</b><small>int / int = divisão inteira</small></div>
<div><code>7 % 2</code><b>1</b><small>resto da divisão</small></div>
<div><code>7 / 2.0</code><b>3.5</b><small>um lado double → real</small></div>
<div><code>10 % 3</code><b>1</b><small>10 = 3×3 + 1</small></div></div>
<ul><li>Lógicos: <code>&amp;&amp;</code> (E), <code>||</code> (OU), <code>!</code> (NÃO). Comparação: <code>== != &lt; &gt; &lt;= &gt;=</code>.</li>
<li><code>x++</code> soma 1 · <code>x += 5</code> é o mesmo que <code>x = x + 5</code>.</li>
<li>Par: <code>n % 2 == 0</code> · Divisível por 3: <code>n % 3 == 0</code> · Último dígito: <code>n % 10</code> · Tira o último dígito: <code>n / 10</code>.</li></ul>`],
  ['String (texto)', `<div class="tbl-wrap"><table><tr><th>método</th><th>faz</th><th>"java"</th></tr>
<tr><td><code>s.length()</code></td><td>tamanho</td><td>4</td></tr>
<tr><td><code>s.charAt(i)</code></td><td>caractere na posição i</td><td><code>charAt(0)</code> → 'j'</td></tr>
<tr><td><code>s.substring(a, b)</code></td><td>pedaço de a até b−1</td><td><code>substring(1,3)</code> → "av"</td></tr>
<tr><td><code>s.equals(t)</code></td><td>compara conteúdo</td><td><b>nunca use ==</b></td></tr>
<tr><td><code>s.toUpperCase()</code></td><td>maiúsculas</td><td>"JAVA"</td></tr>
<tr><td><code>a.compareTo(b)</code></td><td>&lt;0 se a vem antes</td><td>ordem alfabética</td></tr></table></div>`],
  ['Entrada (Scanner) e saída formatada', `${C(`
import java.util.Scanner;                // fora da classe, no topo
Scanner sc = new Scanner(System.in);
int idade = sc.nextInt();
double nota = sc.nextDouble();
String palavra = sc.next();              // até o espaço
sc.nextLine();                           // ⚠ limpa o Enter que sobrou do nextInt
String nome = sc.nextLine();             // linha inteira
System.out.printf("Média: %.2f%n", nota);  // %d int · %.2f double · %s String · %n pula linha`)}
${KEY('<b>Armadilha:</b> depois de <code>nextInt()</code>/<code>nextDouble()</code>, um <code>nextLine()</code> devolve "" (vazio). Coloque um <code>sc.nextLine();</code> extra antes.')}`],
  ['Decisão: if / else / switch', `<div class="duo">${C(`
if (nota >= 7) {
    System.out.println("Aprovado");
} else if (nota >= 4) {
    System.out.println("Final");
} else {
    System.out.println("Reprovado");
}`)}${C(`
switch (op) {
    case 1: System.out.println("Um"); break;
    case 2: System.out.println("Dois"); break;
    default: System.out.println("Outro");
}
// sem break → executa os cases de baixo também`)}</div>
<ul><li>Só o <b>primeiro</b> bloco verdadeiro executa.</li><li>Ternário: <code>String r = (n &gt;= 7) ? "ok" : "não";</code></li></ul>`],
  ['Repetição: for / while / do-while', `<div class="trio">
<div><b>for</b><small>sabe quantas vezes</small>${C(`for (int i = 1; i <= 5; i++) {\n    System.out.print(i + " ");\n} // 1 2 3 4 5`)}</div>
<div><b>while</b><small>repete enquanto for verdade</small>${C(`while (n > 0) {\n    n = n / 10;\n    cont++;\n}`)}</div>
<div><b>do-while</b><small>executa pelo menos 1 vez</small>${C(`do {\n    op = sc.nextInt();\n} while (op != 0);`)}</div></div>
<ul><li><code>break</code> sai do laço · <code>continue</code> pula para a próxima volta.</li><li><b>Contador:</b> <code>cont++</code> · <b>Acumulador:</b> <code>soma += x</code> (comece em 0) · <b>Produto:</b> comece em 1.</li>
<li><b>Teste de mesa:</b> faça uma tabela com uma coluna por variável e uma linha por volta.</li></ul>`],
  ['Vetores e matrizes', `${C(`
int[] v = new int[5];            // 5 zeros, índices 0 a 4
int[] w = {7, 9, 5, 10, 8};      // já com valores
v.length                          // 5 (sem parênteses!)
for (int i = 0; i < v.length; i++) { ... }   // < e não <=
for (int x : w) { ... }           // for-each: só lê

int[][] m = new int[3][4];       // 3 linhas, 4 colunas
m.length → 3 linhas · m[0].length → 4 colunas · m[i][j]`)}
${KEY('<b>Erro clássico:</b> <code>v[v.length]</code> → <code>ArrayIndexOutOfBoundsException</code>. O último índice é <code>length − 1</code>.')}`],
  ['Moldes que caem sempre (decore)', `<div class="duo">${C(`
// soma e média
int soma = 0;
for (int i = 0; i < v.length; i++) soma += v[i];
double media = (double) soma / v.length;

// maior e menor (comece com v[0]!)
int maior = v[0], menor = v[0];
for (int i = 1; i < v.length; i++) {
    if (v[i] > maior) maior = v[i];
    if (v[i] < menor) menor = v[i];
}`)}${C(`
// contar quantos satisfazem
int cont = 0;
for (int x : v) if (x % 2 == 0) cont++;

// trocar duas posições
int temp = v[i];
v[i] = v[j];
v[j] = temp;

// primo
boolean primo = n > 1;
for (int d = 2; d * d <= n; d++)
    if (n % d == 0) primo = false;`)}</div>`]
]},
{ u: 2, id: 'r-u2', title: 'Unidade 2 · Busca e Ordenação', blocks: [
  ['Busca sequencial — O(n)', `${C(`
static int buscaSeq(int[] v, int x) {
    for (int i = 0; i < v.length; i++)
        if (v[i] == x) return i;   // achou: devolve a posição
    return -1;                     // não achou
}`)}<ul><li>Funciona com vetor <b>desordenado</b>.</li><li>Melhor caso: 1 comparação · Pior caso: <b>n</b> (no fim ou não existe).</li></ul>`],
  ['Busca binária — O(log n)', `${C(`
static int buscaBin(int[] v, int x) {
    int ini = 0, fim = v.length - 1;
    while (ini <= fim) {
        int meio = (ini + fim) / 2;
        if (v[meio] == x) return meio;
        else if (x < v[meio]) fim = meio - 1;   // vai para a esquerda
        else ini = meio + 1;                     // vai para a direita
    }
    return -1;
}`)}
${KEY('<b>Exige vetor ORDENADO.</b> Cada passo descarta metade: 1.000 elementos → ~10 passos; 1 milhão → ~20.')}
<p class="rs-h">Como simular (v = {2, 5, 8, 12, 16, 23, 38, 45}, procurando 23):</p>
<div class="tbl-wrap"><table><tr><th>passo</th><th>ini</th><th>fim</th><th>meio</th><th>v[meio]</th><th>decisão</th></tr>
<tr><td>1</td><td>0</td><td>7</td><td>3</td><td>12</td><td>23 &gt; 12 → ini = 4</td></tr>
<tr><td>2</td><td>4</td><td>7</td><td>5</td><td>23</td><td>achou → devolve 5</td></tr></table></div>`],
  ['Bubble Sort — O(n²)', `${C(`
for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - 1 - i; j++)
        if (v[j] > v[j + 1]) {              // vizinhos fora de ordem
            int t = v[j]; v[j] = v[j + 1]; v[j + 1] = t;
        }`)}
<p class="rs-h">Simulação de {5, 1, 4, 2, 8} (o maior “sobe” para o fim):</p>
<div class="sim"><span>início</span><code>5 1 4 2 8</code><span>passada 1</span><code>1 4 2 5 <b>8</b></code><span>passada 2</span><code>1 2 4 <b>5 8</b></code><span>passada 3</span><code>1 2 <b>4 5 8</b></code> <small>(sem trocas → pode parar)</small></div>
<ul><li>Compara <b>vizinhos</b> e troca. Otimização: variável <code>trocou</code>; se uma passada não troca nada, já está ordenado.</li></ul>`],
  ['Selection Sort — O(n²)', `${C(`
for (int i = 0; i < n - 1; i++) {
    int menor = i;
    for (int j = i + 1; j < n; j++)
        if (v[j] < v[menor]) menor = j;      // acha o menor do resto
    int t = v[i]; v[i] = v[menor]; v[menor] = t;   // põe na posição i
}`)}
<p class="rs-h">Simulação de {29, 10, 14, 37, 13} (o menor vai para a frente):</p>
<div class="sim"><span>início</span><code>29 10 14 37 13</code><span>i = 0</span><code><b>10</b> 29 14 37 13</code><span>i = 1</span><code><b>10 13</b> 14 37 29</code><span>i = 2</span><code><b>10 13 14</b> 37 29</code><span>i = 3</span><code><b>10 13 14 29</b> 37</code></div>
<ul><li>No máximo <b>n − 1 trocas</b> (uma por passada). Sempre faz todas as comparações.</li></ul>`],
  ['Comparativo (cai em questão teórica)', `<div class="tbl-wrap"><table><tr><th>algoritmo</th><th>ideia</th><th>custo</th><th>observação</th></tr>
<tr><td>Busca sequencial</td><td>olha um por um</td><td>O(n)</td><td>vetor pode estar desordenado</td></tr>
<tr><td>Busca binária</td><td>olha o meio, descarta metade</td><td>O(log n)</td><td>precisa estar ordenado</td></tr>
<tr><td>Bubble</td><td>troca vizinhos</td><td>O(n²)</td><td>muitas trocas; para cedo se ordenado</td></tr>
<tr><td>Selection</td><td>acha o menor e põe na frente</td><td>O(n²)</td><td>no máximo n−1 trocas</td></tr>
<tr><td>Insertion</td><td>insere cada um na parte já ordenada</td><td>O(n²)</td><td>rápido em vetor quase ordenado</td></tr></table></div>
${KEY('Ordenar Strings: troque <code>v[j] &gt; v[j+1]</code> por <code>v[j].compareTo(v[j+1]) &gt; 0</code>.')}`]
]},
{ u: 3, id: 'r-u3', title: 'Unidade 3 · Modularização', blocks: [
  ['Anatomia de um método', `${C(`
//  modificador  retorno  nome     parâmetros
    static       double   media   (double a, double b) {
        return (a + b) / 2;      // devolve o valor e ENCERRA o método
    }

    static void linha(int n) {   // void = não devolve nada
        for (int i = 0; i < n; i++) System.out.print("-");
        System.out.println();
    }

// chamando no main:
double m = media(7, 9);   // m = 8.0  (usa o valor devolvido)
linha(10);                 // só executa`)}
<ul><li>O tipo do <code>return</code> tem que bater com o tipo de retorno.</li><li>Variáveis criadas dentro do método só existem lá dentro (<b>escopo local</b>).</li></ul>`],
  ['Passagem de parâmetros', `<div class="duo">${C(`
static void muda(int x) { x = 99; }
int a = 1;
muda(a);
// a continua 1 → int é passado como CÓPIA DO VALOR`)}${C(`
static void muda(int[] v) { v[0] = 99; }
int[] a = {1, 2};
muda(a);
// a[0] agora é 99 → vetor passa a CÓPIA DO ENDEREÇO`)}</div>
${KEY('Por isso os métodos de ordenação são <code>void</code>: eles alteram o próprio vetor recebido.')}`],
  ['Sobrecarga', `${C(`
static int soma(int a, int b)          { return a + b; }
static int soma(int a, int b, int c)   { return a + b + c; }   // ✓ nº de parâmetros diferente
static double soma(double a, double b) { return a + b; }       // ✓ tipos diferentes
// static double soma(int a, int b)  ✗ ERRO: só o retorno muda`)}
<ul><li>Mesmo nome, <b>lista de parâmetros diferente</b> (quantidade ou tipos). O Java escolhe pela chamada.</li></ul>`],
  ['Recursão', `<div class="duo">${C(`
static int fat(int n) {
    if (n <= 1) return 1;          // CASO BASE (para)
    return n * fat(n - 1);         // PASSO (problema menor)
}
// fat(4) = 4*fat(3) = 4*3*fat(2) = 4*3*2*fat(1) = 24`)}${C(`
static int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}   // 0 1 1 2 3 5 8 13 ...

static int pot(int b, int e) {
    if (e == 0) return 1;
    return b * pot(b, e - 1);
}`)}</div>
${KEY('Sem caso base → chama para sempre → <code>StackOverflowError</code>. Na prova, escreva a “escada” das chamadas e depois volte multiplicando/somando.')}`],
  ['Programa modularizado (menu)', `${C(`
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] v = new int[0];
    int op;
    do {
        System.out.println("1-Ler 2-Mostrar 3-Ordenar 0-Sair");
        op = sc.nextInt();
        switch (op) {
            case 1: v = ler(sc); break;
            case 2: mostrar(v); break;
            case 3: ordenar(v); break;
        }
    } while (op != 0);
}`)}<ul><li>O <code>main</code> só organiza; cada tarefa vira um método com nome de verbo (<code>ler</code>, <code>mostrar</code>, <code>ordenar</code>).</li></ul>`]
]}
];
const ERROS_PROVA = [
  ['<code>=</code> no lugar de <code>==</code> dentro do if', '<code>=</code> atribui, <code>==</code> compara.'],
  ['<code>i &lt;= v.length</code> no for', 'Estoura o índice. Use <code>i &lt; v.length</code>.'],
  ['Comparar String com <code>==</code>', 'Use <code>s.equals("x")</code>.'],
  ['<code>soma / n</code> com dois int', 'Dá divisão inteira. Use <code>(double) soma / n</code>.'],
  ['Esquecer <code>break</code> no switch', 'Executa os cases de baixo também.'],
  ['Maior/menor começando em 0', 'Comece com <code>v[0]</code>; com negativos, 0 dá errado.'],
  ['Binária em vetor desordenado', 'Ordene antes.'],
  ['Recursão sem caso base', 'StackOverflowError.'],
  ['<code>nextLine()</code> logo após <code>nextInt()</code>', 'Lê vazio. Coloque um <code>sc.nextLine();</code> extra.'],
  ['Método com retorno sem <code>return</code>', 'Erro de compilação: todo caminho precisa devolver valor.']
];
const FLASH = [
  ['Quanto vale 17 / 5 e 17 % 5?', '3 e 2'], ['Último índice de new int[8]?', '7'], ['Qual busca exige vetor ordenado?', 'A binária'],
  ['Custo do Bubble e do Selection?', 'O(n²)'], ['Custo da busca binária?', 'O(log n)'], ['O que a busca devolve se não achar?', '-1'],
  ['Selection em [4, 1, 3, 2] após a 1ª passada?', '[1, 4, 3, 2]'], ['Bubble em [4, 1, 3, 2] após a 1ª passada?', '[1, 3, 2, 4]'],
  ['int passado para um método e alterado lá dentro muda fora?', 'Não (cópia do valor)'], ['E um vetor?', 'Sim (cópia do endereço)'],
  ['fat(5) = ?', '120'], ['O que torna duas sobrecargas válidas?', 'Parâmetros diferentes (quantidade ou tipos)'],
  ['meio com ini = 0 e fim = 9?', '4'], ['do-while executa no mínimo quantas vezes?', '1'], ['(int) 9.99 = ?', '9'], ['"java".charAt(1)?', "'a'"]
];
function renderResumo() {
  let h = `<div class="crumb">Revisão de véspera</div><h1>Resumo das 3 unidades</h1>
  <p class="lead">Tudo o que cai na prova em uma página: regras, códigos-modelo para decorar, como simular buscas e ordenações à mão, os erros clássicos e cartões de revisão rápida.</p>
  <div class="rs-plan"><b>Se você tem poucas horas</b><ol><li><b>40 min</b> — Unidade 1: leia os moldes e escreva cada um uma vez no papel.</li><li><b>40 min</b> — Unidade 2: copie as 4 funções e simule Bubble e Selection à mão.</li><li><b>30 min</b> — Unidade 3: métodos, parâmetros e recursão (faça a escada do fatorial).</li><li><b>15 min</b> — Erros clássicos + cartões de revisão.</li></ol></div>
  <nav class="rs-nav">${RESUMO.map(U => `<button data-jump="${U.id}" style="--c:${UNITS[U.u].color}">${U.title.split(' · ')[0]}<small>${U.title.split(' · ')[1]}</small></button>`).join('')}<button data-jump="r-erros" style="--c:var(--o-err)">Erros<small>clássicos</small></button><button data-jump="r-flash" style="--c:var(--acc)">Cartões<small>revisão</small></button></nav>`;
  for (const U of RESUMO) {
    h += `<section class="rs-unit" id="${U.id}"><h2 style="--c:${UNITS[U.u].color}"><span class="rs-dot"></span>${U.title}</h2>`;
    U.blocks.forEach(([t, body], k) => { h += `<details class="rs-card" ${k < 99 ? 'open' : ''}><summary>${t}</summary><div class="rs-body">${body}</div></details>`; });
    h += `</section>`;
  }
  h += `<section class="rs-unit" id="r-erros"><h2 style="--c:var(--o-err)"><span class="rs-dot"></span>Erros clássicos de prova</h2><div class="errs">${ERROS_PROVA.map(([a, b]) => `<div class="errc"><b>✕ ${a}</b><span>✓ ${b}</span></div>`).join('')}</div></section>`;
  h += `<section class="rs-unit" id="r-flash"><h2 style="--c:var(--acc)"><span class="rs-dot"></span>Cartões de revisão rápida</h2><p style="color:var(--fg2)">Pense na resposta e toque no cartão para conferir.</p><div class="flash">${FLASH.map(([q, a]) => `<button class="fc"><span class="fq">${q}</span><span class="fa2">${a}</span></button>`).join('')}</div></section>`;
  h += `<div class="rs-end"><b>Boa prova! 🍀</b><span>Na hora: leia o enunciado duas vezes, anote entrada e saída, faça o teste de mesa e só então escreva o código.</span></div>`;
  return h;
}

