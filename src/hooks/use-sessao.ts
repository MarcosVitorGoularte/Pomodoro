import { useEffect, useState } from 'react'
import * as regras from '../dominio/sessao.ts'
import type { SessaoAtiva, Temporizador } from '../dominio/tipos.ts'
import { CHAVES } from '../persistencia/armazenamento.ts'
import { ehSessaoOuNada } from '../persistencia/validar-formato.ts'
import { prepararAudio, tocarAlerta } from '../servicos/alerta-sonoro.ts'
import { usePersistido } from './use-persistido.ts'

export function useSessao() {
  const [sessao, setSessao] = usePersistido<SessaoAtiva | null>(
    CHAVES.sessaoAtiva,
    ehSessaoOuNada,
    null,
    (salva) => (salva ? regras.avancarPorTempo(salva, Date.now()).sessao : null),
  )
  const [retomada, setRetomada] = useState(() => regras.sessaoEstaAtiva(sessao))
  const [agora, setAgora] = useState(() => Date.now())

  useEffect(() => {
    if (sessao?.status !== 'emAndamento') return
    const intervalo = setInterval(() => {
      const instante = Date.now()
      setAgora(instante)
      if (instante < sessao.fimFasePrevistoEm) return
      tocarAlerta()
      setSessao(regras.avancarPorTempo(sessao, instante).sessao)
    }, 250)
    return () => clearInterval(intervalo)
  }, [sessao, setSessao])

  function aplicar(regra: (s: SessaoAtiva, agora: number) => SessaoAtiva) {
    if (!sessao) return
    const instante = Date.now()
    setAgora(instante)
    setSessao(regra(sessao, instante))
  }

  function iniciar(preset: Temporizador) {
    prepararAudio()
    const instante = Date.now()
    setAgora(instante)
    setSessao(regras.criarSessao(preset, instante))
    setRetomada(false)
  }

  function retomar() {
    prepararAudio()
    aplicar(regras.retomar)
  }

  function encerrar() {
    setSessao(null)
    setRetomada(false)
  }

  return {
    sessao,
    ativa: regras.sessaoEstaAtiva(sessao),
    retomada,
    restanteMs: sessao ? regras.tempoRestanteMs(sessao, agora) : 0,
    iniciar,
    pausar: () => aplicar(regras.pausar),
    retomar,
    pularFase: () => aplicar(regras.pularFase),
    reiniciarCiclos: () => aplicar(regras.reiniciarCiclos),
    encerrar,
    fecharAvisoRetomada: () => setRetomada(false),
  }
}

export type ControleSessao = ReturnType<typeof useSessao>
