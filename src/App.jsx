
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes } from 'react-router-dom'
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
import ResetPassword from './pages/resetpass-page/resetpass'
import Supplies from './pages/supplies-page/supplies'
import PatientRecord from './pages/records-page/patientrecord-page/patientrecord'
import MedicalRecord from './pages/medicalhistory-page/healthhistory'
import PharmacyPtn from './pages/pharmacy-page-ptn/pharmacyptn'
import Reports from './pages/reports-page/reports'
import ProtectedUserRoutes from './components/protectedroutes/ProtectedUserRoutes'
import ProtectedAdminRoutes from './components/protectedroutes/ProtectedAdminRoutes'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword' element={<ResetPassword/>} />

          {/* PATIENT SIDE */}
          <Route path='/patient/:id' element={<ProtectedUserRoutes><Patient/></ProtectedUserRoutes>}/>
          <Route path='/appointment/:id' element={<ProtectedUserRoutes><Appointment/></ProtectedUserRoutes>} />
          <Route path='/confirmation/:id' element={<ProtectedUserRoutes><Booking/></ProtectedUserRoutes>} />
          <Route path='/healthrecord/:id' element={<ProtectedUserRoutes><MedicalRecord/></ProtectedUserRoutes>} />
          <Route path='/announcements/:id' element={<ProtectedUserRoutes><AnnouncementsPtn/></ProtectedUserRoutes>}/>
          <Route path='/pharmacy/:id' element={<ProtectedUserRoutes><PharmacyPtn/></ProtectedUserRoutes>}/>
          <Route path='/patient/changepassword/:id' element={<ProtectedUserRoutes><ChangePassword/></ProtectedUserRoutes>}/>
          <Route path='/patient/myprofile/:id' exact element={<ProtectedUserRoutes><MyProfile /></ProtectedUserRoutes>} />

          {/* ADMIN SIDE */}
          <Route path='/admin/:id' element={<ProtectedAdminRoutes><Employee/></ProtectedAdminRoutes>}/>
          <Route path='/admin/supplies/:id' element={<ProtectedAdminRoutes><Supplies/></ProtectedAdminRoutes>}/>
          <Route path='/admin/patientrecord/:id' element={<ProtectedAdminRoutes><PatientRecord/></ProtectedAdminRoutes>}/>
          <Route path='/admin/reports/:id' element={<ProtectedAdminRoutes><Reports/></ProtectedAdminRoutes>}/>
          <Route path='/admin/announcements/:id' element={<ProtectedAdminRoutes><AnnouncementsAmn/></ProtectedAdminRoutes>}/>


        </Routes>
    </>
  )
}

export default App