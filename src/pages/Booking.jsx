import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Booking() {
  return (
    <div>
        <>
    <Navbar/>
    <div className='px-24 py-6 flex flex-col min-h-[68vh]'> 
      <h1 className='text-3xl font-semibold'>My Bookings</h1>
      <div className='w-full flex flex-row items-center justify-start px-5 py-6 gap-5 h-10 mt-3 rounded-lg bg-blue-100'>

        <p className={`${select === "Upcoming" ? `bg-white px-3 py-1 rounded-lg` : ``} cursor-pointer`} onClick={()=>setselect("Upcoming")}>Upcoming</p>
        <p className={`${select === "Expired" ? `bg-white px-3 py-1 rounded-lg` : ``} cursor-pointer`} onClick={()=>setselect("Expired")}>Expired</p>

      </div>

      <div className='flex flex-row justify-items-end px-3 py-2'>
        
      </div>

    </div>

    <Footer/>

    </>



    </div>
  )
}
