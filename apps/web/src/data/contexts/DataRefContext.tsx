'use client'
import { DataReferencia } from 'core'
import { createContext, useState } from 'react'

export interface DataRefContextProps {
    dataRef: Date
    alterarDataRef: (dataRef: Date) => void
    permiteAlterar: (data: Date) => boolean
}

const DataRefContext = createContext<DataRefContextProps>({} as any)

export function DataRefProvider(props: any) {
    const [dataRef, setDataRef] = useState<Date>(new Date)

    function alterarDataRef(dataRef: Date) {
        if (!permiteAlterar(dataRef)) return
        setDataRef(dataRef)
    }

    function permiteAlterar(dataRef: Date) {
        return DataReferencia.nova(dataRef).deuCerto
    }

    return (
        <DataRefContext.Provider
            value={{
                dataRef,
                alterarDataRef,
                permiteAlterar,
            }}
        >
            {props.children}
        </DataRefContext.Provider>
    )
}

export default DataRefContext
