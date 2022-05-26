//Asad Ali
import React from "react";
import { HashRouter as Routes, Route, NavLink } from "react-router-dom";

import './Login.css';
import RegistrationForm from "./forms/RegistrationForm";
import SignInForm from "./forms/SignInForm";


function Register() {
    return (
        <div className="Login">
          <div className="loginAside" />
          <div className="loginForm">
          <div className="pageSwitcher">
              <NavLink
                to="/Login"
                className={(navData) => (navData.isActive ? "pageSwitcherItem-active": "pageSwitcherItem")}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/Register"
                className={(navData) => (navData.isActive ? "pageSwitcherItem-active": "pageSwitcherItem")}
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/Login"
                className={(navData) => (navData.isActive ? "formTitleLink-active": "formTitleLink")}
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                to="/Register"
                className={(navData) => (navData.isActive ? "formTitleLink-active": "formTitleLink")}
              >
                Sign Up
              </NavLink>
            </div>
            <RegistrationForm />
          </div>
        </div>
    );
  }

export default Register;

