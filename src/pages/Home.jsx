import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Category from './Category'
import Doctors from './Doctors'
import Footer from '../components/Footer'
import Question from './Question'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Category/>
      <Doctors/>
      <Question/>
      <Footer/>

      
    </div>
  )
}
