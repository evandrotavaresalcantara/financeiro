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
var Id = /** @class */ (function (_super) {
    __extends(Id, _super);
    function Id(valor, cfg) {
        var _this = _super.call(this, valor, cfg) || this;
        _this.valor = valor;
        _this.cfg = cfg;
        return _this;
    }
    Id.novo = function (valor, cfg) {
        var _a = cfg !== null && cfg !== void 0 ? cfg : {}, cls = _a.cls, atr = _a.atr;
        var erro = utils_1.Validador.naoNuloOuVazio(Id.ERRO_VAZIO, valor === null || valor === void 0 ? void 0 : valor.trim());
        return erro
            ? Resultado_1.default.falha({ tipo: erro, valor: valor, cls: cls, atr: atr })
            : Resultado_1.default.ok(new Id(valor.trim(), cfg));
    };
    Id.prototype.igual = function (id) {
        return this.valor === id.valor;
    };
    Id.prototype.diferente = function (id) {
        return this.valor !== id.valor;
    };
    Id.ERRO_VAZIO = 'ID_VAZIO';
    return Id;
}(VO_1.default));
exports.default = Id;
