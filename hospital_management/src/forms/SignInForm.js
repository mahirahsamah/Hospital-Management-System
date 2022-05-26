//Asad Ali
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInForm(props) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) =>  {
    e.preventDefault();
    const formDetails = {
      "email" : email,
      "password" : password
    }
    console.log("The form was submitted with the following data:");
    console.log(formDetails);
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails) 
    };

    fetch(props.postLink, requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        console.log(data) 
        if (data.id != null) {
          if (props.postLink == 'http://localhost:3001/admin-login') {
            localStorage.setItem('admin', true)
            navigate('/admin-dash')
          } else {
            localStorage.setItem('patient_id', data.id)
            navigate('/')  
          }
        } else {
          alert("Incorrect email and/or password. Try again")
        }

      })
      .catch(error => {
          console.error('There was an error!', error);
          alert("This email does not exist, try again or register first")
      });
  }

  return (
    <div className="formCenter">
      <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {(props.postLink != 'http://localhost:3001/admin-login') && 
          <div className="formField">
            <Link to="/Register" className="formFieldLink">
              Create an account
            </Link>
          </div>
        }
        <button className="formFieldButton">Sign In</button>{" "}

      </form>
    </div>
  );
}

export default SignInForm;
