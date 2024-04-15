import React from 'react'
import image from '../assets/doctors.jpg'

export default function Hero() {
  return (
    <div>
    
     <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-xl sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src={image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Find & Book <span className='text-blue-600'>Appointment</span > with your Fav <span className='text-blue-600'>Doctors</span></h2>

        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
          eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius
          quidem quam repellat.
        </p>

        <div className="mt-8 inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Explore Now
        </div>
      </div>
    </div>
     </div>
    

    </div>
  )
}