import { createContext, useState } from "react";

const CuitContext = createContext()

export const CuitContextProvider = ({children}) => {
    const [cuit, setCuit] = useState()
    const [existingData, setExistingData] = useState()

    return(
        <CuitContext.Provider value={{cuit, setCuit, existingData, setExistingData}}>{children}</CuitContext.Provider>
    )
}

export default CuitContext