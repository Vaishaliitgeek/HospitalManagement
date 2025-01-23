import React from 'react'
import './doctorcard.css'
import docimg from './img/doc1.png'
import { GoDotFill } from "react-icons/go";
const Doctorcard = ({item}) => {
  console.log(item)
  const BASE_URL = 'http://localhost:5000/'; 
  return (
    <div className='doctor-card'>
      <div className="img-doc-bg"><img src={`${BASE_URL}${item.image}`} /> </div>
      {/* <img 
                      src={`${BASE_URL}${item.image}`} 
                      alt={`${item.firstName}'s profile`} 
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                    /> */}
      <div className="doctor-content">
      <p className='doc-status'><span><GoDotFill /></span> Available</p>
      <h4>{item.firstName} {item.LastName}</h4>
      <p>{item.specialization}</p>
      </div>
     

    </div>
  )
}

export default Doctorcard