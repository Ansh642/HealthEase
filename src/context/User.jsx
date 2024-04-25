import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();
    
export function AuthProvider({children}){

    const [auth, setauth] = useState({
        user : null,
        token : "",
    });

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data) {
            const parseData = JSON.parse(data);
            setauth({
                user: parseData.userDetails,
                token: parseData.token,
            });
        }
    }, []);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth.token ? `Bearer ${auth.token}` : null;
    }, [auth.token]);

    const value = {
        auth,
        setauth,
    };
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

