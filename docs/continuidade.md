# Continuidade — Início, Planejar e Meu plano

Correção de destino em 15/11/2026: o usuário esclareceu que quer ver a demonstração preenchida em **agroloop-dev.vercel.app**, seu endereço principal de desenvolvimento. A configuração explícita DEMO_MODE=true habilita os mesmos dados nesse projeto, inclusive no alvo que a Vercel chama de Production. Sem a configuração, a ativação automática continua restrita a Preview. Chaves separadas agroloop:demo:* preservam as anotações normais. A referência congelada permanece intacta.


## Demonstração Vercel e sino — 15/11/2026

Correção autorizada: o sino mantém um ponto visível quando há avisos, sem legenda nem número. O nome acessível inclui a quantidade. Catálogo demonstra estados com e sem pendência.

A pedido do usuário, deployments Preview da Vercel abrem preenchidos: oito meses do histórico fictício existente, área/água/solo de exemplo, alface atual, relato de aparência, conferências e três próximos cultivos com meses. Na primeira abertura, três intenções de dia usam somente um snapshot Open-Meteo real e válido; na falha ou previsão vencida, não inventar clima nem criar essas intenções. A última intenção inclui contexto anterior para exercitar revisão e aviso. O aviso de demonstração identifica relatos e planos como exemplos; NASA/Open-Meteo mantêm fontes e limites.

FarmProvider continua sendo a fonte compartilhada. Ativação exclusivamente por VERCEL_ENV=preview no layout servidor; produção e desenvolvimento local padrão não carregam exemplos automaticamente. Dados de demo usam chaves agroloop:demo:* separadas de agroloop:*. Inicialização só em armazenamento vazio; recarregar e navegar preservam edições, exclusões e escolhas. Registros e escolhas continuam locais ao navegador, sem sincronização de servidor.


Integração de 15/11/2026: a tradução para inglês preserva o nome próprio **meu plantio**, o l em árvore, o símbolo, os ícones e as chaves locais. Título principal: Meu plantio · My garden. O catálogo da marca também está em inglês.


## Marca Meu plantio — 15/11/2026

Nome solicitado: **meu plantio**, em minúsculas. O usuário rejeitou a primeira proposta de p plantado e pediu trocar o **l por uma árvore**. A marca atual mantém o l tipográfico como tronco, acrescentando uma copa. As outras letras preservam a fonte e a linha de base. O l em árvore permanece no nome. A pedido do usuário, acrescentado um símbolo independente: broto sobre um canteiro, em verde profundo, creme e verde-claro dos tokens. O símbolo aparece ao lado do nome no cabeçalho, no favicon e na instalação. Não representa uma condição agronômica ou indicação de cultivo de árvores.

`Brand`, `BrandWordmark`, `BrandMark` e `TreeL`, em `src/frontend/ui/Brand.tsx`, são compartilhados entre o cabeçalho e `/design-system#brand`, com cores e tipografia dos tokens existentes. Fonte vetorial única em `public/brands/meu-plantio.svg`, com PNGs 192 e 512 px derivados. Catálogo demonstra o símbolo em 24, 40, 64 e 80 px. Metadados e nome de instalação usam Meu plantio. Chaves locais legadas `agroloop:*` preservadas para manter planos e relatos. A referência de produto congelada não foi alterada.


Ajuste solicitado em 15/11/2026: Meu plano usa VoiceActions logo após o título, com Ouvir e Ligar lado a lado, igual ao Início. Ouvir lê a sequência preenchida e a intenção guardada; Ligar abre o mesmo CallSheet existente. O acesso representa a futura conversa contextual sobre os dados, sem simular ligação ou criar integração de telefonia.


## Fontes ambientais conferidas e pontos sustentados — 15/11/2026

A pedido do usuário, revisados `.locals/dados-base/LEIA-ME.txt`, manifesto, respostas, procedências e tabela XLSX original do MapBiomas, além das séries mais recentes em `data/nasa`. Os pontos aleatórios de solo, sucessão, disponibilidade de água e calendário foram substituídos por referências ambientais calculadas sobre os dados disponíveis. Mantidos cultivo atual, ordem e meses preenchidos.

- NASA POWER 2021–2025: temperatura média diária T2M e chuva PRECTOTCORR em `data/nasa/mogi-2021-2025.json`; radiação ALLSKY_SFC_SW_DWN/SYN1DEG em `mogi-solar-2021-2025.json`. Séries completas por mês/ano; faltas não viram zero. Temperatura usa faixas técnicas já existentes com limites de variedade/fase explícitos. Chuva é intervalo entre totais mensais anuais; radiação, intervalo entre médias diárias mensais. Fontes, parâmetros, período, unidade, escala municipal e link aparecem ao abrir; fonte e período ficam no subtítulo.
- Open-Meteo: tempestade/rajadas somente no primeiro próximo cultivo, no mês atual e com previsão válida. Usa o mesmo snapshot do FarmProvider. Não estende sete dias aos meses seguintes.
- MapBiomas: existe tabela municipal de irrigação, mas nenhuma ocorrência de Mogi das Cruzes ou código 3530607 foi encontrada no XLSX original. Não sustenta ponto do canteiro neste recorte. Não preencher com município vizinho ou total nacional.
- SoilGrids: todas as propriedades solicitadas retornaram valores nulos; nenhum ponto de fertilidade, textura ou dose foi gerado dessa resposta.
- HLS/SMAP/IMERG/ECOSTRESS: catálogos/metadados adquiridos; pixels não extraídos. Não sustentam vigor, umidade ou evapotranspiração medida no canteiro.
- IBGE: estatísticas municipais adquiridas são contexto produtivo, não predição de produtividade, sucesso ou compatibilidade da sequência. Conab/Cepea têm páginas/documentação, sem série estruturada integrada.

