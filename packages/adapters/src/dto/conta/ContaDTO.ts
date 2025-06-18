import { ContaProps } from 'core'
import SaldoDTO from './SaldoDTO'

export default interface ContaDTO extends ContaProps {
    saldos: SaldoDTO[]
}
