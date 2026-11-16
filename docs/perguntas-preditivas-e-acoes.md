# Perguntas para predição e ações no NASA-FARM

Documento de discussão — 15/11/2026.

O objetivo é descobrir quais decisões podem ser apoiadas pelas fontes já selecionadas, considerando desperdício de água, energia, mudas, produção, insumos e trabalho. A investigação começa pelos dados e pelas perguntas que eles sustentam. Não fica restrita a um único tipo de desperdício.

O inventário reúne **55 perguntas**. Algumas já têm resposta ambiental ou regional nas amostras; outras exigem informações da área, parâmetros agronômicos, séries maiores ou validação. Uma resposta meteorológica disponível não significa que a consequência agrícola já possa ser calculada.

## Recorte escolhido para a experiência

Decisão de 15/11/2026: três perguntas — clima (31), compatibilidade com histórico (30) e condições do solo (desdobramento da 30 apoiado na 49). A 35 permanece pendente. Especificação, dores, fontes e ligação aos exemplos mockados em [predicao-tres-perguntas.md](predicao-tres-perguntas.md). O inventário abaixo continua como investigação; não indica novas funcionalidades entregues.

## 1. Como interpretar as situações

- **Disponível na amostra:** os arquivos adquiridos permitem responder no recorte informado. Isso não significa que o site já mostre a resposta.
- **Depende de dados locais:** a fonte ambiental existe, mas faltam programação, cultivo, fase, solo, manejo ou registros da área.
- **Depende de método:** exige parâmetros documentados, implementação e avaliação do método, além das entradas indicadas.
- **Aquisição pendente:** há documentação ou catálogo, mas ainda faltam valores utilizáveis, extração ou uma série adequada.
- **Sem suporte atual:** não há base para entregar essa conclusão com os dados desta investigação.

As ações abaixo são possibilidades de produto a avaliar, não recomendações agronômicas calculadas para uma propriedade. Quando faltam dados, a ação pode ser informar, conferir ou comparar. Comandar equipamentos exige integração própria e regras operacionais verificadas.

## 2. O que foi adquirido

Os arquivos estão em [`.locals/dados-base/`](../.locals/dados-base/). A pasta é local e está ignorada pelo Git. O [manifesto](../.locals/dados-base/manifesto.json) registra URLs exatas, horário da consulta, tipo de conteúdo, tamanho, hash e resultado. Cada fonte também tem `procedencia.json`. As amostras foram adquiridas novamente; código e resultados simulados do mock não alimentam a aplicação.

O local consultado é **o ponto de referência municipal de Mogi das Cruzes**, latitude -23,52278 e longitude -46,18833, usado atualmente pelo site. Não representa uma propriedade delimitada. Não foram transferidos dados de Sorriso.

