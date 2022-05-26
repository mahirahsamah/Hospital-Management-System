import React, { useState } from "react";
import ".././Appointment.css";

function DoctorModal({ setOpenModal, entity }) {

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [field, setField] = useState("")
  const [salary, setSalary] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === "") {fname = entity.doctor_fname}
    if (lname === "") {fname = entity.doctor_lname}
    if (field === "") {fname = entity.doctor_field}
    if (salary === "") {fname = entity.doctor_salary}
    const formDetails = {
      'doctor_fname' : fname,
      'doctor_lname' : lname,
      'doctor_field' : field,
      'doctor_salary' : salary
    }
    console.log("The form was submitted with the following data:");
    console.log(formDetails);
    
    const requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails)
    }

    fetch(`http://localhost:3001/doctor/${entity.doctor_id}`, requestOptions)
    .then(alert("Patient updated"))
    .then(window.location.reload(false))
    // .then(window.location.reload(false))
  }

  return (
    <div className="modalBackground">
      <form onSubmit={handleSubmit}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Editing Doctor</h1>
          <h3>{entity.id}</h3>
          <h3>(first name, last name, field, salary)</h3>
        </div>
        <div className="body">
            <label className="" htmlFor="fname">
            </label>
            <input
              type="text"
              id="fname"
              className="crud-input"
              placeholder={entity.doctor_fname}
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
              placeholder={entity.doctor_lname}
              name="lname"
              onChange={e => setLname(e.target.value)}
              required
            />
            <label className="" htmlFor="street_addr">
            </label>
            <input
              type="text"
              id="street_addr"
              className="crud-input"
              placeholder={entity.doctor_field}
              name="street_addr"
              onChange={e => setField(e.target.value)}
              required
            />
            <label className="" htmlFor="email">
            </label>
            <input
              type="text"
              id="email"
              className="crud-input"
              placeholder={entity.doctor_salary}
              name="email"
              onChange={e => setSalary(e.target.value)}
              required
            />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
            type="button"
            >
            Cancel
          </button>
          <button>Update</button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default DoctorModal;