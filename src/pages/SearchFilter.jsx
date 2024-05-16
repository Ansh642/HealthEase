import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RiGraduationCapLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import toast from 'react-hot-toast';
import '../App.css';
import { AppContext } from '../context/User';
import { DoctorContext } from '../context/Doctors';
import { ImSad } from "react-icons/im";

export default function SearchFilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);
  const id = location.pathname.split('/')[2];
  const [otherDoctors, setOtherDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const { doctor, setdoctor } = useContext(DoctorContext);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/doctor/:${doctor.doctors[0]._id}`);
      setOtherDoctors(response.data.otherDoctors);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSaveTimings = async () => {
    setShowModal(false);

    if (!auth.user) {
      toast.error('Log in first');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/book-appointment', {
        time: selectedTime,
        date: selectedDate,
        id
      });

      if (response.data.success) {
        setSelectedTime('');
        setSelectedDate('');
        toast.success("Appointment Booked successfully");
        // navigate user to dashboard
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className='py-6 px-10 md:px-24'>
        {doctor.doctors && doctor.doctors.length > 0 ? (
          <>
            <h2 className='font-bold text-[26px]'>Details</h2>
            <div className={`flex flex-row gap-7 relative mt-7 ${showModal ? `opacity-40` : ``}`}>
              {/* doctor information */}
              <div className='flex flex-col gap-3 w-[65%] '>
                {/* doctor image and information */}
                <div className='flex flex-row gap-9 px-7 py-6 border-2 border-gray-100 h-fit'>
                  <img src={doctor.doctors[0].image} alt="" width={200} height={190} className='border-[1px] border-gray-200 rounded-lg' />
                  <div className='flex flex-col  gap-2 mt-2'>
                    <p className='font-semibold text-[22px]'>{doctor.doctors[0].name}</p>
                    <p className='flex flex-row gap-2 items-center'> <RiGraduationCapLine size={20} />{doctor.doctors[0].years} Years of Experience</p>
                    <p className='flex flex-row gap-2 items-center'> <TfiLocationPin size={20} /> {doctor.doctors[0]?.address}</p>
                    <p className='text-blue-500 cursor-pointer font-semibold text-sm bg-blue-100 rounded-xl px-2 py-1 w-fit text-center'>{doctor.doctors[0].category.name}</p>
                    <div className="mt-4 w-40 rounded-full cursor-pointer bg-blue-600 text-center py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none" onClick={() => setShowModal(!showModal)}>
                      Book Appointment
                    </div>
                  </div>
                </div>

                {/* about me doctor */}
                <div className='flex flex-col h-52 gap-3 px-5 py-4 border-2 border-gray-100 '>
                  <p className='font-bold text-[22px]'>About Me</p>
                  <p>{doctor.doctors[0].about}</p>
                </div>
              </div>

              {/* suggestions */}
              <div className='w-[25%] flex flex-col px-5 py-4 border-2 border-gray-100 h-[510px] overflow-y-scroll ansh'>
                <p className='font-bold text-[22px]'>Suggestions</p>
                <div className='flex flex-col gap-8 py-4 mt-4 cursor-pointer'>
                  {otherDoctors.map((ele) => (
                    <div key={ele._id} className='flex hover:bg-blue-200 transition-all duration-200 rounded-lg px-2 py-2 w-full flex-row gap-5 items-center justify-start' onClick={() => navigate(`/doctor/${ele._id}`)}>
                      <img src={ele.image} alt="" className='rounded-full object-cover w-[80px] h-[80px] border-[1px] border-gray-100' />
                      <div className='flex flex-col '>
                        <p className='text-sm font-semibold'>{ele.name}</p>
                        <p className='text-blue-500 text-sm font-medium'>{ele.years} Years</p>
                        <p className='text-blue-500 cursor-pointer font-semibold text-sm bg-blue-100 mt-1 rounded-xl py-1 px-2 w-fit text-center'>{ele?.category?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-row gap-3 mt-20 min-h-[50vh] items-center justify-center'>
            <p className=' text-4xl font-semibold '>No such doctors exist! </p>
            <ImSad size={40}/>
          </div>
        )}

        {/* Appointment booking */}
        {showModal && (
          <div className='absolute bg-gray-100 shadow-xl top-[200px] right-[680px] flex flex-col h-fit w-[300px] rounded-xl border-gray-300 border-2'>
            <div className='px-3 py-5 flex flex-col gap-4'>
              <p className='text-[17px] font-medium'>Select Appointment Timings</p>
              <div className='flex flex-col gap-1'>
                <p>Select Time</p>
                <input type="time" className="w-full h-9 outline-0" min="09:00" max="18:00" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
              </div>
              <div>
                <p>Select Date</p>
                <input type="date" className="w-full h-9 outline-none" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className='flex items-center justify-center gap-4'>
                <button className='mt-1 bg-blue-600 text-white font-medium hover:bg-blue-600 transition-all duration-200 rounded-lg px-2 py-1' onClick={handleSaveTimings}>Save Timings</button>
                <button className='mt-1 bg-gray-600 text-white font-medium hover:bg-gray-700 transition-all duration-200 rounded-lg px-2 py-1' onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
