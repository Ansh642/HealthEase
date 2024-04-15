import './App.css'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Category from './pages/Category'
import Doctors from './pages/Doctors'
import Footer from './components/Footer'

function App() {

  return (
    <div>
      <Navbar/>
      <Hero/>
      <Category/>
      <Doctors/>
      <Footer/>
    </div>
  )
}

export default App
