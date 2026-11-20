export interface Temporizador {
  id: string
  nome: string
  tempoFocoMin: number
  tempoPausaCurtaMin: number
  ciclosAntesPausaLonga: number
  tempoPausaLongaMin: number
  criadoEm: number
  atualizadoEm: number
}

export type DadosTemporizador = Pick<
  Temporizador,
  'nome' | 'tempoFocoMin' | 'tempoPausaCurtaMin' | 'ciclosAntesPausaLonga' | 'tempoPausaLongaMin'
>

export type Fase = 'foco' | 'pausaCurta' | 'pausaLonga'

export type StatusSessao = 'emAndamento' | 'pausada' | 'concluida'

export interface SessaoAtiva {
  id: string
  presetId: string
  snapshotPreset: DadosTemporizador
  faseAtual: Fase
  cicloAtual: number
  status: StatusSessao
  inicioFaseEm: number
  fimFasePrevistoEm: number
  pausadaEm: number | null
  tempoRestanteAoPausarMs: number | null
  criadaEm: number
  atualizadaEm: number
}

export type Prioridade = 'alta' | 'media' | 'baixa'

export type EstadoTarefa = 'backlog' | 'aFazer' | 'emExecucao' | 'concluida' | 'cancelada'

export interface Tarefa {
  id: string
  titulo: string
  estado: EstadoTarefa
  prioridade: Prioridade
  criadaEm: number
  atualizadaEm: number
}

export type DadosTarefa = Pick<Tarefa, 'titulo' | 'estado' | 'prioridade'>
