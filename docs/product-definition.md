# Definição de produto — cópia local

Título: Predição e apoio à decisão para rotação de hortaliças
Fonte: https://docs.google.com/document/d/1zKVBM3_vXwUHLiWRmXiP3FbNU3qvwy-0sBt2koIMN4I
Cópia consultada em: 14/11/2026
Revisão de origem: AHj4eMTjXtBgrN5oukCSaSYz31_pbXA7VhrpOVBRgQCmwmWdmTR0zOgu8txmRDKAatQ9SEAoyvYbMW1eRkjZ_b9S0E0fD_rUINUiJPiuqms
Formato: texto extraído do Google Docs; inclui todas as abas retornadas pelo conector.
Limite: não preserva layout, imagens, hyperlinks embutidos ou estrutura visual de tabelas.
Uso: referência local congelada; atualizar somente quando solicitado pelo usuário.


=== ABA t.0 ===

Predição e apoio à decisão para rotação de hortaliças
Versão 1.3 — 14/11/2026. Documento de produto, método e validação do GeoAI Lab.
Decisão de escopo: manter hortaliças como foco e tornar a rotação a protagonista. A pergunta principal será: “Qual sequência de cultivos devo escolher nesta área, em quais janelas, para proteger o solo e reduzir o uso desnecessário de recursos?” Clima, água, imagens, solo e produção regional serão evidências para comparar as opções.
Há dados suficientes para iniciar uma comparação de cenários climáticos e agronômicos explicáveis. Ainda faltam dados locais para validar previsões de recuperação do solo, produtividade da propriedade ou redução efetiva de desperdício. Este documento especifica a evolução do produto; o aplicativo atual ainda analisa soja e não implementa o motor de rotação aqui proposto.
1. Alinhamento com o desafio
O desafio oficial Field Shift: Adapting Farms with NASA Data propõe uma ferramenta de apoio à decisão que combine observações da Terra da NASA, informações locais de solo, características das culturas e prioridades do agricultor para explorar estratégias de rotação que fortaleçam o solo e a adaptação da propriedade. Isso confirma a rotação como objeto central do produto. Desafio oficial.
O endereço enviado foi identificado na busca oficial com o segmento field-shift-adapting-farms-with-nasa-data. A verificação nesta data recuperou o resumo oficial indexado; a página completa retornou falha de acesso. Por isso, não atribuímos ao desafio exigências detalhadas de algoritmo, quantidade de rotações ou métricas que não pudemos conferir.
Tradução do desafio para o GeoAI:
Elemento
Aplicação no produto
Observações da NASA
Caracterizar as condições ambientais que cada etapa da rotação enfrentará.
Solo local
Restringir escolhas e identificar o objetivo de manejo que precisa de avaliação.
Características das culturas
Comparar famílias, fases, consumo de água, cobertura e compatibilidade de sucessão.
Prioridades do agricultor
Equilibrar conservação do solo, água disponível, prazo para nova colheita e orçamento.
Apoio à decisão
Explicar alternativas, consequências esperadas, condições de execução e incertezas.
2. Problema e hipótese de solução
O produtor precisa planejar uma sequência, mas os dados chegam separados: chuva, previsão, cultura anterior, análise de solo e registros de colheita. Escolher somente pela próxima venda pode repetir hospedeiros de doenças, expor o solo entre ciclos ou colocar uma fase sensível em uma janela climática desfavorável. A alternância de famílias é um critério inicial; a compatibilidade também depende de patógenos, cultivar e condições locais. Embrapa — rotação e sucessão no manejo de doenças.
Hipótese a testar: uma rotação escolhida com informações ambientais, histórico do canteiro e restrições reais pode reduzir recursos aplicados em condições desfavoráveis e melhorar a continuidade produtiva em comparação com o planejamento habitual.
“Desperdício” terá definições verificáveis: água aplicada sem necessidade demonstrada, insumos utilizados em cultivos que não chegam à comercialização, produção descartada e operações de replantio. Uma redução de chuva ou uma diferença de índice climático não comprova nenhum desses desperdícios.
O produto comparará a prática atual com alternativas. Não partirá da premissa de que qualquer rotação economiza água, de que toda cobertura recupera o solo rapidamente ou de que o efeito já foi comprovado na área.
14. Mensagem de produto sustentada pelas evidências
“Planeje a próxima rotação de hortaliças com dados da NASA e informações da sua área. Compare sequências, veja onde o calendário e a água podem limitar cada opção e entenda quando uma cobertura merece entrar antes da próxima colheita.”
A promessa inicial é apoiar uma decisão explicável. Redução de desperdício e melhoria do solo são objetivos que serão medidos no piloto, e não resultados presumidos pela presença de dados ambientais.

=== ABA t.a7go1lokaukf ===

