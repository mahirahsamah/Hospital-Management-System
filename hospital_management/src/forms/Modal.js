import React, { useState } from "react";
import ".././Appointment.css";

function Modal({ setOpenModal, entity }) {

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [street_addr, setStreet_addr] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === "") {fname = entity.fname}
    if (lname === "") {fname = entity.lname}
    if (street_addr === "") {fname = entity.street_addr}
    if (email === "") {fname = entity.email}
    const formDetails = {
      'fname' : fname,
      'lname' : lname,
      'street_addr' : street_addr,
      'email' : email
    }
    console.log("The form was submitted with the following data:");
    console.log(formDetails);
    
    const requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails)
    }

    fetch(`http://localhost:3001/patient/${entity.id}`, requestOptions)
    .then(alert("Patient updated"))
    .then(window.location.reload(false))
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
          <h1>Editing Patient</h1>
          <h3>{entity.id}</h3>
          <h3>(first name, last name, address, email)</h3>
        </div>
        <div className="body">
            <label className="" htmlFor="fname">
            </label>
            <input
              type="text"
              id="fname"
              className="crud-input"
              placeholder={entity.fname}
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
              placeholder={entity.lname}
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
              placeholder={entity.street_addr}
              name="street_addr"
              onChange={e => setStreet_addr(e.target.value)}
              required
            />
            <label className="" htmlFor="email">
            </label>
            <input
              type="text"
              id="email"
              className="crud-input"
              placeholder={entity.email}
              name="email"
              onChange={e => setEmail(e.target.value)}
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

export default Modal;