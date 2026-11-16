## Publicação unificada Meu plantio — 15/11/2026

Neste repositório, a apresentação ocupa `/` e a Home do produtor passa a `/app`. Planejamento, plano, avisos e área mantêm `/plan`, `/my-plan`, `/notices` e `/my-area`. Layouts raiz separados em `src/app/(presentation)` e `src/app/(producer)` preservam estilos próprios. `FarmProvider` continua único nas telas do produtor. Marca, Home, destinos dos avisos meteorológicos e início PWA apontam para `/app`; a marca da landing continua em `/`. O catálogo usa o mesmo destino Home do app. `src/presentation` preserva os componentes e assets da apresentação, incluindo pitch e equipe. A definição congelada permanece intacta. Os registros anteriores sobre `landing-site/` descrevem a origem antes da integração. O README raiz documenta execução e publicação conjunta na Vercel.

# Conteúdo e organização das telas

## Site de apresentação — 15/11/2026

Criada a apresentação independente em `landing-site/`, com Next.js + TypeScript e exportação estática. URL local `http://localhost:3031/`. Complementa o pitch com persona de pequeno horticultor, estatísticas nacionais históricas de agricultura familiar com fontes, planejamento preditivo, voz, fluxo proposto de ligação contextual, impacto a medir e estágio de implementação. Uma seção própria `#pitch` destaca o vídeo de 30 segundos; o botão do topo leva à seção, sem modal ou autoplay. As capturas são do app real, com planos/registros de exemplo identificados.

Predição de rotação e telefonia são apresentadas como proposta/em desenvolvimento; NASA POWER histórico regional e previsão Open-Meteo de sete dias mantêm distinções. Não há promessa de produtividade, economia, diagnóstico ou recuperação do solo. A landing não grava relatos/intenção nem modifica as telas do produtor. Referências e verificação estão em `landing-site/README.md`. Definição congelada preservada.

Correção de destino em 15/11/2026: o usuário esclareceu que quer ver a demonstração preenchida em **agroloop-dev.vercel.app**, seu endereço principal de desenvolvimento. A configuração explícita DEMO_MODE=true habilita os mesmos dados nesse projeto, inclusive no alvo que a Vercel chama de Production. Sem a configuração, a ativação automática continua restrita a Preview. Chaves separadas agroloop:demo:* preservam as anotações normais. A referência congelada permanece intacta.


## Demonstração Vercel e sino — 15/11/2026

Correção autorizada: o sino mantém um ponto visível quando há avisos, sem legenda nem número. O nome acessível inclui a quantidade. Catálogo demonstra estados com e sem pendência.

A pedido do usuário, deployments Preview da Vercel abrem preenchidos: oito meses do histórico fictício existente, área/água/solo de exemplo, alface atual, relato de aparência, conferências e três próximos cultivos com meses. Na primeira abertura, três intenções de dia usam somente um snapshot Open-Meteo real e válido; na falha ou previsão vencida, não inventar clima nem criar essas intenções. A última intenção inclui contexto anterior para exercitar revisão e aviso. O aviso de demonstração identifica relatos e planos como exemplos; NASA/Open-Meteo mantêm fontes e limites.

FarmProvider continua sendo a fonte compartilhada. Ativação exclusivamente por VERCEL_ENV=preview no layout servidor; produção e desenvolvimento local padrão não carregam exemplos automaticamente. Dados de demo usam chaves agroloop:demo:* separadas de agroloop:*. Inicialização só em armazenamento vazio; recarregar e navegar preservam edições, exclusões e escolhas. Registros e escolhas continuam locais ao navegador, sem sincronização de servidor.


Ajuste de 15/11/2026: acesso aos avisos no cabeçalho mostra somente o sino, sem legenda nem contador visível. HeaderActions preserva Notifications e a contagem apenas no nome acessível, o alvo de toque e a navegação. Catálogo demonstra o componente real; título e áudio da lista usam Notifications.


Integração de 15/11/2026: a tradução para inglês preserva o nome próprio **meu plantio**, o l em árvore, o símbolo, os ícones e as chaves locais. Título principal: Meu plantio · My garden. O catálogo da marca também está em inglês.


## Idioma da interface — 15/11/2026

A pedido do usuário, toda a interface passa a inglês: telas, painéis, catálogo, mensagens, descrições acessíveis, áudio, metadados e instalação PWA. Usar Home, My plan, My area, Notifications, Listen, Call e Change. Datas e números usam en-US; a voz procura inglês. As rotas principais são /my-plan, /my-area e /notices; os endereços anteriores redirecionam. O fuso de São Paulo, as unidades métricas, as fontes e os limites das evidências permanecem. Registros locais antigos são lidos com os nomes de cultivos e atividades em inglês, preservando escolhas, datas e textos livres do produtor. Exemplos do catálogo continuam isolados. A definição de produto congelada não foi alterada.

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


Ajuste solicitado em 15/11/2026: removido Ver previsão de sete dias e seu painel de Meu plano. A previsão geral fica na Home (`/#tempo`), inclusive como destino dos avisos meteorológicos. Termômetros por cultivo e a previsão contextual de Preparar plantio permanecem.


Refinamento solicitado em 15/11/2026: Editar, com lápis e alvo de 48 px, fica à direita de Sua rotação, no cabeçalho compartilhado RotationHeading. Sem cultivos, a ação é Planejar. Removido o botão largo abaixo da linha do tempo; linha e marcadores preservados. Catálogo usa o mesmo cabeçalho e abre o editor isolado.

Removida Minhas anotações de Meu plano: os relatos permanecem no histórico do canteiro em Minha área, sem excluir dados. O atalho Ver anotações da Home passa a `/minha-area#historico`. Meu plano mantém somente o histórico de dias/intencões como apoio, distinto dos relatos de campo.


Ajuste solicitado em 15/11/2026: O que fiz hoje fica na Home; removido o botão e a abertura de registro de Meu plano. Minhas anotações permanece para consulta, sem apagar registros existentes.