| Fonte | Amostra e resultado | Papel possível e limite |
| --- | --- | --- |
| NASA POWER | 14 dias, de 01 a 14/11/2025; nove variáveis: chuva, temperaturas média/mínima/máxima, radiação, umidade relativa, vento a 2 m, pressão e ponto de orvalho. Valores presentes nas séries solicitadas. | Histórico ambiental para explorar entradas e cenários. Quatorze dias não permitem estimar frequência sazonal ou treinar probabilidades de perda. Padrão temporal UTC preservado. |
| Open-Meteo | Previsão de 15 a 21/11/2026, com 168 horários e sete resumos diários; chuva/probabilidade, temperatura, umidade, radiação, ETo, déficit de pressão de vapor e rajadas. | Condições esperadas para operações próximas. `best_match` foi o seletor solicitado; não atribuir automaticamente a NOAA GFS. Variáveis modeladas não são sensores do canteiro. |
| IBGE PAM, tabela 5457 | Mogi; 2024 e 2025; alface, cenoura, tomate e cebola; produção, área colhida e valor da produção, mais metadados. | Contexto produtivo municipal. Alface e cenoura têm `...` em 2024; cebola retorna `-`. Símbolos originais preservados, sem transformar em observações numéricas. |
| IBGE Censo Agropecuário, tabela 6953 | Mogi em 2017; quantidades produzida e vendida de alface, cenoura e tomate estaqueado; metadados preservados. | Contexto estrutural. Diferença entre produzido e vendido não comprova descarte. Censo e PAM têm recortes distintos e não devem ser concatenados como uma única série anual. |
| MapBiomas irrigação, Coleção 11 | Legenda, documentação e tabela municipal nacional de aproximadamente 4,5 MB. Leitura da aba `IRRIGATION_SYSTEMS`: não foi encontrada linha para o código 3530607. Recorte e cabeçalhos em `amostra-mogi.json`. | Ausência de linha não comprova ausência de irrigação no município ou na propriedade. A tabela informa classes/áreas mapeadas, não volume aplicado nem programação de bomba. |
| SoilGrids | Consulta de argila, areia, silte, carbono e pH, camada 0–5 cm, com média e quantis. Serviço respondeu; todos os valores solicitados vieram nulos. | Não há perfil utilizável neste ponto. Não substituir por solo de município vizinho. Ausência de valor não é diagnóstico. |
| HLS L30 e S30 | Uma coleção e uma cena de cada produto, intersectando a caixa de referência em novembro de 2025. | Catálogo adquirido, sem bandas, máscara de qualidade ou NDVI extraídos. O pixel pode misturar canteiros e outros usos. |
| SMAP SPL4SMGP | Coleção e uma cena de novembro de 2025. | Catálogo, sem umidade extraída. Produto regional/modelado não representa leitura direta da zona radicular do canteiro. |
| GPM IMERG Final diário V07 | Coleção consultada termina em 30/09/2025; a janela de novembro retornou vazia. Adquirido metadado de uma cena de 14/09/2025 como amostra de acesso, com mudança de período explícita. | Catálogo, sem precipitação pontual extraída. Não misturar silenciosamente essa cena de setembro com a janela de novembro. |
| ECOSTRESS L2T LSTE e L3T JET | Coleções e uma cena de cada produto em novembro de 2025. | Temperatura de superfície/evapotranspiração são possibilidades de extração, não valores locais já disponíveis. |
| Acesso aos pixels NASA | Tentativas `HEAD` em links de HLS, SMAP, GPM e ECOSTRESS retornaram HTTP 403, registradas em `verificacao-acesso.json`. | O caminho de acesso ainda precisa ser resolvido. Não concluir que um cadastro sozinho eliminará o impedimento sem nova verificação. Nenhuma credencial foi solicitada. |
| Conab/Prohort | Página oficial e endereço do portal de consultas identificados; portal sem resposta utilizável nesta tentativa. | Série estruturada por produto, praça, unidade e período ainda não adquirida. |
| Cepea/Hortifruti Brasil | Página pública de preços/metodologia salva. | Não foi montada uma série estruturada com praça, unidade e período completos. Preços isolados na página não foram usados como previsão de receita. |
| FAO56 | Índice e capítulo de coeficientes de cultura adquiridos em HTML. | Método e parâmetros de referência para estimar demanda; não substituem calibração local, fase, sistema e balanço de água. |
| Embrapa/Incaper, alface | Referências identificadas e acesso verificado. PDFs de aproximadamente 10 MB e 13,6 MB não foram salvos nesta amostragem. | Perfis técnicos por cultura/cultivar ainda precisam ser extraídos e revisados. Não há limiar de mortalidade definido neste trabalho. |
| Dados do produtor | Nenhum dado pessoal real adquirido. O aplicativo atual já permite alguns relatos locais. | Programação de irrigação, vazão, cultivar, fase, solo, volumes, custos, replantio e descarte continuam lacunas relevantes. |

A verificação dos arquivos conferiu hashes, continuidade das datas, comprimentos das séries, ausências nas variáveis POWER solicitadas, coerência entre temperaturas e precipitação não negativa. O resumo está em [`resumo-verificado.json`](../.locals/dados-base/resumo-verificado.json). Esses controles verificam as amostras, não validam um modelo agronômico.

