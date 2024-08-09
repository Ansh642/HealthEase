import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    experience: '',
    password: '',
    category: '',
    confirmPassword: '',
  });

  const { name, email, location, category, experience, about, password, confirmPassword } = formData;
  const [photo, setPhoto] = useState("");

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
    data.append("photo", photo);
    data.append("category", category);
    data.append("location", location);
    data.append("experience", experience);
    data.append("about", about);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/create-doctor", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        toast.success("Registration Successful!");
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Doctor Signup
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                sign in to your account
              </Link>
            </p>
          </div>

          <form onSubmit={submitHandler} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={handleOnChange}
                  value={name}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleOnChange}
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="experience" className="sr-only">Experience</label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  required
                  onChange={handleOnChange}
                  value={experience}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Experience (in years)"
                />
              </div>
              <div>
                <label htmlFor="category" className="sr-only">Category</label>
                <select
                  id="category"
                  name="category"
                  required
                  onChange={handleOnChange}
                  value={category}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Choose Your Category</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Otology">Otology</option>
                  <option value="Physician">Physician</option>
                  <option value="Orthopedic">Orthopedic</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="sr-only">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  onChange={handleOnChange}
                  value={location}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Location"
                />
              </div>
              <div>
                <label htmlFor="photo" className="sr-only">Profile Picture</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={handleOnChange}
                  value={password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={handleOnChange}
                  value={confirmPassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <label htmlFor="about" className="sr-only">About</label>
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  onChange={handleOnChange}
                  value={about}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Write about yourself..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Are you a Patient? Sign up here.
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
