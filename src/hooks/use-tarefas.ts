import { tarefasIniciais } from '../dominio/dados-iniciais'
import type { DadosTarefa, Tarefa } from '../dominio/tipos'
import { CHAVES } from '../persistencia/armazenamento'
import { ehListaDeTarefas } from '../persistencia/validar-formato'
import { usePersistido } from './use-persistido'

export function useTarefas() {
  const [tarefas, setTarefas] = usePersistido(CHAVES.tarefas, ehListaDeTarefas, tarefasIniciais)

  function criar(dados: DadosTarefa) {
    const agora = Date.now()
    const nova: Tarefa = { ...dados, id: String(agora), criadaEm: agora, atualizadaEm: agora }
    setTarefas((atuais) => [...atuais, nova])
  }

  function editar(id: string, dados: DadosTarefa) {
    const agora = Date.now()
    setTarefas((atuais) =>
      atuais.map((t) => (t.id === id ? { ...t, ...dados, atualizadaEm: agora } : t)),
    )
  }

  function excluir(id: string) {
    setTarefas((atuais) => atuais.filter((t) => t.id !== id))
  }

  return { tarefas, criar, editar, excluir }
}

export type ControleTarefas = ReturnType<typeof useTarefas>
