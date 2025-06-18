import Locale from '../i18n/Locale'
import Formatador from './Formatador'

export default class FormatadorData extends Formatador {
    private _data: Date
    private _separador: string = ''
    private _ignorarSeparador: boolean = false
    private _partes: any[] = []

    constructor(date: Date) {
        super()
        this._data = date
    }

    static hoje(): FormatadorData {
        return new FormatadorData(new Date())
    }

    static data(date: Date): FormatadorData {
        return new FormatadorData(date)
    }

    static mesesDoAno(locale?: Locale | string): string[] {
        const loc = FormatadorData.locale(locale)
        return Array(12)
            .fill(0)
            .map((_, i) => {
                const fmt = new FormatadorData(new Date(2000, i, 1))
                return fmt.mmm.formatar(loc)
            })
    }

    static diasDaSemana(locale?: Locale): string[] {
        const loc = FormatadorData.locale(locale)
        return Array(7)
            .fill(0)
            .map((_, i) => {
                const fmt = new FormatadorData(new Date(2000, 4, i))
                return fmt.wd.formatar(loc)
            })
    }

    separador(separador: string): FormatadorData {
        this._separador = separador
        return this
    }

    get d(): FormatadorData {
        return this._add({ day: 'numeric' })
    }

    get dd(): FormatadorData {
        return this._add({ day: '2-digit' })
    }

    get wd(): FormatadorData {
        return this._add((locale: Locale) => {
            const dia = this._formatar({ weekday: 'short' }, locale)
            return dia[0]!.toUpperCase() + dia.substring(1, 3)
        })
    }

    get wdd(): FormatadorData {
        return this._add((locale: Locale) => {
            const dia = this._formatar({ weekday: 'long' }, locale)
            return dia[0]!.toUpperCase() + dia.slice(1)
        })
    }

    get m(): FormatadorData {
        return this._add({ month: 'numeric' })
    }

    get mm(): FormatadorData {
        return this._add({ month: '2-digit' })
    }

    get mmm(): FormatadorData {
        return this._add((locale: Locale) => {
            const mes = this._formatar({ month: 'short' }, locale)
            return [mes[0]!.toUpperCase(), mes[1], mes[2]].join('')
        })
    }

    get mmmm(): FormatadorData {
        return this._add((locale: Locale) => {
            const mes = this._formatar({ month: 'long' }, locale)
            return mes[0]!.toUpperCase() + mes.slice(1)
        })
    }

    get yy(): FormatadorData {
        return this._add({ year: '2-digit' })
    }

    get yyyy(): FormatadorData {
        return this._add({ year: 'numeric' })
    }

    get h(): FormatadorData {
        return this._add(`${this._data.getHours()}`)
    }

    get hh(): FormatadorData {
        return this._add(`${this._data.getHours()}`.padStart(2, '0'))
    }

    get i(): FormatadorData {
        return this._add(`${this._data.getMinutes()}`)
    }

    get ii(): FormatadorData {
        return this._add(`${this._data.getMinutes()}`.padStart(2, '0'))
    }

    get s(): FormatadorData {
        return this._add(`${this._data.getSeconds()}`)
    }

    get ss(): FormatadorData {
        return this._add(`${this._data.getSeconds()}`.padStart(2, '0'))
    }

    get slash(): FormatadorData {
        return this.join('/')
    }
    get space(): FormatadorData {
        return this.join(' ')
    }
    get hyphen(): FormatadorData {
        return this.join('-')
    }

    get curta(): FormatadorData {
        return this._add((locale: Locale) => {
            return this._formatar(
                {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                },
                locale
            )
        })
    }

    get media(): FormatadorData {
        return this._add((locale: Locale) => {
            return this._formatar(
                {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                },
                locale
            )
        })
    }

    get longa(): FormatadorData {
        return this._add((locale: Locale) => {
            return this._formatar(
                {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                },
                locale
            )
        })
    }

    formatar(locale?: Locale | string): string {
        const loc = FormatadorData.locale(locale)
        const value = this._partes
            .map((p) => {
                if (typeof p === 'object') return this._formatar(p, loc)
                return typeof p === 'function' ? p(loc) : p
            })
            .join(this._ignorarSeparador ? '' : this._separador)
        this._partes.splice(0, this._partes.length)
        this._ignorarSeparador = false
        return value
    }

    join(separador: string): FormatadorData {
        this._ignorarSeparador = true
        return this._add(separador)
    }

    private _add(part: any): FormatadorData {
        this._partes.push(part)
        return this
    }

    private _formatar(config: Intl.DateTimeFormatOptions, locale: Locale | string): string {
        const lingua = FormatadorData.locale(locale).lingua
        return this._data.toLocaleDateString?.(lingua, config)
    }
}
