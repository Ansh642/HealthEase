import React,{useContext, useEffect, useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { CiCalendarDate } from "react-icons/ci";
import { TfiLocationPin } from "react-icons/tfi";
import { CiClock1 } from "react-icons/ci";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ImSad } from "react-icons/im";

export default function Booking() {

  const [select, setselect] = useState("Upcoming");
  const [bookings, setbookings] = useState([]);
  const navigate = useNavigate();
  

  useEffect( ()=>{
    const fetchDetails =async(req,res)=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/get-bookings");
  
        if(response.data.success)
        {
          setbookings(response.data.bookings);
        }
      }
      catch(err){
        console.log(err.message);
      }
    }

    fetchDetails();
  },[])


  const cancelAppointment =async(id,docId)=>{
    try{
      const response = await axios.post('http://localhost:4000/api/v1/delete-booking',{
        id,
        docId,
      });

      if(response.data.success)
      {
        toast.success("Booking deleted successfully");
        navigate("/");
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }


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

        <div>
        {
        bookings && bookings.length > 0 ? (
          bookings.map((ele, index) => (
            <div className='flex flex-row gap-3 h-fit w-full border-[1px] border-gray-300 mt-3 rounded-lg justify-start px-5 py-6' key={ele._id}>
              <img src={ele.doctor.image} alt="" width={160} height={160}/>

              <div className='flex flex-col gap-2 mt-2'>
                <p className='font-semibold text-[20px]'>{ele.doctor?.name}</p>
                <p className='flex flex-row gap-1 items-center'> <TfiLocationPin size={20} /> Near {ele.doctor.address}</p>
                <p className='flex flex-row gap-1 items-center'> <CiCalendarDate  size={20} /> Appointment On : <span className='font-medium'>{ele.date}</span></p>
                <p className='flex flex-row gap-1 items-center'> <CiClock1   size={20} /> At - <span className='font-medium'>{ele.time} hours</span></p>
              </div>

              <button className='ml-[700px] mb-32 border-2 h-fit w-fit rounded-lg border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 bg-white px-2 py-1' onClick={() => cancelAppointment(ele._id,ele.doctor._id)}>
                Cancel Appointment
              </button>
            </div>
          ))
        ) : (
          <div className='flex flex-row gap-3 mt-40 items-center justify-center'>
            <p className=' text-4xl font-semibold'>No bookings found! </p>
            <ImSad size={40}/>
          </div>
        )
      }
      </div>


       </div>

    <Footer/>

    </>
    </div>
  )
}
