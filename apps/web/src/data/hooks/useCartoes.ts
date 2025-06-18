import { useContext } from 'react'
import CartoesContext from '../contexts/CartoesContext'

const useCartoes = () => useContext(CartoesContext)
export default useCartoes