3. Escolha das culturas e papel das coberturas
3.1 Hortaliças continuam como foco
O conjunto inicial de candidatos terá alface, cenoura, cebola, tomate e feijão-vagem. São opções para construir e avaliar sequências; a inclusão no catálogo não equivale a uma recomendação para Sorriso ou para uma estação específica. Cada perfil precisa de cultivar ou grupo de cultivares, duração, fases, limites climáticos, manejo e fonte técnica revisados para o local.
Candidato
Família botânica
Papel no estudo
Alface
Asteraceae
Alternativa folhosa e opção de retorno à produção após outra família.
Cenoura
Apiaceae
Diversificação com hortaliça de raiz; exige avaliar condições físicas do canteiro.
Cebola
Amaryllidaceae
Alternativa de família distinta, condicionada à cultivar e à janela local.
Tomate
Solanaceae
Cultura comercial com histórico regional anterior a 2025 em bases públicas.
Feijão-vagem
Fabaceae
Alternativa comercial de outra família; não presumir crédito de nitrogênio ao cultivo seguinte.
A classificação e a compatibilidade deverão ter revisão agronômica. Tomate → pimentão ou tomate → batata muda o produto, mas mantém Solanaceae; isso precisa aparecer na comparação. Feijão-vagem não será tratado como adubo verde: colheita, resíduos removidos, nodulação e manejo alteram seu efeito.
3.2 Quando considerar uma cultura que não é hortaliça
Incluir milheto e espécies identificadas de crotalária como candidatos de cobertura/adubação verde, sempre com indicação local. São alternativas para investigar produção de palhada, proteção do solo e manejo de limitações específicas. A literatura registra uso dessas coberturas em sistemas de hortaliças; o desempenho depende do manejo e do ambiente. Estudo sobre coberturas em hortaliças.
Não usar “crotalária” como tratamento genérico de nematoides: espécies de plantas e de nematoides têm respostas diferentes. Se o objetivo for sanitário, exigir diagnóstico e verificar a relação hospedeiro–patógeno antes de recomendar. Embrapa — adubação verde e fitonematoides.
Sempre oferecer uma alternativa com hortaliça quando houver opção agronomicamente admissível, junto da alternativa com cobertura. Se nenhuma hortaliça puder ser considerada adequada com as evidências disponíveis, mostrar o motivo e a informação necessária para reavaliar. Não inventar uma opção segura para preencher a tela.
“Recuperar de forma eficiente e rápida” será traduzido em objetivos separados: reduzir o intervalo com solo descoberto, produzir cobertura, diversificar a sequência ou manejar um problema diagnosticado. Não existe, com a base atual, um prazo validado de “solo recuperado”. Mudanças de matéria orgânica, estrutura e sanidade precisam de acompanhamento próprio.
3.3 Sequências a comparar
Para um histórico informado com tomate, por exemplo:
Estratégia
Sequência candidata
Questão que será respondida
Referência
Repetir o plano real informado pelo produtor
O que acontece se o manejo habitual continuar?
Comercial
Tomate → cebola → alface
A alternância comercial é compatível com local, histórico sanitário e calendário?
Comercial alternativa
Tomate → feijão-vagem → cebola
Existe opção comercial viável com outra família e outro calendário?
Com cobertura
Tomate → cobertura selecionada → hortaliça admissível
A pausa comercial e o custo de implantação são compatíveis com o objetivo de manejo?
Essas sequências são hipóteses para avaliação, não prescrições nem resultados já calculados. Todas serão comparadas no mesmo horizonte, por área equivalente, incluindo preparo, intervalos, cobertura, água consumida e datas de colheita. Culturas em andamento no fim do horizonte ficam identificadas; não desaparecem seus custos ou obrigações futuras.
O planejamento terá horizonte inicial editável de 12 meses, com possibilidade de comparar 24 meses onde o histórico permitir. A sucessão entre colheitas dentro de um ano será parte de um plano de rotação entre anos; não bastará trocar duas culturas uma única vez e declarar a recuperação do sistema. Registrar o intervalo de retorno de cada família e as janelas sazonais ocupadas ao longo do plano. Janelas históricas sobrepostas não serão tratadas como amostras independentes.
6. O que será a predição
O modelo proposto é híbrido: regras agronômicas + simulação por cultura e fase + cenários ambientais + comparação de sequências. A primeira versão não depende de treinar uma rede neural com cinco safras. O produto usa previsões meteorológicas externas no curto prazo e estima consequências condicionais das decisões; a classificação das alternativas é uma camada de decisão explicável.
Saída
Base necessária
O que podemos afirmar
Exposição histórica de uma sequência a calor, chuva e períodos secos
Clima existente, calendário e limites técnicos por cultura/fase
“Esta sequência encontrou estas condições nos anos avaliados.”
Condições para implantar a próxima etapa nos próximos sete dias
Previsão atualizada e perfil da cultura
“A previsão indica condições que justificam rever esta implantação.”
Demanda hídrica potencial por etapa
ETo e Kc documentado por fase/sistema
Estimativa em mm, condicionada aos parâmetros; ainda requer implementação.
Necessidade de irrigação
Demanda, solo válido, estado inicial, chuva efetiva, manejo e eficiência
Só calcular quando esses dados existirem; atualmente pendente.
Continuidade da cobertura e diversificação
Datas, fases, crescimento e manejo de resíduos
Dias programados com cultivo/cobertura; cobertura efetiva exige observação ou modelo validado.
Impacto em produtividade, perdas e recuperação do solo
Resultados locais de múltiplos ciclos e avaliação comparativa
Hipótese por enquanto; sem previsão quantitativa validada.
6.1 Passado, presente e futuro têm papéis distintos
Passado: executar cada sequência nas mesmas condições de cada ano disponível. Preservar blocos diários contínuos, incluindo janelas que atravessam o ano. Sequências cortadas pelo fim da série não recebem resultados completos. Exibir resultados por ano, amplitude e quantidade de cenários válidos; cinco anos não estabelecem uma normal climatológica nem uma probabilidade estável de perda.
Presente: exigir cultura atual, datas, histórico de plantios na mesma área, irrigação disponível e objetivo do produtor. Sem histórico, mostrar “compatibilidade com o cultivo anterior não avaliada”. Sem solo válido, suspender as conclusões que dependem dele, mantendo a comparação ambiental disponível.
Próximos sete dias: usar o snapshot válido para ajustar a próxima operação, sempre mostrando consulta, validade, fuso e modelo. A previsão atual não poderá ser usada como se tivesse sido emitida em 2021–2025.
Restante do ciclo e rotações futuras: usar trajetórias históricas identificadas como cenários. Não prolongar a previsão de sete dias por repetição. Na junção entre previsão e cenário, explicitar a mudança de fonte, testar sensibilidade e conservar a continuidade do estado hídrico, se calculado. Não chamar essa combinação de previsão meteorológica determinística da safra.
Ampliar o histórico POWER é uma evolução possível, sujeita à cobertura real de cada variável. A disponibilidade pública supera o cache atual; ampliar a série exige consulta explícita e nova avaliação de qualidade. NASA POWER — metodologia.
6.2 Cálculos propostos
Para a demanda potencial, usar ETc_potencial(t) = Kc(cultura, fase, sistema) × ETo(t). Kc deve ter fonte, versão e limites de uso; não copiar coeficientes da soja. Para irrigação, usar balanço diário na zona de raízes com armazenamento limitado e entradas/saídas explícitas, incluindo chuva efetiva, irrigação, evapotranspiração ajustada, drenagem e escoamento. Solo, profundidade de raízes e estado inicial precisam ser conhecidos ou apresentados como cenários assumidos. chuva − ETo isoladamente não é esse balanço. FAO56 — demanda e balanço de água.
Não converter deficiência de água em porcentagem de perda de produção sem função de resposta validada. Não estimar fertilidade, nitrogênio disponível ou tempo de recuperação com o comparador climático atual.
6.3 Como escolher entre sequências
Gerar sequências que atendam à área, ao calendário e às culturas permitidas pelo produtor.
Aplicar restrições técnicas: histórico sanitário conhecido, família/hospedeiros, duração, disponibilidade de água, manejo, equipamento e janela local. Restrição desconhecida permanece pendente, sem ser tratada como atendida.
Simular cada candidata nos mesmos cenários ambientais e horizonte da referência.
Comparar consequências em suas unidades: mm, dias, datas de colheita, custos quando disponíveis e restrições sanitárias.
Apresentar as alternativas não dominadas: opções que não são piores em todos os critérios avaliados. As prioridades do produtor definem a ordem de preferência, sem esconder os compromissos.
Mostrar por que a ordem muda entre anos ou premissas. Se os dados não distinguirem duas alternativas, informar empate ou evidência insuficiente.
Prioridades editáveis: proteger o solo, respeitar o orçamento de água, obter colheita até determinada data e limitar o custo de implantação. Não publicar pesos arbitrários como probabilidade de sucesso. A ausência de um fator não vira benefício, risco zero ou redistribuição silenciosa de peso.
6.4 Estado do solo entre ciclos
O motor carregará o histórico de culturas e manejo de uma etapa para a seguinte. A primeira versão registrará família, intervalos, retirada/manutenção de resíduos e objetivos de cobertura. Não inventará uma evolução numérica de matéria orgânica, compactação ou população de patógenos.
Se não houver modelo de efeito residual calibrado, a interface mostrará “benefício de manejo esperado segundo a referência técnica; magnitude local não estimada”. O efeito da rotação não pode ser representado apenas pela soma de riscos climáticos de culturas isoladas.
7. Exemplo real: o histórico já oferece evidência útil
Foram recalculadas, sem novas requisições, duas janelas de 30 dias: 01–30/10 e 01–30/11 em cada ano. São comparações ambientais do ponto exploratório, sem cultura, fase ou irrigação presumidas.
Ano
Janela
Chuva acumulada (mm)
Maior máxima diária (°C)
ETo acumulada (mm)
2021
01–30/10
110,68
37,98
136,41
2021
01–30/11
250,98
33,06
Indisponível: 29/30 dias válidos
2022
01–30/10
185,05
38,12
124,91
2022
01–30/11
122,61
36,54
136,42
2023
01–30/10
118,53
41,16
143,43
2023
01–30/11
127,53
41,56
146,58
2024
01–30/10
126,96
41,54
129,48
2024
01–30/11
215,61
34,66
Indisponível: 29/30 dias válidos
2025
01–30/10
44,79
41,30
142,95
2025
01–30/11
81,20
39,29
Indisponível: 29/30 dias válidos
Origem: CSV da comparação, procedência e método e o arquivo POWER/ETo citado na seção 4. Somatórios exigem 30 valores válidos; totais incompletos permanecem ausentes. Máximas são do ar regional, não da folha ou do solo.
Insight acionável: testar deslocamentos do calendário da sequência, sem assumir que plantar mais tarde sempre melhora as condições. Em 2022, a janela de novembro teve 62,44 mm menos chuva e 11,51 mm mais ETo que a de outubro. Em 2023, novembro também apresentou uma máxima maior. Nenhuma dessas diferenças equivale a água economizada ou perda da hortaliça.
Impacto que a decisão permite investigar: escolher outra data ou outra etapa para reduzir exposição em uma fase sensível e verificar se o plano cabe no orçamento hídrico. O benefício quantitativo depende dos perfis das culturas e, para água de irrigação, do balanço local. Esta análise demonstra a utilidade do calendário; não prova o efeito da rotação no solo.
8. Insights acionáveis que a tela deverá entregar
Cada insight terá cinco partes: evidência → ação → impacto esperado → condição para executar → como conferir o resultado. Os exemplos abaixo são regras de produto, não recomendações já calculadas para o ponto atual.
Situação identificada
Ação apresentada
Impacto esperado e forma de verificar
Próxima cultura mantém família ou hospedeiro incompatível com problema registrado
Comparar uma hortaliça admissível de outra família; quando necessário, cobertura com resposta documentada ao problema.
Evitar perpetuar uma sequência sanitariamente desfavorável. Conferir incidência, diagnóstico e produção comercializável; não prever doença apenas pela família.
Fase de implantação coincide com condição prevista fora do limite documentado da cultivar
Rever data de transplante ou posição dessa cultura na sequência.
Reduzir exposição inicial e investigar menor replantio. Medir sobrevivência de mudas e operações refeitas.
Plano excede a água disponível em cenários avaliados, com balanço hídrico completo
Comparar outra hortaliça, outro calendário ou reduzir a área daquela etapa.
Reduzir demanda planejada até o limite operacional. A cobertura também usa água e entra na conta; conferir volume aplicado.
Intervalo programado deixa o solo sem cultivo e sem resíduo confirmado
Comparar cobertura e alternativa hortícola admissível para ocupar a janela.
Reduzir dias de exposição programada. Medir cobertura real, implantação e manejo; não inferir toneladas de erosão evitada.
Há objetivo diagnosticado de manejo do solo e disponibilidade para interromper venda
Comparar cobertura → hortaliça com rotação somente comercial.
Tornar visível o custo da pausa e o benefício técnico esperado. Repetir análise/indicador de solo pertinente; não prometer recuperação em um ciclo.
Ordem das opções muda entre anos ou hipóteses de solo
Apresentar alternativas e o dado local que mais reduziria a incerteza.
Evitar investimento apoiado em uma conclusão frágil. Registrar se a medição mudou a escolha e acompanhar o resultado.
Formato da mensagem principal:
“Para sua prioridade de [objetivo], compare [sequência A] com [sequência B]. A diferença estimada é [métrica e unidade], nos [cenários avaliados]. Para executar, confirme [condição]. O benefício no solo [foi medido / ainda precisa de validação].”
Nenhum campo será preenchido com número fictício. Se faltar suporte ao impacto, o card mostrará o mecanismo esperado e a medição necessária.

