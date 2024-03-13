import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import SignIn from './Components/Login';
import Dashboard from './Components/Dashboard';
import ClaimForm from './Components/ClaimForm';

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Register />} />
        </Routes>
        <Routes>
        <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Routes>
        <Route path="/claim-form" element={<ClaimForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
