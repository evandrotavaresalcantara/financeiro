import Locale from './Locale'
import Erro from '../error/Erro'

class LocaleHub {
    private static _locales: Locale[] = []
    private static _locale: Locale | null

    static get locale() {
        return this._locale ?? LocaleHub._locales[0]!
    }

    static get lingua() {
        return LocaleHub.locale.lingua
    }

    static get moeda() {
        return LocaleHub.locale.moeda
    }

    static get erros() {
        return LocaleHub.locale.erros
    }

    static selecionar(lingua: string): Locale {
        const locale = LocaleHub.obter(lingua)
        locale && (LocaleHub._locale = locale)
        return this.locale
    }

    static addLocales(newLocales: Locale[]): LocaleHub {
        const others = LocaleHub._locales.filter((locale) => {
            return !newLocales.find((newLocale) => {
                return newLocale.lingua === locale.lingua
            })
        })
        LocaleHub._locales = [...others, ...newLocales]
        return LocaleHub
    }

    static addErros(lingua: string, erros: Erro[]): LocaleHub {
        LocaleHub.obter(lingua)?.erros.push(...erros)
        return LocaleHub
    }

    static obter(locale: Locale | string): Locale | null {
        const linguaEscolhida = typeof locale === 'string' ? locale : locale.lingua
        return (
            LocaleHub._locales.find((locale: Locale) => {
                return locale.lingua?.toLowerCase() === linguaEscolhida?.toLowerCase()
            }) ?? null
        )
    }
}

export default LocaleHub