=== ABA t.h4apivk60jhp ===

4. Dados realmente presentes no projeto
Auditoria dos arquivos locais em 14/11/2026. “Disponível publicamente” e “incorporado ao cálculo” são estados diferentes.
Fonte
O que já temos
Uso na rotação
Limite atual
NASA POWER
1.826 datas diárias de 01/01/2021 a 31/12/2025 no ponto exploratório: chuva, temperaturas e radiação.
Reaplicar calendários candidatos aos anos históricos e comparar exposição.
Clima regional; cinco anos, não 1.826 safras independentes.
POWER + FAO56
Mesmo período com umidade, vento, pressão, ponto de orvalho e ETo derivada, com indicadores de validade.
Referência ambiental para estimar demanda por cultura após incorporar parâmetros.
ETo é demanda de referência; não é consumo da hortaliça ou irrigação necessária.
Open-Meteo / NOAA GFS
Snapshot de sete dias, 14–20/11/2026.
Rever a implantação da próxima etapa da sequência.
Precisa estar atualizado; não cobre um ciclo inteiro.
IBGE/PAM
Soja municipal em Sorriso, 2021–2025.
Não alimentará a previsão de hortaliças.
Falta consultar produtos hortícolas; soja não é rótulo de treinamento substituto.
MapBiomas
Irrigação mapeada municipal, Coleção 11, 2021–2025.
Contexto territorial.
Não confirma irrigação no canteiro nem informa volume aplicado.
HLS
Catálogo de cenas L30/S30.
Futuro acompanhamento de cobertura e resposta vegetal.
Bandas e NDVI ainda não processados; 30 m pode misturar canteiros.
SMAP, GPM/IMERG e ECOSTRESS
Catálogos reais e evidências de acesso.
Futuro apoio à caracterização hídrica.
Valores/pixels ainda não extraídos; não entram como medições disponíveis.
SoilGrids
Extração com máscara e procedência.
Contexto de propriedades estimadas onde houver pixel válido.
No ponto padrão, textura é NoData. O perfil vizinho é separado e não substitui o local.
Arquivos-chave:
POWER diário e metadados.
Atmosfera e ETo e metadados.
IBGE de soja e metadados.
Previsão consultada e metadados.
Verificação do solo e estado das fontes hídricas.
O ponto exploratório é associado à região de Sorriso, Mato Grosso, Brasil; não delimita propriedade e não confirma horticultura. Para uma decisão real, selecionar uma área verificada e consultar novamente o local correto. O histórico carregado termina em 2025: ele não representa a condição atual do canteiro em novembro de 2026.
5. Complementos necessários e históricos anteriores a 2025
O início em 2025 de alguns produtos na PAM não inviabiliza o projeto. O motor de cenários pode usar clima anterior e perfis agronômicos publicados. Isso não cria registros históricos de produção que não existem.
Complemento
Evidência e finalidade
Estado no projeto
PAM de produtos já pesquisados
Tomate e batata constam da publicação de 2020; cebola e batata também aparecem em publicações antigas. Conferir produto, município, símbolos e continuidade no SIDRA antes de selecionar a série.
Fonte identificada; hortaliças ainda não adquiridas.
Produtos novos na PAM
A atualização inclui alface, cenoura, pimentão e outros produtos em 2025. Não assumir retroatividade da série.
Cobertura por produto/local precisa ser consultada.
Conab/Prohort
Preços diários e dados mensais de comercialização e origem, conforme produto e central. Apoio comercial opcional.
Não integrado; extensão histórica precisa ser auditada por consulta.
Cepea/Hortifruti Brasil
Séries de preços por produto e região; conferir acesso e período.
Não integrado e fora do núcleo inicial.
Censo Agropecuário
Horticultura em levantamentos como 2006 e 2017; caracterização estrutural.
Não integrado; não produz série anual contínua.
Histórico do produtor
Cultivos, datas, resíduos, análises, irrigação, custos e colheita comercializável.
Entrada nova indispensável para personalização e validação de impacto.
Perfis técnicos
Família, cultivar, fases, Kc, raízes, restrições sanitárias e manejo de resíduos, com fonte e domínio de aplicação.
Cadastro revisado ainda precisa ser construído.
Fontes: PAM 2020, PAM 1974, atualização da PAM, Prohort, Cepea, Censo 2017.
Prioridade de aquisição: histórico do canteiro, parâmetros agronômicos e solo local; depois séries hortícolas municipais compatíveis. Preços entram posteriormente, se a decisão exigir, com origem, unidade e mercado explícitos.
13. Procedência e contrato mínimo de uma análise
Cada análise salvará: identificação e geometria da área; escala; histórico de culturas com origem; decisão e data de corte; horizonte; prioridades; referência; candidatos; restrições; parâmetros e versões; cenários climáticos; resultados por cenário; ausências; motivo da ordem apresentada e da exclusão de opções; fontes; URLs de consulta; data de aquisição; validade; hashes e licenças aplicáveis.
No canal de voz, vincular também o alerta, a versão do pacote de contexto, a solicitação de chamada pelo produtor, o estado da ligação, os relatos e correções com origem, a decisão confirmada e as pendências. Preservar a análise apresentada na conversa mesmo após uma atualização posterior, sem pressupor armazenamento de gravação de áudio.
Os exports preservarão códigos e unidades originais, junto dos nomes acessíveis. Cache deve distinguir fonte, ponto/área, datas, parâmetros, produto e versão. Brutos ficam separados dos derivados; uma análise anterior não será sobrescrita pela atualização da previsão. Nenhuma renderização fará download silencioso.
O índice experimental da soja permanecerá um artefato histórico separado. Seus pesos, limiares e interpretação não serão reutilizados como modelo de hortaliças ou de recuperação do solo.

=== ABA t.uitdhj95jb6r ===