Ajuste solicitado em 15/11/2026: removida do AppFrame a faixa superior Minha área + nome do canteiro em todas as telas. Minha área continua acessível pela barra inferior, com dados do canteiro preservados. Catálogo atualizado.


Ajuste de 15/11/2026: em Meu plano, o painel climático abre por **um ícone de termômetro dentro do cartão de cada próximo cultivo**, com nome acessível e tooltip Analisar temperatura. Removido o selo Conferir/Na faixa solto abaixo dos pontos. RotationTimeline aceita renderCardAction; CropClimateBadge usa a variante inCard, neutra e com alvo de 48 × 48 px, preservando o painel, dados, fontes e áudio. O editor de escolha continua com os selos térmicos existentes. Catálogo demonstra a variante real no cartão, sem gravar dados.


## Correção: predições sobre o plano preenchido — 15/11/2026

O usuário corrigiu a interpretação: a linha usa sempre cultivo atual, próximos cultivos e meses efetivamente preenchidos no FarmProvider. Removidos o cenário fixo, a faixa de demonstração e a alternância entre exemplo e plano. `examplePath` legado permanece guardado para compatibilidade, mas não controla mais a visualização. Anotações, dias e edição permanecem disponíveis.

`buildRotationStages` mantém a sequência e acrescenta apenas pontos preditivos mockados, variados por cultivo/mês/posição com semente estável. Não há modelo preditivo ou diagnóstico real. Textos condicionais não fabricam laudo, medidas, doses, produtividade ou resultados NASA. Sem mês, pede escolher a época; sem cultivo atual, mantém informação ausente. Os painéis NASA/Open-Meteo continuam reais e separados do gerador de exemplos. Os mocks ficam documentados no código e neste registro, sem faixa de demonstração no fluxo do produtor, conforme solicitado. Catálogo usa o mesmo gerador sobre dados isolados.


## Rotação integrada em Meu plano — decisão de 15/11/2026

O usuário autorizou integrar exploração, escolha e acompanhamento em Meu plano, simplificando a organização anterior que separava Planejar. Esta decisão prevalece sobre os registros históricos abaixo; a definição de produto congelada permanece intacta. `/planejar` e `/planejar/rotacao` redirecionam para `/meu-plano`. Início e Minha área levam à rotação nesse destino.

Uma única `RotationTimeline` apresenta cultivo atual, cultivos seguintes e meses, com os desenhos e a linha compartilhada de `plan-path.module.css`. `RotationPlan` lê e grava pelo FarmProvider. Editar rotação usa o mesmo NextCycles; Voltar descarta o rascunho, Guardar mantém intenção local. Cultivo atual é corrigido dentro do contexto da linha. Removidas as seções duplicadas No canteiro, Próximos cultivos, Operação com dia e Cultivo e operação da página antiga.

Preparar plantio abre o fluxo de operação e sete dias num Sheet em Meu plano, somente no primeiro próximo ciclo das três culturas já suportadas quando seu mês corresponde ao mês atual. Não supõe ano ou duração. Dias já guardados e histórico de escolhas permanecem acessíveis como apoio recolhido; nenhuma intenção ou anotação é apagada. Anotações continuam secundárias.

Ver exemplo dos próximos meses ativa um cenário identificado de novembro/2026 a agosto/2027: alface → tomate → feijão-vagem → cenoura → cebola. Sete pontos contextualizados abordam calendário, calor, laudo fictício de solo, chuva/acesso, sucessão de famílias, água e variedade. Cada ponto abre evidência fictícia, impacto condicional, ação, forma de conferir e áudio. Não há previsão de benefício, dose, perda ou duração calculada.

O cenário substitui somente a visualização da linha, com faixa Cenário de demonstração e Voltar ao meu plano. Usa o campo separado `examplePath` já existente como preferência de exibição; não altera cultivo, ciclos, meses, relatos ou revisões. Exemplos antigos já ativados passam a abrir o cenário ampliado, preservando o objeto antigo. Dados e anotações reais ficam fora da visualização demonstrativa. Não misturar predição mockada com NASA: o cenário é autoral e não é resultado das APIs; o plano real conserva os painéis NASA POWER e a previsão Open-Meteo, quando cabível.

Catálogo `/design-system#caminho` usa RotationTimeline real com o cenário completo, isolado e sem gravação. Exemplo editável demonstra a mesma linha e o editor NextCycles em memória.


Refinamento solicitado: removida a introdução “Uma operação com dia” de Planejar (título, frase e áudio repetido). Após Próximos cultivos, o fluxo segue diretamente para O que vai fazer? e Qual dia?. A âncora `#operacao` permanece no primeiro passo, preservando os atalhos existentes.

## Meses dos próximos cultivos — 15/11/2026

Próximos cultivos mantém a linha do tempo, agora com os mesmos cartões, marcadores e estilos de Cultivo e operação (`plan-path.module.css`), sem setas de texto. RotationSequence recebe meses por etapa; catálogo demonstra Novembro e Fevereiro no componente real.

Cada ciclo tem Mês planejado no editor NextCycles. Guardar persiste `nextCycleMonths` junto de `nextCycles`, pelo FarmProvider, em todas as entradas (Planejar, Meu plano e Minha área). O mês aparece na sequência e no resumo da Home/áudio. Escolhas antigas permanecem com Mês a definir; não atribuir o mês atual automaticamente. Voltar descarta meses e cultivos do rascunho; remover etapa limpa seus meses e os das etapas seguintes. Contexto alterado preserva a intenção e pede revisão.

O mês é intenção informada pelo usuário e também contextualiza a consulta climática; não é janela validada, dia, ano, duração calculada ou plantio executado. Este registro substitui o limite anterior em que o mês consultado não era salvo.


## Ajuste de clareza para demonstração — 15/11/2026

Refinamento visual solicitado: o cartão Próximos cultivos não repete “Agora: [cultivo]” em texto solto. O cultivo atual permanece no canteiro ilustrado do editor e no áudio.

