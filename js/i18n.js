/* LabII - Java — idiomas (pt-BR e en). Carregado antes de tudo. */
const I18N = {
  pt: {
    docTitle: 'LabII - Java',
    meta: 'Plataforma de estudos de Laboratório de Programação II (Java): aulas, simulações interativas, exercícios e editor que executa Java no navegador.',
    openLessonsAria: 'Abrir aulas', collapseAria: 'Recolher menu lateral', showSideAria: 'Mostrar menu lateral', collapseTitle: 'Recolher/mostrar menu',
    logoAria: 'LabII - Java: ir para o Início', codeBtnAria: 'Abrir ou fechar o editor de código', codeBtnTitle: 'Editor de código', themeAria: 'Alternar tema', langAria: 'Idioma',
    sideNavAria: 'Aulas', ideAria: 'Editor Java', runTitle: 'Ctrl+Enter', run: 'Executar', resetTitle: 'Voltar ao código inicial', reset: 'Reiniciar',
    copyTitle: 'Copiar código', copy: 'Copiar', gdbTitle: 'Java 100% real (cole o código lá)', tabOut: 'Saída', tabIn: 'Entrada (Scanner)', ctrlEnter: 'Ctrl+Enter para executar',
    outInit: 'Escreva seu código e clique em ▶ Executar.', stdinPh: 'Digite aqui o que o programa vai ler com Scanner, um valor por linha. Ex:\n10\n5\n+',
    tabbarAria: 'Alternar entre aula e código', tbLesson: 'Aula', tbCode: 'Código', tbRun: '▶ Executar', tbRunning: '… Executando', runningWord: 'Executando',
    lvF: 'Fácil', lvM: 'Médio', lvD: 'Desafio',
    tRequiz: 'Teste reiniciado', tReset: 'Progresso zerado', tDone: 'Aula concluída ✓', tSolved: 'Exercício resolvido ✓', tOpened: 'Código aberto no editor', tCodeReset: 'Código reiniciado',
    tCopied: 'Código copiado', tSelected: 'Selecionado — copie com o menu',
    sideLessons: 'Aulas', sideCount: (n, t) => `${n} de ${t} concluídas`, closeMenuAria: 'Fechar menu', navHome: 'Início', navProjects: 'Projetos', navSummary: 'Resumo', navProgress: 'Progresso',
    progTxt: (n, t) => `${n} de ${t} aulas`, progTitle: 'Ver painel de progresso',
    openInEditor: 'Abrir no editor ▸', crumbUnit: u => 'Unidade ' + u + ' · ', examTitle: '📝 O que costuma cair na prova', quizTitle: 'Teste rápido',
    quizIntro: 'Responda antes de ir para os exercícios. A correção aparece na hora.', requiz: '↺ Refazer teste', practice: 'Pratique', solved: '✓ Resolvido',
    runExample: 'Exemplo de execução', inLbl: 'Entrada (você digita)', outLbl: 'Saída esperada', practiceBtn: '‹/› Praticar', seeHint: 'Ver dica', hideHint: 'Esconder dica',
    upNext: 'A seguir', prevAria: t => 'Aula anterior: ' + t, prev: 'Anterior', completed: 'Concluída', complete: 'Concluir', nextAria: t => 'Próxima: ' + t, next: 'Próxima',
    qRight: '✓ Certo!', qWrong: '✗ Não é essa.', seeEx: 'Ver exemplo', hideEx: 'Esconder exemplo', exampleSuffix: 'exemplo',
    homeH1: 'Estude Java lendo e programando ao mesmo tempo',
    homeLead: n => `${n} aulas curtas das três unidades da disciplina, cada uma com exemplos que rodam aqui e exercícios para praticar no editor.`,
    continueH: 'Continuar de onde parou', openLesson: 'Abrir aula →', unitWord: u => ' — Unidade ' + u,
    startHere: '★ COMECE AQUI', eclipseT: 'Java no Eclipse', eclipseD: 'Instalar, criar projeto e classe, rodar, digitar no Console, abrir projetos prontos e exportar o .zip para entregar.',
    examSoon: 'PROVA CHEGANDO?', sum3: 'Resumo das 3 unidades', sum3d: 'Regras, códigos para decorar, simulações à mão, erros clássicos e cartões de revisão — tudo numa página.',
    panelTag: 'PAINEL', yourProg: 'Seu progresso', yourProgD: 'Veja o domínio de cada unidade, onde você mais erra e o que já está tranquilo.',
    unitsH: 'Unidades', unitUpper: u => 'UNIDADE ' + u, editorHowH: 'Como usar o editor',
    edLi1: '<b>Abrir no editor</b> nos exemplos ou <b>Praticar</b> nos exercícios carrega o código pronto para rodar.',
    edLi2Narrow: 'No celular, alterne entre <b>Aula</b> e <b>Código</b> na barra de baixo. A fileira de teclas acima do teclado tem <code>{ } ; "</code> e outros símbolos.',
    edLi2Wide: 'Rode com <b>▶ Executar</b> ou <code>Ctrl + Enter</code>.',
    edLi3: 'Se o programa usa <code>Scanner</code>, escreva os valores na aba <b>Entrada</b> (um por linha) antes de executar.',
    edLi4: 'O código roda direto no navegador e cobre o Java da disciplina. Para classes com objetos, use o botão <b>↗ OnlineGDB</b>.',
    edLi5: 'Seu código fica salvo neste aparelho, separado por exercício.',
    solveAny: 'Como resolver qualquer exercício', plan8: 'Plano de 8 semanas',
    prCrumb: 'Para ir além', prH1: 'Projetos para desenvolver', prLead: 'Ideias maiores que juntam o conteúdo de cada unidade. Comece pelos da unidade em que você está e vá subindo.',
    prUnit: u => 'Unidade ' + u, prUses: 'Usa:', prStart: 'Começar no editor', prBefore: 'Antes de entregar qualquer trabalho',
    prLi: [
      'Nomes de variáveis e métodos dizem o que guardam/fazem (<code>totalVendas</code>, não <code>x</code>).',
      'Indentação consistente: 4 espaços por nível.', 'Cada método faz uma coisa; o <code>main</code> só orquestra.',
      'Teste os casos de borda: vetor vazio, um elemento, valores negativos, zero.', 'Valide a entrada do usuário (divisão por zero, opção inválida no menu).',
      'Compare Strings com <code>equals</code>, nunca com <code>==</code>.', 'Laço de vetor: <code>i &lt; v.length</code>, não <code>&lt;=</code>.'],
    prTplProject: 'Projeto', prTplUses: 'Usa',
    welcome: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá! Este é o seu editor Java.");\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Linha " + i);\n        }\n    }\n}\n',
    loaded: (title, hasIn) => `${title} carregado. ${hasIn ? 'A aba Entrada já tem valores de exemplo. ' : ''}Toque em ▶ Executar.`,
    keyUndo: 'Desfazer',
    compileErr: 'Erro de compilação', atLine: l => ' (linha ' + l + ')', cantParse: 'Não consegui entender este código: ', ioCompileErr: 'erro de compilação',
    workerBlocked: 'Este navegador bloqueou a execução (Web Worker). Use o botão ↗ OnlineGDB.\n',
    okMatch: '\n✓ Saída igual à esperada — exercício resolvido!\n', noMatch: '\n○ A saída ainda está diferente do exemplo da aula. Compare linha por linha.\n',
    ioRunning: 'executando…', ioDone: ms => `✓ concluído em ${ms} ms`, noPrint: '(o programa não imprimiu nada)', ioError: 'erro', tapInput: '  (toque na aba Entrada)\n', atLineOut: l => `  linha ${l}\n`,
    errWord: '\nErro: ', runFail: 'falha na execução', timeoutMsg: '\n⏱ Interrompido após 6 segundos — provável loop infinito (a condição do laço nunca fica falsa?).\n', ioTimeout: 'tempo esgotado',
    outTooBig: 'Saída muito grande — interrompido (loop infinito?)',
    cannotFind: n => `cannot find symbol: '${n}'\n→ A variável ou método '${n}' não foi declarado, ou o nome está escrito diferente (maiúsculas contam).`,
    notMethod: n => `'${n}' não é um método válido aqui — confira o nome e o tipo da variável.`,
    syntaxErr: m => 'Erro de sintaxe: ' + m + '\n→ Confira parênteses, chaves e ponto e vírgula.', finalVar: 'Variável final não pode ser alterada.',
    declTwice: n => `Variável declarada duas vezes: ${n}\n→ Em Java, não dá para declarar o mesmo nome duas vezes no mesmo bloco.`,
    startInfo: 'Escreva seu código e toque em ▶ Executar.\nO Java roda aqui no navegador. Para classes com objetos, use ↗ OnlineGDB.',
    ex_ArithmeticException: 'Divisão inteira por zero. Confira o divisor antes de dividir.',
    ex_ArrayIndexOutOfBoundsException: 'Você acessou uma posição que não existe no vetor. Os índices vão de 0 até length − 1 (use i < v.length).',
    ex_StringIndexOutOfBoundsException: 'Posição inválida na String. charAt/substring aceitam de 0 até length() − 1.',
    ex_IndexOutOfBoundsException: 'Posição inválida na lista.',
    ex_NullPointerException: 'Você usou algo que está null — um vetor ou objeto que ainda não foi criado com new.',
    ex_InputMismatchException: 'O Scanner esperava um tipo (ex.: número inteiro) mas encontrou outra coisa na aba Entrada.',
    ex_NoSuchElementException: 'O programa tentou ler mais valores do que existem na aba Entrada. Adicione os valores lá (um por linha).',
    ex_NumberFormatException: 'Esse texto não pode ser convertido em número.',
    ex_StackOverflowError: 'Recursão sem fim. Confira se o caso base existe e se cada chamada se aproxima dele.',
    ex_IllegalFormatConversionException: 'No printf, %d é para inteiros e %f para decimais. Confira se o tipo combina com a variável.',
    // compilador (java-lite)
    cStr: 'String não fechada — falta a aspa dupla "', cChar: "char não fechado — falta a aspa simples '", cParenExtra: "')' sobrando",
    cBraceExtra: "'}' sobrando — chave fechada sem ter sido aberta", cEof: n => `fim do arquivo com ${n} chave(s) '{' sem fechar — falta '}'. Confira se cada if/for/método tem seu '}'.`,
    cParenMissing: "falta fechar um parêntese '('", cSemi: "';' esperado no fim desta linha", cNoClass: 'Não encontrei a classe. Comece com: public class Main {',
    cManyClasses: (n, names) => `Este editor roda programas de uma classe só (com métodos static). Encontrei ${n}: ${names}. Para classes/objetos, use o botão ↗ OnlineGDB.`,
    cNoMain: 'Falta o método main: public static void main(String[] args) { ... }', cNewMain: c => 'Criar objetos (new ' + c + '()) não é suportado aqui. Use métodos static ou rode no OnlineGDB.',
    // progresso
    stOk: 'Tranquilo', stAtt: 'Atenção', stRev: 'Reforçar', stNew: 'Não iniciado', ringAria: p => `${p}% de domínio`,
    pnCrumb: 'Painel', pnH1: 'Seu progresso',
    pnLead: 'O domínio de cada aula junta três coisas: o <b>teste rápido</b> (metade do peso), os <b>exercícios resolvidos</b> e a aula <b>concluída</b>. Os erros ao executar código mostram o que você precisa revisar.',
    kDone: 'Aulas concluídas', kAcc: 'Acerto nos testes', kAnswered: (a, t) => `${a} de ${t} respondidas`, kEx: 'Exercícios resolvidos', kExN: 'saída igual ao exemplo',
    kErr: 'Execuções com erro', kErrN: n => `de ${n} execuções`,
    emptyB: 'Ainda não há dados.', emptyS: 'Responda o teste rápido de uma aula ou rode um exercício no editor e o painel começa a se montar.', startFirst: 'Começar pela primeira aula →',
    nextStep: 'Próximo passo recomendado', nsReview: 'Revisar', nsStart: 'Começar',
    nsWeak: (s, redo, left) => `Domínio de ${s}% — ${redo ? 'refaça o teste rápido e ' : ''}${left ? 'resolva os exercícios que faltam' : 'revise a teoria'}.`, nsFresh: 'É a próxima aula que você ainda não abriu.', goLesson: 'Ir para a aula →',
    byUnit: 'Domínio por unidade', moduleStart: 'Módulo inicial', unitN: u => 'Unidade ' + u,
    unitProg: (k, n) => k ? `${k} de ${n} aula${n > 1 ? 's' : ''} iniciada${k > 1 ? 's' : ''}` : 'nenhuma aula iniciada',
    whereWrong: 'Onde você mais erra', errIntro: 'Erros ao executar código, do mais frequente para o menos.', noErr: 'Nenhum erro de execução registrado ainda. 👏', wrongRedo: 'Questões para refazer',
    wrongTimes: w => ` · errou ${w}×`, whereGood: 'Onde você está tranquilo', goodScore: (s, r, t, so, e) => `${s}% · ${r}/${t} no teste · ${so}/${e} exercícios`,
    noGood: 'Quando uma aula passar de 75% de domínio, ela aparece aqui.',
    resetBtn: 'Zerar progresso', resetAsk: 'Apagar respostas, erros e exercícios resolvidos deste aparelho?', resetYes: 'Sim, zerar', resetNo: 'Cancelar',
    e_semi: 'Ponto e vírgula', e_chave: 'Chaves { } e parênteses', e_sintaxe: 'Sintaxe em geral', e_simbolo: 'Variável ou método não declarado', e_idx: 'Índice de vetor fora do limite',
    e_str: 'Posição inválida em String', e_div0: 'Divisão por zero', e_scanner: 'Leitura com Scanner', e_loop: 'Laço infinito', e_rec: 'Recursão sem caso base',
    e_npe: 'Uso de null (vetor não criado)', e_printf: 'Formatação do printf', e_classe: 'Programa com várias classes', e_outro: 'Outros erros',
    pvPrevAria: 'Voltar um passo', pvNext: 'Próximo ▸', pvResetAria: 'Recomeçar', pvStep: (i, n) => `passo ${i} de ${n}`, pvPause: '⏸ Pausar', pvAgain: '↺ De novo', pvPlay: '▶ Animar',
    rsReview: 'Revisão de véspera'
  },
  en: {
    docTitle: 'Lab II - Java',
    meta: 'Study platform for Programming Lab II (Java): lessons, interactive simulations, exercises and an editor that runs Java in the browser.',
    openLessonsAria: 'Open lessons', collapseAria: 'Collapse side menu', showSideAria: 'Show side menu', collapseTitle: 'Collapse/show menu',
    logoAria: 'Lab II - Java: go to Home', codeBtnAria: 'Open or close the code editor', codeBtnTitle: 'Code editor', themeAria: 'Toggle theme', langAria: 'Language',
    sideNavAria: 'Lessons', ideAria: 'Java editor', runTitle: 'Ctrl+Enter', run: 'Run', resetTitle: 'Back to the starting code', reset: 'Reset',
    copyTitle: 'Copy code', copy: 'Copy', gdbTitle: '100% real Java (paste the code there)', tabOut: 'Output', tabIn: 'Input (Scanner)', ctrlEnter: 'Ctrl+Enter to run',
    outInit: 'Write your code and click ▶ Run.', stdinPh: 'Type here what the program will read with Scanner, one value per line. E.g.:\n10\n5\n+',
    tabbarAria: 'Switch between lesson and code', tbLesson: 'Lesson', tbCode: 'Code', tbRun: '▶ Run', tbRunning: '… Running', runningWord: 'Running',
    lvF: 'Easy', lvM: 'Medium', lvD: 'Challenge',
    tRequiz: 'Quiz restarted', tReset: 'Progress reset', tDone: 'Lesson completed ✓', tSolved: 'Exercise solved ✓', tOpened: 'Code opened in the editor', tCodeReset: 'Code reset',
    tCopied: 'Code copied', tSelected: 'Selected — copy with the menu',
    sideLessons: 'Lessons', sideCount: (n, t) => `${n} of ${t} completed`, closeMenuAria: 'Close menu', navHome: 'Home', navProjects: 'Projects', navSummary: 'Summary', navProgress: 'Progress',
    progTxt: (n, t) => `${n} of ${t} lessons`, progTitle: 'View progress dashboard',
    openInEditor: 'Open in editor ▸', crumbUnit: u => 'Unit ' + u + ' · ', examTitle: '📝 What usually shows up on the exam', quizTitle: 'Quick quiz',
    quizIntro: 'Answer before moving on to the exercises. The feedback shows up right away.', requiz: '↺ Redo quiz', practice: 'Practice', solved: '✓ Solved',
    runExample: 'Run example', inLbl: 'Input (you type)', outLbl: 'Expected output', practiceBtn: '‹/› Practice', seeHint: 'See hint', hideHint: 'Hide hint',
    upNext: 'Up next', prevAria: t => 'Previous lesson: ' + t, prev: 'Previous', completed: 'Completed', complete: 'Complete', nextAria: t => 'Next: ' + t, next: 'Next',
    qRight: '✓ Correct!', qWrong: '✗ Not this one.', seeEx: 'See example', hideEx: 'Hide example', exampleSuffix: 'example',
    homeH1: 'Study Java by reading and coding at the same time',
    homeLead: n => `${n} short lessons across the three units of the course, each with examples that run here and exercises to practice in the editor.`,
    continueH: 'Pick up where you left off', openLesson: 'Open lesson →', unitWord: u => ' — Unit ' + u,
    startHere: '★ START HERE', eclipseT: 'Java in Eclipse', eclipseD: 'Install, create a project and a class, run, type in the Console, open ready-made projects and export the .zip to submit.',
    examSoon: 'EXAM COMING UP?', sum3: 'Summary of the 3 units', sum3d: 'Rules, code to memorize, hand simulations, classic mistakes and review cards — all on one page.',
    panelTag: 'DASHBOARD', yourProg: 'Your progress', yourProgD: 'See your mastery of each unit, where you slip most and what you already have under control.',
    unitsH: 'Units', unitUpper: u => 'UNIT ' + u, editorHowH: 'How to use the editor',
    edLi1: '<b>Open in editor</b> on the examples or <b>Practice</b> on the exercises loads the code ready to run.',
    edLi2Narrow: 'On your phone, switch between <b>Lesson</b> and <b>Code</b> in the bottom bar. The row of keys above the keyboard has <code>{ } ; "</code> and other symbols.',
    edLi2Wide: 'Run with <b>▶ Run</b> or <code>Ctrl + Enter</code>.',
    edLi3: 'If the program uses <code>Scanner</code>, write the values in the <b>Input</b> tab (one per line) before running.',
    edLi4: 'The code runs right in the browser and covers the Java of the course. For classes with objects, use the <b>↗ OnlineGDB</b> button.',
    edLi5: 'Your code is saved on this device, separately for each exercise.',
    solveAny: 'How to solve any exercise', plan8: '8-week plan',
    prCrumb: 'Going further', prH1: 'Projects to build', prLead: 'Bigger ideas that bring together the content of each unit. Start with the ones from the unit you are in and work your way up.',
    prUnit: u => 'Unit ' + u, prUses: 'Uses:', prStart: 'Start in the editor', prBefore: 'Before submitting any assignment',
    prLi: [
      'Variable and method names say what they hold/do (<code>totalSales</code>, not <code>x</code>).',
      'Consistent indentation: 4 spaces per level.', 'Each method does one thing; <code>main</code> only orchestrates.',
      'Test the edge cases: empty array, one element, negative values, zero.', 'Validate the user\'s input (division by zero, invalid menu option).',
      'Compare Strings with <code>equals</code>, never with <code>==</code>.', 'Array loop: <code>i &lt; v.length</code>, not <code>&lt;=</code>.'],
    prTplProject: 'Project', prTplUses: 'Uses',
    welcome: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello! This is your Java editor.");\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Line " + i);\n        }\n    }\n}\n',
    loaded: (title, hasIn) => `${title} loaded. ${hasIn ? 'The Input tab already has example values. ' : ''}Tap ▶ Run.`,
    keyUndo: 'Undo',
    compileErr: 'Compilation error', atLine: l => ' (line ' + l + ')', cantParse: 'I could not understand this code: ', ioCompileErr: 'compilation error',
    workerBlocked: 'This browser blocked the execution (Web Worker). Use the ↗ OnlineGDB button.\n',
    okMatch: '\n✓ Output matches the expected one — exercise solved!\n', noMatch: '\n○ The output is still different from the lesson example. Compare line by line.\n',
    ioRunning: 'running…', ioDone: ms => `✓ finished in ${ms} ms`, noPrint: '(the program printed nothing)', ioError: 'error', tapInput: '  (tap the Input tab)\n', atLineOut: l => `  line ${l}\n`,
    errWord: '\nError: ', runFail: 'execution failure', timeoutMsg: '\n⏱ Stopped after 6 seconds — probably an infinite loop (does the loop condition never become false?).\n', ioTimeout: 'timed out',
    outTooBig: 'Output too large — stopped (infinite loop?)',
    cannotFind: n => `cannot find symbol: '${n}'\n→ The variable or method '${n}' was not declared, or the name is spelled differently (case matters).`,
    notMethod: n => `'${n}' is not a valid method here — check the name and the type of the variable.`,
    syntaxErr: m => 'Syntax error: ' + m + '\n→ Check parentheses, braces and semicolons.', finalVar: 'A final variable cannot be changed.',
    declTwice: n => `Variable declared twice: ${n}\n→ In Java, you cannot declare the same name twice in the same block.`,
    startInfo: 'Write your code and tap ▶ Run.\nJava runs here in the browser. For classes with objects, use ↗ OnlineGDB.',
    ex_ArithmeticException: 'Integer division by zero. Check the divisor before dividing.',
    ex_ArrayIndexOutOfBoundsException: 'You accessed a position that does not exist in the array. Indexes go from 0 to length − 1 (use i < v.length).',
    ex_StringIndexOutOfBoundsException: 'Invalid position in the String. charAt/substring accept from 0 to length() − 1.',
    ex_IndexOutOfBoundsException: 'Invalid position in the list.',
    ex_NullPointerException: 'You used something that is null — an array or object that has not been created with new yet.',
    ex_InputMismatchException: 'Scanner expected a type (e.g.: an integer) but found something else in the Input tab.',
    ex_NoSuchElementException: 'The program tried to read more values than exist in the Input tab. Add the values there (one per line).',
    ex_NumberFormatException: 'That text cannot be converted into a number.',
    ex_StackOverflowError: 'Endless recursion. Check that the base case exists and that each call gets closer to it.',
    ex_IllegalFormatConversionException: 'In printf, %d is for integers and %f for decimals. Check that the type matches the variable.',
    cStr: 'Unclosed String — the closing double quote " is missing', cChar: "Unclosed char — the closing single quote ' is missing", cParenExtra: "extra ')'",
    cBraceExtra: "extra '}' — a brace was closed without being opened", cEof: n => `end of file with ${n} unclosed '{' brace(s) — a '}' is missing. Check that every if/for/method has its '}'.`,
    cParenMissing: "an opening parenthesis '(' is not closed", cSemi: "';' expected at the end of this line", cNoClass: 'I did not find the class. Start with: public class Main {',
    cManyClasses: (n, names) => `This editor runs one-class programs only (with static methods). I found ${n}: ${names}. For classes/objects, use the ↗ OnlineGDB button.`,
    cNoMain: 'The main method is missing: public static void main(String[] args) { ... }', cNewMain: c => 'Creating objects (new ' + c + '()) is not supported here. Use static methods or run it on OnlineGDB.',
    stOk: 'Solid', stAtt: 'Needs attention', stRev: 'Review', stNew: 'Not started', ringAria: p => `${p}% mastery`,
    pnCrumb: 'Dashboard', pnH1: 'Your progress',
    pnLead: 'The mastery of each lesson combines three things: the <b>quick quiz</b> (half of the weight), the <b>exercises solved</b> and the lesson being <b>completed</b>. The errors when running code show what you need to review.',
    kDone: 'Lessons completed', kAcc: 'Quiz accuracy', kAnswered: (a, t) => `${a} of ${t} answered`, kEx: 'Exercises solved', kExN: 'output equal to the example',
    kErr: 'Runs with errors', kErrN: n => `out of ${n} runs`,
    emptyB: 'No data yet.', emptyS: 'Answer a lesson\'s quick quiz or run an exercise in the editor and the dashboard starts to build itself.', startFirst: 'Start with the first lesson →',
    nextStep: 'Recommended next step', nsReview: 'Review', nsStart: 'Start',
    nsWeak: (s, redo, left) => `Mastery of ${s}% — ${redo ? 'redo the quick quiz and ' : ''}${left ? 'solve the exercises that are missing' : 'review the theory'}.`, nsFresh: 'It is the next lesson you have not opened yet.', goLesson: 'Go to lesson →',
    byUnit: 'Mastery by unit', moduleStart: 'Starting module', unitN: u => 'Unit ' + u,
    unitProg: (k, n) => k ? `${k} of ${n} lesson${n > 1 ? 's' : ''} started` : 'no lesson started',
    whereWrong: 'Where you slip most', errIntro: 'Errors when running code, from most to least frequent.', noErr: 'No execution errors recorded yet. 👏', wrongRedo: 'Questions to redo',
    wrongTimes: w => ` · missed ${w}×`, whereGood: 'Where you are solid', goodScore: (s, r, t, so, e) => `${s}% · ${r}/${t} on the quiz · ${so}/${e} exercises`,
    noGood: 'When a lesson passes 75% mastery, it shows up here.',
    resetBtn: 'Reset progress', resetAsk: 'Erase answers, mistakes and solved exercises on this device?', resetYes: 'Yes, reset', resetNo: 'Cancel',
    e_semi: 'Semicolon', e_chave: 'Braces { } and parentheses', e_sintaxe: 'Syntax in general', e_simbolo: 'Undeclared variable or method', e_idx: 'Array index out of bounds',
    e_str: 'Invalid position in a String', e_div0: 'Division by zero', e_scanner: 'Reading with Scanner', e_loop: 'Infinite loop', e_rec: 'Recursion without a base case',
    e_npe: 'Use of null (array not created)', e_printf: 'printf formatting', e_classe: 'Program with several classes', e_outro: 'Other errors',
    pvPrevAria: 'Back one step', pvNext: 'Next ▸', pvResetAria: 'Restart', pvStep: (i, n) => `step ${i} of ${n}`, pvPause: '⏸ Pause', pvAgain: '↺ Again', pvPlay: '▶ Animate',
    rsReview: 'Night-before review'
  }
};

