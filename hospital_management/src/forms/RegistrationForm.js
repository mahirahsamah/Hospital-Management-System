//Asad Ali
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistrationForm() {

  const navigate = useNavigate();
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [street_addr, setStreet_addr] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [password, setPassword] = useState("")
  const [zip_code, setZip_code] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = {
      'fname' : fname,
      'lname' : lname,
      'dob' : dob,
      'gender' : gender,
      'street_addr' : street_addr,
      'state' : state,
      'email' : email,
      'phone_number': phone_number,
      'password' : password,
      'zip_code' : zip_code
    }
    console.log("The form was submitted with the following data:");
    console.log(formDetails);

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails)
    };

    fetch('http://localhost:3001/patients', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        navigate('/login')
      })
      .catch(error => {
          alert('There was an error, try selecting a new unique email')
          console.error('There was an error!', error);
      });
  }

  return (
    <div className="formCenter">
      <form onSubmit={handleSubmit} className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="fname">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            className="formFieldInput"
            placeholder="Enter your first name"
            name="fname"
            required
            onChange={e => setFname(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="lname">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            className="formFieldInput"
            placeholder="Enter your last name"
            name="lname"
            required
            onChange={e => setLname(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="formFieldInput"
            name="dob"
            required
            onChange={e => setDob(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="gender">
            Gender
          </label>
          <select name="gender" id="gender" className="formStateInput" defaultValue={'DEFAULT'} onChange={e => setGender(e.target.value)}>
            <option value="DEFAULT" disabled>Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Do not wish to disclose</option>
          </select>
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="street_addr">
            Street Address
          </label>
          <input
            type="text"
            id="street_addr"
            className="formFieldInput"
            placeholder="Type Street Address"
            name="street_addr"
            required
            onChange={e => setStreet_addr(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="state">
            State
          </label>
          <select name="state" id="state" className="formStateInput" defaultValue={'DEFAULT'} onChange={e => setState(e.target.value)}>
            <option value="DEFAULT" disabled>Select a State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="zip_code">
            Zip Code
          </label>
          <input
            type="number"
            min="0"
            max="99999"
            id="zip_code"
            className="formFieldInput"
            placeholder="77840"
            name="zip_code"
            required
            onChange={e => setZip_code(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="phone_number">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            className="formFieldInput"
            placeholder="979-123-4567"
            name="phone_number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            onChange={e => setPhone_number(e.target.value)}
          />
        </div>
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
            required
            value={email}
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
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign Up</button>{" "}
          <Link to="/Login" className="formFieldLink">
            I'm already a member
          </Link>
        </div>
      </form>
    </div>
  );
}
export default RegistrationForm;
