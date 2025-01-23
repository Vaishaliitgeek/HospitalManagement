import React from 'react'

const CreatePatient = () => {
  return (
    <div className='doctor-create-box'>
      <h3>Create Patient</h3>
      <form className='createForm'>
      <div className="row">
      <input type='text' placeholder='Firstname'/>
      <input type='text' placeholder='Lastname'/>

      </div>
      <div className="row">
      <input type='email' placeholder='Email'/>
      <input type='password' placeholder='Password'/>

      </div>
      <div className="row">
      <input type='specialization' placeholder='specialization'/>
      <input type='number' placeholder='Phone Number'/>

      </div>
      <div className="row">
      <input type='file' placeholder='Upload your image'/>

      </div>
      <button className='submit-btn1'> Submit </button>
      </form>
        
        
        
        </div>
  )
}

export default CreatePatient