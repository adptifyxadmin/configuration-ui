import {
    Box,
    Button,
    Grid,
    TextField,
    SaveIcon,
    CancelIcon,
    Checkbox,
    FormControlLabel,
    NumericInput,
    useState,
    useEffect
} from "../../../shared/utils/muiImports";

import { TreatmentFormProps } from "../Treatment.Type";
import { formatDateForInput } from "../../../shared/utils/formatDate";
import { EstablishmentLocationMap } from "../../establishmentlocationmap/EstablishmentLocationMap.Type";
import { fetchEstablishmentsAsync } from "../../establishment/EstablishmentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Establishment } from "../../establishment/Establishment.Type";

const TreatmentForm: React.FC<TreatmentFormProps> = ({
    treatment,
    errors,
    onChange,
    onSave,
    onCancel
}) => {
    
    const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch

    const [selectedEstablishments, setSelectedEstablishment] = useState<number[]>([]);
    const [establishments, setEstablishments] = useState<Establishment[]>([]);

    // Get tomorrow's date in YYYY-MM-DD format
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day for tomorrow
        return tomorrow.toISOString().split('T')[0];
    };

    useEffect(() => {
        const loadDropdownData = async () => {
            try {
                // Create an array of promises for the API calls
                const [establishmentData] = await Promise.all([                    
                    dispatch(fetchEstablishmentsAsync()).unwrap()
                    // Add more dispatch calls as needed
                ]);

                // Set the fetched data into state                
                setEstablishments(establishmentData);

                const establishmentIds = treatment?.establishmentLocationMaps.map(x => x.establishmentId);
                setSelectedEstablishment(establishmentIds);

                // Set other dropdown data as needed
            } catch (error) {
                console.error('Failed to fetch dropdown data:', error);
            }
        };
        loadDropdownData();
    }, [treatment]);

    const handleHospitalLocationChange = (event: SelectChangeEvent<number[]>) => {
        // Capture selected IDs from the dropdown
        const selectedIds = event.target.value as number[];
                
        const selectedHospitalLocations = establishments.filter(x => selectedIds.includes(x.id));

        const establishmentLocationMaps: EstablishmentLocationMap[] =
            selectedHospitalLocations.map((establishment, index) => ({
                name: establishment.name,
                establishment: establishment,
                establishmentId: establishment.id,
                establishmentLocationGroupId: 0
            }));


        // Update the selectedLocation state with the selected options
        setSelectedEstablishment(selectedHospitalLocations.map(x => x.id));

        // Create a new Treatment object with the updated establishmentLocationMap
        const updatedTreatment = {
            ...treatment,
            establishmentLocationMaps: establishmentLocationMaps // Update with the new selected locations
        };

        onChange(updatedTreatment);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(e); // Update the treatment's amountEffectiveDate

        // If date is cleared, also clear and disable the PreviousAmount field
        if (name === 'amountEffectiveDate' && !value) {
            onChange({
                target: {
                    name: 'previousAmount',
                    value: 0, // Clear PreviousAmount value
                },
            });
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="none"
                        size="small"
                        required
                        onChange={onChange}
                        value={treatment?.name || ""}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Code"
                        name="code"
                        fullWidth
                        margin="none"
                        size="small"
                        value={treatment?.code || ""}
                        error={!!errors.code}
                        helperText={errors.code}
                        required
                        onChange={onChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl sx={{ m: 0, width: '100%', display: 'flex', justifyContent: 'center' }} variant="outlined">
                        <InputLabel id="multiple-checkbox-label" shrink>Hospital Locations</InputLabel>
                        <Select
                            labelId="multiple-checkbox-label"
                            id="multiple-checkbox"
                            multiple
                            value={selectedEstablishments.map(option => option)}
                            onChange={handleHospitalLocationChange}
                            input={<OutlinedInput label="Hospital Locations" sx={{ height: '40px', width: '100%' }} notched />}
                            renderValue={(selected) =>
                                (selected as number[])
                                    .map(id => establishments.find(option => option.id === id)?.name)
                                    .join(', ')
                            }>
                            {establishments.map((option) => (
                                <MenuItem
                                    key={option.id}
                                    value={option.id}>
                                    <Checkbox checked={selectedEstablishments.some(selected => selected === option.id)} />
                                    <ListItemText primary={option.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Amount"
                        name="amount"
                        value={treatment.amount}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        onChange={onChange}
                        required={true}
                        min={1}
                        max={9999999}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Duration in Minutes"
                        name="durationInMinutes"
                        value={treatment.durationInMinutes}
                        error={!!errors.durationInMinutes}
                        helperText={errors.durationInMinutes}
                        onChange={onChange}
                        required={true}
                        min={1}
                        max={9999999}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Amount Effective Date"
                        name="amountEffectiveDate"
                        fullWidth
                        margin="none"
                        size="small"
                        type="date"
                        value={formatDateForInput(treatment?.amountEffectiveDate)}
                        error={!!errors.dateOfBirth} // Custom error handling
                        helperText={errors.dateOfBirth} // Custom error message
                        onChange={handleDateChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputProps: {
                                min: getTomorrowDate(), // Restrict to dates not earlier than tomorrow
                            }
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Previous Amount"
                        name="previousAmount"
                        value={treatment?.previousAmount || ""}
                        error={!!errors.previousAmount}
                        helperText={errors.previousAmount}
                        onChange={onChange}
                        min={1}
                        max={9999999}
                        required={!!treatment?.amountEffectiveDate} //// Required when date is selected
                        disabled={!treatment?.amountEffectiveDate} // Disable when no date is selected
                    />

                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="active"
                                checked={treatment.active}
                                onChange={onChange}
                                inputProps={{ 'aria-label': 'Active' }}
                            />
                        }
                        label="Active"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Notes"
                        name="notes"
                        fullWidth
                        margin="none"
                        size="small"
                        value={treatment?.notes || ""}
                        error={!!errors.notes}
                        helperText={errors.notes}
                        onChange={onChange}
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid item xs={12} md={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mr: 1, width: 100 }}
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                        >
                            Save
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ width: 100 }}
                            startIcon={<CancelIcon />}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TreatmentForm;
