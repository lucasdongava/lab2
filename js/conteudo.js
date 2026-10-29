/*
 * Lab. Programação II — Plataforma de estudos Java
 * Conteúdo: aulas, exercícios, projetos, plano, exemplos de execução, resumos para a prova e testes
 */
// ================= CONTEÚDO =================
const UNITS = {
  1:{name:'Fundamentos de Java',color:'var(--u1)',soft:'var(--u1s)'},
  2:{name:'Busca e Ordenação',color:'var(--u2)',soft:'var(--u2s)'},
  3:{name:'Modularização',color:'var(--u3)',soft:'var(--u3s)'}
};
const J = s => s.replace(/^\n/,'');   // helper p/ código

const LESSONS = [
/* ---------- UNIDADE 1 ---------- */
{id:'estrutura',unit:1,title:'Estrutura de um programa',
lead:'Todo programa Java começa por uma classe e um método main. Entender esse esqueleto é o primeiro passo.',
body:`
<div class="note"><b>Pense assim</b><span>a <b>classe</b> é a pasta que guarda tudo, e o <b>main</b> é a primeira página que o Java abre. Ele lê essa página de cima para baixo, uma instrução por vez.</span></div>
<h2>O esqueleto</h2>
<p>Em Java, todo código vive dentro de uma <b>classe</b>, e o programa começa pelo método <code>main</code>.</p>
{{fig:estrutura}}
{{code:ola}}
{{viz:anatomia}}
<div class="note tip"><b>Dica</b><span>Java diferencia maiúsculas de minúsculas: <code>System</code> ≠ <code>system</code>. Esse é o erro de compilação mais comum no início.</span></div>
<h2>Comentários</h2>
<p><code>// linha única</code> e <code>/* várias linhas */</code>. Comente o <i>porquê</i>, não o óbvio.</p>`,
codes:{ola:J(`
public class Main {
    public static void main(String[] args) {
        // Meu primeiro programa
        System.out.println("Olá, Lab II!");
        System.out.print("Sem quebra... ");
        System.out.println("agora sim.");
        System.out.printf("Nota: %.1f%n", 9.5);
    }
}`)},
ex:[
 {t:'Cartão de apresentação',l:'f',d:'Imprima seu nome, curso e período em três linhas, depois uma linha com 20 traços (---).',h:'Três println e um quarto com a string "--------------------". Ou use um for para os traços.',s:J(`
public class Main {
    public static void main(String[] args) {
        // imprima nome, curso e período

    }
}`)}
]},

{id:'tipos',unit:1,title:'Variáveis, tipos e operadores',
lead:'Java é fortemente tipado: cada variável tem um tipo fixo. Isso muda como as contas funcionam — especialmente a divisão.',
body:`
<div class="note"><b>Pense assim</b><span>uma variável é uma <b>caixa com etiqueta</b>. A etiqueta é o nome (<code>idade</code>) e o tipo é o formato da caixa: numa caixa <code>int</code> só cabem números inteiros. Se você tentar colocar 7.9, a parte decimal fica de fora.</span></div>
{{fig:caixas}}
<h2>Tipos primitivos que você vai usar</h2>
<div class="tbl-wrap"><table><tr><th>Tipo</th><th>Guarda</th><th>Exemplo</th></tr>
<tr><td><code>int</code></td><td>inteiros (±2,1 bilhões)</td><td><code>int idade = 19;</code></td></tr>
<tr><td><code>long</code></td><td>inteiros grandes</td><td><code>long cpf = 12345678900L;</code></td></tr>
<tr><td><code>double</code></td><td>decimais</td><td><code>double media = 7.5;</code></td></tr>
<tr><td><code>char</code></td><td>um caractere</td><td><code>char op = '+';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean ok = true;</code></td></tr>
<tr><td><code>String</code></td><td>texto (é classe, não primitivo)</td><td><code>String nome = "Ana";</code></td></tr>
</table></div>
<h2>Operadores</h2>
<p>Aritméticos <code>+ - * / %</code>, relacionais <code>== != &lt; &gt; &lt;= &gt;=</code>, lógicos <code>&amp;&amp; || !</code>, e atalhos <code>++ -- += -=</code>.</p>
{{code:ops}}
{{viz:divisao}}
<div class="note warn"><b>Atenção</b><span><code>7 / 2</code> dá <b>3</b>, não 3.5 — divisão entre inteiros descarta a parte decimal. Use <code>7 / 2.0</code> ou <code>(double) a / b</code>.</span></div>
<div class="note warn"><b>Strings</b><span>Compare textos com <code>a.equals(b)</code>, nunca com <code>==</code>.</span></div>`,
codes:{ops:J(`
public class Main {
    public static void main(String[] args) {
        int a = 7, b = 2;
        System.out.println("a / b = " + (a / b));            // 3
        System.out.println("a % b = " + (a % b));            // 1
        System.out.println("real  = " + ((double) a / b));   // 3.5

        int contador = 0;
        contador++;
        contador += 10;
        System.out.println("contador = " + contador);

        boolean aprovado = (a >= 6) && (b < 5);
        System.out.println("aprovado? " + aprovado);
    }
}`)},
ex:[
 {t:'Média ponderada',l:'f',d:'Leia duas notas (pesos 2 e 3) e mostre a média com 2 casas decimais.',h:'media = (n1*2 + n2*3) / 5.0 — o 5.0 força divisão real. Use printf("%.2f").',in:'7\n8.5',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double n1 = sc.nextDouble();
        double n2 = sc.nextDouble();
        // calcule a média ponderada (pesos 2 e 3)

    }
}`)},
 {t:'Conversor de segundos',l:'m',d:'Leia um total de segundos e mostre no formato horas:minutos:segundos. Ex.: 3725 → 1h 2min 5s.',h:'horas = total / 3600; resto = total % 3600; minutos = resto / 60; segundos = resto % 60.',in:'3725',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();

    }
}`)}
]},

{id:'entrada',unit:1,title:'Entrada com Scanner',
lead:'Programas úteis conversam com o usuário. A classe Scanner lê o que é digitado no teclado.',
body:`
<h2>Como usar</h2>
{{fig:scanfluxo}}
<p>Importe <code>java.util.Scanner</code>, crie um objeto ligado a <code>System.in</code> e chame o método do tipo que você quer ler.</p>
<div class="tbl-wrap"><table><tr><th>Método</th><th>Lê</th></tr>
<tr><td><code>nextInt()</code></td><td>um int</td></tr><tr><td><code>nextDouble()</code></td><td>um double</td></tr>
<tr><td><code>next()</code></td><td>uma palavra</td></tr><tr><td><code>nextLine()</code></td><td>a linha inteira</td></tr></table></div>
{{code:scan}}
{{viz:scanner}}
<div class="note"><b>Aqui no editor</b><span>Coloque os valores na aba <b>Entrada</b> (um por linha) antes de executar. O programa lê dali.</span></div>
<div class="note warn"><b>Armadilha</b><span>Depois de <code>nextInt()</code>, um <code>nextLine()</code> devolve a sobra da linha (vazia). Chame um <code>sc.nextLine();</code> extra para “limpar”.</span></div>`,
codes:{scan:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nome: ");
        String nome = sc.nextLine();
        System.out.print("Idade: ");
        int idade = sc.nextInt();
        System.out.println();
        System.out.println("Olá, " + nome + "! Em 5 anos você terá " + (idade + 5) + ".");
    }
}`)},
codeIn:{scan:'Maria Souza\n20'},
ex:[
 {t:'IMC',l:'f',d:'Leia peso (kg) e altura (m), calcule o IMC = peso / altura² e mostre com 1 casa decimal.',h:'imc = peso / (altura * altura). printf("IMC: %.1f%n", imc).',in:'70\n1.75',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

    }
}`)}
]},

