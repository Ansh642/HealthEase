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
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='overflow-auto outfit-ansh'>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/reset-password' element={<ResetPass/>}/>
       <Route path='/:name' element={<CategoryFilter/>}/>
       <Route path='/doctor/:id' element={<DoctorFilter/>}/>
       <Route path='/explore' element={<Explore/>}/>
       <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