Este registro prevalece sobre as descrições históricas abaixo: Início apresenta a proposta de planejar os próximos cultivos do mesmo canteiro, com acesso direto a `/planejar#proximos-cultivos`. O cartão Próximo ciclo resume `farm.nextCycles`, separado do dia de uma operação. Acompanhamento diário e registros continuam disponíveis.

Planejar mostra primeiro Próximos cultivos, com cultivo atual, sequência guardada e acesso ao editor real `NextCycles`. Os selos abrem os painéis climáticos existentes com histórico NASA, previsão disponível, fontes, limites e próxima conferência. Não há ranking ou validação de compatibilidade da rotação. A consulta de época é exploratória e não salva janela ou data de plantio. Abaixo fica Uma operação com dia, com o fluxo existente de sete dias.

Meu plano mostra a mesma sequência local e permite revisá-la pelo mesmo editor. Cultivo atual, intenção de ciclos, operação com dia e execução relatada permanecem separados. Contexto alterado preserva as escolhas e pede revisão. Texto e áudio não anunciam mais o explorador ilustrativo removido do fluxo.

Correção de navegação de 15/11/2026: as duas sequências ilustrativas e as três perguntas estão diretamente em Planejar (`/planejar`), acima da operação e dos sete dias. Removido o botão intermediário Comparar caminhos. Links antigos `/planejar/rotacao` redirecionam para a tela integrada.

Atualização de 15/11/2026: recorte de exploração fechado em três perguntas — clima, compatibilidade com histórico e condições do solo — com dois caminhos mockados em `/planejar/rotacao`. Fontes, dores, exemplos e texto/áudio em [predicao-tres-perguntas.md](predicao-tres-perguntas.md). Não há análise integrada nem salvamento desses caminhos. Pergunta 35 permanece pendente.

Atualização de jornada em 15/11/2026, no worktree `codex/minha-area`: Minha área reúne dados do canteiro e acompanhamento contínuo. A Home registra rapidamente; Minha área consulta a história; Meu plano acompanha as intenções e etapas. A primeira tela `/minha-area` oferece dados locais editáveis, cultivo ilustrado, atividades com correção/exclusão e histórico de observações. Usa o mesmo FarmProvider. Filtro por cultivo aplica-se às atividades; observações aparecem no histórico geral. Localização, várias áreas e separação formal por ciclo permanecem posteriores. Fluxos e recorte em [jornadas/01-informar-area.md](jornadas/01-informar-area.md).

Atualização posterior em 15/11/2026: Início e Meu plano foram implementados e ligados a Planejar rotação, com provider compartilhado, previsão real e persistência local. A Home retoma a direção visual e o acompanhamento diário do mock, com implementação nova. Cultivo atual exige informação explícita, separado do próximo cultivo desejado. Observação confirmada muda o acompanhamento; Não sei permanece pendente. Registros Plantei/Reguei/Colhi são separados das intenções. Plantio pede revisão sem substituir silenciosamente o cultivo. Ver [continuidade.md](continuidade.md).

Atualização em 15/11/2026: a implementação nova em Next.js começa por Planejar rotação, exclusivamente com previsão meteorológica real de sete dias, escolha de cultivo/operação e intenção salva no aparelho. NASA/IBGE, comparação agronômica completa, outras telas e telefonia continuam posteriores. Ver [primeira-etapa.md](primeira-etapa.md), [versao-evento.md](versao-evento.md) e [design-system.md](design-system.md). As descrições históricas de mock abaixo orientam a experiência, não indicam que essas capacidades foram entregues na implementação nova.

Referência de conteúdo e navegação do aplicativo mobile. Fonte de produto: [product-definition.md](product-definition.md). Os fluxos descritos orientam a implementação; não indicam funcionalidades já disponíveis em produção.

## Decisão de organização

Manter cinco telas principais: Início, Planejar rotação, Meu plano, Alertas e conversas e Minha área. Cada tela reúne um contexto de uso, com o conteúdo, as ações e os estados definidos nas seções abaixo. Preferências e ajuda são apoio secundário.

A separação entre Planejar rotação e Meu plano é intencional: uma explora possibilidades; a outra acompanha uma escolha vigente. Alertas e conversas tem um espaço próprio porque a voz faz parte do acesso principal e precisa preservar o assunto, as pendências e a decisão. Início orienta e encaminha; Minha área concentra os dados compartilhados.

O limite de cinco orienta a arquitetura. Painéis, seções expansíveis, formulários e estados terão trabalho de desenho, mas não serão tratados como destinos adicionais. Evitar transformar um painel em um fluxo extenso ou carregar todas as informações na primeira abertura.

## Mapa geral

| Tela | Pergunta que responde | Conteúdo de responsabilidade da tela |
| --- | --- | --- |
| 1. Início | O que fazer hoje e qual é o próximo caminho? | Plano diário de observação/conferência, previsão como evidência e sugestão para o próximo ciclo; calendário e registros como apoio. |
| 2. Planejar rotação | O que muda se eu escolher outra sequência? | Objetivo, horizonte, referência, comparação, explicação e confirmação de uma alternativa. |
| 3. Meu plano | O que foi escolhido e o que acontece em seguida? | Calendário vigente, etapas, registros de campo e acompanhamento das decisões. |
| 4. Alertas e conversas | O que aconteceu, quais são as opções e o que combinamos? | Alertas, explicações, pedido de ligação, estado do pedido, resumo e pendências. |
| 5. Minha área | Quais informações da minha área estamos usando? | Local, tamanho, cultivo, histórico, água, solo e restrições conhecidas. |

## Navegação e contexto compartilhado