{id:'condicionais',unit:1,title:'Decisões: if, else e switch',
lead:'Condicionais fazem o programa escolher caminhos diferentes conforme os dados.',
body:`
<div class="note"><b>Pense assim</b><span>é como uma <b>placa de estrada com várias saídas</b>. O carro pega a primeira saída cuja condição bate e ignora as outras. O <code>else</code> é o “siga em frente” quando nenhuma serviu.</span></div>
<h2>if / else if / else</h2>
{{fig:iffluxo}}
<p>A condição entre parênteses precisa resultar em <code>boolean</code>. O primeiro bloco verdadeiro executa e os demais são ignorados.</p>
{{code:ifelse}}
{{viz:ifnota}}
<h2>switch</h2>
<p>Bom quando você compara <b>uma</b> variável com vários valores fixos. Não esqueça o <code>break</code> — sem ele a execução “cai” no caso seguinte.</p>
{{code:sw}}
<div class="note tip"><b>Ternário</b><span><code>String s = (nota &gt;= 6) ? "Aprovado" : "Reprovado";</code> — um if/else em uma linha.</span></div>`,
codes:{ifelse:J(`
public class Main {
    public static void main(String[] args) {
        double nota = 7.8;
        if (nota >= 9) {
            System.out.println("Conceito A");
        } else if (nota >= 7) {
            System.out.println("Conceito B");
        } else if (nota >= 6) {
            System.out.println("Conceito C");
        } else {
            System.out.println("Reprovado");
        }
    }
}`),sw:J(`
public class Main {
    public static void main(String[] args) {
        int dia = 3;
        switch (dia) {
            case 1: System.out.println("Domingo"); break;
            case 2: System.out.println("Segunda"); break;
            case 3: System.out.println("Terça"); break;
            default: System.out.println("Outro dia");
        }
    }
}`)},
ex:[
 {t:'Calculadora',l:'f',d:'Leia dois números e um operador (+ - * /) e mostre o resultado. Trate divisão por zero.',h:'Leia o operador com sc.next() e use switch(op) com case "+": ... Antes de dividir, teste if (b == 0).',in:'10\n4\n/',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        String op = sc.next();

    }
}`)},
 {t:'Ano bissexto',l:'m',d:'Leia um ano e diga se é bissexto: divisível por 4 e não por 100, ou divisível por 400.',h:'(ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0',in:'2024',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int ano = sc.nextInt();

    }
}`)}
]},

{id:'lacos',unit:1,title:'Repetição: for, while, do-while',
lead:'Laços repetem um bloco enquanto uma condição for verdadeira. São o motor de quase todo algoritmo.',
body:`
<div class="note"><b>Pense assim</b><span>um laço é <b>dar voltas numa pista</b>. Antes de cada volta você confere a condição (“ainda tenho combustível?”). Na prova, o <b>teste de mesa</b> é anotar numa tabela o valor de cada variável a cada volta, igual à tabela da animação abaixo.</span></div>
<h2>Qual usar?</h2>
<div class="tbl-wrap"><table><tr><th>Laço</th><th>Quando</th></tr>
<tr><td><code>for</code></td><td>sabe quantas vezes vai repetir</td></tr>
<tr><td><code>while</code></td><td>repete até algo acontecer (pode nem executar)</td></tr>
<tr><td><code>do-while</code></td><td>executa pelo menos uma vez (menus, validação)</td></tr></table></div>
{{fig:forfluxo}}
{{viz:forpasso}}
<h2>Os três laços no código</h2>
{{code:loops}}
<div class="note warn"><b>Loop infinito</b><span>Se a condição nunca ficar falsa, o programa trava. Aqui o editor interrompe após 5 segundos.</span></div>
<p><code>break</code> sai do laço; <code>continue</code> pula para a próxima volta.</p>`,
codes:{loops:J(`
public class Main {
    public static void main(String[] args) {
        // for: tabuada do 7
        for (int i = 1; i <= 10; i++) {
            System.out.println("7 x " + i + " = " + (7 * i));
        }

        // while: quantos dígitos tem um número
        int n = 98765, digitos = 0;
        while (n > 0) {
            n = n / 10;
            digitos++;
        }
        System.out.println("Dígitos: " + digitos);

        // do-while: executa ao menos uma vez
        int x = 100;
        do {
            System.out.println("x = " + x);
            x++;
        } while (x < 100);
    }
}`)},
ex:[
 {t:'Soma até zero',l:'f',d:'Leia números até o usuário digitar 0. Mostre a soma e a quantidade de números lidos.',h:'while (true) { int v = sc.nextInt(); if (v == 0) break; soma += v; qtd++; }',in:'5\n3\n12\n0',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int soma = 0, qtd = 0;

    }
}`)},
 {t:'Número primo',l:'m',d:'Leia N e diga se é primo. Depois, imprima todos os primos de 2 até N.',h:'Um número é primo se nenhum divisor de 2 até √n divide ele. Use i * i <= n como condição.',in:'30',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

    }
}`)},
 {t:'Pirâmide de asteriscos',l:'m',d:'Leia a altura e desenhe uma pirâmide centralizada com *.',h:'Dois for internos: um para os espaços (altura - linha) e outro para os asteriscos (2*linha - 1).',in:'4',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int h = sc.nextInt();

    }
}`)}
]},

{id:'vetores',unit:1,title:'Vetores (arrays)',
lead:'Um vetor guarda vários valores do mesmo tipo em posições numeradas a partir de 0. É a base da Unidade 2.',
body:`
<div class="note"><b>Pense assim</b><span>um vetor é um <b>armário de gavetas numeradas</b>. Todas guardam o mesmo tipo de coisa, e a numeração começa no <b>0</b>. Para abrir uma gaveta, use <code>v[número]</code>.</span></div>
{{viz:vetor}}
<h2>Criando e percorrendo</h2>
{{code:arr}}
<ul>
<li>Índices vão de <code>0</code> até <code>length - 1</code>.</li>
<li>O tamanho é fixo depois de criado: <code>new int[5]</code> já nasce com cinco zeros.</li>
<li><code>for-each</code> (<code>for (int x : v)</code>) lê tudo, mas não dá o índice.</li>
</ul>
<div class="note warn"><b>Erro clássico</b><span><code>v[v.length]</code> gera <code>ArrayIndexOutOfBoundsException</code>. Use <code>i &lt; v.length</code>, não <code>&lt;=</code>.</span></div>
<h2>Matriz (vetor 2D)</h2>
{{code:mat}}`,
codes:{arr:J(`
public class Main {
    public static void main(String[] args) {
        int[] notas = {7, 9, 5, 10, 8};
        int soma = 0, maior = notas[0];

        for (int i = 0; i < notas.length; i++) {
            soma += notas[i];
            if (notas[i] > maior) maior = notas[i];
        }
        System.out.println("Média: " + (double) soma / notas.length);
        System.out.println("Maior: " + maior);

        for (int n : notas) System.out.print(n + " ");
        System.out.println();
    }
}`),mat:J(`
public class Main {
    public static void main(String[] args) {
        int[][] m = new int[3][4];
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 4; j++)
                m[i][j] = i * 4 + j;

        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++)
                System.out.printf("%3d", m[i][j]);
            System.out.println();
        }
    }
}`)},
ex:[
 {t:'Estatísticas do vetor',l:'f',d:'Leia 5 inteiros num vetor e mostre soma, média, maior e menor.',h:'Inicialize maior e menor com v[0], não com 0.',in:'4\n8\n15\n16\n23',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] v = new int[5];

    }
}`)},
 {t:'Inverter vetor',l:'m',d:'Inverta um vetor no próprio lugar (sem criar outro) e imprima.',h:'Troque v[i] com v[v.length-1-i] até a metade do vetor. Use uma variável temporária.',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] v = {1, 2, 3, 4, 5, 6};

        System.out.println(Arrays.toString(v));
    }
}`)},
 {t:'Palíndromo',l:'m',d:'Leia uma palavra e diga se ela é igual lida de trás para frente (ex.: "arara").',h:'Compare s.charAt(i) com s.charAt(s.length()-1-i) num for até a metade.',in:'arara',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next().toLowerCase();

    }
}`)}
]},

