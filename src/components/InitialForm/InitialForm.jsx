import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './InitialForm.css';

export default function InitialForm() {
    const [formData, setFormData] = useState({
        boardSize: '',
        steps: ''
    })
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        // TODO-fmoreno: Handle input validation
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <form>
            
                <label className='initial-form-label'>Chess Board Size (nxn) </label>
                <input 
                    type='text'
                    name='boardSize'
                    value={formData.boardSize}
                    onChange={handleChange}
                    className='initial-form-input'
                />
                <br />
            
                 <label className='initial-form-label'>Number of available steps </label>
                <input 
                    type='text'
                    name='steps'
                    value={formData.steps}
                    onChange={handleChange}
                    className='initial-form-input'
                />
            
            <br />
            <button className='initial-form-button' onClick={(e) => {
                navigate(`/chess?size=${formData.boardSize}&steps=${formData.steps}`)
                e.preventDefault();
            }}>OK</button>
        </form>
    )
}