`buildRotationStages` agora recebe as evidências consultadas; não sorteia alertas e não usa relato de solo/água como substituto de dado ambiental. O histórico NASA é referência para conferir o mês escolhido, não previsão sazonal ou validação agronômica. Sem mês, pede a época; durante consulta e na falta de dados, mostra pendência explícita. Áudio individual e catálogo usam os mesmos resultados; o resumo geral lê a sequência sem inventar análise indisponível. Nenhum arquivo de `.locals` foi versionado, modificado ou baixado novamente.


Origem dos pontos — 15/11/2026: o subtítulo de cada ponto reúne assunto e Base: fonte. O gerador mockado identifica Plano informado (cultivo e mês), Água informada, Solo informado ou Histórico do canteiro somente quando esses dados são de fato usados na explicação. A expansão e o áudio detalham o relato ou registros usados e os limites. Campos ausentes não recebem fonte local inventada. NASA POWER e Open-Meteo continuam identificados nos painéis climáticos reais; não são atribuídos como origem das predições aleatórias. Subtítulos permitem quebra de linha, sem cortar a procedência. Catálogo usa o mesmo componente/gerador.


Refinamento solicitado em 15/11/2026: Editar, com lápis e alvo de 48 px, fica à direita de Sua rotação, no cabeçalho compartilhado RotationHeading. Sem cultivos, a ação é Planejar. Removido o botão largo abaixo da linha do tempo; linha e marcadores preservados. Catálogo usa o mesmo cabeçalho e abre o editor isolado.

Removida Minhas anotações de Meu plano: os relatos permanecem no histórico do canteiro em Minha área, sem excluir dados. O atalho Ver anotações da Home passa a `/minha-area#historico`. Meu plano mantém somente o histórico de dias/intencões como apoio, distinto dos relatos de campo.


Ajuste de 15/11/2026: em Meu plano, o painel climático abre por **um ícone de termômetro dentro do cartão de cada próximo cultivo**, com nome acessível e tooltip Analisar temperatura. Removido o selo Conferir/Na faixa solto abaixo dos pontos. RotationTimeline aceita renderCardAction; CropClimateBadge usa a variante inCard, neutra e com alvo de 48 × 48 px, preservando o painel, dados, fontes e áudio. O editor de escolha continua com os selos térmicos existentes. Catálogo demonstra a variante real no cartão, sem gravar dados.


## Correção: predições sobre o plano preenchido — 15/11/2026

Verificação: 32 testes, TypeScript e build passaram. Leitura do navegador localhost confirmou a sequência e os meses preenchidos no aparelho, seis pontos mockados ligados às três etapas, 43 anotações preservadas e ausência da faixa/alternância de demonstração. A conferência foi somente leitura, sem modificar esses dados.

O usuário corrigiu a interpretação: a linha usa sempre cultivo atual, próximos cultivos e meses efetivamente preenchidos no FarmProvider. Removidos o cenário fixo, a faixa de demonstração e a alternância entre exemplo e plano. `examplePath` legado permanece guardado para compatibilidade, mas não controla mais a visualização. Anotações, dias e edição permanecem disponíveis.

`buildRotationStages` mantém a sequência e acrescenta apenas pontos preditivos mockados, variados por cultivo/mês/posição com semente estável. Não há modelo preditivo ou diagnóstico real. Textos condicionais não fabricam laudo, medidas, doses, produtividade ou resultados NASA. Sem mês, pede escolher a época; sem cultivo atual, mantém informação ausente. Os painéis NASA/Open-Meteo continuam reais e separados do gerador de exemplos. Os mocks ficam documentados no código e neste registro, sem faixa de demonstração no fluxo do produtor, conforme solicitado. Catálogo usa o mesmo gerador sobre dados isolados.


## Meu plano como destino único da rotação — decisão de 15/11/2026

Verificação desta integração: 30 testes e TypeScript passaram; build de produção passou. No navegador mobile, origem isolada 127.0.0.1, conferidos: sequência e meses anteriores preservados; abrir cenário completo e explicação de calor; reabrir com cenário ativado; Voltar ao meu plano recupera escolhas; editar rotação; preparar Cenoura/Novembro já com Semear; confirmar dia em painel sobreposto; retornar à mesma página com dia guardado e histórico; abrir previsão compartilhada; `/planejar` redireciona a Meu plano. A largura observada foi 375 px sem transbordamento. Não houve alteração nos dados de localhost nem publicação. Áudio usa síntese existente; reprodução sonora e validação com agricultores não foram testadas.

A previsão real também fica disponível pelo botão secundário Ver previsão de sete dias em Meu plano, reutilizando ForecastPreview no painel. Avisos apontam para esse acesso. O fluxo de dia e operação é apoio contextual, sem cabeçalho ou navegação próprios.

O usuário autorizou integrar exploração, escolha e acompanhamento em Meu plano, simplificando a organização anterior que separava Planejar. Esta decisão prevalece sobre os registros históricos abaixo; a definição de produto congelada permanece intacta. `/planejar` e `/planejar/rotacao` redirecionam para `/meu-plano`. Início e Minha área levam à rotação nesse destino.

