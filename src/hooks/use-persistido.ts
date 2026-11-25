import { useEffect, useState, useSyncExternalStore } from 'react'
import { acompanharFalha, houveFalha, ler, salvar } from '../persistencia/armazenamento'

export function usePersistido<T>(
  chave: string,
  ehValido: (valor: unknown) => valor is T,
  padrao: T,
  ajustar: (valor: T) => T = (valor) => valor,
) {
  const [valor, setValor] = useState<T>(() => ajustar(ler(chave, ehValido, padrao)))

  useEffect(() => {
    salvar(chave, valor)
  }, [chave, valor])

  return [valor, setValor] as const
}

export function useFalhaAoSalvar() {
  return useSyncExternalStore(acompanharFalha, houveFalha)
}
