import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ImSad } from 'react-icons/im';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user-messages');
        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };
    fetchMessages();
  }, []);

  const handleMessageSend = async () => {
    if (!doctorId) {
      toast.error('Doctor ID not found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/send-message', {
        doctorId,
        message,
      });
      if (response.data.success) {
        toast.success('Message sent successfully');
        setMessage('');
        setIsModalOpen(false);
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred while sending the message');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`relative ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="px-6 sm:px-12 lg:px-24 py-8 flex flex-col min-h-[68vh] transition-all duration-300">
          <div className="w-full mb-5 mt-3 font-semibold text-blue-700 text-3xl flex flex-row items-center px-5 py-6 gap-5 h-10 rounded-lg bg-blue-100">
            <p className="text-center mx-auto">My Inbox</p>
          </div>
          <div className="space-y-4">
            {messages?.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-4 cursor-pointer border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Message from: {msg.user}
                  </h2>
                  <p className="text-md text-gray-700 mb-3">{msg.message}</p>
                  <p className="text-sm text-gray-500">
                    Received on: {new Date(msg.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button
                       onClick={() => { setIsModalOpen(true); setDoctorId(msg.userId); }}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-500">No messages found</p>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96 z-50">
            <h3 className="text-2xl font-semibold mb-4">Reply to Message</h3>
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
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button onClick={handleMessageSend}
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Reply
                </button>
              </div>
            
          </div>
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
