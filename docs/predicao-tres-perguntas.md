# Três perguntas para explorar a rotação

Decisão de escopo de 15/11/2026. Referência municipal: **Mogi das Cruzes (SP)**. Este recorte de discussão está fechado em três perguntas; a pergunta 35 (água, rotina e recursos) permanece pendente. As demais perguntas do inventário continuam como investigação futura.

## Campos e fornecedores

O [dicionário técnico de dados](dicionario-dados-rotacao.md) registra os códigos das APIs, unidades, campos existentes do produtor e nomes propostos para histórico técnico e laudos, separando implementação atual de integração futura.

## O que foi combinado

Correção de navegação solicitada pelo usuário: a comparação faz parte de Planejar rotação. Não há botão intermediário Comparar caminhos nem página separada para acessar as três perguntas.

Uma comparação reúne clima, histórico e solo para explicar dois caminhos. NASA POWER é a fonte ambiental principal prevista. O histórico da mesma área, os dados locais e as referências das culturas completam a decisão. O resultado futuro depende de método e revisão agronômica; nesta entrega há apenas uma experiência mockada.

1. **Como o clima entra nessa escolha?** — pergunta 31 do inventário.
2. **Combina com o que plantei antes?** — pergunta 30, focada no histórico e na compatibilidade.
3. **O que as condições do solo permitem plantar depois?** — desdobramento da 30, apoiado na pergunta 49. Não renumerar o inventário de 55 perguntas.

Os caminhos ilustrativos são A: Alface → Cenoura → Tomate; B: Alface → Cobertura a definir → Tomate. Não são sequências aprovadas, não representam histórico real e não têm datas ou espécie de cobertura calculadas. A pessoa pode explorar, ouvir, conferir pendências e voltar. O cultivo real aparece separado, lido do FarmProvider.

## 1. Como o clima entra nessa escolha?

**Dor:** escolher uma sequência sem entender quais condições ambientais suas etapas podem enfrentar.

**Decisão que poderá apoiar:** comparar o encaixe das etapas no calendário e identificar períodos que exigem avaliação. O histórico permite explorar cenários; operações próximas usam previsão atualizada.

| Informação | Fonte e cruzamento | Situação atual |
| --- | --- | --- |
| Chuva, temperatura e radiação ao longo dos anos | NASA POWER para o mesmo ponto e períodos comparáveis | Amostra local de 01–14/11/2025, nove variáveis. É insuficiente para comparar épocas. |
| Sequência, datas e fases | Produtor + duração/fases documentadas por cultura | Caminhos ilustrativos, sem calendário agronômico. |
| Condições ambientais relevantes por fase | Perfis técnicos revisados, cultivar e ambiente aberto/protegido | Parâmetros ainda não integrados. |
| Condições próximas da operação | Open-Meteo atualizado | Previsão existe no fluxo de sete dias, não alimenta este mock. |

**Como cruzar futuramente:** posicionar cada fase nos mesmos cenários históricos contínuos, para a mesma área e horizonte; explicar exposição e variação entre anos. Não extrapolar os 14 dias nem tratar histórico como previsão. A referência municipal não mede o canteiro.

**Como aparece:** cartão ocre com “Dados da NASA no planejamento”, desenhos de chuva, calor/frio e sol. O destaque atribui a fonte; não afirma patrocínio, endosso ou análise feita pela NASA.

**Exemplo A:** “Cada hortaliça passa por plantio, crescimento e colheita em momentos diferentes. Vamos conferir o clima de cada etapa.” Próximo passo: conferir as datas de cada cultivo. Depois: rever a previsão perto da operação e registrar quando ela acontecer.

**Exemplo B:** explicar a época de entrada e saída da cobertura antes de voltar à hortaliça; conferir espécie e calendário. Não indicar uma época vencedora sem cálculo.

## 2. Combina com o que plantei antes?

**Dor:** escolher o próximo cultivo sem considerar repetições e restrições herdadas da sequência praticada no mesmo canteiro.

**Decisão que poderá apoiar:** identificar alternativas que merecem comparação e condições que precisam de informação ou revisão técnica.

