
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register-page/register'
import Patient from './pages/patient-page/patient-profile'
import Announcements from './pages/announce-page/announce'
import Employee from './pages/employee-page/employee'
import MyProfile from './pages/myprofile-page/myprofile'
import ChangePassword from './pages/changepass-page/changepass'
import ForgotPassword from './pages/forgotpass-page/forgotpass'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

          {/* PATIENT SIDE */}
          <Route path='/patient' element={<Patient/>}/>
          <Route path='/patient/announcements' element={<Announcements/>}/>
          <Route path='/patient/changepassowrd' element={<ChangePassword/>}/>
          <Route path='/patient/myprofile' element={<MyProfile/>}/>

          {/* ADMIN SIDE */}
          <Route path='/admin' element={<Employee/>}/>
          <Route path='/admin/announcements' element={<Announcements/>}/>
        </Routes>
    </>
  )
}

export default App