/* ---------- UNIDADE 2 ---------- */
{id:'busca-seq',unit:2,title:'Busca sequencial',
lead:'O jeito mais simples de achar algo: olhar posição por posição até encontrar. Funciona em qualquer vetor, ordenado ou não.',
body:`
<div class="note"><b>Pense assim</b><span>é procurar um nome numa <b>lista de chamada fora de ordem</b>: não tem atalho, você lê um por um até achar ou a lista acabar.</span></div>
<h2>Ideia</h2>
<p>Percorra o vetor do início ao fim. Se <code>v[i]</code> for o valor procurado, devolva <code>i</code>. Se chegar ao fim sem achar, devolva <code>-1</code> (convenção para “não encontrado”).</p>
{{code:seq}}
{{viz:buscaseq}}
<h2>Custo</h2>
<div class="tbl-wrap"><table><tr><th>Caso</th><th>Comparações</th><th>Quando</th></tr>
<tr><td>Melhor</td><td>1</td><td>está na primeira posição</td></tr>
<tr><td>Pior</td><td>n</td><td>está no fim ou não existe</td></tr>
<tr><td>Médio</td><td>≈ n/2</td><td>—</td></tr></table></div>
<p>Dizemos que é <b>O(n)</b>: dobrar o vetor dobra o tempo.</p>`,
codes:{seq:J(`
public class Main {
    static int buscaSequencial(int[] v, int alvo) {
        for (int i = 0; i < v.length; i++) {
            if (v[i] == alvo) return i;   // achou: devolve a posição
        }
        return -1;                        // não achou
    }

    public static void main(String[] args) {
        int[] v = {42, 7, 19, 3, 88, 25};
        System.out.println("19 está na posição " + buscaSequencial(v, 19));
        System.out.println("50 está na posição " + buscaSequencial(v, 50));
    }
}`)},
ex:[
 {t:'Contar ocorrências',l:'f',d:'Modifique a busca para contar quantas vezes o valor aparece no vetor, em vez de parar no primeiro.',h:'Não use return dentro do for; incremente um contador e retorne no final.',s:J(`
public class Main {
    static int contar(int[] v, int alvo) {
        // seu código
        return 0;
    }

    public static void main(String[] args) {
        int[] v = {3, 1, 3, 7, 3, 9};
        System.out.println(contar(v, 3)); // esperado: 3
    }
}`)},
 {t:'Busca com comparações',l:'m',d:'Faça a busca imprimir quantas comparações foram feitas. Teste com o alvo no início, no meio e inexistente.',h:'Um contador que soma 1 a cada if (v[i] == alvo).',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] v = {5, 10, 15, 20, 25, 30, 35, 40};
        int alvo = 40;

    }
}`)}
]},

{id:'busca-bin',unit:2,title:'Busca binária',
lead:'Se o vetor está ordenado, dá para descartar metade dos elementos a cada passo. Em 1 milhão de itens, bastam ~20 comparações.',
body:`
<div class="note"><b>Pense assim</b><span>é procurar uma palavra no <b>dicionário</b>. Você abre no meio, vê se a palavra vem antes ou depois e descarta metade do livro. Em poucas abertas você chega lá. Só funciona porque o dicionário está em ordem alfabética.</span></div>
<h2>Ideia</h2>
<ol><li>Olhe o elemento do <b>meio</b>.</li><li>Se for o alvo, achou.</li><li>Se o alvo for menor, procure só na metade esquerda; se maior, na direita.</li><li>Repita até o intervalo ficar vazio (<code>inicio &gt; fim</code>).</li></ol>
{{fig:metade}}
{{code:bin}}
{{viz:buscabin}}
<div class="note warn"><b>Pré-requisito</b><span>Só funciona com o vetor <b>ordenado</b>. Em vetor bagunçado ela devolve respostas erradas sem avisar.</span></div>
<h2>Sequencial × binária</h2>
<div class="tbl-wrap"><table><tr><th>n</th><th>Sequencial (pior)</th><th>Binária (pior)</th></tr>
<tr><td>100</td><td>100</td><td>7</td></tr><tr><td>10.000</td><td>10.000</td><td>14</td></tr><tr><td>1.000.000</td><td>1.000.000</td><td>20</td></tr></table></div>
<p>Binária é <b>O(log n)</b>.</p>
{{viz:cmpbusca}}`,
codes:{bin:J(`
public class Main {
    static int buscaBinaria(int[] v, int alvo) {
        int inicio = 0, fim = v.length - 1;
        while (inicio <= fim) {
            int meio = (inicio + fim) / 2;
            System.out.println("  olhando v[" + meio + "] = " + v[meio]);
            if (v[meio] == alvo) return meio;
            else if (alvo < v[meio]) fim = meio - 1;
            else inicio = meio + 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] v = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println("Resultado: " + buscaBinaria(v, 23));
    }
}`)},
ex:[
 {t:'Binária recursiva',l:'m',d:'Reescreva a busca binária de forma recursiva: buscar(v, alvo, inicio, fim).',h:'Caso base: inicio > fim → -1. Senão calcule meio e chame buscar com (inicio, meio-1) ou (meio+1, fim).',s:J(`
public class Main {
    static int buscar(int[] v, int alvo, int inicio, int fim) {
        // seu código
        return -1;
    }

