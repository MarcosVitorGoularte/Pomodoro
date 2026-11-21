import type { DadosTarefa, EstadoTarefa, Prioridade, Tarefa } from './tipos'

export const TAREFA_PADRAO: DadosTarefa = { titulo: '', estado: 'backlog', prioridade: 'media' }

export const ORDEM_PRIORIDADE: Prioridade[] = ['alta', 'media', 'baixa']
export const ORDEM_ESTADO: EstadoTarefa[] = [
  'aFazer',
  'emExecucao',
  'concluida',
  'cancelada',
  'backlog',
]

export function ordenarTarefas(tarefas: Tarefa[]) {
  return tarefas.toSorted(
    (a, b) =>
      ORDEM_PRIORIDADE.indexOf(a.prioridade) - ORDEM_PRIORIDADE.indexOf(b.prioridade) ||
      ORDEM_ESTADO.indexOf(a.estado) - ORDEM_ESTADO.indexOf(b.estado),
  )
}