Uma única `RotationTimeline` apresenta cultivo atual, cultivos seguintes e meses, com os desenhos e a linha compartilhada de `plan-path.module.css`. `RotationPlan` lê e grava pelo FarmProvider. Editar rotação usa o mesmo NextCycles; Voltar descarta o rascunho, Guardar mantém intenção local. Cultivo atual é corrigido dentro do contexto da linha. Removidas as seções duplicadas No canteiro, Próximos cultivos, Operação com dia e Cultivo e operação da página antiga.

Preparar plantio abre o fluxo de operação e sete dias num Sheet em Meu plano, somente no primeiro próximo ciclo das três culturas já suportadas quando seu mês corresponde ao mês atual. Não supõe ano ou duração. Dias já guardados e histórico de escolhas permanecem acessíveis como apoio recolhido; nenhuma intenção ou anotação é apagada. Anotações continuam secundárias.

Ver exemplo dos próximos meses ativa um cenário identificado de novembro/2026 a agosto/2027: alface → tomate → feijão-vagem → cenoura → cebola. Sete pontos contextualizados abordam calendário, calor, laudo fictício de solo, chuva/acesso, sucessão de famílias, água e variedade. Cada ponto abre evidência fictícia, impacto condicional, ação, forma de conferir e áudio. Não há previsão de benefício, dose, perda ou duração calculada.

O cenário substitui somente a visualização da linha, com faixa Cenário de demonstração e Voltar ao meu plano. Usa o campo separado `examplePath` já existente como preferência de exibição; não altera cultivo, ciclos, meses, relatos ou revisões. Exemplos antigos já ativados passam a abrir o cenário ampliado, preservando o objeto antigo. Dados e anotações reais ficam fora da visualização demonstrativa. Não misturar predição mockada com NASA: o cenário é autoral e não é resultado das APIs; o plano real conserva os painéis NASA POWER e a previsão Open-Meteo, quando cabível.

Catálogo `/design-system#caminho` usa RotationTimeline real com o cenário completo, isolado e sem gravação. Exemplo editável demonstra a mesma linha e o editor NextCycles em memória.


## Meses e linha do tempo — 15/11/2026

Verificação: TypeScript, 29 testes e build passaram. No celular, em origem local isolada (127.0.0.1), Cebola/Novembro e Feijão-vagem/Fevereiro permaneceram após recarregar e reabrir o editor; mudar para Julho e Voltar preservou Novembro. Escolhas antigas mostraram Mês a definir antes da edição. Prévia em `docs/previews/cultivos-meses-mobile.png`. Dados existentes de localhost não foram editados. Linha compartilhada ajustada para unir os centros dos marcadores, sem segmento acima do primeiro ou abaixo do último.

Próximos cultivos mantém a linha do tempo, agora com os mesmos cartões, marcadores e estilos de Cultivo e operação (`plan-path.module.css`), sem setas de texto. RotationSequence recebe meses por etapa; catálogo demonstra Novembro e Fevereiro no componente real.

Cada ciclo tem Mês planejado no editor NextCycles. Guardar persiste `nextCycleMonths` junto de `nextCycles`, pelo FarmProvider, em todas as entradas (Planejar, Meu plano e Minha área). O mês aparece na sequência e no resumo da Home/áudio. Escolhas antigas permanecem com Mês a definir; não atribuir o mês atual automaticamente. Voltar descarta meses e cultivos do rascunho; remover etapa limpa seus meses e os das etapas seguintes. Contexto alterado preserva a intenção e pede revisão.

O mês é intenção informada pelo usuário e também contextualiza a consulta climática; não é janela validada, dia, ano, duração calculada ou plantio executado. Este registro substitui o limite anterior em que o mês consultado não era salvo.


## Clareza do percurso — 15/11/2026

Verificação desta rodada: TypeScript, 28 testes e build Next.js de produção passaram. No navegador em largura mobile, conferidos Home → Planejar, sequência preexistente e aviso de revisão em localhost, escolha de dois ciclos na origem isolada 127.0.0.1, painel NASA/temperatura/água, fontes e retorno, Guardar, consulta em Meu plano após recarregar e descarte de um terceiro ciclo com Voltar. Dados preexistentes de localhost não foram alterados. Largura de conteúdo igual à viewport na inspeção (375 px), sem transbordamento horizontal. Prévia: `docs/previews/clareza-meu-plano-mobile.png`. Reprodução sonora e teste com agricultores não foram realizados.

- Home: acesso visível a Planejar próximos cultivos; cartão de próximo ciclo usa `farm.nextCycles`, sem confundir o dia guardado com a sequência. Frase explicativa abaixo do título removida a pedido do usuário; sem slogan substituto nesta rodada.
- Planejar e Meu plano: `CyclePlan` compartilha a apresentação `CyclePlanCard` e abre o editor `NextCycles` existente. Sem estado independente de cultivos/previsão: leitura e gravação pelo FarmProvider. Nenhuma migração, limpeza ou substituição automática dos dados locais.
- Meu plano: sequência efetivamente guardada, até três cultivos, com ordem e datas a definir. Operação com dia aparece separada; exemplo de avisos permanece identificado e não substitui a sequência guardada.
- Percurso: conferir canteiro/histórico em Minha área → Home/Planejar → escolher figuras → abrir selo climático, conferir evidências NASA/previsão e limites → Guardar ciclos → Ver em Meu plano → Rever cultivos. O retorno Voltar descarta somente o rascunho. Mudanças de contexto preservam ciclos e pedem conferência.
- Catálogo: cartão real e editor isolados, com estado apenas em memória. Documentação histórica abaixo registra etapas anteriores, não substitui este recorte.