- Decisão mais recente do usuário em 15/11/2026: Avisos sai da barra inferior e fica no canto superior direito do cabeçalho, inclusive em Planejar. Abre `/avisos`, com lista de notificações internas e detalhes expansíveis. Barra inferior: Início, Meu plano e Minha área. A futura conversa por telefone e notificações remotas continuam posteriores.
- Planejar rotação é uma tela própria, acessível por Planejar próximo ciclo na Home ou Rever rotação em Meu plano. Na Home atual, o primeiro abre um painel com o contexto da sugestão; a tela completa será desenvolvida depois. Não depende de um quarto botão na barra.
- Minha área abre pelo nome da área no cabeçalho. Nesse contexto é possível selecionar outra área ou editar a atual, sem uma página separada de listagem.
- Voltar de Planejar rotação ou Minha área retorna ao ponto de entrada, preservando o contexto da demonstração.
- A área ativa acompanha a navegação. Alertas, calendário e comparação mostram a que área pertencem. Um alerta aberto por notificação identifica sua área; eventual troca fica explícita.
- Não duplicar editores: atalhos da Home levam ao conteúdo responsável. Um registro aparece resumido na Home, completo em Meu plano e vinculado à etapa correspondente.
- Alterar um dado da área pode exigir revisão da análise. Isso não altera silenciosamente o plano escolhido.

## 1. Início

### Objetivo

Apresentar acompanhamento útil ao longo do cultivo, incluindo o que merece conferir hoje e o caminho para o próximo ciclo. A Home reúne previsão atualizada quando houver integração, observação do canteiro e estratégia de rotação. O agricultor recebe orientação compreensível, pode responder, conversar ou manter seu plano. Não limitar a experiência aos dias próximos do plantio. Contexto, fontes e limites do cenário atual estão em [cenario-mogi.md](cenario-mogi.md).

### Conteúdo, por ordem de leitura

1. **Área ativa:** nome e local acessíveis, com ação para abrir Minha área.
2. **Ouvir e conversar:** ações lado a lado logo após o título “Hoje na sua horta”. Ouvir lê o resumo falado das condições relevantes, sugestão e pendências, em frases curtas. Ligar abre a entrada de conversa contextualizada; enquanto telefonia não estiver disponível, explica isso com clareza e sem simular chamada.
3. **O que fazer hoje:** primeiro bloco após o resumo falado. Mostra cultura/canteiro, motivo e até três passos numerados. Começa por observar e responder Como está o canteiro hoje?, dentro do próprio passo, com imagens para Seco, Úmido, Com poças e Não sei. A resposta exige confirmação. Os passos seguintes levam a conferir a última rega e os dados necessários para avaliar a necessidade de água. Com poças, mudam para conferir persistência do acúmulo e pedir avaliação da drenagem; com solo úmido, orientam conferir o manejo e observar após chuva. Não sei não conclui a observação nem assume solo seco. Ao informar novo plantio, suspender os passos dependentes e priorizar conferir o cultivo. Ouvir meus passos reproduz a sequência correspondente.
4. **Condições acompanhadas:** previsão como evidência de apoio ao plano de ação, depois dos passos. Usar a consulta municipal real de Mogi das Cruzes, de 14–16 nov., salva em 14/11/2026. Ver previsão expande ícones do tempo, máximas e mínimas; nenhum dado foi removido. Não inventar chuva em mm, umidade, radiação ou chance de perda. O aviso não comprova umidade local, doença ou deficiência de nutrientes. Ações: Ouvir aviso, Ver aviso e Conversar. Data da consulta visível ao expandir; fonte e referência técnica recolhidas no aviso. Não há atualização automática nesta etapa.
5. **Próximo ciclo:** alface agora → cobertura a avaliar após o ciclo → hortaliça a definir. É uma possibilidade de planejamento condicionada a solo, água, objetivo e calendário. Não inferir degradação pelo cultivo anterior nem prometer recuperação. Ações: Planejar próximo ciclo e Por que esse caminho?
6. **Seu acompanhamento e atividade recente:** atalhos compactos para Meu plano e O que fiz hoje, seguidos de resumo das anotações. Não reproduzir o histórico completo na Home.

### Interações internas

Ouvir resumo, condição ou sugestão; abrir o aviso, solicitar conversa ou entender o caminho de rotação. O painel da sugestão explica o que sabemos, o objetivo, os compromissos e as pendências, com acesso à área e ao plano atual. A cobertura e suas datas não estão definidas: não oferecer confirmação como se já estivessem calculadas. Não há índice arbitrário de saúde do solo, percentual de perda ou recuperação garantida. Gráficos completos, alternativas e parâmetros pertencem a Planejar rotação. ILPF permanece extensão opcional, sem recomendação automática na Home. Preferências e ajuda ficam em acesso discreto no cabeçalho/menu.

O plano de ação fica em `src/TodayActions.jsx` e representa regras de acompanhamento do protótipo, não um motor de irrigação validado. A contagem de conferências corresponde ao relato confirmado e às marcações explícitas Já conferi. Abrir painel ou tocar para conversar não conclui uma tarefa. Conferir a rega não registra que houve irrigação. Para anotar a execução, usar O que fiz hoje. Ao confirmar outra observação do canteiro, reiniciar as marcações do plano anterior para não transferir conclusões entre contextos. Tudo fica em memória da sessão.

O painel Conferir a rega explica o que falta avaliar: água no solo pelo método local, última rega e manejo da cultura. Quando há poças, explica conferir o acúmulo e buscar avaliação da drenagem, sem indicar obras. Esses passos são executáveis como observação e conferência; não autorizam adubação, mudança de frequência ou dose de água com base apenas em previsão ou aparência superficial.

### Estados a representar

Área preenchida; primeira utilização sem área; área sem plano; alerta ativo; análise que precisa revisar. Após plantio informado, o estado implementado recolhe a previsão associada à operação e a sequência sugerida anterior, mostra revisão necessária e permite conferir o plano. A nova informação não dispara cálculo automático. Sem área, o desenho futuro deverá apresentar orientação curta com áudio e ação para cadastrar em Minha área. Se não houver alerta real, não inventar um problema para preencher o card.

## 2. Planejar rotação

