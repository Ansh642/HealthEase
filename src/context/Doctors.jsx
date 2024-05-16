import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const DoctorContext = createContext();
    
export function DoctorProvider({children}){

    const [doctor, setdoctor] = useState({
        doctors : null,
    });

    const value = {
        doctor,
        setdoctor,
    };
    
    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
}

