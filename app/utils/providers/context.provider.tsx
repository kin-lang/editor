"use client"

import { useState } from "react"
import KinContext from "./context"

interface IContentProps {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

interface ContextProviderProps {
    children: React.ReactNode
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [data, setData] = useState({}) 
    return(
        <KinContext.Provider value={{ data, setData }}>
            {children}
        </KinContext.Provider>
    )
}

export default ContextProvider