| Informação | Fonte e cruzamento | Situação atual |
| --- | --- | --- |
| Cultivos anteriores, datas e cultivo presente | Produtor e registros compartilhados da mesma área | Há cultivo e atividades locais no app; não há reconstrução automática completa de ciclos neste mock. |
| Famílias botânicas, hospedeiros e intervalos aplicáveis | Embrapa e perfis técnicos revisados por cultura e problema | Referências identificadas; regras ainda não integradas. |
| Problemas diagnosticados e cultivar relevante | Produtor, diagnóstico e avaliação técnica | Não inferir doença pela aparência ou pelo cultivo anterior. |

**Como cruzar futuramente:** reconstruir a sequência conhecida, conferir relações de hospedeiros e intervalos aplicáveis e explicar as pendências. Alternar famílias é um critério inicial, não uma garantia de adequação. Falta de relato não prova ausência de problemas.

**Como aparece:** cartão com histórico, explicação curta e próximo passo. “Dados usados no exemplo” revela as entradas e as fontes previstas.

**Exemplo A:** “O exemplo troca alface por cenoura e depois tomate. Antes de seguir, precisamos conferir o que veio antes e os problemas conhecidos do canteiro.” Próximo passo: conferir cultivos anteriores e datas em Minha área. Depois: registrar plantios e revisar se o histórico mudar.

**Exemplo B:** inserir cobertura não garante compatibilidade; conferir o histórico antes de definir sua espécie. Registrar depois a espécie realmente plantada e os problemas avaliados no campo.

## 3. O que as condições do solo permitem plantar depois?

**Dor:** considerar um cultivo ou uma cobertura sem saber se há limitações locais relevantes, ou presumir que trocar de cultura recupera o solo.

**Decisão que poderá apoiar:** esclarecer quais informações do solo precisam ser avaliadas para considerar uma alternativa e se há condições indispensáveis ainda pendentes.

| Informação | Fonte e cruzamento | Situação atual |
| --- | --- | --- |
| Propriedades pertinentes à cultura e ao objetivo | Análise local: data, profundidade, unidade, método e localização; interpretação técnica | Não há laudo estruturado nem leitura automática de análise. |
| Limitações físicas, drenagem e problemas conhecidos | Avaliação local e relato com origem explícita | Minha área aceita texto; relato não é medição ou diagnóstico. |
| Requisitos da cultura/cobertura | Referências técnicas revisadas, objetivo e condições de execução | Ainda não há seleção automática de cobertura. |
| Propriedades espaciais estimadas | SoilGrids, quando houver valores válidos e escala adequada | Consulta local retornou nulos. Não substituir por zero ou por município vizinho. |
| Umidade regional | NASA SMAP L4, como apoio hídrico eventual | Apenas catálogo adquirido; pixels não extraídos. Não substitui análise de fertilidade do canteiro. |

**Como cruzar futuramente:** conferir quais propriedades são necessárias para a alternativa, origem e validade dos dados, e requisitos revisados; apresentar restrições e pendências. Um laudo disponível não aprova sozinho uma sequência. Não definir dose, recuperação, espécie de cobertura ou arborização automaticamente.

**Como aparece:** terceiro cartão independente. O cenário mockado é **análise local ausente**. Mesmo que exista texto em Minha área, esse exemplo não passa a tratá-lo como laudo. O usuário pode conferir sua área; não há formulário novo nem salvamento simulado de análise.

**Exemplo A:** “Ainda não sabemos se o solo atende às necessidades da cenoura e do tomate. Precisamos conferir as informações locais antes de indicar esse caminho.” Próximo passo: conferir se há análise ou limitação conhecida em Minha área. Depois: guardar a referência da análise e revisar após avaliação técnica — capacidade futura, sem upload implementado neste incremento.

**Exemplo B:** “A cobertura é uma possibilidade a avaliar. Sem conhecer o solo e o objetivo do manejo, ainda não podemos escolher a espécie nem afirmar que ela vai recuperar a terra.” Próximo passo: conferir solo e objetivo. Depois: definir com apoio técnico o que medir entre ciclos.

