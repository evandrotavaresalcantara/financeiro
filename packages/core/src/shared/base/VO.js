"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
var VO = /** @class */ (function () {
    function VO(valor, cfg) {
        this.valor = valor;
        this.cfg = cfg;
    }
    VO.prototype.igual = function (outro) {
        return utils_1.fn.obj.iguais(this.valor, outro.valor);
    };
    VO.prototype.diferente = function (outro) {
        return !this.igual(outro);
    };
    return VO;
}());
exports.default = VO;
