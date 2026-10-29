/*
 * Programming Lab II — Java study platform (English)
 * Content: lessons, exercises, projects, plan, run examples, exam summaries and quizzes. Overlays the Portuguese data.
 */
(() => {
const UNITS_EN = {
  1:{name:'Java Fundamentals',color:'var(--u1)',soft:'var(--u1s)'},
  2:{name:'Searching and Sorting',color:'var(--u2)',soft:'var(--u2s)'},
  3:{name:'Modularization',color:'var(--u3)',soft:'var(--u3s)'}
};
const J = s => s.replace(/^\n/,'');   // code helper

const LESSONS_EN = [
/* ---------- UNIT 1 ---------- */
{id:'estrutura',unit:1,title:'Structure of a program',
lead:'Every Java program starts with a class and a main method. Understanding this skeleton is the first step.',
body:`
<div class="note"><b>Think of it this way</b><span>the <b>class</b> is the folder that holds everything, and <b>main</b> is the first page Java opens. It reads that page from top to bottom, one instruction at a time.</span></div>
<h2>The skeleton</h2>
<p>In Java, all code lives inside a <b>class</b>, and the program starts at the <code>main</code> method.</p>
{{fig:estrutura}}
{{code:ola}}
{{viz:anatomia}}
<div class="note tip"><b>Tip</b><span>Java is case-sensitive: <code>System</code> ≠ <code>system</code>. This is the most common compilation error at the beginning.</span></div>
<h2>Comments</h2>
<p><code>// single line</code> and <code>/* several lines */</code>. Comment the <i>why</i>, not the obvious.</p>`,
codes:{ola:J(`
public class Main {
    public static void main(String[] args) {
        // My first program
        System.out.println("Hello, Lab II!");
        System.out.print("No line break... ");
        System.out.println("now it does.");
        System.out.printf("Grade: %.1f%n", 9.5);
    }
}`)},
ex:[
 {t:'Business card',l:'f',d:'Print your name, course and term on three lines, then a line with 20 dashes (---).',h:'Three println calls and a fourth with the string "--------------------". Or use a for loop for the dashes.',s:J(`
public class Main {
    public static void main(String[] args) {
        // print name, course and term

    }
}`)}
]},

{id:'tipos',unit:1,title:'Variables, types and operators',
lead:'Java is strongly typed: every variable has a fixed type. This changes how math works — especially division.',
body:`
<div class="note"><b>Think of it this way</b><span>a variable is a <b>labeled box</b>. The label is the name (<code>age</code>) and the type is the shape of the box: an <code>int</code> box only holds whole numbers. If you try to put 7.9 in it, the decimal part is left out.</span></div>
{{fig:caixas}}
<h2>Primitive types you will use</h2>
<div class="tbl-wrap"><table><tr><th>Type</th><th>Holds</th><th>Example</th></tr>
<tr><td><code>int</code></td><td>integers (±2.1 billion)</td><td><code>int age = 19;</code></td></tr>
<tr><td><code>long</code></td><td>large integers</td><td><code>long id = 12345678900L;</code></td></tr>
<tr><td><code>double</code></td><td>decimals</td><td><code>double average = 7.5;</code></td></tr>
<tr><td><code>char</code></td><td>one character</td><td><code>char op = '+';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean ok = true;</code></td></tr>
<tr><td><code>String</code></td><td>text (a class, not a primitive)</td><td><code>String name = "Ana";</code></td></tr>
</table></div>
<h2>Operators</h2>
<p>Arithmetic <code>+ - * / %</code>, relational <code>== != &lt; &gt; &lt;= &gt;=</code>, logical <code>&amp;&amp; || !</code>, and shortcuts <code>++ -- += -=</code>.</p>
{{code:ops}}
{{viz:divisao}}
<div class="note warn"><b>Careful</b><span><code>7 / 2</code> gives <b>3</b>, not 3.5 — division between integers discards the decimal part. Use <code>7 / 2.0</code> or <code>(double) a / b</code>.</span></div>
<div class="note warn"><b>Strings</b><span>Compare texts with <code>a.equals(b)</code>, never with <code>==</code>.</span></div>`,
codes:{ops:J(`
public class Main {
    public static void main(String[] args) {
        int a = 7, b = 2;
        System.out.println("a / b = " + (a / b));            // 3
        System.out.println("a % b = " + (a % b));            // 1
        System.out.println("real  = " + ((double) a / b));   // 3.5

        int counter = 0;
        counter++;
        counter += 10;
        System.out.println("counter = " + counter);

        boolean passed = (a >= 6) && (b < 5);
        System.out.println("passed? " + passed);
    }
}`)},
ex:[
 {t:'Weighted average',l:'f',d:'Read two grades (weights 2 and 3) and show the average with 2 decimal places.',h:'average = (g1*2 + g2*3) / 5.0 — the 5.0 forces real division. Use printf("%.2f").',in:'7\n8.5',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double g1 = sc.nextDouble();
        double g2 = sc.nextDouble();
        // compute the weighted average (weights 2 and 3)

    }
}`)},
 {t:'Seconds converter',l:'m',d:'Read a total number of seconds and show it in hours:minutes:seconds format. E.g.: 3725 → 1h 2min 5s.',h:'hours = total / 3600; rest = total % 3600; minutes = rest / 60; seconds = rest % 60.',in:'3725',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();

    }
}`)}
]},

{id:'entrada',unit:1,title:'Input with Scanner',
lead:'Useful programs talk to the user. The Scanner class reads what is typed on the keyboard.',
body:`
<h2>How to use it</h2>
{{fig:scanfluxo}}
<p>Import <code>java.util.Scanner</code>, create an object tied to <code>System.in</code> and call the method for the type you want to read.</p>
<div class="tbl-wrap"><table><tr><th>Method</th><th>Reads</th></tr>
<tr><td><code>nextInt()</code></td><td>an int</td></tr><tr><td><code>nextDouble()</code></td><td>a double</td></tr>
<tr><td><code>next()</code></td><td>one word</td></tr><tr><td><code>nextLine()</code></td><td>the whole line</td></tr></table></div>
{{code:scan}}
{{viz:scanner}}
<div class="note"><b>In this editor</b><span>Put the values in the <b>Input</b> tab (one per line) before running. The program reads from there.</span></div>
<div class="note warn"><b>Trap</b><span>After <code>nextInt()</code>, a <code>nextLine()</code> returns the rest of the line (empty). Call an extra <code>sc.nextLine();</code> to “clear” it.</span></div>`,
codes:{scan:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Name: ");
        String name = sc.nextLine();
        System.out.print("Age: ");
        int age = sc.nextInt();
        System.out.println();
        System.out.println("Hello, " + name + "! In 5 years you will be " + (age + 5) + ".");
    }
}`)},
codeIn:{scan:'Maria Souza\n20'},
ex:[
 {t:'BMI',l:'f',d:'Read weight (kg) and height (m), compute BMI = weight / height² and show it with 1 decimal place.',h:'bmi = weight / (height * height). printf("BMI: %.1f%n", bmi).',in:'70\n1.75',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

    }
}`)}
]},

