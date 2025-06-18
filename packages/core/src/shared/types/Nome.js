"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
var Resultado_1 = require("../base/Resultado");
var VO_1 = require("../base/VO");
var Nome = /** @class */ (function (_super) {
    __extends(Nome, _super);
    function Nome(valor, cfg) {
        var _this = _super.call(this, valor, cfg) || this;
        _this.valor = valor;
        _this.cfg = cfg;
        return _this;
    }
    Nome.novo = function (valor, cfg) {
        var _a = cfg !== null && cfg !== void 0 ? cfg : {}, _b = _a.min, min = _b === void 0 ? 3 : _b, _c = _a.max, max = _c === void 0 ? 50 : _c, cls = _a.cls, atr = _a.atr;
        var maiorOuIgualQue = utils_1.Validador.maiorOuIgualQue, menorOuIgualQue = utils_1.Validador.menorOuIgualQue, naoNulo = utils_1.Validador.naoNulo;
        var erro = naoNulo(Nome.ERRO_NULO, valor) ||
            maiorOuIgualQue(Nome.ERRO_MENOR, valor.length, min) ||
            menorOuIgualQue(Nome.ERRO_MAIOR, valor.length, max);
        return erro
            ? Resultado_1.default.falha({ tipo: erro, valor: valor, cls: cls, atr: atr, detalhes: { min: min, max: max } })
            : Resultado_1.default.ok(new Nome(valor, cfg));
    };
    Nome.ERRO_NULO = 'NOME_NULO';
    Nome.ERRO_MENOR = 'NOME_MENOR';
    Nome.ERRO_MAIOR = 'NOME_MAIOR';
    return Nome;
}(VO_1.default));
exports.default = Nome;
