export function PaginaFoco() {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm lg:col-span-2">
        <div className="mb-4 flex w-full items-center justify-between self-start">
          <span className="text-2xl font-bold text-gray-900">Sessão de foco</span>
          <span className="text-md font-bold text-gray-900">Em andamento</span>
        </div>

        <span className="mb-1 self-start font-medium text-gray-500">Temporizador</span>

        <div className="mb-8 flex w-full flex-wrap justify-center gap-3 max-[550px]:flex-col">
          <button
            type="button"
            className="flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-gray-900 p-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Estudo padrão - foco 25
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-gray-900 p-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Gerenciar temporizadores
          </button>
        </div>

        <div className="mb-8 flex w-full flex-wrap justify-center gap-3 max-[550px]:flex-col">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-4xl border border-gray-400 px-5 py-0.5 font-medium text-gray-500 transition hover:bg-gray-200"
          >
            Foco
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-xl border border-gray-400 px-5 py-0.5 font-medium text-gray-500 transition hover:bg-gray-200"
          >
            Pausa curta
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-xl border border-gray-400 px-5 py-0.5 font-medium text-gray-500 transition hover:bg-gray-200"
          >
            Pausa longa
          </button>
        </div>

        <h1 className="mb-4 text-9xl font-bold text-gray-900">10:00</h1>

        <div className="mb-6 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Ciclo 1 de 4</span>
          <div className="flex space-x-1">
            <span className="h-2 w-2 rounded-full bg-gray-900"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-wrap justify-center gap-3">
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl bg-gray-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            Retomar
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Pular fase
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-200 sm:w-auto"
          >
            Reiniciar ciclos
          </button>
        </div>

        <div className="mt-6 w-full max-w-md border-t pt-4">
          <button
            type="button"
            className="w-full cursor-pointer rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Encerrar sessão
          </button>
        </div>
      </div>
      <div>Parte das Tarefas</div>
    </section>
  )
}
