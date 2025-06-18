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
var Resultado_1 = require("../base/Resultado");
var VO_1 = require("../base/VO");
var AnoMesId = /** @class */ (function (_super) {
    __extends(AnoMesId, _super);
    function AnoMesId(valor, cfg) {
        var _this = _super.call(this, valor, cfg) || this;
        _this.valor = valor;
        _this.cfg = cfg;
        return _this;
    }
    AnoMesId.novo = function (data) {
        if (!data)
            return Resultado_1.default.falha('DATA_NULA');
        if (typeof data === 'string') {
            return Resultado_1.default.tentarSync(function () {
                var _a = data.split('-'), ano = _a[0], mes = _a[1];
                if (!ano || !mes)
                    throw 'DATA_INVALIDA';
                var dt = new Date(Number(ano), Number(mes) - 1, 2);
                return AnoMesId.novo(dt).instancia;
            });
        }
        var mes = "".concat(data.getMonth() + 1).padStart(2, '0');
        var id = new AnoMesId("".concat(data.getFullYear(), "-").concat(mes));
        return Resultado_1.default.ok(id);
    };
    return AnoMesId;
}(VO_1.default));
exports.default = AnoMesId;