Correção de direção pelo usuário em 14/11/2026: o núcleo precisa mostrar consequência futura e ação, não apenas estatísticas históricas. Caso local fixo implementado: Se for transplantar amanhã? → possível tempestade → risco qualitativo condicionado de replantio → adiar o transplante e conferir outra janela, ou manter a intenção com conferência pendente. Confirmação atualiza Meu plano como decisão condicional, sem alterar a alface atual, definir nova data ou registrar execução. É simulação da experiência de decisão, sem motor preditivo. Dados históricos e regionais ficam recolhidos como apoio.

Atualização de evidências em 14/11/2026: o mock agora inclui comparação ambiental de 30 dias em novembro/dezembro com NASA POWER 2021–2025 de um ponto de referência em Mogi, sem selecionar data ou sequência automaticamente. Acrescentados o bloco secundário recolhido Evitar desperdício (água, replantio, descarte e insumos) e contexto municipal IBGE/PAM. Não há benefício quantitativo calculado. Inventário das demais fontes, dados brutos, método e limites em [analise-mogi-desperdicio.md](analise-mogi-desperdicio.md).

Direção visual reforçada pelo usuário em 14/11/2026: seguir a simplicidade da Home. Na implementação revisada, o fluxo principal usa cartões ilustrados de caminhos, sequência por desenhos e áudio contextual. Pendências são três desenhos tocáveis (Solo, Água, Datas). Texto detalhado, fontes e previsão completa permanecem recolhidos. Confirmação também visual, com opção de ouvir; não depende de leitura longa. A estrutura detalhada a seguir é responsabilidade de conteúdo, não uma ordem para expor todos os parágrafos de uma vez.

### Objetivo

Apresentar uma sugestão de sequência preparada a partir do contexto e permitir entender, comparar ou manter outra decisão. O agricultor não precisa montar sozinho um catálogo de possibilidades. A comparação considera a mesma área e horizonte; abrir a tela não modifica o plano vigente. O detalhamento abaixo é o ponto de partida para a próxima conversa, não um fluxo visual já aprovado.

### Conteúdo, por ordem de leitura

1. **Contexto resumido:** área, alface em cultivo, histórico e objetivo. Corrigir um dado leva à seção correspondente de Minha área e permite retornar. Não começar com um formulário longo obrigatório.
2. **Caminho sugerido:** sequência visual e explicação falada do que se propõe e por quê. Quando o método tiver suporte, apresentar a indicação correspondente. No cenário atual, cobertura após a alface é uma hipótese condicionada; espécie e datas ainda não foram avaliadas. Não apresentá-las como recomendação pronta.
3. **Condições e próxima ação:** mostrar o que pode ser decidido e qual informação falta para avançar. Explicar evidência, ação, impacto esperado, condição e como conferir. Ausência de solo não impede toda exploração ambiental, mas suspende conclusões dependentes.
4. **Comparação com a referência:** plano habitual informado e inicialmente até duas alternativas curtas, com linha do tempo adaptada ao celular. Uma opção comercial e outra com cobertura podem entrar quando admissíveis. Se não houver plano habitual, a referência exploratória deve ser identificada como tal.
5. **O que muda:** datas/janelas, exposição por fase, demanda de água e custo quando sustentados. Usar gráficos pequenos para explicar uma decisão, com áudio e fonte recolhida. Não inventar uma pontuação, percentual de perda ou ganho para preencher o comparativo.
6. **Ajustar a prioridade:** objetivo e horizonte em seção secundária editável, inicialmente 12 meses; 24 meses só quando houver suporte. Restrições persistentes pertencem a Minha área. O mock usa conteúdo local e não executa cálculos ou aquisições.
7. **Decisão do agricultor:** seguir a sugestão quando admissível, ver outra opção, manter o plano ou pedir esclarecimento. Escolher uma sequência abre confirmação com área, etapas, janelas e pendências. Se faltar uma condição indispensável, pedir a informação ou registrar a intenção pendente; não confirmar um plano operacional como se estivesse validado.

### Interações internas

Editar objetivo/período em uma seção compacta; expandir uma alternativa; ouvir explicação; consultar fontes; confirmar a escolha. Um painel deve permitir ver os elementos essenciais antes da confirmação.

Após confirmação explícita, o mock passa a mostrar a escolha em Meu plano. Uma alteração futura preserva a decisão anterior no histórico. Escolher um plano não significa que um plantio ocorreu.

### Estados a representar

Contexto mínimo incompleto; comparação pronta; preparação/carregamento simulado; falha; alternativa condicionada; nenhuma alternativa admissível; revisão necessária após correção; escolha confirmada. Não preencher o catálogo com uma opção supostamente segura quando não há evidência.

## 3. Meu plano

Implementação visual em 14/11/2026: tela própria na barra inferior, com cultivo atual ilustrado, próximo caminho (ou escolha pendente), sequência vertical expansível e áudio. Anotações e decisões ficam recolhidas; o registro usa o mesmo fluxo da Home. Guardar intenção em Planejar abre Meu plano, sem confirmar execução. A intenção pode conter cultivo, operação e dia; novo plantio exige revisão do contexto. A implementação inicial contempla Plantei, Reguei e Colhi; demais tipos de evento e calendário completo da rotação dependem de evolução posterior. A leitura principal deve continuar curta e visual.

Atualização de 15/11/2026: **Meu caminho** apresenta cultivo atual e próxima etapa com operação e data quando disponíveis. Avisos de previsão ou análise só aparecem junto da etapa afetada quando há uma condição relevante sustentada; ausência de dados fica como pendência, sem criar alerta de dano. A entrega atual não tem predição NASA ou de nutrientes integrada. Dois casos claramente demonstrativos (temperatura histórica NASA POWER simulada e baixa disponibilidade de nutrientes em análise de solo simulada) podem ser carregados manualmente para visualizar o padrão, em campo separado no IndexedDB. Não alteram o plano ou o canteiro reais. Ver [Jornada 04](jornadas/04-acompanhar-plano.md).

### Objetivo

Acompanhar a rotação escolhida e registrar a execução, sem precisar refazer a comparação toda vez que o aplicativo é aberto.