    public static void main(String[] args) {
        int[] v = {1, 3, 5, 7, 9, 11, 13};
        System.out.println(buscar(v, 11, 0, v.length - 1)); // 5
    }
}`)},
 {t:'Primeira ocorrência',l:'d',d:'Em um vetor ordenado com repetidos {1,2,2,2,3,4}, encontre a PRIMEIRA posição do 2 usando busca binária.',h:'Quando achar, guarde a posição e continue procurando à esquerda (fim = meio - 1).',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] v = {1, 2, 2, 2, 3, 4};
        int alvo = 2;

    }
}`)}
]},

{id:'bubble',unit:2,title:'Bubble Sort',
lead:'Compara vizinhos e troca se estiverem fora de ordem. A cada passada, o maior elemento “borbulha” para o fim.',
body:`
<div class="note"><b>Pense assim</b><span>imagine bolhas num copo: a <b>maior</b> sobe primeiro. A cada passada, o maior número que ainda está fora de lugar vai “subindo” até o fim do vetor.</span></div>
<h2>Passo a passo</h2>
<p>Para <code>{5, 1, 4, 2}</code>: compara 5 e 1 → troca; 5 e 4 → troca; 5 e 2 → troca. Fim da 1ª passada: <code>{1, 4, 2, 5}</code>. O 5 já está no lugar certo.</p>
{{fig:passadas}}
{{viz:bubble}}
<h2>O código</h2>
{{code:bub}}
<h2>Otimização</h2>
<p>Se uma passada inteira não fizer nenhuma troca, o vetor já está ordenado — pare. A variável <code>trocou</code> faz isso.</p>
<div class="tbl-wrap"><table><tr><th>Caso</th><th>Custo</th></tr><tr><td>Melhor (já ordenado, com otimização)</td><td>O(n)</td></tr><tr><td>Médio / pior</td><td>O(n²)</td></tr></table></div>`,
codes:{bub:J(`
import java.util.Arrays;

public class Main {
    static void bubbleSort(int[] v) {
        int n = v.length;
        for (int i = 0; i < n - 1; i++) {
            boolean trocou = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (v[j] > v[j + 1]) {
                    int temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                    trocou = true;
                }
            }
            System.out.println("Passada " + (i + 1) + ": " + Arrays.toString(v));
            if (!trocou) break;
        }
    }

    public static void main(String[] args) {
        int[] v = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(v);
        System.out.println("Ordenado: " + Arrays.toString(v));
    }
}`)},
ex:[
 {t:'Ordem decrescente',l:'f',d:'Adapte o Bubble Sort para ordenar do maior para o menor.',h:'Só muda a comparação: v[j] < v[j+1].',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] v = {3, 9, 1, 7, 5};

        System.out.println(Arrays.toString(v)); // [9, 7, 5, 3, 1]
    }
}`)},
 {t:'Contar trocas',l:'m',d:'Conte quantas trocas o Bubble Sort faz em {5,4,3,2,1} e em {1,2,3,4,5}. Explique a diferença.',h:'Some 1 num contador sempre que entrar no if da troca.',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] a = {5, 4, 3, 2, 1};

    }
}`)}
]},

