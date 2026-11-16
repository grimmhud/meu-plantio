# Campos e fornecedores das três perguntas

## Fontes ambientais conferidas e pontos sustentados — 15/11/2026

A pedido do usuário, revisados `.locals/dados-base/LEIA-ME.txt`, manifesto, respostas, procedências e tabela XLSX original do MapBiomas, além das séries mais recentes em `data/nasa`. Os pontos aleatórios de solo, sucessão, disponibilidade de água e calendário foram substituídos por referências ambientais calculadas sobre os dados disponíveis. Mantidos cultivo atual, ordem e meses preenchidos.

- NASA POWER 2021–2025: temperatura média diária T2M e chuva PRECTOTCORR em `data/nasa/mogi-2021-2025.json`; radiação ALLSKY_SFC_SW_DWN/SYN1DEG em `mogi-solar-2021-2025.json`. Séries completas por mês/ano; faltas não viram zero. Temperatura usa faixas técnicas já existentes com limites de variedade/fase explícitos. Chuva é intervalo entre totais mensais anuais; radiação, intervalo entre médias diárias mensais. Fontes, parâmetros, período, unidade, escala municipal e link aparecem ao abrir; fonte e período ficam no subtítulo.
- Open-Meteo: tempestade/rajadas somente no primeiro próximo cultivo, no mês atual e com previsão válida. Usa o mesmo snapshot do FarmProvider. Não estende sete dias aos meses seguintes.
- MapBiomas: existe tabela municipal de irrigação, mas nenhuma ocorrência de Mogi das Cruzes ou código 3530607 foi encontrada no XLSX original. Não sustenta ponto do canteiro neste recorte. Não preencher com município vizinho ou total nacional.
- SoilGrids: todas as propriedades solicitadas retornaram valores nulos; nenhum ponto de fertilidade, textura ou dose foi gerado dessa resposta.
- HLS/SMAP/IMERG/ECOSTRESS: catálogos/metadados adquiridos; pixels não extraídos. Não sustentam vigor, umidade ou evapotranspiração medida no canteiro.
- IBGE: estatísticas municipais adquiridas são contexto produtivo, não predição de produtividade, sucesso ou compatibilidade da sequência. Conab/Cepea têm páginas/documentação, sem série estruturada integrada.

`buildRotationStages` agora recebe as evidências consultadas; não sorteia alertas e não usa relato de solo/água como substituto de dado ambiental. O histórico NASA é referência para conferir o mês escolhido, não previsão sazonal ou validação agronômica. Sem mês, pede a época; durante consulta e na falta de dados, mostra pendência explícita. Áudio individual e catálogo usam os mesmos resultados; o resumo geral lê a sequência sem inventar análise indisponível. Nenhum arquivo de `.locals` foi versionado, modificado ou baixado novamente.


Referência técnica do recorte fechado em 15/11/2026. Complementa [dores, jornada e exemplos](predicao-tres-perguntas.md). Esta é a lista para preparar a integração futura; só os contratos explicitamente marcados como existentes já estão implementados. O mock de rotação não executa esses cruzamentos.

## 1. Clima — fornecedor NASA POWER

Serviço adquirido: `https://power.larc.nasa.gov/api/temporal/daily/point`, `community=AG`, `time-standard=UTC`, `format=JSON`. Referência solicitada: latitude **-23.52278**, longitude **-46.18833**, Mogi das Cruzes. Amostra: `start=20251101`, `end=20251114`. O planejamento exige uma série contínua de vários anos ainda a selecionar/adquirir.

Os nomes e unidades abaixo foram conferidos em `.locals/dados-base/nasa-power/resposta.json`. Valores ficam em `properties.parameter.<código>.<YYYYMMDD>`. As três primeiras linhas são o núcleo escolhido; as demais são variáveis adicionais presentes na amostra, sem uso obrigatório neste recorte.

| Código do fornecedor | Significado | Unidade original | Papel |
| --- | --- | --- | --- |
| `PRECTOTCORR` | Precipitação corrigida | `mm/day` | Comparar exposição à chuva por fase/época. |
| `T2M`, `T2M_MIN`, `T2M_MAX` | Temperatura média, mínima e máxima do ar a 2 m | `C` | Comparar exposição térmica. |
| `ALLSKY_SFC_SW_DWN` | Radiação solar incidente de onda curta | `MJ/m^2/day` | Comparar ambiente de radiação. |
| `RH2M` | Umidade relativa do ar a 2 m | `%` | Apoio ambiental adicional. Não é umidade do solo. |
| `WS2M` | Velocidade do vento a 2 m | `m/s` | Apoio ambiental adicional. |
| `PS` | Pressão superficial | `kPa` | Apoio ambiental adicional. |
| `T2MDEW` | Temperatura do ponto de orvalho a 2 m | `C` | Apoio ambiental adicional. |