9. Como quantificar e comprovar o impacto
Toda comparação usa a mesma área, horizonte e disponibilidade de recursos. O plano de referência vem do produtor. Se ele não for informado, um cenário escolhido explicitamente pode servir para exploração, mas não será chamado de prática atual.
Indicador
Cálculo ou medição
O que falta hoje
Diferença de demanda potencial
ETc_potencial_referência − ETc_potencial_alternativa, somada para todas as etapas.
Perfis das culturas e calendários; isso não é economia de irrigação.
Diferença de irrigação estimada
Irrigação_bruta_referência − Irrigação_bruta_alternativa, com balanço e mesma regra de manejo.
Solo, estado hídrico, eficiência e restrições. Diferença negativa indica maior necessidade.
Conversão de lâmina em volume
volume_m³ = lâmina_mm × área_ha × 10.
Área real e lâmina justificada; conversão não valida a estimativa.
Água aplicada e produtividade da água
Hidrômetro ou registro de vazão/tempo; massa comercializável por volume aplicado.
Registros de campo e controle das condições de comparação.
Dias de exposição climática por fase
Dias fora dos limites documentados em cada cenário.
Fases e limites por cultivar/sistema. Não equivale a dias de perda.
Dias sem cobertura
Calendário e resíduos registrados; confirmar por observação compatível com a escala.
Histórico do canteiro e cobertura observada. Cultivo presente não garante solo totalmente coberto.
Replantio e descarte
Mudas repostas, horas e kg descartados, com motivo e área.
Resultados de múltiplos ciclos.
Resultado econômico
Receita comercializável menos custos de todas as etapas, incluindo cobertura e intervalo sem venda.
Custos e preços efetivos; preço de Ceasa não é automaticamente preço recebido pelo produtor.
Condição do solo
Indicadores pertinentes ao objetivo: análise química, infiltração, compactação ou diagnóstico sanitário, com método repetido.
Linha de base e acompanhamento; não há índice de recuperação validado.
Para separar o efeito da rotação do efeito do clima ou do manejo, propor piloto com áreas comparáveis, repetição e, quando viável, distribuição aleatória das estratégias. Avaliar vários ciclos e registrar diferenças de irrigação, adubação, cultivar e solo. Uma comparação simples “antes/depois” pode orientar investigação, mas não basta para atribuir causalidade.
O painel diferenciará diferença projetada entre cenários, resultado observado e efeito atribuído em avaliação controlada. Não mostrará percentual de economia, ganho em produtividade ou “dias para recuperar o solo” antes da evidência correspondente.
10. Validação do modelo e incerteza
10.1 Validação possível com o histórico atual
Conferir unidades, calendário, lacunas e comportamento das regras. Reaplicar sequências por ano e testar se a preferência resiste a mudanças plausíveis dos parâmetros. Essa etapa avalia consistência e sensibilidade, não acurácia de previsão de colheita.
Usar anos completos fora do ajuste sempre que houver ajuste de regras. Não dividir dias aleatoriamente entre treino e teste: isso mistura o mesmo ciclo e favorece vazamento. Limites e referências derivados dos dados devem ser calculados só com os dados anteriores ao momento avaliado.
Para testar decisões baseadas em previsão, precisamos das previsões que estavam disponíveis em cada data, ou acompanhar prospectivamente novos snapshots e observações. Histórico meteorológico observado não substitui previsão arquivada. Produtos retrospectivos também podem ter revisões posteriores; sua disponibilidade no momento da decisão precisa ser considerada.
10.2 Evolução para modelos aprendidos
Quando houver registros de ciclos de hortaliças: unidade de análise = canteiro/talhão + ciclo + cultivar + manejo. Relacionar a escolha e o histórico de rotação a resultados medidos. Comparar modelos simples com uma referência sazonal, usando separação temporal e por propriedade para evitar que o mesmo contexto apareça nos dois lados do teste.
Avaliar erro de demanda/volume quando medido, erro de produtividade quando houver rótulo comparável e qualidade das decisões frente ao plano de referência. Probabilidades de perda só serão publicadas após definição do evento, amostra suficiente e avaliação de calibração fora do ajuste. Dados municipais podem apoiar um modelo municipal; não validam automaticamente predição de canteiro.
10.3 Regras de incerteza
Dados ausentes permanecem ausentes. NoData de solo não vira solo arenoso ou seco.
Catálogo de satélite não vira observação de vegetação ou água.
Frequência de exposição em cinco anos não vira chance calibrada de perda futura.
Concordância entre fontes que compartilham insumos não será contada como evidência independente.
Intervalo de cenários representa a variação daqueles cenários; não será chamado de intervalo de confiança sem método adequado.
Conclusões fora da área, cultivar ou sistema de cultivo estudados ficam condicionais.

=== ABA t.wz3fg2apekk5 ===

11. Protagonismo da rotação na experiência
Aplicar as orientações do skill GeoAI: linguagem acessível, ajuda contextual, local em destaque, qualidade em segundo plano e detalhes por fonte. O foco em soja do fluxo atual será substituído pelo planejamento de rotação; dados ambientais continuarão acessíveis como suporte.
Fluxo proposto:
Informar local verificado, área/canteiro, cultura atual, histórico, disponibilidade de água e prioridade.
Definir horizonte comum e clicar em “Comparar rotações”.
Ver a sequência de referência e alternativas em uma linha do tempo com plantio, colheita, cobertura e intervalos.
Comparar os impactos sustentados pelos dados: demanda, exposição por fase, prazo de colheita e custo, quando disponíveis.
Abrir a explicação da escolha, condições para executar e próxima ação.
Consultar clima, água, solo, vegetação e produção regional em detalhes recolhidos e separados por fonte.
A tela principal responderá “o que muda se eu escolher esta rotação?”. Não começará com um conjunto de gráficos de satélite ou o índice da soja. Não há necessidade de mostrar uma pontuação única quando métricas e compromissos explicam melhor a decisão.
Dados de curto prazo e de planejamento terão períodos explícitos: a data da decisão e o horizonte são compartilhados; o histórico apoia cenários e a previsão apoia os primeiros sete dias. Cada fonte preserva sua escala temporal, sem transformar produção anual em dado mensal.
11.1 Uso por voz como parte do acesso principal
Requisito de produto: permitir que pessoas não alfabetizadas, com baixa familiaridade com leitura ou que prefiram conversar compreendam o alerta e participem da decisão. A voz será um canal do mesmo planejamento de rotação, com as mesmas evidências e limites. Diferentemente dos sistemas integrados opcionais da seção 15, esse fluxo faz parte da experiência principal proposta para a primeira versão. Está documentado, mas ainda não implementado no aplicativo atual.
O objetivo é fechar o caminho problema identificado → conversa compreensível → decisão do produtor → acompanhamento do resultado. A ligação não será uma leitura dos gráficos nem uma recomendação agrícola criada durante a conversa. Ela explicará alternativas previamente calculadas e poderá pedir informações locais que ainda faltam.
11.2 Fluxo inicial: notificação → toque → ligação contextualizada
Preparar o acesso: cadastrar ou confirmar o telefone do produtor, área associada, preferência por voz e autorização para receber a ligação ao tocar na notificação. Essa preparação deve oferecer ajuda por áudio e não depender de preencher um formulário extenso sozinho. Avisar de forma acessível que o toque solicitará uma chamada.
Identificar uma situação relevante: o motor de análise encontra uma condição que merece atenção na próxima etapa da rotação. Cada alerta precisa de evidência, prazo e ação possível. Falta de dados gera pedido de informação, sem inventar um problema agronômico. A geração automática de alertas será uma capacidade nova, a implementar.
Preparar antes de notificar: o serviço monta o pacote do alerta, carrega os resultados, alternativas e explicações permitidas e verifica sua validade. Aquisições necessárias ocorrem nessa preparação, por conectores definidos e cache, dentro do escopo autorizado da análise. O agente de voz não faz essas aquisições.
Enviar uma notificação acessível: mensagem curta sobre o tema, indicação sonora/visual e uma ação destacada: “Toque para receber uma ligação”. Ao abrir, oferecer também reprodução em áudio. Não exigir que a pessoa leia uma explicação técnica para conseguir pedir a chamada.
Solicitar a chamada pelo toque: o sistema recebe o pedido, vincula o alerta à pessoa autorizada e inicia a ligação para o telefone cadastrado. Não é necessário digitar o contexto, repetir a pergunta ou copiar informações da tela. A chamada é iniciada pelo serviço de telefonia, não por uma decisão autônoma do modelo.
Abrir a conversa já contextualizada: a IA se identifica como assistente virtual do GeoAI, confirma se está falando com a pessoa esperada antes de detalhar informações da área e explica o motivo do contato em linguagem simples. Usa o mesmo alerta e a mesma versão de análise que originaram a notificação.
Entender a situação local e explicar opções: a IA pode perguntar se a cultura anterior e a data continuam corretas, se há irrigação disponível ou se o produtor já executou a próxima etapa. Faz uma pergunta de cada vez e discute as alternativas existentes no pacote.
Combinar o próximo passo: apresenta a opção, motivo, impacto estimado quando disponível e condição necessária. Pede confirmação verbal antes de registrar uma mudança de plano. O produtor pode discordar, manter o plano, adiar ou solicitar apoio.
Encerrar com resumo falado: repete o que foi entendido e o que ficou combinado, preserva pendências e oferece resumo em áudio no aplicativo. Texto é complemento. Acompanhamento posterior usará as métricas da seção 9.
Fluxo resumido:
Análise da rotação e evidências
  → alerta e contexto preparados
  → notificação acessível
  → produtor toca para receber ligação
  → serviço inicia chamada com o contexto daquele alerta
  → IA explica, escuta e esclarece
  → produtor confirma ou recusa o próximo passo
  → resumo em áudio e registro para acompanhamento
