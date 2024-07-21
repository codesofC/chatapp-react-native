import { GlobalContextProps } from "../../types";
import { createContext, useContext } from "react";


export const GlobalContext = createContext<GlobalContextProps | null>(null)

export const useGlobalContext = () => {
    const data = useContext(GlobalContext)
  
    if(!data){
        throw("Not match context data!")
    }
  
    return data
  
}