import "./setup";
import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import ContaRepositorioPgPrismaAdapter from "./adapters/database/ContaRepositorioPgPrismaAdapter";
import CartaoRepositorioPgPrismaAdapter from "./adapters/database/CartaoRepositorioPgPrismaAdapter";
import UsuarioRepositorioPgPrismaAdapter from "./adapters/database/UsuarioRepositorioPgPrismaAdapter";
import CanalEventosRabbitMQ from "./adapters/evento/CanalEventosRabbitMQ";
import ConsumidorEventoRabbitMq from "./adapters/evento/ConsumidorEventoRabbitMq";
import { PrismaClient } from "@prisma/client";
import { checkAuth } from "./middlewares/checkAuth";
import CategoriasDAL from "./dal/CategoriaDAL";
import ContaBuscarPoridStoreController from "./controllers/conta/ContaBuscarPorid";
import ContaConsultarStoreController from "./controllers/conta/ContaBuscarTodos";
import ContaSalvarStoreController from "./controllers/conta/ContaSalvar";
import ContaSalvarAtribsStoreController from "./controllers/conta/ContaSalvarAtribs";
import ContaDAL from "./dal/ContaDAL";
import CartaoDAL from "./dal/CartaoDAL";
import CartaoConsultarStoreController from "./controllers/cartao/CartaoBuscarTodos";
import CartaoExisteStoreController from "./controllers/cartao/CartaoExiste";
import CartaoSalvarStoreController from "./controllers/cartao/CartaoSalvar";
import CartaoSalvarAtribsStoreController from "./controllers/cartao/CartaoSalvarAtribs";
import PingController from "./controllers/usuario/Ping";
import CategoriaBuscarPoridStoreController from "./controllers/categoria/CategoriaBuscarPorid";
import CategoriaConsultarStoreController from "./controllers/categoria/CategoriaBuscarTodos";
import CategoriaExcluirStoreController from "./controllers/categoria/CategoriaExcluir";
import CategoriaExisteStoreController from "./controllers/categoria/CategoriaExiste";
import CategoriaSalvarStoreController from "./controllers/categoria/CategoriaSalvar";
import CategoriaSalvarAtribsStoreController from "./controllers/categoria/CategoriaSalvarAtribs";
import CategoriaSalvarTodasStoreController from "./controllers/categoria/CategoriaSalvarTodos";
import UsurioSalvarStoreController from "./controllers/usuario/UsuarioBuscarPorid";
import UsuarioExisteStoreController from "./controllers/usuario/UsuarioExiste";
import UsuarioSalvarStoreController from "./controllers/usuario/UsuarioSalvar";
import UsuarioDAL from "./dal/UsuarioDAL";
import ExtratoMensalBuscarPoridStoreController from "./controllers/extrato/ExtratoMensalBuscarPorid";
import ExtratoMensalSalvarStoreController from "./controllers/extrato/ExtratoMensalSalvar";
import ExtratoMensalBuscarTodosStoreController from "./controllers/extrato/ExtratoMensalBuscarTodos";
import ExtratoMensalSalvarTodosStoreController from "./controllers/extrato/ExtratoMensalSalvarTodos";
import ExtratoMensalBuscarPorIdsStoreController from "./controllers/extrato/ExtratoMensalBuscarPorIds";
import ExtratoMensalDAL from "./dal/ExtratoMensalDAL";
import ExtratoRecorrenciaDAL from "./dal/ExtratoRecorrenciaDAL";
import ExtratoRecorrenciaBuscarPoridStoreController from "./controllers/extrato/ExtratoRecorrenciaBuscarPorid";
import ExtratoRecorrenciaBuscarPorStoreController from "./controllers/extrato/ExtratoRecorrenciaBuscarPor";
import ExtratoRecorrenciaBuscarTodosStoreController from "./controllers/extrato/ExtratoRecorrenciaBuscarTodos";
import ExtratoRecorrenciaSalvarTodosStoreController from "./controllers/extrato/ExtratoRecorrenciaSalvarTodos";
import ExtratoRecorrenciaExecutarTodosStoreController from "./controllers/extrato/ExtratoRecorrenciaExecutarTodos";
import conversorDatasMiddlware from "./middlewares/conversorDatasMiddlware";
import EventoSalvarTodosStoreController from "./controllers/evento/EventoSalvarTodos";
import EventoExcluirStoreController from "./controllers/evento/EventoExcluir";
import PublicadorEventoRabbitMQ from "./adapters/evento/PublicadorEventoRabbitMQ";
import { AtualizarFaturas, AtualizarSaldos, ConsultarPorEmail } from "core";

const corsOrigin = process.env.CORS_ORIGIN;

// Configuração Ambiente ----------------------------------------------
console.log(`🟢 ENVIRONMENT: ${process.env.NODE_ENV} 🟢`);

// Inicia Servidor Express ------------------------------------------
const app = express();

// Configuração Básica ----------------------------------------------
const corsOptions: CorsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT || 4000, () => {
  console.log(`🔥 Server is running on port ${process.env.PORT}`);
});

// ROTA PRINCIPAL - V1 ------------------------------------
const v1Router = express.Router();
app.use("/v1", v1Router, conversorDatasMiddlware);

// ROTAS AUTH ---------------------------------------------'
const authRouter = express.Router();
v1Router.use("/auth", authRouter);