### Conteúdo, por ordem de leitura

1. **Plano vigente:** área, sequência escolhida, horizonte e data da decisão. Ação secundária Rever rotação abre Planejar, mantendo o plano atual até nova confirmação.
2. **Próxima etapa:** cultura/atividade, janela, condição de execução e eventual alerta vinculado.
3. **Calendário da rotação:** linha do tempo com plantio, colheita, cobertura e intervalos. Identificar fases em andamento, concluídas e ainda planejadas; não presumir execução pela passagem da data.
4. **Detalhe da etapa:** expandir para ver orientações permitidas, condições, pendências e registros associados. Sem página própria para cada cultura.
5. **Registro de campo:** ação Registrar o que aconteceu, com tipo de evento e data; os demais campos aparecem conforme o evento. Abranger plantio, colheita, irrigação, replantio, descarte e observação, sem exigir todos no mesmo formulário.
6. **Acompanhamento e histórico:** seção recolhida com decisões, revisões e registros. Distinguir projeção, relato do produtor e resultado observado. Mostrar indicadores só quando houver dados, com unidade e período.

### Interações internas

Formulário curto em painel, revisão e confirmação do registro, expansão de uma etapa e consulta ao histórico. O atalho de registro na Home usa este mesmo formulário e identifica área e etapa.

Mudança de cultivo/data que afete uma análise gera indicação de revisão necessária; o mock não recalcula silenciosamente. Registro de execução não é confundido com nova decisão de planejamento.

### Estados a representar

Sem plano; plano ativo; etapa sem execução confirmada; registro salvo; informação corrigida; análise que precisa revisar. Sem plano, oferecer Comparar rotações, sem calendário fictício apresentado como real.

## 4. Alertas e conversas

Implementação visual em 14/11/2026: tela própria na aba Alertas, com dois assuntos visuais, detalhe com áudio, opção de ligação indisponível e conversa guiada pela tela. Água compartilha o relato confirmado da Home; transplante confere o contexto antes de abrir o mesmo componente de decisão de Planejar. Resumo em áudio e histórico recolhido de respostas e decisões. Ver depois guarda a leitura sem agendar notificação. Dados contraditos pedem revisão; Não sei continua pendente. Os estados de telefonia e atualização automática detalhados abaixo seguem como requisitos futuros; o mock não confirma chamadas nem pedidos externos enviados.

### Objetivo

Unir a situação identificada, sua explicação e a conversa relacionada. A pessoa pode resolver pela tela ou solicitar ligação, sem repetir o contexto.

### Conteúdo e progressão dentro da tela

1. **Lista compacta:** alertas atuais em destaque, com assunto, área, prazo e estado. Itens anteriores e conversas ficam em seção recolhida.
2. **Alerta selecionado:** expandir para mostrar o que foi identificado, qual etapa pode ser afetada, evidência, validade e o próximo passo possível. Áudio e texto curto contam a mesma história.
3. **Ação principal:** Toque para receber uma ligação, com explicação de que será uma chamada para o telefone cadastrado. Oferecer também entender/comparar as opções pela tela.
4. **Preparação breve, se necessária:** confirmar telefone, preferência e autorização para a chamada solicitada. Exibir apenas os campos que faltam, com ajuda por áudio.
5. **Estado do pedido:** solicitado, aguardando, não atendida ou falha. Um novo pedido exige nova ação; toques repetidos não representam várias chamadas.
6. **Resumo após a conversa demonstrativa:** o que foi entendido, escolha confirmada ou manutenção do plano, pendências e próximo passo. Oferecer resumo em áudio e acesso à etapa em Meu plano.
7. **Conversas anteriores:** resumos vinculados ao alerta e à decisão correspondente. Não presumir gravação de áudio ou disponibilizar transcrição integral como requisito.

### Interações internas e limites

O detalhe, o pedido e o resumo são estados do mesmo contexto, não três páginas adicionais. Permitir adiar, recusar, manter o plano e registrar que não sabe uma informação.

A conversa telefônica ocorre fora da interface do app. Para o mock, representar separadamente um roteiro curto de ligação, claramente demonstrativo: identificação da assistente e confirmação da pessoa → motivo do contato → uma pergunta por vez → opções já preparadas → confirmação explícita → resumo. A notificação também é uma peça do sistema, que leva ao alerta correto.

A ligação não cria recomendações novas. Contexto contradito ou vencido gera pendência de revisão. Pelo caminho visual, uma escolha abre a mesma confirmação usada em Planejar rotação; pela voz, o roteiro demonstra confirmação verbal antes do registro. Os dois caminhos atualizam a mesma decisão.

### Estados a representar

Nenhum alerta; alerta ativo; necessidade de informação; contexto vencido; telefone não preparado; pedido aguardando; falta de conexão/sinal; falha ou não atendimento; resumo com escolha, recusa ou adiamento. Sem comunicação, não afirmar que o pedido foi enviado ou que a conversa ocorreu.

## 5. Minha área

Implementação atual: tela própria pelo cabeçalho, com cartões ilustrados e edição guiada de identificação/local, cultivo/data, histórico, água/irrigação e solo/cuidados. Inclui Não sei, áudio, confirmação, correção e cancelamento. Dados compartilhados em memória, com origem e atualização; mudança de contexto pede revisão sem alterar a decisão escolhida ou registrar plantio. Uma área por sessão nesta versão; seleção/cadastro de outras áreas permanece futuro. Corrigir localização suspende evidências de Mogi que deixem de se aplicar. Não há leitura de laudo, cálculo ou integração.

### Objetivo

Manter um único lugar para conferir e corrigir os dados locais compartilhados pelo plano, pelas comparações e pelos alertas.

### Conteúdo, em seções compactas

