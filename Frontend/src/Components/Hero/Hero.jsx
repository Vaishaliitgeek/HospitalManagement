import React from 'react'
import './Hero.css'
import hero from './heroasset/heroimg.png'
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="continer">
      <div className="hero-bg-color">
    <div className='hero-container'>
      <div className="left-hero">
        <h1>Book Appointment with Trusted Doctors</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt officia non deserunt magni aut eveniet, iste consectetur ea cupiditate adipisci.</p>
        <button className='book-btn'>Book An Appointment <span><FaArrowRightLong /></span></button>
      </div>
      <div className="right-hero">
        <img src={hero}/>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Hero