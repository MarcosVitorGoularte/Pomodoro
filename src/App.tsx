import { useState } from 'react'
import { Timer } from 'lucide-react'
import { PaginaFoco } from './components/paginas/PaginaFoco'
import { PaginaTemporizadores } from './components/paginas/PaginaTemporizadores'

type Tipo = 'foco' | 'temporizadores'

const abas: { id: Tipo; nomeBotao: string }[] = [
  { id: 'foco', nomeBotao: 'Foco' },
  { id: 'temporizadores', nomeBotao: 'Temporizadores' },
]

export default function App() {
  const [tipo, setTipo] = useState<Tipo>('foco')

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="flex flex-col gap-3 px-4 py-3 shadow-sm min-[425px]:flex-row min-[425px]:items-center min-[425px]:justify-between">
        <span className="flex items-center gap-1 text-2xl font-bold text-gray-900 max-[425px]:justify-center">
          <Timer className="h-5 w-5"></Timer> Pomodoro
        </span>
        <nav className="flex gap-2">
          {abas.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setTipo(aba.id)}
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
      <main className="flex flex-1 flex-col p-4">
        {tipo === 'foco' && <PaginaFoco />}
        {tipo === 'temporizadores' && <PaginaTemporizadores />}
      </main>
    </div>
  )
}
