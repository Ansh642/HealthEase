import './App.css'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import CategoryFilter from './pages/CategoryFilter'
import Explore from './pages/Explore'
import ContactUs from './pages/ContactUs'
import ResetPass from './pages/ResetPass'
import DoctorFilter from './pages/DoctorFilter'
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking'
import SearchFilter from './pages/SearchFilter'
import DoctorSignup from './pages/doctor/DoctorSignup'
import Private from './pages/Private'
import Appointments from './pages/doctor/Appointments'
import Ai from './pages/Ai'

function App() {

  return (
    <div className='overflow-auto outfit-ansh'>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signup-doctor' element={<DoctorSignup/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/reset-password' element={<ResetPass/>}/>
       <Route path='/:name' element={<CategoryFilter/>}/>
       <Route path='/doctor/:id' element={<DoctorFilter/>}/>
       <Route path='/explore' element={<Explore/>}/>
       <Route path='/contact' element={<ContactUs/>}/>
       <Route path='/search' element={<SearchFilter/>}/>
       <Route path='/ai' element={<Ai/>}/>

       <Route path="/" element={<Private/>}> 
         <Route path='bookings' element={<Booking/>}/>
       </Route>

       <Route path="/" element={<Private/>}> 
         <Route path='appointments' element={<Appointments/>}/>
       </Route>

      </Routes>
      <Toaster />
    </div>
  )
}
 
export default App