Limites mantidos: época consultada não é persistida como janela; sequência não recebe validação agronômica integrada. NASA é contexto regional histórico, previsão vem de Open-Meteo. Solo/água/histórico local exigem conferência. Persistência no navegador, sem sincronização, telefonia ou garantia de áudio/offline. Esta rodada não publica nem verifica critérios de submissão do evento.

Atualização em 15/11/2026: Meu plano ganhou um desenho de caminho vertical com avisos associados à etapa. O estado real segue sem alertas preditivos enquanto NASA POWER e solo não alimentarem um método. **Ver exemplo de avisos** carrega duas demonstrações em `examplePath` no mesmo IndexedDB, isoladas do cultivo, intenção e relatos reais; uma vez carregadas, aparecem no fluxo principal e podem ser retiradas. Jornada: `docs/jornadas/04-acompanhar-plano.md`.

## Minha área — integração na versão principal

Revisão solicitada após integração: Minha área ganhou aba própria na barra inferior, espaçamento compartilhado de ações e histórico compacto com detalhes recolhidos. Dados fictícios podem ser carregados explicitamente pelo painel Para experimentar, persistidos no IndexedDB. O carregamento é único, preserva registros anteriores e não cria previsão ou benefício agronômico fictício. A prévia continua na porta principal 3018.

Verificação da revisão: 15 testes, TypeScript e build passaram. Na prévia 3018, o histórico de exemplo foi efetivamente carregado e permaneceu após recarregar; foram conferidos filtro de Cenoura, ações ao expandir e navegação Início → aba Minha área. Registros anteriores continuam disponíveis. O banco é o IndexedDB do navegador usado nessa prévia; outros navegadores podem carregar o mesmo conjunto em Para experimentar.

Integração na branch `master` autorizada pelo usuário em 15/11/2026. A implementação foi preparada em `codex/minha-area`; passa a compor o app principal. O registro abaixo descreve a preparação e a verificação nesse worktree.

Em `codex/minha-area`, `/minha-area` passa a ser acessível pelo cabeçalho de Início e Meu plano. Arquivo próprio `src/frontend/area/AreaScreen.tsx`, canteiro ilustrado por cultivo, nome/tamanho/água/solo editáveis, atividades compartilhadas com correção e exclusão e histórico de observações. Uma área, armazenamento local, sem sincronização. O cadastro da localização continua posterior; Mogi permanece referência meteorológica explícita. Jornada e fluxo contínuo em `docs/jornadas/01-informar-area.md`.

Observações passam a ser preservadas no histórico; dados antigos sem esse campo continuam legíveis. Corrigir ou excluir um plantio exige conferir cultivo e plano, preservando a intenção anterior. Apagar dados do canteiro remove apenas nome/tamanho/água/solo, com explicação e confirmação; mantém cultivo, plano e histórico.

Verificação: TypeScript, 14 testes e build de produção com Webpack passaram. No navegador, foram conferidos cadastro de nome/tamanho, confirmação do cultivo, criação de rega, correção para colheita, reabertura e presença do relato corrigido na Home. Exclusão e migração de dados antigos foram verificadas nos testes de transição. Prévia em `docs/previews/minha-area.png`; dados criados na consulta são identificados como Canteiro de teste. Servidor de revisão do worktree em `http://localhost:3020/minha-area`.

Atualização em 15/11/2026. O usuário solicitou conectar as três telas antes de aprofundar o planejamento, preservando a direção visual da Home do mock. Implementação nova, sem reaproveitar seu código. A referência escrita orienta o conteúdo; o mock é apoio de experiência.

## Estado entregue

- `/`: Início com orientação por áudio, O que fazer hoje, quatro respostas ilustradas do canteiro, conferências explícitas, previsão regional real expansível, próximo ciclo, acesso ao plano e registro de campo.
- No topo de Início, `VoiceActions` apresenta Ouvir e Ligar lado a lado. Ouvir lê o resumo atual; Ligar abre a indisponibilidade de telefonia sem iniciar uma chamada.
- `/planejar`: consulta de sete dias e escolha condicional de cultivo, operação e dia. Confirmar guarda a intenção e abre `/meu-plano`.
- `/meu-plano`: cultivo informado, próxima intenção, sequência visual curta, revisão, registros de campo e histórico de escolhas. Pode rever a escolha ou anotar uma atividade.
- Barra inferior: Início, Meu plano e Avisos. Avisos abre um painel meteorológico baseado na previsão válida, com Ligar indisponível. Não é uma implementação completa da futura tela Alertas e conversas.
- O cabeçalho abre a conferência do cultivo atual. Não equivale à futura Minha área completa, nem identifica uma propriedade real. O ponto meteorológico permanece uma referência municipal de Mogi.

## Dados e responsabilidade

`src/frontend/state/FarmProvider.tsx` fica no layout e compartilha o snapshot meteorológico, a intenção atual, o histórico, os relatos locais e a revisão. Navegação via Next Link preserva esse estado; IndexedDB permite recuperá-lo ao reabrir online. A consulta só acontece ao carregar a aplicação ou pedir atualização, sem uma nova aquisição por troca de tela.

