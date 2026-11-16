# Design system Meu plantio

## Apresentação independente — 15/11/2026

`landing-site/` reutiliza fontes, cores e marca do app. `src/shared-ui` da landing contém cópias exatas dos componentes reais Brand, Button e ListenButton/useNarration, CSS da marca e tokens; `npm run sync:shared` atualiza esses snapshots a partir do projeto quando necessário. Ilustrações foram exportadas dos componentes reais. Os layouts editoriais, navegação por âncoras, abas de explicação e vídeo inline são específicos da apresentação, fora do fluxo do produtor; nenhum novo padrão compartilhado do app foi introduzido. Mantidos rótulos curtos e áudio voluntário, foco visível, contraste, movimento reduzido e layout mobile sem rolagem horizontal. Exemplos não persistem dados. Fontes e limites em `landing-site/README.md`.

Correção de destino em 15/11/2026: o usuário esclareceu que quer ver a demonstração preenchida em **agroloop-dev.vercel.app**, seu endereço principal de desenvolvimento. A configuração explícita DEMO_MODE=true habilita os mesmos dados nesse projeto, inclusive no alvo que a Vercel chama de Production. Sem a configuração, a ativação automática continua restrita a Preview. Chaves separadas agroloop:demo:* preservam as anotações normais. A referência congelada permanece intacta.


## Demonstração Vercel e sino — 15/11/2026

Correção autorizada: o sino mantém um ponto visível quando há avisos, sem legenda nem número. O nome acessível inclui a quantidade. Catálogo demonstra estados com e sem pendência.

A pedido do usuário, deployments Preview da Vercel abrem preenchidos: oito meses do histórico fictício existente, área/água/solo de exemplo, alface atual, relato de aparência, conferências e três próximos cultivos com meses. Na primeira abertura, três intenções de dia usam somente um snapshot Open-Meteo real e válido; na falha ou previsão vencida, não inventar clima nem criar essas intenções. A última intenção inclui contexto anterior para exercitar revisão e aviso. O aviso de demonstração identifica relatos e planos como exemplos; NASA/Open-Meteo mantêm fontes e limites.

FarmProvider continua sendo a fonte compartilhada. Ativação exclusivamente por VERCEL_ENV=preview no layout servidor; produção e desenvolvimento local padrão não carregam exemplos automaticamente. Dados de demo usam chaves agroloop:demo:* separadas de agroloop:*. Inicialização só em armazenamento vazio; recarregar e navegar preservam edições, exclusões e escolhas. Registros e escolhas continuam locais ao navegador, sem sincronização de servidor.


Ajuste de 15/11/2026: acesso aos avisos no cabeçalho mostra somente o sino, sem legenda nem contador visível. HeaderActions preserva Notifications e a contagem apenas no nome acessível, o alvo de toque e a navegação. Catálogo demonstra o componente real; título e áudio da lista usam Notifications.


Integração de 15/11/2026: a tradução para inglês preserva o nome próprio **meu plantio**, o l em árvore, o símbolo, os ícones e as chaves locais. Título principal: Meu plantio · My garden. O catálogo da marca também está em inglês.


## Marca Meu plantio — 15/11/2026

Nome solicitado: **meu plantio**, em minúsculas. O usuário rejeitou a primeira proposta de p plantado e pediu trocar o **l por uma árvore**. A marca atual mantém o l tipográfico como tronco, acrescentando uma copa. As outras letras preservam a fonte e a linha de base. O l em árvore permanece no nome. A pedido do usuário, acrescentado um símbolo independente: broto sobre um canteiro, em verde profundo, creme e verde-claro dos tokens. O símbolo aparece ao lado do nome no cabeçalho, no favicon e na instalação. Não representa uma condição agronômica ou indicação de cultivo de árvores.

`Brand`, `BrandWordmark`, `BrandMark` e `TreeL`, em `src/frontend/ui/Brand.tsx`, são compartilhados entre o cabeçalho e `/design-system#brand`, com cores e tipografia dos tokens existentes. Fonte vetorial única em `public/brands/meu-plantio.svg`, com PNGs 192 e 512 px derivados. Catálogo demonstra o símbolo em 24, 40, 64 e 80 px. Metadados e nome de instalação usam Meu plantio. Chaves locais legadas `agroloop:*` preservadas para manter planos e relatos. A referência de produto congelada não foi alterada.


