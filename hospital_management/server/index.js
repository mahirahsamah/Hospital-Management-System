const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const db = require("./dbConn") // this line is used to connect to dbConn.js. For doctors, make a separate dbconn_doctors file
const dbDoc = require("./dbConnDoctors")
const dbEquip = require("./dbConnEquipment")
const app = express()
const PORT = 3001

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// List all patients in json form
app.get('/patients', db.getPatients)

// Get patient through specific id
app.get('/patients/:id', db.getPatientById)

app.get('/', (req, res) => {
  res.json({Server: "Running"})
})

app.post('/patients', db.createPatient)

//Asad Ali
// List all admins
app.get('/admins', db.getAdmins)

// Get Admin by their id
app.get('/admins/:id', db.getAdminById)

//Delete admin
app.delete('/admins/:id', db.deleteAdmin)

//create admin
app.post('/admins', db.createAdmin)

//update admin
app.patch('/admins/:id', db.updateAdmin)


// Vivian Zheng, 5/5/22
// Get all the equipment 
app.get('/Equipment', dbEquip.getEquipment)
// Add new equipment
app.post('/equipment', dbEquip.createEquipment)
// Update equipment
app.post('/equipment/update', dbEquip.updateEquipment)
// Delete equipment
app.delete('/equipment/delete', dbEquip.deleteEquipment)
// Check in equipment
app.post('/equipment/checkin', dbEquip.checkInEquipment)
// Check in equipment
app.post('/equipment/checkout', dbEquip.checkOutEquipment)


app.delete('/patient/:id', db.deletePatient)

app.patch('/patient/:id', db.updatePatient)

app.post('/login', db.emailPassLogin)

app.post('/admin-login', db.adminLogin)

app.post('/appointments', db.createAptmt)

app.patch('/appointments', db.updateAptmtDate)

app.delete('/appointment/:id', db.deleteAptmt);

app.patch('/bill', db.updateBill);

app.get('/appointments/:patient_id', db.getAptmtByPatientId)

app.get('/appointments', db.getAptmt)

app.listen(PORT, () => {
  console.log(`\n Server running on localhost:${PORT}`)
})



// BY: MAHIRAH SAMAH

app.delete('/doctor/:doctor_id', db.deleteDoctor)

app.patch('/doctor/:doctor_id', db.updateDoctor)

app.post('/doctors', db.createDoctor)

// list the Doctors table
app.get('/doctors', dbDoc.getDoctors)

// Get doctor through specific id
app.get('/doctors/:doctor_id', dbDoc.getDoctorById)

// list patients a doctor has (with doctor_id)
app.get('/patientsfromdoctors/:doctor_id', dbDoc.getPatientsByDoctorId)

// list patients feedback a doctor has (with doctor_id)
app.get('/patientsFeedbackfromdoctors/:doctor_id', dbDoc.getPatientsFeedbackDoctorId)

// edit a patient's feedback from the doctor
app.put('/editFeedbackGivenApptId/', dbDoc.editFeedbackGivenApptId)

// delete a patient's feedback from the doctor
app.put('/deleteFeedbackGivenApptId/', dbDoc.deleteFeedbackGivenApptId)

// END OF MAHIRAH'S CODE