{id:'condicionais',unit:1,title:'Decisions: if, else and switch',
lead:'Conditionals make the program choose different paths depending on the data.',
body:`
<div class="note"><b>Think of it this way</b><span>it is like a <b>road sign with several exits</b>. The car takes the first exit whose condition matches and ignores the others. The <code>else</code> is the “keep going straight” when none fit.</span></div>
<h2>if / else if / else</h2>
{{fig:iffluxo}}
<p>The condition in parentheses must result in a <code>boolean</code>. The first true block runs and the others are ignored.</p>
{{code:ifelse}}
{{viz:ifnota}}
<h2>switch</h2>
<p>Good when you compare <b>one</b> variable against several fixed values. Do not forget the <code>break</code> — without it, execution “falls through” into the next case.</p>
{{code:sw}}
<div class="note tip"><b>Ternary</b><span><code>String s = (grade &gt;= 6) ? "Passed" : "Failed";</code> — an if/else on one line.</span></div>`,
codes:{ifelse:J(`
public class Main {
    public static void main(String[] args) {
        double grade = 7.8;
        if (grade >= 9) {
            System.out.println("Grade A");
        } else if (grade >= 7) {
            System.out.println("Grade B");
        } else if (grade >= 6) {
            System.out.println("Grade C");
        } else {
            System.out.println("Failed");
        }
    }
}`),sw:J(`
public class Main {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1: System.out.println("Sunday"); break;
            case 2: System.out.println("Monday"); break;
            case 3: System.out.println("Tuesday"); break;
            default: System.out.println("Another day");
        }
    }
}`)},
ex:[
 {t:'Calculator',l:'f',d:'Read two numbers and an operator (+ - * /) and show the result. Handle division by zero.',h:'Read the operator with sc.next() and use switch(op) with case "+": ... Before dividing, test if (b == 0).',in:'10\n4\n/',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        String op = sc.next();

    }
}`)},
 {t:'Leap year',l:'m',d:'Read a year and say whether it is a leap year: divisible by 4 and not by 100, or divisible by 400.',h:'(year % 4 == 0 && year % 100 != 0) || year % 400 == 0',in:'2024',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int year = sc.nextInt();

    }
}`)}
]},

{id:'lacos',unit:1,title:'Repetition: for, while, do-while',
lead:'Loops repeat a block while a condition is true. They are the engine of almost every algorithm.',
body:`
<div class="note"><b>Think of it this way</b><span>a loop is <b>running laps on a track</b>. Before each lap you check the condition (“do I still have fuel?”). On the exam, the <b>desk check</b> is writing down in a table the value of each variable at every lap, just like the table in the animation below.</span></div>
<h2>Which one to use?</h2>
<div class="tbl-wrap"><table><tr><th>Loop</th><th>When</th></tr>
<tr><td><code>for</code></td><td>you know how many times it will repeat</td></tr>
<tr><td><code>while</code></td><td>repeats until something happens (may not even run)</td></tr>
<tr><td><code>do-while</code></td><td>runs at least once (menus, validation)</td></tr></table></div>
{{fig:forfluxo}}
{{viz:forpasso}}
<h2>The three loops in code</h2>
{{code:loops}}
<div class="note warn"><b>Infinite loop</b><span>If the condition never becomes false, the program hangs. Here the editor stops it after 5 seconds.</span></div>
<p><code>break</code> leaves the loop; <code>continue</code> jumps to the next lap.</p>`,
codes:{loops:J(`
public class Main {
    public static void main(String[] args) {
        // for: the 7 times table
        for (int i = 1; i <= 10; i++) {
            System.out.println("7 x " + i + " = " + (7 * i));
        }

        // while: how many digits a number has
        int n = 98765, digits = 0;
        while (n > 0) {
            n = n / 10;
            digits++;
        }
        System.out.println("Digits: " + digits);

        // do-while: runs at least once
        int x = 100;
        do {
            System.out.println("x = " + x);
            x++;
        } while (x < 100);
    }
}`)},
ex:[
 {t:'Sum until zero',l:'f',d:'Read numbers until the user types 0. Show the sum and how many numbers were read.',h:'while (true) { int v = sc.nextInt(); if (v == 0) break; sum += v; count++; }',in:'5\n3\n12\n0',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int sum = 0, count = 0;

    }
}`)},
 {t:'Prime number',l:'m',d:'Read N and say whether it is prime. Then print all primes from 2 up to N.',h:'A number is prime if no divisor from 2 to √n divides it. Use i * i <= n as the condition.',in:'30',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

    }
}`)},
 {t:'Asterisk pyramid',l:'m',d:'Read the height and draw a centered pyramid with *.',h:'Two inner for loops: one for the spaces (height - row) and another for the asterisks (2*row - 1).',in:'4',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int h = sc.nextInt();

    }
}`)}
]},

{id:'vetores',unit:1,title:'Arrays',
lead:'An array holds several values of the same type in positions numbered from 0. It is the basis of Unit 2.',
body:`
<div class="note"><b>Think of it this way</b><span>an array is a <b>cabinet of numbered drawers</b>. They all hold the same kind of thing, and the numbering starts at <b>0</b>. To open a drawer, use <code>v[number]</code>.</span></div>
{{viz:vetor}}
<h2>Creating and traversing</h2>
{{code:arr}}
<ul>
<li>Indexes go from <code>0</code> to <code>length - 1</code>.</li>
<li>The size is fixed once created: <code>new int[5]</code> is born with five zeros.</li>
<li><code>for-each</code> (<code>for (int x : v)</code>) reads everything, but does not give you the index.</li>
</ul>
<div class="note warn"><b>Classic mistake</b><span><code>v[v.length]</code> throws <code>ArrayIndexOutOfBoundsException</code>. Use <code>i &lt; v.length</code>, not <code>&lt;=</code>.</span></div>
<h2>Matrix (2D array)</h2>
{{code:mat}}`,
codes:{arr:J(`
public class Main {
    public static void main(String[] args) {
        int[] grades = {7, 9, 5, 10, 8};
        int sum = 0, max = grades[0];

        for (int i = 0; i < grades.length; i++) {
            sum += grades[i];
            if (grades[i] > max) max = grades[i];
        }
        System.out.println("Average: " + (double) sum / grades.length);
        System.out.println("Max: " + max);

        for (int n : grades) System.out.print(n + " ");
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
 {t:'Array statistics',l:'f',d:'Read 5 integers into an array and show the sum, average, maximum and minimum.',h:'Initialize max and min with v[0], not with 0.',in:'4\n8\n15\n16\n23',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] v = new int[5];

    }
}`)},
 {t:'Reverse an array',l:'m',d:'Reverse an array in place (without creating another one) and print it.',h:'Swap v[i] with v[v.length-1-i] up to the middle of the array. Use a temporary variable.',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] v = {1, 2, 3, 4, 5, 6};

        System.out.println(Arrays.toString(v));
    }
}`)},
 {t:'Palindrome',l:'m',d:'Read a word and say whether it reads the same backwards (e.g.: "level").',h:'Compare s.charAt(i) with s.charAt(s.length()-1-i) in a for loop up to the middle.',in:'level',s:J(`
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next().toLowerCase();

    }
}`)}
]},

