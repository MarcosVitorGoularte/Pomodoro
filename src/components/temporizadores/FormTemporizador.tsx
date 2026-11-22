import { useState, type FormEvent } from 'react'
import type { DadosTemporizador, Temporizador } from '../../dominio/tipos'
import { semErros, validarTemporizador, type Erros } from '../../dominio/validacao'
import { Campo } from '../Campo'
import { botaoPrimario, botaoSecundario, campo } from '../estilos'
import { Modal } from '../Modal'

interface Props {
  inicial?: Temporizador
  onSalvar: (dados: DadosTemporizador) => void
  onFechar: () => void
}

const camposNumericos = [
  { chave: 'tempoFocoMin', rotulo: 'Tempo de foco', padrao: 25, unidade: 'min' },
  { chave: 'tempoPausaCurtaMin', rotulo: 'Pausa curta', padrao: 5, unidade: 'min' },
  { chave: 'ciclosAntesPausaLonga', rotulo: 'Ciclos antes pausa longa', padrao: 4, unidade: '' },
  { chave: 'tempoPausaLongaMin', rotulo: 'Pausa longa', padrao: 15, unidade: 'min' },
] as const

type ChaveNumerica = (typeof camposNumericos)[number]['chave']

export function FormTemporizador({ inicial, onSalvar, onFechar }: Props) {
  const [nome, setNome] = useState(inicial?.nome ?? '')

  const [numeros, setNumeros] = useState(() => {
    const valores = {} as Record<ChaveNumerica, string>
    for (const c of camposNumericos) valores[c.chave] = String(inicial?.[c.chave] ?? c.padrao)
    return valores
  })
  const [erros, setErros] = useState<Erros<DadosTemporizador>>({})

  function salvar(evento: FormEvent) {
    evento.preventDefault()
    const dados: DadosTemporizador = {
      nome: nome.trim(),
      tempoFocoMin: Number(numeros.tempoFocoMin),
      tempoPausaCurtaMin: Number(numeros.tempoPausaCurtaMin),
      ciclosAntesPausaLonga: Number(numeros.ciclosAntesPausaLonga),
      tempoPausaLongaMin: Number(numeros.tempoPausaLongaMin),
    }

    const encontrados = validarTemporizador(dados)

    setErros(encontrados)
    if (!semErros(encontrados)) return
    onSalvar(dados)
    onFechar()
  }
  return (
    <Modal
      titulo={inicial ? 'Editar temporizador' : 'Novo temporizador'}
      descricao={
        inicial
          ? 'Altere os tempos ou nome e salve.'
          : 'Preencha os tempos e o nome para criar um temporizador.'
      }
      onFechar={onFechar}
    >
      <form onSubmit={salvar} noValidate className="space-y-4">
        <Campo
          rotulo="nome"
          erro={erros.nome}
          dica={
            <div className="mt-1 flex justify-between text-[10px] text-gray-400">
              <span>Obrigatório</span>
              <span>{nome.length}/40</span>
            </div>
          }
        >
          {(acessivel) => (
            <input
              {...acessivel}
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              placeholder="EX: Leitura Longa"
              maxLength={40}
              className={campo}
            />
          )}
        </Campo>

        <div className="grid grid-cols-2 gap-4">
          {camposNumericos.map((c) => (
            <Campo key={c.chave} rotulo={c.rotulo} erro={erros[c.chave]}>
              {(acessivel) => (
                <div className="relative">
                  <input
                    {...acessivel}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={numeros[c.chave]}
                    onChange={(evento) =>
                      setNumeros({ ...numeros, [c.chave]: evento.target.value })
                    }
                    className={'${campo} pr-12'}
                  />
                  <span className="absolute top-2.5 right-3 text-xs text-gray-400">
                    {c.unidade}
                  </span>
                </div>
              )}
            </Campo>
          ))}
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
