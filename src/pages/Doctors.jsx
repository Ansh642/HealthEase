import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Doctors() {

    const [doctors, setdoctors] = useState([]);
    
    const fetchDoctors = async(req,res)=>{
    try{
        const response = await axios.get('http://localhost:4000/api/v1/doctors');
        setdoctors(response.data.allDoctors);
       // console.log(response.data.allDoctors);

    }
    catch(err){
        console.log(err.message);
    }
  }

    useEffect( ()=>{
        fetchDoctors();
    },[]);


  return (
    <div className='mb-20 px-12 ml-24'>
        <h2 className='text-3xl font-semibold'>Popular Doctors</h2>

        <div className='grid mt-4 lg:grid-cols-4 lg:w-[92%] md:w-[95%]  md:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-3 sm:gap-2 items-center justify-center'>
         {
            doctors.map( (ele,index)=>(
                <div className=' border-[2px] border-gray-200 px-3 py-4 w-64 h-fit flex cursor-pointer hover:scale-105 transition-all duration-200 flex-col items-start justify-start rounded-xl gap-3'>
                    <img src={ele.image} alt="" className='object-contain rounded-xl h-36 mt-1 w-full'/>
                    <div className='text-start bg-blue-200 text-blue-600 font-semibold rounded-2xl px-2 py-1 text-sm'>
                        {ele.category.name}
                    </div>
                    <p className='font-bold text-sm'>{ele.name}</p>
                    <p className='text-blue-500 text-sm font-medium -mt-2'>{ele.years} Years</p>
                    <p className='text-gray-500 -mt-2'>{ele.address}</p>
                    <button className=' w-full px-4 py-1 rounded-2xl mt-1 cursor-pointer border-[1px] border-blue-400 text-blue-500 hover:bg-blue-500 transition-all duration-200 hover:text-black text-sm'>Book Now</button>

                </div>
            ))
         }
        </div>
    </div>
  )
}
