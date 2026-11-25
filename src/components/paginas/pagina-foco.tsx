import { FASES } from '../../dominio/sessao.ts'
import type { Temporizador } from '../../dominio/tipos.ts'
import type { ControleSessao } from '../../hooks/use-sessao.ts'
import type { ControleTarefas } from '../../hooks/use-tarefas.ts'
import { botaoPerigo, botaoPrimario, botaoSecundario, cartao } from '../estilos.ts'
import { ListaTarefas } from '../tarefas/lista-tarefas.tsx'
import { nomeFase } from '../textos.ts'

interface Props {
  temporizadores: Temporizador[]
  selecionado: Temporizador | undefined
  controle: ControleSessao
  tarefas: ControleTarefas
  onSelecionar: (id: string) => void
  onGerenciar: () => void
}

const textoStatus = { emAndamento: 'Em andamento', pausada: 'Pausada', concluida: 'Concluída' }

function formatarTempo(ms: number) {
  const segundos = Math.ceil(ms / 1000)
  const min = String(Math.floor(segundos / 60)).padStart(2, '0')
  const seg = String(segundos % 60).padStart(2, '0')
  return `${min}:${seg}`
}

export function PaginaFoco(props: Props) {
  const { temporizadores, selecionado, controle, tarefas, onSelecionar, onGerenciar } = props
  const { sessao, retomada } = controle
  const parametros = sessao?.snapshotPreset ?? selecionado
  const faseAtual = sessao?.faseAtual ?? 'foco'
  const cicloAtual = sessao?.cicloAtual ?? 1
  const tempo = sessao ? controle.restanteMs : (selecionado?.tempoFocoMin ?? 0) * 60_000

  function reiniciar() {
    if (confirm('Reiniciar os ciclos? A sessão volta para o primeiro foco.')) {
      controle.reiniciarCiclos()
    }
  }

  function encerrar() {
    if (confirm('Encerrar a sessão atual?')) controle.encerrar()
  }

  function descartar() {
    if (confirm('Descartar a sessão retomada?')) controle.encerrar()
  }

  return (
    <section className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
      <div className={`${cartao} flex flex-col items-center text-center sm:p-8 lg:col-span-2`}>
        <div className="mb-4 flex w-full items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Sessão de foco</h1>

          <span className="shrink-0 rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700">
            {sessao ? textoStatus[sessao.status] : 'Sem sessão ativa'}
          </span>
        </div>

        {retomada && (
          <div
            role="status"
            className="mb-6 w-full rounded-xl border border-amber-300 bg-amber-50 p-4 text-left"
          >
            <p className="font-medium text-amber-900">Sessão retomada de onde você parou.</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={controle.fecharAvisoRetomada}
                className={botaoSecundario}
              >
                Continuar
              </button>

              <button type="button" onClick={descartar} className={botaoPerigo}>
                Descartar sessão
              </button>
            </div>
          </div>
        )}

        {!parametros ? (
          <div className="my-auto">
            <p className="text-gray-500">Nenhum temporizador cadastrado.</p>

            <button type="button" onClick={onGerenciar} className={`${botaoPrimario} mx-auto mt-4`}>
              Criar temporizador
            </button>
          </div>
        ) : (
          <>
            <label htmlFor="temporizador" className="mb-1 self-start font-medium text-gray-500">
              Temporizador
            </label>

            <div className="mb-8 flex w-full flex-wrap justify-center gap-3 max-[550px]:flex-col">
              <select
                id="temporizador"
                value={selecionado?.id}
                onChange={(evento) => onSelecionar(evento.target.value)}
                className="flex-1 cursor-pointer rounded-xl border-2 border-gray-900 bg-white p-3 font-medium text-gray-700"
              >
                {temporizadores.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome} - foco {t.tempoFocoMin} min
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={onGerenciar}
                className="cursor-pointer rounded-xl border-2 border-gray-900 p-3 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Gerenciar temporizadores
              </button>
            </div>

            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {FASES.map((fase) => (
                <span
                  key={fase}
                  className={`rounded-full border px-5 py-0.5 font-medium ${
                    fase === faseAtual
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-400 text-gray-500'
                  }`}
                >
                  {nomeFase[fase]}
                </span>
              ))}
            </div>

            <p
              role="timer"
              className="mt-auto mb-4 text-9xl font-bold text-gray-900 tabular-nums max-sm:text-7xl"
            >
              {formatarTempo(tempo)}
            </p>

            <div className="mb-auto flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Ciclo {cicloAtual} de {parametros.ciclosAntesPausaLonga}
              </span>

              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: parametros.ciclosAntesPausaLonga }, (_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      sessao && i < cicloAtual ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {controle.ativa && sessao ? (
              <>
                <div className="mt-6 flex w-full max-w-md flex-wrap justify-center gap-3">
                  {sessao.status === 'emAndamento' ? (
                    <button
                      type="button"
                      onClick={controle.pausar}
                      className={`${botaoPrimario} flex-1`}
                    >
                      Pausar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={controle.retomar}
                      className={`${botaoPrimario} flex-1`}
                    >
                      Retomar
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={controle.pularFase}
                    className={`${botaoSecundario} flex-1`}
                  >
                    Pular fase
                  </button>

                  <button
                    type="button"
                    onClick={reiniciar}
                    className={`${botaoSecundario} w-full sm:w-auto`}
                  >
                    Reiniciar ciclos
                  </button>
                </div>

                <div className="mt-6 w-full max-w-md border-t border-gray-200 pt-4">
                  <button type="button" onClick={encerrar} className={`${botaoPerigo} w-full`}>
                    Encerrar sessão
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-6 flex w-full max-w-md flex-col gap-3">
                {sessao && (
                  <p className="text-sm font-medium text-green-700">
                    Sessão concluída. Bom trabalho!
                  </p>
                )}

                {selecionado && (
                  <button
                    type="button"
                    onClick={() => controle.iniciar(selecionado)}
                    className={`${botaoPrimario} py-3 text-lg`}
                  >
                    {sessao ? 'Nova sessão' : 'Iniciar'}
                  </button>
                )}

                {sessao && (
                  <button type="button" onClick={controle.encerrar} className={botaoSecundario}>
                    Fechar sessão concluída
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <ListaTarefas controle={tarefas} />
    </section>
  )
}
