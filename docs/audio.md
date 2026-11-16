# Áudio da primeira tela

Implementação nova em `src/frontend/audio/`, sem copiar código do mock.

- `useNarration()` oferece `speak(text)`, `stop()`, `speaking`, `available` e `error`.
- `ListenButton` recebe `text`, `label` opcional e `className` opcional.
- A fala só começa por toque. Repetir a ação enquanto fala interrompe o áudio. Outra reprodução interrompe a anterior; esconder a página ou desmontar o componente também interrompe.
- Texto é narrado em português brasileiro, com voz local pt-BR preferida quando disponível. O dispositivo escolhe a voz efetiva. Não há compra de serviço, credenciais, gravação ou envio de texto por um backend nosso.
- A síntese é fornecida pelo navegador/sistema. Vozes podem depender de rede, e a disponibilidade ou qualidade não são garantidas. Não apresentar este recurso como áudio baixado ou como funcionamento offline comprovado.
- Não existe geração de orientação agronômica no componente. O chamador fornece o texto correspondente aos dados e condições já exibidos.
- Falha de suporte ou reprodução aparece em mensagem curta. Texto e controles visuais continuam disponíveis.

Verificação auditiva em aparelho real e com o público continua necessária. Os arquivos de áudio pré-gerados e o download explícito de áudios não foram implementados neste incremento.