A notificação não dispara uma ligação por conta própria: o toque é a solicitação prevista neste fluxo. Se não houver atendimento, registrar o estado e permitir pedir outra chamada; não fazer tentativas repetidas sem preferência explícita do produtor. Toques repetidos não podem gerar várias ligações simultâneas.
11.3 Conteúdo carregado antes da conversa
O pacote será estruturado e versionado. O nome interno proposto é alert_context; seus dados não serão inseridos livremente pelo usuário como instruções ao agente.
Grupo
Conteúdo mínimo
Identificação e acesso
Identificador do alerta, destinatário autorizado, área/canteiro e vínculo com a análise. Dados pessoais limitados ao necessário.
Situação
Problema ou informação pendente, evidência que o originou, data de referência, prazo de utilidade e estado do alerta.
Cultivo e sequência
Histórico informado, cultura atual, datas, plano de referência e próximas etapas. Separar dado confirmado de hipótese.
Resultados
Métricas efetivamente calculadas, unidades, cenários passados, previsão válida de curto prazo e limites de interpretação.
Alternativas
Sequências já avaliadas, opções hortícolas admissíveis, cobertura quando aplicável, motivos, restrições e compromissos. Sistemas integrados só entram quando a extensão existir e tiver evidência.
Impacto
Diferença projetada contra a referência, condições da estimativa e benefícios ainda não quantificados. Não preencher economia, ganho ou recuperação com números inventados.
Explicações
Termos em linguagem simples, respostas apoiadas nas evidências e trechos técnicos selecionados, com fonte e domínio de aplicação.
Pendências
Perguntas locais que a IA pode fazer e como cada resposta afeta ou limita a comparação.
Procedência e validade
Versão do método, fontes, identificadores dos resultados, aquisição, validade e data de corte.
Ações permitidas
Registrar relato, escolha confirmada, recusa, pedido de retorno ou necessidade de novo cálculo/apoio técnico.
Antes de discar, o serviço confirma se o alerta continua ativo e se o pacote está válido. Se uma previsão venceu ou o produtor já mudou o plano, suspender aquela recomendação e preparar uma análise atualizada pelo fluxo controlado. Informação antiga pode ser explicada como histórico, nunca como condição atual.
11.4 Consulta ao contexto sem navegação livre
Decisão de arquitetura: o agente de voz não receberá ferramenta de navegador, busca na web, acesso HTTP genérico ou execução livre de código. Sua função é conversar a partir do pacote preparado. Se for usada recuperação de contexto (RAG), a busca será limitada ao pacote daquele alerta e a um acervo técnico previamente selecionado, versionado e autorizado para o caso; isso não será busca aberta na internet.
O serviço de preparação continua responsável por consultar as fontes conhecidas, tratar os dados, executar o modelo preditivo e montar o contexto. Assim, coleta, cálculo e conversa têm responsabilidades explícitas. A conversa poderá registrar um pedido de atualização, mas a aquisição não será delegada ao modelo de voz.
As integrações de execução terão operações específicas, como ler_contexto_alerta, registrar_relato, registrar_decisao_confirmada e registrar_pendencia. A autorização e o vínculo entre pessoa, alerta e área serão verificados pelo servidor; o modelo não poderá escolher outro destinatário, telefone ou conjunto de dados. O envio de uma escolha será idempotente, para evitar duplicação por repetição da fala ou da requisição.
Falar algo não torna a informação verdadeira: qualquer número ou comparação agrícola apresentado pela IA precisa estar associado a um resultado do pacote. Instruções do agente, operações restritas e verificações de saída devem reduzir afirmações sem suporte; quando faltar evidência, a resposta será reconhecer o limite e pedir o dado ou registrar a pendência.
Não dar navegação ao agente não significa funcionamento sem conexão. O fluxo de voz hospedado, as novas notificações remotas e a telefonia dependem de comunicação. No fluxo por ligação telefônica, distinguir a conexão usada para receber/tocar a notificação da disponibilidade de sinal para atender. Sem uma delas, mostrar o estado e permitir tentar novamente, sem afirmar que a conversa aconteceu. A extensão offline da seção 16 prevê acesso ao material baixado e a áudios preparados, sem pressupor conversa local com IA.
11.5 Como a conversa pode pedir dados e registrar decisões
Durante a ligação
Comportamento esperado
O produtor pede para explicar uma opção já avaliada
Explicar motivo, condições e impacto disponíveis, com frases curtas e exemplos de linguagem, sem criar novos resultados.
Falta um dado local
Pedir uma informação por vez. Aceitar “não sei”; registrar como relato do produtor, com data, e confirmar o entendimento.
A resposta contradiz o contexto
Suspender a conclusão afetada. Registrar a correção e solicitar nova preparação; não continuar apresentando a análise antiga como válida.
O produtor pede uma cultura ou cenário não calculado
Registrar o pedido e informar que falta comparar essa opção. O cálculo posterior cabe ao motor, com fontes controladas; não improvisar o resultado na ligação.
A pessoa escolhe uma alternativa
Repetir cultura/etapa, área e data ou janela; registrar alteração apenas após confirmação verbal clara. Isso registra o plano, não executa manejo no campo.
O produtor não entende, a transcrição é incerta ou há ruído
Repetir devagar, reformular e confirmar. Não interpretar silêncio ou fala ambígua como concordância.
Falta evidência para afirmar economia ou recuperação
Explicar o benefício esperado como hipótese e dizer qual medição ajudará a conferir.
A pessoa quer encerrar, adiar ou manter o plano
Respeitar a escolha e resumir o estado, sem insistir em uma alternativa.
Exemplo de abertura, a preencher somente com dados reais do pacote:
“Sou a assistente virtual do GeoAI. Você pediu esta ligação para conversar sobre o próximo plantio na sua área. Nossa análise encontrou [situação sustentada pelas evidências]. Isso pode afetar [etapa]. Você já fez esse plantio?”
Se houver uma alternativa pronta, a IA explica a mudança e pergunta se o produtor quer conhecê-la. Não começa afirmando que ele “tem que” mudar a cultura. Um alerta climático não confirma doença, solo degradado ou perda.
11.6 Acessibilidade, continuidade e vínculo com o impacto
Usar português simples, frases curtas, ritmo ajustável e uma decisão de cada vez. Oferecer comandos falados como “repete”, “explica mais simples”, “quais são as opções?” e “quero falar depois”. Confirmar nomes de culturas e datas importantes; evitar siglas e sequências de números na fala.
O acesso deve funcionar sem leitura longa: botão amplo e reconhecível, apoio por áudio, alternativa de resumo falado e possibilidade de configuração assistida. Validar com pessoas do público pretendido se conseguem identificar a notificação, pedir a chamada e explicar com suas palavras o próximo passo. A voz não deverá ser obrigatória para quem preferir usar a tela.
O registro da conversa vinculará alerta, análise apresentada, relatos novos, decisão confirmada e pendências. Gravação de áudio não será pressuposta: definir necessidade, informação ao usuário, autorização e retenção antes de habilitá-la. Guardar apenas os dados necessários ao acompanhamento e à rastreabilidade.
Além dos indicadores agrícolas da seção 9, acompanhar se a pessoa conseguiu acessar a ligação, compreender a ação, confirmar ou recusar a proposta e executar o que escolheu. Não usar número de chamadas ou aceitação da recomendação como prova de redução de desperdício. Relacionar a decisão registrada aos resultados posteriores de água, replantio, descarte, custos e condição do solo.
11.7 Entrega mínima e verificação do fluxo de voz
A primeira implementação deverá cobrir um tipo real de alerta ligado à rotação, um pacote completo, notificação acionável, chamada solicitada pelo toque e conversa com contexto previamente carregado. Implementação requer escolher e configurar os serviços de notificação, voz e telefonia; este documento não pressupõe conta, número ou provedor já disponível. A seleção do provedor não altera os limites de acesso do agente.
Critérios de aceite:
O alerta é preparado com dados reais, área correta e ação possível antes da notificação.
O toque solicita uma única chamada e a IA abre com o assunto correto, sem pedir que o produtor reconstrua o contexto.
Durante a conversa, nenhuma ferramenta permite pesquisa web ou acesso genérico à rede; qualquer recuperação fica no acervo autorizado.
Contexto vencido, ausência de dados, mudança de cultivo, falta de sinal e chamada não atendida têm estados explícitos, sem conclusão inventada.
A pessoa consegue pedir repetição, informar que não sabe, recusar a proposta e encerrar sem leitura obrigatória.
Uma alteração de plano exige confirmação verbal compreensível e fica vinculada à versão da análise.
Perguntas fora do pacote geram esclarecimento possível ou pendência; não produzem recomendação nova sem cálculo.
O resumo em áudio distingue ação combinada, informação pendente e benefício ainda não comprovado.
Se a demonstração usar conversa de voz dentro do aplicativo antes de a telefonia estar pronta, identificá-la como demonstração desse canal. Não apresentar esse substituto como o fluxo completo de ligação telefônica entregue.

