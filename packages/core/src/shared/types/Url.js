"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
var Resultado_1 = require("../base/Resultado");
var Url = /** @class */ (function () {
    function Url(valor) {
        this.valor = valor;
    }
    Url.nova = function (valor) {
        var erro = utils_1.Validador.naoNulo(Url.ERRO_NULA, valor) || utils_1.Validador.url(Url.ERRO_INVALIDA, valor);
        return erro ? Resultado_1.default.falha({ tipo: erro, valor: valor }) : Resultado_1.default.ok(new Url(valor));
    };
    Url.ERRO_NULA = 'URL_NULA';
    Url.ERRO_INVALIDA = 'URL_INVALIDA';
    return Url;
}());
exports.default = Url;
