"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var utils_1 = require("utils");
var ColecaoExtrato = /** @class */ (function () {
    function ColecaoExtrato(provedor) {
        this.provedor = provedor;
    }
    ColecaoExtrato.prototype.salvar = function (usuario, extrato) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var doc;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    doc = this._extratoParaDoc(extrato);
                                    return [4 /*yield*/, this.provedor.salvar(this._caminho(usuario), doc)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.salvarTodos = function (usuario, extratos) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var caminhos, docs;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    caminhos = extratos.map(function () { return _this._caminho(usuario); });
                                    docs = extratos.map(function (extrato) { return _this._extratoParaDoc(extrato); });
                                    return [4 /*yield*/, this.provedor.salvarTodos(caminhos, docs)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.salvarRecorrencia = function (usuario, extratos, recorrencia) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var caminhos, entidades;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    caminhos = [];
                                    entidades = [];
                                    caminhos.push(this._caminhoRec(usuario));
                                    entidades.push(this._recorrenciaParaDoc(recorrencia));
                                    extratos.forEach(function (extrato) {
                                        caminhos.push(_this._caminho(usuario));
                                        entidades.push(_this._extratoParaDoc(extrato));
                                    });
                                    return [4 /*yield*/, this.provedor.salvarTodos(caminhos, entidades)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultarPorId = function (usuario, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var doc;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarPorId(this._caminho(usuario), id.valor)];
                                case 1:
                                    doc = _a.sent();
                                    return [2 /*return*/, doc ? core_1.Extrato.novo(doc) : core_1.Resultado.nulo()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultarPorIds = function (usuario, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var valores, docs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    valores = ids.map(function (id) { return id.valor; });
                                    return [4 /*yield*/, this.provedor.buscarPorIds(this._caminho(usuario), valores)];
                                case 1:
                                    docs = _a.sent();
                                    return [2 /*return*/, core_1.Extrato.novos(docs !== null && docs !== void 0 ? docs : [])];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultar = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var docs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarTodos(this._caminho(usuario))];
                                case 1:
                                    docs = _a.sent();
                                    return [2 /*return*/, core_1.Extrato.novos(docs !== null && docs !== void 0 ? docs : [])];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultarRecorrencias = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var docs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarTodos(this._caminhoRec(usuario))];
                                case 1:
                                    docs = _a.sent();
                                    return [2 /*return*/, core_1.Recorrencia.novas(docs.filter(function (doc) { return !doc.deleteAt; }))];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultarRecorrenciasPorMes = function (usuario, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var ultimoDiaDoMes, docs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ultimoDiaDoMes = utils_1.fn.dt.ultimoDiaDoMes(data);
                                    return [4 /*yield*/, this.provedor.buscarPor(this._caminhoRec(usuario), [
                                            { attribute: 'transacao.data', op: '<=', value: ultimoDiaDoMes },
                                        ])];
                                case 1:
                                    docs = _a.sent();
                                    return [2 /*return*/, core_1.Recorrencia.novas(docs.filter(function (doc) { return !doc.deleteAt; }))];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.consultarRecorrenciaPorId = function (usuario, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var doc;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarPorId(this._caminhoRec(usuario), id)];
                                case 1:
                                    doc = _a.sent();
                                    if (!doc || doc.deleteAt)
                                        return [2 /*return*/, core_1.Resultado.nulo()];
                                    return [2 /*return*/, core_1.Recorrencia.nova(doc)];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype.excluirRecorrencia = function (usuario, extratos, recorrencia) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var comandos;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    comandos = [];
                                    comandos.push({
                                        caminho: this._caminhoRec(usuario),
                                        entidade: this._recorrenciaParaDoc(recorrencia),
                                        tipo: 'excluir',
                                    });
                                    extratos.forEach(function (extrato) {
                                        comandos.push({
                                            caminho: _this._caminho(usuario),
                                            entidade: _this._extratoParaDoc(extrato),
                                            tipo: 'salvar',
                                        });
                                    });
                                    return [4 /*yield*/, this.provedor.executarTodos(comandos)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoExtrato.prototype._caminho = function (usuario) {
        return "extratos/".concat(usuario.email.valor, "/mensais");
    };
    ColecaoExtrato.prototype._caminhoRec = function (usuario) {
        return "extratos/".concat(usuario.email.valor, "/recorrencias");
    };
    ColecaoExtrato.prototype._extratoParaDoc = function (extrato) {
        var props = extrato.props;
        var transacoes = props.transacoes
            .map(function (t) {
            var transacao = __assign({}, t);
            delete transacao.agruparPor;
            delete transacao.virtual;
            delete transacao.emMemoria;
            return transacao;
        })
            .sort(core_1.Transacao.sort);
        return {
            id: props.id,
            data: props.data,
            sumario: props.sumario,
            transacoes: transacoes,
            updatedAt: new Date(),
        };
    };
    ColecaoExtrato.prototype._recorrenciaParaDoc = function (recorrencia) {
        var transacao = recorrencia.props.transacao;
        transacao === null || transacao === void 0 ? true : delete transacao.agruparPor;
        transacao === null || transacao === void 0 ? true : delete transacao.virtual;
        transacao === null || transacao === void 0 ? true : delete transacao.emMemoria;
        return __assign(__assign({}, recorrencia.props), { transacao: transacao, updatedAt: new Date(), deletedAt: null });
    };
    return ColecaoExtrato;
}());
exports.default = ColecaoExtrato;