## 3. Perguntas e ações possíveis

### Condições ambientais e antecedência

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 01. Quando a previsão indica chuva e quanto pode chover? | Disponível na amostra | Previsão horária/diária, no horizonte consultado e com atualização antes do uso. | Conferir operações e identificar horários que merecem revisão. |
| 02. Qual a probabilidade de chuva nos horários relevantes? | Disponível na amostra | Probabilidade horária separada de quantidade prevista. Não representa probabilidade de perda agrícola. | Explicar incerteza e combinar uma nova conferência perto da operação. |
| 03. Como temperatura e duração da exposição mudam nos próximos dias? | Disponível na amostra | Temperatura horária; comparar amplitudes, mudanças e horas em faixas explicitadas. Limiares agrícolas exigem perfil técnico. | Identificar períodos para avaliar plantio, proteção e trabalho. |
| 04. Como varia a radiação solar ao longo do dia e da semana? | Disponível na amostra | Radiação horária e soma diária, preservando W/m² e MJ/m². Radiação não é temperatura da folha. | Comparar horários e investigar se uma cultura sensível requer avaliação de proteção. |
| 05. Quando a atmosfera apresenta maior demanda evaporativa? | Disponível na amostra | ETo, umidade, déficit de pressão de vapor e condições meteorológicas. ETo não é água a aplicar. | Priorizar conferência hídrica e preparar estimativa específica da cultura. |
| 06. Quando há rajadas previstas que merecem atenção? | Disponível na amostra | Rajadas previstas e seus horários; efeito depende da estrutura, operação e cultivo. | Conferir proteção, estruturas e janelas de operação. |
| 07. Que variação ambiental aparece nos dias históricos baixados? | Disponível na amostra | POWER de 01–14/11/2025. Permite descrever apenas esse pequeno recorte. | Explorar formato e variáveis antes de ampliar o histórico. |
| 08. Quais dias e horários têm condições meteorológicas diferentes entre si? | Disponível na amostra | Comparação das mesmas variáveis e unidades na previsão. Sem pontuação agrícola arbitrária. | Levar opções ambientais à comparação de uma operação concreta. |

### Água e energia

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 09. Uma irrigação programada coincide com chuva prevista? | Depende de dados locais | Previsão horária + horário, duração, área atendida e sistema de irrigação. Em cultivo protegido, confirmar se a chuva alcança o solo. | Mostrar o conflito e oferecer conferir a programação. |
| 10. É possível adiar ou dispensar a próxima irrigação? | Depende de método | Chuva efetiva, água no solo, raízes, fase, demanda, sistema, última rega e regra operacional validada. Chuva prevista isoladamente não basta. | Comparar manter, adiar ou suspender aquele ciclo, quando admissível, com conferência posterior. |
| 11. Quanto tempo ou volume de irrigação seria adequado? | Depende de método | Balanço hídrico, vazão, uniformidade/eficiência, área e limites operacionais. | Propor duração/volume verificável quando todas as entradas existirem. |
| 12. Há risco de aplicar água além da capacidade de armazenamento do solo? | Depende de método | Solo válido, estado hídrico inicial, profundidade radicular, chuva efetiva, irrigação e drenagem. | Rever uma aplicação e acompanhar acúmulo/drenagem; não indicar obras por previsão. |
| 13. A água disponível pode ser insuficiente nos próximos dias? | Depende de método | Demanda por cultura/fase, balanço, reserva e restrições reais de abastecimento. | Antecipar conferência da reserva e comparar operações ou área planejada. |
| 14. Rever um ciclo de irrigação pode reduzir gasto de energia? | Depende de dados locais | Primeiro demonstrar a alteração admissível de irrigação; depois potência/consumo medido, duração e tarifa. | Mostrar estimativa condicional de kWh/custo e pedir confirmação da mudança. |
| 15. Qual sequência cabe melhor no orçamento de água da área? | Depende de método | ETo/histórico ampliado, Kc por fase/sistema, calendário, área, solo e água disponível. Cobertura também consome água. | Comparar cultura, janela, cobertura e área com os compromissos explícitos. |
| 16. A mudança adotada realmente economizou água ou energia? | Depende de dados locais | Volumes/consumo antes e depois, referência comparável, chuva, área e produção útil. Exige período de acompanhamento. | Registrar resultado observado e revisar a orientação futura. |