`src/shared/farm.ts` contém schemas e transições puras. `src/frontend/storage/planning.ts` guarda intenção e histórico na mesma transação. `FarmProvider` usa atualização transacional para os relatos. Não há banco de servidor, conta ou sincronização entre aparelhos.

Separações indispensáveis:

- Cultivo atual é informado e confirmado no contexto da área. Inicialmente desconhecido; não presumir alface em cultivo nem criar histórico de tomate.
- Próximo cultivo e dia guardado são intenção. Não mudam o cultivo atual nem registram plantio.
- Seco, Úmido e Com poças são relatos de aparência, não sensor, diagnóstico ou dose. Não sei mantém a observação pendente.
- Confirmar outra observação reinicia as conferências anteriores. Relatos e conferências diários não se transferem para o dia seguinte em São Paulo.
- Já conferi é uma marcação explícita, distinta de Reguei. Abrir orientação, ouvir, visitar o plano ou tocar em Ligar não conclui tarefa.
- Plantei é relato de evento, pede rever cultivo e plano, preserva a escolha anterior e suspende os passos dependentes. Não troca o cultivo silenciosamente; a pessoa deve conferir qual cultivo está presente. Planejar permite ver o tempo, mas bloqueia guardar outro dia até essa conferência.
- Reguei não calcula volume nem conclui a conferência. Colhi não encerra automaticamente o cultivo. Datas futuras de execução não são aceitas.
- Corrigir cultivo, registrar plantio, expirar a previsão ou receber outro snapshot pode exigir revisão. A intenção anterior permanece consultável.

## Áudio e interface

Mesmos tokens e componentes nas telas. Mais detalhes em `design-system.md`. Textos curtos, desenhos, áudio por toque e confirmação visual. Sem avisos de demonstração/protótipo na tela ou na fala. Indisponibilidade de ligação e falha de consulta são mensagens de função, sem ações externas simuladas. Áudio usa Web Speech; não requer LLM nem serviço de voz contratado e não garante offline.

## Escopo que continua posterior

NASA POWER/IBGE, comparação de sequências, modelo agronômico, benefício quantitativo, demanda hídrica, telefonia, notificações remotas e offline completo. Não confundir os sete dias de meteorologia com previsão de safra. A definição congelada em `product-definition.md` não foi reescrita.

## Desenvolvimento e verificação

`npm run dev`, `npm run test`, `npm run typecheck`, `npm run build`. Prévia de produção nesta sessão em `http://localhost:3018/`; mock em `http://127.0.0.1:5174/`. Se os processos encerrarem, reiniciar a aplicação com `node node_modules/next/dist/bin/next start --port 3018` após build; mock com Vite em `.mock/`.

Onze testes passaram, incluindo transições de observação desconhecida, troca de dia, novo plantio sem troca silenciosa de cultivo, rega/colheita sem conclusão implícita, datas futuras, migração da intenção anterior e revisão após correção. TypeScript e build passaram. Percurso no navegador conferiu: informar cultivo → Não sei continua pendente → anotar Reguei na Home → mesma anotação em Meu plano → escolher Tomate e outro dia em Planejar → confirmação abre Meu plano mantendo Alface atual → intenção e rega preservadas após reabrir.

Início e Meu plano também foram inspecionados em largura de 320 px, sem rolagem horizontal. Prévia visual em `previews/home-connected.jpg` e `previews/plan-connected.jpg`. Não sei fica com destaque de pendência, sem marca visual de concluído. Não houve teste de compreensão com agricultores.

Próxima discussão: melhorar o conjunto com o usuário e aprofundar o valor dos dados na rotação, sem avançar automaticamente para integrações ou modelos não solicitados.

## Exploração de rotação — três perguntas, 15/11/2026

Recorte fechado com o usuário: clima (31), histórico (30) e solo (desdobramento apoiado na 49); água/rotina (35) permanece pendente. `/planejar/rotacao` oferece dois caminhos ilustrativos. O terceiro cartão trata solo sem análise local; nenhum valor de solo é inventado. Os três cartões usam RotationEvidence e o conteúdo versionado `rotation-mock.ts`; cada caminho muda explicação, próximo passo e acompanhamento, inclusive em áudio. Catálogo atualizado com exemplos isolados.

Documentação consolidada: [predicao-tres-perguntas.md](predicao-tres-perguntas.md), com dores, dados, fontes, situação, exemplos e correspondência direta com os campos da tela. Sem nova integração, laudo, diagnóstico, modelo ou mudança na persistência. Definição congelada e Google Docs não alterados.

## Prévia local consolidada — 15/11/2026

A porta principal é **3018**, na pasta principal `NASA-FARM-2026`, branch `master`. `npm run dev` e `npm run start` usam essa porta explicitamente; executar um de cada vez. O servidor exploratório da porta 3021 foi encerrado. Não foi criado worktree para a rotação: a porta extra era um processo de desenvolvimento na mesma pasta. O worktree antigo de Minha área não motivou essa duplicação.

O processo antigo da 3018 servia HTML desatualizado e um dos chunks JavaScript retornava 500 após troca de build. Ele foi encerrado e substituído pelo dev com código atual. Navegador confirmou sete dias de previsão carregados, contexto local preservado e navegação Comparar caminhos para as três perguntas. HTTP da previsão retornou 200. Atualizar/reabrir páginas antigas para obter o código corrente. Endereço de revisão: http://localhost:3018/planejar.

