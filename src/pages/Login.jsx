import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AppContext } from '../context/User';

export default function Login() {
  const navigate = useNavigate();
  const { auth, setauth } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        email,
        password,
      });

      if (response.data.success) {
        setauth({
          ...auth,
          user: response.data.userDetails,
          token: response.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        toast.success('Welcome Back');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full max-w-xs mx-auto flex flex-col mt-28 min-h-[52vh]">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-lg shadow-slate-300 rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              onChange={handleOnChange}
              value={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="email"
              type="email"
              placeholder="E-mail"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={handleOnChange}
              value={password}
              className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>

            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/reset-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          ©2024 HealthEase. All rights reserved.
        </p>
      </div>

      <Footer />
    </div>
  );
}
