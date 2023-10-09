
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes, useParams } from 'react-router-dom'
import Register from './pages/register-page/register'
import Patient from './pages/patient-page/patient-profile'
import Services from './pages/services-page/services'
import Booking from './pages/services-page/booking-page/booking'
import AnnouncementsPtn from './pages/announce-page-ptn/announce'
import AnnouncementsAmn from './pages/announce-page-amn/announce-admn'
import Employee from './pages/employee-page/employee'
import MyProfile from './pages/myprofile-page/myprofile'
import ChangePassword from './pages/changepass-page/changepass'
import ForgotPassword from './pages/forgotpass-page/forgotpass'
import Supplies from './pages/supplies-page/supplies'
import Records from './pages/records-page/records'
import PatientRecord from './pages/records-page/patientrecord-page/patientrecord'

function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

          {/* PATIENT SIDE */}
          <Route path='/patient/:id' element={<Patient/>}/>
          <Route path='/services/:id' element={<Services/>} />
          <Route path='/booking/:id' element={<Booking/>} />
          <Route path='/announcements/:id' element={<AnnouncementsPtn/>}/>
          <Route path='/patient/changepassword/:id' element={<ChangePassword/>}/>
          <Route path='/patient/myprofile/:id' exact element={<MyProfile />} />

          {/* ADMIN SIDE */}
          <Route path='/admin' element={<Employee/>}/>
          <Route path='/admin/supplies' element={<Supplies/>}/>
          <Route path='/admin/records' element={<Records/>}/>
          <Route path='/admin/patientrecord' element={<PatientRecord/>}/>
          <Route path='/admin/announcements' element={<AnnouncementsAmn/>}/>
        </Routes>
    </>
  )
}

export default App
