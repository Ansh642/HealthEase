import {React,useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

export default function CategoryFilter() {

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

  
   const fetchDoctors = async(req,res)=>{
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/doctors/:${location.name}`);
        setdoctors(response.data.allDoctors);
    }
    catch(err){
        console.log(err.message);
    }
  }

  useEffect( ()=>{
    fetchCategories();
    //setselected(location.name);
    fetchDoctors();
  },[selected]);
    

  return (
    <>
    <Navbar/>
    
    <div className='flex flex-row min-h-[65vh] px-10 mt-5 '>
       
      <div className='flex flex-col gap-3 w-[15%] border-r-[1px] border-gray-300'>
        <p className='text-sm font-semibold text-gray-500 capitalize'>Other Categories</p>

      <div className='flex flex-col gap-3'>
      {
      categories.map( (ele,index)=>(
        <div key={index} className='mt-3'>
          <div className={`flex flex-row cursor-pointer items-center gap-2 ${selected===ele.name ? `text-blue-500` : ``}`} onClick={()=>{setselected(ele.name);navigate(`/${ele.name}`)}}>
          <img src={ele.image} alt="" width={23} height={23}/>
          <p >{ele.name}</p>
          </div>
        </div>
      ))
      }
     </div>

    </div>

      <div className='flex flex-col gap-3 w-[70%] px-7'>
        <p className='font-semibold text-pretty text-3xl'>{location.name}</p>

        <div className='grid mt-4 mb-10 lg:grid-cols-3 lg:w-[92%] md:w-[95%]  md:grid-cols-2 sm:grid-cols-1 lg:gap-8 md:gap-3 sm:gap-2 items-center justify-center'>
        {
          doctors.map((category, index) => (
            <div key={index} >
              
              {category.doctors.map((doctor, idx) => (
                <div key={idx} className='border-[2px] border-gray-200 px-3 py-3 w-60 h-fit flex cursor-pointer transition-all duration-200 flex-col items-start justify-start rounded-xl gap-3'>
                  <img src={doctor.image} alt='' className='object-contain rounded-xl h-36 mt-1 w-full' onClick={()=>navigate(`/doctor/${doctor._id}`)}/> {/* Include only the doctor's image */}
                  <div className='text-start bg-blue-200 text-blue-600 font-semibold rounded-2xl px-2 py-1 text-sm'>
                {category?.name}
              </div>
                  <p className='font-bold text-sm'>{doctor.name}</p>
                  <p className='text-blue-500 text-sm font-medium -mt-2'>{doctor.years} Years</p>
                  <p className='text-gray-500 -mt-2'>{doctor.address}</p>
                  <button className='w-full px-4 py-1 rounded-2xl mt-1 cursor-pointer border-[1px] border-blue-400 text-blue-500 hover:bg-blue-500 transition-all duration-200 hover:text-black text-sm' onClick={()=>navigate(`/doctor/${doctor._id}`)}>Book Now</button>
                </div>
              ))}
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

