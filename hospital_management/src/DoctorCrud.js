// BY: MAHIRAH SAMAH

import React, { useState, useEffect } from "react";
import { HashRouter as Routes, Route, NavLink } from "react-router-dom";

import './Appointment.css';
import DoctorModal from './forms/DoctorModal'

function Doctors() {

  const [doctorData, setDoctorData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState([]);
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [field, setField] = useState("")
  const [salary, setSalary] = useState("")

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:3001/doctors')
    .then(async response => {
        const data = await response.json();
        setDoctorData(doctorData => [...doctorData, data])
        console.log(data)
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  const handleDelete = (id) => {
    // DELETE request using fetch with error handling
    fetch(`http://localhost:3001/doctor/${id}`, { method: 'DELETE' })
    .then(window.location.reload(false))
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  const handleModal = (ent) => {
    setOpenModal(true)
    setEntity(ent)
  }

  const renderTableData = () => {
    return doctorData[0].map((doctor, index) => {
       const { doctor_id, doctor_fname, doctor_lname, doctor_field, doctor_salary } = doctor //destructuring
        return (
        <tr>
            <td>{doctor_id}</td>
            <td>{ doctor_fname + " " + doctor_lname }</td>
            <td>{doctor_field }</td>
            <td>{ doctor_salary }</td>
            <td><button onClick={() => {if(window.confirm('Are you sure you want to remove this doctor from the system?')){handleDelete(doctor_id)};}}>Remove Doctor</button>
            <button onClick={() => handleModal(doctor)}>Update Doctor</button>
            </td>
        </tr>
      )
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = {
      'doctor_fname' : fname,
      'doctor_lname' : lname,
      'doctor_field' : field,
      'doctor_salary' : salary
    }
    console.log("The Admin was added successfully:");
    console.log(formDetails);

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails)
    };

    fetch('http://localhost:3001/doctors', requestOptions)
    .then(alert("Doctor Added"))
    .then(window.location.reload(false))
    .catch(error => {
        console.error('There was an error!', error);
    });
  }


  if (doctorData.length > 0) {
    return (
      <div>
        {openModal && <DoctorModal setOpenModal={setOpenModal} entity={entity}/>}
        <div className="profile-body">
          <div className="profile-header">
            <h1>Doctors</h1>
          </div>
          <table id='doctors' className="crud-table">
            <tbody><tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Field</th>
            <th>Salary</th>
            </tr>
              {renderTableData()}
            </tbody>
          </table>
        </div>
          <form onSubmit={handleSubmit}>
          <h2>Add Doctor</h2>
          <input
              type="text"
              id="fname"
              className="crud-input"
              placeholder="Enter Dr. first name"
              name="fname"
              onChange={e => setFname(e.target.value)}
              required
            />
            <label className="" htmlFor="lname">
            </label>
            <input
              type="text"
              id="lname"
              className="crud-input"
              placeholder="Enter Dr. last name"
              name="lname"
              onChange={e => setLname(e.target.value)}
              required
            />
            <label className="" htmlFor="street_addr">
            </label>
            <input
              type="text"
              id="field"
              className="crud-input"
              placeholder="Enter Dr. field"
              name="field"
              onChange={e => setField(e.target.value)}
              required
            />
            <label className="" htmlFor="email">
            </label>
            <input
              type="text"
              id="salary"
              className="crud-input"
              placeholder="Enter Dr. salary"
              name="salary"
              onChange={e => setSalary(e.target.value)}
              required
            />
            <button>Add Doctor</button>
          </form>
      </div>
    );
  }
}

export default Doctors;