### Temperatura, radiação e estabelecimento das plantas

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 17. A cultura ficará exposta a calor ou frio fora de uma faixa técnica relevante? | Depende de método | Cultivar, fase, duração de exposição e limites documentados + previsão. | Conferir o cultivo e avaliar ajuste de janela ou proteção compatível. |
| 18. A combinação de calor, radiação e demanda evaporativa merece atenção especial? | Depende de método | Meteorologia + perfil da cultura, água disponível, ambiente aberto/protegido e resposta validada. | Priorizar observação e comparar proteção/horário; não inferir morte só pelas variáveis. |
| 19. Há outra janela de transplante com menor exposição ao fator identificado? | Depende de método | Perfil técnico, previsão, solo, prontidão e conservação das mudas, mão de obra e calendário. | Comparar datas/horários e confirmar a alternativa ou manter a intenção com pendências. |
| 20. As condições da semeadura podem dificultar a germinação? | Depende de método | Espécie/cultivar, temperatura e umidade do substrato/solo, profundidade e manejo; temperatura do ar sozinha é insuficiente. | Conferir substrato e comparar uma janela admissível. |
| 21. Faz sentido avaliar proteção temporária ou sombreamento? | Depende de método | Cultivo/fase, estrutura disponível, efeito esperado e restrições técnicas de luz/ventilação. | Apresentar uma opção tecnicamente sustentada e indicar como acompanhar a resposta. |
| 22. A mudança de temperatura pode alterar a duração do ciclo ou a data de colheita? | Depende de método | Modelo fenológico específico, datas e cultivar, parâmetros e cenários meteorológicos além do horizonte disponível. | Mostrar faixa de datas e revisar sequência e compromissos de colheita. |
| 23. Qual a chance de morte das plantas ou percentual de perda? | Sem suporte atual | Exige função de resposta e resultados locais de sobrevivência/perda, com validação e calibração. As amostras ambientais não fornecem esses rótulos. | Por enquanto, comunicar exposição e pedir avaliação, sem publicar percentual ou prognóstico de morte. |

### Insumos, operações e trabalho

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 24. Uma aplicação planejada coincide com chuva ou vento incompatível com a operação? | Depende de método | Horário, tipo de aplicação, equipamento e regras técnicas específicas, além de chuva/vento previstos. | Conferir ou reprogramar conforme instruções aplicáveis. Não prescrever produto/dose. |
| 25. Pode haver perda de nutrientes por lixiviação ou escoamento? | Depende de método | Chuva, balanço/drenagem, solo, relevo, nutriente, forma, dose e momento da aplicação. | Pedir dados de manejo e revisão técnica antes da operação; não calcular reposição automática. |
| 26. Chuva e condição do solo podem exigir rever preparo ou entrada de equipamento? | Depende de método | Previsão + umidade/condição física local, solo, relevo e operação. | Conferir a área e comparar o adiamento com seus custos. |
| 27. Quais tarefas precisam ser reorganizadas por mudança das condições? | Depende de dados locais | Lista e duração das tarefas, trabalhadores/equipamentos disponíveis e restrições técnicas já estabelecidas. | Ordenar tarefas e oferecer alteração do planejamento. |
| 28. A operação de implantação está exposta a fatores associados a replantio? | Depende de método | Perfil de implantação, previsão, solo, qualidade das mudas e registros locais. Exposição não prova que haverá replantio. | Rever janela e acompanhar sobrevivência e mudas repostas. |
| 29. Quanto custa manter ou mudar uma operação? | Depende de dados locais | Quantidades, preços efetivos, horas, mudas, transporte, conservação e custos adicionais. | Comparar compromissos financeiros sem presumir que adiar sempre economiza. |

