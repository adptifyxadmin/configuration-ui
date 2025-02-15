import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Typography,
    ExpandMoreIcon,
    AddIcon,
    DeleteIcon,
} from "../../../shared/utils/muiImports";


import RoomForm from "../components/RoomForm";
import RoomList from "../components/RoomList";
import useRooms from "../hooks/useRooms";
import useRoomForm from "../hooks/useRoomForm";
import { Room } from "../Room.Type";
import { toast } from "react-toastify";
import DeleteConfirmationDialog from "../../../shared/components/DeleteConfirmationDialog";
import { editRoomAsync, createRoomAsync } from '../RoomSlice';

const RoomPage: React.FC = () => {
    const emptyRoom: Room = {
        id: 0,
        name: "",
        code: "",
        active: false,
        amount: 0,
        notes: "",
        roomTypeId: 0,
        establishmentLocationMaps: [],
        departmentId: 0,
        establishmentLocationGroupId: 0,
        floorNumber: "",
        numberOfBeds: 0,
        overrideDefaultAmount:false
    };
    const RoomListHeader: string = "RoomList";
    const RoomFormHeader: string = "RoomForm";

    const [isRoomListExpanded, setIsRoomListExpanded] = useState(true);
    const [isRoomFormExpanded, setIsRoomFormExpanded] = useState(false);
    const { rooms, editRoom, createRoom, removeRoom } = useRooms();
    const [checkBoxSelectionModel, setCheckBoxSelectionModel] = useState<number[]>([]);

    const {
        handleRowClick,
        setCurrentRoom,
        currentRoom,
        handleInputChange,
        handleSave,
        errors,
        setErrors,
    } = useRoomForm(emptyRoom);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const handleCreateNewroom = () => {
        setCurrentRoom(emptyRoom);
        manageAccordion(true);
    };

    const manageAccordion = (isExpanded: boolean) => {
        setIsRoomFormExpanded(isExpanded);
        setIsRoomListExpanded(!isExpanded);
    };

    const HandleSaveClick = async () => {
        handleSave(async (room: Room) => {
            try {               
                if (room.id) {
                    const resultAction = await editRoom(currentRoom);

                    if (editRoomAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Room"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (editRoomAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Room updated successfully!");
                        setCurrentRoom(emptyRoom);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                }
                else {
                    const resultAction = await createRoom(currentRoom);
                    if (createRoomAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Room"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (createRoomAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Room added successfully!");
                        setCurrentRoom(emptyRoom);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                   
                }

            } catch (error) {
                toast.error("Failed to save Room");
                console.error(error);                
            }
        });
    };

    const handleDeleteRequest = () => {
        if (checkBoxSelectionModel === null || checkBoxSelectionModel === undefined || checkBoxSelectionModel.length <= 0) {
            toast.error("Please select a Room from the grid.");
            return;
        }
        setDeleteId(Number(checkBoxSelectionModel[0]));
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteId(0);
        setIsDeleteDialogOpen(false);
    };

   
const handleDelete = async () => {
         const result = await removeRoom(deleteId);
         setIsDeleteDialogOpen(false);
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Room deleted successfully!");            
            handleCreateNewroom();
            manageAccordion(false);
        } else if (result.meta.requestStatus === "rejected") {
            // Access the error message from `payload`
            const errorMessage = result.payload as string;
            toast.error(errorMessage || "Failed to delete room");
        }
    };

    const handleRowSelect = (e: any) => {
        manageAccordion(true);
        handleRowClick(e);
    };

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            if (panel === RoomListHeader) {
                manageAccordion(false);
            }

            if (panel === RoomFormHeader) {
                manageAccordion(true);
            }
        };

    const handleCancel = (e: any) => {
        setIsRoomFormExpanded(false);
        setIsRoomListExpanded(true);
        setCurrentRoom(emptyRoom);
        setErrors({});
    };

    const handleCheckBoxSelectionChange = (newSelectionModel: any) => {
        setCheckBoxSelectionModel([...newSelectionModel]);
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
                <Accordion
                    expanded={isRoomListExpanded}
                    onChange={handleAccordionChange(RoomListHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="room-list-content"
                        id="room-list-header"
                    >
                        <Typography>Rooms</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RoomList
                            rooms={rooms}
                            onRoomSelect={handleRowSelect}
                            onCheckBoxSelectionChange={handleCheckBoxSelectionChange}
                            selectedIds={checkBoxSelectionModel} />
                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <Button
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleCreateNewroom}
                            >
                                Add
                            </Button>

                            <Button
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteRequest}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid item xs={12} sx={{ padding: 1 }}>
                <Accordion
                    expanded={isRoomFormExpanded}
                    onChange={handleAccordionChange(RoomFormHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="room-form-content"
                        id="room-form-header"
                    >
                        <Typography>
                            {currentRoom && currentRoom.id !== 0
                                ? `${currentRoom.name} - ${currentRoom.code}`
                                : "Create new Room"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RoomForm
                            room={currentRoom}
                            errors={errors}
                            onChange={handleInputChange}
                            onSave={HandleSaveClick}
                            onCancel={handleCancel}
                        />
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <DeleteConfirmationDialog
                message={`Are you sure you want to delete this Room?`} // Pass the message here
                open={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDelete}
                entityName={"Room"}
            ></DeleteConfirmationDialog>
        </Box>
    );
};

export default RoomPage;