// Error Handler ------------------------------------------
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error);
    return; // Se os headers já foram enviados, não tente enviar outra resposta
  }
  if (error instanceof Error) {
    if (error.message.startsWith("Dados Inválidos: ")) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error.message.startsWith("Não Autorizado: ")) {
      res.status(403).json({ message: error.message });
      return;
    }
    if (error.message.endsWith("usuário não encontrado")) {
      res.sendStatus(204);
      return;
    }
    if (error.message.endsWith("não encontrado")) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message, e: "express" });
    return;
  } else {
    res.status(500).json({ message: "Erro desconhecido", e: "express" });
    return;
  }
});

// ADAPTADORES --------------------------------------------

const conexaoPrisma = new PrismaClient();

const repositorioContaPrisma = new ContaRepositorioPgPrismaAdapter(conexaoPrisma);
const repositorioCartaoPrisma = new CartaoRepositorioPgPrismaAdapter(conexaoPrisma);
const repositorioUsuarioPrisma = new UsuarioRepositorioPgPrismaAdapter(conexaoPrisma);

const canalEventosRabbitMQ = new CanalEventosRabbitMQ();
const publicadorEvento = new PublicadorEventoRabbitMQ(canalEventosRabbitMQ);

// MIDDLEWARE --------------------------------------------

// FACADE ------------------------------------------------

// DAL
const categoriasDAL = new CategoriasDAL(conexaoPrisma);
const contaDAL = new ContaDAL(conexaoPrisma);
const cartaoDAL = new CartaoDAL(conexaoPrisma);
const usuarioDAL = new UsuarioDAL(conexaoPrisma);
const extratoMensalDAL = new ExtratoMensalDAL(conexaoPrisma);
const extratoRecorrenciaDAL = new ExtratoRecorrenciaDAL(conexaoPrisma);

// CASOS DE USO ------------------------------------------
const consultarPorEmail = new ConsultarPorEmail(repositorioUsuarioPrisma);
const atualizarFaturas = new AtualizarFaturas(repositorioCartaoPrisma);
const atualizarSaldos = new AtualizarSaldos(repositorioContaPrisma);

//  CONSUMERS
const consumidorEventoRabbitMq = new ConsumidorEventoRabbitMq(
  canalEventosRabbitMQ,
  atualizarFaturas,
  atualizarSaldos,
  repositorioUsuarioPrisma,
);
consumidorEventoRabbitMq.iniciar();

// DAL CONTROLLERS -------------------------------------------------------------

//--------------------------------------------------------
new CategoriaBuscarPoridStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaConsultarStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaExcluirStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaExisteStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaSalvarStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaSalvarAtribsStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));
new CategoriaSalvarTodasStoreController(v1Router, categoriasDAL, checkAuth(consultarPorEmail));

//--------------------------------------------------------
new CartaoConsultarStoreController(v1Router, cartaoDAL, checkAuth(consultarPorEmail));
new CartaoExisteStoreController(v1Router, cartaoDAL, checkAuth(consultarPorEmail));
new CartaoSalvarStoreController(v1Router, cartaoDAL, checkAuth(consultarPorEmail));
new CartaoSalvarAtribsStoreController(v1Router, cartaoDAL, checkAuth(consultarPorEmail));

//--------------------------------------------------------

new ContaConsultarStoreController(v1Router, contaDAL, checkAuth(consultarPorEmail));
new ContaSalvarStoreController(v1Router, contaDAL, checkAuth(consultarPorEmail));
new ContaSalvarAtribsStoreController(v1Router, contaDAL, checkAuth(consultarPorEmail));
new ContaBuscarPoridStoreController(v1Router, contaDAL, checkAuth(consultarPorEmail));

//------------------------------------------------------------------
new UsurioSalvarStoreController(v1Router, usuarioDAL, checkAuth(consultarPorEmail));
new UsuarioExisteStoreController(v1Router, usuarioDAL, checkAuth(consultarPorEmail));
new UsuarioSalvarStoreController(v1Router, usuarioDAL, checkAuth(consultarPorEmail));
//--------------------------------------------------------
new ExtratoMensalBuscarPoridStoreController(
  v1Router,
  extratoMensalDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoMensalBuscarPorIdsStoreController(
  v1Router,
  extratoMensalDAL,
  checkAuth(consultarPorEmail),
);

new ExtratoMensalBuscarTodosStoreController(
  v1Router,
  extratoMensalDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoMensalSalvarStoreController(v1Router, extratoMensalDAL, checkAuth(consultarPorEmail));
new ExtratoMensalSalvarTodosStoreController(
  v1Router,
  extratoMensalDAL,
  checkAuth(consultarPorEmail),
);
//--------------------------------------------------------

new ExtratoRecorrenciaBuscarPorStoreController(
  v1Router,
  extratoRecorrenciaDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoRecorrenciaBuscarTodosStoreController(
  v1Router,
  extratoRecorrenciaDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoRecorrenciaExecutarTodosStoreController(
  v1Router,
  extratoRecorrenciaDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoRecorrenciaSalvarTodosStoreController(
  v1Router,
  extratoRecorrenciaDAL,
  checkAuth(consultarPorEmail),
);
new ExtratoRecorrenciaBuscarPoridStoreController(
  v1Router,
  extratoRecorrenciaDAL,
  checkAuth(consultarPorEmail),
);
//--------------------------------------------------------

new EventoSalvarTodosStoreController(v1Router, publicadorEvento);
new EventoExcluirStoreController(v1Router);
// CONTROLLERS --------------------------------------------
new PingController(v1Router, checkAuth(consultarPorEmail));
