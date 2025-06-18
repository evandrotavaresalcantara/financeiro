import { useContext } from "react"
import MensagensContext from "../contexts/MensagensContext"

const useMensagens = () => useContext(MensagensContext)

export default useMensagens