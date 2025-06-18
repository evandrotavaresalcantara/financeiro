import { Usuario } from '../../usuario'

export type MonitorarAut = (usuario: Usuario | null) => void
export type PararMonitoramentoAut = () => void

export default interface ProvedorAutenticacao {
    loginComProvedor(providerId: string): Promise<Usuario | null>
    logout(): Promise<void>
    monitorar(fn: MonitorarAut): PararMonitoramentoAut
}
