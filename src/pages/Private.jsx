import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../context/User';

export default function Private() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { auth, setauth } = useContext(AppContext);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).token : null;

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const res = await axios.get("http://localhost:4000/api/v1/user-auth");

          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
            setauth({ user: null, token: "" }); // Clear the context
            localStorage.removeItem("auth"); // Clear storage
          }
        } else {
          setOk(false);
        }
      } catch (err) {
        console.error("Error during auth check", err);
        setOk(false);
      } finally {
        setLoading(false); // Stop loading once check is complete
      }
    };

    authCheck();
  }, [setauth]);

  if (loading) {
    return <div className="text-4xl text-blue-700 font-semibold font-inter flex items-center justify-center mt-80">Loading...</div>;
  }

  return ok ? <Outlet /> : (
    <>
      <h1 className="text-4xl text-blue-700 font-semibold font-inter flex items-center justify-center mt-80">Please Login to see your Dashboard</h1>
      <Link to="/" className="mx-auto text-blue-600 hover:underline cursor-pointer flex items-center justify-center mt-2 text-xl font-semibold">Go Back</Link>
    </>
  );
}
