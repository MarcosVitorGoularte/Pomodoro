# Pomodoro

Aplicativo web de temporizadores Pomodoro com painel de tarefas, feito em grupo de 4 pessoas. Tudo roda no navegador, sem backend nem login, e os dados ficam salvos no Local Storage.

O projeto segue as especificações fornecidas para o trabalho (Documento de Requisitos do MVP): requisitos funcionais, não funcionais, regras de negócio e restrições técnicas.

## Como executar

**Requisitos:** Node.js e npm.

```bash
npm ci        # instala as dependências
npm run dev   # inicia o servidor de desenvolvimento
```

## Ferramentas utilizadas

- **React + TypeScript:** interface em componentes e tipagem que evita erros de dados entre as camadas.
- **Vite:** servidor de desenvolvimento rápido e build simples.
- **Tailwind CSS:** estilização direto nas classes, sem arquivos CSS separados.
- **Local Storage:** persistência no próprio navegador, sem servidor.
- **ESLint + Prettier:** padronizam o código e a formatação de todo o grupo.

## O que cada diretório contém

- **`dominio/`:** as regras do problema (como a sessão avança, a ordem das tarefas, os limites dos campos).
- **`persistencia/`:** o único código que acessa o `localStorage`. Confere o formato do que foi lido e ignora dados corrompidos.
- **`hooks/`:** juntam domínio e persistência com o React (`useTemporizadores`, `useTarefas`, `useSessao`).
- **`components/`:** só mostram os dados e avisam o `App` quando algo acontece, chamando funções recebidas por props.

**Decisões da equipe:**

- O estado da sessão fica no `App` (via hook), e não na página, para continuar ao trocar de aba.
- O cronômetro guarda o horário de fim da fase em vez de contar segundos. Assim o tempo não atrasa com a aba em segundo plano e a sessão é recalculada ao reabrir o navegador.
- Valores derivados (tempo restante, "em uso", ordem das tarefas) são calculados na hora, não salvos.
- Valores padrão base para as tarefas e temporizadores iniciais predefinidos, podem ser removidos pelo usuário.

## Divisão de trabalho

O trabalho foi dividido em quatro partes:

| Parte             | Arquivos principais                                                        |
| ----------------- | -------------------------------------------------------------------------- |
| 1. Sessão         | `dominio/sessao.ts`, `useSessao.ts`, `alertaSonoro.ts`                     |
| 2. Temporizadores | `useTemporizadores.ts`, `PaginaTemporizadores.tsx`, `FormTemporizador.tsx` |
| 3. Tarefas        | `dominio/tarefas.ts`, `useTarefas.ts`, `ListaTarefas`, `FormTarefa`        |
| 4. Base           | `App.tsx`, `dominio/tipos.ts`, `persistencia/`, `Modal`, `Campo`           |
