// Vivian Zheng, dbConnEquipment.js, 5/5/22
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

// Get all the equipment in the table
const getEquipment = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query('SELECT * FROM equipment ORDER BY equip_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// Create a new piece of equipment 
const createEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    // SQL query to create a new piece of equipment and add it to the table
    pool.query('INSERT INTO equipment (equip_id, equip_name, model, brand, price, total_in_stock, checked_out) VALUES($1, $2, $3, $4, $5, $6, $7)', 
    [equip_id, equip_name, model, brand, price, total_in_stock, 0], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment added with name: ${equip_name}`)
    })
}

// Update the equipment with new values
const updateEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    pool.query('UPDATE equipment SET model=$1, brand=$2, price=$3, total_in_stock=$4, checked_out=$5 WHERE equip_id = $6', 
    [model, brand, price, total_in_stock, checked_out, equip_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment updated with name: ${equip_name}`)
    })
}

// Delete the piece of equipment
const deleteEquipment = (req, res) => {
    const {equip_id} = req.body

    pool.query('DELETE FROM equipment WHERE equip_id = $1',
    [equip_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment deleted with id: ${equip_id}`)
    })
}

// Check in equipment (decrements the number checked out)
const checkInEquipment = (req, res) => {
    const {equip_id, checked_out} = req.body

    pool.query('UPDATE equipment SET checked_out=$2 - 1 WHERE equip_id = $1',
    [equip_id, checked_out], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment checked in with id: ${equip_id}`)
    })
}

// Check out equipement (increments the number checked out)
const checkOutEquipment = (req, res) => {
    const {equip_id, checked_out} = req.body

    pool.query('UPDATE equipment SET checked_out=$2 + 1 WHERE equip_id = $1',
    [equip_id, checked_out], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment checked in with id: ${equip_id}`)
    })
}

module.exports = {
    getEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    checkInEquipment,
    checkOutEquipment
} 