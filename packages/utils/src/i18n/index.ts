import Locale from './Locale'
import LocaleHub from './LocaleHub'
import Tradutor from './Tradutor'

LocaleHub.addLocales([
    { lingua: 'pt-BR', moeda: 'BRL', erros: [] },
    { lingua: 'en-US', moeda: 'USD', erros: [] },
])

export type { Locale }
export { Tradutor, LocaleHub }
