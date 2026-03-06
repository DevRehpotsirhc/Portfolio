import { createContext, useContext } from "react"
import { useDarkmode } from "../hooks/useDarkmode"

const DarkmodeContext = createContext()

export const DarkmodeProvider = ({ children }) => {
    const darkmode = useDarkmode()
    return (
        <DarkmodeContext.Provider value={darkmode}>
            {children}
        </DarkmodeContext.Provider>
    )
}

export const useDarkmodeContext = () => useContext(DarkmodeContext)