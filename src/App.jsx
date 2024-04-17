import './App.css'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import CategoryFilter from './pages/CategoryFilter'

function App() {

  return (
    <div className='overflow-auto'>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/:name' element={<CategoryFilter/>}/>
      </Routes>
    </div>
  )
}

export default App