{id:'selection',unit:2,title:'Selection Sort',
lead:'Encontra o menor elemento e coloca na primeira posição; depois o segundo menor na segunda, e assim por diante.',
body:`
<div class="note"><b>Pense assim</b><span>é organizar cartas na mão: você procura a <b>menor carta</b> e coloca na primeira posição. Depois procura a menor entre as que sobraram e coloca na segunda. E assim por diante.</span></div>
<h2>Ideia</h2>
<p>Para cada posição <code>i</code>, procure o índice do menor elemento entre <code>i</code> e o fim, e troque-o com <code>v[i]</code>. Faz no máximo <b>n−1 trocas</b> — bem menos que o Bubble.</p>
{{fig:selpass}}
{{viz:selection}}
<h2>O código</h2>
{{code:sel}}
<h2>Comparando</h2>
<div class="tbl-wrap"><table><tr><th></th><th>Bubble</th><th>Selection</th></tr>
<tr><td>Comparações</td><td>O(n²)</td><td>O(n²) sempre</td></tr>
<tr><td>Trocas</td><td>até O(n²)</td><td>no máximo n−1</td></tr>
<tr><td>Para cedo se ordenado?</td><td>sim (otimizado)</td><td>não</td></tr></table></div>
<h2>O que é esse O(n²)?</h2>
<p>A notação O(…) diz <b>como o trabalho cresce</b> quando o vetor cresce. O(n): dobrou o vetor, dobrou o trabalho. O(n²): dobrou o vetor, o trabalho fica <b>4 vezes</b> maior. O(log n): dobrou o vetor, só <b>+1</b> passo.</p>
{{viz:complex}}
<div class="note tip"><b>Na prova</b><span>Saber simular à mão (escrever o vetor após cada passada) costuma valer tanto quanto o código.</span></div>`,
codes:{sel:J(`
import java.util.Arrays;

public class Main {
    static void selectionSort(int[] v) {
        for (int i = 0; i < v.length - 1; i++) {
            int menor = i;
            for (int j = i + 1; j < v.length; j++) {
                if (v[j] < v[menor]) menor = j;
            }
            int temp = v[i];
            v[i] = v[menor];
            v[menor] = temp;
            System.out.println("i=" + i + ": " + Arrays.toString(v));
        }
    }

    public static void main(String[] args) {
        int[] v = {29, 10, 14, 37, 13};
        selectionSort(v);
    }
}`)},
ex:[
 {t:'Insertion Sort',l:'d',d:'Implemente o Insertion Sort: pegue cada elemento e “insira” na posição certa da parte já ordenada à esquerda.',h:'Para i de 1 até n-1: chave = v[i]; j = i-1; enquanto j >= 0 e v[j] > chave, v[j+1] = v[j], j--. No fim, v[j+1] = chave.',s:J(`
import java.util.Arrays;

public class Main {
    static void insertionSort(int[] v) {

    }

    public static void main(String[] args) {
        int[] v = {12, 11, 13, 5, 6};
        insertionSort(v);
        System.out.println(Arrays.toString(v));
    }
}`)},
 {t:'Ordenar nomes',l:'m',d:'Ordene um vetor de String em ordem alfabética com Selection Sort.',h:'Troque o < por a.compareTo(b) < 0.',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String[] nomes = {"Pedro", "Ana", "Lucas", "Bia", "Caio"};

        System.out.println(Arrays.toString(nomes));
    }
}`)}
]},

/* ---------- UNIDADE 3 ---------- */
{id:'metodos',unit:3,title:'Métodos',
lead:'Métodos dividem o programa em partes com nome, que fazem uma coisa só e podem ser reutilizadas.',
body:`
<div class="note"><b>Pense assim</b><span>um método é como um <b>liquidificador</b>: você coloca ingredientes (parâmetros), ele faz o trabalho e devolve o suco (return). Quem usa não precisa saber como ele funciona por dentro.</span></div>
{{fig:maquina}}
<h2>Anatomia</h2>
{{code:anat}}
{{viz:chamada}}
<div class="tbl-wrap"><table><tr><th>Parte</th><th>Significado</th></tr>
<tr><td><code>static</code></td><td>pode ser chamado direto do main, sem criar objeto</td></tr>
<tr><td>tipo de retorno</td><td><code>int</code>, <code>double</code>, <code>boolean</code>… ou <code>void</code> (não devolve nada)</td></tr>
<tr><td>parâmetros</td><td>valores que o método recebe; cada um com seu tipo</td></tr>
<tr><td><code>return</code></td><td>devolve o resultado e encerra o método</td></tr></table></div>
<div class="note tip"><b>Boa prática</b><span>Se você copiou e colou um trecho, ele deveria ser um método. Nomes com verbo: <code>calcularMedia</code>, <code>ehPrimo</code>.</span></div>`,
codes:{anat:J(`
public class Main {
    // tipo de retorno, nome, parâmetros
    static double calcularMedia(double a, double b, double c) {
        return (a + b + c) / 3;
    }

    static boolean ehPar(int n) {
        return n % 2 == 0;
    }

    static void linha(int tamanho) {      // void: só executa
        for (int i = 0; i < tamanho; i++) System.out.print("=");
        System.out.println();
    }

    public static void main(String[] args) {
        linha(20);
        System.out.printf("Média: %.2f%n", calcularMedia(7, 8.5, 9));
        System.out.println("10 é par? " + ehPar(10));
        linha(20);
    }
}`)},
ex:[
 {t:'Biblioteca de funções',l:'f',d:'Crie os métodos fatorial(n), ehPrimo(n) e maior(a, b, c). Teste todos no main.',h:'fatorial: acumule num long com for. ehPrimo: n < 2 é falso; teste divisores até i*i <= n.',s:J(`
public class Main {
    // crie seus métodos aqui


    public static void main(String[] args) {
        // System.out.println(fatorial(5));   // 120
        // System.out.println(ehPrimo(17));   // true
        // System.out.println(maior(3, 9, 4)); // 9
    }
}`)}
]},

{id:'parametros',unit:3,title:'Passagem de parâmetros',
lead:'Por que alterar um int dentro do método não muda nada fora, mas alterar um vetor muda? A resposta está em o que é copiado.',
body:`
<div class="note"><b>Pense assim</b><span>passar um <code>int</code> é entregar uma <b>xerox</b> de um documento: rabiscar a cópia não muda o original. Passar um vetor é entregar o <b>endereço de uma casa</b>: quem tem o endereço consegue entrar e mudar os móveis, e você vai ver a mudança.</span></div>
<h2>Java sempre passa uma cópia</h2>
<ul><li><b>Primitivos</b> (<code>int</code>, <code>double</code>…): copia o <b>valor</b>. Mudar dentro do método não afeta a variável original.</li>
<li><b>Vetores e objetos</b>: copia a <b>referência</b> (o “endereço”). Os dois apontam para o mesmo vetor, então mudar <code>v[0]</code> lá dentro muda aqui fora.</li></ul>
{{code:par}}
{{viz:referencia}}
<div class="note"><b>Por isso</b><span>os métodos de ordenação da Unidade 2 são <code>void</code>: eles alteram o próprio vetor recebido.</span></div>`,
codes:{par:J(`
import java.util.Arrays;

public class Main {
    static void dobrarNumero(int x) {
        x = x * 2;
        System.out.println("  dentro: x = " + x);
    }

    static void dobrarVetor(int[] v) {
        for (int i = 0; i < v.length; i++) v[i] *= 2;
    }

    public static void main(String[] args) {
        int n = 5;
        dobrarNumero(n);
        System.out.println("fora:   n = " + n);       // continua 5

        int[] v = {1, 2, 3};
        dobrarVetor(v);
        System.out.println("vetor:  " + Arrays.toString(v)); // [2, 4, 6]
    }
}`)},
ex:[
 {t:'Trocar dois números',l:'m',d:'Tente escrever trocar(int a, int b) e veja que não funciona. Depois resolva com trocar(int[] v, int i, int j).',h:'A versão com vetor funciona porque altera as posições do mesmo vetor.',s:J(`
import java.util.Arrays;

public class Main {
    static void trocar(int[] v, int i, int j) {

    }

    public static void main(String[] args) {
        int[] v = {10, 20, 30};
        trocar(v, 0, 2);
        System.out.println(Arrays.toString(v)); // [30, 20, 10]
    }
}`)}
]},

{id:'sobrecarga',unit:3,title:'Sobrecarga',
lead:'Vários métodos podem ter o mesmo nome se os parâmetros forem diferentes. O Java escolhe pela assinatura.',
body:`
<h2>Mesma ideia, entradas diferentes</h2>
<p>A <b>assinatura</b> é nome + lista de tipos dos parâmetros. Só o tipo de retorno diferente <b>não</b> basta.</p>
{{code:sob}}
<div class="note"><b>Você já usa</b><span><code>System.out.println</code> é sobrecarregado: existe uma versão para <code>int</code>, outra para <code>String</code>, outra para <code>double</code>…</span></div>
<div class="note warn"><b>Neste editor</b><span>A execução no navegador não distingue sobrecargas pelo tipo — teste este conteúdo no OnlineGDB (botão ↗ do editor).</span></div>`,
codes:{sob:J(`
public class Main {
    static int somar(int a, int b) { return a + b; }
    static int somar(int a, int b, int c) { return a + b + c; }
    static double somar(double a, double b) { return a + b; }

    public static void main(String[] args) {
        System.out.println(somar(2, 3));
        System.out.println(somar(2, 3, 4));
        System.out.println(somar(1.5, 2.5));
    }
}`)},
ex:[
 {t:'Área sobrecarregada',l:'f',d:'Crie area(double lado) para quadrado, area(double base, double altura) para retângulo e area(double raio, boolean circulo) para círculo.',h:'Círculo: Math.PI * raio * raio. Rode no OnlineGDB para testar as três.',s:J(`
public class Main {

    public static void main(String[] args) {

    }
}`)}
]},

{id:'recursao',unit:3,title:'Recursão',
lead:'Um método que chama a si mesmo para resolver uma versão menor do mesmo problema.',
body:`
<div class="note"><b>Pense assim</b><span>pense nas <b>bonecas russas</b>: para abrir a maior você abre a de dentro, depois a de dentro dela… até a menor, que não abre mais (o caso base). Aí você volta montando tudo.</span></div>
<h2>Duas partes obrigatórias</h2>
<ol><li><b>Caso base</b>: a situação simples que responde direto, sem chamar de novo.</li><li><b>Passo recursivo</b>: chama o método com um problema menor, que se aproxima do caso base.</li></ol>
{{fig:bonecas}}
{{code:rec}}
{{viz:pilha}}
<div class="note warn"><b>Sem caso base</b><span>o método chama a si mesmo para sempre até estourar a pilha: <code>StackOverflowError</code>.</span></div>
`,
codes:{rec:J(`
public class Main {
    static long fatorial(int n) {
        if (n <= 1) return 1;            // caso base
        return n * fatorial(n - 1);      // passo recursivo
    }

    static int fibonacci(int n) {
        if (n < 2) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    static int somaDigitos(int n) {
        if (n < 10) return n;
        return n % 10 + somaDigitos(n / 10);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + fatorial(5));
        for (int i = 0; i < 10; i++) System.out.print(fibonacci(i) + " ");
        System.out.println();
        System.out.println("Soma dos dígitos de 2026: " + somaDigitos(2026));
    }
}`)},
ex:[
 {t:'Potência recursiva',l:'f',d:'Escreva potencia(base, exp) recursivamente, sem Math.pow.',h:'Caso base: exp == 0 → 1. Passo: base * potencia(base, exp - 1).',s:J(`
public class Main {
    static long potencia(int base, int exp) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(potencia(2, 10)); // 1024
    }
}`)},
 {t:'Inverter String',l:'m',d:'Inverta uma String recursivamente: inverter("java") → "avaj".',h:'Caso base: string vazia. Passo: inverter(s.substring(1)) + s.charAt(0).',s:J(`
