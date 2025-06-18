import { IdUnico } from 'utils'
import { TipoVisualizacao } from './types/TipoVisualizacao'
import AnoMesId from './types/AnoMesId'
import DataReferencia from './types/DataReferencia'
import Id from './types/Id'
import ProvedorAutenticacao, {
    MonitorarAut,
    PararMonitoramentoAut,
} from './provider/ProvedorAutenticacao'
import Resultado from './base/Resultado'

export type { MonitorarAut, PararMonitoramentoAut, ProvedorAutenticacao }
export { Resultado, Id, AnoMesId, DataReferencia, IdUnico, TipoVisualizacao }