/* ---------- UNIT 2 ---------- */
{id:'busca-seq',unit:2,title:'Sequential search',
lead:'The simplest way to find something: look position by position until you find it. It works on any array, sorted or not.',
body:`
<div class="note"><b>Think of it this way</b><span>it is like looking for a name on an <b>unordered attendance list</b>: there is no shortcut, you read one by one until you find it or the list ends.</span></div>
<h2>The idea</h2>
<p>Walk through the array from start to end. If <code>v[i]</code> is the value you are looking for, return <code>i</code>. If you reach the end without finding it, return <code>-1</code> (the convention for “not found”).</p>
{{code:seq}}
{{viz:buscaseq}}
<h2>Cost</h2>
<div class="tbl-wrap"><table><tr><th>Case</th><th>Comparisons</th><th>When</th></tr>
<tr><td>Best</td><td>1</td><td>it is in the first position</td></tr>
<tr><td>Worst</td><td>n</td><td>it is at the end or does not exist</td></tr>
<tr><td>Average</td><td>≈ n/2</td><td>—</td></tr></table></div>
<p>We say it is <b>O(n)</b>: doubling the array doubles the time.</p>`,
codes:{seq:J(`
public class Main {
    static int sequentialSearch(int[] v, int target) {
        for (int i = 0; i < v.length; i++) {
            if (v[i] == target) return i;   // found: return the position
        }
        return -1;                          // not found
    }

    public static void main(String[] args) {
        int[] v = {42, 7, 19, 3, 88, 25};
        System.out.println("19 is at position " + sequentialSearch(v, 19));
        System.out.println("50 is at position " + sequentialSearch(v, 50));
    }
}`)},
ex:[
 {t:'Count occurrences',l:'f',d:'Modify the search to count how many times the value appears in the array, instead of stopping at the first one.',h:'Do not use return inside the for; increment a counter and return at the end.',s:J(`
public class Main {
    static int count(int[] v, int target) {
        // your code
        return 0;
    }

    public static void main(String[] args) {
        int[] v = {3, 1, 3, 7, 3, 9};
        System.out.println(count(v, 3)); // expected: 3
    }
}`)},
 {t:'Search with comparisons',l:'m',d:'Make the search print how many comparisons were made. Test with the target at the start, in the middle and non-existent.',h:'A counter that adds 1 on every if (v[i] == target).',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] v = {5, 10, 15, 20, 25, 30, 35, 40};
        int target = 40;

    }
}`)}
]},

{id:'busca-bin',unit:2,title:'Binary search',
lead:'If the array is sorted, you can discard half of the elements at every step. With 1 million items, about 20 comparisons are enough.',
body:`
<div class="note"><b>Think of it this way</b><span>it is like looking up a word in a <b>dictionary</b>. You open it in the middle, see whether the word comes before or after, and discard half of the book. In a few openings you get there. It only works because the dictionary is in alphabetical order.</span></div>
<h2>The idea</h2>
<ol><li>Look at the <b>middle</b> element.</li><li>If it is the target, you found it.</li><li>If the target is smaller, search only the left half; if larger, the right half.</li><li>Repeat until the range is empty (<code>start &gt; end</code>).</li></ol>
{{fig:metade}}
{{code:bin}}
{{viz:buscabin}}
<div class="note warn"><b>Prerequisite</b><span>It only works with a <b>sorted</b> array. On a messy array it returns wrong answers without warning.</span></div>
<h2>Sequential × binary</h2>
<div class="tbl-wrap"><table><tr><th>n</th><th>Sequential (worst)</th><th>Binary (worst)</th></tr>
<tr><td>100</td><td>100</td><td>7</td></tr><tr><td>10,000</td><td>10,000</td><td>14</td></tr><tr><td>1,000,000</td><td>1,000,000</td><td>20</td></tr></table></div>
<p>Binary search is <b>O(log n)</b>.</p>
{{viz:cmpbusca}}`,
codes:{bin:J(`
public class Main {
    static int binarySearch(int[] v, int target) {
        int start = 0, end = v.length - 1;
        while (start <= end) {
            int mid = (start + end) / 2;
            System.out.println("  looking at v[" + mid + "] = " + v[mid]);
            if (v[mid] == target) return mid;
            else if (target < v[mid]) end = mid - 1;
            else start = mid + 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] v = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println("Result: " + binarySearch(v, 23));
    }
}`)},
ex:[
 {t:'Recursive binary search',l:'m',d:'Rewrite the binary search recursively: search(v, target, start, end).',h:'Base case: start > end → -1. Otherwise compute mid and call search with (start, mid-1) or (mid+1, end).',s:J(`
public class Main {
    static int search(int[] v, int target, int start, int end) {
        // your code
        return -1;
    }

    public static void main(String[] args) {
        int[] v = {1, 3, 5, 7, 9, 11, 13};
        System.out.println(search(v, 11, 0, v.length - 1)); // 5
    }
}`)},
 {t:'First occurrence',l:'d',d:'In a sorted array with duplicates {1,2,2,2,3,4}, find the FIRST position of 2 using binary search.',h:'When you find it, save the position and keep searching to the left (end = mid - 1).',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] v = {1, 2, 2, 2, 3, 4};
        int target = 2;

    }
}`)}
]},

