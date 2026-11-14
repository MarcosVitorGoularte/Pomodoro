# Comandos do projeto

## Projeto

| Comando          | O que faz                                                              |
| ---------------- | ---------------------------------------------------------------------- |
| `npm ci`         | Instala as dependências exatamente como estão no `package-lock.json`   |
| `npm run dev`    | Inicia o projeto no navegador para desenvolvimento                     |
| `npm run format` | Formata todos os arquivos do projeto                                   |
| `npm run check`  | Verifica formatação, lint e TypeScript. **Rodar antes de cada commit** |
| `npm run build`  | Gera a versão final do projeto                                         |

## Git

| Comando                           | O que faz                                         |
| --------------------------------- | ------------------------------------------------- |
| `git switch main`                 | Vai para a branch principal                       |
| `git pull`                        | Baixa as alterações dos colegas                   |
| `git switch -c feature/nome`      | Cria uma branch nova para a tarefa                |
| `git add .`                       | Prepara todos os arquivos alterados para o commit |
| `git add nomeArquivo`             | Prepara um arquivo alterado para o commit         |
| `git commit -m "mensagem"`        | Salva as alterações com uma descrição             |
| `git push -u origin feature/nome` | Envia a branch para o GitHub                      |

## Fluxo de cada tarefa

```bash
git switch main
git pull
npm ci
git switch -c feature/nome-da-tarefa

# trabalhe normalmente, salvando com Ctrl + S

npm run check
git add .
git commit -m "descrição do que foi feito"
git push -u origin feature/nome-da-tarefa
```

Depois, abra um **Pull Request** no GitHub para alguém do grupo revisar.
