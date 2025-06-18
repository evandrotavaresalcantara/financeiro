import { fn } from '..'
import Locale from '../i18n/Locale'
import Formatador from './Formatador'

export default class FormatadorMoeda extends Formatador {
    constructor(private _num: number) {
        super()
    }

    static num(num: number): FormatadorMoeda {
        return new FormatadorMoeda(num)
    }

    static simbolo(locale?: Locale | string): string {
        return FormatadorMoeda.num(0)
            .formatar(locale)
            .replaceAll(/[\d.,]/g, '')
            .trim()
    }

    static desformatar(moeda: string): number {
        const somenteNums = moeda.replace(/[^0-9]+/g, '')
        const numero = fn.str.inserirEm(somenteNums, somenteNums.length - 2, '.')
        const valor = Number(numero)
        return Number.isNaN(valor) ? 0 : valor
    }

    somenteValor(locale?: Locale | string): string {
        return this.formatar(locale).replace(FormatadorMoeda.simbolo(locale), '').trim()
    }

    formatar(locale?: Locale | string): string {
        const loc = FormatadorMoeda.locale(locale)
        return new Intl.NumberFormat(loc?.lingua, {
            style: 'currency',
            currency: loc.moeda,
        })
            .format(this._num)
            .replaceAll(/\s/g, ' ')
    }
}
