export type ConfigEntidade = {
  chave: string;
  chaveColecao: string;
  endpoints: {
    salvar: string;
    salvarTodos: string;
    buscarTodos: string;
    excluir: string;
    existe: string;
    buscarPor: string;
    buscarPorId: string;
    buscarPorIds: string;
    salvarAtribs: string;
    executarTodos: string;
  };
};

export const configEntidades: Record<string, ConfigEntidade> = {
  categorias: {
    chave: "categoria",
    chaveColecao: "categorias",
    endpoints: {
      existe: "/categorias/:id/existe", //get
      buscarPorId: "/categorias/:id", //get
      buscarPor: "/categorias/por-data", //get
      buscarTodos: "/categorias", //get
      buscarPorIds: "/categorias/por-ids", //post
      salvarTodos: "/categorias", //post --------
      salvarAtribs: "/categorias/:id/atributos", //post
      executarTodos: "/categorias/execucao", //post
      salvar: "/categorias/:id", //put
      excluir: "/categorias/:id", //delete
    },
  },
  contas: {
    chave: "conta",
    chaveColecao: "contas",
    endpoints: {
      existe: "/contas/:id/existe", //get
      buscarPorId: "/contas/:id", //get
      buscarPor: "/contas/por-data", //get
      buscarTodos: "/contas", //get
      buscarPorIds: "/contas/por-ids", //post
      salvarTodos: "/contas", //post --------
      salvarAtribs: "/contas/:id/atributos", //post
      executarTodos: "/contas/execucao", //post
      salvar: "/contas/:id", //put
      excluir: "/contas/:id", //delete
    },
  },
  cartoes: {
    chave: "cartao",
    chaveColecao: "cartoes",
    endpoints: {
      existe: "/cartoes/:id/existe", //get
      buscarPorId: "/cartoes/:id", //get
      buscarPor: "/cartoes/por-data", //get
      buscarTodos: "/cartoes", //get
      buscarPorIds: "/cartoes/por-ids", //post
      salvarTodos: "/cartoes", //post --------
      salvarAtribs: "/cartoes/:id/atributos", //post
      executarTodos: "/cartoes/execucao", //post
      salvar: "/cartoes/:id", //put
      excluir: "/cartoes/:id", //delete
    },
  },
  usuarios: {
    chave: "usuario",
    chaveColecao: "usuarios",
    endpoints: {
      existe: "/usuarios/:id/existe", //get
      buscarPorId: "/usuarios/:id", //get
      buscarPor: "/usuarios/por-data", //get
      buscarTodos: "/usuarios", //get
      buscarPorIds: "/usuarios/por-ids", //post
      salvarTodos: "/usuarios", //post --------
      salvarAtribs: "/usuarios/:id/atributos", //post
      executarTodos: "/usuarios/execucao", //post
      salvar: "/usuarios/:id", //put
      excluir: "/usuarios/:id", //delete
    },
  },
  eventos: {
    chave: "evento",
    chaveColecao: "eventos",
    endpoints: {
      existe: "/eventos/:id/existe", //get
      buscarPorId: "/eventos/:id", //get
      buscarPor: "/eventos/por-data", //get
      buscarTodos: "/eventos", //get
      buscarPorIds: "/eventos/por-ids", //post
      salvarTodos: "/eventos", //post --------
      salvarAtribs: "/eventos/:id/atributos", //post
      executarTodos: "/eventos/execucao", //post
      salvar: "/eventos/:id", //put
      excluir: "/eventos/:id", //delete
    },
  },
  extratos: {
    chave: "extrato",
    chaveColecao: "extratos",
    endpoints: {
      existe: "/extratos/:id/existe", //get
      buscarPorId: "/extratos/:id", //get
      buscarPor: "/extratos/por-data", //get
      buscarTodos: "/extratos", //get
      buscarPorIds: "/extratos/por-ids", //post
      salvarTodos: "/extratos", //post --------
      salvarAtribs: "/extratos/:id/atributos", //post
      executarTodos: "/extratos/execucao", //post
      salvar: "/extratos/:id", //put
      excluir: "/extratos/:id", //delete
    },
  },
  extratosmensais: {
    chave: "extrato",
    chaveColecao: "extratos",
    endpoints: {
      existe: "/extratos/mensais/:id/existe", //get
      buscarPorId: "/extratos/mensais/:id", //get
      buscarPor: "/extratos/mensais/por-data", //get
      buscarTodos: "/extratos/mensais", //get
      buscarPorIds: "/extratos/mensais/por-ids", //post
      salvarTodos: "/extratos/mensais", //post --------
      salvarAtribs: "/extratos/mensais/:id/atributos", //post
      executarTodos: "/extratos/mensais/execucao", //post
      salvar: "/extratos/mensais/:id", //put
      excluir: "/extratos/mensais/:id", //delete
    },
  },
  extratosrecorrencias: {
    chave: "extrato",
    chaveColecao: "extratos",
    endpoints: {
      existe: "/extratos/recorrencias/:id/existe", //get
      buscarPorId: "/extratos/recorrencias/:id", //get
      buscarPor: "/extratos/recorrencias/por-data", //get
      buscarTodos: "/extratos/recorrencias", //get
      buscarPorIds: "/extratos/recorrencias/por-ids", //post
      salvarTodos: "/extratos/recorrencias", //post --------
      salvarAtribs: "/extratos/recorrencias/:id/atributos", //post
      executarTodos: "/extratos/recorrencias/execucao", //post
      salvar: "/extratos/recorrencias/:id", //put
      excluir: "/extratos/recorrencias/:id", //delete
    },
  },
};