## Rotação integrada em Planejar — 15/11/2026

Correção solicitada pelo usuário: remover a entrada intermediária Comparar caminhos. Planner agora exibe RotationExplorer diretamente em `/planejar`: duas sequências ilustrativas, três perguntas e revisão. Abaixo, Seu próximo passo reúne a operação e o tempo dos sete dias. A ajuda descreve o percurso integrado. `/planejar/rotacao` redireciona para `/planejar` para preservar links antigos. Mesmos dados e áudio mockados; confirmação da operação real e persistência existentes mantidas. Prévia única na porta 3018.

## Base para commit — 15/11/2026

Dicionário de campos e fornecedores em [dicionario-dados-rotacao.md](dicionario-dados-rotacao.md), vinculado à especificação das três perguntas e ao README. Separa códigos e unidades das APIs, contratos locais existentes e campos futuros propostos. Detalhes de dados na interface mantidos por decisão do usuário, com revisão de linguagem posterior.

Validação da base: 15 testes existentes passaram; TypeScript e build passaram na integração visual; diff check sem erros. Prévia e previsão verificadas na porta 3018. Comparação agronômica permanece mockada, sem afirmar conclusão de motor preditivo ou validação com produtores.


## Avisos — acesso superior e lista, 15/11/2026

Pedido atual: mover Avisos da barra inferior para o canto superior direito e abrir uma lista ao tocar. Implementado `/avisos` com AppFrame, HeaderActions compartilhado também em Planejar, itens expansíveis com áudio e acesso ao plano/previsão, estados vazio/carregando e atualização pela consulta existente. Barra inferior agora tem Início, Meu plano e Minha área.

`src/shared/notices.ts` deriva avisos do contexto compartilhado: tempestade regional somente com previsão válida; revisão do cultivo/plano; previsão ausente ou vencida como pendência. Não inventa avisos agronômicos nem importa exemplos de NASA/solo como notificações reais. A contagem representa pontos para conferir, não mensagens não lidas. Não cria persistência paralela, histórico, notificações remotas ou chamada. Abrir a lista não muda cultivo, intenção ou conferências.

Verificação desta entrega: TypeScript, 18 testes e build de produção passaram. No Brave, conferidos sino → lista → detalhe → Ver dias → Planejar, retorno pelo sino e indisponibilidade de Ligar. Layout inspecionado em 320 e 390 px. Prévia em `docs/previews/avisos.jpg`.

Ajuste solicitado em 15/11/2026: removida a interrogação de Ajuda do cabeçalho; o sino de Avisos ocupa sozinho seu lugar, inclusive em Planejar. Catálogo atualizado.

Simplificação pedida pelo usuário em 15/11/2026: Avisos mostra apenas título, Ouvir/Ligar com VoiceActions e lista no conteúdo. Retirados faixa Minha área/Meu canteiro, voltar redundante, subtítulo, contagem repetida, atualização global da previsão, texto fixo de indisponibilidade e assinatura. Dados e ações dos itens preservados; Ligar mantém o painel real de indisponibilidade.


## Exploração NASA — 15/11/2026

Minha área oferece cinco opções locais (Alface, Cenoura, Tomate, Cebola e Feijão-vagem) e atalho para /planejar#nasa. NasaSuggestions usa Button e ListenButton, com até três cartões em coluna única. Exemplo isolado no catálogo não grava preferências. Dados NASA POWER 2021–2025 baixados em data/nasa, com procedência e hash. Ranking experimental por dias de temperatura média dentro das faixas técnicas; faixas de fases/cultivares distintas não são equivalentes e favorecem culturas com intervalo amplo. Não é recomendação agronômica nem análise das condições atuais. Solo, água, sanidade, fotoperíodo e prioridades ainda não entram. Chuva como contexto. Cultivo atual excluído. Nenhuma intenção é confirmada pelo ranking; operação existente continua separada.


Ajuste visual: configuração de cultivos recolhida no Sheet aberto pela engrenagem de Meu canteiro. Lista com checkboxes e ação Pronto; sem pilha de botões na tela. NASA fica abaixo do conteúdo de Planejar, com três cartões verticais. Catálogo usa o componente real isolado.

Acesso revisado: botão explícito “O que costumo plantar”, abaixo de Trocar cultivo em Meu canteiro, substitui a engrenagem. Abre o mesmo painel de opções habituais, separado do cultivo atual.


## Próximos ciclos no mesmo canteiro — 15/11/2026
Meu canteiro oferece Próximos ciclos. NextCycles abre Sheet com linha do tempo vertical: cultivo atual e até três ciclos escolhidos explicitamente, usando as cinco hortaliças do catálogo. Guardar confirma intenção local pelo FarmProvider/IndexedDB (nextCycles); não registra plantio ou adequação agronômica. Voltar descarta o rascunho. Sequência vazia permitida; apagar etapa remove posteriores no rascunho. Contexto alterado preserva ciclos e pede conferência. Exemplo do catálogo isolado, sem persistência. Operação com data de Meu plano permanece separada; não é substituída automaticamente.

Próximos ciclos agora usa CropBedArt real para o cultivo atual e cada ciclo. Escolher abre figuras das cinco hortaliças; seleção preenche o mesmo canteiro. CropArt/CropBedArt ampliados com desenhos de Cebola e Feijão-vagem. O catálogo Próximos ciclos demonstra o fluxo real, isolado. Desenhos decorativos não representam crescimento medido.

