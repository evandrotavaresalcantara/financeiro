import { useContext } from "react"
import CarregandoContext from "../contexts/CarregandoContext"

const useCarregando = () => useContext(CarregandoContext)

export default useCarregando