// BY: MAHIRAH SAMAH

import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './Doctor.css';
import DoctorEditableRow from './DoctorComponents/DoctorEditableRow';
import DoctorReadOnlyRow from './DoctorComponents/DoctorReadOnlyRow';

var a_id = "";

function Doctor(){

    const location = useLocation();

    const json_object = location.state.pass_pd_data;

    const [appts, setAppts] = useState(json_object);

    const [editFormData, seteditFormData] = useState({
        appt_id:"",
        appt_feedback: "",
    });

    const [editApptId, setEditApptId] = useState(null);

    const handleEditFormChange = (event) => {

        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        seteditFormData(newFormData);
    };

    const handleEditFormSubmit = (event)  => {

        event.preventDefault();
        const editedAppt = {
            appt_id: editApptId,
            appt_feedback: editFormData.appt_feedback,
        }

        const requestOptions = {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedAppt)
            
        }

        fetch('http://localhost:3001/editFeedbackGivenApptId', requestOptions)
        .then(res => res.json())
        .then(json => seteditFormData(json));


        const newAppts = [...appts];
        const index = appts.findIndex((appt) => appt.appt_id === editApptId );
        newAppts[index] = editedAppt;
        setAppts(newAppts);
        setEditApptId(null);
    };

    const handleEditClick = (event, appt) => {
        event.preventDefault();
        setEditApptId(appt.appt_id); // HERE, was patient.patient_id
        a_id = appt.appt_id;

        const formValues = {
            appt_id: appt.appt_id,
            appt_feedback: appt.appt_feedback,
        }

        seteditFormData(formValues);

    };

    const handleCancelClick = () => {
        setEditApptId(null);
    };

    const handleDeleteClick = (apptId) => {
        //const newPatients = [...patients];
    
        //const index = patients.findIndex((patient) => patient.patient_id === patientId);

        const editedAppt = {
            appt_id: apptId,
            appt_feedback: null,
        }

        //console.log(editedAppt);

        const requestOptions = {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedAppt)
            
        }

        fetch('http://localhost:3001/deleteFeedbackGivenApptId', requestOptions)
        .then(res => res.json())
        .then(json => seteditFormData(json));
        //.then(window.location.reload('false'));

        const newAppts = [...appts];
        const index = appts.findIndex((appt) => appt.appt_id === apptId);
        //console.log();
        //newPatients.splice(index, 1);
        newAppts[index].appt_feedback = "";
    
        setAppts(newAppts);
    };

    return(
        <div className='doc_format'>
            <h1 className='doc_name'>
                
                Welcome, {`Dr. ${location.state.doc_data[0].doctor_lname}`}.
            </h1>
            
            <h2 className='doc_field'>
                Field: {`${location.state.doc_data[0].doctor_field}`}.
            </h2>

            <h2 className='doc_salary'>
                Salary: {`$${location.state.doc_data[0].doctor_salary}`}.
            </h2>

            <div className="patients_table">
            <h1>Your Appointments list:</h1>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Appointment Feedback</th>
                        <th>Feedback Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {appts.map((appt) => (
                            <Fragment>
                                {editApptId === appt.appt_id ? (
                                    <DoctorEditableRow 
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange} 
                                        handleCancelClick = {handleCancelClick}
                                        />
                                ) : (
                                    <DoctorReadOnlyRow 
                                        appt={appt} 
                                        handleEditClick ={handleEditClick}
                                        handleDeleteClick = {handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>

        </div>
    );
}

export default Doctor;
export {a_id};
//{console.log(location.state.pass_pd_data[0].patient_id)}

//patients_array: {`${location.state.pass_pd_data.patient_id}`}

//console.log(json_object)
// making patient id array

/*if(json_object.length > 1) {
    //console.log("long");
    for(var i = 0; i < json_object.length; i++) {
        p_id_arr.push(location.state.pass_pd_data[i].patient_id)
    }
}*/

// making patient feedback array
/*var p_feedback_arr = []
if(json_object.length > 1) {
    //console.log("long");
    for(var i = 0; i < json_object.length; i++) {
        p_feedback_arr.push(location.state.pass_pd_data[i].appt_feedback)
    }
}*/