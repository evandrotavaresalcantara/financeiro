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
var Resultado = /** @class */ (function () {
    function Resultado(_instancia, _erros) {
        this._instancia = _instancia;
        this._erros = _erros;
    }
    Resultado.ok = function (instancia) {
        return new Resultado(instancia !== null && instancia !== void 0 ? instancia : null);
    };
    Resultado.nulo = function () {
        return new Resultado(null);
    };
    Resultado.falha = function (e) {
        var erro = typeof e === 'string' ? [{ tipo: e }] : e;
        return new Resultado(undefined, Array.isArray(erro) ? erro : [erro]);
    };
    Resultado.falhar = function (e) {
        var _a;
        return Resultado.falha({ tipo: (_a = e.message) !== null && _a !== void 0 ? _a : e });
    };
    Resultado.tentar = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, fn()];
                }
                catch (e) {
                    return [2 /*return*/, Resultado.falhar(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    Resultado.tentarSync = function (fn) {
        try {
            return Resultado.ok(fn());
        }
        catch (e) {
            return Resultado.falhar(e);
        }
    };
    Resultado.prototype.lancarErrorSeDeuErrado = function () {
        if (this.deuErrado) {
            throw this.erros;
        }
    };
    Object.defineProperty(Resultado.prototype, "instancia", {
        get: function () {
            return this._instancia;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resultado.prototype, "erros", {
        get: function () {
            var semErros = !this._erros || this._erros.length === 0;
            if (semErros && this._instancia === undefined) {
                return [{ tipo: 'RESULTADO_UNDEFINED' }];
            }
            return this._erros;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resultado.prototype, "deuCerto", {
        get: function () {
            return !this.erros;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resultado.prototype, "deuErrado", {
        get: function () {
            return !!this.erros;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resultado.prototype, "comoFalha", {
        get: function () {
            return Resultado.falha(this.erros);
        },
        enumerable: false,
        configurable: true
    });
    Resultado.combinar = function (resultados) {
        var erros = resultados.filter(function (r) { return r.deuErrado; });
        var instancias = resultados.map(function (r) { return r._instancia; });
        return erros.length > 0
            ? Resultado.falha(erros.flatMap(function (r) { return r.erros; }))
            : Resultado.ok(instancias);
    };
    Resultado.combinarAsync = function (resultados) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(resultados)];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, Resultado.combinar(rs)];
                }
            });
        });
    };
    return Resultado;
}());
exports.default = Resultado;
