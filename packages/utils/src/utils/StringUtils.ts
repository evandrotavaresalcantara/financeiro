export default class StringUtils {
    static ordenar(a: string, b: string): number {
        return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
    }

    static inserirEm(s: string, indice: number, trecho: string) {
        return s.substring(0, indice) + trecho + s.substring(indice)
    }

    static iniciais(nome?: string | null): string {
        const nomeSeparado = nome?.split(' ') ?? []
        const primeirasLetras = nomeSeparado.map((nome) => nome[0])
        return `${primeirasLetras[0] ?? nome?.[0] ?? 'A'}${
            primeirasLetras[1] ?? nome?.[1] ?? 'L'
        }`.toUpperCase()
    }
}
