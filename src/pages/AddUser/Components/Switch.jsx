import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import React from 'react';

export default function SwitchLabels({ setIsActive, isActive }) {
    const handleChange = (event) => {
        setIsActive(event.target.checked);
    };
    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={isActive} onChange={handleChange} />}
                label={isActive ? 'Active' : 'Inactive'}
            />
        </FormGroup>
    );
}
