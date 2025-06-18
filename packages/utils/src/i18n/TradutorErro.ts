import { fn } from '..'
import Erro from '../error/Erro'

export default class TradutorErro {
    constructor(readonly erros: Erro[]) {}

    agrupar = (outro: TradutorErro): TradutorErro => {
        return new TradutorErro(this.erros.concat(outro.erros))
    }

    traduzirTudo = (erros: Erro[]): string[] => {
        if (!Array.isArray(erros)) return this.traduzirTudo([erros])
        return erros.reduce((errosUnicos: string[], error: Erro) => {
            const translated = this.traduzir(error)
            const exists = errosUnicos.find((u: any) => u === translated)
            return exists ? errosUnicos : [...errosUnicos, translated]
        }, [])
    }

    traduzir = (erro: Erro): string => {
        const mesmoTipo = (err: Erro) => err.tipo?.toLowerCase() === erro.tipo?.toLowerCase()
        const tipoVazio = (err: Erro) => !err.tipo?.trim()
        const mesmoAtrib = (err: Erro) => err.atr?.toLowerCase() === erro.atr?.toLowerCase()
        const atribVazio = (err: Erro) => !err.atr?.trim()
        const mesmaCls = (err: Erro) => err.cls?.toLowerCase() === erro.cls?.toLowerCase()
        const clsVazia = (err: Erro) => !err.cls?.trim()

        const erros = fn.arr.itens(this.erros)
        const erroEncontrado = fn.arr
            .itens([
                erros.encontrar(mesmoAtrib, mesmoTipo, mesmaCls),
                erros.encontrar(mesmoAtrib, mesmoTipo, clsVazia),
                erros.encontrar(mesmoAtrib, tipoVazio, clsVazia),
                erros.encontrar(mesmoTipo, atribVazio, clsVazia),
            ])
            .validos().primeiro

        const erroCompleto = { ...erro, ...erroEncontrado }
        const msg = erroCompleto.msg?.(erroCompleto)
        return msg ?? this._msgAlternativa(erro)
    }

    private _msgAlternativa = (error: Erro): string => {
        if (typeof error === 'string') return error
        if (!error.tipo) return 'unknown error'
        const classe = error.cls ? `${error.cls}.` : ''
        const attribute = error.atr ? `${error.atr} - ` : ''
        const value = error.valor ? ` [${error.valor}]` : ''
        return `${classe}${attribute}${error.tipo}${value}`
    }
}
