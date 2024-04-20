import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/signup', {
        name,
        email,
        password,
        confirmPassword,
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

      <div className="w-full max-w-xs mx-auto flex flex-col mt-10 max-h-[70vh]">
        <form onSubmit={submitHandler} className="bg-white shadow-lg shadow-slate-300 rounded px-8 py-3 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              onChange={handleOnChange}
              className="shadow appearance-none border capitalize rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
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
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="Enter Your E-mail"
            />
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
          <div className="flex items-center mb-2 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">©2024 HealthEase. All rights reserved.</p>

        <Link to="/login" className="mt-3 text-blue-500 hover:text-blue-600 text-center font-normal">
          Already a User?
        </Link>
      </div>

      <Footer />
      
    </div>
  );
}
