import { CartaoProps } from 'core'
import FaturaDTO from './FaturaDTO'

export default interface CartaoDTO extends CartaoProps {
    faturas: FaturaDTO[]
}
