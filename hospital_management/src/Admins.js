//Asad Ali
import React, { useState, useEffect } from 'react';
import Modal from './forms/AdminModal'
import './Appointment.css';

function Admins(){
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [adminData, setAdminData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [entity, setEntity] = useState([]);

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:3001/admins')
        .then(async response => {
            const data = await response.json();
            setAdminData(adminData => [...adminData, data])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDetails = {
          'fname' : fname,
          'lname' : lname,
          'email' : email,
          'password' : password
        }
        console.log("The Admin was added successfully:");
        console.log(formDetails);
    
        const requestOptions = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDetails)
        };
    
        fetch('http://localhost:3001/admins', requestOptions)
          .then(window.location.reload(false))
        }
        const handleDelete = (id) => {
            // DELETE request using fetch with error handling
            fetch(`http://localhost:3001/admins/${id}`, { method: 'DELETE' })
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
            return adminData[0].map((admin, index) => {
               const { id, fname, lname, email } = admin //destructuring
                return (
                <tr>
                    <td>{id}</td>
                    <td>{ fname + " " + lname }</td>
                    <td>{ email }</td>
                    <td><button onClick={() => {if(window.confirm('Are you sure you want to remove this admin from the system?')){handleDelete(id)};}}>Remove admin</button>
                    <button onClick={() => handleModal(admin)}>Update Admin</button>
                    </td>
                </tr>
              )
            })
          }


        if (adminData.length > 0) {
        return (
            <div>
            {openModal && <Modal setOpenModal={setOpenModal} entity={entity}/>}
            <div className="profile-body">
                <div className="profile-header">
                <h1>Admins</h1>
                </div>
                <table id='admins' className="crud-table">
                <tbody><tr>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Email</th>
                </tr>
                    {renderTableData()}
                </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fname">
                            Admin First Name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            placeholder="Enter Admins first name"
                            name="fname"
                            required
                            onChange={e => setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lname">
                            Admin Last Name
                        </label>
                        <input
                            type="text"
                            id="lname"
                            placeholder="Enter Admins last name"
                            name="lname"
                            required
                            onChange={e => setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">
                            Admin email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Admins email"
                            name="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Admins password"
                            name="password"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button >Add Admin</button>{" "}
                    </div>
                </form>
            </div>
        );
        }
      }

export default Admins;
