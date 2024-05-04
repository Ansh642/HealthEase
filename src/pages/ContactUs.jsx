import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import doctor from '../assets/doctor.webp';
import toast from 'react-hot-toast';

export default function ContactUs() {
  // State variables to store input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Onchange handler for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit handler
  const handleSubmit = () => {
    // Here you can perform any actions you want when the form is submitted, such as sending data to a server
    // For now, let's just log the input values
    console.log('Form Data:', formData);

    setFormData({
      firstName : "",
      lastName : "",
      email : "",
      message : "",
    })
    toast.success('Response Received!');
  };

  return (
    <div>
      <Navbar />

      <div className='min-h-screen relative mb-32'>
        <img src={doctor} alt="" className='w-full h-96' />

        <div className='h-fit justify-between w-[62%] shadow-md top-[337px] left-[330px] bg-white absolute flex flex-row px-7 py-8 '>

          <div className='flex flex-col w-[35%] gap-1'>
            <p className='text-2xl font-medium'>Emergency Cases</p>

            <p className='mt-7 text-sm'>Call Now:</p>
            <p className='text-blue-500 text-3xl'>+91 8171579897</p>

            <p className='mt-5'> <span className='font-medium'>Address 1 :</span> <span className='text-gray-800'>Sector 18, Noida , Near DLF Mall</span></p>
            <p className='mt-3'> <span className='font-medium'>Address 2 :</span> <span className='text-gray-800'>Saket, New Delhi , Near Khan Market</span></p>

            <p className='mt-6'> <span className='font-medium'>Working Hours :</span> <span className='text-gray-800'>Mon - Sat/ 7:00 - 18:00</span></p>

            <p className='mt-6'> <span className='font-medium'>Mail :</span> <span className='text-gray-800'>Esupport@medical.com</span></p>
          </div>

          <div className='border-[1px] border-gray-300'>
          </div>

          <div className='flex flex-col w-[55%] gap-1'>

            <p className='text-2xl font-medium'>Request Appointment</p>

            <div className='flex flex-row gap-3 mt-4'>

              <input type="text" className='bg-gray-50 px-3 py-2 rounded-md capitalize' placeholder='First Name*' name="firstName" value={formData.firstName} onChange={handleChange} />
              <input type="text" className='bg-gray-50 px-3 py-2 rounded-md capitalize' placeholder='Last Name*' name="lastName" value={formData.lastName} onChange={handleChange} />

            </div>


            <input type="email" className='bg-gray-50 mt-4 w-[99%] px-3 py-2 rounded-md' placeholder='E-mail*' name="email" value={formData.email} onChange={handleChange} />


            <textarea name="message" id="" rows="5" className='mt-3 bg-gray-50 w-[99%] rounded-md' placeholder='Message*' value={formData.message} onChange={handleChange}>

            </textarea>

            <button className="mt-8 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700" onClick={handleSubmit}>
              Submit Now
            </button>


          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
}
