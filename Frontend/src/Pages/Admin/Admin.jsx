import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route ,Routes} from 'react-router-dom'
import Createdoctor from '../CreateDoctor/Createdoctor'
import CreatePatient from '../CreatePatient/CreatePatient'
import Allappointment from '../Allappointmenthead/Allappointment'
import Allpatient from '../Allpatienthead/Allpatient'
import Alldoctorshead from '../AllDoctorshead/Alldoctorshead'
import PrivateRouteHead from '../PrivateRouteHead'

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
        <Route path='/' element={<PrivateRouteHead Component={<Createdoctor/>}/>}/>

        {/* <Route path='/myAppoitment' element={<PrivateRoutes Component={DoctorAppintment}/>}/> */}

          {/* <Route path='createDoctor' element={<Createdoctor/>}/>
          <Route path='alldoctor' element={<Alldoctorshead/>}/>
          <Route path='allpatient' element={<Allpatient/>}/>
          <Route path='allappointments' element={<Allappointment/>}/> */}

          <Route path='createDoctor' element={<PrivateRouteHead Component={Createdoctor}/>}/>
          <Route path='alldoctor' element={<PrivateRouteHead Component={Alldoctorshead}/>}/>
          <Route path='allpatient' element={<PrivateRouteHead Component={Allpatient}/>}/>
          <Route path='allappointments' element={<PrivateRouteHead Component={Allappointment}/>}/>
          {/* <Route path='/' element={<PrivateRouteHead Component={Createdoctor}/>}/> */}
          {/* <Route path='createPatient' element={<CreatePatient/>}/> */}

        </Routes>
       </div>
    </div>
  )
}

export default Admin