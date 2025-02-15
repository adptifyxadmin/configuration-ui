// src/shared/components/dropdowns/SimpleDropdown.tsx
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Option {
    value: string;
    text: string;
}

interface SimpleDropdownProps {
    label: string;
    options: Option[];
    onChange: (value: string) => void;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({ label, options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedValue(value); // Update internal state
        onChange(value); // Notify parent component
    };

    return (
        <FormControl
            fullWidth
            variant="outlined"
            margin="dense"  // Same margin as other controls
            sx={{ height: '40px' }}  // Adjust height if needed
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedValue}
                onChange={handleSelectChange}
                size="small"
                sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    height: '40px',
                    display: 'flex',
                  
                }}
                label={label}>               
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SimpleDropdown;
