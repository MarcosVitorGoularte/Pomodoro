import { useState } from 'react'
import { Timer, TriangleAlert } from 'lucide-react'
import { PaginaFoco } from './components/paginas/PaginaFoco'
import { PaginaTemporizadores } from './components/paginas/PaginaTemporizadores'
import { useSessao } from './hooks/useSessao.ts'
import { useTarefas } from './hooks/useTarefas.ts'
import { useFalhaAoSalvar } from './hooks/usePersistido.ts'
import { useTemporizadores } from './hooks/useTemporizadores.ts'

type Tipo = 'foco' | 'temporizadores'

const abas: { id: Tipo; nomeBotao: string }[] = [
  { id: 'foco', nomeBotao: 'Foco' },
  { id: 'temporizadores', nomeBotao: 'Temporizadores' },
]

export default function App() {
  const { temporizadores, criar, editar, excluir } = useTemporizadores()
  const tarefas = useTarefas()
  const controle = useSessao()
  const falhaAoSalvar = useFalhaAoSalvar()
  const [tipo, setTipo] = useState<Tipo>('foco')
  const [selecionadoId, setSelecionadoId] = useState<string | undefined>(
    () => controle.sessao?.presetId ?? temporizadores[0]?.id,
  )

  const selecionado =
    temporizadores.find((temporizador) => temporizador.id === selecionadoId) ?? temporizadores[0]
  const emUsoId = controle.ativa ? controle.sessao?.presetId : undefined

  function selecionar(id: string) {
    if (id === selecionado?.id) return
    setSelecionadoId(id)
    if (!controle.ativa) return
    const novo = temporizadores.find((temporizador) => temporizador.id === id)
    if (novo) controle.iniciar(novo)
  }

  function usar(id: string) {
    selecionar(id)
    setTipo('foco')
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="flex flex-col gap-3 px-4 py-3 shadow-sm min-[425px]:flex-row min-[425px]:items-center min-[425px]:justify-between">
        <span className="flex items-center gap-1 text-2xl font-bold text-gray-900 max-[425px]:justify-center">
          <Timer className="h-5 w-5" aria-hidden="true" /> Pomodoro
        </span>
        <nav className="flex gap-2" aria-label="Navegação principal">
          {abas.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setTipo(aba.id)}
              aria-current={tipo === aba.id ? 'page' : undefined}
              className={`flex-1 cursor-pointer rounded-lg px-4 py-2 transition-all max-[350px]:px-2 min-[425px]:flex-none ${
                tipo === aba.id
                  ? 'scale-105 bg-gray-900 text-white'
                  : 'bg-slate-200 text-black hover:bg-gray-300'
              }`}
            >
              {aba.nomeBotao}
            </button>
          ))}
        </nav>
      </header>

      {falhaAoSalvar && (
        <p
          role="alert"
          className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
        >
          <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          Não foi possível salvar seus dados neste navegador. As últimas mudanças podem se perder.
        </p>
      )}

      <main className="flex flex-1 flex-col p-4">
        {tipo === 'foco' && (
          <PaginaFoco
            temporizadores={temporizadores}
            selecionado={selecionado}
            controle={controle}
            tarefas={tarefas}
            onSelecionar={selecionar}
            onGerenciar={() => setTipo('temporizadores')}
          />
        )}
        {tipo === 'temporizadores' && (
          <PaginaTemporizadores
            temporizadores={temporizadores}
            emUsoId={emUsoId}
            onUsar={usar}
            onCriar={criar}
            onEditar={editar}
            onExcluir={excluir}
          />
        )}
      </main>
    </div>
  )
}
