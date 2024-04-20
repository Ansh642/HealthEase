import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RiGraduationCapLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import '../App.css'

export default function DoctorFilter() {

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/')[2];
  const [doctor, setdoctor] = useState([]);
  const [otherDoctors, setotherDoctors] = useState([]);

  const fetchDoctor = async()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/doctor/:${id}`);
      setdoctor(response.data.doctorDetails);
      setotherDoctors(response.data.otherDoctors);
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect ( ()=>{
    fetchDoctor();
  },[id]);

  return (

    <>

    <Navbar/>

    <div className='py-6 px-10 md:px-24'> 
      <h2 className='font-bold text-[26px]'>Details</h2>

      <div className='flex flex-row gap-7 mt-7'>
        
        {/* doctor information */}
        <div className='flex flex-col gap-3 w-[65%]'>

          {/* doctor image and informtion */}
          <div className='flex flex-row gap-9 px-7 py-6 border-2 border-gray-100 h-fit'>
            <img src={doctor.image} alt="" width={200} height={190} className='border-[1px] border-gray-200 rounded-lg'/>

            <div className='flex flex-col gap-2 mt-2'>

              <p className='font-semibold text-[22px]'>{doctor?.name}</p>
              <p className='flex flex-row gap-2 items-center'> <RiGraduationCapLine size={20}/>{doctor.years} Years of Experience</p>
              <p className='flex flex-row gap-2 items-center'> <TfiLocationPin size={20}/> {doctor.address}</p>
              <p className='text-blue-500 cursor-pointer font-semibold text-sm bg-blue-100 rounded-xl px-2 py-1 w-fit text-center'>{doctor?.category?.name}</p>
              <div className="mt-4 w-40 rounded-full cursor-pointer bg-blue-600 text-center py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none">
              Book Appointment
              </div>

            </div>

          </div>

          {/* about me doctor */}
          <div className='flex flex-col h-52 gap-3 px-5 py-4 border-2 border-gray-100 '>
            <p className='font-bold text-[22px]'>About Me</p>
            <p>{doctor.about}</p>
          </div>

        </div>


        {/* suggestions */}
        <div className='w-[25%] flex flex-col px-5 py-4 border-2 border-gray-100 h-[510px] overflow-y-scroll ansh'>
          <p className='font-bold text-[22px]' >Suggestions</p>

          <div className='flex flex-col gap-8 py-4 mt-4 cursor-pointer'>
            {
              otherDoctors.map( (ele)=>(
                <div key={ele._id} className='flex hover:bg-blue-300 transition-all duration-200 rounded-lg px-2 py-2 w-full flex-row gap-5 items-center justify-start' onClick={()=>navigate(`/doctor/${ele._id}`)}>
                  <img src={ele.image} alt="" className='rounded-full object-cover w-[80px] h-[80px] border-[1px] border-gray-100'/>           
                  <div className='flex flex-col '>
                    <p className='text-sm font-semibold'>{ele.name}</p>
                    <p className='text-blue-500 text-sm font-medium'>{ele.years} Years</p>
                    <p className='text-blue-500 cursor-pointer font-semibold text-sm bg-blue-100 mt-1 rounded-xl py-1 px-2 w-fit text-center'>{ele?.category?.name}</p>
                  </div>

                </div>
              ))  
            }

          </div>


        </div>

      </div>  

    </div>

    <Footer/>
    </>
  )
}




