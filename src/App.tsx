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
    <main className="min-h-screen bg-slate-100 p-4">
      <header className="mb-6 flex items-center gap-3 rounded-xl bg-red-500 px-5 py-3 shadow-sm">
        <Timer className="h-5 w-5 text-gray-900"></Timer>
        <span className="text-2xl font-bold text-slate-800">Pomodoro</span>
      </header>

      <div className="flex w-max gap-2 rounded-t-xl bg-white p-3 max-[350px]:p-2">
        {abas.map((aba) => (
          <button
            key={aba.id}
            type="button"
            onClick={() => setTipo(aba.id)}
            className={`cursor-pointer rounded px-3 py-2 text-white transition-all max-[350px]:px-2 ${
              tipo === aba.id ? 'scale-105 bg-blue-600' : 'bg-blue-400'
            }`}
          >
            {aba.nomeBotao}
          </button>
        ))}
      </div>

      {tipo === 'foco' && <PaginaFoco />}
      {tipo === 'temporizadores' && <PaginaTemporizadores />}
    </main>
  )
}
