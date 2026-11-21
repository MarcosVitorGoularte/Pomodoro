import { useId, type ReactNode } from 'react'
import { rotulo as estiloRotulo } from './estilos'

interface Acessivel {
  id: string
  'aria-invalid': boolean
  'aria-describedby'?: string
}

interface Props {
  rotulo: string
  erro?: string
  dica?: ReactNode
  children: (acessivel: Acessivel) => ReactNode
}

export function Campo({ rotulo, erro, dica, children }: Props) {
  const id = useId()
  const idErro = `${id}-erro`

  return (
    <div>
      <label htmlFor={id} className={estiloRotulo}>
        {rotulo}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(erro),
        'aria-describedby': erro ? idErro : undefined,
      })}
      {erro ? (
        <p id={idErro} className="mt-1 text-xs text-red-600">
          {erro}
        </p>
      ) : (
        dica
      )}
    </div>
  )
}
