import React, { useState, useEffect } from "react";
import { HashRouter as Routes, Route, NavLink, useNavigate } from "react-router-dom";

import './Appointment.css';
import Modal from './forms/Modal'
//David Fasina
function Patients() {

  const [patientData, setPatientData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState([]);
  const [billData, setBillData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:3001/patients')
    .then(async response => {
        const data = await response.json();
        setPatientData(patientData => [...patientData, data])
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  const handleDelete = (id) => {
    // DELETE request using fetch with error handling
    fetch(`http://localhost:3001/patient/${id}`, { method: 'DELETE' })
    .then(window.location.reload(false))
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  const handleModal = (ent) => {
    setOpenModal(true)
    setEntity(ent)
  }

  const viewBill = (id) => {
    fetch(`http://localhost:3001/appointments/${id}`)
    .then(async response => {
      const data = await response.json();
      const toBills = () => { 
        console.log(id)
        navigate('/Bills', {state: {patient_id: id}})
      }
      if (data.length == 0) {
        alert("This patient has no appointment Bills")
      } else {
        toBills();
      }
    })
  }

  const renderTableData = () => {
    return patientData[0].map((patient, index) => {
       const { id, fname, lname, dob, gender, zip_code, phone_number, state, street_addr, email } = patient //destructuring
        return (
        <tr>
            <td>{id}</td>
            <td>{ fname + " " + lname }</td>
            <td>{getAge(dob)}</td>
            <td>{ street_addr }</td>
            <td>{ email }</td>
            <td><button onClick={() => {if(window.confirm('Are you sure you want to remove this patient from the system?')){handleDelete(id)};}}>Remove Patient</button>
            <button onClick={() => handleModal(patient)}>Update Patient</button>
            <button onClick={() => viewBill(id)}>View Patient's Bills</button>
            </td>
        </tr>
      )
    })
  }

  if (patientData.length > 0) {
    return (
      <div>
        {openModal && <Modal setOpenModal={setOpenModal} entity={entity}/>}
        <div className="profile-body">
          <div className="profile-header">
            <h1>Patients</h1>
          </div>
          <table id='patients' className="crud-table">
            <tbody><tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Street Address</th>
            <th>Email</th>
            <th>Actions</th>
            </tr>
              {renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Patients;