## Idioma da interface — 15/11/2026

A pedido do usuário, toda a interface passa a inglês: telas, painéis, catálogo, mensagens, descrições acessíveis, áudio, metadados e instalação PWA. Usar Home, My plan, My area, Notifications, Listen, Call e Change. Datas e números usam en-US; a voz procura inglês. As rotas principais são /my-plan, /my-area e /notices; os endereços anteriores redirecionam. O fuso de São Paulo, as unidades métricas, as fontes e os limites das evidências permanecem. Registros locais antigos são lidos com os nomes de cultivos e atividades em inglês, preservando escolhas, datas e textos livres do produtor. Exemplos do catálogo continuam isolados. A definição de produto congelada não foi alterada.


Refinamento solicitado em 15/11/2026: os subtítulos dos pontos da rotação mostram somente o assunto (Temperatura, Chuva, Radiação solar etc.). A fonte e o período deixam a lista recolhida; no final da explicação expandida, o nome real da fonte é o link — NASA POWER ou Open-Meteo, com os metadados existentes — seguido dos detalhes de procedência. Removido o texto genérico Consultar a fonte. O áudio preserva toda a informação e lê a procedência ao final. Catálogo usa o mesmo RotationTimeline atualizado. Dados e cálculos não foram alterados.

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


Ajuste solicitado em 15/11/2026: removida do AppFrame a faixa superior Minha área + nome do canteiro em todas as telas. Minha área continua acessível pela barra inferior, com dados do canteiro preservados. Catálogo atualizado.


Ajuste de 15/11/2026: em Meu plano, o painel climático abre por **um ícone de termômetro dentro do cartão de cada próximo cultivo**, com nome acessível e tooltip Analisar temperatura. Removido o selo Conferir/Na faixa solto abaixo dos pontos. RotationTimeline aceita renderCardAction; CropClimateBadge usa a variante inCard, neutra e com alvo de 48 × 48 px, preservando o painel, dados, fontes e áudio. O editor de escolha continua com os selos térmicos existentes. Catálogo demonstra a variante real no cartão, sem gravar dados.


## Correção: predições sobre o plano preenchido — 15/11/2026

O usuário corrigiu a interpretação: a linha usa sempre cultivo atual, próximos cultivos e meses efetivamente preenchidos no FarmProvider. Removidos o cenário fixo, a faixa de demonstração e a alternância entre exemplo e plano. `examplePath` legado permanece guardado para compatibilidade, mas não controla mais a visualização. Anotações, dias e edição permanecem disponíveis.

`buildRotationStages` mantém a sequência e acrescenta apenas pontos preditivos mockados, variados por cultivo/mês/posição com semente estável. Não há modelo preditivo ou diagnóstico real. Textos condicionais não fabricam laudo, medidas, doses, produtividade ou resultados NASA. Sem mês, pede escolher a época; sem cultivo atual, mantém informação ausente. Os painéis NASA/Open-Meteo continuam reais e separados do gerador de exemplos. Os mocks ficam documentados no código e neste registro, sem faixa de demonstração no fluxo do produtor, conforme solicitado. Catálogo usa o mesmo gerador sobre dados isolados.


## Linha do tempo integrada — decisão de 15/11/2026

O usuário autorizou integrar exploração, escolha e acompanhamento em Meu plano, simplificando a organização anterior que separava Planejar. Esta decisão prevalece sobre os registros históricos abaixo; a definição de produto congelada permanece intacta. `/planejar` e `/planejar/rotacao` redirecionam para `/meu-plano`. Início e Minha área levam à rotação nesse destino.

Uma única `RotationTimeline` apresenta cultivo atual, cultivos seguintes e meses, com os desenhos e a linha compartilhada de `plan-path.module.css`. `RotationPlan` lê e grava pelo FarmProvider. Editar rotação usa o mesmo NextCycles; Voltar descarta o rascunho, Guardar mantém intenção local. Cultivo atual é corrigido dentro do contexto da linha. Removidas as seções duplicadas No canteiro, Próximos cultivos, Operação com dia e Cultivo e operação da página antiga.

