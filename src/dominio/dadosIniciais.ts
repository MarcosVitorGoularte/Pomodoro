import type { EstadoTarefa, Prioridade, Tarefa, Temporizador } from './tipos'

const CRIADO = 0

function preset(
  id: string,
  nome: string,
  foco: number,
  pausaCurta: number,
  ciclos: number,
  pausaLonga: number,
): Temporizador {
  return {
    id,
    nome,
    tempoFocoMin: foco,
    tempoPausaCurtaMin: pausaCurta,
    ciclosAntesPausaLonga: ciclos,
    tempoPausaLongaMin: pausaLonga,
    criadoEm: CRIADO,
    atualizadoEm: CRIADO,
  }
}

function tarefa(id: string, titulo: string, prioridade: Prioridade, estado: EstadoTarefa): Tarefa {
  return { id, titulo, prioridade, estado, criadaEm: CRIADO, atualizadaEm: CRIADO }
}

export const temporizadoresIniciais: Temporizador[] = [
  preset('1', 'Estudo padrão', 25, 5, 4, 15),
  preset('2', 'Leitura longa', 50, 10, 2, 30),
  preset('3', 'Revisão rápida', 15, 3, 4, 10),
  preset('4', 'Prova simulada', 90, 15, 2, 30),
]

export const tarefasIniciais: Tarefa[] = [
  tarefa('1', 'Revisar capítulo 4 de Cálculo', 'alta', 'aFazer'),
  tarefa('2', 'Lista de exercícios de física', 'alta', 'emExecucao'),
  tarefa('3', 'Resumo da história do Brasil', 'alta', 'concluida'),
  tarefa('4', 'Ler artigo para seminário', 'media', 'aFazer'),
  tarefa('5', 'Organizar anotações de química', 'media', 'backlog'),
  tarefa('6', 'Refazer mapa mental de Biologia', 'baixa', 'cancelada'),
  tarefa('7', 'Assistir aula gravada de Inglês', 'baixa', 'backlog'),
]
