import { GlobalContext } from "./useGlobalContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/Firebase";
import { UserProps } from "../../types";

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setIsLoading(true)
        await getCurrentUser()
        .then(response => {
            if(response){
                setIsConnected(true)
                setUser(response)
            }else{
                setIsConnected(false)
                setUser(null)
            }
        })
        .catch(error => {
            console.log("Error fetching user: ", error);
        })
        .finally(() => {
            setIsLoading(false)
        })
    }



  return (
    <GlobalContext.Provider value={{ user, setUser, isConnected, setIsConnected, isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  )
};

export default GlobalContextProvider;