public class Main {
    static String inverter(String s) {
        return s;
    }

    public static void main(String[] args) {
        System.out.println(inverter("java"));
    }
}`)},
 {t:'Soma de vetor recursiva',l:'m',d:'Some os elementos de um vetor recursivamente: soma(v, i) = v[i] + soma(v, i+1).',h:'Caso base: i == v.length → 0.',s:J(`
public class Main {
    static int soma(int[] v, int i) {
        return 0;
    }

    public static void main(String[] args) {
        int[] v = {4, 8, 15, 16, 23, 42};
        System.out.println(soma(v, 0)); // 108
    }
}`)}
]},

{id:'modular',unit:3,title:'Programa modularizado',
lead:'Juntando tudo: um sistema de notas onde o main só orquestra e cada tarefa vive no seu método.',
body:`
<h2>Um main que lê como roteiro</h2>
<p>Repare que o <code>main</code> quase não tem lógica — ele chama métodos com nomes claros. Isso facilita testar, corrigir e reaproveitar.</p>
{{viz:mapa}}
{{code:mod}}
<div class="note tip"><b>Checklist</b><span>Cada método faz uma coisa? O nome diz o que ele faz? Dá para testar sozinho? Se sim, está bem modularizado.</span></div>`,
codes:{mod:J(`
import java.util.Scanner;

public class Main {
    static double[] lerNotas(Scanner sc, int qtd) {
        double[] notas = new double[qtd];
        for (int i = 0; i < qtd; i++) notas[i] = sc.nextDouble();
        return notas;
    }

    static double media(double[] v) {
        double soma = 0;
        for (double x : v) soma += x;
        return soma / v.length;
    }

    static double maior(double[] v) {
        double m = v[0];
        for (double x : v) if (x > m) m = x;
        return m;
    }

