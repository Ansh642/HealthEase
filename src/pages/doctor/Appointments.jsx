import React,{useEffect, useState} from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { CiCalendarDate } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ImSad } from "react-icons/im";


export default function Appointments() {

  const [select, setselect] = useState("Upcoming");
  const [bookings, setbookings] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);  
  const navigate = useNavigate();
  

  useEffect( ()=>{
    const fetchDetails = async(req,res)=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/get-appointments");
  
        if(response.data.success)
        {
          //console.log(response.data.appointments); 
          setbookings(response.data.appointments);
        }
      }
      catch(err){
        console.log(err.message);
      }
    }

    fetchDetails();
  },[])


  const cancelAppointment =async(id)=>{
    try{
      const response = await axios.post('http://localhost:4000/api/v1/complete-appointment',{
        id:id
      });

      if(response.data.success)
      {
        toast.success("Booking completed successfully");
        navigate("/");
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }

  const handleMessageSend = async () => {
    if (!userId) {
      toast.error('Doctor ID not found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/send-messages', {
        userId,
        message,
      });
      if (response.data.success) {
        toast.success('Message sent successfully');
        setMessage('');
        setVisible(false);
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred while sending the message');
    }
  };


  return (
    <div>
        <>
        <Navbar/>

       <div className={`px-24 py-6 flex flex-col min-h-[68vh] transition-all duration-300 ${visible ? 'blur-sm' : ''}`}> 
       <div className='w-full mb-3 mt-3 font-semibold text-blue-700 text-3xl flex flex-row items-center px-5 py-6 gap-5 h-10 rounded-lg bg-blue-100'>
        <p className='text-center mx-auto'>My Bookings </p>
      </div>

        <div>
        {
        bookings && bookings.length > 0 ? (
          bookings.map((ele, index) => (
            <div className='flex flex-row gap-3 h-fit w-full border-[1px] border-gray-300 mt-3 rounded-lg justify-start px-5 py-6' key={ele._id}>
              <img src={ele.user.image} alt="" width={130} height={130}/>

              <div className='flex flex-col gap-2 ml-2 mt-2'>
                <p className='font-semibold text-[20px] capitalize'>{ele?.user?.name}</p>
                {/* <p className='flex flex-row gap-1 items-center'> <TfiLocationPin size={20} /> Near {ele.address}</p> */}
                <p className='flex flex-row gap-1 items-center'> <CiCalendarDate  size={20} /> Appointment On : <span className='font-medium'>{ele.date}</span></p>
                <p className='flex flex-row gap-1 items-center'> <CiClock1   size={20} /> At - <span className='font-medium'>{ele.time} hours</span></p>
              </div>

              <div className='flex flex-col gap-4'>
              <button className='ml-[710px] border-2 h-fit w-fit rounded-lg border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 bg-white px-7 py-1' onClick={() => cancelAppointment(ele._id)}>
                  Mark as done
              </button>

              <button className='ml-[710px] border-2 h-fit w-fit rounded-lg border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 bg-white px-2 py-1' onClick={() => { setVisible(true); setUserId(ele.user._id); }}>
                  Message patient 📲
              </button>
              </div>

            </div>
          ))
        ) : (
          <div className='flex flex-row gap-3 mt-40 items-center justify-center'>
            <p className=' text-4xl font-semibold'>No bookings found! </p>
            <ImSad size={40}/>
          </div>
        )
      }
      </div>


       </div>

       {/* Chat Box */}
       {visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96 z-50">
            <h3 className="text-2xl font-semibold mb-4">Send Message</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Type your reply here..."
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button onClick={handleMessageSend}
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Message
                </button>
              </div>
            
          </div>
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
            onClick={() => setVisible(false)}
          ></div>
        </div>
      )}

    <Footer/>

    </>
    </div>
  )
}