### Rotação e calendário

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 30. O próximo cultivo é compatível com a sequência anterior e as restrições conhecidas? | Depende de método | Histórico da mesma área, famílias/hospedeiros, problemas diagnosticados, intervalos e referências técnicas. | Comparar uma cultura admissível ou pedir a informação que falta. |
| 31. Que janelas históricas expõem uma sequência a condições mais favoráveis ou limitantes? | Depende de método | Ampliar POWER para trajetórias contínuas de vários anos, calendário/fases e limites por cultura. Os 14 dias baixados não respondem. | Comparar épocas como cenários, com variação entre anos e sem tratá-las como previsão futura. |
| 32. Como muda a demanda de água entre duas sequências? | Depende de método | Mesma área/horizonte/cenários, fases, parâmetros e balanço quando a comparação envolver irrigação. | Comparar métricas em unidades reais e condições pendentes. |
| 33. Quanto tempo o calendário deixa o solo sem cultivo ou cobertura confirmada? | Depende de dados locais | Datas reais/planejadas e permanência de resíduos. Tempo programado sem cultivo não comprova solo descoberto. | Conferir resíduos/cobertura e comparar ocupação da janela. |
| 34. Vale inserir cobertura antes da próxima hortaliça? | Depende de método | Objetivo de manejo, espécie de cobertura, água, implantação, duração, custo e necessidade de renda. | Comparar cobertura e alternativa comercial admissível, incluindo a pausa na venda. |
| 35. A sequência atende ao prazo de colheita e à disponibilidade de trabalho/água? | Depende de método | Calendários e durações justificadas, recursos locais e incerteza das etapas. | Ajustar a sequência ou explicitar compromisso que não pode ser atendido. |

### Observações por satélite

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 36. Houve mudança persistente na resposta da vegetação da área? | Aquisição pendente | Série HLS com bandas, nuvens/qualidade, geometria real e resolução compatível. Uma cena não descreve tendência. | Pedir observação de campo e investigar causa; índice sozinho não diagnostica doença. |
| 37. Há mudança observável na cobertura superficial da área? | Aquisição pendente | Imagens válidas e comparáveis, dimensão suficiente da área e validação local. | Conferir cobertura/resíduos antes de propor mudança de calendário ou manejo. |
| 38. A temperatura de superfície apresenta comportamento que merece avaliação? | Aquisição pendente | ECOSTRESS LSTE/qualidade, horário da passagem e contexto local. Temperatura superficial não é temperatura do ar. | Priorizar visita/conferência e cruzar com outras evidências. |
| 39. O contexto regional indica condição hídrica diferente da habitual? | Aquisição pendente | Série SMAP adequada, resolução, profundidade/variável e qualidade; comparação histórica consistente. | Solicitar medição local. Não regular irrigação do canteiro diretamente por esse valor regional. |
| 40. A precipitação estimada por satélite ajuda a reconstruir chuva recente? | Aquisição pendente | Valores IMERG, versão, latência, qualidade e comparação com pluviômetro quando disponível. | Rever evidência de chuva ocorrida e atualizar o balanço quando admissível. Não substituir previsão futura. |
| 41. Existem diferenças espaciais que justificam investigar setores da área? | Aquisição pendente | Geometria/setores reais, tamanho compatível com os pixels, séries válidas e conferência de campo. | Indicar onde conferir primeiro. Não extrapolar um pixel misto para um canteiro pequeno. |

