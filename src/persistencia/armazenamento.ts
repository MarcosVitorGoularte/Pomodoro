export const CHAVES = {
  presets: 'pomodoro.presets',
  tarefas: 'pomodoro.tarefas',
  sessaoAtiva: 'pomodoro.sessaoAtiva',
} as const

const chavesComFalha = new Set<string>()
const ouvintes = new Set<() => void>()

function atualizarFalha(chave: string, falhou: boolean) {
  const haviaFalha = chavesComFalha.size > 0
  if (falhou) chavesComFalha.add(chave)
  else chavesComFalha.delete(chave)
  if (haviaFalha === chavesComFalha.size > 0) return
  ouvintes.forEach((ouvinte) => ouvinte())
}

export function ler<T>(chave: string, ehValido: (valor: unknown) => valor is T, padrao: T): T {
  try {
    const salvo = window.localStorage.getItem(chave)
    if (salvo === null) return padrao

    const valor: unknown = JSON.parse(salvo)
    return ehValido(valor) ? valor : padrao
  } catch {
    return padrao
  }
}

export function salvar(chave: string, valor: unknown): void {
  try {
    if (valor === null) {
      window.localStorage.removeItem(chave)
    } else {
      const serializado = JSON.stringify(valor)
      if (serializado === undefined) {
        throw new TypeError('Os dados não podem ser serializados.')
      }
      window.localStorage.setItem(chave, serializado)
    }

    atualizarFalha(chave, false)
  } catch {
    atualizarFalha(chave, true)
  }
}

export function acompanharFalha(ouvinte: () => void) {
  ouvintes.add(ouvinte)
  return () => ouvintes.delete(ouvinte)
}

export function houveFalha(): boolean {
  return chavesComFalha.size > 0
}