1. **Identificação:** selecionar área existente ou adicionar área; nome, local confirmado e tamanho. Mapa só se ajudar a identificar o local, sem ser requisito para o primeiro mock.
2. **Cultivo atual:** espécie e datas conhecidas. Oferecer Não sei quando aplicável.
3. **Histórico de cultivos:** lista simples de culturas e períodos, com adicionar/corrigir em painel. Não exigir histórico completo para permitir explorar o conceito.
4. **Água e irrigação:** disponibilidade informada, sistema existente e limitações conhecidas.
5. **Solo e restrições:** informações locais ou análise disponível, problemas diagnosticados e outras condições de manejo. Ausência permanece explícita.
6. **Origem e atualização:** indicar o que foi informado pelo produtor, o que é contexto de fonte externa e quando foi atualizado. Não misturar média regional com medição local.

### Interações internas

Editar uma seção de cada vez. Salvar dados não dispara comparação nem altera o plano automaticamente. Se a correção afetar resultados anteriores, mostrar Precisa revisar e ação para Planejar rotação. O primeiro cadastro usa esta mesma tela em estado vazio, com orientação breve e áudio.

Objetivo e horizonte da comparação são definidos em Planejar rotação, evitando dois lugares editando o mesmo parâmetro. A área pode guardar restrições persistentes, sem confundi-las com a prioridade de uma análise específica.

### Estados a representar

Primeira área; área demonstrativa completa; informações desconhecidas; edição/salvamento simulado; correção que exige revisar análise. Trocar área atualiza os resumos e mantém clara a identidade dos registros.

## Apoio secundário

### Registro visual e orientação por áudio

O atalho da Home usa o rótulo **O que fiz hoje**, com ilustração. O painel implementado começa com três ocorrências: **Plantei, Reguei e Colhi**. A sequência é ação → cultura por imagem → Hoje/Ontem/Outro dia → resumo visual e falado → confirmar ou corrigir. A área vem do contexto; não solicitar novamente. Outros tipos de ocorrência e medidas opcionais serão detalhados depois. As datas do cenário continuam fixas em 14/11/2026; isso também define Hoje/Ontem no protótipo.

Perguntas de áudio acompanham as etapas após a ação de abrir o registro. Há botão para ouvir novamente/parar. Não exigir áudio nem quantidade para concluir. A confirmação mostra ação, cultura, data e canteiro. Ao confirmar, adicionar ao histórico em memória da sessão e ao resumo de anotações da Home. Um plantio informado sinaliza que o plano precisa ser conferido; não altera automaticamente a sequência ou executa uma nova análise.

O botão de ajuda da Home oferece **Me mostrar**. A orientação tem três momentos, um destaque por vez: ouvir orientação, entender o caminho sugerido e acompanhar/registrar. Permite repetir, avançar ou encerrar, sem áudio automático ao carregar a página.

Além do registro de atividade, a pergunta diária do canteiro guarda uma observação separada. As respostas Seco, Úmido e Com poças descrevem aparência; Não sei mantém ausência. Essa informação não confirma deficiência nutricional, doença ou necessidade de uma dose de irrigação. O usuário pediu casos tecnicamente sustentados: o mecanismo escolhido é o acompanhamento da água, com referências e limites em `cenario-mogi.md`.

### Para que servem Registrar e Comparar

| Informação | Utilidade no produto | Limite |
| --- | --- | --- |
| Ação + cultura + área + data | Construir o histórico real, distinguir plano de execução e identificar análises que precisam revisar. | Relato do produtor, não verificação independente do campo. |
| Plantio efetivo | Reavaliar calendário e próximas etapas com o motor futuro, levando em conta mudanças locais. | A data sozinha não comprova desenvolvimento ou sanidade. |
| Ocorrência de irrigação | Entender quando houve manejo e apoiar perguntas posteriores. | Reguei não informa litros, necessidade ou economia. |
| Ocorrência de colheita | Registrar término/colheitas de um ciclo e confrontar a janela planejada com o relato. | Colhi não informa peso, produtividade ou venda; não encerrar ciclo automaticamente, pois pode haver múltiplas colheitas. |
| Quantidades e custos, se informados futuramente | Acompanhar produção comercializável, descarte, água aplicada e resultado econômico. | Exigem unidade, área, período e medidas adequadas; não devem bloquear o registro básico. |
| Histórico + condições locais + prioridade + referência | Preparar a comparação de sequências no mesmo horizonte e área. | Cadastro não basta: resultados dependem de perfis técnicos, fontes válidas e regras ainda não implementadas. |
| Alternativa escolhida e confirmação | Registrar a intenção e explicar o compromisso assumido, comparando-a depois com a execução. | Escolha não é plantio e comparação não garante um benefício. |

Registrar alimenta o histórico; Comparar usa o contexto para explorar decisões futuras. Depois de uma escolha confirmada, Meu plano acompanha o combinado e recebe novas ocorrências. O registro básico permite começar com baixa carga de preenchimento. Não adicionar perguntas sem definir sua utilidade e quando são necessárias.

A comparação funcional ainda está indisponível na Home atual. Os registros ficam apenas na sessão; não há persistência, cálculos, notificações reais ou comprovação de impacto. Os dados não são coletados para treinamento de modelo nesta etapa.

Preferências e ajuda ficam em um painel acessível pelo cabeçalho/menu, com áudio, telefone, preferência por notificações e instruções curtas. A configuração de voz pode abrir nesse mesmo componente na primeira solicitação de ligação. Não são uma sexta tela principal nem uma etapa obrigatória extensa antes de conhecer o app.

Apoio por áudio acompanha os conteúdos relevantes; não fica restrito à ajuda. Usar controles amplos, rótulos claros e confirmação compreensível. Nenhuma ação importante depende só de leitura longa, ícone sem rótulo ou cor. Áudio não é obrigatório para quem prefere a tela.

## Percursos para conferir antes de desenhar

