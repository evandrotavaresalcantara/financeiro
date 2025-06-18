import ObjetoUtils from './ObjetoUtils'

export default class DataUtils {
    static adicionarDias(ref: Date, qtde: number): Date {
        return new Date(
            ref.getFullYear(),
            ref.getMonth(),
            ref.getDate() + qtde,
            ref.getHours(),
            ref.getMinutes(),
            ref.getSeconds(),
            ref.getMilliseconds()
        )
    }

    static adicionarMeses(ref: Date, qtde: number): Date {
        const ultimoDiaDoNovoMes = new Date(ref.getFullYear(), ref.getMonth() + qtde + 1, 0)
        return new Date(
            ultimoDiaDoNovoMes.getFullYear(),
            ultimoDiaDoNovoMes.getMonth(),
            Math.min(ref.getDate(), ultimoDiaDoNovoMes.getDate()),
            ref.getHours(),
            ref.getMinutes(),
            ref.getSeconds(),
            ref.getMilliseconds()
        )
    }

    static adicionarAnos(ref: Date, qtde: number): Date {
        return DataUtils.adicionarMeses(ref, qtde * 12)
    }

    static converterDataFS(dados: any): any {
        if (!dados) return dados
        return Object.keys(dados).reduce((obj: any, prop: string) => {
            return {
                ...obj,
                [prop]: DataUtils.converterDataFSAtrib(dados[prop]),
            }
        }, {})
    }

    static converterDataFSAtrib(value: any): any {
        if (value?.toDate) {
            return value.toDate()
        } else if (ObjetoUtils.ehObjeto(value)) {
            return DataUtils.converterDataFS(value)
        } else if (Array.isArray(value)) {
            return value.map((v) => DataUtils.converterDataFSAtrib(v))
        } else {
            return value
        }
    }

    static min(...dates: Date[]) {
        if (!dates.length) return null
        return dates.reduce((min, dt) => {
            return min < dt ? min : dt
        })
    }

    static max(...dates: Date[]) {
        if (!dates.length) return null
        return dates.reduce((max, dt) => {
            return max > dt ? max : dt
        })
    }

    static mesesEntre(d1: Date, d2: Date): Date[] {
        return DataUtils.datasEntre(d1, d2, 'm')
    }

    static diasEntre(d1: Date, d2: Date): Date[] {
        return DataUtils.datasEntre(d1, d2, 'd')
    }

    static anosEntre(d1: Date, d2: Date): Date[] {
        return DataUtils.datasEntre(d1, d2, 'y')
    }

    static datasEntre(d1: Date, d2: Date, frequencia?: 'd' | 'm' | 'y'): Date[] {
        const inicio = DataUtils.min(d1, d2)
        const fim = DataUtils.max(d1, d2)
        if (!inicio || !fim) return []

        const porDia = frequencia === 'd'
        const porAno = frequencia === 'y'
        const adicionar = porDia
            ? DataUtils.adicionarDias
            : porAno
              ? DataUtils.adicionarAnos
              : DataUtils.adicionarMeses

        const dates = [inicio]
        const next = () => adicionar(inicio, dates.length)
        while (next() <= fim) dates.push(next())

        return dates
    }

    static emDiasDiferentes(dt1: Date, dt2: Date) {
        return !DataUtils.mesmoDia(dt1, dt2)
    }

    static emMesesDiferentes(dt1: Date, dt2: Date) {
        return !DataUtils.mesmoMes(dt1, dt2)
    }

    static emAnosDiferentes(dt1: Date, dt2: Date) {
        return !DataUtils.mesmoAno(dt1, dt2)
    }

    static mesmoDia(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        const diasIguais = dt1.getDate() === dt2.getDate()
        return DataUtils.mesmoAno(dt1, dt2) && DataUtils.mesmoMes(dt1, dt2) && diasIguais
    }

    static mesmoMes(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        const mesesIguais = dt1.getMonth() === dt2.getMonth()
        return DataUtils.mesmoAno(dt1, dt2) && mesesIguais
    }

    static mesmoAno(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        return dt1.getFullYear() === dt2.getFullYear()
    }

    static subtrairDias(dt: Date, qtde: number) {
        return DataUtils.adicionarDias(dt, -qtde)
    }

    static subtrairMeses(dt: Date, qtde: number) {
        return DataUtils.adicionarMeses(dt, -qtde)
    }

    static subtrairAnos(dt: Date, qtde: number) {
        return DataUtils.adicionarAnos(dt, -qtde)
    }

    static primeiroDiaDoMes(dt: Date) {
        const ano = dt.getFullYear()
        const mes = dt.getMonth() + 1
        return new Date(`${ano}/${mes}/01 00:00:00`)
    }

    static ultimoDiaDoMes(dt: Date) {
        return new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
    }

    static diferencaEmDias(start: Date, end: Date): number {
        const startDt = DataUtils.min(start, end)!
        const endDt = DataUtils.max(start, end)!
        const next = () => DataUtils.adicionarDias(startDt, diff + 1)

        let diff = 0
        while (next() <= endDt) diff++
        return diff
    }

    static diferencaEmMeses(start: Date, end: Date): number {
        const t1 = start.getFullYear() * 12 + start.getMonth()
        const t2 = end.getFullYear() * 12 + end.getMonth()
        return Math.abs(t1 - t2)
    }

    static diferencaEmAnos(start: Date, end: Date): number {
        const diff = start.getFullYear() - end.getFullYear()
        return Math.abs(diff)
    }

    static ultimos12Meses(ref: Date): Date[] {
        const inicio = DataUtils.adicionarMeses(DataUtils.subtrairAnos(ref, 1), 1)
        return DataUtils.mesesEntre(
            DataUtils.primeiroDiaDoMes(inicio),
            DataUtils.primeiroDiaDoMes(ref)
        )
    }
}
