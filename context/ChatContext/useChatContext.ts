import { ChatContextProps } from "../../types";
import { createContext, useContext } from "react";


export const ChatContext = createContext<ChatContextProps | null>(null)

export const useChatContext = () => {
    const data = useContext(ChatContext)
  
    if(!data){
        throw("Not match context data!")
    }
  
    return data
  
}