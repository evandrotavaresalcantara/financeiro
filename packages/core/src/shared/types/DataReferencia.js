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
var DataReferencia = /** @class */ (function (_super) {
    __extends(DataReferencia, _super);
    function DataReferencia(valor) {
        var _this = _super.call(this, valor, {}) || this;
        _this.valor = valor;
        return _this;
    }
    Object.defineProperty(DataReferencia, "maiorData", {
        get: function () {
            return utils_1.fn.dt.adicionarAnos(new Date(), 2);
        },
        enumerable: false,
        configurable: true
    });
    DataReferencia.nova = function (valor) {
        var dt = valor !== null && valor !== void 0 ? valor : new Date();
        var ERRO_MENOR = DataReferencia.ERRO_MENOR, ERRO_MAIOR = DataReferencia.ERRO_MAIOR, menorData = DataReferencia.menorData, maiorData = DataReferencia.maiorData;
        if (dt < menorData && !utils_1.fn.dt.mesmoMes(dt, menorData)) {
            return Resultado_1.default.falha({ tipo: ERRO_MENOR, detalhes: { maiorData: maiorData, data: dt } });
        }
        if (dt > maiorData && !utils_1.fn.dt.mesmoMes(dt, maiorData)) {
            return Resultado_1.default.falha({ tipo: ERRO_MAIOR, detalhes: { maiorData: maiorData, data: dt } });
        }
        return Resultado_1.default.ok(new DataReferencia(dt));
    };
    DataReferencia.prototype.permiteProximoMes = function () {
        return utils_1.fn.dt.adicionarMeses(this.valor, 1) < DataReferencia.maiorData;
    };
    DataReferencia.prototype.proximoMes = function () {
        if (!this.permiteProximoMes())
            return this;
        return DataReferencia.nova(utils_1.fn.dt.adicionarMeses(this.valor, 1)).instancia;
    };
    DataReferencia.prototype.permiteMesAnterior = function () {
        return utils_1.fn.dt.subtrairMeses(this.valor, 1) > DataReferencia.menorData;
    };
    DataReferencia.prototype.mesAnterior = function () {
        if (!this.permiteMesAnterior())
            return this;
        return DataReferencia.nova(utils_1.fn.dt.subtrairMeses(this.valor, 1)).instancia;
    };
    DataReferencia.ERRO_MENOR = 'DATA_DEF_MENOR';
    DataReferencia.ERRO_MAIOR = 'DATA_DEF_MAIOR';
    DataReferencia.menorData = new Date('2010/1/1');
    return DataReferencia;
}(VO_1.default));
exports.default = DataReferencia;
