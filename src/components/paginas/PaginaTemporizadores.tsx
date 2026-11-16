import { useState, type FormEvent } from 'react'

interface TemporizadorItem {
  id: string
  nome: string
  foco: number
  pausaCurta: number
  ciclos: number
  pausaLonga: number
  emUso?: boolean
}

export function PaginaTemporizadores() {
  const [view, setView] = useState<'foco' | 'temporizadores'>('temporizadores')
  const [modalAberto, setModalAberto] = useState(false)

  const [temporizadores, setTemporizadores] = useState<TemporizadorItem[]>([
    {
      id: '1',
      nome: 'Estudo padrão',
      foco: 25,
      pausaCurta: 5,
      ciclos: 4,
      pausaLonga: 15,
      emUso: true,
    },
    {
      id: '2',
      nome: 'Leitura longa',
      foco: 50,
      pausaCurta: 10,
      ciclos: 3,
      pausaLonga: 30,
    },
    {
      id: '3',
      nome: 'Revisão rápida',
      foco: 15,
      pausaCurta: 3,
      ciclos: 4,
      pausaLonga: 10,
    },
    {
      id: '4',
      nome: 'Prova Simulada',
      foco: 90,
      pausaCurta: 15,
      ciclos: 2,
      pausaLonga: 30,
    },
  ])

  const [nome, setNome] = useState('')
  const [foco, setFoco] = useState('25')
  const [pausaCurta, setPausaCurta] = useState('5')
  const [ciclos, setCiclos] = useState('4')
  const [pausaLonga, setPausaLonga] = useState('15')

  function salvarTemporizador(evento: FormEvent) {
    evento.preventDefault()
    if (!nome.trim()) return

    const novo: TemporizadorItem = {
      id: String(Date.now()),
      nome: nome.trim(),
      foco: Number(foco) || 25,
      pausaCurta: Number(pausaCurta) || 5,
      ciclos: Number(ciclos) || 4,
      pausaLonga: Number(pausaLonga) || 15,
    }

    setTemporizadores((atuais) => [...atuais, novo])
    setModalAberto(false)
    setNome('')
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-100 font-sans text-gray-900">
      <main className="mx-auto w-full max-w-7xl flex-1 p-6">
        {view === 'foco' ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm lg:col-span-2">
              <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-gray-900">12:05</h1>

              <div className="mb-6 flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Ciclo 3 de 4</span>
                <div className="flex space-x-1">
                  <span className="h-2 w-2 rounded-full bg-gray-900"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-900"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-900"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                </div>
              </div>

              <p className="mb-8 text-xs text-gray-400">Tempo restante preservado na pausa.</p>

              <div className="flex w-full max-w-md flex-wrap justify-center gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-gray-800"
                >
                  Retomar
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Pular fase
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Reiniciar ciclos
                </button>
              </div>

              <div className="mt-6 w-full max-w-md border-t pt-4">
                <button
                  type="button"
                  onClick={() => setView('temporizadores')}
                  className="w-full rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Encerrar sessão
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="border-b pb-2 font-bold text-gray-900">Tarefas</h2>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm font-medium text-gray-800">
                  Resumo de História do Brasil
                </span>
                <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  Alta
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm font-medium text-gray-800">
                  Ler artigo para o seminário
                </span>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  Média
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm font-medium text-gray-800">
                  Organizar anotações de Química
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  Média
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm font-medium text-gray-800">
                  Refazer mapa mental de Biologia
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Baixa
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">
                  Assistir aula gravada de Inglês
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Baixa
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Temporizadores</h1>
                <p className="text-sm text-gray-500">
                  Cada temporizador define o foco, as pausas e quantos ciclos vêm antes da pausa
                  longa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalAberto(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                + Novo temporizador
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {temporizadores.map((temporizador) => (
                <div
                  key={temporizador.id}
                  className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{temporizador.nome}</h3>
                      {temporizador.emUso && (
                        <span className="flex items-center gap-1 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
                          Em uso
                        </span>
                      )}
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400">Foco</p>
                        <p className="font-semibold text-gray-800">{temporizador.foco} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Pausa curta</p>
                        <p className="font-semibold text-gray-800">{temporizador.pausaCurta} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Ciclos até a pausa longa</p>
                        <p className="font-semibold text-gray-800">{temporizador.ciclos}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Pausa longa</p>
                        <p className="font-semibold text-gray-800">{temporizador.pausaLonga} min</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <button
                      type="button"
                      onClick={() => setView('foco')}
                      className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                    >
                      Usar
                    </button>
                    <div className="space-x-2">
                      <button
                        type="button"
                        className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setTemporizadores((atuais) =>
                            atuais.filter((item) => item.id !== temporizador.id),
                          )
                        }
                        className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 cursor-pointer text-xl font-bold text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>

            <h2 className="mb-1 text-xl font-bold text-gray-900">Novo temporizador</h2>
            <p className="mb-6 text-xs text-gray-500">
              Preencha os tempos e o nome para criar um temporizador.
            </p>

            <form onSubmit={salvarTemporizador} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Ex: Leitura longa"
                  maxLength={40}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                />
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Obrigatório</span>
                  <span className="text-[10px] text-gray-400">{nome.length}/40</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Tempo de foco
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={foco}
                      onChange={(evento) => setFoco(evento.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-gray-900 focus:outline-none"
                    />
                    <span className="absolute top-2.5 right-3 text-xs text-gray-400">min</span>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Pausa curta
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={pausaCurta}
                      onChange={(evento) => setPausaCurta(evento.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-gray-900 focus:outline-none"
                    />
                    <span className="absolute top-2.5 right-3 text-xs text-gray-400">min</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Ciclos antes da pausa longa
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ciclos}
                    onChange={(evento) => setCiclos(evento.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Pausa longa
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={pausaLonga}
                      onChange={(evento) => setPausaLonga(evento.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-gray-900 focus:outline-none"
                    />
                    <span className="absolute top-2.5 right-3 text-xs text-gray-400">min</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
