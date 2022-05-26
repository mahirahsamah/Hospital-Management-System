const bcrypt = require('bcryptjs')
const pg = require('pg')
const Pool  = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
})

const getPatients = (req, res) => {
  pool.query('SELECT * FROM patients ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
}

const getPatientById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM patients WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
}

const deletePatient = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM patients WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        pool.query('DELETE FROM appointments WHERE patient_id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`All appointments of patient with id: ${id} deleted`)
        })
    })
}

const createPatient = (req, res) => {
    const {fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password} = req.body
    const hash = bcrypt.hashSync(password, 12)
    const dupeEmail = pool.query('SELECT * FROM patients WHERE email = $1', [email], (err, dupeEmail) => {
        if (err) {
            throw err
        }
        if (dupeEmail.rows[0] == null) {
            pool.query('INSERT INTO patients (fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
            [fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, hash], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(201).send(`Patient added with email: ${email}`)
            })
        } else {
            throw error
        }
    })
}





const getAdmins = (req, res) => {
    pool.query('SELECT * FROM admins ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
  }


const getAdminById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM admins WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
  }

  const deleteAdmin = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM admins WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

  const createAdmin = (req, res) => {
    const {fname, lname, email, password} = req.body
    const hash = bcrypt.hashSync(password, 12)
    const dupeEmail = pool.query('SELECT * FROM admins WHERE email = $1', [email], (err, dupeEmail) => {
        if (err) {
            throw err
        }
        if (dupeEmail.rows[0] == null) {
            pool.query('INSERT INTO admins (fname, lname, email, password) VALUES($1, $2, $3, $4)', 
            [fname, lname, email, hash], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(201).send(`Admin added with email: ${email}`)
            })
        } else {
            throw error
        }
    })
}

const updateAdmin = (req, res) => {
    const id = parseInt(req.params.id); 
    const {fname, lname, email} = req.body;
    pool.query('UPDATE admins SET fname = $1, lname = $2, email = $3 WHERE id = $4', [fname, lname, email, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Admin with id: ${id} updated`)
    })
}

const createAptmt = (req, res) => {
    const {patient_id, doctor_id, date} = req.body

    pool.query('INSERT INTO appointments (patient_id, doctor_id, date, bill, appt_feedback) VALUES($1, $2, $3, $4, $5)', 
    [patient_id, doctor_id, date, 0.00, ''], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Appointment added for patient with id: ${patient_id}`)
    })
}

const getAptmt = (req, res) => {
    pool.query('SELECT * FROM appointments ORDER BY aptmt_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
const getAptmtByPatientId = (req, res) => {
    const patient_id = parseInt(req.params.patient_id)
    pool.query('SELECT * FROM appointments WHERE patient_id = $1', [patient_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updatePatient = (req, res) => {
    const id = parseInt(req.params.id); 
    const {fname, lname, street_addr, email} = req.body;
    pool.query('UPDATE patients SET fname = $1, lname = $2, street_addr = $3, email = $4 WHERE id = $5', [fname, lname, street_addr, email, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Patient with id: ${id} updated`)
    })
}

const updateAptmtDate = (req, res) => {
    const {date, aptmt_id} = req.body;
    pool.query('UPDATE appointments SET date = $1 WHERE aptmt_id = $2', [date, aptmt_id], (error, results) => {
        if (error) {
            res.status(400).send(error)
        }
        res.status(200).send(`Appointment with id: ${aptmt_id} updated`)
    })
}

const deleteAptmt = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM appointments WHERE aptmt_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Appointment with id: ${id} deleted`)
    })
}

// BY: MAHIRAH sAMAH

const createDoctor = (req, res) => {
    const {doctor_fname, doctor_lname, doctor_field, doctor_salary} = req.body

    pool.query('INSERT INTO doctors (doctor_fname, doctor_lname, doctor_field, doctor_salary) VALUES($1, $2, $3, $4)', 
    [doctor_fname, doctor_lname, doctor_field, doctor_salary], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Doctor ${doctor_fname} created`)
    })
}

const deleteDoctor = (req, res) => {
    const id = parseInt(req.params.doctor_id)
    pool.query('DELETE FROM doctors WHERE doctor_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        pool.query('DELETE FROM appointments WHERE doctor_id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`All appointments of doctor with id: ${id} deleted`)
        })
    })
}

const updateDoctor = (req, res) => {
    const id = parseInt(req.params.doctor_id); 
    const {doctor_fname, doctor_lname, doctor_field, doctor_salary} = req.body;
    pool.query('UPDATE doctors SET doctor_fname = $1, doctor_lname = $2, doctor_field = $3, doctor_salary = $4 WHERE doctor_id = $5', [doctor_fname, doctor_lname, doctor_field, doctor_salary, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Doctor with id: ${id} updated`)
    })
}

// END OF MAHIRAH'S CODE

const emailPassLogin = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM patients WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500).json(error)
            throw error
        }
        else if (results.rows[0] != null) {
            if (bcrypt.compareSync(password, results.rows[0].password)) {
                res.status(200).json({
                    id: results.rows[0].id,
                    email: results.rows[0].email
                })
            } else {
                res.status(200).json({
                    id: null,
                    email: results.rows[0].email
                })
            }
        } else {
            res.status(400).json({id: null})
        }
    })
    
}

const updateBill = (req, res) => {
    const {price, id} = req.body;
    pool.query('UPDATE appointments SET bill = $1 WHERE aptmt_id = $2', [price, id], (error, results) => {
        if (error) {
            res.status(400).send(error)
        }
        res.status(200).send(`Appointment with id: ${id} bill Updated`)
    })
    
}

const adminLogin = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM admins WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500).json(error)
            throw error
        }
        else if (results.rows[0] != null) {
            if (password == results.rows[0].password) {
                res.status(200).json({
                    id: results.rows[0].id,
                    email: results.rows[0].email
                })
            } else {
                res.status(200).json({
                    id: null,
                    email: results.rows[0].email
                })
            }
        } else {
            res.status(400).json({id: null})
        }
    })
}

module.exports = {
    getPatients,
    getPatientById,
    createPatient, 
    emailPassLogin,
    adminLogin,
    createAptmt,
    getAptmt,
    getAptmtByPatientId,
    updateAptmtDate,
    deleteAptmt,
    deletePatient, 
    updatePatient,
    deleteDoctor,
    updateDoctor,
    createDoctor,
    updateBill,
    getAdminById,
    deleteAdmin,
    createAdmin,
    getAdmins,
    updateAdmin
}