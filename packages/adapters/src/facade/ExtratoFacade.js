"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("core");
var ExtratoFacade = /** @class */ (function () {
    function ExtratoFacade(repo, publicadorEvento) {
        this.repo = repo;
        this.publicadorEvento = publicadorEvento;
    }
    ExtratoFacade.prototype.salvarTransacao = function (usuario, extrato, transacao) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, criarExtrato, criarTransacao, consultar, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        criarExtrato = core_1.Extrato.novo(extrato);
                        if (criarExtrato.deuErrado)
                            criarExtrato.lancarErrorSeDeuErrado();
                        console.log(criarExtrato.instancia);
                        criarTransacao = core_1.Transacao.nova(transacao);
                        if (criarTransacao.deuErrado)
                            criarTransacao.lancarErrorSeDeuErrado();
                        console.log(criarTransacao.instancia);
                        consultar = new core_1.ConsultarExtrato(this.repo);
                        casoDeUso = new core_1.SalvarTransacao(this.repo, consultar, this.publicadorEvento);
                        return [4 /*yield*/, casoDeUso.executar({ extrato: criarExtrato.instancia, transacao: criarTransacao.instancia }, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtratoFacade.prototype.salvarRecorrencia = function (usuario, recorrencia) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, criarRecorrencia, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        criarRecorrencia = core_1.Recorrencia.nova(recorrencia);
                        if (criarRecorrencia.deuErrado)
                            criarRecorrencia.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.SalvarRecorrencia(this.repo, this.publicadorEvento);
                        return [4 /*yield*/, casoDeUso.executar(criarRecorrencia.instancia, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtratoFacade.prototype.consultarTodos = function (usuario, datas) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ConsultarExtratos(this.repo);
                        return [4 /*yield*/, casoDeUso.executar(datas, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia.map(function (e) { return e.props; })];
                }
            });
        });
    };
    ExtratoFacade.prototype.consultarRecorrencia = function (usuario, id) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ConsultarRecorrencia(this.repo);
                        return [4 /*yield*/, casoDeUso.executar(id, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia];
                }
            });
        });
    };
    ExtratoFacade.prototype.consultarRecorrencias = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ConsultarRecorrencias(this.repo);
                        return [4 /*yield*/, casoDeUso.executar(criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia];
                }
            });
        });
    };
    ExtratoFacade.prototype.consultarFiltrosExtrato = function (cartoes, categorias, contas) {
        return __awaiter(this, void 0, void 0, function () {
            var criarCartoes, criarCategorias, criarContas, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarCartoes = core_1.Cartao.novos(cartoes);
                        if (criarCartoes.deuErrado)
                            criarCartoes.lancarErrorSeDeuErrado();
                        criarCategorias = core_1.Categoria.novas(categorias);
                        if (criarCategorias.deuErrado)
                            criarCategorias.lancarErrorSeDeuErrado();
                        criarContas = core_1.Conta.novas(contas);
                        if (criarContas.deuErrado)
                            criarContas.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ConsultarFiltrosExtrato();
                        return [4 /*yield*/, casoDeUso.executar({
                                cartoes: criarCartoes.instancia,
                                categorias: criarCategorias.instancia,
                                contas: criarContas.instancia,
                            })];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia];
                }
            });
        });
    };
    ExtratoFacade.prototype.excluirTransacao = function (usuario, extrato, transacao) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, criarExtrato, criarTransacao, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        criarExtrato = core_1.Extrato.novo(extrato);
                        if (criarExtrato.deuErrado)
                            criarExtrato.lancarErrorSeDeuErrado();
                        criarTransacao = core_1.Transacao.nova(transacao);
                        if (criarTransacao.deuErrado)
                            criarTransacao.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ExcluirTransacao(this.repo, this.publicadorEvento);
                        return [4 /*yield*/, casoDeUso.executar({ extrato: criarExtrato.instancia, transacao: criarTransacao.instancia }, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtratoFacade.prototype.excluirRecorrencia = function (usuario, recorrenciaId) {
        return __awaiter(this, void 0, void 0, function () {
            var criarUsuario, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarUsuario = core_1.Usuario.novo(usuario);
                        if (criarUsuario.deuErrado)
                            criarUsuario.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.ExcluirRecorrencia(this.repo, this.publicadorEvento);
                        return [4 /*yield*/, casoDeUso.executar(recorrenciaId, criarUsuario.instancia)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtratoFacade.prototype.filtarExtrato = function (extrato, filtros) {
        return __awaiter(this, void 0, void 0, function () {
            var criarExtrato, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarExtrato = core_1.Extrato.novo(extrato);
                        if (criarExtrato.deuErrado)
                            criarExtrato.lancarErrorSeDeuErrado();
                        casoDeUso = new core_1.FiltrarExtrato();
                        return [4 /*yield*/, casoDeUso.executar({ extrato: criarExtrato.instancia, filtros: filtros })];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia.props];
                }
            });
        });
    };
    ExtratoFacade.prototype.relatorioEvolucaoRecorrencia = function (extratos, recorrenciaId) {
        return __awaiter(this, void 0, void 0, function () {
            var criarExtratos, dto, casoDeUso, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criarExtratos = core_1.Extrato.novos(extratos);
                        if (criarExtratos.deuErrado)
                            criarExtratos.lancarErrorSeDeuErrado();
                        dto = { extratos: criarExtratos.instancia, recorrenciaId: recorrenciaId };
                        casoDeUso = new core_1.RelatorioEvolucaoRecorrencia();
                        return [4 /*yield*/, casoDeUso.executar(dto)];
                    case 1:
                        resultado = _a.sent();
                        if (resultado.deuErrado)
                            resultado.lancarErrorSeDeuErrado();
                        return [2 /*return*/, resultado.instancia.map(function (t) { return t.props; })];
                }
            });
        });
    };
    return ExtratoFacade;
}());
exports.default = ExtratoFacade;