Preservar `geometry.coordinates`, `header.start`, `header.end`, `header.time_standard`, `header.sources`, `header.api.version`, `header.fill_value` e `parameters.<código>.units`. Nesta amostra, `fill_value=-999`; não tratá-lo como medida. Guardar também URL, horário de aquisição, hash e versão do método. Não converter silenciosamente datas UTC em dias locais nem substituir coordenadas solicitadas pelas retornadas.

### Apoio de curto prazo — fornecedor Open-Meteo

Integração existente: `src/backend/weather/openMeteo.ts`, API pública `https://api.open-meteo.com/v1/forecast`. Parâmetros: ponto de Mogi, `timezone=America/Sao_Paulo`, `forecast_days=7`, `models=best_match`. O seletor não identifica por si só um único provedor meteorológico. Consulta meteorológica existente não equivale à integração do motor de rotação.

| Campo em `daily` | Campo no contrato existente `Forecast.days[]` | Unidade |
| --- | --- | --- |
| `time` | `date` | `YYYY-MM-DD` local |
| `weather_code` | `code` | Código meteorológico |
| `temperature_2m_max` | `high` | °C |
| `temperature_2m_min` | `low` | °C |
| `precipitation_sum` | `rainMm` | mm |
| `precipitation_probability_max` | `rainChance` | % de chuva, não de perda |
| `wind_gusts_10m_max` | `gustKmh` | km/h |

Metadados existentes: `id`, `areaId`, `fetchedAt`, `expiresAt`, `timezone`, `source`, `model`, `requestedPoint.{latitude,longitude}`, `gridPoint.{latitude,longitude}`. Cache de consulta: 15 minutos; validade operacional: até seis horas e dentro do dia local inicial da previsão. Valores nulos permanecem ausentes. O inventário possui amostra horária ampliada, mas ela não é o contrato consumido pelo aplicativo atual.

## 2. Histórico — fornecedor produtor e referências agronômicas

Contratos atuais: `src/shared/farm.ts`. Responsável pela informação local: produtor. Persistência: IndexedDB via FarmProvider, neste aparelho. Não é uma base histórica fornecida pela NASA.

| Campo existente | Tipo / conteúdo | Uso e limite |
| --- | --- | --- |
| `currentCrop` | Alface, Cenoura, Tomate ou `null` | Cultivo presente explicitamente informado. |
| `cropCheckedAt` | Data/hora ISO ou `null` | Quando o contexto foi conferido; não é data de plantio. |
| `records[].id`, `areaId` | Identificadores | Vincular relato à área. Hoje há uma referência de área, não cadastro de múltiplas propriedades. |
| `records[].action` | Plantei, Reguei ou Colhi | Separar execução relatada de intenção. |
| `records[].crop` | Cultura do relato | Reconstrução futura do histórico; sem ciclos completos inferidos. |
| `records[].date` | `YYYY-MM-DD` | Data informada da ocorrência. |
| `records[].reportedAt` | Data/hora ISO | Momento do registro. |
| `area.name`, `area.size` | Texto | Identificação e tamanho relatado; tamanho ainda não tem valor/unidade estruturados. |
| `revision`, `needsReview` | Inteiro, booleano | Mudança de contexto e pendência de conferência. |
| `exampleLoadedAt` | Data/hora ou `null` | Identifica carga explícita de histórico demonstrativo; não é evidência de campo. |

**Campos propostos, ainda sem formulário ou schema:** `cropCycleId`, `cropSpecies`, `cultivar`, `plantedOn`, `endedOn`, `datePrecision`, `cultivationEnvironment` (aberto/protegido/desconhecido), `diagnosedProblemId`, `diagnosisSource`, `diagnosedAt`, `diagnosisReference`. Vincular cada item a `areaId`; ausência não vira resposta negativa. O fornecedor do diagnóstico é a avaliação técnica identificada; o produtor pode relatar sua existência sem o aplicativo validá-lo automaticamente.

**Fornecedor do conhecimento técnico:** Embrapa, inicialmente a Circular Técnica 152 (2016), *Rotação e Sucessão de Culturas em Hortaliças Cultivadas em Pequenas Áreas no Manejo de Doenças*. Referências por cultura de Embrapa/Incaper podem complementar após extração e revisão. Nenhum fornecedor oferece hoje um catálogo de regras integrado ao projeto.

**Campos propostos para cada regra revisada:** `ruleId`, `cropSpecies`, `botanicalFamily`, `problemId`, `hostRelationship`, `applicableCultivar`, `minimumReturnIntervalDays` (somente quando sustentado), `applicabilityConditions`, `sourceUrl`, `sourceTitle`, `sourcePage`, `sourceDate`, `reviewedAt`, `methodVersion`. Intervalo ausente não é zero; regra genérica não resolve todos os problemas do solo.

## 3. Solo — análise local, ISRIC e apoio NASA

