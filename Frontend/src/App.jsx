import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './Pages/Register/Register'
// import Login from './Pages/Register'
// import Home from './Pages/Register'
import Home from './Pages/Home/Home'
import AllDoctor from './Pages/AllDoctor/AllDoctor'
import Contact from './Pages/Contact/Contact'
import About from './Pages/About/About'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login/Login'
import Form from './Pages/Form/Form'
import Admin from './Pages/Admin/Admin'
import Appointmentform from './Pages/AppointmentForm/Appointmentform'
import DoctorAppintment from './Pages/DoctorAppointment/DoctorAppintment'
import PatientAppointment from './Pages/PatientAppointment/PatientAppointment'
import DoctorPreAppointment from './Pages/DoctorPreAppointment/DoctorPreAppointment'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
        {/* <Route path='/' element={<Register/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/home' element={<Home/>}/>
        <Route path='/alldoctor' element={<AllDoctor/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/appointment' element={<Appointmentform/>}/>
        <Route path='/myAppoitment' element={<DoctorAppintment/>}/>
        <Route path='/myPreviousAppoitment' element={<DoctorPreAppointment/>}/>

        <Route path='/patientAppointment' element={<PatientAppointment/>}/>


        {/* <Route path='/about' element={<About/>}/> */}
      </Routes>
    <Footer/>

    </>
  )
}

export default App
