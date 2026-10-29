/*
 * Programming Lab II — "Start here" module: Java in Eclipse (English). Overrides the Portuguese lesson/simulators.
 */
UNITS[0] = { name: 'Start here', color: 'var(--acc)', soft: 'var(--acc-s)' };
Object.assign(LESSONS.find(l => l.id === 'eclipse'), {
  title: 'Java in Eclipse: create, open and submit',
  lead: 'The lessons and the lab practical exam are done in Eclipse. Here you learn the whole path: install, create a project, run, open ready-made projects and export to submit.',
  body: `
<div class="note"><b>Think of it this way</b><span>the <b>workspace</b> is your bookshelf, each <b>project</b> is a folder on that shelf and each <b>class</b> (<code>.java</code>) is a sheet inside the folder. Eclipse is the desk where you open all of it.</span></div>
<h2>1. Install (only once)</h2>
<ol>
<li>Download the installer at <b>eclipse.org/downloads</b> and choose <b>Eclipse IDE for Java Developers</b>.</li>
<li>The current package already comes with an embedded Java. If Eclipse complains that it cannot find Java (JRE/JDK), install <b>JDK Temurin</b> from <b>adoptium.net</b> and open Eclipse again.</li>
<li>On the first launch, it asks for a <b>workspace</b>: the folder where your projects are saved. Use something easy to find, like <code>Documents/eclipse-workspace</code>.</li>
</ol>
<div class="note tip"><b>In the labs</b><span>Eclipse is already installed. Just check where the workspace is, so you can copy your project at the end of the class.</span></div>
<h2>2. Create the project and the first class</h2>
<p>Follow the simulator below. It shows exactly where to click at each step.</p>
{{viz:eclipse}}
<h2>3. Where everything is</h2>
{{viz:eclipsetree}}
<h2>4. Run and type data</h2>
<ul>
<li>Run: green <b>▶ Run</b> button, or <b>Ctrl + F11</b>, or right-click the class › <b>Run As › Java Application</b>.</li>
<li>The output appears in the <b>Console</b> tab, at the bottom.</li>
<li>If the program uses <code>Scanner</code>, <b>click inside the Console</b>, type the value and press <b>Enter</b>. The program stays stopped waiting until you type.</li>
<li>To stop a stuck program (infinite loop), click the <b>red square ■</b> in the Console.</li>
</ul>
<h2>5. Open a ready-made project (downloaded or from another computer)</h2>
<ol>
<li>If it came as a <b>.zip</b>: <b>File › Import… › General › Existing Projects into Workspace</b> › check <b>Select archive file</b> › choose the .zip › <b>Finish</b>.</li>
<li>If it came as a <b>folder</b>: same path, but check <b>Select root directory</b> and point to the project folder.</li>
<li>If it is just a loose <b>.java</b> file: create a project, then drag the file into the <code>src</code> folder in the Package Explorer (choose <b>Copy files</b>).</li>
</ol>
<h2>6. Export to submit</h2>
<ol>
<li>Click the project in the Package Explorer.</li>
<li><b>File › Export… › General › Archive File</b> › <b>Next</b>.</li>
<li>Check that the project is ticked, choose where to save the <b>.zip</b> (e.g.: <code>FirstnameLastname_List1.zip</code>) and click <b>Finish</b>.</li>
</ol>
<div class="note warn"><b>Before sending</b><span>open the .zip and check that the <code>.java</code> files are inside <code>src</code>. Sending only the <code>bin</code> folder (with the <code>.class</code> files) is a common mistake: without the <code>.java</code> files, nobody can read the code.</span></div>
<h2>7. Shortcuts that save time on the exam</h2>
<div class="tbl-wrap"><table><tr><th>Type / press</th><th>What it does</th></tr>
<tr><td><code>main</code> + Ctrl + Space</td><td>writes the whole <code>public static void main</code></td></tr>
<tr><td><code>sysout</code> + Ctrl + Space</td><td>writes <code>System.out.println();</code></td></tr>
<tr><td>Ctrl + Space</td><td>autocomplete variable and method names</td></tr>
<tr><td>Ctrl + Shift + O</td><td>adds the missing <code>import</code>s (e.g.: Scanner)</td></tr>
<tr><td>Ctrl + Shift + F</td><td>fixes the code indentation</td></tr>
<tr><td>Ctrl + 1</td><td>suggestions to fix the error underlined in red</td></tr>
<tr><td>Ctrl + S</td><td>saves (Eclipse compiles on save)</td></tr>
<tr><td>Ctrl + F11</td><td>runs</td></tr></table></div>
<h2>8. Common errors and how to solve them</h2>
<div class="tbl-wrap"><table><tr><th>Message / symptom</th><th>Cause and solution</th></tr>
<tr><td>“Selection does not contain a main type”</td><td>The class has no <code>main</code>, or you clicked the wrong project. Open the class with main and run from inside it.</td></tr>
<tr><td>“The public type X must be defined in its own file”</td><td>The class name differs from the file name. Rename with right-click › <b>Refactor › Rename</b>.</td></tr>
<tr><td>“Scanner cannot be resolved to a type”</td><td>Missing <code>import java.util.Scanner;</code>. Press <b>Ctrl + Shift + O</b>.</td></tr>
<tr><td>Error with <code>module-info.java</code></td><td>Delete the <code>module-info.java</code> file from the project. We do not use modules in the course.</td></tr>
<tr><td>Red X on the project, but the code looks right</td><td><b>Project › Clean…</b> and then save again. Also check the <b>Problems</b> tab.</td></tr>
<tr><td>Nothing shows in the Console</td><td><b>Window › Show View › Console</b>. If still nothing shows, the program may be waiting for you to type something.</td></tr>
<tr><td>Eclipse's windows disappeared</td><td><b>Window › Perspective › Reset Perspective…</b></td></tr></table></div>
<div class="note"><b>And this editor here?</b><span>Use it to practice on your phone, on the bus or without a computer. For the <b>practical exam</b> and for submitting assignments, use Eclipse: it is the environment where the code is graded.</span></div>`,
  ex: [
    { t: 'Your first project in Eclipse', l: 'f', d: 'In Eclipse, create the project <code>Lab2</code>, the class <code>Main</code> with main, paste this code, run it, type your name in the Console and export the project as <code>Lab2.zip</code>. Practice here first, if you like.', h: 'Order: File › New › Java Project → New › Class (tick main) → Ctrl + F11 → click the Console and type → File › Export › Archive File.', in: 'Ana', s: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Your name: ");
        String name = sc.nextLine();
        System.out.println("Welcome to Lab II, " + name + "!");
    }
}
` }
  ]
});
EXAMPLES['eclipse:0'] = ['Ana', 'Your name: Ana\nWelcome to Lab II, Ana!'];
PROVA.eclipse = ['Create a project and a class from scratch, without help: <b>File › New › Java Project</b> and then <b>New › Class</b> with main.', 'Run and use the Console to type the Scanner input.', 'Submit correctly: <b>File › Export › Archive File</b>, with the <code>.java</code> files inside <code>src</code>.'];
QUIZ.eclipse = [
  ['Where are the <code>.java</code> files you write?', ['in the bin folder', 'in the src folder', 'in the JRE System Library'], 1, 'src = source (source code). The bin folder keeps the compiled .class files.'],
  ['The program uses Scanner and “nothing happens” after running. What to do?', ['run it again', 'click the Console and type the value', 'reinstall Eclipse'], 1, 'The program is stopped waiting for the input. Click the Console, type and press Enter.'],
  ['Which path generates the .zip to submit?', ['File › Export › Archive File', 'File › Save As', 'Run › Export'], 0, 'Export › General › Archive File packs the whole project.']];

// ---- Eclipse screen simulator ----
VIZ.eclipse = el => {
  vhead(el, 'Simulator', 'Creating a project in Eclipse, step by step', 'Move through the steps. The blue highlight shows where to click.');
  const st = add(el, `<div style="display:flex;flex-direction:column;gap:12px"></div>`);
  const F = [
    { hl: 'file', menu: ['New ›', 'Open File…', 'Import…', 'Export…'], mh: 0, sub: ['Java Project', 'Package', 'Class'], sh: 0, tree: [], msg: 'Menu <b>File › New › Java Project</b>. (If “Java Project” does not show up, use <b>File › New › Project… › Java › Java Project</b>.)' },
    { dlg: 'proj', msg: 'In <b>Project name</b> type <code>Lab2</code>. Leave the JRE as it is. If the <b>Create module-info.java file</b> option shows up, <b>untick</b> it. Click <b>Finish</b>.', tree: [] },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📚', 'JRE System Library', 2]], msg: 'The project shows up in the <b>Package Explorer</b>, on the left. Open it to see the <code>src</code> folder: that is where the code lives.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2, 'hl'], ['📚', 'JRE System Library', 2]], ctx: ['New ›  Class', 'Refresh', 'Properties'], msg: 'Right-click <code>src</code> › <b>New › Class</b>.' },
    { dlg: 'class', tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📚', 'JRE System Library', 2]], msg: 'In <b>Name</b> type <code>Main</code> (with a capital M). Tick <b>public static void main(String[] args)</b>, so Eclipse writes main for you. Click <b>Finish</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4, 'hl'], ['📚', 'JRE System Library', 2]], code: true, msg: 'The class opens in the editor, already with <code>main</code>. Write your code inside it and save with <b>Ctrl + S</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4]], code: true, run: true, hl: 'run', msg: 'Click the green <b>▶ Run</b> button (or <b>Ctrl + F11</b>). The first time, if it asks, choose <b>Java Application</b>.' },
    { tree: [['📁', 'Lab2', 1], ['📂', 'src', 2], ['📦', '(default package)', 3], ['☕', 'Main.java', 4]], code: true, console: true, msg: 'The output shows up in the <b>Console</b>. If the program uses Scanner, click the Console, type and press Enter. ✓ Done, that is the cycle of every exercise.' }];
  player(el, () => F, f => {
    const tree = (f.tree || []).map(([i, n, d, h]) => `<div class="ec-ti ${h ? 'hl' : ''}" style="padding-left:${d * 10}px">${i} ${n}</div>`).join('') || '<div class="ec-empty">(empty)</div>';
    const menu = f.menu ? `<div class="ec-menu">${f.menu.map((m, k) => `<div class="${k === f.mh ? 'hl' : ''}">${m}</div>`).join('')}</div><div class="ec-menu ec-sub">${f.sub.map((m, k) => `<div class="${k === f.sh ? 'hl' : ''}">${m}</div>`).join('')}</div>` : '';
    const ctx = f.ctx ? `<div class="ec-menu ec-ctx">${f.ctx.map((m, k) => `<div class="${k === 0 ? 'hl' : ''}">${m}</div>`).join('')}</div>` : '';
    const dlg = f.dlg === 'proj' ? `<div class="ec-dlg"><b>New Java Project</b><label>Project name: <span class="ec-in hl">Lab2</span></label><label>☐ Create module-info.java file</label><div class="ec-btns"><span>Cancel</span><span class="hl">Finish</span></div></div>`
      : f.dlg === 'class' ? `<div class="ec-dlg"><b>New Java Class</b><label>Name: <span class="ec-in hl">Main</span></label><label class="hlt">☑ public static void main(String[] args)</label><div class="ec-btns"><span>Cancel</span><span class="hl">Finish</span></div></div>` : '';
    st.innerHTML = `<div class="ec">
      <div class="ec-bar"><span class="${f.hl === 'file' ? 'hl' : ''}">File</span><span>Edit</span><span>Source</span><span>Run</span><span>Window</span><span class="ec-run ${f.hl === 'run' ? 'hl' : ''}">▶</span></div>
      <div class="ec-body"><div class="ec-pe"><div class="ec-t">Package Explorer</div>${tree}</div>
      <div class="ec-ed"><div class="ec-t">${f.code ? 'Main.java' : '&nbsp;'}</div>${f.code ? `<pre>public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello!");\n  }\n}</pre>` : ''}</div></div>
      <div class="ec-con"><div class="ec-t">Console</div>${f.console ? '<pre>Hello!</pre>' : ''}</div>
      ${menu}${ctx}${dlg}</div><div class="vmsg">${f.msg}</div>`;
  }, 2600);
};
VIZ.eclipsetree = el => {
  vhead(el, 'Tap to explore', 'Anatomy of a Java project', 'Tap each item to learn what it is for.');
  const T = [['📁 Lab2', 0, 'The <b>project</b>: a folder inside the workspace. One project per list or assignment keeps everything organized.'], ['📂 src', 1, '<b>src</b> (source) holds the source code, the <code>.java</code> files. <b>This is what you submit.</b>'], ['📦 (default package)', 2, 'The <b>package</b> organizes classes into subfolders. In the course, the default (unnamed) package is fine. If one is requested, create it with <b>New › Package</b>.'], ['☕ Main.java', 3, 'The <b>class</b>. The file name is always the same as the public class name.'], ['📚 JRE System Library', 1, 'Java\'s libraries (where <code>Scanner</code>, <code>Math</code>, <code>String</code>… live). Do not touch it.'], ['📂 bin (hidden)', 1, '<b>bin</b> holds the <code>.class</code> files, which are the compiled code the computer runs. Eclipse generates it by itself on every Ctrl + S.']];
  const t = add(el, `<div class="ec-tree">${T.map(([n, d], k) => `<button data-k="${k}" style="margin-left:${d * 18}px">${n}</button>`).join('')}</div>`);
  const msg = add(el, `<div class="vmsg">Tap <b>📂 src</b>, the most important folder.</div>`);
  t.onclick = e => { const b = e.target.closest('[data-k]'); if (!b) return; t.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); msg.innerHTML = T[+b.dataset.k][2]; };
};