### Produção regional e comercialização

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 42. Quais produtos e volumes aparecem nas estatísticas do município? | Disponível na amostra | PAM por produto/ano, com símbolos e cobertura preservados. | Contextualizar as opções de cultivo, sem prometer venda ou inferir cultivo na propriedade. |
| 43. Qual a relação entre produção e área colhida municipal no recorte disponível? | Disponível na amostra | PAM; somente pares numéricos comparáveis e unidade correta. Não extrapolar o resultado para o canteiro. | Oferecer referência regional secundária; não transformá-la em meta ou previsão individual. |
| 44. Quanto foi produzido e vendido na horticultura no levantamento de 2017? | Disponível na amostra | Censo, Mogi, três produtos, mesmo universo das variáveis selecionadas. | Explicar o contexto estrutural. Não chamar a diferença de desperdício nem compará-la diretamente com a PAM. |
| 45. Como os preços variam por época, praça e produto? | Aquisição pendente | Série Conab/Cepea identificada por mercado, unidade, qualidade, calendário e licença de uso. | Comparar exposição comercial de calendários, sem garantir preço futuro. |
| 46. Meu calendário concentra colheita além da capacidade de vender, armazenar ou transportar? | Depende de dados locais | Área, datas e produção estimada/observada com método, pedidos, capacidade e vida útil. IBGE não informa demanda individual. | Comparar escalonamento ou área de plantio antes da implantação. |
| 47. Há risco de descarte por descompasso entre colheita e comercialização? | Depende de método | Histórico local de colheita, qualidade, destinos, pedidos, armazenamento, logística e descarte; séries de mercado podem complementar. | Conferir compradores/logística e comparar ajustes admissíveis. Não inferir descarte só por queda de preço. |

### Solo, resultado e qualidade do alerta

| Nº e pergunta | Situação | Evidência e condição para responder | Ação que a resposta pode apoiar |
| --- | --- | --- | --- |
| 48. Que irrigação é mapeada no território e qual existe na minha área? | Sem suporte local nesta amostra | MapBiomas não trouxe linha de Mogi; infraestrutura da propriedade exige informação própria. Não preencher com zero. | Perguntar qual sistema existe, como funciona e se há automação. |
| 49. Quais características do solo limitam armazenamento e manejo? | Aquisição pendente | SoilGrids sem valores neste ponto; análise/perfil local e profundidade pertinente às raízes são necessários. | Pedir análise ou medição adequada e manter conclusões dependentes pendentes. |
| 50. A rotação está melhorando o solo e em quanto tempo? | Sem suporte atual | Indicadores locais repetidos, histórico, referência comparável e método de atribuição. Clima e espécie anterior não comprovam recuperação. | Definir o indicador a acompanhar e registrar medições entre ciclos. |
| 51. Quanto desperdício de água, energia, mudas, insumos, produção ou trabalho pode ser evitado? | Depende de método | Estimativa específica para cada recurso, referência comparável e dados reais de quantidade/custo. Resultado exige acompanhamento posterior. | Mostrar estimativas separadas por unidade e registrar o que ocorreu; não somar tudo em um percentual arbitrário. |
| 52. Por que a orientação mudou depois de nova previsão ou novo relato? | Depende de método | Análises versionadas, entradas e regras rastreáveis, com diferenças entre contextos. | Explicar a mudança e pedir revisão, preservando a escolha anterior. |
| 53. Qual informação falta para transformar este aviso em uma decisão? | Depende de método | Lista de requisitos por pergunta e saída; uma variável ausente não pode ser presumida favorável. | Fazer uma pergunta por vez, oferecer Não sei e permitir adiar ou pedir ajuda. |
| 54. Este alerta ainda vale para o cultivo e para a operação planejada? | Depende de método | Fonte, consulta, horizonte, análise, área, cultura/fase e eventos posteriores vinculados. | Atualizar ou marcar revisão necessária. Previsão vencida não sustenta ação operacional nova. |
| 55. A ação escolhida funcionou e pode melhorar futuras orientações? | Depende de dados locais | Decisão, execução relatada, condições e resultado observado separados, com quantidade de casos e avaliação adequada. | Pedir acompanhamento, corrigir orientação e, futuramente, avaliar aprendizado com dados reais. Aceitação do alerta não comprova benefício. |

## 4. Como essas perguntas viram alertas com ações

