import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword/ResetPassword';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
