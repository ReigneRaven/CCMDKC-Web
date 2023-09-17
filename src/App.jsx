import { useState } from 'react'
import './App.css'
import Landing from './landing-page/land-pg'
import { Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
    </>
  )
}

export default App
