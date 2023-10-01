
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes } from 'react-router-dom'
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
import { SuppliesContextProvider } from './Context/SuppliesContext'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

          {/* PATIENT SIDE */}
          <Route path='/patient' element={<Patient/>}/>
          <Route path='services' element={<Services/>} />
          <Route path='booking' element={<Booking/>} />
          <Route path='/patient/announcements' element={<AnnouncementsPtn/>}/>
          <Route path='/patient/changepassowrd' element={<ChangePassword/>}/>
          <Route path='/patient/myprofile' element={<MyProfile/>}/>

          {/* ADMIN SIDE */}
          <Route path='/admin' element={<Employee/>}/>
          
          <Route path='/admin/supplies' 
          element={
          <SuppliesContextProvider>
            <Supplies/>  
          </SuppliesContextProvider>}/>
        
          <Route path='/admin/announcements' element={<AnnouncementsAmn/>}/>
        </Routes>
    </>
  )
}

export default App
