import React, {useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div className="topnav">
        {(localStorage.getItem('patient_id') != null) && 
        (
        <nav>
            <div>
            <Link activeClassName="active" to={'/'}>
            <a >Home</a>
            </Link>
            </div>  
            <div>
                <div>
                <Link activeClassName="active" to={'/Appointment'}>
                <a >Appointments</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/PayBills'}>
                <a>Pay Bills</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/ProfilePatients'}>
                <a >Profile </a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Login'}>
                <a onClick={() => localStorage.clear()}>Log Out </a>
                </Link>
                </div>
            </div>
        </nav>)}
        {(localStorage.getItem('patient_id') == null) && 
        (
            <nav>
                {(localStorage.getItem('admin') == null) && (
                <div>
                <div>
                <Link activeClassName="active" to={'/'}>
                <a >Home</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Login'}>
                <a >Login/Signup</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Popup'}>
                <a>Doctor Login</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Admin-login'}>
                <a >Admin Login</a>
                </Link>
                </div>
                </div>)}
            </nav>)}
        {(localStorage.getItem('admin') == 'true') && 
        (
            <nav>
                <div>
                <Link activeClassName="active" to={'/Admin-dash'}>
                <a >Dashboard</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Doctors'}>
                <a >Doctors</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Equipment'}>
                <a>Equipment</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Patients'}>
                <a >Patients</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Admins'}>
                <a >Admins</a>
                </Link>
                </div>
                <div>
                <Link activeClassName="active" to={'/Admin-login'}>
                <a onClick={() => localStorage.clear()}>Log Out </a>
                </Link>
                </div>
            </nav>)}
        </div>
    );
}

export default Nav