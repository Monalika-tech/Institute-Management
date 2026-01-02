import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import ClassPage from './pages/ClassPage';
import StudentDetails from './pages/StudentDetails';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path ="/class/:classLevel" element={<ClassPage/>}/>
        <Route path = "/students/:id" element={<StudentDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
