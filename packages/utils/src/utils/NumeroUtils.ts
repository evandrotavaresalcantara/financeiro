export default class NumeroUtils {
    static duasCasasDecimais(numero: number) {
        return Math.round(numero * 100) / 100
    }

    static ehNumero(numero: any): boolean {
        if (numero === null) return false
        if (isNaN(numero)) return false
        if (typeof numero === 'number') return true
        if (typeof numero === 'string') return !isNaN(parseFloat(numero))
        return false
    }

    static min(...numeros: number[]) {
        return Math.min(...numeros.filter(NumeroUtils.ehNumero).map((n) => +n))
    }

    static max(...numeros: number[]) {
        return Math.max(...numeros.filter(NumeroUtils.ehNumero).map((n) => +n))
    }

    static percentual(n1: number, n2: number, casasDecimais: number = 0) {
        if (!n2) return Infinity
        const p = (n1 / n2) * 100
        const fator = Math.pow(10, casasDecimais)
        return Math.round(p * fator) / fator
    }
}
