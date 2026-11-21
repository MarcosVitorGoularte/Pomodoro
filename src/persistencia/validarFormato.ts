import { ORDEM_ESTADO, ORDEM_PRIORIDADE } from '../dominio/tarefas'
import { FASES } from '../dominio/sessao'
import type { SessaoAtiva, StatusSessao, Tarefa, Temporizador } from '../dominio/tipos'

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor)
}

function ehString(valor: unknown): valor is string {
  return typeof valor === 'string'
}

function ehNumeroFinito(valor: unknown): valor is number {
  return typeof valor === 'number' && Number.isFinite(valor)
}

function estaEm<T>(valores: readonly T[], valor: unknown): valor is T {
  return valores.some((item) => item === valor)
}

function ehTemporizador(valor: unknown): valor is Temporizador {
  return (
    ehObjeto(valor) &&
    ehString(valor.id) &&
    ehString(valor.nome) &&
    ehNumeroFinito(valor.tempoFocoMin) &&
    ehNumeroFinito(valor.tempoPausaCurtaMin) &&
    ehNumeroFinito(valor.ciclosAntesPausaLonga) &&
    ehNumeroFinito(valor.tempoPausaLongaMin) &&
    ehNumeroFinito(valor.criadoEm) &&
    ehNumeroFinito(valor.atualizadoEm)
  )
}

function ehTarefa(valor: unknown): valor is Tarefa {
  return (
    ehObjeto(valor) &&
    ehString(valor.id) &&
    ehString(valor.titulo) &&
    estaEm(ORDEM_ESTADO, valor.estado) &&
    estaEm(ORDEM_PRIORIDADE, valor.prioridade) &&
    ehNumeroFinito(valor.criadaEm) &&
    ehNumeroFinito(valor.atualizadaEm)
  )
}

function ehSnapshotPreset(valor: unknown): boolean {
  return (
    ehObjeto(valor) &&
    ehString(valor.nome) &&
    ehNumeroFinito(valor.tempoFocoMin) &&
    ehNumeroFinito(valor.tempoPausaCurtaMin) &&
    ehNumeroFinito(valor.ciclosAntesPausaLonga) &&
    ehNumeroFinito(valor.tempoPausaLongaMin)
  )
}

function ehStatusSessao(valor: unknown): valor is StatusSessao {
  const status: StatusSessao[] = ['emAndamento', 'pausada', 'concluida']
  return estaEm(status, valor)
}

function ehNumeroOuNulo(valor: unknown): valor is number | null {
  return valor === null || ehNumeroFinito(valor)
}

function ehSessao(valor: unknown): valor is SessaoAtiva {
  return (
    ehObjeto(valor) &&
    ehString(valor.id) &&
    ehString(valor.presetId) &&
    ehSnapshotPreset(valor.snapshotPreset) &&
    estaEm(FASES, valor.faseAtual) &&
    ehNumeroFinito(valor.cicloAtual) &&
    ehStatusSessao(valor.status) &&
    ehNumeroFinito(valor.inicioFaseEm) &&
    ehNumeroFinito(valor.fimFasePrevistoEm) &&
    ehNumeroOuNulo(valor.pausadaEm) &&
    ehNumeroOuNulo(valor.tempoRestanteAoPausarMs) &&
    ehNumeroFinito(valor.criadaEm) &&
    ehNumeroFinito(valor.atualizadaEm)
  )
}

export function ehListaDeTemporizadores(valor: unknown): valor is Temporizador[] {
  return Array.isArray(valor) && valor.every(ehTemporizador)
}

export function ehListaDeTarefas(valor: unknown): valor is Tarefa[] {
  return Array.isArray(valor) && valor.every(ehTarefa)
}

export function ehSessaoOuNada(valor: unknown): valor is SessaoAtiva | null {
  return valor === null || ehSessao(valor)
}