Cada alerta deve identificar **a operação ou etapa afetada**, **o período**, **a evidência**, **a consequência possível**, **o que falta conferir**, **as opções disponíveis** e **como acompanhar o resultado**. Severidade da consequência, probabilidade do evento e qualidade da evidência são conceitos diferentes. Não condensá-los em uma única cor ou porcentagem sem método.

Três exemplos de hipóteses de produto, ainda sem limiares ou recomendações calculadas:

### Irrigação programada e chuva

**Pergunta:** a rega automática prevista para determinado horário merece revisão?

1. Cruzar a programação real com a previsão horária, considerando se a chuva alcança o cultivo.
2. Se houver coincidência relevante, avisar: “Tem chuva prevista perto da rega programada. Vamos conferir antes?”
3. Oferecer **Ver programação**, **Conferir água no solo** e **Comparar ajuste**, conforme os dados disponíveis.
4. Só indicar alteração de duração ou suspensão quando balanço e regra operacional sustentarem a mudança. Caso contrário, pedir os dados que faltam.
5. Se houver integração futura com controlador, distinguir **mudança solicitada**, **confirmada pelo equipamento** e **execução observada**. A implementação atual não controla irrigação.
6. Conferir chuva ocorrida, condição hídrica e volume/energia aplicados para avaliar o resultado.

### Mudança de temperatura e radiação

**Pergunta:** a cultura em determinada fase ficará exposta a condições fora da faixa técnica considerada?

1. Relacionar previsão, duração da exposição, cultivar/fase e ambiente de cultivo.
2. Explicar o fator e a consequência técnica sustentada: estabelecimento, estresse ou desenvolvimento, conforme o método.
3. Oferecer **Conferir cultivo**, **Comparar horário/dia** ou **Avaliar proteção**, quando tecnicamente admissível.
4. Registrar a escolha e acompanhar a resposta das plantas. Sem modelo validado, não dizer que a planta morrerá nem publicar chance de mortalidade.

### Colheita e capacidade de aproveitamento

**Pergunta:** a colheita planejada pode superar a capacidade informada de comercializar ou conservar?

1. Cruzar calendário/quantidade estimada com pedidos, armazenamento, transporte e qualidade necessária.
2. Informar a incompatibilidade identificada e a incerteza da quantidade prevista.
3. Oferecer **Conferir pedidos**, **Comparar escalonamento** ou **Rever próximo plantio**, respeitando a fase atual.
4. Acompanhar produção comercializável, destinos e descarte real. Não presumir que produto não vendido foi descartado.

## 5. O que o modelo precisa receber do produtor

O cadastro deve ser progressivo: pedir cada informação quando ela muda uma decisão, sem exigir todos os campos para consultar o tempo.

| Contexto | Entradas que podem mudar a resposta |
| --- | --- |
| Área | Local real/geometria quando necessária, tamanho, setores, cultivo aberto/protegido e acesso da chuva. |
| Cultivo | Espécie/cultivar, fase, datas, histórico na mesma área e problemas diagnosticados. Cultivo atual separado do próximo cultivo pretendido. |
| Irrigação | Sistema, programação, vazão/volume, área atendida, última aplicação, restrições, possibilidade de controle e confirmação do equipamento. |
| Solo e água | Perfil e profundidade, capacidade de armazenamento, medição hídrica, raízes, drenagem e água disponível, conforme o método. Aparência superficial é relato, não sensor. |
| Operações | O que será feito, quando, insumo/equipamento, quantidade, regras técnicas, equipe e disponibilidade. |
| Produção e mercado | Colheita prevista/real, qualidade, pedidos, destinos, conservação, transporte, preço efetivo e descarte com motivo. |
| Custos e resultados | Água, energia, horas, mudas, insumos, replantio e produção útil, com unidade, período e origem de cada valor. |

## 6. Encaminhamento para a integração no site

As amostras permitem começar uma camada explicável que cruza **condições ambientais, operação e contexto do cultivo**. Regras e simulações documentadas podem fornecer comparações condicionais antes de existir um modelo treinado de perda. Percentuais de dano ou mortalidade precisam de resultados observados e validação própria.

