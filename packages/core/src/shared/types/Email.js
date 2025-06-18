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
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email(valor, cfg) {
        var _this = _super.call(this, valor, cfg) || this;
        _this.valor = valor;
        _this.cfg = cfg;
        return _this;
    }
    Email.novo = function (valor, cfg) {
        var _a = cfg !== null && cfg !== void 0 ? cfg : {}, cls = _a.cls, atr = _a.atr;
        var erro = utils_1.Validador.naoNulo(Email.ERRO_NULO, valor) ||
            utils_1.Validador.email(Email.ERRO_INVALIDO, valor);
        return erro
            ? Resultado_1.default.falha({ tipo: erro, valor: valor, cls: cls, atr: atr })
            : Resultado_1.default.ok(new Email(valor));
    };
    Email.ERRO_NULO = 'EMAIL_NULO';
    Email.ERRO_INVALIDO = 'EMAIL_INVALIDO';
    return Email;
}(VO_1.default));
exports.default = Email;
