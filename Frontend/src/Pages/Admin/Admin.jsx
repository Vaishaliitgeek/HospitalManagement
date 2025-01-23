import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route ,Routes} from 'react-router-dom'
import Createdoctor from '../CreateDoctor/Createdoctor'
import CreatePatient from '../CreatePatient/CreatePatient'
import Allappointment from '../Allappointmenthead/Allappointment'
import Allpatient from '../Allpatienthead/Allpatient'
import Alldoctorshead from '../AllDoctorshead/Alldoctorshead'

const Admin = () => {
  return (
    <div className='admin-dashboard'>
      <div className="admin-side">
      <Sidebar/>

      </div>
       <div className="admin-pages">
        {/* <Createdoctor/> */}
        <Routes>
        <Route path='/' element={<Createdoctor/>}/>

          <Route path='createDoctor' element={<Createdoctor/>}/>
          <Route path='alldoctor' element={<Alldoctorshead/>}/>
          <Route path='allpatient' element={<Allpatient/>}/>
          <Route path='allappointments' element={<Allappointment/>}/>


          {/* <Route path='createPatient' element={<CreatePatient/>}/> */}

        </Routes>
       </div>
    </div>
  )
}

export default Admin