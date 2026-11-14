import { useState } from 'react'
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
    <main className="p-4">
      <div className="flex w-max gap-2 rounded-t-xl bg-white p-3 max-[350px]:p-2">
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => setTipo(aba.id)}
            className={`cursor-pointer rounded px-3 py-2 transition-all max-[350px]:px-2 ${
              tipo === aba.id ? 'scale-105 bg-blue-600 text-white' : 'bg-blue-400 text-white'
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