{id:'bubble',unit:2,title:'Bubble Sort',
lead:'It compares neighbors and swaps them if they are out of order. On each pass, the largest element “bubbles” to the end.',
body:`
<div class="note"><b>Think of it this way</b><span>imagine bubbles in a glass: the <b>biggest</b> one rises first. On each pass, the largest number that is still out of place “rises” to the end of the array.</span></div>
<h2>Step by step</h2>
<p>For <code>{5, 1, 4, 2}</code>: compare 5 and 1 → swap; 5 and 4 → swap; 5 and 2 → swap. End of the 1st pass: <code>{1, 4, 2, 5}</code>. The 5 is already in the right place.</p>
{{fig:passadas}}
{{viz:bubble}}
<h2>The code</h2>
{{code:bub}}
<h2>Optimization</h2>
<p>If a whole pass makes no swap, the array is already sorted — stop. The <code>swapped</code> variable does that.</p>
<div class="tbl-wrap"><table><tr><th>Case</th><th>Cost</th></tr><tr><td>Best (already sorted, with optimization)</td><td>O(n)</td></tr><tr><td>Average / worst</td><td>O(n²)</td></tr></table></div>`,
codes:{bub:J(`
import java.util.Arrays;

public class Main {
    static void bubbleSort(int[] v) {
        int n = v.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (v[j] > v[j + 1]) {
                    int temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                    swapped = true;
                }
            }
            System.out.println("Pass " + (i + 1) + ": " + Arrays.toString(v));
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] v = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(v);
        System.out.println("Sorted: " + Arrays.toString(v));
    }
}`)},
ex:[
 {t:'Descending order',l:'f',d:'Adapt Bubble Sort to sort from largest to smallest.',h:'Only the comparison changes: v[j] < v[j+1].',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] v = {3, 9, 1, 7, 5};

        System.out.println(Arrays.toString(v)); // [9, 7, 5, 3, 1]
    }
}`)},
 {t:'Count swaps',l:'m',d:'Count how many swaps Bubble Sort makes on {5,4,3,2,1} and on {1,2,3,4,5}. Explain the difference.',h:'Add 1 to a counter whenever the swap if is entered.',s:J(`
public class Main {
    public static void main(String[] args) {
        int[] a = {5, 4, 3, 2, 1};

    }
}`)}
]},

{id:'selection',unit:2,title:'Selection Sort',
lead:'It finds the smallest element and puts it in the first position; then the second smallest in the second, and so on.',
body:`
<div class="note"><b>Think of it this way</b><span>it is like organizing cards in your hand: you look for the <b>smallest card</b> and put it in the first position. Then you look for the smallest among the remaining ones and put it in the second. And so on.</span></div>
<h2>The idea</h2>
<p>For each position <code>i</code>, find the index of the smallest element between <code>i</code> and the end, and swap it with <code>v[i]</code>. It makes at most <b>n−1 swaps</b> — far fewer than Bubble.</p>
{{fig:selpass}}
{{viz:selection}}
<h2>The code</h2>
{{code:sel}}
<h2>Comparing</h2>
<div class="tbl-wrap"><table><tr><th></th><th>Bubble</th><th>Selection</th></tr>
<tr><td>Comparisons</td><td>O(n²)</td><td>O(n²) always</td></tr>
<tr><td>Swaps</td><td>up to O(n²)</td><td>at most n−1</td></tr>
<tr><td>Stops early if sorted?</td><td>yes (optimized)</td><td>no</td></tr></table></div>
<h2>What is this O(n²)?</h2>
<p>The O(…) notation tells <b>how the work grows</b> when the array grows. O(n): double the array, double the work. O(n²): double the array, the work becomes <b>4 times</b> larger. O(log n): double the array, only <b>+1</b> step.</p>
{{viz:complex}}
<div class="note tip"><b>On the exam</b><span>Being able to simulate by hand (writing the array after each pass) is usually worth as much as the code.</span></div>`,
codes:{sel:J(`
import java.util.Arrays;

public class Main {
    static void selectionSort(int[] v) {
        for (int i = 0; i < v.length - 1; i++) {
            int smallest = i;
            for (int j = i + 1; j < v.length; j++) {
                if (v[j] < v[smallest]) smallest = j;
            }
            int temp = v[i];
            v[i] = v[smallest];
            v[smallest] = temp;
            System.out.println("i=" + i + ": " + Arrays.toString(v));
        }
    }

    public static void main(String[] args) {
        int[] v = {29, 10, 14, 37, 13};
        selectionSort(v);
    }
}`)},
ex:[
 {t:'Insertion Sort',l:'d',d:'Implement Insertion Sort: take each element and “insert” it in the right position of the already sorted part on the left.',h:'For i from 1 to n-1: key = v[i]; j = i-1; while j >= 0 and v[j] > key, v[j+1] = v[j], j--. At the end, v[j+1] = key.',s:J(`
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
 {t:'Sort names',l:'m',d:'Sort a String array in alphabetical order with Selection Sort.',h:'Replace < with a.compareTo(b) < 0.',s:J(`
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String[] names = {"Pedro", "Ana", "Lucas", "Bia", "Caio"};

        System.out.println(Arrays.toString(names));
    }
}`)}
]},

/* ---------- UNIT 3 ---------- */
{id:'metodos',unit:3,title:'Methods',
lead:'Methods split the program into named parts that do one thing only and can be reused.',
body:`
<div class="note"><b>Think of it this way</b><span>a method is like a <b>blender</b>: you put in ingredients (parameters), it does the work and hands back the juice (return). Whoever uses it does not need to know how it works inside.</span></div>
{{fig:maquina}}
<h2>Anatomy</h2>
{{code:anat}}
{{viz:chamada}}
<div class="tbl-wrap"><table><tr><th>Part</th><th>Meaning</th></tr>
<tr><td><code>static</code></td><td>can be called straight from main, without creating an object</td></tr>
<tr><td>return type</td><td><code>int</code>, <code>double</code>, <code>boolean</code>… or <code>void</code> (returns nothing)</td></tr>
<tr><td>parameters</td><td>values the method receives; each one with its type</td></tr>
<tr><td><code>return</code></td><td>returns the result and ends the method</td></tr></table></div>
<div class="note tip"><b>Good practice</b><span>If you copied and pasted a piece of code, it should have been a method. Name them with a verb: <code>calculateAverage</code>, <code>isPrime</code>.</span></div>`,
codes:{anat:J(`
public class Main {
    // return type, name, parameters
    static double calculateAverage(double a, double b, double c) {
        return (a + b + c) / 3;
    }

    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    static void line(int size) {      // void: it only runs
        for (int i = 0; i < size; i++) System.out.print("=");
        System.out.println();
    }

    public static void main(String[] args) {
        line(20);
        System.out.printf("Average: %.2f%n", calculateAverage(7, 8.5, 9));
        System.out.println("Is 10 even? " + isEven(10));
        line(20);
    }
}`)},
ex:[
 {t:'Function library',l:'f',d:'Create the methods factorial(n), isPrime(n) and largest(a, b, c). Test all of them in main.',h:'factorial: accumulate in a long with a for. isPrime: n < 2 is false; test divisors up to i*i <= n.',s:J(`
public class Main {
    // create your methods here


    public static void main(String[] args) {
        // System.out.println(factorial(5));   // 120
        // System.out.println(isPrime(17));    // true
        // System.out.println(largest(3, 9, 4)); // 9
    }
}`)}
]},