    static String situacao(double media) {
        if (media >= 7) return "Aprovado";
        if (media >= 4) return "Prova final";
        return "Reprovado";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int qtd = sc.nextInt();
        double[] notas = lerNotas(sc, qtd);
        double m = media(notas);
        System.out.printf("Média: %.2f | Maior: %.1f | %s%n", m, maior(notas), situacao(m));
    }
}`)},
codeIn:{mod:'4\n6.5\n8\n7.5\n9'},
ex:[
 {t:'Menu de vetor',l:'d',d:'Faça um programa com menu (do-while + switch): 1-preencher vetor, 2-mostrar, 3-ordenar, 4-buscar, 0-sair. Cada opção é um método.',h:'Mantenha o vetor no main e passe-o para os métodos. Reaproveite o Bubble Sort e a busca binária.',in:'1\n5\n9 2 7 4 1\n2\n3\n2\n4\n7\n0',s:J(`
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static int menu(Scanner sc) {
        System.out.println("1-Preencher 2-Mostrar 3-Ordenar 4-Buscar 0-Sair");
        return sc.nextInt();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] v = new int[0];
        int op;
        do {
            op = menu(sc);
            // switch (op) { ... }
        } while (op != 0);
    }
}`)}
]}
];

/* ---------- PROJETOS (cards de dicas) ---------- */
const PROJECTS = [
 {u:1,t:'Jogo de adivinhação',d:'O computador sorteia 1–100 e diz “maior” ou “menor” a cada palpite. Conte as tentativas.',k:['Math.random()','do-while','if/else']},
 {u:1,t:'Verificador de CPF',d:'Valide os dois dígitos verificadores de um CPF lido como String.',k:['charAt','% 11','laços']},
 {u:1,t:'Análise de temperaturas',d:'Leia as temperaturas dos 7 dias, mostre média, dias acima da média, máxima e mínima.',k:['vetor','for','acumuladores']},
 {u:1,t:'Matriz: notas da turma',d:'Matriz alunos × provas. Calcule a média de cada aluno e de cada prova.',k:['int[][]','for aninhado']},
 {u:2,t:'Agenda ordenada',d:'Cadastre nomes, ordene alfabeticamente e busque com busca binária.',k:['String[]','compareTo','busca binária']},
 {u:2,t:'Placar do campeonato',d:'Times e pontos em vetores paralelos. Ordene por pontos mantendo o nome junto.',k:['vetores paralelos','troca dupla']},
 {u:2,t:'Benchmark de ordenação',d:'Gere 5.000 números aleatórios e compare o tempo do Bubble e do Selection.',k:['System.nanoTime','Random','O(n²)']},
 {u:2,t:'Merge Sort (desafio)',d:'Divida o vetor ao meio, ordene cada metade recursivamente e intercale. O(n log n).',k:['recursão','vetor auxiliar']},
 {u:3,t:'Calculadora com histórico',d:'Menu com operações em métodos separados e um vetor que guarda as últimas 10 contas.',k:['métodos','switch','vetor circular']},
 {u:3,t:'Biblioteca matemática',d:'mdc, mmc, ehPrimo, fatorial, fibonacci e potência — iterativo e recursivo, comparando os dois.',k:['static','recursão','retorno']},
 {u:3,t:'Caixa eletrônico',d:'Saldo, depósito, saque com validação e extrato. Cada operação é um método.',k:['parâmetros','validação','menu']},
 {u:3,t:'Analisador de notas',d:'Leia N notas, use métodos para média, desvio padrão, maior/menor e conceito.',k:['double[]','Math.sqrt','modularização']}
];

const PLAN = [
 ['Sem 1','Estrutura, tipos e operadores — faça todos os exercícios da aula 1 e 2.'],
 ['Sem 2','Scanner e condicionais — calculadora e ano bissexto. Projeto: jogo de adivinhação.'],
 ['Sem 3','Laços — primos e pirâmide. Treine simular laços à mão no papel.'],
 ['Sem 4','Vetores e matrizes — estatísticas, inversão, palíndromo. Projeto: temperaturas.'],
 ['Sem 5','Busca sequencial e binária — implemente as duas sem consultar.'],
 ['Sem 6','Bubble e Selection Sort — simule passadas à mão. Projeto: agenda ordenada.'],
 ['Sem 7','Métodos e parâmetros — reescreva exercícios antigos com métodos.'],
 ['Sem 8','Recursão + programa modularizado. Projeto final: caixa eletrônico ou menu de vetor.']
];

// ================= EXEMPLOS, RESUMOS PARA A PROVA E TESTES =================
// exemplo de execução de cada exercício: [entrada, saída esperada]
const EXAMPLES = {
  'estrutura:0': ['', 'Ana Souza\nCiência da Computação\n3º período\n--------------------'],
  'tipos:0': ['7\n8.5', 'Média: 7.90'],
  'tipos:1': ['3725', '1h 2min 5s'],
  'entrada:0': ['70\n1.75', 'IMC: 22.9'],
  'condicionais:0': ['10\n4\n/', '10.0 / 4.0 = 2.5\n\n(com 10, 0 e / →  Erro: divisão por zero)'],
  'condicionais:1': ['2024', '2024 é bissexto\n\n(com 1900 →  1900 não é bissexto)'],
  'lacos:0': ['5\n3\n12\n0', 'Soma: 20\nQuantidade: 3'],
  'lacos:1': ['30', '30 não é primo\nPrimos até 30: 2 3 5 7 11 13 17 19 23 29'],
  'lacos:2': ['4', '   *\n  ***\n *****\n*******'],
  'vetores:0': ['4\n8\n15\n16\n23', 'Soma: 66\nMédia: 13.2\nMaior: 23\nMenor: 4'],
  'vetores:1': ['', '[6, 5, 4, 3, 2, 1]'],
  'vetores:2': ['arara', 'arara é palíndromo\n\n(com java →  java não é palíndromo)'],
  'busca-seq:0': ['', '3'],
  'busca-seq:1': ['', 'Achou na posição 7\nComparações: 8'],
  'busca-bin:0': ['', '5'],
  'busca-bin:1': ['', 'Primeira ocorrência de 2: posição 1'],
  'bubble:0': ['', '[9, 7, 5, 3, 1]'],
  'bubble:1': ['', 'Trocas em [5, 4, 3, 2, 1]: 10\nTrocas em [1, 2, 3, 4, 5]: 0'],
  'selection:0': ['', '[5, 6, 11, 12, 13]'],
  'selection:1': ['', '[Ana, Bia, Caio, Lucas, Pedro]'],
  'metodos:0': ['', '120\ntrue\n9'],
  'parametros:0': ['', '[30, 20, 10]'],
  'sobrecarga:0': ['', 'Quadrado (lado 2): 4.0\nRetângulo (3 x 4): 12.0\nCírculo (raio 1): 3.14'],
  'recursao:0': ['', '1024'],
  'recursao:1': ['', 'avaj'],
  'recursao:2': ['', '108'],
  'modular:0': ['1\n5\n9 2 7 4 1\n2\n3\n2\n4\n7\n0', '1-Preencher 2-Mostrar 3-Ordenar 4-Buscar 0-Sair\nQuantos números? 5\n…\n[9, 2, 7, 4, 1]\n…\n[1, 2, 4, 7, 9]\n…\nBuscar: 7 está na posição 3\n…\nFim!']
};

// o que costuma cair na prova, por aula
const PROVA = {
  estrutura: ['Escrever o esqueleto <code>public class</code> + <code>main</code> de memória, sem consultar.', 'Diferença entre <code>print</code>, <code>println</code> e <code>printf</code>.', 'Achar erros de compilação: falta de <code>;</code>, chave sem fechar, <code>system</code> minúsculo.'],
  tipos: ['Calcular expressões “de cabeça”: <code>7 / 2</code> = 3, <code>7 % 2</code> = 1, <code>7 / 2.0</code> = 3.5.', 'Escolher o tipo certo: int, double, char, boolean ou String.', 'Saber que String se compara com <code>equals</code>.'],
  entrada: ['Ler dados com Scanner: <code>nextInt</code>, <code>nextDouble</code>, <code>next</code>, <code>nextLine</code>.', 'Explicar e corrigir o problema do <code>nextLine</code> depois de <code>nextInt</code>.', 'Mostrar resultado formatado com <code>printf("%.2f")</code>.'],
  condicionais: ['Dizer qual mensagem é impressa para um valor dado (teste de mesa).', 'Montar condições com <code>&&</code>, <code>||</code> e <code>!</code>.', 'Saber o que acontece quando falta <code>break</code> no switch.'],
  lacos: ['Fazer o <b>teste de mesa</b>: tabela com o valor de cada variável a cada volta.', 'Contar quantas vezes um laço executa.', 'Escolher entre for, while e do-while e justificar.'],
  vetores: ['Percorrer com <code>for (int i = 0; i &lt; v.length; i++)</code>.', 'Achar maior, menor, soma e média; contar ocorrências.', 'Reconhecer o erro de índice (<code>ArrayIndexOutOfBoundsException</code>).'],
  'busca-seq': ['Escrever o método que devolve a posição ou -1.', 'Contar comparações no melhor e no pior caso.', 'Saber que funciona com vetor desordenado.'],
  'busca-bin': ['Simular à mão: anotar <b>início, fim e meio</b> a cada passo (tabela).', 'Saber que exige vetor <b>ordenado</b>.', 'Comparar O(n) com O(log n).'],
  bubble: ['Escrever o vetor <b>após cada passada</b> (a questão mais comum!).', 'Contar comparações e trocas.', 'Explicar a otimização com <code>trocou</code>.'],
  selection: ['Escrever o vetor após cada passada.', 'Diferença para o Bubble: no máximo n−1 trocas.', 'Ordenar Strings com <code>compareTo</code>.'],
  metodos: ['Escrever um método com parâmetros e retorno.', 'Diferença entre método <code>void</code> e com retorno.', 'Chamar o método no main usando o valor devolvido.'],
  parametros: ['Prever a saída de um código que altera parâmetros: int não muda fora, vetor muda.', 'Explicar “passagem por valor” e cópia de referência.'],
  sobrecarga: ['Identificar quais assinaturas são válidas (nome + tipos dos parâmetros).', 'Saber que só mudar o tipo de retorno não é sobrecarga.'],
  recursao: ['Apontar o <b>caso base</b> e o <b>passo recursivo</b>.', 'Simular a pilha de chamadas e dar o resultado (fatorial, fibonacci, soma de dígitos).', 'Explicar o StackOverflowError.'],
  modular: ['Dividir um problema em métodos com nomes claros.', 'Montar menu com do-while + switch chamando métodos.', 'Reaproveitar busca e ordenação como métodos.']
};

// teste rápido: [pergunta, opções, índice da certa, explicação]
const QUIZ = {
  estrutura: [['Qual linha faz o programa começar a executar?', ['public class Main {', 'public static void main(String[] args) {', 'System.out.println();'], 1, 'O Java sempre começa pelo método main com exatamente essa assinatura.'],
    ['O arquivo tem <code>public class Calculo</code>. Qual deve ser o nome do arquivo?', ['Main.java', 'calculo.java', 'Calculo.java'], 2, 'O nome do arquivo é igual ao da classe pública, com maiúsculas e minúsculas: Calculo.java.']],
  tipos: [['Quanto vale <code>17 / 5</code> em Java?', ['3.4', '3', '2'], 1, 'Dois int → divisão inteira: 3,4 vira 3.'],
    ['E <code>17 % 5</code>?', ['2', '3', '0.4'], 0, '% é o resto da divisão: 17 = 5 × 3 + 2.'],
    ['Como comparar se a String <code>s</code> é “sim”?', ['s == "sim"', 's.equals("sim")', 's = "sim"'], 1, 'Strings se comparam pelo conteúdo com equals. O == compara se é o mesmo objeto.']],
  entrada: [['Após <code>int n = sc.nextInt();</code>, o próximo <code>sc.nextLine()</code> devolve…', ['a próxima linha digitada', 'uma String vazia ""', 'um erro'], 1, 'O nextInt deixa o Enter na entrada. O nextLine lê esse “resto de linha”, que está vazio.'],
    ['Qual método lê “Maria Souza” inteiro?', ['next()', 'nextLine()', 'nextString()'], 1, 'next() para no espaço e leria só “Maria”.']],
  condicionais: [['Com <code>x = 15</code>: <code>if (x > 10) A; else if (x > 5) B; else C;</code> imprime…', ['A', 'A e B', 'B'], 0, 'O primeiro bloco verdadeiro executa e os outros são pulados.'],
    ['Num switch sem <code>break</code>, ao entrar no case 2…', ['executa só o case 2', 'executa o case 2 e todos os de baixo', 'dá erro de compilação'], 1, 'Sem break a execução “cai” nos cases seguintes.']],
  lacos: [['Quantas vezes executa <code>for (int i = 0; i &lt; 5; i++)</code>?', ['4', '5', '6'], 1, 'i vale 0, 1, 2, 3 e 4: são 5 voltas.'],
    ['Qual laço executa o bloco pelo menos uma vez?', ['for', 'while', 'do-while'], 2, 'O do-while só testa a condição no final.'],
    ['<code>int s = 0; for (int i = 1; i &lt;= 3; i++) s += i;</code> Quanto vale s?', ['3', '6', '4'], 1, '0 + 1 + 2 + 3 = 6.']],
  vetores: [['<code>int[] v = new int[4];</code> Qual é o último índice válido?', ['4', '3', '5'], 1, 'Os índices vão de 0 até length − 1 = 3.'],
    ['Quanto vale <code>v[2]</code> logo após <code>new int[4]</code>?', ['0', 'null', 'lixo de memória'], 0, 'Vetores de int nascem com zeros.']],
  'busca-seq': [['No pior caso, quantas comparações faz em 1.000 elementos?', ['10', '500', '1.000'], 2, 'Pior caso: o valor está no fim ou não existe → n comparações.'],
    ['O que o método devolve quando não acha?', ['0', '-1', 'null'], 1, 'Por convenção, -1, já que 0 é uma posição válida.']],
  'busca-bin': [['Pré-requisito da busca binária:', ['vetor sem repetidos', 'vetor ordenado', 'vetor com tamanho par'], 1, 'Sem ordenação não dá para saber de que lado o valor está.'],
    ['Com início = 0 e fim = 9, quanto vale meio?', ['4', '5', '4.5'], 0, '(0 + 9) / 2 = 4, porque a divisão é inteira.'],
    ['No máximo, quantos passos para 1.000 elementos?', ['10', '100', '500'], 0, '2¹⁰ = 1.024, então cerca de 10 passos.']],
  bubble: [['Após a 1ª passada do Bubble em [4, 1, 3, 2], o vetor fica…', ['[1, 3, 2, 4]', '[1, 2, 3, 4]', '[1, 4, 3, 2]'], 0, 'Troca 4↔1, 4↔3, 4↔2: o 4 “borbulha” para o fim.'],
    ['Qual é o custo no pior caso?', ['O(n)', 'O(log n)', 'O(n²)'], 2, 'Dois laços aninhados sobre o vetor.']],
  selection: [['Após a 1ª passada do Selection em [4, 1, 3, 2], o vetor fica…', ['[1, 4, 3, 2]', '[1, 3, 2, 4]', '[1, 2, 3, 4]'], 0, 'Acha o menor (1) e troca com a posição 0.'],
    ['Quantas trocas, no máximo, em um vetor de 10 elementos?', ['9', '45', '100'], 0, 'No máximo uma troca por passada: n − 1 = 9.']],
  metodos: [['Um método que só imprime e não devolve nada tem retorno…', ['int', 'void', 'null'], 1, 'void significa “não devolve valor”.'],
    ['O que acontece com o código depois de um <code>return</code>?', ['executa normalmente', 'não executa: o método termina ali', 'executa só se for void'], 1, 'O return encerra o método na hora.']],
  parametros: [['<code>void f(int x) { x = 99; }</code> Com <code>int a = 1; f(a);</code>, a vale…', ['1', '99', '0'], 0, 'x é uma cópia de a. Alterar x não muda a.'],
    ['<code>void g(int[] v) { v[0] = 99; }</code> Com <code>int[] a = {1}; g(a);</code>, a[0] vale…', ['1', '99', 'erro'], 1, 'v e a apontam para o mesmo vetor.']],
  sobrecarga: [['Qual par NÃO é sobrecarga válida?', ['int soma(int a) e int soma(int a, int b)', 'int soma(int a) e double soma(int a)', 'int soma(int a) e double soma(double a)'], 1, 'Mesma lista de parâmetros e só o retorno diferente → erro de compilação.']],
  recursao: [['Para que serve o caso base?', ['deixar o código mais rápido', 'parar a recursão', 'chamar outro método'], 1, 'Sem ele as chamadas nunca param → StackOverflowError.'],
    ['Quanto devolve <code>f(3)</code>, se <code>f(n) = n == 0 ? 0 : n + f(n - 1)</code>?', ['3', '6', '0'], 1, '3 + 2 + 1 + 0 = 6.']],
  modular: [['Num programa bem modularizado, o main deve…', ['ter toda a lógica', 'só organizar as chamadas', 'ficar vazio'], 1, 'Cada tarefa fica num método e o main coordena.']]
};

// roteiro para resolver qualquer exercício
let METODO = `<div class="method">
  <div class="method-h"><b>Antes de programar, siga estes 4 passos</b><button class="btn" data-method>Ver exemplo</button></div>
  <ol class="steps"><li><b>Entenda</b> a entrada e a saída. Olhe o exemplo de execução do exercício.</li><li><b>Resolva à mão</b> com os números do exemplo, no papel.</li><li><b>Escreva em português</b> os passos que você fez (o algoritmo).</li><li><b>Traduza para Java</b>, execute com o exemplo e compare a saída.</li></ol>
  <div class="method-ex"><div>
    <p><b>Exercício:</b> “Leia 3 números e mostre o maior.”</p>
    <p><b>1. Entenda:</b> entrada <code>4 9 2</code> → saída <code>Maior: 9</code>.</p>
    <p><b>2. À mão:</b> o maior até agora é 4. O 9 é maior? Sim → maior = 9. O 2 é maior? Não. Resposta: 9.</p>
    <p><b>3. Em português:</b> leia a, b, c → maior = a → se b &gt; maior, maior = b → se c &gt; maior, maior = c → mostre maior.</p>
    <p><b>4. Em Java:</b></p>
    <pre class="mini">int maior = a;
if (b > maior) maior = b;
if (c > maior) maior = c;
System.out.println("Maior: " + maior);</pre>
    <p>Repare que o passo 3 virou o código linha por linha. Quem pula os passos 2 e 3 costuma travar na prova.</p>
  </div></div>
</div>`;