Selos compactos em Escolher cultivo: CropClimateBadge mostra símbolo e palavra, com motivo/áudio apenas ao expandir. Verde Na faixa só quando todos os dias válidos dos cinco anos estão na faixa e a referência não exige restrição de fase/cultivar; amarelo Conferir nos demais casos completos; cinza Sem dados para mês ausente, falha ou lacunas. Sem vermelho sem restrição validada. Época mensal exploratória não salva data de plantio; primeiro ciclo abre no mês atual, demais sem época. Não classifica solo/água/sanidade nem prevê sucesso. Catálogo inclui selo isolado e fluxo real dos ciclos.

Painel visual do selo: CropClimateBadge abre Sheet sobre o painel de ciclos, com desenho real da hortaliça, símbolo, mensagem curta e três colunas proporcionais de dias abaixo/na/acima da faixa. Motivo em áudio; método e fonte em Ver dados. Datas ausentes e falhas mostram interrogação sem gráfico. Comparação de temperatura média histórica, não de extremos ou previsão. Sheet usa useId para títulos acessíveis distintos em painéis sobrepostos. Catálogo já usa CropClimateBadge real e NextCycles isolados.

Painel climático simplificado com escala comum: faixa térmica consultada em verde, limites tracejados e intervalo mínimo–máximo das médias diárias históricas abaixo. Substitui três colunas. Texto curto quantifica dias fora da faixa; não chama a faixa de ideal universal. Dados ausentes continuam sem gráfico. Exemplo do catálogo usa o componente real.

Painel NASA com três aspectos em coluna: temperatura com faixa; ClimateSupport apresenta chuva mensal e radiação média diária mensal, intervalo entre cinco anos e cinco barras anuais. Chuva/sol neutros, sem avaliação agronômica, sem horas de luz inferidas. Cada variável exige mês completo em todos os cinco anos; ausências explícitas. Solar adquirido separadamente para 2021–2025, com hash/procedência. API mantém mesma grade, período e dias UTC. Selo da lista continua somente térmico; áudio cobre os três aspectos. Catálogo usa o painel real.

Simplificação de chuva/sol: removidas barras anuais com contorno ambíguo. Mostra apenas intervalo histórico numérico, período e ausência de faixa ideal avaliada. Chuva não indica falta ou excesso local. Catálogo usa ClimateSupport através do painel real.

Comparação visual contextual: alvo O que precisa, calendário O que está previsto, histórico Como foi nessa época. Chuva/sol não têm alvo numérico aprovado: interrogação A conferir, nunca zero. Previsão compartilhada do FarmProvider só no primeiro ciclo, mês atual e validade conferida. Chuva é soma de 7 dias, histórico soma mensal; períodos explicitamente distintos. Temperatura prevista é mínima–máxima dos sete dias, histórico médias diárias; não desenhar como séries equivalentes. Sol sem previsão integrada. Exemplos do catálogo não consultam ou salvam previsão independente.

Refatoração visual: ClimateRange compartilhado para temperatura, água/chuva e sol, três linhas de gráfico com ícones, rótulos curtos e escala comum por variável. Demais parágrafos em Ver dados/áudio. Referência em verde, previsão azul, histórico ocre; traços da referência atravessam as outras linhas. Ausência é interrogação/linha pontilhada, nunca zero.
Água: estimativa exploratória ETo Open-Meteo × mínimo/máximo dos quatro Kc FAO (cap.3 tabela7), específicos das cinco hortaliças; faixa de cenários de fase, sem correção de clima/local ou validação. Não calcula irrigação, chuva ideal ou deficiência. Chuva histórica normalizada por dias reais de cada mês/ano, previsão média dos sete dias, mm/dia. Solar histórico média mensal diária e previsão média diária dos sete dias em MJ/m²/dia; sem referência ideal universal validada. Temperatura compara médias diárias em todas as séries. Contrato acrescenta campos opcionais para preservar dados locais antigos; mesma previsão no FarmProvider.
Fontes: https://www.fao.org/4/S2022E/s2022e07.htm ; https://open-meteo.com/en/docs .

Correção de atualização NASA: consultas no-store com versão da série para impedir resposta anterior sem radiação no navegador; endpoint sem cache HTTP. Gráfico solar previsto mostra mínimo–máximo diário dos sete dias, histórico continua intervalo de médias mensais diárias entre anos. Linha de referência solar segue pontilhada por ausência de faixa técnica validada para a variedade.

Áudio do painel climático movido para o cabeçalho, imediatamente antes de Fechar. Sheet aceita narration opcional e usa ListenButton iconOnly, alvo de 48px, nome acessível Ouvir/Parar áudio e estado pressionado. Sem botão grande de áudio no conteúdo. Catálogo dos ciclos/selo usa o mesmo painel real e demonstra a nova ação sem persistência.

Simplificação solicitada: painel principal mantém somente temperatura e água/chuva. Removido bloco Sol e referência solar do resumo falado. Radiação NASA permanece em Ver dados, com intervalo histórico e ausência de faixa agronômica validada. Catálogo usa o mesmo painel.

