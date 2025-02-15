import TextField from '@mui/material/TextField'; // Import TextField from MUI

interface NumericInputProps {
    label: string;
    name: string;
    value: number | '';
    error?: boolean;
    helperText?: string;       
    required?: boolean; 
    disabled?:boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
}

const NumericInput: React.FC<NumericInputProps> = ({
    label,
    name,
    value,
    error = false,
    helperText = '',   
    required = false,
    disabled = false,
    onChange,
    min,
    max
}) => {
    return (
        <TextField
            label={label}
            name={name}
            type="number"
            fullWidth
            margin="none"
            size="small"
            value={value}
            error={error}
            helperText={helperText}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required={required}
            disabled={disabled}
            inputProps={{ min, max }} 
        />
    );
};

export default NumericInput;