=== ABA t.xgin5tjpelgh ===

12. Plano de implementação e critérios de entrega
Etapa
Entrega
Critério para avançar
1 — área e contexto
Área verificável, histórico de cultivos e prioridades; manter hortaliças.
Não apresentar o ponto exploratório como horta confirmada.
2 — perfis e regras
Catálogo técnico versionado das hortaliças e coberturas candidatas.
Parâmetros, domínio e restrições com fonte e revisão.
3 — comparação inicial
Referência + alternativas comerciais e com cobertura, mesmo horizonte; clima histórico existente.
Cálculos reproduzíveis, lacunas explícitas e justificativa de cada exclusão.
4 — acesso por voz
Alerta preparado → notificação → toque → ligação com contexto → decisão confirmada → resumo em áudio.
Acesso compreensível sem leitura longa, ferramentas restritas e critérios da seção 11.7 verificados.
5 — implantação próxima
Previsão válida acoplada somente à próxima operação.
Snapshot e horizonte visíveis; sem extrapolar sete dias para toda a sequência.
6 — demanda e água
ETc e depois balanço hídrico onde os dados permitirem.
Unidade, parâmetros e restrições verificados; não apresentar ETo como irrigação.
7 — evidências adicionais
Consultas hortícolas do IBGE, histórico ampliado e pixels úteis, conforme necessidade.
Estado de incorporação e escala explícitos.
8 — piloto de impacto
Registro de decisão, execução, água, custos, colheita e solo.
Resultados observados comparáveis antes de alegar benefício quantitativo.
Não é necessário trocar para uma grande cultura para iniciar. Se determinada hortaliça não tiver histórico municipal longo, ela pode continuar como candidata agronômica em cenários; somente a previsão estatística de seu rendimento ficará indisponível. Se as espécies não forem adequadas ao local, trocar o conjunto de candidatos e/ou o recorte piloto com justificativa técnica.

=== ABA t.ow5w8t4xtyv ===

