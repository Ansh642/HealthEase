import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function DoctorSignup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: '',
    location: '',
    experience : '',
    password: '',
    category: '',
    confirmPassword: '',
  });

  const { name, email, location,category,experience, about, password, confirmPassword } = formData;
  const [photo, setphoto] = useState("");

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("photo",photo);
    data.append("category",category);
    data.append("location",location);
    data.append("experience",experience);
    data.append("about",about);
    data.append("password" ,password);
    data.append("confirmPassword" ,confirmPassword);


    try {

     const response  = await axios.post("http://localhost:4000/api/v1/create-doctor",{
        name,
        email,
        password,
        confirmPassword,
        photo,
        category,
        location,
        about,
        experience,
     },{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
     });

      if (response.data.success) {
        toast.success("Registration Successfull!");
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full max-w-xs mx-auto flex flex-col mt-10">
        <form onSubmit={submitHandler} className="bg-white shadow-lg shadow-slate-300 rounded px-8 py-3 mb-4">

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              name="name"
              value={name}
              type="text"
              placeholder="Enter Your Full Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              name="email"
              value={email}
              type="email"
              placeholder="Enter Your E-mail"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Experience (in Years)
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              name='experience'
              value={experience}
              type="text"
              placeholder="Enter Your Experience in years "
            />
          </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Choose Your Category
        </label>
        <select name="category" required onChange={handleOnChange} className="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Choose Your Category</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Otology">Otology</option>
            <option value="Physician">Physician</option>
            <option value="Orthopedic">Orthopedic</option>
        </select>
       </div>


        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Location
        </label>
        <input
            onChange={handleOnChange}
            className="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            name="location"
            value={location}
            type="text"
            placeholder="Enter Your complete location"
        />
        </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Profile Picture
            </label>
            <input type="file" onChange={(e)=>setphoto(e.target.files[0])} name="photo" id="" className="border-gray-500 border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>


          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={password}
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            About
        </label>
        <textarea rows={3} cols={3}
            onChange={handleOnChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            name="about"
            value={about}
            type="text"
            placeholder="Write about yourself..."
        />
        </div>

          <div className="flex items-center mb-2 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>

            <Link to="/login" className="text-blue-500 hover:text-blue-600 text-center font-normal">
                Already a User?
            </Link>

          </div>

        </form>

        <p className="text-center text-gray-500 text-xs">©2024 HealthEase. All rights reserved.</p>

        <Link to="/signup" className="mt-3 text-blue-500 hover:text-blue-600 text-center font-normal">
          Are You a Patient?
        </Link>
        
        
      </div>

      <Footer />
      
    </div>
  )
}