Componente genérico DataSources: recebe primary (nome/descrição/link), secondary e conteúdo técnico/narração opcionais. Rodapé em destaque azul com nome NASA e ilustração Earth própria, sem imitar insígnia oficial; crédito Open-Meteo secundário. Abre Sheet de fontes com NASA em destaque e Método e referências recolhidos. Substitui Ver dados inline do clima; remove nota técnica de água do fluxo principal, preservada em áudio/método. Catálogo com exemplo isolado. NASA identificada como fonte de dados, sem declarar patrocínio ou endosso do aplicativo. Guia de insígnia requer aprovação prévia: https://www.nasa.gov/nasa-data-insignia/ .

Revisão de DataSources solicitada: faixa compacta clara, símbolo oficial NASA de 48px como identificação da fonte de dados, sem declaração de patrocínio/endosso. Source recebe image opcional; fallback genérico permanece para outras fontes. Ativo oficial obtido de https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg, preservado em public/brands/nasa.svg sem alteração. Modal de fontes também compacto. Catálogo e consumidor atualizados juntos.

ExplainButton compartilhado: exclamação com alvo44px ao lado de cada linha de ClimateRange (referência/água estimada, previsão e histórico). Abre Sheet com explicação específica e áudio no cabeçalho; Entendi retorna sem alterar seleção. Exemplos isolados no catálogo. Previsão de chuva corrigida para mínimo–máximo diário dos sete dias, substituindo a única média; histórico continua intervalo entre médias diárias mensais por ano, distinção explícita na ajuda. Bolinha só quando limites iguais; pontilhado para ausência.

Simplificação de exploração: removidos do fluxo principal de Planejar o explorador textual ilustrativo e o ranking térmico de 30 dias. Minha área remove o cartão duplicado O que plantar depois; Próximos ciclos é a entrada visual única, com gráficos NASA e fontes já existentes. Configuração de hortaliças preservada sem ranking/consulta paralela. Planejar mantém operação/previsão e um atalho para Próximos ciclos em Minha área. Cenários ilustrativos anteriores permanecem no código/documentação como referência, sem serem apresentados como análise calculada.
Painel climático ganha uma única linha com olho e próxima conferência: previsão atualizada, tempestade, dados ausentes ou água disponível conforme previsão real válida. Explicação no áudio; não determina rega nem conclui tarefa. Componente do painel e catálogo atualizados juntos.

Limpeza final de Próximos ciclos: removidos introdução e parágrafo longo de intenção/condições. Sheet recebe narração contextual com escolhas e explicação de Guardar, acionada no ícone ao lado de Fechar. Revisão necessária e erro continuam explícitos. Seleção da hortaliça usa contorno neutro e marca ✓; verde reservado ao selo térmico, sem confundir escolha com recomendação. Catálogo usa o componente real.

Histórico para pitch: Minha área remove Dia a dia/Anotar atividade; registro permanece em O que fiz hoje na Home. Demonstração opt-in ampliada para oito meses com tomate/cenoura/alface, 43 atividades e 18 observações (se carga inicial), todos identificados como exemplo. Mantém cinco itens iniciais, Ver todas, filtro, correção e exclusão. exampleHistoryVersion permite ampliar demonstração antiga sem substituir relatos, ciclos ou restaurar itens antigos apagados. Não carrega automaticamente para outros usuários. Cadência ilustrativa, não recomendação de irrigação nem validação de campo.

Histórico por cultura — revisão: substituídos filtro/lista geral por cartões de Alface, Cenoura, Tomate etc., com desenho e contagem. Tocar abre Sheet com todas as atividades e observações vinculadas àquela cultura, em ordem recente, com áudio, correção e exclusão existentes. CropHistory é componente real e tem demonstração isolada no catálogo. Novas observações guardam cultivo atual informado no momento; correção posterior não reatribui histórico. Observações antigas reais sem vínculo ficam em Sem cultivo informado; fixtures conhecidas recebem vínculo explícito por ID, nunca inferido por data para relatos reais. Agrupamento por espécie, não por ciclo formal; não inferir plantio, colheita completa ou limites de ciclo.

História por cultivo e dia: cada linha reúne na mesma data as atividades, aparência relatada e conferências. Abrir revela registros originais e correção/exclusão separadas; não funde nem apaga relatos. Farm.checkHistory guarda snapshots de novas conferências por data/cultivo/observação, sem confundir conferência com rega. Não reconstrói conferências antigas inexistentes.
Contexto NASA das datas reais: série diária regional 2026 adquirida até 14/11, valores válidos até 13/11; complementa 2021–2025 via /api/nasa/history. Mesmo rótulo de data, NASA UTC versus anotação local; diferença temporal explícita nas fontes/áudio. Temperatura média e precipitação regional junto ao dia. Falta de dado não vira zero, previsão ou valor de outro ano. Fixtures locais permanecem fictícias, NASA é contexto real.
Diferenças de precipitação/relato geram apenas pergunta recolhida Vale conferir/Entender a água, sem diagnóstico, umidade medida, nutrição, perda, inadequação da cultura ou ajuste de rega. Catalogo usa CropHistory real, em estado isolado.

Home: O que fiz hoje movido para dentro do cartão O que fazer hoje, após os passos, usando support-row existente. Retirado de Seu acompanhamento. Atividade assume cultivo atual do único canteiro: atividade → data → confirmação, sem pergunta obrigatória de cultivo. Se cultivo estiver ausente, exige informação explícita em vez de salvar Alface presumida. Corrigir cultivo continua opcional na confirmação, inclusive para novo plantio ou anotação antiga; não altera automaticamente cultivo atual. Registro segue distinto de conferência e não muda a contagem 3 passos.
