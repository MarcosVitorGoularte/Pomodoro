export function ListaTarefas() {
  return (
    <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Tarefas <span className="font-normal text-gray-500">(7)</span>
        </h2>
        <button
          type="button"
          className="cursor-pointer rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Nova tarefa
        </button>
      </div>

      <p className="mb-4 text-xs text-gray-500">
        Ordem fixa: prioridade (alta → baixa), depois estado.
      </p>

      <ul className="space-y-2">
        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">Revisar capítulo 4 de Cálculo</p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                Alta
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                A fazer
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">Lista de exercícios de Física</p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                Alta
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                Em execução
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 line-through">
              Resumo de História do Brasil
            </p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                Alta
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                Concluída
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">Ler artigo para o seminário</p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                Média
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                A fazer
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">Organizar anotações de Química</p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                Média
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                Backlog
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 line-through">
              Refazer mapa mental de Biologia
            </p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded border border-gray-400 px-2 py-0.5 text-xs font-medium text-gray-700">
                Baixa
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                Cancelada
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>

        <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">Assistir aula gravada de Inglês</p>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded border border-gray-400 px-2 py-0.5 text-xs font-medium text-gray-700">
                Baixa
              </span>
              <span className="rounded border border-dashed border-gray-400 px-2 py-0.5 text-xs text-gray-600">
                Backlog
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button
              type="button"
              aria-label="Editar"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              ✎
            </button>
            <button
              type="button"
              aria-label="Excluir"
              className="cursor-pointer rounded p-1 hover:bg-gray-100"
            >
              🗑
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}
