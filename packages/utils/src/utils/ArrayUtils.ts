export type Predicate = (value: any, index: number, array: any[]) => any

export default class ArrayUtils {
    constructor(readonly valor: any[]) {}

    static itens(...items: any[]): ArrayUtils {
        const flatten = items.length === 1 && Array.isArray(items[0])
        const novosItens = flatten ? items.flat() : items
        return new ArrayUtils(novosItens)
    }

    get primeiro() {
        return this.valor[0]
    }

    get ultimo() {
        return this.valor[this.valor.length - 1]
    }

    get vazio() {
        return this.valor.length === 0
    }

    add(...items: any[]): ArrayUtils {
        const array = new ArrayUtils(items)
        return new ArrayUtils([...this.valor, ...array.valor])
    }

    validos(): ArrayUtils {
        const novoArray = this.valor.filter((e: any) => e != null && !Number.isNaN(e))
        return new ArrayUtils(novoArray)
    }

    filtrar(...fns: Predicate[]): ArrayUtils {
        const novoArray = this.valor.filter((value: any, index: number, array: any[]) => {
            return fns.every((fn) => fn(value, index, array)) ? value : null
        })
        return new ArrayUtils(novoArray)
    }

    encontrar(...fns: Predicate[]): any {
        return this.valor.find((value: any, index: number, array: any[]) => {
            return fns.every((fn) => fn(value, index, array)) ? value : null
        }) ?? null
    }
}
