import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';


const Popup = (props) => {
    const navigate = useNavigate(); 
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const input = {title};
        //console.log(input.title); //input.title is doctor_id

        // fetching patients data based on doctor_id
        const pd = `http://localhost:3001/patientsfromdoctors/${input.title}`;

        const p_id_feedback = `http://localhost:3001/patientsFeedbackfromdoctors/${input.title}`

        fetch(`http://localhost:3001/doctors/${input.title}`)
        //fetch(`http://localhost:3001/doctors/`)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            //console.log(data)
            fetch(p_id_feedback)
            .then(async response => {
                const p_id_feedback_response = await response.json()
                //console.log(p_id_feedback_response)
                const toDoctorPage = () => { 
                    navigate('/doctor', 
                    {state: {doc_data: data, 
                             pass_pd_data: p_id_feedback_response}})
                }
                toDoctorPage();
            });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    }
    return (
        <div className='popup-box'>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <label for = 'doc_ID' className='popup-label'>Enter Doctor ID:</label>
                    <input
                        type="text" 
                        className='enter-doc-id' 
                        id = 'userInput' 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <button onClick={handleSubmit}>Submit</button>

                </form>
                {props.content}
            </div>
        </div>

    )
}

export default Popup;
//export window.globalInput;
//export {input};
//export {handleSubmit};
