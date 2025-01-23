import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import Category from '../../Components/Category/Category'
import AllDoctor from '../AllDoctor/AllDoctor'
import Appoint from '../../Components/Appointmenthero/Appoint'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Hero/>
    <Category/>
    <AllDoctor/>
    <Appoint/>
    {/* <Footer/> */}
    {/* <div>Home</div> */}

    </>
  )
}

export default Home