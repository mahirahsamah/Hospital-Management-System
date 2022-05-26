// BY: MAHIRAH SAMAH

import React from 'react'

var btn_type = "";

const DoctorReadOnlyRow = ({appt, handleEditClick, handleDeleteClick}) => {

    const onFinish = (event) => {
        let id = event.target.id;
        if(id === "edit_btn") {
            // Do for one
            console.log("edit button clicked");
            btn_type = "edit";
        } else {
            // For second
            console.log("add button clicked");
            btn_type = "add";
        }
    }


    return (
        <tr>
            <td>{appt.appt_id}</td>
            <td>{appt.appt_feedback}</td>
            <td>
                <button type='button' id='edit_btn' onClick={(event)=>{onFinish(event); handleEditClick(event, appt);}}>Edit</button>
                <button type='button' id='add_btn' onClick={(event)=>{onFinish(event); handleEditClick(event, appt);}}>New</button>
                <button type='button' onClick={() => handleDeleteClick(appt.appt_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default DoctorReadOnlyRow;
export {btn_type};