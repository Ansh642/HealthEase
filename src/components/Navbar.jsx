import React, { useContext,useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/User';
import toast from 'react-hot-toast';

export default function Navbar() {

  const navigate = useNavigate();
  const {auth,setauth} = useContext(AppContext);
  const [show, setShow] = useState(false);
  

  const menu=[
    {
      "id" : 1,
      "name" : "Home",
      "path" : "/",
    },
    {
      "id" : 2,
      "name" : "Explore",
      "path" : "/explore",
    },
    {
      "id" : 3,
      "name" : "Contact us",
      "path" : "/contact",
    }
  ]

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem('auth');
    setauth({
      ...auth,
      user: null,
      token: null,
    });
    toast.success('Logged out successfully');
    navigate('/');
    setShow(false);
  };

  const handler = (e)=>{
    setShow(false);
    if(auth.user.years){
      navigate("/appointments");
    }
    else{
      navigate("/bookings");
    }
  }

  const handler2 = (e)=>{
    setShow(false);
    if(auth.user.years){
      navigate("/doctor-messages");
    }
    else{
      navigate("/user-messages");
    }
  }

  return (

    <div className='flex gap-7 items-center justify-between shadow-md w-full px-24 h-[65px]'>

    <div className='flex gap-10 items-center ml-6'>
    <img src={logo} alt="" width={40} height={40} onClick={()=>navigate('/')} className='cursor-pointer'/>
       
      <ul className='md:flex flex-row gap-8 hidden ml-28'>
          {
          menu.map( (item ,index) => (
            <div key={index}>
              <Link  to={item.path}>
                  <li className='cursor-pointer text-[17px] hover:text-blue-600'>{item.name}</li>
              </Link>
            </div>
          ))
          }
      </ul>

    </div>

    <div>
    {
      auth?.token ? (
        <div className='flex flex-row cursor-pointer gap-6 items-center'>
          <div className="flex items-center cursor-pointer">
            <img src={auth.user?.image} alt="" className="rounded-full h-9 w-9 object-contain mr-10" onClick={() => setShow(!show)} />
          </div>

          <div className={`w-36 h-40 bg-white border-[1px] border-gray-300 shadow-lg z-30 right-16 absolute rounded-lg px-1 py-1 visible top-14 cursor-pointer ${show === true ? `visible` : `invisible`}`}>
            <div className='flex flex-col gap-2 justify-start px-1 py-1 text-lg mt-2 '>

            <p className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1" onClick={handler}>My Bookings</p>
            <p className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1" onClick={handler2}>My Messages</p>
            <p className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1" onClick={logoutHandler}>Log out</p>
            </div>
          </div>

        </div>
      ) : (
        <>
          <button
            className='px-2 py-2 bg-blue-600 rounded-[5px] hover:bg-blue-700 transition-all duration-200 text-white'
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </>
      )
    }

    </div>
    
    </div>
    
  )
}
