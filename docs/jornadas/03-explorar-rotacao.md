# Jornada 03 — Explorar caminhos de rotação

Mock de interface solicitado em 15/11/2026, sem integração de análise. Mogi das Cruzes permanece referência municipal. Base: conteúdo, definição congelada, perguntas preditivas e ações (30, 31 e desdobramento apoiado na 49) e design system. A pergunta 35 permanece pendente.

Entrada atual: Início ou Meu plano → `/planejar`. As sequências e as três perguntas aparecem diretamente em Planejar rotação, antes de Seu próximo passo e da previsão de sete dias. O botão intermediário Comparar caminhos foi removido por solicitação do usuário. `/planejar/rotacao` redireciona para a mesma tela. Dois exemplos partem de Alface, independente do cultivo real informado: Alface → Cenoura → Tomate e Alface → Cobertura a definir → Tomate. São hipóteses ilustrativas, sem recomendação ou espécie de cobertura definida. O contexto real vem do FarmProvider e aparece separado.

Pergunta principal: **Como o clima entra nessa escolha?** NASA POWER é a fonte prevista para cruzar vários anos de chuva, temperatura e radiação com calendário e fases. A amostra adquirida de 01–14/11/2025 é identificada como insuficiente para comparar épocas e não é processada pela tela. Nenhuma data vencedora, probabilidade ou economia é inventada.

Pergunta complementar: **Combina com o que plantei antes?** Conferir histórico da mesma área, problemas diagnosticados e perfis técnicos. O solo agora tem pergunta própria. Famílias sozinhas não garantem adequação. Solo relatado permanece relato; não há diagnóstico ou indicação automática de recuperação.

A pessoa alterna caminhos, ouve, expande fontes e abre Antes de escolher. O painel apresenta o caminho e pendências, permite retornar, conferir Minha área ou consultar o plano atual. Nenhuma sequência de exemplo é persistida nem substitui a intenção existente. A escolha real de cultivo/operação/dia continua em Planejar. Telefonia permanece indisponível pelo componente compartilhado.

Componente novo reutilizável: RotationSequence, com exemplos isolados no catálogo. Sem novas aquisições de dados ou mudanças à definição de produto congelada.

Verificação em 15/11/2026: TypeScript e build passaram. Revisão pelo navegador na porta 3021 conferiu entrada Comparar caminhos, alternância das duas sequências e explicações, painel Antes de escolher e rótulos em largura estreita. O rótulo Calor e frio evita a quebra de Temperatura em telas pequenas. Não houve teste de compreensão com produtores ou validação agronômica.

## Recorte fechado em três perguntas

Terceira pergunta mockada: **O que as condições do solo permitem plantar depois?** Cenário de análise local ausente, sem valores fictícios de pH, nutrientes ou textura. Texto relatado em Minha área não é laudo. Cada caminho tem explicação, próximo passo e acompanhamento próprios nas três perguntas.

A especificação simples de dor, entradas, fontes, limites e fala está em [Três perguntas para explorar a rotação](../predicao-tres-perguntas.md). O conteúdo direto da tela está em `src/frontend/planner/rotation-mock.ts`, com ids clima/historico/solo e exemplos para os caminhos A/B. Texto e áudio usam os mesmos campos. O catálogo mostra o mesmo componente RotationEvidence com exemplos isolados.

Verificação do terceiro cartão: TypeScript, build e diff check passaram. Navegador conferiu solo, detalhes de dados, troca das três explicações entre caminhos e exemplos no catálogo. Conteúdo mockado permanece isolado do plano real.
