import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../../context/Profile';


export default function Private() {
  const [ok, setOk] = useState(false);
  const {auth, setAuth} = useContext(AppContext);

  useEffect(() => {
    const authCheck = async () => {

      const res = await axios.get("http://localhost:4000/api/v1/doctor-auth");
    
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) 
    authCheck();

  }, [auth?.token]);

  return ok ? <Outlet /> : (<>
    <h1 className="text-4xl text-blue-700 font-semibold font-inter flex items-center justify-center mt-80">Please Login to see your Dashboard</h1>
    <Link to="/" className="mx-auto text-blue-600 hover:underline cursor-pointer flex items-center justify-center mt-2 text-xl font-semibold"> Go Back </Link>
    </>);
}

