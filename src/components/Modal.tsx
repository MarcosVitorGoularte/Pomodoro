import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  titulo: string
  descricao?: string
  onFechar: () => void
  children: ReactNode
}

export function Modal({ titulo, descricao, onFechar, children }: Props) {
  const referencia = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogo = referencia.current
    if (dialogo && !dialogo.open) dialogo.showModal()
  }, [])

  return (
    <dialog
      ref={referencia}
      onClose={onFechar}
      onClick={(evento) => evento.target === evento.currentTarget && onFechar()}
      aria-labelledby="modal-titulo"
      className="m-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/50"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={() => referencia.current?.close()}
        className="absolute top-4 right-4 cursor-pointer text-xl font-bold text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
      <h2 id="modal-titulo" className="text-xl font-bold text-gray-900">
        {titulo}
      </h2>
      {descricao && <p className="mt-1 text-sm text-gray-500">{descricao}</p>}
      <div className="mt-6">{children}</div>
    </dialog>
  )
}
