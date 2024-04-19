import { useState,useEffect, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();
    
export function AuthProvider({children}){

    const [auth, setauth] = useState({
        user : null,
        token : "",
    });

    axios.defaults.headers.common['Authorization'] = auth?.token;
    
    useEffect ( ()=>{
        const data = localStorage.getItem("auth");
        if(data)
        {
            const parseData = JSON.parse(data);
            setauth({
                
                user: parseData.userDetails,
                token: parseData.token,
            })
        }
    },[]);

    const value={
        auth,setauth,
    }
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}



