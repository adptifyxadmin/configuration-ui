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


import { RoomTypeFormProps, SystemCode } from "../RoomType.Type";
import { formatDateForInput } from "../../../shared/utils/formatDate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import CustomDropdown from "../../../shared/components/dropdowns/CustomDropdown";
import { fetchRoomCategoryTypesAsync } from "../../roomtype/RoomTypeSlice"

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({
    roomType,
    errors,
    onChange,
    onSave,
    onCancel
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [selectedCategoryId, setSelectedCategoryId] = useState(roomType.typeCategoryId);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [roomTypeCategories, setRoomTypeCategories] = useState<SystemCode[]>([]);
    
    useEffect(() => {
        const loadDropdownData = async () => {
            try {                
                const data = await dispatch(fetchRoomCategoryTypesAsync()).unwrap();                
                setRoomTypeCategories(data);
            } catch (error) {
                console.error('Failed to fetch dropdown data:', error);
            }
         };

        loadDropdownData();
        },[]);

    useEffect(() => {
        setSelectedCategoryId(roomType.typeCategoryId);
    }, [roomType.typeCategoryId]); // Dependency array

    
    // Get tomorrow's date in YYYY-MM-DD format
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day for tomorrow
        return tomorrow.toISOString().split('T')[0];
    };


    //The code inside the below useEffect will run every time when the value of
    //selectedCategoryId or categoryTypes is changed.
    useEffect(() => {
        const selectedCategory = roomTypeCategories.find(
            (category) => category.id === selectedCategoryId
        );
        setSelectedCategoryName(selectedCategory ? selectedCategory.name : "");
    }, [selectedCategoryId, roomTypeCategories]);

    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(e); // Update the roomType's amountEffectiveDate

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

    const handleRoomTypeCategoryDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = event.target.value as number;
        setSelectedCategoryId(newValue);      

        const selectedCategoryName = roomTypeCategories.find(x => x.id === newValue)?.name
        var amount = selectedCategoryName === "Treatment" ? 0 : roomType.amount;       

        // Update the Room object with the selected RoomType.Amount
        const updatedRoomType = {
            ...roomType,
            amount: amount,
            typeCategoryId: newValue
        };

        onChange(updatedRoomType);
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
                        value={roomType?.name || ""}
                        error={!!errors.name}
                        helperText={errors.name}
                        inputProps={{ maxLength: 50 }} 
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
                        value={roomType?.code || ""}
                        error={!!errors.code}
                        helperText={errors.code}
                        required
                        onChange={onChange}
                        inputProps={{ maxLength: 10 }} 
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>                
                <Grid item xs={12} md={3}>
                    <CustomDropdown
                        label="Room Type Category"
                        name="typeCategoryId"
                        dataSource={roomTypeCategories}
                        value={roomType.typeCategoryId}
                        size={'small'}   
                        required = {true}
                        onChange={handleRoomTypeCategoryDropdownChange}
                        columnsToDisplay={[
                            { key: "name", label: "Name" },
                        ]} // Specify columns and headers
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <NumericInput
                        label="Amount"
                        name="amount"
                        value={roomType.amount}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        onChange={onChange}
                        required={selectedCategoryName === "Admission"}
                        min={1}
                        max={9999999}
                        disabled={selectedCategoryName === "Treatment"}
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
                        value={formatDateForInput(roomType?.amountEffectiveDate)}
                        error={!!errors.dateOfBirth} // Custom error handling
                        helperText={errors.dateOfBirth} // Custom error message
                        onChange={handleDateChange}
                        InputLabelProps={{ shrink: true }}
                        disabled={selectedCategoryName === "Treatment"}
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
                        value={roomType?.previousAmount || ""}
                        error={!!errors.previousAmount}
                        helperText={errors.previousAmount}
                        onChange={onChange}
                        min={1}
                        max={9999999}
                        required={!!roomType?.amountEffectiveDate} //// Required when date is selected
                        disabled={!roomType?.amountEffectiveDate || selectedCategoryName === "Treatment"}
                    />

                </Grid>
               
                <Grid item xs={12} md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="active"
                                checked={roomType.active}
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
                        value={roomType?.notes || ""}
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

export default RoomTypeForm;
