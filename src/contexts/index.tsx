import { useState, createContext, ReactNode } from "react"

interface DynamicContextProps {
  data : any;
  setData : (data : any) => void
}

export const DynamicContext = createContext<DynamicContextProps>({
  data : null,
  setData : (data : any) => {}
})
interface DynamicContextProviderProps {
  children: ReactNode
}

export const DynamicContextProvider = (props: DynamicContextProviderProps) => {
  const [data,setData] = useState<any>(null);

  const setDynamicContext = (currentData : any) => {
    setData({...data, ...currentData});
  }
    
  const contextValue: DynamicContextProps = {
    data,
    setData : setDynamicContext,
  }
  return <DynamicContext.Provider value={contextValue}>{props.children}</DynamicContext.Provider>
}