# Primeira etapa funcional — Planejar rotação

15/11/2026. Implementação nova em Next.js, autorizada pelo usuário nesta conversa. Não é mais somente o mock visual. O incremento é pequeno: escolher cultivo e operação, consultar sete dias, conferir o dia, guardar uma intenção no aparelho e rever. Não registra plantio ou valida uma rotação completa.

## Fronteiras

- `src/app`: páginas `/` e `/planejar`, manifesto e endpoints `/api/forecast`, `/api/conversation`.
- `src/frontend`: tela, controles de voz, componentes do design system e repositório IndexedDB.
- `src/backend/weather`: adaptador Open-Meteo com validação e cache. Importação protegida por `server-only`.
- `src/backend/conversation`: contrato de contexto para telefonia futura, a partir da intenção confirmada. Preserva área, operação, cultivo, dia, snapshot e pendências. `/api/conversation` valida esse contexto, retorna 501 indisponível para contexto válido e 400 para conteúdo inválido; não envia pedidos nem armazena telefone.
- `src/shared`: schemas, tipos, datas em São Paulo e apresentação das condições WMO. Nenhum diagnóstico agronômico, cálculo de perda ou recomendação quantitativa de manejo.

## Dados meteorológicos

API: https://api.open-meteo.com/v1/forecast

Parâmetros: latitude −23,52278, longitude −46,18833, `timezone=America/Sao_Paulo`, `forecast_days=7`, `models=best_match`, `daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max`.

Documentação: https://open-meteo.com/en/docs. Atribuição na tela. O modelo best_match é seleção automática do provedor, não um modelo treinado pelo projeto. A consulta guarda ponto solicitado e célula retornada. O local é referência municipal, não propriedade confirmada.

Cada snapshot preserva identificador, aquisição real, expiração, fuso e sete dias. Cache de 15 minutos no servidor inclui data local na chave. Exige sete datas contíguas a partir do dia da aquisição, intervalos e unidades válidos; nulos permanecem ausentes. Expiração de seis horas é política de revisão do aplicativo, não precisão garantida pelo provedor. Na virada do dia a consulta também precisa ser revista.

Códigos WMO são traduzidos em Sol, Nublado, Chuva e Trovoadas. Códigos desconhecidos permanecem sem informação e impedem guardar um dia como se fosse avaliado. Chuva/trovoada pede conferência; ausência de chuva não libera plantio. Não há pontuação de risco, limiar de perda, irrigação ou previsão de produtividade. Chance de chuva não é chance de perda.

Falha de consulta oferece snapshot previamente salvo com aviso explícito; vencido fica consultável, mas bloqueia nova confirmação. Falha sem snapshot mostra tentar novamente. Toda confirmação revalida frescor e data.

## Estado local, áudio e distribuição

Intenção e snapshot ficam em IndexedDB. Escolhas anteriores são mantidas em histórico local, sem tela de histórico completo neste incremento. Falha no salvamento não confirma sucesso. Não há sincronização ou conta. Dados locais podem ser removidos pelo navegador; não prometer armazenamento permanente.

Web Speech API lê frases montadas dos próprios dados, sem serviço pago ou LLM. Sem autoplay; parar, falha e indisponibilidade tratados. Detalhes em `audio.md`. Teste auditivo em aparelho do público continua necessário.

Manifesto e ícones disponíveis. Ainda não há service worker/cache da interface para reabrir offline, pacote baixado de áudio, notificações ou telefonia. Instalar não comprova funcionamento offline.

## Verificação

Cinco testes de domínio passaram, cobrindo data de São Paulo, validade, virada do dia, dado ausente, faixas inválidas e separação entre informação meteorológica e perda de cultivo. Compilação TypeScript e build de produção passaram. Consulta real do endpoint retornou sete dias de 15 a 21/11/2026 com metadados de aquisição. Interação no navegador conferiu seleção, confirmação e permanência da escolha após recarregar; cenoura seleciona semeadura e mudança de cultivo pede conferir a intenção anterior. Botões Ouvir/Parar responderam, sem validação auditiva com o público. Ligação abre indisponibilidade; contexto válido retorna HTTP 501, inválido retorna 400, sem operação externa. Manifesto retornou nome e modo standalone. Revisão nos tamanhos de viewport 390 e 320 do navegador (a escala do ambiente correspondeu a larguras CSS ainda menores), sem rolagem horizontal. Prévia em `previews/planner-mobile.jpg`.

Ainda não houve validação com agricultores nem revisão agronômica. NASA POWER e IBGE não alimentam esta primeira tela por decisão expressa do usuário; a contribuição desses dados será o próximo incremento.
