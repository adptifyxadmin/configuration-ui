import React from 'react';
import { MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, OutlinedInput, Checkbox, ListItemText } from '@mui/material';

// Define the type for each option (value and label)
interface Option {
    id: number;
    code?: string;
    name?: string;
}

// Define the props type for MultiSelectDropdown
interface MultiSelectDropdownProps {
    label: string;
    dataSource: Option[];
    selectedValues: number[];
    onChange: (event: SelectChangeEvent<number[]>) => void;
    onOptionClick: (id: number) => void;
}

const getDisplayText = (option: Option) => {
    if (option.name && option.code) {
        return `${option.code} - ${option.name}`;
    } else if (option.name) {
        return option.name;
    } else if (option.code) {
        return option.code;
    }
    return ""; // Fallback if neither name nor code is available
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    label,
    dataSource,
    selectedValues,
    onChange,
    onOptionClick
}) => {
    return (
        <FormControl sx={{ m: 0, width: '100%', display: 'flex', justifyContent: 'center' }} variant="outlined">
            <InputLabel id={`${label}-label`} shrink>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                multiple
                value={selectedValues}
                onChange={onChange}
                input={<OutlinedInput label={label} sx={{ height: '40px', width: '100%' }} notched />}
                renderValue={(selected) =>
                    (selected as number[])
                        .map(id => {
                            const data = dataSource.find(data => data.id === id);
                            return data ? getDisplayText(data) : "";
                        })
                        .join(', ')
                }
            >
                {dataSource.map((data) => (
                    <MenuItem
                        key={data.id} value={data.id} onClick={() => onOptionClick(data.id)}
                        sx={{
                            paddingY: 0.5, // Reduce vertical padding
                            paddingX: 1, // Reduce horizontal padding if needed
                            minHeight: 'unset', // Remove default minHeight
                        }}>
                        <Checkbox checked={selectedValues.includes(data.id)} />
                        <ListItemText primary={getDisplayText(data)} /> {/* Use helper to display label */}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelectDropdown;
