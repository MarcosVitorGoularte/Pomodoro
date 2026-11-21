import { ORDEM_ESTADO, ORDEM_PRIORIDADE } from './tarefas'
import type { DadosTarefa, DadosTemporizador } from './tipos'

export type Erros<T> = Partial<Record<keyof T, string>>

function inteiroEntre(valor: number, min: number, max: number) {
  return Number.isInteger(valor) && valor >= min && valor <= max
}

export function validarTemporizador(d: DadosTemporizador): Erros<DadosTemporizador> {
  const erros: Erros<DadosTemporizador> = {}

  if (!d.nome.trim()) {
    erros.nome = 'Informe um nome.'
  } else if (d.nome.trim().length > 40) {
    erros.nome = 'O nome pode ter no máximo 40 caracteres.'
  }

  if (!inteiroEntre(d.tempoFocoMin, 1, 120)) {
    erros.tempoFocoMin = 'Use um número inteiro entre 1 e 120.'
  }

  if (!inteiroEntre(d.tempoPausaCurtaMin, 1, 60)) {
    erros.tempoPausaCurtaMin = 'Use um número inteiro entre 1 e 60.'
  }

  if (!inteiroEntre(d.ciclosAntesPausaLonga, 1, 12)) {
    erros.ciclosAntesPausaLonga = 'Use um número inteiro entre 1 e 12.'
  }

  if (!inteiroEntre(d.tempoPausaLongaMin, 1, 60)) {
    erros.tempoPausaLongaMin = 'Use um número inteiro entre 1 e 60.'
  }

  return erros
}

export function validarTarefa(d: DadosTarefa): Erros<DadosTarefa> {
  const erros: Erros<DadosTarefa> = {}

  if (!d.titulo.trim()) {
    erros.titulo = 'Informe um título.'
  } else if (d.titulo.trim().length > 100) {
    erros.titulo = 'O título pode ter no máximo 100 caracteres.'
  }

  if (!ORDEM_ESTADO.includes(d.estado)) {
    erros.estado = 'Escolha um estado válido.'
  }

  if (!ORDEM_PRIORIDADE.includes(d.prioridade)) {
    erros.prioridade = 'Escolha uma prioridade válida.'
  }

  return erros
}

export function semErros(erros: object): boolean {
  return Object.keys(erros).length === 0
}
