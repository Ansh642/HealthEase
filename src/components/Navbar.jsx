import React from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate();

    const menu=[
        {
            "id" : 1,
            "name" : "Home",
            "path" : "/",
        },
        {
            "id" : 1,
            "name" : "Explore",
            "path" : "/explore",
        },
        {
            "id" : 1,
            "name" : "Contact us",
            "path" : "/contact",
        }
    ]

  return (
    <div className='flex gap-7 items-center justify-between shadow-md w-full px-24 h-[65px]'>

    <div className='flex gap-10 items-center'>
    <img src={logo} alt="" width={40} height={40}/>
       
        <ul className='md:flex flex-row gap-8 hidden ml-14'>
            {
            menu.map( (item) => (
              <div key={item._id}>
                <Link  to={item.path}>
                    <li className='cursor-pointer text-[17px] hover:text-blue-600'>{item.name}</li>
                </Link>
              </div>
            ))
            }
        </ul>
    </div>

    <button className='px-2 py-2 bg-blue-600 rounded-[5px] hover:bg-blue-700 transition-all duration-200 text-white' onClick={()=>navigate('/signup')}>Get Started</button>
    </div>
  )
}
