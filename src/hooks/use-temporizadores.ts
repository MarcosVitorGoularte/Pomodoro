import { temporizadoresIniciais } from '../dominio/dados-iniciais'
import type { DadosTemporizador, Temporizador } from '../dominio/tipos'
import { CHAVES } from '../persistencia/armazenamento'
import { ehListaDeTemporizadores } from '../persistencia/validar-formato'
import { usePersistido } from './use-persistido'

export function useTemporizadores() {
  const [temporizadores, setTemporizadores] = usePersistido(
    CHAVES.presets,
    ehListaDeTemporizadores,
    temporizadoresIniciais,
  )

  function criar(dados: DadosTemporizador) {
    const agora = Date.now()
    const novo: Temporizador = { ...dados, id: String(agora), criadoEm: agora, atualizadoEm: agora }
    setTemporizadores((atuais) => [...atuais, novo])
  }
  function editar(id: string, dados: DadosTemporizador) {
    const agora = Date.now()
    setTemporizadores((atuais) =>
      atuais.map((t) => (t.id === id ? { ...t, ...dados, atualizadoEm: agora } : t)),
    )
  }

  function excluir(id: string) {
    setTemporizadores((atuais) => atuais.filter((t) => t.id !== id))
  }
  return { temporizadores, criar, editar, excluir }
}
