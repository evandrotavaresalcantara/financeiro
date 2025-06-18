import { LocaleHub } from '..'
import Locale from '../i18n/Locale'

export default abstract class Formatador {
    get valor(): string {
        return this.formatar()
    }

    abstract formatar(locale?: Locale): string

    protected static locale(locale?: Locale | string): Locale {
        if (locale) {
            const encontrada = LocaleHub.obter(locale)
            if (encontrada) return encontrada
        }
        return LocaleHub.locale
    }
}
