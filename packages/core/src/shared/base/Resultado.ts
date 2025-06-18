import { Erro } from 'utils'

export default class Resultado<T> {
    constructor(
        private readonly _instancia?: T | null,
        private _erros?: Erro[]
    ) {}

    static ok<T>(instancia?: T): Resultado<T> {
        return new Resultado<T>(instancia ?? null)
    }

    static nulo(): Resultado<null> {
        return new Resultado<null>(null)
    }

    static falha<T>(e: string | Erro | Erro[]): Resultado<T> {
        const erro = typeof e === 'string' ? [{ tipo: e } as Erro] : e
        return new Resultado<T>(undefined, Array.isArray(erro) ? erro : [erro])
    }

    static falhar<T>(e: any): Resultado<T> {
        return Resultado.falha<T>({ tipo: e.message ?? e })
    }

    static async tentar<T>(fn: () => Promise<Resultado<T>>): Promise<Resultado<T>> {
        try {
            return fn()
        } catch (e: any) {
            return Resultado.falhar<T>(e)
        }
    }

    static tentarSync<T>(fn: () => T): Resultado<T> {
        try {
            return Resultado.ok<T>(fn())
        } catch (e: any) {
            return Resultado.falhar<T>(e)
        }
    }

    lancarErrorSeDeuErrado(): never | void {
        if (this.deuErrado) {
            throw this.erros
        }
    }

    get instancia(): T {
        return this._instancia!
    }

    get erros(): Erro[] | undefined {
        const semErros = !this._erros || this._erros.length === 0
        if (semErros && this._instancia === undefined) {
            return [{ tipo: 'RESULTADO_UNDEFINED' }]
        }
        return this._erros
    }

    get deuCerto(): boolean {
        return !this.erros
    }

    get deuErrado(): boolean {
        return !!this.erros
    }

    get comoFalha(): Resultado<any> {
        return Resultado.falha<any>(this.erros!)
    }

    static combinar<T>(resultados: Resultado<T>[]): Resultado<T[]> {
        const erros = resultados.filter((r) => r.deuErrado)
        const instancias = resultados.map((r) => r._instancia)
        return erros.length > 0
            ? Resultado.falha<T[]>(erros.flatMap((r) => r.erros!))
            : Resultado.ok<T[]>(instancias as T[])
    }

    static async combinarAsync<T>(resultados: Promise<Resultado<T>>[]): Promise<Resultado<T[]>> {
        const rs = await Promise.all(resultados)
        return Resultado.combinar(rs)
    }
}
