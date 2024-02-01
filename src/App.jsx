
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes, useParams } from 'react-router-dom'
import Register from './pages/register-page/register'
import Patient from './pages/patient-page/patient-profile'
import Appointment from './pages/appointment-page/appointment'
import Booking from './pages/appointment-page/booking-page/booking'
import AnnouncementsPtn from './pages/announce-page-ptn/announce'
import AnnouncementsAmn from './pages/announce-page-amn/announce-admn'
import Employee from './pages/employee-page/employee'
import MyProfile from './pages/myprofile-page/myprofile'
import ChangePassword from './pages/changepass-page/changepass'
import ForgotPassword from './pages/forgotpass-page/forgotpass'
import Supplies from './pages/supplies-page/supplies'
import PatientRecord from './pages/records-page/patientrecord-page/patientrecord'
import MedicalRecord from './pages/medicalhistory-page/healthhistory'
import PharmacyPtn from './pages/pharmacy-page-ptn/pharmacyptn'
import Reports from './pages/reports-page/reports'

function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

          {/* PATIENT SIDE */}
          <Route path='/patient/:id' element={<Patient/>}/>
          <Route path='/appointment/:id' element={<Appointment/>} />
          <Route path='/confirmation/:id' element={<Booking/>} />
          <Route path='/healthrecord/:id' element={<MedicalRecord/>} />
          <Route path='/announcements/:id' element={<AnnouncementsPtn/>}/>
          <Route path='/pharmacy/:id' element={<PharmacyPtn/>}/>
          <Route path='/patient/changepassword/:id' element={<ChangePassword/>}/>
          <Route path='/patient/myprofile/:id' exact element={<MyProfile />} />

          {/* ADMIN SIDE */}
          <Route path='/admin/:id' element={<Employee/>}/>
          <Route path='/admin/supplies/:id' element={<Supplies/>}/>
          <Route path='/admin/patientrecord/:id' element={<PatientRecord/>}/>
          <Route path='/admin/reports/:id' element={<Reports/>}/>
          <Route path='/admin/announcements/:id' element={<AnnouncementsAmn/>}/>


        </Routes>
    </>
  )
}

export default App