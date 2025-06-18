import { Usuario } from '../../usuario'
import AnoMesId from '../../shared/types/AnoMesId'
import Extrato from '../model/Extrato'
import Resultado from '../../shared/base/Resultado'
import Recorrencia from '../model/Recorrencia'

export default interface RepositorioExtrato {
    salvar(usuario: Usuario, extrato: Extrato): Promise<Resultado<void>>
    salvarTodos(usuario: Usuario, extratos: Extrato[]): Promise<Resultado<void>>
    salvarRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>>

    consultar(usuario: Usuario): Promise<Resultado<Extrato[]>>
    consultarPorId(usuario: Usuario, id: AnoMesId): Promise<Resultado<Extrato | null>>
    consultarPorIds(usuario: Usuario, ids: AnoMesId[]): Promise<Resultado<Extrato[]>>

    consultarRecorrencias(usuario: Usuario): Promise<Resultado<Recorrencia[]>>
    consultarRecorrenciasPorMes(
        usuario: Usuario,
        data: Date
    ): Promise<Resultado<Recorrencia[]>>
    consultarRecorrenciaPorId(
        usuario: Usuario,
        id: string
    ): Promise<Resultado<Recorrencia | null>>

    excluirRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>>
}
