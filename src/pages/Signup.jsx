import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div>
      <Navbar/>

      <div class="w-full max-w-xs mx-auto flex flex-col mt-10 max-h-[70vh]">
      <form class="bg-white shadow-lg shadow-slate-300 rounded px-8 py-3 mb-4">

      <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Name
          </label>
          <input class="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type='text' placeholder="Enter Your Full Name"/>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type='email' placeholder="Enter Your E-mail"/>
        </div>

        <div class="mb-4 ">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
          
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Confirm Password
          </label>
          <input class="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
          
        </div>

        <div class="flex items-center mb-2 justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign Up
          </button>
          
        </div>
      </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2024 HealthEase. All rights reserved.
        </p>

        <Link to='/login' className='flex mt-4 tracking-tight hover:text-blue-700 transition-all duration-150 cursor-pointer justify-center text- text-blue-500'>
        Already a User ? 
       </Link>
     
      </div>


     <Footer/>
     
    </div>
  )
}