// idioma: localStorage 'thoth:lang'; dentro de iframe (landing) vale o idioma da landing (sessionStorage), sem gravar a preferência
const EMBEDDED = window.parent !== window;
let LANG = 'pt';
(() => {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'pt' || q === 'en') {   // a landing manda ?lang=: embutido vale so na sessao; numa aba nova vira a preferencia
      if (EMBEDDED) sessionStorage.setItem('thoth:lang-embed', q); else localStorage.setItem('thoth:lang', q);
      try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
    }
    let v = EMBEDDED ? sessionStorage.getItem('thoth:lang-embed') : localStorage.getItem('thoth:lang');
    if (v !== 'pt' && v !== 'en') v = /^pt/i.test(navigator.language || '') ? 'pt' : 'en';
    LANG = v;
  } catch (e) {}
})();
const T = (k, ...a) => { const v = (I18N[LANG] && I18N[LANG][k] !== undefined) ? I18N[LANG][k] : I18N.pt[k]; return typeof v === 'function' ? v(...a) : (v === undefined ? k : v); };
// chaves do localStorage que dependem do idioma (rascunhos e arquivo aberto no editor)
const LK = k => LANG === 'en' ? k + ':en' : k;

function setLang(l) {
  try { if (EMBEDDED) sessionStorage.setItem('thoth:lang-embed', l); else localStorage.setItem('thoth:lang', l); } catch (e) {}
  location.reload();
}
// a landing manda o idioma por mensagem (só vale quando estamos dentro dela)
addEventListener('message', e => {
  if (!EMBEDDED || e.source !== parent || !e.data) return;
  const l = e.data.estudosLang;
  if ((l === 'pt' || l === 'en') && l !== LANG) { try { sessionStorage.setItem('thoth:lang-embed', l); } catch (er) {} location.reload(); }
});

// textos estáticos do index.html
function applyStatic() {
  document.documentElement.lang = LANG === 'en' ? 'en' : 'pt-BR';
  document.title = T('docTitle');
  const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = T('meta');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(',').forEach(pair => { const [a, k] = pair.split(':'); el.setAttribute(a, T(k)); }));
  document.querySelectorAll('#langMenu [data-l]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.l === LANG)));
}
