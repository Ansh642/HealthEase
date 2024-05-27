import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../context/User';


export default function Private() {
  const [ok, setOk] = useState(false);
  const {auth} = useContext(AppContext);

  useEffect(() => {
    const authCheck = async () => {

      const res = await axios.get("http://localhost:4000/api/v1/user-auth");
    
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) 
    authCheck();

  }, [auth?.token]);

  return ok ? <Outlet /> : <h1 className="text-4xl font-semibold font-inter flex items-center justify-center mt-80">Please Login to see your Dashboard</h1>;
}

