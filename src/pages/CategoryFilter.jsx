import {React,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

export default function CategoryFilter() {

    const location =  useParams();
    const [selected, setselected] = useState(location.name);
    console.log(selected);
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

  useEffect( ()=>{
    fetchCategories();
  },[]);


  return (
    <>
    <Navbar/>
    <div className='flex flex-row min-h-[68vh] px-10 mt-5 '>
       
      <div className='flex flex-col gap-3 w-[15%] min-h-[68vh] border-r-2 border-gray-100'>
        <p className='text-sm font-semibold text-gray-500 capitalize'>Other Categories</p>

        <div className='flex flex-col gap-5'>
      {
      categories.map( (ele,index)=>(
        <div key={index} className='mt-3'>
          <div className='flex flex-row items-center gap-2'>
          <img src={ele.image} alt="" width={20} height={20}/>
          <p>{ele.name}</p>
          </div>
        </div>
      ))
      }
     </div>

      </div>

      <div className='flex flex-col gap-3 w-2/3'></div>

    </div>

    <Footer/>
    </>
  )
}

