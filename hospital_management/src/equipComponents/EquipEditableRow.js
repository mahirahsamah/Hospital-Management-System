// Vivian Zheng, EquipEditableRow.js, 5/5/22

import React from 'react'

// This is for an editable row (what the row displays after a user clicks Update)
const EditableRow = ({ equipment, editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            {/* equip_id --- CANNOT EDIT THIS SO NO INPUT LINE */}
            <td>
                {equipment.equip_id}
            </td>

            {/* equip_name --- CANNOT EDIT THIS SO NO INPUT LINE */}
            <td>
                {equipment.equip_name}
            </td>

            {/* model */}
            <td>
                <input 
                        type="text"
                        name="model" 
                        required="required"
                        placeholder="Enter model..."
                        value={editFormData.model}
                        onChange={handleEditFormChange}
                ></input>
            </td>
                
            {/* brand */}
            <td>
                <input 
                        type="text"
                        name="brand" 
                        required="required"
                        placeholder="Enter brand..."
                        value={editFormData.brand}
                        onChange={handleEditFormChange}
                ></input>
            </td>

            {/* price */}
            <td>
                <input 
                        type="number"
                        name="price" 
                        step="0.01"
                        required="required"
                        placeholder="Enter price..."
                        value={editFormData.price}
                        onChange={handleEditFormChange}
                ></input>
            </td>

            {/* total in stock */}
            <td>
                <input 
                        type="number"
                        name="total_in_stock" 
                        required="required"
                        placeholder="Enter number in stock..."
                        value={editFormData.total_in_stock}
                        onChange={handleEditFormChange}
                ></input>
            </td>

            {/* number checked out */}
            <td>
                <input 
                        type="number"
                        name="checked_out" 
                        required="required"
                        placeholder="Enter number checked out..."
                        value={editFormData.checked_out}
                        onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type="submit" className="saveButton">Save</button>
            </td>
        </tr>
    )
}

export default EditableRow