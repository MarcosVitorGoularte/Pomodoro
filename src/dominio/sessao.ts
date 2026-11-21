import type { DadosTemporizador, Fase, SessaoAtiva, Temporizador } from './tipos'

const MINUTO = 60

export const FASES: Fase[] = ['foco', 'pausaCurta', 'pausaLonga']

interface Etapa {
  faseAtual: Fase
  cicloAtual: number
}

export function duracaoFaseMs(preset: DadosTemporizador, fase: Fase) {
  if (fase === 'foco') return preset.tempoFocoMin * MINUTO
  if (fase === 'pausaCurta') return preset.tempoPausaCurtaMin * MINUTO
  return preset.tempoPausaLongaMin * MINUTO
}

export function proximaEtapa(
  preset: DadosTemporizador,
  etapa: Etapa,
  pulando: boolean,
): Etapa | null {
  const { faseAtual, cicloAtual } = etapa
  if (faseAtual === 'foco') {
    const ultimoCiclo = cicloAtual >= preset.ciclosAntesPausaLonga
    return { faseAtual: ultimoCiclo ? 'pausaLonga' : 'pausaCurta', cicloAtual }
  }
  if (faseAtual === 'pausaCurta') {
    return { faseAtual: 'foco', cicloAtual: pulando ? cicloAtual : cicloAtual + 1 }
  }
  return null
}

export function criarSessao(preset: Temporizador, agora: number): SessaoAtiva {
  const snapshotPreset: DadosTemporizador = {
    nome: preset.nome,
    tempoFocoMin: preset.tempoFocoMin,
    tempoPausaCurtaMin: preset.tempoPausaCurtaMin,
    ciclosAntesPausaLonga: preset.ciclosAntesPausaLonga,
    tempoPausaLongaMin: preset.tempoPausaLongaMin,
  }
  return {
    id: String(agora),
    presetId: preset.id,
    snapshotPreset,
    faseAtual: 'foco',
    cicloAtual: 1,
    status: 'emAndamento',
    inicioFaseEm: agora,
    fimFasePrevistoEm: agora + duracaoFaseMs(snapshotPreset, 'foco'),
    pausadaEm: null,
    tempoRestanteAoPausarMs: null,
    criadaEm: agora,
    atualizadaEm: agora,
  }
}

export function tempoRestanteMs(sessao: SessaoAtiva, agora: number) {
  if (sessao.status === 'pausada') return sessao.tempoRestanteAoPausarMs ?? 0
  if (sessao.status === 'concluida') return 0
  return Math.max(0, sessao.fimFasePrevistoEm - agora)
}

export function pausar(sessao: SessaoAtiva, agora: number): SessaoAtiva {
  if (sessao.status !== 'emAndamento') return sessao
  return {
    ...sessao,
    status: 'pausada',
    pausadaEm: agora,
    tempoRestanteAoPausarMs: tempoRestanteMs(sessao, agora),
    atualizadaEm: agora,
  }
}

export function retomar(sessao: SessaoAtiva, agora: number): SessaoAtiva {
  if (sessao.status !== 'pausada') return sessao
  const restante = sessao.tempoRestanteAoPausarMs ?? 0
  return {
    ...sessao,
    status: 'emAndamento',
    inicioFaseEm: agora - (duracaoFaseMs(sessao.snapshotPreset, sessao.faseAtual) - restante),
    fimFasePrevistoEm: agora + restante,
    pausadaEm: null,
    tempoRestanteAoPausarMs: null,
    atualizadaEm: agora,
  }
}

function comecarEtapa(sessao: SessaoAtiva, etapa: Etapa, agora: number): SessaoAtiva {
  const duracao = duracaoFaseMs(sessao.snapshotPreset, etapa.faseAtual)
  const pausada = sessao.status === 'pausada'
  return {
    ...sessao,
    ...etapa,
    inicioFaseEm: agora,
    fimFasePrevistoEm: agora + duracao,
    pausadaEm: pausada ? agora : null,
    tempoRestanteAoPausarMs: pausada ? duracao : null,
    atualizadaEm: agora,
  }
}

function concluir(sessao: SessaoAtiva, agora: number): SessaoAtiva {
  return {
    ...sessao,
    status: 'concluida',
    pausadaEm: null,
    tempoRestanteAoPausarMs: null,
    atualizadaEm: agora,
  }
}

export function pularFase(sessao: SessaoAtiva, agora: number): SessaoAtiva {
  if (sessao.status === 'concluida') return sessao
  const proxima = proximaEtapa(sessao.snapshotPreset, sessao, true)
  return proxima ? comecarEtapa(sessao, proxima, agora) : concluir(sessao, agora)
}

export function reiniciarCiclos(sessao: SessaoAtiva, agora: number): SessaoAtiva {
  if (sessao.status === 'concluida') return sessao
  return comecarEtapa(sessao, { faseAtual: 'foco', cicloAtual: 1 }, agora)
}

export function avancarPorTempo(sessao: SessaoAtiva, agora: number) {
  let atual = sessao
  let fasesVencidas = 0
  while (atual.status === 'emAndamento' && agora >= atual.fimFasePrevistoEm) {
    fasesVencidas++
    const proxima = proximaEtapa(atual.snapshotPreset, atual, false)
    if (!proxima) {
      atual = concluir(atual, agora)
      break
    }
    const inicio = atual.fimFasePrevistoEm
    atual = {
      ...atual,
      ...proxima,
      inicioFaseEm: inicio,
      fimFasePrevistoEm: inicio + duracaoFaseMs(atual.snapshotPreset, proxima.faseAtual),
      atualizadaEm: agora,
    }
  }
  return { sessao: atual, fasesVencidas }
}

export function sessaoEstaAtiva(sessao: SessaoAtiva | null): sessao is SessaoAtiva {
  return sessao !== null && sessao.status !== 'concluida'
}
