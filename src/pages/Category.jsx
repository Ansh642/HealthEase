import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/Doctors';

export default function Category() {

  const [categories, setcategories] = useState([]);
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const {doctor, setdoctor} = useContext(DoctorContext);

  const fetchCategories = async() =>{
    try{
      const response = await axios.get('http://localhost:4000/api/v1/categories');
      setcategories(response.data.allCategories);
    }
    catch(err){
      console.log(err.message);
    }
  }

  const searchHandler = async()=>{
    
    try{
      const response = await axios.post('http://localhost:4000/api/v1/search',{
      search,
      });

      if(response.data.similarDoctors){
        setdoctor({
          doctors:response.data.similarDoctors,
        })
        
        navigate("/search");
      }

      else{
        console.log("No similar doctors found");
      }

    }
    catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  useEffect( ()=>{
    fetchCategories();
  },[]);


  return (
    <div>
        <div className='mt-8 mb-20 sm:px-10 flex flex-col gap-3 items-center '>
      <h2 className='text-4xl font-semibold text-center'>Search <span className='text-blue-600'>Doctors</span></h2>
      <p className='text-xl text-gray-500 text-center'>Search Your Doctor and Book Appointment in one click</p>

      <div className="flex w-full max-w-sm mt-2 sm:w-[90%] items-center space-x-2">
      <input type="text" placeholder="Search..." className="rounded-[7px] px-3 capitalize py-2 w-full outline-none border-[1px] border-gray-500" value={search} onChange={(e)=>setsearch(e.target.value)} />
      <button className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 px-3 py-2 rounded-[5px]' onClick={searchHandler}>Search</button>
    </div>

    <div className='grid  cursor-pointer grid-cols-3 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-5'>
    {
      categories.map( (ele,index)=>(
        <div key={index} onClick={()=>navigate(`/${ele.name}`)} className='flex hover:scale-105 transition-all duration-200 flex-col gap-2 bg-blue-100 w-32 h-28 py-1 px-2 rounded-lg items-center justify-center'>
            <img src={ele.image} alt="" width={42} height={42}/>
            <p className='text-sm text-blue-500 font-semibold w-full text-center h-4'>{ele.name}</p>
        </div>
      ))
    }
   </div>
    
    </div>
    </div>
  )
}
