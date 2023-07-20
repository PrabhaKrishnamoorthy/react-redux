
import React from 'react';
import AuthenticationForm from './components/loginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employeedet from './components/employees';
//import Employees from './components/employees';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<AuthenticationForm isLogin={true}/>}/>
      <Route path="/login" element={<AuthenticationForm isLogin={true}/>}/>
      <Route path="/register" element={<AuthenticationForm isLogin={false}/>}/>
      <Route path="/api/employees/" element ={<Employeedet />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;