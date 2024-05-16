import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/User.jsx'
import { DoctorProvider } from './context/Doctors.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <DoctorProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </DoctorProvider>
  </AuthProvider>

)