Preparar plantio abre o fluxo de operação e sete dias num Sheet em Meu plano, somente no primeiro próximo ciclo das três culturas já suportadas quando seu mês corresponde ao mês atual. Não supõe ano ou duração. Dias já guardados e histórico de escolhas permanecem acessíveis como apoio recolhido; nenhuma intenção ou anotação é apagada. Anotações continuam secundárias.

Ver exemplo dos próximos meses ativa um cenário identificado de novembro/2026 a agosto/2027: alface → tomate → feijão-vagem → cenoura → cebola. Sete pontos contextualizados abordam calendário, calor, laudo fictício de solo, chuva/acesso, sucessão de famílias, água e variedade. Cada ponto abre evidência fictícia, impacto condicional, ação, forma de conferir e áudio. Não há previsão de benefício, dose, perda ou duração calculada.

O cenário substitui somente a visualização da linha, com faixa Cenário de demonstração e Voltar ao meu plano. Usa o campo separado `examplePath` já existente como preferência de exibição; não altera cultivo, ciclos, meses, relatos ou revisões. Exemplos antigos já ativados passam a abrir o cenário ampliado, preservando o objeto antigo. Dados e anotações reais ficam fora da visualização demonstrativa. Não misturar predição mockada com NASA: o cenário é autoral e não é resultado das APIs; o plano real conserva os painéis NASA POWER e a previsão Open-Meteo, quando cabível.

Catálogo `/design-system#caminho` usa RotationTimeline real com o cenário completo, isolado e sem gravação. Exemplo editável demonstra a mesma linha e o editor NextCycles em memória.


## Linha do tempo e mês planejado — 15/11/2026

Próximos cultivos mantém a linha do tempo, agora com os mesmos cartões, marcadores e estilos de Cultivo e operação (`plan-path.module.css`), sem setas de texto. RotationSequence recebe meses por etapa; catálogo demonstra Novembro e Fevereiro no componente real.

Cada ciclo tem Mês planejado no editor NextCycles. Guardar persiste `nextCycleMonths` junto de `nextCycles`, pelo FarmProvider, em todas as entradas (Planejar, Meu plano e Minha área). O mês aparece na sequência e no resumo da Home/áudio. Escolhas antigas permanecem com Mês a definir; não atribuir o mês atual automaticamente. Voltar descarta meses e cultivos do rascunho; remover etapa limpa seus meses e os das etapas seguintes. Contexto alterado preserva a intenção e pede revisão.

O mês é intenção informada pelo usuário e também contextualiza a consulta climática; não é janela validada, dia, ano, duração calculada ou plantio executado. Este registro substitui o limite anterior em que o mês consultado não era salvo.


## Cartão de próximos cultivos — 15/11/2026

Ajuste solicitado: removida a linha solta “Agora: Alface” do cartão compartilhado. Cultivo atual permanece no áudio e no canteiro ilustrado do editor NextCycles; Meu plano também mantém No canteiro. Catálogo usa o mesmo cartão atualizado.

`CyclePlanCard` é a apresentação compartilhada em Planejar e Meu plano: cultivo atual como contexto, sequência vertical real de `nextCycles`, intenção local com datas a definir, revisão explícita, ação Planejar próximos cultivos/Rever cultivos e áudio. Reutiliza Button, ListenButton e RotationSequence, sem novos tokens ou estilos por tela. `RotationSequence` aceita as cinco hortaliças e o modo `nextCycles`, com rótulos 1º/2º/3º próximo ciclo; o modo histórico Etapa permanece disponível para exemplos. `CyclePlan` conecta esse cartão e o editor NextCycles ao FarmProvider.

O exemplo do catálogo usa o cartão e editor reais, com Cebola e Feijão-vagem para demonstrar a sequência. Guardar altera somente o exemplo em memória; não grava intenção nem relatos. Intenção de ciclos permanece distinta do cultivo atual e de uma operação com dia. PlanPathDisplay passa a rotular sua etapa como Operação planejada e, sem escolha, Sem operação com dia; o exemplo real do catálogo acompanha os mesmos rótulos.

Base mobile, criada para a primeira tela funcional em 15/11/2026. Implementação nova, sem copiar componentes do mock.

