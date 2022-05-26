import React from "react";
import { HashRouter as Routes, Route, NavLink } from "react-router-dom";

import './Login.css';
import SignInForm from "./forms/SignInForm";


function AdminLogin() {
    return (
        <div className="Login">
          <div className="loginAside" />
          <div className="loginForm">

            <div className="formTitle">
              <h1>Admin Login</h1>
            </div>
            <SignInForm postLink={'http://localhost:3001/admin-login'}/>
          </div>
        </div>
    );
  }

export default AdminLogin;

