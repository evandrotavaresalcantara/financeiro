import { useContext } from 'react'
import DataRefContext from '../contexts/DataRefContext'

const useDataRef = () => useContext(DataRefContext)
export default useDataRef
