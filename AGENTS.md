# Instruções do projeto

## Desenvolvimento

- Desenvolver o aplicativo NASA-FARM-2026, com prioridade para celular.
- Consultar `docs/content.md` e as seções pertinentes de `docs/product-definition.md` antes de propor fluxos ou implementar funcionalidades.
- A definição de produto é uma referência local congelada. Não consultar novamente nem modificar o Google Docs sem solicitação. Instruções atuais do usuário prevalecem sobre essa referência; não reescrever silenciosamente a cópia congelada.
- O documento menciona capacidades e arquivos de outro contexto. Não declará-los existentes sem verificar sua implementação neste projeto.
- O protótipo está preservado em `.mock/`, ignorado pelo Git. Não versionar essa pasta nem forçar sua inclusão. Usá-lo como referência visual e de interação, sem reaproveitar seu código nem tratar estados simulados como funcionalidades de produção.
- Seguir a decisão de 15/11/2026 em `docs/versao-evento.md`: aplicação Web com abordagem PWA desde o início e implementação nova, sem reaproveitar o código do mock. Distinguir decisões confirmadas de recomendações técnicas e recortes ainda propostos nesse registro. Não há necessidade inicial de subagentes.
- Stack confirmada: Next.js + TypeScript. Interface em `src/frontend`, servidor em `src/backend`, contratos em `src/shared`, páginas e endpoints em `src/app`. Primeiro incremento: sete dias de previsão em Planejar rotação. NASA/IBGE e modelos agronômicos entram em discussão posterior.
- Continuação autorizada: Início e Meu plano também implementados. Ler `docs/continuidade.md`. `FarmProvider` no layout é a fonte compartilhada; não criar estados independentes de previsão, escolha ou cultivo em cada tela. Cultivo atual é informado pelo usuário e não deve ser confundido com o próximo cultivo escolhido em Planejar. Mudanças e relatos persistem localmente, sem sincronização de servidor.
- Reutilizar `docs/design-system.md` e os tokens/componentes compartilhados. Priorizar desenhos e áudio, rótulos curtos (Ouvir, Ligar, Trocar), uma pergunta por bloco e confirmação visual. Áudio atual usa síntese do navegador; não garante offline. Telefonia ainda indisponível.
- Antes de criar ou alterar interfaces, consultar a página web `/design-system` e `docs/design-system.md`. O catálogo em `src/frontend/design-system/DesignSystem.tsx` usa os componentes reais e os tokens de `src/frontend/ui/tokens.css`; reutilizá-los, sem criar versões independentes por tela. Se surgir um padrão compartilhado novo ou uma mudança visual, atualizar o componente, o catálogo e a documentação na mesma alteração. Manter os exemplos isolados, sem salvar relatos ou intenções. `/design-system` é referência de desenvolvimento, fora da navegação principal do produtor.

## Produto e experiência

- Foco em rotação de hortaliças: comparar sequências, janelas e compromissos para uma área/canteiro. Clima, água, solo, vegetação e produção regional são evidências de apoio.
- Manter cinco telas principais: Início, Planejar rotação, Meu plano, Alertas e conversas e Minha área. Detalhes, edição e confirmação ficam no contexto; preferências e ajuda são apoio secundário.
- Preservar a Home V1 como referência visual. A avaliação positiva não equivale à validação agronômica ou a teste de acessibilidade com o público.
- A Home orienta o acompanhamento do cultivo e a próxima operação. Análise completa pertence a Planejar rotação. Calendário e registros são apoio secundário.
- Usar português simples, texto legível, contraste, controles amplos, desenhos e áudio. Evitar tabelas largas e rolagem horizontal no fluxo principal.
- Oferecer caminhos para voltar, corrigir, recusar e adiar, com poucas decisões por etapa.
- Contemplar o fluxo alerta → solicitar ligação → conversa contextualizada → confirmação → resumo em áudio, permitindo também participação pela tela. Só confirmar ações externas quando realizadas.

## Evidências e decisões

- Distinguir informação ausente, histórico, previsão, relato, estimativa e resultado observado. Não apresentar valores fictícios como cálculos ou promessas de economia, produtividade ou recuperação do solo.
- Não aplicar dados de Sorriso a Mogi das Cruzes nem extrapolar dados municipais para o canteiro. Conteúdos fixos do protótipo não representam condições atuais.
- Aparência relatada do canteiro não é sensor de umidade, diagnóstico, dose de água ou estimativa de perda. Reunir informações antes de propor mudanças quantitativas de irrigação.
- Marcar Já conferi representa uma conferência relatada; não registra rega ou manejo. Não sei mantém pendência. Abrir um painel ou pedir ligação não conclui uma tarefa.
- Explicações devem ligar evidência, ação, impacto esperado, condição de execução e forma de conferir o resultado.
- Preservar escolhas diante de mudanças de contexto e indicar revisão necessária. Separar intenção confirmada, execução relatada e benefício medido.
- Tratar informação ausente, previsão vencida, contexto alterado e falhas de chamada de forma explícita, sem inventar operações externas.
- Offline e sistemas integrados permanecem extensões opcionais.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
