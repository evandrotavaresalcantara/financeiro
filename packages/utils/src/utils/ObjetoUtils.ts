export default class ObjetoUtils {
    static iguais(a: any, b: any): boolean {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
        if (typeof a !== 'object' || typeof b !== 'object') return false

        const keys = Object.keys(a)
        if (keys.length !== Object.keys(b).length) return false
        return keys.every((k) => ObjetoUtils.iguais(a[k], b[k]))
    }

    static undefinedParaNull(obj: any): any {
        return Object.keys(obj).reduce((objetoCompleto: any, prop: string) => {
            let value = obj[prop]
            if (ObjetoUtils.ehObjeto(value)) {
                value = ObjetoUtils.undefinedParaNull(value)
            }
            return { ...objetoCompleto, [prop]: value ?? null }
        }, {})
    }

    static ehObjeto(value?: any): boolean {
        const tipoObjeto = typeof value === 'object'
        const tipoObjetoNaoNulo = value != null && tipoObjeto
        return tipoObjetoNaoNulo && value.constructor === Object
    }

    static manterAtribs(obj: any, atribs: string[]): any {
        if (!obj || !atribs || atribs.length === 0) return {}
        return atribs.reduce((novoObj: any, atrib: string) => {
            if (obj[atrib] !== undefined) novoObj[atrib] = obj[atrib]
            return novoObj
        }, {})
    }

    static removerAtribs(obj: any, attrs: string[]): any {
        if (!obj || !attrs || attrs.length === 0) return obj
        const attrsToKeep = Object.keys(obj as any).filter((attr) => !attrs.includes(attr))
        return ObjetoUtils.manterAtribs(obj, attrsToKeep)
    }

    static obterValor(obj: any, caminho: string): any {
        const clone = { ...obj }
        const atributos = caminho.split(/[\[\].]+/)
        const ultimoAtrib = atributos.pop()
        const ultimoObj = atributos.reduce((acc, key) => acc[key], clone)
        return ultimoObj[ultimoAtrib!]
    }

    static alterarValor(obj: any, caminho: string, valor: any): any {
        const clone = { ...obj }
        const atributos = caminho.split(/[\[\].]+/)
        const ultimoAtrib = atributos.pop()
        const ultimoObj = atributos.reduce((acc, key) => {
            if (acc[key] === undefined) {
                acc[key] = {}
            }
            return acc[key]
        }, clone)
        ultimoObj[ultimoAtrib!] = valor
        return clone
    }
}
