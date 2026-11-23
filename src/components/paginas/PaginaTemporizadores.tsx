import { useState } from 'react'
import type { DadosTemporizador, Temporizador } from '../../dominio/tipos'
import { botaoPerigo, botaoPrimario, botaoSecundario } from '../estilos'
import { FormTemporizador } from '../temporizadores/FormTemporizador'

interface Props {
  temporizadores: Temporizador[]
  emUsoId: string | undefined
  onUsar: (id: string) => void
  onCriar: (dados: DadosTemporizador) => void
  onEditar: (id: string, dados: DadosTemporizador) => void
  onExcluir: (id: string) => void
}

export function PaginaTemporizadores(props: Props) {
  const { temporizadores, emUsoId, onUsar, onCriar, onEditar, onExcluir } = props
  const [editando, setEditando] = useState<Temporizador | 'novo' | null>(null)
  function confirmarExclusao(temporizador: Temporizador) {
    if (confirm(`Excluir o temporizador "${temporizador.nome}"?`)) onExcluir(temporizador.id)
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Temporizadores</h1>
          <p className="text-sm text-gray-500">
            Cada temporizador define o foco, as pausas e quantos ciclos vêm antes da pausa longa.
          </p>
        </div>
        <button type="button" onClick={() => setEditando('novo')} className={botaoPrimario}>
          + Novo temporizador
        </button>
      </div>

      {temporizadores.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          Nenhum temporizador ainda.Crie o primeiro em "Novo temporizador".
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {temporizadores.map((temporizador) => {
          const emUso = temporizador.id === emUsoId
          return (
            <article
              key={temporizador.id}
              className={`flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ${emUso ? 'border-2 border-gray-900' : 'border border-gray-200'}`}
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-2">
                  <h2 className="wrap-break-words text-lg font-bold text-gray-900">
                    {temporizador.nome}
                  </h2>
                  {emUso && (
                    <span className="flex shrink-0 items-center gap-1 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
                      Em uso
                    </span>
                  )}
                </div>
                <dl className="mb-6 grid grid-cols-2 gap-4 text-sm">
                  <Valor rotulo="Foco" valor={`${temporizador.tempoFocoMin} min`} />
                  <Valor rotulo="Pausa curta" valor={`${temporizador.tempoPausaCurtaMin} min`} />
                  <Valor
                    rotulo="Ciclos até a pausa longa"
                    valor={String(temporizador.ciclosAntesPausaLonga)}
                  />
                  <Valor rotulo="Pausa longa" valor={`${temporizador.tempoPausaLongaMin} min`} />
                </dl>
                {emUso && (
                  <p className="mb-4 rounded-lg bg-gray-100 p-2 text-xs text-gray-600">
                    Encerre a sessão para editar ou excluir este temporizador.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => onUsar(temporizador.id)}
                  className={`${emUso ? botaoSecundario : botaoPrimario} text-xs`}
                >
                  {emUso ? 'Ver sessão' : 'Usar'}
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={emUso}
                    onClick={() => setEditando(temporizador)}
                    className={`${botaoSecundario} text-xs`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={emUso}
                    onClick={() => confirmarExclusao(temporizador)}
                    className={`${botaoPerigo} text-xs`}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {editando && (
        <FormTemporizador
          inicial={editando === 'novo' ? undefined : editando}
          onSalvar={(dados) =>
            editando === 'novo' ? onCriar(dados) : onEditar(editando.id, dados)
          }
          onFechar={() => setEditando(null)}
        />
      )}
    </div>
  )
}

function Valor({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{rotulo}</dt>
      <dd className="font-semibold text-gray-800">{valor}</dd>
    </div>
  )
}
