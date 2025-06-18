"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entidade = /** @class */ (function () {
    function Entidade(id) {
        this.id = id;
    }
    Entidade.prototype.igual = function (entidade) {
        return this.id.igual(entidade.id);
    };
    Entidade.prototype.diferente = function (entidade) {
        return this.id.diferente(entidade.id);
    };
    return Entidade;
}());
exports.default = Entidade;