16. Extensão opcional: aplicativo com uso offline
Status: proposta exploratória, sem compromisso de implementação na primeira versão. Preparar no celular os dados e explicações relevantes à área do produtor permitirá continuar consultando o plano e registrando informações quando não houver conexão. O conteúdo será selecionado pelo local, culturas, horizonte e decisões já avaliadas, em vez de exigir baixar bases completas.
16.1 Como seria o uso
Com conexão, o produtor ou uma pessoa que o auxilia seleciona a área e solicita “Baixar para usar sem internet”.
O aplicativo informa, também por áudio, o conteúdo, o tamanho e a data da atualização. O serviço prepara um pacote compatível com aquele aparelho e com a versão do aplicativo.
O celular baixa os arquivos, verifica integridade e completude e só então mostra “Pronto para usar sem internet”. Uma atualização interrompida mantém o último pacote completo.
Sem conexão, a pessoa abre o aplicativo, consulta a rotação, compara as alternativas já preparadas, ouve explicações baixadas e registra observações ou escolhas locais.
Ao recuperar a conexão e abrir o aplicativo, ele envia os registros pendentes, verifica conflitos e oferece atualizar o pacote. Não depender de sincronização em segundo plano para garantir o envio.
O modo sem conexão terá sinalização compreensível: “Você está usando informações baixadas em [data]”, com apoio em áudio. O agricultor deverá saber quais operações funcionam e quais aguardam conexão.
16.2 O que guardar no celular
O pacote será chamado internamente de offline_bundle, vinculado à área, pessoa autorizada, versão da análise e data de preparação. Incluir:
Identificação da área, histórico informado, plano escolhido, calendário e alternativas já calculadas.
Indicadores e séries históricas relevantes ao plano; manter códigos originais, unidades, origem e qualidade. Não baixar automaticamente todos os anos e todas as fontes disponíveis.
Perfis técnicos das culturas e coberturas candidatas, regras e explicações selecionadas para o caso.
Alertas já preparados e o contexto necessário para entendê-los, usando a mesma estrutura da seção 11.3.
Áudios previamente gerados com explicações, próximos passos e resumo do plano, além dos elementos visuais necessários ao acesso.
Última previsão consultada com sua validade, claramente separada do histórico e do calendário.
Estrutura para registrar observações e escolhas locais, com estado de sincronização.
Imagens ou mapas serão opcionais e limitados ao recorte útil. Não distribuir rasters globais, catálogos inteiros ou arquivos brutos volumosos por padrão. Sistemas integrados só aparecem no pacote se essa extensão estiver implementada e disponível para a área.
O manifesto do pacote registra arquivos, tamanho, hashes, fontes, área, versão do método, compatibilidade, datas e validade por conteúdo. O download será explícito; atualizações posteriores seguem a preferência configurada, com indicação do que mudou.
16.3 O que funciona sem conexão e o que depende dela
Disponível no primeiro nível offline proposto: abrir o plano salvo, consultar histórico e resultados, comparar opções previamente calculadas, ouvir áudios baixados e registrar ocorrências por controles acessíveis. Uma escolha fica como “salva neste celular; ainda não enviada”, vinculada à análise que estava disponível.
Depende de conexão: consultar novos dados NASA ou outros serviços, receber alertas remotos recentes, atualizar previsão, calcular no servidor uma opção ainda não avaliada, sincronizar e conversar com a IA hospedada. Se houver sinal telefônico, uma ligação pode ocorrer mesmo sem dados móveis, mas isso não significa funcionamento sem rede de comunicação; o serviço remoto também precisa do contexto válido.
Não assumido no nível inicial: IA conversacional, reconhecimento de fala, síntese de voz e novo cálculo preditivo inteiramente no aparelho. São capacidades adicionais, a estudar e testar separadamente. Baixar uma base de conhecimento ou usar RAG local, por si só, não instala os modelos necessários à conversa.
Pode-se oferecer gravação local de um relato para envio posterior, se a pessoa autorizar, sem simular entendimento ou resposta da IA naquele momento. O aplicativo informa que o relato ainda não foi analisado. Áudios preparados permitem acesso sem leitura mesmo quando não há IA disponível.
16.4 Validade dos dados e limites das decisões
O histórico continua sendo histórico, e uma previsão baixada conserva apenas seu horizonte original. Não prolongar sua validade ao ficar offline. Quando vencer, permitir consultar como registro antigo, sinalizar em áudio e suspender conclusões operacionais que dependam de previsão atual.
Alertas locais poderão lembrar uma tarefa do calendário já salvo. Não poderão afirmar que surgiu um novo evento meteorológico, doença ou alteração de solo sem dados correspondentes. Novas notificações remotas só chegam quando houver comunicação; um lembrete programado deve ser identificado como tal.
Se o produtor registrar uma mudança de cultura, plantio ou irrigação, identificar as recomendações dependentes como “precisa revisar”. Não recomputar silenciosamente com o plano anterior. Verificar também inconsistências da data do aparelho; validade incerta não será tratada como informação atual.
Para um futuro cálculo local, portar e versionar o mesmo método validado, incluir todos os parâmetros necessários e testar equivalência dos resultados com o servidor. Essa capacidade não faz parte do primeiro nível de consulta offline.
16.5 Espaço no aparelho e alternativas técnicas
Os downloads ocuparão armazenamento persistente do celular. Memória de execução, processamento e bateria são necessidades adicionais caso se avaliem modelos locais. Não assumir que espaço disponível resolve a execução de IA.
Mostrar o tamanho real antes de baixar e o espaço ocupado depois. Permitir selecionar áreas, conteúdo e áudios, remover pacotes e atualizar somente arquivos alterados. Preservar registros ainda não enviados; antes de removê-los, oferecer sincronização ou exportação e explicar a consequência. Não definir uma estimativa de megabytes sem medir um pacote real.
Uma possibilidade é um aplicativo web instalável (PWA), com arquivos de interface disponíveis localmente e armazenamento estruturado; outra é um aplicativo móvel com banco e arquivos locais. Service workers, Cache API e IndexedDB são mecanismos possíveis para o caminho web. A disponibilidade, as cotas e a permanência dos dados dependem do navegador e do aparelho, e o armazenamento pode ser removido pelo sistema ou pelo usuário. É necessário verificar o pacote ao abrir o app e nunca prometer armazenamento permanente. MDN — uso de service workers, MDN — limites e remoção do armazenamento.
O aplicativo atual é Streamlit, com cálculo Python no servidor. O cache existente em data/raw e data/processed evita novas aquisições no servidor, mas não entrega autonomia ao celular desconectado. Implementar offline exige uma interface capaz de abrir localmente e um contrato de distribuição/sincronização; não basta adicionar um botão de download ao painel atual. Streamlit — arquitetura cliente e servidor.
16.6 Sincronização e procedência das decisões
Cada registro local terá identificador único, área, autor, data informada do evento, horário do dispositivo e versão do pacote usado. Manter uma fila persistente de envio, com confirmação do servidor e repetição idempotente, para que uma conexão interrompida não duplique ocorrências.
Ao reconectar: enviar pendências, receber confirmação por registro, conferir a versão atual do plano e oferecer a atualização. Uma observação nova pode ser incorporada ao histórico, mas escolhas conflitantes para a mesma etapa exigem conciliação explícita. Não substituir a decisão de outro aparelho ou pessoa pela regra de “último envio vence”.
Manter separados: plano consultado, escolha feita offline, plano vigente no servidor e análise posterior. O registro do que o produtor decidiu não é apagado se uma previsão nova indicar outra opção; a pessoa recebe a explicação e decide se revisa o plano.
Pedidos de ligação feitos sem conexão ficam sinalizados como não enviados. Retomar o acesso não deve disparar chamadas inesperadas; revalidar o pedido, o contexto e a intenção atual antes de iniciar. Proteger o acesso aos dados locais e isolar contas em aparelhos compartilhados; a remoção de dados pelo usuário deve ser respeitada.
16.7 Evolução, impacto e critérios de aceite
Implementar por níveis, caso a equipe decida priorizar essa extensão:
Consulta offline acessível: plano, comparações e áudios baixados; abrir sem acesso ao servidor.
Registro e sincronização: observações e escolhas locais, fila de envio e resolução de conflitos.
Cálculo local limitado: somente métodos e dados que possam ser executados e verificados no aparelho.
Conversa local com IA: estudo separado de modelos, idioma, desempenho, bateria, espaço e qualidade; não condiciona os níveis anteriores.
O impacto esperado é permitir continuidade de acesso e reduzir perda de registros por falta de conexão. Medir abertura bem-sucedida sem rede, compreensão do plano por áudio, recuperação dos registros após reiniciar o aparelho, conclusão da sincronização, conflitos, espaço ocupado e consumo de dados. Relacionar as decisões aos indicadores agrícolas da seção 9; disponibilidade offline não comprova, sozinha, economia de água ou melhoria do solo.
Para considerar o primeiro nível entregue, testar em aparelho representativo: baixar; interromper atualização; ativar modo avião; fechar e reabrir; consultar plano e áudio; encontrar previsão vencida; registrar sem rede; recuperar a conexão; sincronizar com interrupção e repetição; e verificar conflito entre versões. Confirmar que a interface não afirma ter recebido alerta, realizado ligação ou calculado uma nova alternativa quando isso não aconteceu. Os critérios de escrita/sincronização se aplicam ao nível 2.
Decisão de escopo: offline fica documentado como extensão opcional, conectada ao planejamento, à voz e à rastreabilidade. Não há implementação ou funcionamento offline comprovado no aplicativo atual. A primeira experiência a avaliar é levar ao celular um pacote útil e acessível já preparado, antes de investir em IA totalmente local.

=== ABA t.ufupnkcw2tes ===

