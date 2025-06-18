"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repositorios = void 0;
var ColecaoCartao_1 = require("./ColecaoCartao");
var ColecaoCategoria_1 = require("./ColecaoCategoria");
var ColecaoConta_1 = require("./ColecaoConta");
var ColecaoEvento_1 = require("./ColecaoEvento");
var ColecaoExtrato_1 = require("./ColecaoExtrato");
var ColecaoUsuario_1 = require("./ColecaoUsuario");
var Repositorios = /** @class */ (function () {
    function Repositorios(dados) {
        this.dados = dados;
    }
    Object.defineProperty(Repositorios.prototype, "cartao", {
        get: function () {
            return new ColecaoCartao_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repositorios.prototype, "categoria", {
        get: function () {
            return new ColecaoCategoria_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repositorios.prototype, "conta", {
        get: function () {
            return new ColecaoConta_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repositorios.prototype, "evento", {
        get: function () {
            return new ColecaoEvento_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repositorios.prototype, "extrato", {
        get: function () {
            return new ColecaoExtrato_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repositorios.prototype, "usuario", {
        get: function () {
            return new ColecaoUsuario_1.default(this.dados);
        },
        enumerable: false,
        configurable: true
    });
    return Repositorios;
}());
exports.Repositorios = Repositorios;
