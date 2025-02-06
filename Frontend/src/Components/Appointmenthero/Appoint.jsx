import React from 'react'
import './Appoint.css'
import hero from './appointimg/appointdoc.png'
import { FaArrowRightLong } from "react-icons/fa6";

const Appoint = () => {
  return (
      <div className="continer mt-[3rem]">
          <div className="hero-bg-color">
        <div className='hero-container'>
          <div className="left-hero">
            <h1>Book Appointment with 100+ Trusted Doctors</h1>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt officia non deserunt magni aut eveniet, iste consectetur ea cupiditate adipisci.</p> */}
            <button className='book-btn m-[auto]'>Create Account <span><FaArrowRightLong /></span></button>
          </div>
          <div className="right-hero">
            <img src={hero}/>
          </div>
        </div>
        </div>
        </div>
  )
}

export default Appoint