15. Extensão opcional: sistemas integrados conectados à rotação
Status: mapeado para evolução opcional. Fora da implementação prevista para a primeira versão. A versão inicial priorizará a comparação de rotações de hortaliças, com alternativas de cobertura, conforme as seções anteriores. Esta extensão só será considerada se houver tempo após concluir e verificar o núcleo, além de dados adequados ao cenário escolhido. A ausência da extensão não impede a entrega da primeira versão.
15.1 Papel dentro da solução
A integração lavoura–pecuária–floresta amplia os componentes que podem participar do planejamento da mesma área, por rotação, sucessão ou consórcio. Há modalidades com dois componentes, como lavoura–pecuária (ILP) e lavoura–floresta (ILF), e com os três (ILPF). A configuração depende das características regionais e do produtor. Embrapa — conceitos e modalidades de sistemas integrados.
No GeoAI, essa extensão participará do mesmo motor de comparação de sequências, usando o local, o histórico, os cenários ambientais, as prioridades e as métricas de impacto das seções 6 a 10. O planejamento continuará respondendo qual sequência adotar, quando executar cada etapa e quais consequências são sustentadas pelos dados. A integração não será um painel independente de indicadores de pecuária ou floresta.
Hortaliças continuarão como finalidade produtiva central. Quando admissível, uma opção integrada será comparada com uma alternativa somente de hortaliças e outra com cobertura. Inserir pastagem, animais ou árvores será uma decisão condicionada ao contexto da propriedade, sem presumir que a integração é sempre superior.
Uma planta de cobertura não caracteriza, sozinha, integração com pecuária. Para avaliar ILP, será necessário registrar a ligação efetiva entre as fases agrícola e pecuária. Também não basta haver árvores ou animais em outra parte da propriedade: suas interações com a área planejada precisam ser identificadas.
15.2 Cenários opcionais e alternativas de referência
Cenário
Como se conecta à rotação de hortaliças
Comparação necessária
Somente hortaliças
Alternância de espécies/famílias e janelas, conforme o núcleo do produto.
Plano atual do produtor versus alternativas comerciais admissíveis.
Hortaliças com cobertura
Etapa de cobertura/adubação verde antes do retorno a uma hortaliça.
Benefício de manejo esperado, consumo de água e custo da pausa comercial. Continua no escopo principal de rotação.
ILP
Fase agrícola de hortaliças alternada com fase de pastagem utilizada por animais, quando tecnicamente admissível.
Retorno ao cultivo, infraestrutura, água, operações, condições sanitárias e resultados de todas as etapas.
ILF / arranjo agroflorestal aplicável
Planejamento das hortaliças em uma área com componente arbóreo manejado e espacialmente descrito.
Compatibilidade das culturas e do calendário com o arranjo local, custos e interações entre componentes. A classificação técnica do sistema deve ser registrada.
ILPF
Combinação das etapas agrícolas, pecuárias e do componente arbóreo em um plano de área e manejo.
Viabilidade conjunta e compromissos frente às opções mais simples; não somar benefícios presumidos de cada componente.
As configurações integradas exigem avaliação técnica e infraestrutura compatível. A Embrapa destaca a necessidade de planejamento e assessoramento na adoção desses sistemas. Embrapa — integração na agricultura familiar.
O primeiro estudo opcional deve preferir uma propriedade que já tenha os componentes necessários. Uma sugestão de cultivo não autoriza pressupor compra de animais, implantação de árvores ou disponibilidade de infraestrutura. Para árvores novas, custos de estabelecimento e compromissos além do horizonte anual precisam aparecer; não antecipar receita florestal sem calendário e parâmetros.
15.3 Dados adicionais e relação com as fontes existentes
Informação
Dados necessários para a extensão
Como as fontes atuais apoiam e onde deixam lacunas
Área e sequência
Geometria das áreas, histórico de uso, datas de ocupação, transições e operações.
MapBiomas serve como contexto territorial; não confirma a integração nem a sequência praticada no talhão.
Hortaliças e forrageiras
Espécie/cultivar, fases, manejo, água, resíduos e compatibilidade com o retorno ao cultivo.
POWER/ETo apoia cenários ambientais; os perfis técnicos e registros locais precisam ser incorporados.
Componente pecuário
Espécie/categoria animal, quantidade, permanência, manejo de pastejo, alimentação, água e infraestrutura.
Não existe base pecuária local integrada ao projeto. Clima não permite inferir lotação, ganho de peso ou efeito do pastejo.
Componente arbóreo
Espécies, idade, disposição, espaçamento, orientação, copa, podas e finalidade produtiva.
Radiação regional do POWER não descreve a luz disponível sob as copas. HLS permanece catálogo; não fornece atualmente essa caracterização.
Solo e retorno à horticultura
Análise local, estado físico/hídrico, diagnóstico sanitário e manejo entre etapas.
SoilGrids é contexto estimado onde válido; no ponto padrão persiste NoData. Não comprova recuperação após pastejo ou cobertura.
Resultados e custos
Água de todos os componentes, insumos, operações, colheitas e receitas efetivas, incluindo períodos sem venda.
As bases atuais não comprovam economia ou resultado econômico do sistema integrado.
Se houver criação animal no cenário, registrar também os requisitos técnicos e sanitários aplicáveis ao retorno à horticultura, ao uso de resíduos e à produção de alimentos. Não definir intervalos ou procedimentos genéricos sem referência específica e revisão local.
15.4 Extensão do modelo preditivo
O modelo manterá as regras de cenário e incerteza da seção 6, acrescentando:
Ocupação no espaço e no tempo: descrever quais componentes usam cada área, quando entram, quando saem e como ocorre o retorno à hortaliça.
Interações explícitas: representar apenas relações com parâmetros e evidência disponíveis. Efeitos de pastejo, resíduos ou árvores não viram automaticamente aumentos de fertilidade, água disponível ou produtividade.
Orçamento conjunto de recursos: contabilizar a água de culturas, cobertura, animais e árvores conforme o método disponível, sem dupla contagem entre componentes. Uma redução na irrigação da hortaliça pode coexistir com maior demanda total do sistema.
Horizontes compatíveis: usar previsão atualizada para operações próximas e histórico como cenários de planejamento. Compromissos de vários anos, especialmente arbóreos, exigem horizonte próprio e não serão previstos extrapolando sete dias de meteorologia.
Comparação comum: avaliar referência e alternativas integradas na mesma área e período; explicitar produção em andamento, investimentos e obrigações que continuam após o término da análise.
Sem dados para as interações, a saída será uma hipótese de manejo com condições pendentes, e não uma predição quantitativa do desempenho integrado. Não estimar automaticamente carbono capturado, emissões evitadas, ganho animal, madeira produzida ou tempo de recuperação do solo.
15.5 Insights acionáveis e impacto a conferir
Pergunta do produtor
Insight que a extensão poderá oferecer
Ação e verificação de impacto
Vale inserir uma fase de pastagem antes da próxima hortaliça?
Comparar o calendário de retorno, uso total de recursos e custos dessa fase com cobertura e alternância comercial.
Escolher uma sequência admissível e acompanhar água, operações, resultado pecuário e primeira colheita após o retorno. Sem dados de solo, não declarar melhora causada pelo pastejo.
Posso manter hortaliças neste arranjo com árvores?
Identificar quais opções precisam de avaliação de luz, espaço e manejo para serem comparadas.
Medir as condições locais e testar culturas compatíveis; conferir produção comercializável e uso de água. Clima regional sozinho não resolve a escolha.
Qual alternativa atende melhor ao meu prazo de renda?
Mostrar quando cada opção oferece colheita ou outra receita, incluindo implantação e intervalos.
Comparar fluxo de caixa e custos efetivos; não tratar retorno futuro como receita garantida.
O sistema integrado reduz desperdício?
Confrontar consumo total, descartes, replantio e custo por resultado útil com a referência.
Medir todos os componentes e o solo ao longo dos ciclos; distinguir projeção, observação e efeito validado conforme a seção 9.
O card principal da extensão seguirá o formato da seção 8: evidência, ação, impacto esperado, condição de execução e forma de verificar. Uma alternativa hortícola admissível permanecerá visível quando existir, com os mesmos critérios de comparação.
15.6 Integração futura à tela e aos exports
A extensão será desativada por padrão. Se implementada, aparecerá em uma opção secundária de “Considerar sistemas integrados”, sem substituir o fluxo principal de comparação de rotações. Ativá-la acrescentará os componentes realmente presentes ou explicitamente propostos para a área e os campos necessários à avaliação.
As alternativas entrarão na mesma linha do tempo e comparação de impactos. Solo, clima, água, vegetação e dados produtivos continuarão como evidências de apoio, com detalhes por fonte. A opção não aparecerá como funcionalidade disponível enquanto existir apenas nesta documentação.
O contrato de análise da seção 13 será ampliado para registrar modalidade, geometria dos componentes, calendário de integração, dados animais/arbóreos, parâmetros de interação, custos, fontes, ausências e versão do método. Manter códigos originais, procedência e cache, sem combinar silenciosamente medições locais com médias municipais.
15.7 Critérios para implementar se houver tempo
Núcleo da primeira versão concluído e verificado: hortaliças, coberturas, referência, cenários e explicações de impacto.
Um caso integrado concreto, com componentes e área identificados, dados mínimos e regras revisadas.
Implementar primeiro a modalidade sustentada por esse caso, sem exigir ILP, ILF e ILPF simultaneamente.
Calcular somente as consequências sustentadas pelo método, mostrando as pendências das demais.
Comparar com a referência e com uma opção hortícola admissível; conferir recursos e custos de todas as etapas.
Verificar a experiência e a rastreabilidade antes de apresentar a extensão como operacional.
Decisão de entrega: sistemas integrados estão documentados como evolução do mesmo planejamento de rotação e redução de desperdício. Permanecem opcionais e fora do compromisso da primeira versão; sua implementação depende de tempo disponível após o núcleo e de evidência suficiente para o caso escolhido.