O próximo passo de discussão é classificar as perguntas por valor para o produtor, dados exigidos, tempo para obter resposta e qualidade possível. A seleção pode incluir mais de um tipo de desperdício. A amostra pequena serve para conhecer formato, acesso e lacunas; histórico maior e dados locais entram depois, direcionados pelas perguntas escolhidas.

Na experiência atual, a Home pode destacar o assunto e a próxima conferência; Planejar compara opções; Meu plano acompanha a escolha e sua revisão; Avisos evolui para o contexto do alerta e da conversa. Essa distribuição é uma proposta para discussão. Não foi implementada por esta investigação.

As telas devem consumir a mesma análise, identificada por área, operação, versão das entradas/método e período de validade. Uma mudança preserva a intenção anterior e sinaliza revisão. Escolher uma ação, executá-la e medir seu benefício continuam sendo eventos distintos.

## 7. Fontes e arquivos para conferir

### Amostras locais

- [Manifesto de aquisição](../.locals/dados-base/manifesto.json).
- [Resumo e controles dos valores ambientais](../.locals/dados-base/resumo-verificado.json).
- [Verificação de acesso a arquivos NASA e tamanhos](../.locals/dados-base/verificacao-acesso.json).
- [Histórico NASA POWER](../.locals/dados-base/nasa-power/resposta.json).
- [Previsão Open-Meteo](../.locals/dados-base/open-meteo/resposta.json).
- [IBGE PAM](../.locals/dados-base/ibge-pam/resposta.json) e [Censo horticultura](../.locals/dados-base/ibge-censo-horticultura/resposta.json).
- [Recorte e estrutura MapBiomas](../.locals/dados-base/mapbiomas-irrigacao-municipios/amostra-mogi.json).
- [Resposta SoilGrids](../.locals/dados-base/soilgrids/resposta.json).

Os links de `.locals` funcionam neste ambiente local; os arquivos não acompanham um clone do repositório. Scripts de aquisição e extração ficam junto ao manifesto. O documento permanece legível sem as amostras.

### Referências oficiais

- [NASA POWER, API diária](https://power.larc.nasa.gov/docs/services/api/temporal/daily/).
- [Open-Meteo, variáveis e previsão](https://open-meteo.com/en/docs).
- [IBGE PAM, tabela 5457](https://sidra.ibge.gov.br/tabela/5457) e [Censo horticultura, tabela 6953](https://sidra.ibge.gov.br/tabela/6953).
- [MapBiomas, sistemas de irrigação](https://brasil.mapbiomas.org/iniciativas-e-produtos/cobertura-e-uso-da-terra/agricultura/sistemas-de-irrigacao/).
- [SoilGrids, acesso e limitações do serviço](https://docs.isric.org/globaldata/soilgrids/SoilGrids_faqs_02.html).
- [NASA CMR, documentação de busca](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html). Os identificadores de coleções/cenas consultadas estão nos arquivos locais.
- [NASA GPM, diretório de dados](https://gpm.nasa.gov/data/directory).
- [Conab, Prohort](https://www.gov.br/conab/pt-br/atuacao/informacoes-agropecuarias/hortigranjeiros-prohort).
- [Cepea/Hortifruti, consulta e metodologia](https://hfbrasil.com.br/br/banco-de-dados-precos-medios-dos-hortifruticolas.aspx).
- [FAO56, coeficientes de cultura](https://www.fao.org/4/x0490e/x0490e0b.htm).
- [Embrapa, referência de alface](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1009227/1/DOC142.pdf) e [Incaper, preparo e transplantio](https://biblioteca.incaper.es.gov.br/digital/bitstream/item/4194/1/CulturaDaAlface-Cap3.pdf). Documentos identificados, sem extração técnica nesta aquisição.

### Referências do projeto

[Conteúdo](content.md), [continuidade](continuidade.md), [definição congelada](product-definition.md) e [versão do evento](versao-evento.md). A definição congelada não foi alterada. Este documento registra a nova investigação, sem afirmar que integrações e modelos propostos já estejam implementados.
