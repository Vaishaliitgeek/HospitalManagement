import React from 'react'
import './Footer.css'
import logo from './footericon/logo.svg'
const Footer = () => {
  return (
    <div className="footer-main-div">
<div className='continer'>
  <div className="footer-div">
   <div className="foo foo1">
  <img src={logo} className='logo'/>
  <div className="foo-content">
  <p>Lorem ipsum dolor sit amet consectd sequi tenetur possimus.  expedita laborum reiciendis delectus ratione nostrum assumenda eaque, molestias mollitia est incidunt placeat quisquam id?</p>
   </div>
   </div>
   <div className="foo">
   
    <h2>Company</h2>
    <div className="foo-content">
    <li>Home</li>
    <li>About US</li>
    <li>Delievery</li>
    <li>Privacy Policy</li>
    </div>
   </div>
   <div className="foo">
   
    <h2>GEt In Touch</h2>
    <div className="foo-content">
    <p className='mb-[10px]'>+667-678-7890</p>
    <p>bhb@gmail.com</p>
    </div>
   </div>
   </div>
   </div>
    </div>
    
  )
}

export default Footer