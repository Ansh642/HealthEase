import {React,useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

export default function Explore() {

  const location =  useParams();
    const navigate =  useNavigate();

    const [selected, setselected] = useState(location.name);
    const [doctors, setdoctors] = useState([]);
    const [categories, setcategories] = useState([]);

   const fetchCategories = async() =>{
    try{
      const response = await axios.get('http://localhost:4000/api/v1/categories');
      //console.log(response.data.allCategories);
      setcategories(response.data.allCategories);
    }
    catch(err){
      console.log(err.message);
    }
  }

  const allDoctors = async()=>{
    try{
      const response = await axios.get('http://localhost:4000/api/v1/doctors');

      if(response.data.success){
        setdoctors(response.data.allDoctors);
        //console.log(response.data.allDoctors);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }

  
   
  useEffect( ()=>{
    fetchCategories();
    allDoctors();
  },[selected]);
    

  return (
    <>
    <Navbar/>
    
    <div className='flex flex-row min-h-[65vh] px-10 mt-5 '>
       
      <div className='flex flex-col gap-3 w-[15%] border-r-[1px] border-gray-300'>
      <p className='text-sm font-semibold text-gray-500'>All Categories</p>

      <div className='flex flex-col gap-3'>
      {
      categories.map( (ele,index)=>(
        <div key={index} className='mt-3'>
          <div className={`flex flex-row cursor-pointer items-center gap-2`} >
          <img src={ele.image} alt="" width={23} height={23}/>
          <p className='hover:text-blue-500 transition-all duration-150' onClick={()=>navigate(`/${ele.name}`)}>{ele.name}</p>
          </div>
        </div>
      ))
      }
     </div>

    </div>

      <div className='flex flex-col gap-3 w-[90%] px-7'>
        <p className='font-semibold text-pretty text-3xl'>Available Doctors</p>

        <div className='grid mt-4 grid-cols-4 gap-7 items-center justify-center'>
         {
            doctors.map( (ele,index)=>(
                <div className=' border-[2px] border-gray-200 px-3 py-4 w-64 h-fit flex cursor-pointer hover:border-blue-300 transition-all duration-200 flex-col items-start justify-start rounded-xl gap-3'>
                    <img src={ele.image} alt="" className='object-contain rounded-xl h-36 mt-1 w-full' onClick={()=>navigate(`/doctor/${ele._id}`)}/>
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

    </div>

    <Footer/>
    </>
  )
}
