# Lab. Programação II — Plataforma de estudos Java

Aplicação web feita em HTML, CSS e JavaScript puro (sem framework e sem servidor) para estudar o conteúdo de Laboratório de Programação II. Reúne aulas, simulações interativas, testes rápidos, exercícios e um editor que executa Java direto no navegador.

## Como abrir

Dê dois cliques em `index.html`. Abre em qualquer navegador moderno, no computador ou no celular.
É preciso estar com internet na primeira vez, para carregar as fontes e o editor (CodeMirror).

## Funcionalidades

- **16 aulas**: um módulo de Eclipse e as três unidades da disciplina (fundamentos, busca e ordenação, modularização).
- **10 figuras explicativas** (fluxogramas do if e do for, caixas de memória, método como máquina, busca binária cortando ao meio, passadas das ordenações, recursão como bonecas russas).
- **17 visualizações interativas**: animações passo a passo de `for`, buscas sequencial e binária, Bubble e Selection Sort, pilha de recursão, passagem por valor e por referência, e um gráfico de complexidade.
- **Para a prova**: resumo do que costuma ser cobrado e teste rápido com correção imediata em cada aula.
- **Exercícios** com exemplo de entrada e saída esperada, dica e código inicial.
- **Editor Java** com destaque de sintaxe, entrada para o `Scanner`, mensagens de erro em português e interrupção de laço infinito.
- **Resumo das 3 unidades**: página única de revisão com regras, códigos-modelo, simulações à mão, erros clássicos e cartões de revisão.
- **Painel de progresso**: domínio por unidade e por aula (teste rápido, exercícios resolvidos e aulas concluídas), os erros mais frequentes ao programar, questões para refazer e próximo passo recomendado. Um exercício conta como resolvido quando a saída do programa bate com a saída esperada.
- **Progresso e código salvos** no próprio navegador (localStorage).
- **Movimento consistente**: transições entre aula e código, conteúdo que aparece ao rolar, destaque deslizante no menu e simulações que animam só o que mudou a cada passo.
- **Tema claro e escuro**, layout responsivo e barra de símbolos para programar no celular.

## Estrutura

```
index.html            estrutura da página
css/style.css         tema (variáveis CSS), layout, componentes e responsivo
js/conteudo.js        aulas, exercícios, projetos, resumos e testes (dados)
js/java-lite.js       tradutor Java → JavaScript e runtime das classes Java
js/visualizacoes.js   simulações e gráficos interativos
js/modulo-eclipse.js  aula e simulador do Eclipse
js/progresso.js       registro de desempenho e painel de progresso
js/resumo.js          resumo de revisão das 3 unidades
js/app.js             navegação, editor, execução e estado
```

## Como o editor executa Java

O navegador não roda Java. Por isso, `java-lite.js` funciona como um compilador didático:

1. Faz uma checagem de sintaxe, apontando `;` faltando e chaves ou parênteses sem fechar.
2. Traduz o Java para JavaScript, respeitando as regras da linguagem que a disciplina cobra: divisão inteira, conversões de tipo (`(int)`, `(double)`), vetores com checagem de índice e impressão de `double` como `8.0`.
3. Executa o resultado num **Web Worker** (uma linha de execução separada). Assim, um laço infinito é interrompido após 6 segundos sem travar a página.
4. Recria em JavaScript as classes usadas na disciplina: `Scanner`, `String`, `Math`, `Arrays`, `ArrayList`, `StringBuilder` e as exceções (`ArithmeticException`, `ArrayIndexOutOfBoundsException`, …).

**Limitação**: funciona com programas de uma classe com métodos `static`, que é o escopo da disciplina. Para programas com vários objetos, o editor oferece um atalho para um compilador Java completo (OnlineGDB).

## Bibliotecas externas

- [CodeMirror 5](https://codemirror.net/5/), para o editor de código (carregado via cdnjs).
- Fontes Geist, Geist Mono e JetBrains Mono, do Google Fonts.