## Conexão direta entre mock, texto e áudio

O conteúdo exibido está em [`rotation-mock.ts`](../src/frontend/planner/rotation-mock.ts). Não há dados fictícios escondidos como se fossem análise. Cada pergunta contém:

| Campo | Onde é usado |
| --- | --- |
| `id` | `clima`, `historico`, `solo`; âncoras `pergunta-clima`, `pergunta-historico`, `pergunta-solo` na tela. |
| `title`, `source`, `intro` | Pergunta, procedência prevista e contexto do cartão. |
| `input` | Entrada ilustrativa em “Dados usados no exemplo”. |
| `sources`, `limit` | Fontes necessárias, situação e limites no mesmo detalhe. |
| `examples[0]` / `examples[1]` | Explicação específica do caminho A / B. Mudar caminho muda as três explicações. |
| `message`, `action`, `followUp` | O que dizer, próximo passo e como conferir depois. |
| `questionNarration()` | Usa esses mesmos campos para os botões Ouvir e o resumo geral; identifica o caráter ilustrativo. |

O componente real [`RotationEvidence`](../src/frontend/ui/RotationEvidence.tsx) apresenta os três cartões. O catálogo `/design-system#evidencias` usa os mesmos exemplos isolados, sem acesso ao FarmProvider e sem persistência.

Os arquivos de aquisição em [`.locals/dados-base/`](../.locals/dados-base/) são locais e ignorados pelo Git. `manifesto.json`, `resumo-verificado.json` e `LEIA-ME.txt` registram o que foi adquirido. O mock não os consulta. A documentação e o conteúdo ilustrativo versionados continuam disponíveis em outro clone.

## Conexões da jornada e limites da entrega

Entrada: Início ou Meu plano → Planejar rotação (`/planejar`) → duas sequências e três perguntas já na própria tela → Antes de escolher. A previsão de sete dias e o registro de intenção para uma operação ficam abaixo, na seção Seu próximo passo (`#operacao`). O endereço antigo `/planejar/rotacao` redireciona para `/planejar`. Minha área mantém contexto e registros; Início recebe relatos; Meu plano acompanha a intenção real existente. Uma análise futura deverá usar o mesmo contexto e preservar escolhas diante de revisão.

Nesta entrega, conferir um caminho abre pendências e permite voltar, consultar Minha área ou Meu plano. Não grava a sequência, não registra execução, não envia pedidos externos. Telefonia continua indisponível; áudio usa síntese do navegador por toque. Não há integração NASA, SoilGrids, laudos ou motor de rotação neste fluxo mockado.

A comunicação futura deve ligar evidência, consequência sustentada, ação possível, condição e forma de conferir. O mock demonstra isso por meio de perguntas e pendências, sem percentuais, datas vencedoras, benefício medido, promessa de restauração ou falsa aprovação agronômica. Arborização permanece extensão de sistemas integrados, com avaliação própria. A pergunta 35 não integra este recorte.

## Referências

- [Inventário de 55 perguntas e aquisições](perguntas-preditivas-e-acoes.md).
- [Jornada 03 e entrega visual](jornadas/03-explorar-rotacao.md).
- [NASA POWER](https://power.larc.nasa.gov/docs/services/api/temporal/daily/).
- [Embrapa — Rotação e Sucessão de Culturas em Hortaliças Cultivadas em Pequenas Áreas no Manejo de Doenças](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1045158/1/CT152.pdf).
- [ISRIC SoilGrids](https://isric.org/explore/soilgrids/).
- [NASA/NSIDC — SMAP L4](https://nsidc.org/data/spl4smgp/versions/8).

## Verificação desta entrega — 15/11/2026

`npm run typecheck`, `npm run build` e `git diff --check` passaram. No navegador, em largura estreita, foram conferidos os três cartões, a abertura dos dados do solo e a atualização das três explicações ao trocar para cobertura. O catálogo `/design-system#evidencias` apresentou os mesmos três componentes e exemplos isolados. A composição do áudio usa os mesmos campos do texto; não houve validação de compreensão com produtores nem validação agronômica.