| Situação | Percurso esperado |
| --- | --- |
| Conhecer e corrigir o contexto | Início → Minha área → retornar ao ponto de entrada. |
| Fazer a primeira escolha | Início → Planejar rotação → confirmar → Meu plano. |
| Rever uma escolha | Meu plano → Planejar rotação → confirmar nova escolha ou voltar mantendo a vigente. |
| Acompanhar execução | Início → Meu plano → registrar evento → conferir no histórico. |
| Entender alerta pela tela | Notificação ou Início → Alertas e conversas → comparar opção existente → confirmar → Meu plano. |
| Participar por voz | Notificação ou Início → Alertas e conversas → solicitar ligação → conversa demonstrativa → resumo e próximo passo. |
| Corrigir informação que afeta a análise | Minha área ou relato na conversa → indicação de revisão → Planejar rotação, sem modificar a escolha anterior automaticamente. |

## Diretrizes de implementação

Preservar a linguagem visual da Home V1, com leitura principal clara, desenhos e áudio. A estrutura de cinco telas orienta o aplicativo; os fluxos discutidos precisam ser implementados e verificados com dados e serviços adequados.

Contemplar área ainda não cadastrada, plano vazio, informações incompletas, comparação, revisão, confirmação e falhas de comunicação. Não incluir chat livre, loja ou catálogo independente de culturas sem nova necessidade de produto. Offline, sistemas integrados e IA local permanecem extensões futuras.

Funções indisponíveis devem ter estados curtos e claros, sem confirmar chamadas ou ações externas que não ocorreram. Não preencher impacto com economia, produtividade ou recuperação fictícias; usar pendências e explicações qualitativas quando faltarem evidências. Previsão apoia apenas seu prazo válido; histórico não representa a condição atual. Escolha confirmada, execução relatada e benefício medido permanecem distintos.

A aprovação conceitual das telas não substitui validação com agricultores, verificação de acessibilidade ou revisão agronômica.


## Próximos ciclos no mesmo canteiro — 15/11/2026
Meu canteiro oferece Próximos ciclos. NextCycles abre Sheet com linha do tempo vertical: cultivo atual e até três ciclos escolhidos explicitamente, usando as cinco hortaliças do catálogo. Guardar confirma intenção local pelo FarmProvider/IndexedDB (nextCycles); não registra plantio ou adequação agronômica. Voltar descarta o rascunho. Sequência vazia permitida; apagar etapa remove posteriores no rascunho. Contexto alterado preserva ciclos e pede conferência. Exemplo do catálogo isolado, sem persistência. Operação com data de Meu plano permanece separada; não é substituída automaticamente.

Simplificação de exploração: removidos do fluxo principal de Planejar o explorador textual ilustrativo e o ranking térmico de 30 dias. Minha área remove o cartão duplicado O que plantar depois; Próximos ciclos é a entrada visual única, com gráficos NASA e fontes já existentes. Configuração de hortaliças preservada sem ranking/consulta paralela. Planejar mantém operação/previsão e um atalho para Próximos ciclos em Minha área. Cenários ilustrativos anteriores permanecem no código/documentação como referência, sem serem apresentados como análise calculada.
Painel climático ganha uma única linha com olho e próxima conferência: previsão atualizada, tempestade, dados ausentes ou água disponível conforme previsão real válida. Explicação no áudio; não determina rega nem conclui tarefa. Componente do painel e catálogo atualizados juntos.

Histórico para pitch: Minha área remove Dia a dia/Anotar atividade; registro permanece em O que fiz hoje na Home. Demonstração opt-in ampliada para oito meses com tomate/cenoura/alface, 43 atividades e 18 observações (se carga inicial), todos identificados como exemplo. Mantém cinco itens iniciais, Ver todas, filtro, correção e exclusão. exampleHistoryVersion permite ampliar demonstração antiga sem substituir relatos, ciclos ou restaurar itens antigos apagados. Não carrega automaticamente para outros usuários. Cadência ilustrativa, não recomendação de irrigação nem validação de campo.

Histórico por cultura — revisão: substituídos filtro/lista geral por cartões de Alface, Cenoura, Tomate etc., com desenho e contagem. Tocar abre Sheet com todas as atividades e observações vinculadas àquela cultura, em ordem recente, com áudio, correção e exclusão existentes. CropHistory é componente real e tem demonstração isolada no catálogo. Novas observações guardam cultivo atual informado no momento; correção posterior não reatribui histórico. Observações antigas reais sem vínculo ficam em Sem cultivo informado; fixtures conhecidas recebem vínculo explícito por ID, nunca inferido por data para relatos reais. Agrupamento por espécie, não por ciclo formal; não inferir plantio, colheita completa ou limites de ciclo.

História por cultivo e dia: cada linha reúne na mesma data as atividades, aparência relatada e conferências. Abrir revela registros originais e correção/exclusão separadas; não funde nem apaga relatos. Farm.checkHistory guarda snapshots de novas conferências por data/cultivo/observação, sem confundir conferência com rega. Não reconstrói conferências antigas inexistentes.
Contexto NASA das datas reais: série diária regional 2026 adquirida até 14/11, valores válidos até 13/11; complementa 2021–2025 via /api/nasa/history. Mesmo rótulo de data, NASA UTC versus anotação local; diferença temporal explícita nas fontes/áudio. Temperatura média e precipitação regional junto ao dia. Falta de dado não vira zero, previsão ou valor de outro ano. Fixtures locais permanecem fictícias, NASA é contexto real.
Diferenças de precipitação/relato geram apenas pergunta recolhida Vale conferir/Entender a água, sem diagnóstico, umidade medida, nutrição, perda, inadequação da cultura ou ajuste de rega. Catalogo usa CropHistory real, em estado isolado.

Home: O que fiz hoje movido para dentro do cartão O que fazer hoje, após os passos, usando support-row existente. Retirado de Seu acompanhamento. Atividade assume cultivo atual do único canteiro: atividade → data → confirmação, sem pergunta obrigatória de cultivo. Se cultivo estiver ausente, exige informação explícita em vez de salvar Alface presumida. Corrigir cultivo continua opcional na confirmação, inclusive para novo plantio ou anotação antiga; não altera automaticamente cultivo atual. Registro segue distinto de conferência e não muda a contagem 3 passos.