**Fornecedor prioritário:** laboratório responsável pela análise local e profissional que a interpreta. Laboratório/profissional ainda não selecionados; não há laudo adquirido nem leitor de PDF. Minha área tem apenas `area.soil` e `area.water` como textos relatados e `area.updatedAt` como data/hora da edição. Não extrair automaticamente medidas desses textos. `report.value` e `observations[].value` são aparência relatada (Seco, Úmido, Com poças, Não sei), não análise laboratorial.

### Campos locais propostos, ainda não implementados

| Grupo / nomes internos propostos | Origem e formato | Uso |
| --- | --- | --- |
| `soilReportId`, `areaId`, `sampledAt`, `issuedAt` | Laboratório/produtor; identificadores e datas ISO conhecidas | Identificar área e referência temporal da amostra. |
| `laboratoryName`, `reportReference`, `samplingLocation` | Laudo e identificação da amostragem | Procedência; coordenada/geometria só quando necessária. |
| `depthTopCm`, `depthBottomCm` | Laudo, cm | Camada efetivamente amostrada. |
| `measurements[].propertyCode` | Laudo; vocabulário revisado | Núcleo candidato: pH, carbono orgânico/matéria orgânica e textura; selecionar propriedades conforme a pergunta técnica. |
| `measurements[].value`, `unit`, `method` | Valores, unidades e método originais do laboratório | Interpretar com referência compatível; pH exige meio/método. Não converter matéria orgânica em carbono automaticamente. |
| `physicalLimitation`, `drainageAssessment`, `assessedAt`, `assessor`, `assessmentReference` | Avaliação técnica local, com origem | Descrever limitação conhecida, sem diagnóstico pela aparência. |
| `managementObjective`, `cropRequirementsReference` | Produtor + perfil técnico revisado | Avaliar cultivo ou cobertura para um objetivo explícito. |

Nutrientes adicionais só entram quando houver método que os utilize, com código, unidade, método laboratorial e referência de interpretação definidos. Não há lista de nutrientes obrigatória, faixa numérica ou dose aprovada neste recorte.

### Fornecedor complementar — ISRIC SoilGrids

Consulta amostrada: `https://rest.isric.org/soilgrids/v2.0/properties/query`, mesmo ponto de Mogi, `depth=0-5cm`, `value=mean`, `Q0.05`, `Q0.95`.

| `property` solicitado | Significado | Metadados brutos na resposta local |
| --- | --- | --- |
| `clay`, `sand`, `silt` | Argila, areia e silte | `mapped_units=g/kg`, `target_units=%`, `d_factor=10` |
| `soc` | Carbono orgânico do solo | `mapped_units=dg/kg`, `target_units=g/kg`, `d_factor=10` |
| `phh2o` | pH em água | `mapped_units=pH*10`, `target_units=-`, `d_factor=10` |

Caminho dos valores: `properties.layers[].depths[].values.{mean,Q0.05,Q0.95}`. Preservar `layers[].name`, `unit_measure`, `depths[].range.{top_depth,bottom_depth,unit_depth}`, `geometry` e procedência. **Todos os valores consultados retornaram nulos.** Os metadados acima reproduzem o arquivo, não validam uma conversão: antes de usar valores futuros, conferir a escala e a transformação na documentação do fornecedor. Não preencher dados locais com esses valores regionais estimados sem identificar escala e incerteza. Acesso futuro ao serviço precisa de nova verificação.

### Apoio opcional — NASA SMAP L4

Produto investigado: `SPL4SMGP`, fornecedor NASA/NSIDC, para contexto regional de umidade superficial/radicular. No projeto há catálogo e metadados de cena; nenhum valor de umidade extraído. **Não há campos de pixel aprovados no contrato atual.** Antes de integrar, fixar versão, nomes de variáveis no arquivo, unidades, profundidades, resolução, qualidade e método de extração. Não assumir que o catálogo já contém esses valores nem usar SMAP como laudo de fertilidade. POWER permanece a fonte NASA do primeiro recorte visual.

## Campos comuns para a futura análise

Proposta a implementar: `analysisId`, `areaId`, `inputRevision`, `methodVersion`, `preparedAt`, `validUntil` quando aplicável, `sourceReferences[]`, `missingFields[]`, `status` e `alternatives[]`. Cada alternativa precisará de etapas (`cropSpecies`, `stage`, `startDate`, `endDate`, `datePrecision`) e explicação por pergunta: evidência, condição, ação e acompanhamento. Datas e durações agronômicas ainda não foram aprovadas. Não confundir este contrato proposto com o schema atual de intenção `SavedPlan`.

No mock, os campos efetivos são `id`, `title`, `source`, `intro`, `input`, `sources`, `limit`, `examples[].message`, `action` e `followUp`, em `src/frontend/planner/rotation-mock.ts`. São roteiro de apresentação, não dados ambientais processados. O texto e o áudio usam esses mesmos campos.

MapBiomas e IBGE seguem como contexto territorial/produtivo no inventário; não foram selecionados como entrada obrigatória destas três perguntas. Nada nesta lista comprova redução de perda, melhoria do solo ou uma recomendação pronta.
