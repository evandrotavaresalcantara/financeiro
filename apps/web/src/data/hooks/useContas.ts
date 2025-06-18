import { useContext } from 'react'
import ContasContext from '../contexts/ContasContext'

const useContas = () => useContext(ContasContext)
export default useContas
