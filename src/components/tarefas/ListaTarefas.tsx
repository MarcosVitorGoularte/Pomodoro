import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ordenarTarefas } from '../../dominio/tarefas'
import type { Prioridade, Tarefa } from '../../dominio/tipos'
import type { ControleTarefas } from '../../hooks/useTarefas'
import { botaoPrimario, cartao } from '../estilos'
import { nomeEstado, nomePrioridade } from '../textos'
import { FormTarefa } from './FormTarefa'

const corPrioridade: Record<Prioridade, string> = {
  alta: 'bg-gray-900 text-white',
  media: 'bg-blue-100 text-blue-800',
  baixa: 'border border-gray-400 text-gray-700',
}

interface Props {
  controle: ControleTarefas
}

export function ListaTarefas({ controle }: Props) {
  const { tarefas, criar, editar, excluir } = controle
  const [editando, setEditando] = useState<Tarefa | 'nova' | null>(null)

  function confirmarExclusao(tarefa: Tarefa) {
    if (confirm(`Excluir a tarefa "${tarefa.titulo}"?`)) excluir(tarefa.id)
  }

  return (
    <section aria-labelledby="titulo-tarefas" className={`${cartao} flex flex-col`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="titulo-tarefas" className="text-2xl font-bold text-gray-900">
          Tarefas <span className="font-normal text-gray-500">({tarefas.length})</span>
        </h2>
        <button type="button" onClick={() => setEditando('nova')} className={botaoPrimario}>
          + Nova tarefa
        </button>
      </div>

      <p className="mb-4 text-xs text-gray-500">
        Ordem fixa: prioridade (alta → baixa), depois estado.
      </p>

      {tarefas.length === 0 ? (
        <p className="my-auto text-center text-sm text-gray-500">Nenhuma tarefa ainda.</p>
      ) : (
        <ul className="space-y-2">
          {ordenarTarefas(tarefas).map((tarefa) => {
            const encerrada = tarefa.estado === 'concluida' || tarefa.estado === 'cancelada'
            return (
              <li
                key={tarefa.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3"
              >
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium break-words ${encerrada ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                  >
                    {tarefa.titulo}
                  </p>
                  <div className="mt-1 flex gap-1.5">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${corPrioridade[tarefa.prioridade]}`}
                    >
                      {nomePrioridade[tarefa.prioridade]}
                    </span>
                    <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                      {nomeEstado[tarefa.estado]}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1 text-gray-500">
                  <button
                    type="button"
                    onClick={() => setEditando(tarefa)}
                    aria-label={`Editar ${tarefa.titulo}`}
                    className="cursor-pointer rounded p-1.5 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmarExclusao(tarefa)}
                    aria-label={`Excluir ${tarefa.titulo}`}
                    className="cursor-pointer rounded p-1.5 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {editando && (
        <FormTarefa
          inicial={editando === 'nova' ? undefined : editando}
          onSalvar={(dados) => (editando === 'nova' ? criar(dados) : editar(editando.id, dados))}
          onFechar={() => setEditando(null)}
        />
      )}
    </section>
  )
}
