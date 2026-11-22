import { useState, type FormEvent } from 'react'
import { ORDEM_ESTADO, ORDEM_PRIORIDADE, TAREFA_PADRAO } from '../../dominio/tarefas'
import type { DadosTarefa, EstadoTarefa, Prioridade, Tarefa } from '../../dominio/tipos'
import { semErros, validarTarefa, type Erros } from '../../dominio/validacao'
import { Campo } from '../Campo'
import { botaoPrimario, botaoSecundario, campo } from '../estilos'
import { Modal } from '../Modal'
import { nomeEstado, nomePrioridade } from '../textos'

interface Props {
  inicial?: Tarefa
  onSalvar: (dados: DadosTarefa) => void
  onFechar: () => void
}

export function FormTarefa({ inicial, onSalvar, onFechar }: Props) {
  const [dados, setDados] = useState<DadosTarefa>(inicial ?? TAREFA_PADRAO)
  const [erros, setErros] = useState<Erros<DadosTarefa>>({})

  function salvar(evento: FormEvent) {
    evento.preventDefault()
    const final = { ...dados, titulo: dados.titulo.trim() }
    const encontrados = validarTarefa(final)
    setErros(encontrados)
    if (!semErros(encontrados)) return
    onSalvar(final)
    onFechar()
  }

  return (
    <Modal
      titulo={inicial ? 'Editar tarefa' : 'Nova tarefa'}
      descricao="Dê um título e escolha o estado e a prioridade."
      onFechar={onFechar}
    >
      <form onSubmit={salvar} noValidate className="space-y-4">
        <Campo
          rotulo="Título"
          erro={erros.titulo}
          dica={
            <div className="mt-1 flex justify-between text-[10px] text-gray-400">
              <span>Obrigatório</span>
              <span>{dados.titulo.length}/100</span>
            </div>
          }
        >
          {(acessivel) => (
            <input
              {...acessivel}
              value={dados.titulo}
              onChange={(evento) => setDados({ ...dados, titulo: evento.target.value })}
              placeholder="Ex: Revisar capítulo 4"
              maxLength={100}
              className={campo}
            />
          )}
        </Campo>

        <div className="grid grid-cols-2 gap-4">
          <Campo rotulo="Estado" erro={erros.estado}>
            {(acessivel) => (
              <select
                {...acessivel}
                value={dados.estado}
                onChange={(evento) =>
                  setDados({ ...dados, estado: evento.target.value as EstadoTarefa })
                }
                className={campo}
              >
                {ORDEM_ESTADO.map((estado) => (
                  <option key={estado} value={estado}>
                    {nomeEstado[estado]}
                  </option>
                ))}
              </select>
            )}
          </Campo>

          <Campo rotulo="Prioridade" erro={erros.prioridade}>
            {(acessivel) => (
              <select
                {...acessivel}
                value={dados.prioridade}
                onChange={(evento) =>
                  setDados({ ...dados, prioridade: evento.target.value as Prioridade })
                }
                className={campo}
              >
                {ORDEM_PRIORIDADE.map((prioridade) => (
                  <option key={prioridade} value={prioridade}>
                    {nomePrioridade[prioridade]}
                  </option>
                ))}
              </select>
            )}
          </Campo>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button type="button" onClick={onFechar} className={botaoSecundario}>
            Cancelar
          </button>
          <button type="submit" className={botaoPrimario}>
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  )
}
