import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Bills.css';

//David Fasina
function Bills(){
    const location = useLocation();
    const [price, setPrice] = useState(0);
    const [apt_id, setApt_id] = useState(0);
    const [patient_id, setPatient_id] = useState(0);
    const [aptmtData, setAptmtData] = useState([]);
    const navigate = useNavigate();

    

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch(`http://localhost:3001/appointments/${localStorage.getItem("patient_id")}`)
        .then(async response => {
            const data = await response.json();
            setAptmtData(aptmtData => [...aptmtData, data])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();  
        const formDetails = {
          "price" : -1,
          "id" : apt_id
        }
        const requestOptions = {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDetails) 
        }
        fetch(`http://localhost:3001/bill/`, requestOptions)
        .then(alert(`Bill ID: ${apt_id} paid`))
        .then(window.location.reload(false))
        console.log("The form was submitted with the following data:");
        console.log(formDetails);
    }
    
    const renderTableData = () => {
        return aptmtData[0].map((aptmt, index) => {
           const { aptmt_id, bill } = aptmt //destructuring
           if (bill!=-1) {
             return (
              <tr>
                 <td>{aptmt_id}</td>
                 <td>{bill}</td>
                 <td>
                  <form onSubmit={handleUpdate}>
                    <button onClick={() => setApt_id(aptmt_id)}>Pay Bill</button>
                  </form>
                 </td>
              </tr>
            )
           } else {
            return (
              <tr>
                 <td>{aptmt_id}</td>
                 <td> PAID </td>
                 <td>
                  <form onSubmit={handleUpdate}>
                    <button disabled="true" onClick={() => setApt_id(aptmt_id)}>Update Bill</button>
                  </form>
                 </td>
              </tr>
            )
           }
    
        })
      }

    if (aptmtData.length > 0) {
        return(
            <div>
                <h1>
                    Pay Bills
                </h1>
                <table className="crud-table">
                <tbody><tr>
                <th>Appointment ID</th>
                <th>Cost</th>
                <th>Actions</th>
                </tr>
                    {renderTableData()}
                </tbody>
                </table>
            </div>
        );
    }
}


export default Bills;
