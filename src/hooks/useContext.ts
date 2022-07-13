import { createContext, useContext } from "react"



export const DynamicContext = <T>() => createContext<T>({} as T)
