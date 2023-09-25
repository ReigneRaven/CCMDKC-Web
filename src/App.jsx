import { useState } from 'react'
import './App.css'
import Landing from './pages/landing-page/land-pg'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register-page/register'
import ForgotPassword from './pages/forgotpass-page/forgotpass'
import Patient from './pages/patient-page/patient-profile'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/patient' element={<Patient/>}/>
        </Routes>
    </>
  )
}

export default App
