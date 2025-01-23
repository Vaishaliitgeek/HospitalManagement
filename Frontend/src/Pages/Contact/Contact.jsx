import React from 'react'
import './Contact.css'
import contactimg from './imgcontact/contactimg.png'
const Contact = () => {
  return (
    <div className='contact-div'>
      <div className="continer">
        <h1 className='m-h'>CONTACT US</h1>
        <div className="contact-sec">
          <div className="left-contact">
            <img src={contactimg}/>
          </div>
          <div className="right-contact">
            <h3>OUR OFFICE</h3>
            <p className='mt-[1rem]'>0000 Williams Station</p>
            <p>Suite 000,Washington,USA</p>
            <p className='mt-[1rem]'><span>Tel:</span>0000-000-000</p>
            <p><span>Email:</span>bhhb@gmail.com</p>
            <h3 className='mt-[1rem]'>CAREERS AT PRESCRIPTO</h3>
            <p>Learn more about our team and job openings</p>
            <button className='explore-btn mt-[1rem]'>Explore Jobs</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact