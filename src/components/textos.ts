import type { EstadoTarefa, Fase, Prioridade } from '../dominio/tipos.ts'

export const nomeFase: Record<Fase, string> = {
  foco: 'Foco',
  pausaCurta: 'Pausa curta',
  pausaLonga: 'Pausa longa',
}

export const nomePrioridade: Record<Prioridade, string> = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
}

export const nomeEstado: Record<EstadoTarefa, string> = {
  backlog: 'Backlog',
  aFazer: 'A fazer',
  emExecucao: 'Em execução',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
}
