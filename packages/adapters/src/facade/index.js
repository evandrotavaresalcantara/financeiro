"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreFacade = void 0;
var AutenticacaoFacade_1 = require("./AutenticacaoFacade");
var CartaoFacade_1 = require("./CartaoFacade");
var CategoriaFacade_1 = require("./CategoriaFacade");
var ColecaoCartao_1 = require("../db/ColecaoCartao");
var ColecaoCategoria_1 = require("../db/ColecaoCategoria");
var ColecaoConta_1 = require("../db/ColecaoConta");
var ColecaoEvento_1 = require("../db/ColecaoEvento");
var ColecaoExtrato_1 = require("../db/ColecaoExtrato");
var ColecaoUsuario_1 = require("../db/ColecaoUsuario");
var ContaFacade_1 = require("./ContaFacade");
var ExtratoFacade_1 = require("./ExtratoFacade");
var UsuarioFacade_1 = require("./UsuarioFacade");
var CoreFacade = /** @class */ (function () {
    function CoreFacade(_dados, _autenticacao) {
        this._dados = _dados;
        this._autenticacao = _autenticacao;
    }
    Object.defineProperty(CoreFacade.prototype, "autenticacao", {
        get: function () {
            return new AutenticacaoFacade_1.default(this._autenticacao, new ColecaoUsuario_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreFacade.prototype, "cartao", {
        get: function () {
            return new CartaoFacade_1.default(new ColecaoCartao_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreFacade.prototype, "categoria", {
        get: function () {
            return new CategoriaFacade_1.default(new ColecaoCategoria_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreFacade.prototype, "conta", {
        get: function () {
            return new ContaFacade_1.default(new ColecaoConta_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreFacade.prototype, "extrato", {
        get: function () {
            return new ExtratoFacade_1.default(new ColecaoExtrato_1.default(this._dados), new ColecaoEvento_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreFacade.prototype, "usuario", {
        get: function () {
            return new UsuarioFacade_1.default(new ColecaoUsuario_1.default(this._dados));
        },
        enumerable: false,
        configurable: true
    });
    return CoreFacade;
}());
exports.CoreFacade = CoreFacade;
