import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ResetPass() {
  return (
    <div>
        <div>
      <Navbar/>

      <div class="w-full max-w-xs mx-auto flex flex-col mt-16 min-h-[59vh]">

        <form class="bg-white shadow-lg shadow-slate-300 rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type='email' placeholder="E-mail"/>
            </div>

            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                New Password
            </label>
            <input class="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
            
            </div>

            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Confirm New Password
            </label>
            <input class="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>            
            </div>

            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Reset Password
            </button>
            
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy;2024 HealthEase. All rights reserved.
        </p>
     
      </div>

    
     <Footer/>
     
    </div>
    </div>
  )
}
