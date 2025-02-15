import React from "react";
import { MenuItem, TextField, Box, Typography } from "@mui/material";

interface DropdownProps {
    name : string,
    label: string;
    size: 'small' | 'medium'; // Define the accepted size values
    dataSource: any[]; // Assuming data is an array of objects
    value: string | number | null;    
    onChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void; // Allow multiple types
    columnsToDisplay: { key: string; label: string }[]; // Specify the columns and labels to display
    columnWidths?: string[]; // New prop for column widths
    disabled?: boolean; // New property for disabling the dropdown
    required?: boolean; // New property for making the dropdown required
}

const CustomDropdown: React.FC<DropdownProps> = ({
    name,
    label,
    size,
    dataSource,
    value,
    onChange,
    columnsToDisplay,
    columnWidths,
    disabled = false, // Default is not disabled
    required = false, // Default is not required
}) => {
    const formatOptionText = (item: any) => {
        return columnsToDisplay.map((col) => item[col.key]).join(" - ");
    };  

    return (
        <TextField
            select
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            size={size}
            disabled={disabled} // Use the disabled property
            required={required} // Use the required property
            InputLabelProps={{
                shrink: true,  // Ensures label stays on top even when no value is selected
            }}
            SelectProps={{
                renderValue: (selected) => {
                    const selectedItem = dataSource.find((item) => item.id === selected || item.Id === selected);
                    return selectedItem ? formatOptionText(selectedItem) : "";
                },
            }}
        >
            {/* Header Row */}
            <MenuItem disabled>
                <Box display="flex" width="100%" justifyContent="space-between">
                    {columnsToDisplay.map((col, index) => (
                        <Typography
                            key={col.key}
                            variant="subtitle2"
                            style={{ fontWeight: "bold", width: columnWidths ? columnWidths[index] : `${100 / columnsToDisplay.length}%` }} // Use provided width or default
                        >
                            {col.label}
                        </Typography>
                    ))}
                </Box>
            </MenuItem>

            {/* Data Rows */}
            {dataSource.map((item) => (
                <MenuItem key={item.id || item.Id} value={item.id || item.Id}> {/* Support both `id` and `Id` */}
                    <Box display="flex" width="100%" justifyContent="space-between">
                        {columnsToDisplay.map((col, index) => (
                            <Typography
                                key={col.key}
                                style={{ width: columnWidths ? columnWidths[index] : `${100 / columnsToDisplay.length}%` }} // Use provided width or default
                            >
                                {item[col.key]}
                            </Typography>
                        ))}
                    </Box>
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CustomDropdown;
