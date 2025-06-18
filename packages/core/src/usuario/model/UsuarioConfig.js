"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoVisualizacao_1 = require("../../shared/types/TipoVisualizacao");
var Resultado_1 = require("../../shared/base/Resultado");
var UsuarioConfig = /** @class */ (function () {
    function UsuarioConfig(esconderSumarios, esconderValores, menuMini, visualizacao, exibirFiltros, filtros, props) {
        this.esconderSumarios = esconderSumarios;
        this.esconderValores = esconderValores;
        this.menuMini = menuMini;
        this.visualizacao = visualizacao;
        this.exibirFiltros = exibirFiltros;
        this.filtros = filtros;
        this.props = props;
    }
    UsuarioConfig.vazio = function () {
        return UsuarioConfig.novo({}).instancia;
    };
    UsuarioConfig.novo = function (props) {
        var _a, _b, _c, _d, _e, _f;
        var propsCompleto = {
            esconderSumarios: (_a = props === null || props === void 0 ? void 0 : props.esconderSumarios) !== null && _a !== void 0 ? _a : false,
            esconderValores: (_b = props === null || props === void 0 ? void 0 : props.esconderValores) !== null && _b !== void 0 ? _b : false,
            menuMini: (_c = props === null || props === void 0 ? void 0 : props.menuMini) !== null && _c !== void 0 ? _c : false,
            visualizacao: (_d = props === null || props === void 0 ? void 0 : props.visualizacao) !== null && _d !== void 0 ? _d : TipoVisualizacao_1.TipoVisualizacao.LISTA,
            exibirFiltros: (_e = props === null || props === void 0 ? void 0 : props.exibirFiltros) !== null && _e !== void 0 ? _e : false,
            filtros: (_f = props === null || props === void 0 ? void 0 : props.filtros) !== null && _f !== void 0 ? _f : [],
        };
        return Resultado_1.default.ok(new UsuarioConfig(propsCompleto.esconderSumarios, propsCompleto.esconderValores, propsCompleto.menuMini, propsCompleto.visualizacao, propsCompleto.exibirFiltros, propsCompleto.filtros, propsCompleto));
    };
    return UsuarioConfig;
}());
exports.default = UsuarioConfig;
