/*
 * Programming Lab II — summary of the 3 units for the exam (English). Overrides the Portuguese data and renderer in js/resumo.js
 */
RESUMO.splice(0, RESUMO.length,
{ u: 1, id: 'r-u1', title: 'Unit 1 · Fundamentals', blocks: [
  ['Program skeleton', `${C(`
public class Main {                       // name = file name (Main.java)
    public static void main(String[] args) {
        System.out.println("Hello");      // writes and moves to a new line
    }
}`)}<ul><li><code>print</code> does not break the line · <code>println</code> does · <code>printf</code> formats.</li><li>Every statement ends with <code>;</code> and every block opens <code>{</code> and closes <code>}</code>.</li></ul>`],
  ['Types and variables', `<div class="tbl-wrap"><table><tr><th>type</th><th>holds</th><th>example</th></tr>
<tr><td><code>int</code></td><td>integer</td><td><code>int n = 10;</code></td></tr>
<tr><td><code>double</code></td><td>decimal</td><td><code>double m = 7.5;</code></td></tr>
<tr><td><code>char</code></td><td>1 character (single quotes)</td><td><code>char c = 'A';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean ok = true;</code></td></tr>
<tr><td><code>String</code></td><td>text (double quotes)</td><td><code>String s = "Ana";</code></td></tr></table></div>
${KEY('<b>Cast:</b> <code>(int) 7.9</code> = 7 (cuts, does not round) · <code>(double) 7 / 2</code> = 3.5')}`],
  ['Operators — the division trap', `<div class="calc">
<div><code>7 / 2</code><b>3</b><small>int / int = integer division</small></div>
<div><code>7 % 2</code><b>1</b><small>remainder of the division</small></div>
<div><code>7 / 2.0</code><b>3.5</b><small>one side double → real</small></div>
<div><code>10 % 3</code><b>1</b><small>10 = 3×3 + 1</small></div></div>
<ul><li>Logical: <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT). Comparison: <code>== != &lt; &gt; &lt;= &gt;=</code>.</li>
<li><code>x++</code> adds 1 · <code>x += 5</code> is the same as <code>x = x + 5</code>.</li>
<li>Even: <code>n % 2 == 0</code> · Divisible by 3: <code>n % 3 == 0</code> · Last digit: <code>n % 10</code> · Drop the last digit: <code>n / 10</code>.</li></ul>`],
  ['String (text)', `<div class="tbl-wrap"><table><tr><th>method</th><th>does</th><th>"java"</th></tr>
<tr><td><code>s.length()</code></td><td>size</td><td>4</td></tr>
<tr><td><code>s.charAt(i)</code></td><td>character at position i</td><td><code>charAt(0)</code> → 'j'</td></tr>
<tr><td><code>s.substring(a, b)</code></td><td>piece from a to b−1</td><td><code>substring(1,3)</code> → "av"</td></tr>
<tr><td><code>s.equals(t)</code></td><td>compares content</td><td><b>never use ==</b></td></tr>
<tr><td><code>s.toUpperCase()</code></td><td>uppercase</td><td>"JAVA"</td></tr>
<tr><td><code>a.compareTo(b)</code></td><td>&lt;0 if a comes first</td><td>alphabetical order</td></tr></table></div>`],
  ['Input (Scanner) and formatted output', `${C(`
import java.util.Scanner;                // outside the class, at the top
Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
double grade = sc.nextDouble();
String word = sc.next();                 // up to the space
sc.nextLine();                           // ⚠ clears the Enter left over from nextInt
String name = sc.nextLine();             // whole line
System.out.printf("Average: %.2f%n", grade);  // %d int · %.2f double · %s String · %n new line`)}
${KEY('<b>Trap:</b> after <code>nextInt()</code>/<code>nextDouble()</code>, a <code>nextLine()</code> returns "" (empty). Put an extra <code>sc.nextLine();</code> before it.')}`],
  ['Decisions: if / else / switch', `<div class="duo">${C(`
if (grade >= 7) {
    System.out.println("Passed");
} else if (grade >= 4) {
    System.out.println("Final");
} else {
    System.out.println("Failed");
}`)}${C(`
switch (op) {
    case 1: System.out.println("One"); break;
    case 2: System.out.println("Two"); break;
    default: System.out.println("Other");
}
// without break → runs the cases below too`)}</div>
<ul><li>Only the <b>first</b> true block runs.</li><li>Ternary: <code>String r = (n &gt;= 7) ? "ok" : "no";</code></li></ul>`],
  ['Repetition: for / while / do-while', `<div class="trio">
<div><b>for</b><small>you know how many times</small>${C(`for (int i = 1; i <= 5; i++) {\n    System.out.print(i + " ");\n} // 1 2 3 4 5`)}</div>
<div><b>while</b><small>repeats while true</small>${C(`while (n > 0) {\n    n = n / 10;\n    count++;\n}`)}</div>
<div><b>do-while</b><small>runs at least once</small>${C(`do {\n    op = sc.nextInt();\n} while (op != 0);`)}</div></div>
<ul><li><code>break</code> leaves the loop · <code>continue</code> jumps to the next lap.</li><li><b>Counter:</b> <code>count++</code> · <b>Accumulator:</b> <code>sum += x</code> (start at 0) · <b>Product:</b> start at 1.</li>
<li><b>Desk check:</b> make a table with one column per variable and one row per lap.</li></ul>`],
  ['Arrays and matrices', `${C(`
int[] v = new int[5];            // 5 zeros, indexes 0 to 4
int[] w = {7, 9, 5, 10, 8};      // already with values
v.length                          // 5 (no parentheses!)
for (int i = 0; i < v.length; i++) { ... }   // < and not <=
for (int x : w) { ... }           // for-each: read only

int[][] m = new int[3][4];       // 3 rows, 4 columns
m.length → 3 rows · m[0].length → 4 columns · m[i][j]`)}
${KEY('<b>Classic mistake:</b> <code>v[v.length]</code> → <code>ArrayIndexOutOfBoundsException</code>. The last index is <code>length − 1</code>.')}`],
  ['Templates that always show up (memorize)', `<div class="duo">${C(`
// sum and average
int sum = 0;
for (int i = 0; i < v.length; i++) sum += v[i];
double average = (double) sum / v.length;

// max and min (start with v[0]!)
int max = v[0], min = v[0];
for (int i = 1; i < v.length; i++) {
    if (v[i] > max) max = v[i];
    if (v[i] < min) min = v[i];
}`)}${C(`
// count how many satisfy
int count = 0;
for (int x : v) if (x % 2 == 0) count++;

// swap two positions
int temp = v[i];
v[i] = v[j];
v[j] = temp;

// prime
boolean prime = n > 1;
for (int d = 2; d * d <= n; d++)
    if (n % d == 0) prime = false;`)}</div>`]
]},
{ u: 2, id: 'r-u2', title: 'Unit 2 · Searching and Sorting', blocks: [
  ['Sequential search — O(n)', `${C(`
static int seqSearch(int[] v, int x) {
    for (int i = 0; i < v.length; i++)
        if (v[i] == x) return i;   // found: return the position
    return -1;                     // not found
}`)}<ul><li>Works with an <b>unsorted</b> array.</li><li>Best case: 1 comparison · Worst case: <b>n</b> (at the end or not there).</li></ul>`],
  ['Binary search — O(log n)', `${C(`
static int binSearch(int[] v, int x) {
    int start = 0, end = v.length - 1;
    while (start <= end) {
        int mid = (start + end) / 2;
        if (v[mid] == x) return mid;
        else if (x < v[mid]) end = mid - 1;     // go left
        else start = mid + 1;                    // go right
    }
    return -1;
}`)}
${KEY('<b>Requires a SORTED array.</b> Each step discards half: 1,000 elements → ~10 steps; 1 million → ~20.')}
<p class="rs-h">How to simulate (v = {2, 5, 8, 12, 16, 23, 38, 45}, looking for 23):</p>
<div class="tbl-wrap"><table><tr><th>step</th><th>start</th><th>end</th><th>mid</th><th>v[mid]</th><th>decision</th></tr>
<tr><td>1</td><td>0</td><td>7</td><td>3</td><td>12</td><td>23 &gt; 12 → start = 4</td></tr>
<tr><td>2</td><td>4</td><td>7</td><td>5</td><td>23</td><td>found → returns 5</td></tr></table></div>`],
  ['Bubble Sort — O(n²)', `${C(`
for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - 1 - i; j++)
        if (v[j] > v[j + 1]) {              // neighbors out of order
            int t = v[j]; v[j] = v[j + 1]; v[j + 1] = t;
        }`)}
<p class="rs-h">Simulation of {5, 1, 4, 2, 8} (the largest “rises” to the end):</p>
<div class="sim"><span>start</span><code>5 1 4 2 8</code><span>pass 1</span><code>1 4 2 5 <b>8</b></code><span>pass 2</span><code>1 2 4 <b>5 8</b></code><span>pass 3</span><code>1 2 <b>4 5 8</b></code> <small>(no swaps → can stop)</small></div>
<ul><li>Compares <b>neighbors</b> and swaps. Optimization: a <code>swapped</code> variable; if a pass swaps nothing, it is already sorted.</li></ul>`],
  ['Selection Sort — O(n²)', `${C(`
for (int i = 0; i < n - 1; i++) {
    int smallest = i;
    for (int j = i + 1; j < n; j++)
        if (v[j] < v[smallest]) smallest = j;      // finds the smallest of the rest
    int t = v[i]; v[i] = v[smallest]; v[smallest] = t;   // puts it at position i
}`)}
<p class="rs-h">Simulation of {29, 10, 14, 37, 13} (the smallest goes to the front):</p>
<div class="sim"><span>start</span><code>29 10 14 37 13</code><span>i = 0</span><code><b>10</b> 29 14 37 13</code><span>i = 1</span><code><b>10 13</b> 14 37 29</code><span>i = 2</span><code><b>10 13 14</b> 37 29</code><span>i = 3</span><code><b>10 13 14 29</b> 37</code></div>
<ul><li>At most <b>n − 1 swaps</b> (one per pass). Always makes all the comparisons.</li></ul>`],
  ['Comparison (shows up in theory questions)', `<div class="tbl-wrap"><table><tr><th>algorithm</th><th>idea</th><th>cost</th><th>note</th></tr>
<tr><td>Sequential search</td><td>looks one by one</td><td>O(n)</td><td>array can be unsorted</td></tr>
<tr><td>Binary search</td><td>looks at the middle, discards half</td><td>O(log n)</td><td>must be sorted</td></tr>
<tr><td>Bubble</td><td>swaps neighbors</td><td>O(n²)</td><td>many swaps; stops early if sorted</td></tr>
<tr><td>Selection</td><td>finds the smallest and puts it in front</td><td>O(n²)</td><td>at most n−1 swaps</td></tr>
<tr><td>Insertion</td><td>inserts each into the already sorted part</td><td>O(n²)</td><td>fast on a nearly sorted array</td></tr></table></div>
${KEY('Sorting Strings: replace <code>v[j] &gt; v[j+1]</code> with <code>v[j].compareTo(v[j+1]) &gt; 0</code>.')}`]
]},
{ u: 3, id: 'r-u3', title: 'Unit 3 · Modularization', blocks: [
  ['Anatomy of a method', `${C(`
//  modifier   return   name      parameters
    static     double   average   (double a, double b) {
        return (a + b) / 2;      // returns the value and ENDS the method
    }

    static void line(int n) {    // void = returns nothing
        for (int i = 0; i < n; i++) System.out.print("-");
        System.out.println();
    }

// calling it in main:
double m = average(7, 9);  // m = 8.0  (uses the returned value)
line(10);                  // only runs`)}
<ul><li>The <code>return</code> type must match the declared return type.</li><li>Variables created inside the method only exist in there (<b>local scope</b>).</li></ul>`],
  ['Parameter passing', `<div class="duo">${C(`
static void change(int x) { x = 99; }
int a = 1;
change(a);
// a is still 1 → int is passed as a COPY OF THE VALUE`)}${C(`
static void change(int[] v) { v[0] = 99; }
int[] a = {1, 2};
change(a);
// a[0] is now 99 → an array passes a COPY OF THE ADDRESS`)}</div>
${KEY('That is why sorting methods are <code>void</code>: they change the very array they receive.')}`],
  ['Overloading', `${C(`
static int add(int a, int b)          { return a + b; }
static int add(int a, int b, int c)   { return a + b + c; }   // ✓ different number of parameters
static double add(double a, double b) { return a + b; }       // ✓ different types
// static double add(int a, int b)  ✗ ERROR: only the return changes`)}
<ul><li>Same name, <b>different parameter list</b> (count or types). Java chooses by the call.</li></ul>`],
  ['Recursion', `<div class="duo">${C(`
static int fact(int n) {
    if (n <= 1) return 1;          // BASE CASE (stops)
    return n * fact(n - 1);        // STEP (smaller problem)
}
// fact(4) = 4*fact(3) = 4*3*fact(2) = 4*3*2*fact(1) = 24`)}${C(`
static int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}   // 0 1 1 2 3 5 8 13 ...

static int pow(int b, int e) {
    if (e == 0) return 1;
    return b * pow(b, e - 1);
}`)}</div>
${KEY('No base case → calls forever → <code>StackOverflowError</code>. On the exam, write the “ladder” of calls and then come back multiplying/adding.')}`],
  ['Modularized program (menu)', `${C(`
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] v = new int[0];
    int op;
    do {
        System.out.println("1-Read 2-Show 3-Sort 0-Exit");
        op = sc.nextInt();
        switch (op) {
            case 1: v = read(sc); break;
            case 2: show(v); break;
            case 3: sort(v); break;
        }
    } while (op != 0);
}`)}<ul><li><code>main</code> only organizes; each task becomes a method named with a verb (<code>read</code>, <code>show</code>, <code>sort</code>).</li></ul>`]
] }
);
ERROS_PROVA.splice(0, ERROS_PROVA.length,
  ['<code>=</code> instead of <code>==</code> inside the if', '<code>=</code> assigns, <code>==</code> compares.'],
  ['<code>i &lt;= v.length</code> in the for', 'Overflows the index. Use <code>i &lt; v.length</code>.'],
  ['Comparing a String with <code>==</code>', 'Use <code>s.equals("x")</code>.'],
  ['<code>sum / n</code> with two ints', 'Gives integer division. Use <code>(double) sum / n</code>.'],
  ['Forgetting <code>break</code> in a switch', 'It runs the cases below too.'],
  ['Max/min starting at 0', 'Start with <code>v[0]</code>; with negatives, 0 gives the wrong answer.'],
  ['Binary search on an unsorted array', 'Sort first.'],
  ['Recursion without a base case', 'StackOverflowError.'],
  ['<code>nextLine()</code> right after <code>nextInt()</code>', 'Reads empty. Put an extra <code>sc.nextLine();</code>.'],
  ['A method with a return type but no <code>return</code>', 'Compilation error: every path must return a value.']
);
FLASH.splice(0, FLASH.length,
  ['What is 17 / 5 and 17 % 5?', '3 and 2'], ['Last index of new int[8]?', '7'], ['Which search requires a sorted array?', 'Binary search'],
  ['Cost of Bubble and Selection?', 'O(n²)'], ['Cost of binary search?', 'O(log n)'], ['What does a search return if it does not find it?', '-1'],
  ['Selection on [4, 1, 3, 2] after the 1st pass?', '[1, 4, 3, 2]'], ['Bubble on [4, 1, 3, 2] after the 1st pass?', '[1, 3, 2, 4]'],
  ['An int passed to a method and changed in there changes outside?', 'No (copy of the value)'], ['And an array?', 'Yes (copy of the address)'],
  ['fact(5) = ?', '120'], ['What makes two overloads valid?', 'Different parameters (count or types)'],
  ['mid with start = 0 and end = 9?', '4'], ['A do-while runs at least how many times?', '1'], ['(int) 9.99 = ?', '9'], ['"java".charAt(1)?', "'a'"]
);
renderResumo = function renderResumo() {
  let h = `<div class="crumb">Night-before review</div><h1>Summary of the 3 units</h1>
  <p class="lead">Everything that shows up on the exam on one page: rules, template code to memorize, how to simulate searches and sorts by hand, the classic mistakes and quick review cards.</p>
  <div class="rs-plan"><b>If you only have a few hours</b><ol><li><b>40 min</b> — Unit 1: read the templates and write each one once on paper.</li><li><b>40 min</b> — Unit 2: copy the 4 functions and simulate Bubble and Selection by hand.</li><li><b>30 min</b> — Unit 3: methods, parameters and recursion (do the factorial ladder).</li><li><b>15 min</b> — Classic mistakes + review cards.</li></ol></div>
  <nav class="rs-nav">${RESUMO.map(U => `<button data-jump="${U.id}" style="--c:${UNITS[U.u].color}">${U.title.split(' · ')[0]}<small>${U.title.split(' · ')[1]}</small></button>`).join('')}<button data-jump="r-erros" style="--c:var(--o-err)">Classic<small>mistakes</small></button><button data-jump="r-flash" style="--c:var(--acc)">Cards<small>review</small></button></nav>`;
  for (const U of RESUMO) {
    h += `<section class="rs-unit" id="${U.id}"><h2 style="--c:${UNITS[U.u].color}"><span class="rs-dot"></span>${U.title}</h2>`;
    U.blocks.forEach(([t, body], k) => { h += `<details class="rs-card" ${k < 99 ? 'open' : ''}><summary>${t}</summary><div class="rs-body">${body}</div></details>`; });
    h += `</section>`;
  }
  h += `<section class="rs-unit" id="r-erros"><h2 style="--c:var(--o-err)"><span class="rs-dot"></span>Classic exam mistakes</h2><div class="errs">${ERROS_PROVA.map(([a, b]) => `<div class="errc"><b>✕ ${a}</b><span>✓ ${b}</span></div>`).join('')}</div></section>`;
  h += `<section class="rs-unit" id="r-flash"><h2 style="--c:var(--acc)"><span class="rs-dot"></span>Quick review cards</h2><p style="color:var(--fg2)">Think of the answer and tap the card to check.</p><div class="flash">${FLASH.map(([q, a]) => `<button class="fc"><span class="fq">${q}</span><span class="fa2">${a}</span></button>`).join('')}</div></section>`;
  h += `<div class="rs-end"><b>Good luck on the exam! 🍀</b><span>On the day: read the statement twice, note the input and output, do the desk check and only then write the code.</span></div>`;
  return h;
};
