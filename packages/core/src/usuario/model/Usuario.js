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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
var Email_1 = require("../../shared/types/Email");
var Entidade_1 = require("../../shared/base/Entidade");
var Id_1 = require("../../shared/types/Id");
var Nome_1 = require("../../shared/types/Nome");
var Resultado_1 = require("../../shared/base/Resultado");
var Url_1 = require("../../shared/types/Url");
var UsuarioConfig_1 = require("./UsuarioConfig");
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario(id, nome, email, provider, imagemUrl, config, props) {
        var _this = _super.call(this, id) || this;
        _this.id = id;
        _this.nome = nome;
        _this.email = email;
        _this.provider = provider;
        _this.imagemUrl = imagemUrl;
        _this.config = config;
        _this.props = props;
        return _this;
    }
    Usuario.novos = function (props) {
        return Resultado_1.default.combinar(props.map(Usuario.novo));
    };
    Usuario.novo = function (props) {
        var _a, _b, _c, _d, _e;
        var id = Id_1.default.novo((_a = props.id) !== null && _a !== void 0 ? _a : utils_1.IdUnico.gerar());
        var nome = Nome_1.default.novo((_b = props.nome) !== null && _b !== void 0 ? _b : (_c = props.email) === null || _c === void 0 ? void 0 : _c.split('@')[0]);
        var email = Email_1.default.novo(props.email);
        var imagemUrl = props.imagemUrl ? Url_1.default.nova(props.imagemUrl) : Resultado_1.default.nulo();
        var config = UsuarioConfig_1.default.novo((_d = props.config) !== null && _d !== void 0 ? _d : {});
        var criarAtributos = Resultado_1.default.combinar([id, nome, email, imagemUrl, config]);
        if (criarAtributos.deuErrado)
            return criarAtributos.comoFalha;
        return Resultado_1.default.ok(new Usuario(id.instancia, nome.instancia, email.instancia, (_e = props.provider) !== null && _e !== void 0 ? _e : null, imagemUrl.instancia, config.instancia, utils_1.fn.obj.manterAtribs(__assign(__assign({}, props), { config: config.instancia.props }), [
            'id',
            'nome',
            'email',
            'provider',
            'imagemUrl',
            'config',
        ])));
    };
    return Usuario;
}(Entidade_1.default));
exports.default = Usuario;
