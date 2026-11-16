# Direção da versão do evento

Atualização confirmada em 15/11/2026: o usuário autorizou unificar Planejar rotação e Meu plano em Meu plano, com uma única linha do tempo, edição contextual e cenário demonstrativo ampliado para os próximos meses. Substitui a separação de telas anterior. Planejar permanece como ação; os endereços antigos redirecionam. Predições do cenário são fictícias e identificadas, distintas do histórico NASA e da previsão real. Sem publicação externa nesta rodada.


Registro de 15/11/2026 — NASA Space Apps, desafio Field Shift.

## Decisões confirmadas pelo usuário

- Construir uma aplicação Web com abordagem PWA desde o início, prioritariamente para celular, acessível por link e instalável nos navegadores compatíveis.
- Criar uma implementação nova. O mock em `mock/` serviu para discutir desenho e experiência; seu código não será reaproveitado.
- Entregar hoje uma versão minimamente funcional, com um percurso conceitual coerente. Não exigir acabamento de produto de produção.
- Preparar código e vídeo do produto para a entrega do evento, conforme as instruções de submissão aplicáveis à equipe.
- Instalação e download de conteúdo offline são capacidades distintas. A opção de instalar no navegador não comprova funcionamento offline.
- Offline completo permanece opcional. A abordagem PWA deve permitir evoluir para conteúdo salvo no aparelho, sem prometer capacidades ainda não implementadas.

## Stack confirmada posteriormente na conversa

O usuário escolheu **Next.js + TypeScript**, com React para a interface e endpoints de servidor no mesmo projeto. Substitui a recomendação inicial de Vite. Separação: `src/frontend`, `src/backend`, `src/shared`; `src/app` contém páginas e entradas da API. PWA permanece a abordagem de distribuição, com manifesto e armazenamento local; offline completo é uma entrega separada.

Motivo da escolha: preparar consultas e futuras chamadas a modelos de IA no servidor, preservando as credenciais. Não é necessário um backend Python separado nesta etapa. Nenhuma integração com modelo de IA ou telefonia está ativa ainda.

## Primeiro incremento autorizado

Planejar rotação começa exclusivamente pela previsão meteorológica real de sete dias para uma operação próxima. A análise de dados NASA/IBGE e a simulação das sequências serão discutidas depois. Interface extremamente simples, voltada ao produtor familiar com baixa alfabetização: desenhos, palavras curtas, áudio por toque e confirmação. Preparar o contexto para futura ligação; não realizar chamadas. O usuário autorizou subagente para apoio de áudio e solicitou um design system compartilhado.

## Recorte proposto para o evento

Um percurso completo: conferir contexto da área, comparar caminhos sustentados pelas evidências, entender condições e pendências, guardar uma escolha e consultá-la em Meu plano. A escolha deve persistir após fechar e reabrir. Corrigir informações deve indicar revisão necessária, sem apagar silenciosamente a decisão.

Caso o prazo permita, entregar um pacote offline pequeno: plano e áudio previamente preparado, com download explícito, progresso, confirmação apenas após conclusão e referência de atualização/validade. Não exigir offline completo para concluir o percurso principal.

Conferir no celular e na versão publicada: navegação, persistência, instalação e, se implementado, reabertura sem conexão após fechar o aplicativo. Conteúdo salvo não atualiza previsão, realiza chamadas ou fornece conversa com IA sem comunicação.

O armazenamento do navegador está sujeito a cotas e remoção. Não prometer permanência dos dados. Sincronização, autenticação e integrações reais precisam de escopo próprio; este registro não as considera entregues.

## Fontes técnicas consultadas

- Vite, publicação estática: https://vite.dev/guide/static-deploy
- Next.js, PWA: https://nextjs.org/docs/app/guides/progressive-web-apps
- MDN, instalação de PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

A referência congelada em `product-definition.md` permanece intacta; este registro contém a direção posterior para a entrega.
