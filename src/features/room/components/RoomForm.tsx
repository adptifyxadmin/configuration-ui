import { AppDispatch } from "../../../redux/store";
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
    React,
    useState,
    useEffect
} from "../../../shared/utils/muiImports";


import { RoomFormProps } from "../Room.Type";
import { useDispatch } from "react-redux";
import { fetchRoomTypesAsync } from '../../roomtype/RoomTypeSlice';
import { RoomType } from "../../roomtype/RoomType.Type";
import { fetchEstablishmentsAsync } from "../../establishment/EstablishmentSlice"
import CustomDropdown from "../../../shared/components/dropdowns/CustomDropdown";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Establishment } from "../../establishment/Establishment.Type";
import { EstablishmentLocationMap } from "../../establishmentlocationmap/EstablishmentLocationMap.Type";

const RoomForm: React.FC<RoomFormProps> = ({
    room,
    errors,
    onChange,
    onSave,
    onCancel
}) => {

    interface Department {
        value: number;
        text: string;
    }


    const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch

    //properties to hold the Room Type dropdown values
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(room.roomTypeId);

    const [selectedRoomAmount, setSelectedRoomAmount] = useState<number | null>(room.amount);

    const [departments, setDepartments] = useState<any>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);

    //Hospital Location
    const [selectedEstablishments, setSelectedEstablishment] = useState<number[]>([]);
    const [establishments, setEstablishments] = useState<Establishment[]>([]);

    const [overrideAmount, setOverrideAmount] = useState<number>();

    useEffect(() => {
        const loadDropdownData = async () => {
            try {
                // Create an array of promises for the API calls
                const [data1, data2] = await Promise.all([
                    //dispatch(fetchRoomTypesByEstablishmentIdAsync(0)).unwrap(),
                    dispatch(fetchRoomTypesAsync()).unwrap(),
                    dispatch(fetchEstablishmentsAsync()).unwrap()
                    // Add more dispatch calls as needed
                ]);

                // Set the fetched data into state
                setRoomTypes(data1);
                setEstablishments(data2);


                const establishmentIds = room?.establishmentLocationMaps.map(x => x.establishmentId);
                setSelectedEstablishment(establishmentIds);


                const departments1 = [
                    { value: '1', text: 'Admin' },
                    { value: '2', text: 'Front Office' },
                    { value: '3', text: 'Data Entry' },
                    { value: '4', text: 'Others' }
                ];

                setDepartments(departments1);
                // Set other dropdown data as needed
            } catch (error) {
                console.error('Failed to fetch dropdown data:', error);
            }
        };

        loadDropdownData();
    }, [room]);


    //This will get invoked when ever the room.roomTypeId gets changed
    useEffect(() => {
        setSelectedRoomTypeId(room.roomTypeId)
    }, [selectedRoomTypeId]);



    const handleHospitalLocationChange = (event: SelectChangeEvent<number[]>) => {
        // Capture selected IDs from the dropdown
        const selectedIds = event.target.value as number[];

        //const selectedHospitalLocations =  roomType.establishmentLocationMap.filter(x => selectedIds.includes(x.establishmentId));  
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

        // Create a new RoomType object with the updated establishmentLocationMap
        const updatedRoom = {
            ...room,
            establishmentLocationMaps: establishmentLocationMaps // Update with the new selected locations
        };

        onChange(updatedRoom);
    };


    // Fetch room types when the establishmentId changes
    const fetchRoomTypesByEstablishmentId = async (id: number) => {
        try {
            const result = await dispatch(fetchRoomTypesAsync()).unwrap();
            setRoomTypes(result);
        } catch (error) {
            console.error("Failed to fetch room types:", error);
        }
    };


    //when ever the Room Type dropdown selection changes, update the roomTypeId with selected value
    const roomTypeDropdownChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const roomTypeId = Number(event.target.value); // Ensure this is correct

        const selectedRoomType = roomTypes?.find(type => type.id === roomTypeId);

        if (selectedRoomType) {
            setSelectedRoomTypeId(room.roomTypeId);
            setSelectedRoomAmount(room.amount);

            // Update the Room object with the selected RoomType.Amount
            const updatedRoom = {
                ...room,
                amount: selectedRoomType.amount,
                roomTypeId: selectedRoomType.id
            };
            onChange(updatedRoom);
        }
    };

    const handleOverrideAmountCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        const defaultAmount = roomTypes.find(x => x.id === room?.roomTypeId)?.amount ?? 0;
        var updatedAmount = !checked ? defaultAmount : room.amount;       

        const updatedRoom = {
            ...room,
            amount: updatedAmount,
            overrideDefaultAmount : checked
        };

        onChange(updatedRoom);
    };

    const departments1 = [
        { value: '1', text: 'Admin' },
        { value: '2', text: 'Front Office' },
        { value: '2', text: 'Data Entry' }
    ];

    const departmentDropdownChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const roomTypeId = event.target.value; // Ensure this is correct
        setSelectedRoomTypeId(roomTypeId ? Number(roomTypeId) : null); // Convert to number or handle null
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
                        value={room?.name || ""}
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
                        value={room?.code || ""}
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
                            required={ true }
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
                    <CustomDropdown
                        label="Room Types"
                        name="roomTypeId"
                        dataSource={roomTypes}
                        value={room?.roomTypeId}
                        size={'small'}
                        onChange={roomTypeDropdownChange}
                        columnsToDisplay={[
                            { key: "name", label: "Name" },
                            { key: "amount", label: "Amount" }
                        ]}
                        columnWidths={['70%', '30%']}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Number Of Beds"
                        name="numberOfBeds"
                        value={room?.numberOfBeds}
                        error={!!errors.numberOfBeds}
                        helperText={errors.numberOfBeds}
                        min={1}
                        onChange={onChange}
                        max={9999999}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Floor Number"
                        name="floorNumber"
                        fullWidth
                        margin="none"
                        size="small"
                        onChange={onChange}
                        value={room?.floorNumber || ""}
                        helperText={errors.floorNumber}
                        InputLabelProps={{ shrink: true }}
                    />

                </Grid>
                <Grid item xs={12} md={3}>
                    <CustomDropdown
                        label="Departments"
                        name="departmentId"
                        dataSource={departments}
                        value={room?.departmentId}
                        size={'small'}
                        onChange={onChange}
                        columnsToDisplay={[
                            { key: "name", label: "Name" },
                            { key: "code", label: "Code" }
                        ]}
                        columnWidths={['60%', '40%']}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Amount"
                        onChange={onChange}
                        name="amount"
                        value={room?.amount}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        min={1}
                        max={9999999}
                        required={true}
                        disabled={!room?.overrideDefaultAmount}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="overrideDefaultAmount"
                                checked={room?.overrideDefaultAmount}
                                onChange={handleOverrideAmountCheckboxChange}
                                inputProps={{ 'aria-label': 'Override Default Amount' }}
                            />
                        }
                        label="Override Default Amount"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="active"
                                checked={room?.active}
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
                        value={room?.notes || ""}
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

export default RoomForm;
