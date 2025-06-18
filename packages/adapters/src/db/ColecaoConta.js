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
var ColecaoConta = /** @class */ (function () {
    function ColecaoConta(provedor) {
        this.provedor = provedor;
    }
    ColecaoConta.prototype.salvar = function (usuario, conta) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var docAtual, doc;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarPorId(this._caminho(usuario), conta.id.valor)];
                                case 1:
                                    docAtual = _b.sent();
                                    doc = __assign(__assign({}, conta.props), { createdAt: (_a = docAtual === null || docAtual === void 0 ? void 0 : docAtual.createdAt) !== null && _a !== void 0 ? _a : new Date(), updatedAt: new Date(), deleteAt: null });
                                    return [4 /*yield*/, this.provedor.salvar(this._caminho(usuario), doc)];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoConta.prototype.salvarTodas = function (usuario, contas) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(contas.map(function (c) { return _this.salvar(usuario, c); }))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoConta.prototype.excluir = function (usuario, contaId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.salvarAtribs(this._caminho(usuario), contaId.valor, {
                                        deletedAt: new Date(),
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, core_1.Resultado.ok()];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoConta.prototype.consultar = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, core_1.Resultado.tentar(function () { return __awaiter(_this, void 0, void 0, function () {
                        var docs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.provedor.buscarTodos(this._caminho(usuario), 'createdAt')];
                                case 1:
                                    docs = _a.sent();
                                    return [2 /*return*/, core_1.Conta.novas(docs.filter(function (doc) { return !doc.deletedAt; }))];
                            }
                        });
                    }); })];
            });
        });
    };
    ColecaoConta.prototype._caminho = function (usuario) {
        return "contas/".concat(usuario.email.valor, "/itens");
    };
    return ColecaoConta;
}());
exports.default = ColecaoConta;
