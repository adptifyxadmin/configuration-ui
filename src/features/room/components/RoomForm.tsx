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
  useEffect,
  Typography,
  Divider,
  Paper
} from "../../../shared/utils/muiImports";

import { RoomFormProps } from "../Room.Type";
import { useDispatch } from "react-redux";
import { fetchRoomTypesAsync } from "../../roomtype/RoomTypeSlice";
import { RoomType } from "../../roomtype/RoomType.Type";
import { fetchEstablishmentsAsync } from "../../establishment/EstablishmentSlice";
import CustomDropdown from "../../../shared/components/dropdowns/CustomDropdown";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { Establishment } from "../../establishment/Establishment.Type";
import { EstablishmentLocationMap } from "../../establishmentlocationmap/EstablishmentLocationMap.Type";

const RoomForm: React.FC<RoomFormProps> = ({ room, errors, onChange, onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(room.roomTypeId);
  const [selectedRoomAmount, setSelectedRoomAmount] = useState<number | null>(room.amount);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);
  const [selectedEstablishments, setSelectedEstablishment] = useState<number[]>([]);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [overrideAmount, setOverrideAmount] = useState<number>();

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [data1, data2] = await Promise.all([
          dispatch(fetchRoomTypesAsync()).unwrap(),
          dispatch(fetchEstablishmentsAsync()).unwrap()
        ]);

        setRoomTypes(data1);
        setEstablishments(data2);
        setSelectedEstablishment(room?.establishmentLocationMaps.map(x => x.establishmentId) || []);

        setDepartments([
          { value: "1", text: "Admin" },
          { value: "2", text: "Front Office" },
          { value: "3", text: "Data Entry" },
          { value: "4", text: "Others" }
        ]);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };

    loadDropdownData();
  }, [room]);

  useEffect(() => {
    setSelectedRoomTypeId(room.roomTypeId);
  }, [selectedRoomTypeId]);

  const handleHospitalLocationChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    const selectedHospitalLocations = establishments.filter(x => selectedIds.includes(x.id));

    const establishmentLocationMaps: EstablishmentLocationMap[] = selectedHospitalLocations.map(establishment => ({
      name: establishment.name,
      establishment,
      establishmentId: establishment.id,
      establishmentLocationGroupId: 0
    }));

    setSelectedEstablishment(selectedHospitalLocations.map(x => x.id));

    const updatedRoom = {
      ...room,
      establishmentLocationMaps
    };

    onChange(updatedRoom);
  };

  const roomTypeDropdownChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    const roomTypeId = Number(event.target.value);
  
    const selectedRoomType = roomTypes?.find(type => type.id === roomTypeId);
  
    if (selectedRoomType) {
      setSelectedRoomTypeId(selectedRoomType.id);
      setSelectedRoomAmount(selectedRoomType.amount);
  
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
    const updatedAmount = !checked ? defaultAmount : room.amount;

    const updatedRoom = {
      ...room,
      amount: updatedAmount,
      overrideDefaultAmount: checked
    };

    onChange(updatedRoom);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Room Information
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField label="Name" name="name" fullWidth size="small" required onChange={onChange} value={room?.name || ""} error={!!errors.name} helperText={errors.name} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Code" name="code" fullWidth size="small" value={room?.code || ""} error={!!errors.code} helperText={errors.code} required onChange={onChange} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel shrink>Hospital Locations</InputLabel>
            <Select multiple value={selectedEstablishments} onChange={handleHospitalLocationChange} input={<OutlinedInput label="Hospital Locations" notched />}
              renderValue={(selected) => selected.map(id => establishments.find(option => option.id === id)?.name).join(', ')}>
              {establishments.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  <Checkbox checked={selectedEstablishments.includes(option.id)} />
                  <ListItemText primary={option.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDropdown label="Room Types" name="roomTypeId" dataSource={roomTypes} value={room?.roomTypeId} size='small' onChange={roomTypeDropdownChange} columnsToDisplay={[{ key: "name", label: "Name" }, { key: "amount", label: "Amount" }]} columnWidths={['70%', '30%']} />
        </Grid>
        <Grid item xs={12} md={3}>
          <NumericInput label="Number Of Beds" name="numberOfBeds" value={room?.numberOfBeds} error={!!errors.numberOfBeds} helperText={errors.numberOfBeds} min={1} onChange={onChange} max={9999999} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Floor Number" name="floorNumber" fullWidth size="small" onChange={onChange} value={room?.floorNumber || ""} helperText={errors.floorNumber} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDropdown label="Departments" name="departmentId" dataSource={departments} value={room?.departmentId} size='small' onChange={onChange} columnsToDisplay={[{ key: "text", label: "Name" }]} columnWidths={["100%"]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <NumericInput label="Amount" onChange={onChange} name="amount" value={room?.amount} error={!!errors.amount} helperText={errors.amount} min={1} max={9999999} required disabled={!room?.overrideDefaultAmount} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControlLabel control={<Checkbox name="overrideDefaultAmount" checked={room?.overrideDefaultAmount} onChange={handleOverrideAmountCheckboxChange} />} label="Override Default Amount" />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControlLabel control={<Checkbox name="active" checked={room?.active} onChange={onChange} />} label="Active" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Notes" name="notes" fullWidth size="small" value={room?.notes || ""} error={!!errors.notes} helperText={errors.notes} onChange={onChange} InputLabelProps={{ shrink: true }} multiline rows={4} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onSave}>Save</Button>
          <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomForm;