Catálogo web: **`/design-system`**. Página em `src/app/design-system/page.tsx`, catálogo em `src/frontend/design-system/DesignSystem.tsx` e estilos próprios em `design-system.module.css`. Reúne princípios, cores vinculadas aos tokens, tipografia, medidas, botões reais, áudio, ilustrações, seleção, painel de confirmação e exemplos de estados. As interações do catálogo não salvam relatos ou intenções e não alteram os dados do canteiro. É uma referência de desenvolvimento, fora das cinco telas principais do produtor; sua largura se adapta para comparar componentes no computador.

Antes de criar ou alterar uma interface, consultar o catálogo e este documento, como registrado em `AGENTS.md`. Reutilizar os componentes existentes. Ao mudar um padrão compartilhado, atualizar componente, catálogo e documentação juntos; não copiar estilos para criar variantes independentes em cada tela.

- Tokens: `src/frontend/ui/tokens.css`; cores de fundo, superfície, texto, marca, borda e previsão; espaçamentos, raios, tipografia e toque mínimo.
- Interface: fundo claro, verde profundo para ação, ilustrações vegetais e ocre para informação meteorológica. Cor nunca é o único sinal: ícone e palavra acompanham o estado.
- Fonte: Arial para leitura, Trebuchet MS para títulos; fontes do sistema, sem download obrigatório. Corpo de orientação com 16–17 px, títulos maiores, metadados secundários menores e recolhidos quando extensos.
- Botões: `Button`, variantes primary, secondary e quiet. Ações principais com pelo menos 56 px; ícones de ação com pelo menos 48 px. Alvos de ajuda de 44 px.
- Ilustrações vetoriais próprias: `CropArt`, `GardenArt`, `WeatherArt`. Imagens decorativas ficam fora da árvore acessível; controles sempre têm nome.
- Ampliação para Início e Meu plano: `SoilArt` para as quatro respostas do canteiro e `ActivityArt` para Plantei/Reguei/Colhi. `AppFrame` compartilha marca, área, ajuda e navegação; `BottomNav` também acompanha Planejar. `CommonSheets` concentra cultivo atual, ajuda, anotação e indisponibilidade de ligação. Cartões de previsão usam o mesmo snapshot nas três telas.
- `Sheet`: dialog nativo modal, foco contido pelo navegador, Escape e Fechar, rolagem interna e retorno de foco. Confirmações repetem figura, dia e ação.
- `ListenButton`: áudio por toque, parar, erros curtos, sem autoplay. Síntese do navegador não é arquivo baixado nem garante offline.
- `VoiceActions`: par compartilhado de acesso por voz, com Ouvir em destaque e Ligar como ação secundária. Ligar abre o estado real da conversa; enquanto telefonia estiver indisponível, informa isso sem sugerir que a chamada ocorreu. O catálogo `/design-system` mostra o componente.
- Texto: um assunto por bloco; rótulos Ouvir, Ligar, Trocar, Guardar dia, Voltar. Explicação detalhada em Saiba mais/De onde vem. Não exigir leitura técnica para escolher um dia.
- Largura máxima 480 px; mesma experiência de celular em janelas grandes. Sete dias em grade, sem carrossel obrigatório ou rolagem horizontal.

Próximas telas devem reutilizar os tokens e componentes. Validar legibilidade e compreensão com agricultores; esta implementação não constitui teste com o público.

## Minha área — primeira versão

`CropBedArt` em `src/frontend/ui/CropBedArt.tsx` compõe o canteiro grande com os desenhos compartilhados de Alface, Cenoura e Tomate; cultivo desconhecido tem sinal próprio. O desenho é decorativo, sem representar densidade, desenvolvimento ou saúde. Exemplos isolados no catálogo `/design-system`.

`src/frontend/area/AreaScreen.tsx` e seu CSS module reúnem dados, cultivo e histórico compartilhado. Reutilizam AppFrame, Button, Sheet, ListenButton e tokens. Correção e exclusão pedem confirmação; os dados persistem pelo FarmProvider existente.

Revisão de layout: `ActionGroup` organiza ações em coluna com 12 px entre controles. Reutilizar esse componente para grupos, sem depender da margem dos botões. O catálogo mostra um exemplo isolado. Dados do canteiro ficam recolhidos; cada atividade apresenta figura, ação, cultivo e data, com edição/exclusão ao expandir. Inicialmente aparecem cinco eventos, com Ver todas.

`AppNavigation` é a apresentação compartilhada da barra inferior: Início, Meu plano e Minha área, com destaque na aba ativa. O catálogo usa o mesmo componente em modo estático, sem acessar dados da área ou salvar informações.