{id:'parametros',unit:3,title:'Parameter passing',
lead:'Why does changing an int inside a method change nothing outside, but changing an array does? The answer lies in what gets copied.',
body:`
<div class="note"><b>Think of it this way</b><span>passing an <code>int</code> is handing over a <b>photocopy</b> of a document: scribbling on the copy does not change the original. Passing an array is handing over the <b>address of a house</b>: whoever has the address can walk in and rearrange the furniture, and you will see the change.</span></div>
<h2>Java always passes a copy</h2>
<ul><li><b>Primitives</b> (<code>int</code>, <code>double</code>…): copies the <b>value</b>. Changing it inside the method does not affect the original variable.</li>
<li><b>Arrays and objects</b>: copies the <b>reference</b> (the “address”). Both point to the same array, so changing <code>v[0]</code> in there changes it out here.</li></ul>
{{code:par}}
{{viz:referencia}}
<div class="note"><b>That is why</b><span>the sorting methods of Unit 2 are <code>void</code>: they change the very array they receive.</span></div>`,
codes:{par:J(`
import java.util.Arrays;

public class Main {
    static void doubleNumber(int x) {
        x = x * 2;
        System.out.println("  inside: x = " + x);
    }

    static void doubleArray(int[] v) {
        for (int i = 0; i < v.length; i++) v[i] *= 2;
    }

    public static void main(String[] args) {
        int n = 5;
        doubleNumber(n);
        System.out.println("outside: n = " + n);       // still 5

        int[] v = {1, 2, 3};
        doubleArray(v);
        System.out.println("array:   " + Arrays.toString(v)); // [2, 4, 6]
    }
}`)},
ex:[
 {t:'Swap two numbers',l:'m',d:'Try writing swap(int a, int b) and see that it does not work. Then solve it with swap(int[] v, int i, int j).',h:'The array version works because it changes positions of the same array.',s:J(`
import java.util.Arrays;

public class Main {
    static void swap(int[] v, int i, int j) {

    }

    public static void main(String[] args) {
        int[] v = {10, 20, 30};
        swap(v, 0, 2);
        System.out.println(Arrays.toString(v)); // [30, 20, 10]
    }
}`)}
]},

{id:'sobrecarga',unit:3,title:'Overloading',
lead:'Several methods can have the same name if their parameters are different. Java chooses by the signature.',
body:`
<h2>Same idea, different inputs</h2>
<p>The <b>signature</b> is the name + the list of parameter types. A different return type alone is <b>not</b> enough.</p>
{{code:sob}}
<div class="note"><b>You already use it</b><span><code>System.out.println</code> is overloaded: there is a version for <code>int</code>, another for <code>String</code>, another for <code>double</code>…</span></div>
<div class="note warn"><b>In this editor</b><span>Running in the browser does not tell overloads apart by type — test this content on OnlineGDB (the ↗ button in the editor).</span></div>`,
codes:{sob:J(`
public class Main {
    static int add(int a, int b) { return a + b; }
    static int add(int a, int b, int c) { return a + b + c; }
    static double add(double a, double b) { return a + b; }

    public static void main(String[] args) {
        System.out.println(add(2, 3));
        System.out.println(add(2, 3, 4));
        System.out.println(add(1.5, 2.5));
    }
}`)},
ex:[
 {t:'Overloaded area',l:'f',d:'Create area(double side) for a square, area(double base, double height) for a rectangle and area(double radius, boolean circle) for a circle.',h:'Circle: Math.PI * radius * radius. Run it on OnlineGDB to test all three.',s:J(`
public class Main {

    public static void main(String[] args) {

    }
}`)}
]},

{id:'recursao',unit:3,title:'Recursion',
lead:'A method that calls itself to solve a smaller version of the same problem.',
body:`
<div class="note"><b>Think of it this way</b><span>think of <b>Russian nesting dolls</b>: to open the biggest one you open the one inside, then the one inside that… down to the smallest, which does not open anymore (the base case). Then you go back putting everything together.</span></div>
<h2>Two mandatory parts</h2>
<ol><li><b>Base case</b>: the simple situation that answers directly, without calling again.</li><li><b>Recursive step</b>: calls the method with a smaller problem, getting closer to the base case.</li></ol>
{{fig:bonecas}}
{{code:rec}}
{{viz:pilha}}
<div class="note warn"><b>No base case</b><span>the method calls itself forever until it blows the stack: <code>StackOverflowError</code>.</span></div>
`,
codes:{rec:J(`
public class Main {
    static long factorial(int n) {
        if (n <= 1) return 1;             // base case
        return n * factorial(n - 1);      // recursive step
    }

    static int fibonacci(int n) {
        if (n < 2) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    static int digitSum(int n) {
        if (n < 10) return n;
        return n % 10 + digitSum(n / 10);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        for (int i = 0; i < 10; i++) System.out.print(fibonacci(i) + " ");
        System.out.println();
        System.out.println("Digit sum of 2026: " + digitSum(2026));
    }
}`)},
ex:[
 {t:'Recursive power',l:'f',d:'Write power(base, exp) recursively, without Math.pow.',h:'Base case: exp == 0 → 1. Step: base * power(base, exp - 1).',s:J(`
public class Main {
    static long power(int base, int exp) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(power(2, 10)); // 1024
    }
}`)},
 {t:'Reverse a String',l:'m',d:'Reverse a String recursively: reverse("java") → "avaj".',h:'Base case: empty string. Step: reverse(s.substring(1)) + s.charAt(0).',s:J(`
public class Main {
    static String reverse(String s) {
        return s;
    }

    public static void main(String[] args) {
        System.out.println(reverse("java"));
    }
}`)},
 {t:'Recursive array sum',l:'m',d:'Add up the elements of an array recursively: sum(v, i) = v[i] + sum(v, i+1).',h:'Base case: i == v.length → 0.',s:J(`
public class Main {
    static int sum(int[] v, int i) {
        return 0;
    }

    public static void main(String[] args) {
        int[] v = {4, 8, 15, 16, 23, 42};
        System.out.println(sum(v, 0)); // 108
    }
}`)}
]},

