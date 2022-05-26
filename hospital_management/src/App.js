import React, {useState} from "react";
import './App.css';
import Nav from './Nav';
import Equipment from './Equipment';
import Home from './Home';
import Appointment from './Appointment';
import Login from './Login';
import Bills from './Bills';
import PayBills from './PayBills';
import Register from './Register'
import AdminLogin from './AdminLogin'
import Doctor from './Doctor'
import Popup from './Popup'
import AdminDash from './AdminDash'
import Patients from './Patients'
import Admins from "./Admins";
import Doctors from './DoctorCrud';
import ProfilePatients from "./ProfileUpdate";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Equipment" element={<Equipment />} />
            <Route exact path="/Appointment" element={<Appointment />} />
            <Route exact path="/Bills" element={<Bills />} />
            <Route exact path="/PayBills" element={<PayBills />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Admin-login" element={<AdminLogin />} />
            <Route exact path="/Doctor" element={<Doctor />} />
            <Route exact path="/Popup" element={<Popup />} />
            <Route exact path="/Doctor" element={<Doctor />} />
            <Route exact path="Admin-dash" element={<AdminDash />} />
            <Route exact path="Admins" element={<Admins />} />
            <Route exact path="Patients" element={<Patients />} />
            <Route exact path="Doctors" element={<Doctors />} />
            <Route exact path="/ProfilePatients" element={<ProfilePatients />} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;