## Sequências em avaliação

`RotationSequence` (`src/frontend/ui/RotationSequence.tsx`) apresenta uma lista vertical numerada com os desenhos reais das culturas; cobertura ainda não definida usa broto e rótulo explícito. A ordem não presume datas, execução nem adequação agronômica. O catálogo `/design-system` contém os mesmos dois exemplos isolados usados diretamente em `/planejar`, sem salvar intenção ou relatos.

O explorador contextual de Planejar usa cartões com tokens compartilhados, seleção por botões com `aria-pressed`, áudio e painel de conferência. Identifica os caminhos como exemplos ilustrativos e a análise como pendente. NASA POWER aparece como fonte ambiental prevista, sem patrocínio ou resultados calculados. A exploração não altera Meu plano.

`RotationEvidence` (`src/frontend/ui/RotationEvidence.tsx`) reúne pergunta, fonte, explicação do exemplo, próximo passo, áudio e detalhes de entrada/limites/acompanhamento. Usa tokens, ícone com rótulo e ListenButton; clima recebe os tokens meteorológicos. Os três exemplos reais estão em `/design-system#evidencias`, isolados e sem persistência. O conteúdo de `rotation-mock.ts` alimenta a tela e a fala com os mesmos campos. Ao trocar caminho, as explicações de clima, histórico e solo acompanham a seleção. Solo é apresentado como análise local ausente, sem diagnóstico pelo desenho.

`PlanPathDisplay` (`src/frontend/plan/PlanPathDisplay.tsx`) mostra cultivo atual e próxima etapa numa linha vertical. Avisos ficam entre essas etapas e recolhidos em linhas compactas; tocar expande texto, limite, áudio e atalho. O estado sem problema não ganha um aviso genérico. O catálogo `/design-system#caminho` demonstra os mesmos estados. Dados de demonstração são explicitamente carregados e persistidos em campo separado, sem alterar a intenção ou os relatos reais.

Integração em Planejar: RotationExplorer é uma seção de conteúdo, sem AppFrame próprio, cabeçalho principal ou navegação duplicados. Usa o shell de Planner, mantém Ouvir/Ligar e as três evidências na mesma tela. O link Ver o tempo dos próximos dias aponta para `#operacao` na própria página. Nenhum componente compartilhado de evidência ou sequência foi duplicado.


## Avisos no cabeçalho e lista

Decisão do usuário em 15/11/2026: acesso Avisos no canto superior direito, fora da barra inferior. `HeaderActions` apresenta apenas o sino com rótulo Avisos no lugar da antiga interrogação, alvo mínimo de 48 px e contagem de pontos para conferir (não mensagens não lidas). `AppHeaderActions` deriva a contagem do mesmo FarmProvider da lista, inclusive em Planejar.

`NoticeCard` apresenta ícone, título e resumo; detalhes nativos expansíveis mostram explicação, referência, Ouvir e acesso à tela responsável. Tokens meteorológicos distinguem previsão de pendência sem depender só da cor. Exemplos de HeaderActions e NoticeCard em `/design-system` são isolados e não persistem nem alteram o canteiro.

`/avisos` mostra tempestade apenas em previsão válida, revisão do cultivo/plano e ausência/expiração da previsão como pendência. Sem condição relevante, mostra estado vazio. Carregamento e atualização são explícitos. Abrir, expandir e ouvir não concluem tarefas nem apagam pendências. A lista reflete o contexto atual; não é histórico de notificações. Telefonia e envio de notificações fora do app permanecem indisponíveis.

Ajuste de concisão em Avisos: título → VoiceActions (Ouvir e Ligar, como na Home) → lista. `AppFrame compact` omite faixa da área e assinatura do rodapé, preservando marca e navegação. Sem subtítulo, contagem repetida, botão global de atualizar previsão ou explicação fixa sobre serviços; limites e ações ficam no aviso ou no painel de ligação. Estado vazio curto.


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


## Integração de rotas — 15/11/2026

A marca e a navegação Home do produtor, incluindo exemplos do catálogo, apontam para /app. A apresentação em / mantém layout próprio e componentes em src/presentation; nenhum padrão visual novo foi introduzido. O estado FarmProvider continua restrito ao layout do produtor.