{id:'modular',unit:3,title:'A modularized program',
lead:'Putting it all together: a grading system where main only orchestrates and each task lives in its own method.',
body:`
<h2>A main that reads like a script</h2>
<p>Notice that <code>main</code> has almost no logic — it calls methods with clear names. That makes testing, fixing and reusing easier.</p>
{{viz:mapa}}
{{code:mod}}
<div class="note tip"><b>Checklist</b><span>Does each method do one thing? Does the name say what it does? Can it be tested on its own? If so, it is well modularized.</span></div>`,
codes:{mod:J(`
import java.util.Scanner;

public class Main {
    static double[] readGrades(Scanner sc, int count) {
        double[] grades = new double[count];
        for (int i = 0; i < count; i++) grades[i] = sc.nextDouble();
        return grades;
    }

    static double average(double[] v) {
        double sum = 0;
        for (double x : v) sum += x;
        return sum / v.length;
    }

    static double highest(double[] v) {
        double m = v[0];
        for (double x : v) if (x > m) m = x;
        return m;
    }

    static String status(double average) {
        if (average >= 7) return "Passed";
        if (average >= 4) return "Final exam";
        return "Failed";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        double[] grades = readGrades(sc, count);
        double m = average(grades);
        System.out.printf("Average: %.2f | Highest: %.1f | %s%n", m, highest(grades), status(m));
    }
}`)},
codeIn:{mod:'4\n6.5\n8\n7.5\n9'},
ex:[
 {t:'Array menu',l:'d',d:'Write a program with a menu (do-while + switch): 1-fill array, 2-show, 3-sort, 4-search, 0-exit. Each option is a method.',h:'Keep the array in main and pass it to the methods. Reuse Bubble Sort and binary search.',in:'1\n5\n9 2 7 4 1\n2\n3\n2\n4\n7\n0',s:J(`
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static int menu(Scanner sc) {
        System.out.println("1-Fill 2-Show 3-Sort 4-Search 0-Exit");
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

/* ---------- PROJECTS (tip cards) ---------- */
const PROJECTS_EN = [
 {u:1,t:'Guessing game',d:'The computer picks 1–100 and says “higher” or “lower” after each guess. Count the attempts.',k:['Math.random()','do-while','if/else']},
 {u:1,t:'Tax ID (CPF) validator',d:'Validate the two check digits of a Brazilian CPF read as a String.',k:['charAt','% 11','loops']},
 {u:1,t:'Temperature analysis',d:'Read the temperatures of 7 days, show the average, days above average, maximum and minimum.',k:['array','for','accumulators']},
 {u:1,t:'Matrix: class grades',d:'Students × exams matrix. Compute each student\'s average and each exam\'s average.',k:['int[][]','nested for']},
 {u:2,t:'Sorted contact list',d:'Register names, sort alphabetically and search with binary search.',k:['String[]','compareTo','binary search']},
 {u:2,t:'Championship table',d:'Teams and points in parallel arrays. Sort by points keeping the name together.',k:['parallel arrays','double swap']},
 {u:2,t:'Sorting benchmark',d:'Generate 5,000 random numbers and compare the time of Bubble and Selection.',k:['System.nanoTime','Random','O(n²)']},
 {u:2,t:'Merge Sort (challenge)',d:'Split the array in half, sort each half recursively and merge. O(n log n).',k:['recursion','auxiliary array']},
 {u:3,t:'Calculator with history',d:'Menu with operations in separate methods and an array that keeps the last 10 calculations.',k:['methods','switch','circular array']},
 {u:3,t:'Math library',d:'gcd, lcm, isPrime, factorial, fibonacci and power — iterative and recursive, comparing the two.',k:['static','recursion','return']},
 {u:3,t:'ATM',d:'Balance, deposit, withdrawal with validation and statement. Each operation is a method.',k:['parameters','validation','menu']},
 {u:3,t:'Grade analyzer',d:'Read N grades, use methods for average, standard deviation, highest/lowest and letter grade.',k:['double[]','Math.sqrt','modularization']}
];

const PLAN_EN = [
 ['Wk 1','Structure, types and operators — do all the exercises of lessons 1 and 2.'],
 ['Wk 2','Scanner and conditionals — calculator and leap year. Project: guessing game.'],
 ['Wk 3','Loops — primes and pyramid. Practice simulating loops by hand on paper.'],
 ['Wk 4','Arrays and matrices — statistics, reversal, palindrome. Project: temperatures.'],
 ['Wk 5','Sequential and binary search — implement both without looking.'],
 ['Wk 6','Bubble and Selection Sort — simulate passes by hand. Project: sorted contact list.'],
 ['Wk 7','Methods and parameters — rewrite old exercises with methods.'],
 ['Wk 8','Recursion + modularized program. Final project: ATM or array menu.']
];

// ================= EXAMPLES, EXAM SUMMARIES AND QUIZZES =================
// run example for each exercise: [input, expected output]
const EXAMPLES_EN = {
  'estrutura:0': ['', 'Ana Souza\nComputer Science\n3rd term\n--------------------'],
  'tipos:0': ['7\n8.5', 'Average: 7.90'],
  'tipos:1': ['3725', '1h 2min 5s'],
  'entrada:0': ['70\n1.75', 'BMI: 22.9'],
  'condicionais:0': ['10\n4\n/', '10.0 / 4.0 = 2.5\n\n(with 10, 0 and / →  Error: division by zero)'],
  'condicionais:1': ['2024', '2024 is a leap year\n\n(with 1900 →  1900 is not a leap year)'],
  'lacos:0': ['5\n3\n12\n0', 'Sum: 20\nCount: 3'],
  'lacos:1': ['30', '30 is not prime\nPrimes up to 30: 2 3 5 7 11 13 17 19 23 29'],
  'lacos:2': ['4', '   *\n  ***\n *****\n*******'],
  'vetores:0': ['4\n8\n15\n16\n23', 'Sum: 66\nAverage: 13.2\nMax: 23\nMin: 4'],
  'vetores:1': ['', '[6, 5, 4, 3, 2, 1]'],
  'vetores:2': ['level', 'level is a palindrome\n\n(with java →  java is not a palindrome)'],
  'busca-seq:0': ['', '3'],
  'busca-seq:1': ['', 'Found at position 7\nComparisons: 8'],
  'busca-bin:0': ['', '5'],
  'busca-bin:1': ['', 'First occurrence of 2: position 1'],
  'bubble:0': ['', '[9, 7, 5, 3, 1]'],
  'bubble:1': ['', 'Swaps in [5, 4, 3, 2, 1]: 10\nSwaps in [1, 2, 3, 4, 5]: 0'],
  'selection:0': ['', '[5, 6, 11, 12, 13]'],
  'selection:1': ['', '[Ana, Bia, Caio, Lucas, Pedro]'],
  'metodos:0': ['', '120\ntrue\n9'],
  'parametros:0': ['', '[30, 20, 10]'],
  'sobrecarga:0': ['', 'Square (side 2): 4.0\nRectangle (3 x 4): 12.0\nCircle (radius 1): 3.14'],
  'recursao:0': ['', '1024'],
  'recursao:1': ['', 'avaj'],
  'recursao:2': ['', '108'],
  'modular:0': ['1\n5\n9 2 7 4 1\n2\n3\n2\n4\n7\n0', '1-Fill 2-Show 3-Sort 4-Search 0-Exit\nHow many numbers? 5\n…\n[9, 2, 7, 4, 1]\n…\n[1, 2, 4, 7, 9]\n…\nSearch: 7 is at position 3\n…\nBye!']
};

// what usually shows up on the exam, by lesson
const PROVA_EN = {
  estrutura: ['Write the <code>public class</code> + <code>main</code> skeleton from memory, without looking.', 'Difference between <code>print</code>, <code>println</code> and <code>printf</code>.', 'Spot compilation errors: missing <code>;</code>, unclosed brace, lowercase <code>system</code>.'],
  tipos: ['Evaluate expressions “in your head”: <code>7 / 2</code> = 3, <code>7 % 2</code> = 1, <code>7 / 2.0</code> = 3.5.', 'Pick the right type: int, double, char, boolean or String.', 'Know that String is compared with <code>equals</code>.'],
  entrada: ['Read data with Scanner: <code>nextInt</code>, <code>nextDouble</code>, <code>next</code>, <code>nextLine</code>.', 'Explain and fix the <code>nextLine</code> problem after <code>nextInt</code>.', 'Show formatted output with <code>printf("%.2f")</code>.'],
  condicionais: ['Say which message is printed for a given value (desk check).', 'Build conditions with <code>&&</code>, <code>||</code> and <code>!</code>.', 'Know what happens when <code>break</code> is missing in a switch.'],
  lacos: ['Do the <b>desk check</b>: a table with the value of each variable at every lap.', 'Count how many times a loop runs.', 'Choose between for, while and do-while and justify it.'],
  vetores: ['Traverse with <code>for (int i = 0; i &lt; v.length; i++)</code>.', 'Find max, min, sum and average; count occurrences.', 'Recognize the index error (<code>ArrayIndexOutOfBoundsException</code>).'],
  'busca-seq': ['Write the method that returns the position or -1.', 'Count comparisons in the best and worst case.', 'Know that it works on an unsorted array.'],
  'busca-bin': ['Simulate by hand: write down <b>start, end and mid</b> at each step (table).', 'Know that it requires a <b>sorted</b> array.', 'Compare O(n) with O(log n).'],
  bubble: ['Write the array <b>after each pass</b> (the most common question!).', 'Count comparisons and swaps.', 'Explain the optimization with <code>swapped</code>.'],
  selection: ['Write the array after each pass.', 'Difference from Bubble: at most n−1 swaps.', 'Sort Strings with <code>compareTo</code>.'],
  metodos: ['Write a method with parameters and a return value.', 'Difference between a <code>void</code> method and one with a return value.', 'Call the method in main using the returned value.'],
  parametros: ['Predict the output of code that changes parameters: an int does not change outside, an array does.', 'Explain “pass by value” and reference copying.'],
  sobrecarga: ['Identify which signatures are valid (name + parameter types).', 'Know that changing only the return type is not overloading.'],
  recursao: ['Point out the <b>base case</b> and the <b>recursive step</b>.', 'Simulate the call stack and give the result (factorial, fibonacci, digit sum).', 'Explain the StackOverflowError.'],
  modular: ['Split a problem into methods with clear names.', 'Build a menu with do-while + switch calling methods.', 'Reuse search and sorting as methods.']
};

// quick quiz: [question, options, index of the right one, explanation]
const QUIZ_EN = {
  estrutura: [['Which line makes the program start running?', ['public class Main {', 'public static void main(String[] args) {', 'System.out.println();'], 1, 'Java always starts at the main method with exactly this signature.'],
    ['The file has <code>public class Calculation</code>. What must the file name be?', ['Main.java', 'calculation.java', 'Calculation.java'], 2, 'The file name equals the public class name, with the same upper and lower case: Calculation.java.']],
  tipos: [['What is <code>17 / 5</code> in Java?', ['3.4', '3', '2'], 1, 'Two ints → integer division: 3.4 becomes 3.'],
    ['And <code>17 % 5</code>?', ['2', '3', '0.4'], 0, '% is the remainder of the division: 17 = 5 × 3 + 2.'],
    ['How do you compare whether the String <code>s</code> is “yes”?', ['s == "yes"', 's.equals("yes")', 's = "yes"'], 1, 'Strings are compared by content with equals. == compares whether it is the same object.']],
  entrada: [['After <code>int n = sc.nextInt();</code>, the next <code>sc.nextLine()</code> returns…', ['the next typed line', 'an empty String ""', 'an error'], 1, 'nextInt leaves the Enter in the input. nextLine reads that “rest of the line”, which is empty.'],
    ['Which method reads “Maria Souza” entirely?', ['next()', 'nextLine()', 'nextString()'], 1, 'next() stops at the space and would read only “Maria”.']],
  condicionais: [['With <code>x = 15</code>: <code>if (x > 10) A; else if (x > 5) B; else C;</code> prints…', ['A', 'A and B', 'B'], 0, 'The first true block runs and the others are skipped.'],
    ['In a switch without <code>break</code>, when entering case 2…', ['it runs only case 2', 'it runs case 2 and all the ones below', 'it gives a compilation error'], 1, 'Without break, execution “falls through” into the following cases.']],
  lacos: [['How many times does <code>for (int i = 0; i &lt; 5; i++)</code> run?', ['4', '5', '6'], 1, 'i is 0, 1, 2, 3 and 4: that is 5 laps.'],
    ['Which loop runs the block at least once?', ['for', 'while', 'do-while'], 2, 'do-while only tests the condition at the end.'],
    ['<code>int s = 0; for (int i = 1; i &lt;= 3; i++) s += i;</code> What is s?', ['3', '6', '4'], 1, '0 + 1 + 2 + 3 = 6.']],
  vetores: [['<code>int[] v = new int[4];</code> What is the last valid index?', ['4', '3', '5'], 1, 'Indexes go from 0 to length − 1 = 3.'],
    ['What is <code>v[2]</code> right after <code>new int[4]</code>?', ['0', 'null', 'memory garbage'], 0, 'int arrays are born with zeros.']],
  'busca-seq': [['In the worst case, how many comparisons does it make on 1,000 elements?', ['10', '500', '1,000'], 2, 'Worst case: the value is at the end or does not exist → n comparisons.'],
    ['What does the method return when it does not find it?', ['0', '-1', 'null'], 1, 'By convention, -1, since 0 is a valid position.']],
  'busca-bin': [['Prerequisite of binary search:', ['array without duplicates', 'sorted array', 'array with an even size'], 1, 'Without sorting you cannot tell which side the value is on.'],
    ['With start = 0 and end = 9, what is mid?', ['4', '5', '4.5'], 0, '(0 + 9) / 2 = 4, because the division is integer.'],
    ['At most, how many steps for 1,000 elements?', ['10', '100', '500'], 0, '2¹⁰ = 1,024, so about 10 steps.']],
  bubble: [['After the 1st pass of Bubble on [4, 1, 3, 2], the array becomes…', ['[1, 3, 2, 4]', '[1, 2, 3, 4]', '[1, 4, 3, 2]'], 0, 'Swaps 4↔1, 4↔3, 4↔2: the 4 “bubbles” to the end.'],
    ['What is the cost in the worst case?', ['O(n)', 'O(log n)', 'O(n²)'], 2, 'Two nested loops over the array.']],
  selection: [['After the 1st pass of Selection on [4, 1, 3, 2], the array becomes…', ['[1, 4, 3, 2]', '[1, 3, 2, 4]', '[1, 2, 3, 4]'], 0, 'Finds the smallest (1) and swaps it with position 0.'],
    ['How many swaps at most in an array of 10 elements?', ['9', '45', '100'], 0, 'At most one swap per pass: n − 1 = 9.']],
  metodos: [['A method that only prints and returns nothing has the return type…', ['int', 'void', 'null'], 1, 'void means “returns no value”.'],
    ['What happens to the code after a <code>return</code>?', ['it runs normally', 'it does not run: the method ends there', 'it runs only if void'], 1, 'return ends the method immediately.']],
  parametros: [['<code>void f(int x) { x = 99; }</code> With <code>int a = 1; f(a);</code>, a is…', ['1', '99', '0'], 0, 'x is a copy of a. Changing x does not change a.'],
    ['<code>void g(int[] v) { v[0] = 99; }</code> With <code>int[] a = {1}; g(a);</code>, a[0] is…', ['1', '99', 'error'], 1, 'v and a point to the same array.']],
  sobrecarga: [['Which pair is NOT a valid overload?', ['int add(int a) and int add(int a, int b)', 'int add(int a) and double add(int a)', 'int add(int a) and double add(double a)'], 1, 'Same parameter list and only the return type differs → compilation error.']],
  recursao: [['What is the base case for?', ['making the code faster', 'stopping the recursion', 'calling another method'], 1, 'Without it the calls never stop → StackOverflowError.'],
    ['What does <code>f(3)</code> return, if <code>f(n) = n == 0 ? 0 : n + f(n - 1)</code>?', ['3', '6', '0'], 1, '3 + 2 + 1 + 0 = 6.']],
  modular: [['In a well modularized program, main should…', ['hold all the logic', 'only organize the calls', 'be empty'], 1, 'Each task lives in a method and main coordinates.']]
};

// a script to solve any exercise
const METODO_EN = `<div class="method">
  <div class="method-h"><b>Before coding, follow these 4 steps</b><button class="btn" data-method>See example</button></div>
  <ol class="steps"><li><b>Understand</b> the input and the output. Look at the exercise's run example.</li><li><b>Solve by hand</b> with the example's numbers, on paper.</li><li><b>Write in plain English</b> the steps you took (the algorithm).</li><li><b>Translate to Java</b>, run it with the example and compare the output.</li></ol>
  <div class="method-ex"><div>
    <p><b>Exercise:</b> “Read 3 numbers and show the largest.”</p>
    <p><b>1. Understand:</b> input <code>4 9 2</code> → output <code>Largest: 9</code>.</p>
    <p><b>2. By hand:</b> the largest so far is 4. Is 9 larger? Yes → largest = 9. Is 2 larger? No. Answer: 9.</p>
    <p><b>3. In plain English:</b> read a, b, c → largest = a → if b &gt; largest, largest = b → if c &gt; largest, largest = c → show largest.</p>
    <p><b>4. In Java:</b></p>
    <pre class="mini">int largest = a;
if (b > largest) largest = b;
if (c > largest) largest = c;
System.out.println("Largest: " + largest);</pre>
    <p>Notice that step 3 became the code line by line. Whoever skips steps 2 and 3 usually gets stuck on the exam.</p>
  </div></div>
</div>`;

// ---- applies the English content over the Portuguese data ----
Object.assign(UNITS, UNITS_EN);
const _ecl = LESSONS.find(l => l.id === 'eclipse');
LESSONS.splice(0, LESSONS.length, ...(_ecl ? [_ecl] : []), ...LESSONS_EN);
PROJECTS.splice(0, PROJECTS.length, ...PROJECTS_EN);
PLAN.splice(0, PLAN.length, ...PLAN_EN);
Object.assign(EXAMPLES, EXAMPLES_EN);
Object.assign(PROVA, PROVA_EN);
Object.assign(QUIZ, QUIZ_EN);
METODO = METODO_EN;
})();
