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


import RoomTypeForm from "../components/RoomTypeForm";
import RoomTypeList from "../components/RoomTypeList";
import useRoomTypes from "../hooks/useRoomTypes";
import useRoomTypeForm from "../hooks/useRoomTypeForm";
import { RoomType } from "../RoomType.Type";
import { toast } from "react-toastify";
import DeleteConfirmationDialog from "../../../shared/components/DeleteConfirmationDialog";
import { editRoomTypeAsync, createRoomTypeAsync } from '../RoomTypeSlice';

const RoomTypePage: React.FC = () => {
    const emptyRoomType: RoomType = {
        id: 0,
        name: "",
        code: "",
        active: false,
        amount: 0,
        amountEffectiveDate: null,
        previousAmount: 0,
        notes: "",
        typeCategoryId: 1,
        establishmentLocationMaps:[]
    };
    const RoomTypeListHeader: string = "RoomTypeList";
    const RoomTypeFormHeader: string = "RoomTypeForm";

    const [isRoomTypeListExpanded, setIsRoomTypeListExpanded] = useState(true);
    const [isRoomTypeFormExpanded, setIsRoomTypeFormExpanded] = useState(false);
    const { roomTypes, editRoomType, createRoomType, removeRoomType } = useRoomTypes();
    const [checkBoxSelectionModel, setCheckBoxSelectionModel] = useState<number[]>([]);

    const {
        handleRowClick,
        setCurrentRoomType,
        currentRoomType,
        handleInputChange,
        handleSave,
        errors,
        setErrors,
    } = useRoomTypeForm(emptyRoomType);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const handleCreateNewroomType = () => {
        setCurrentRoomType(emptyRoomType);
        manageAccordion(true);
    };

    const manageAccordion = (isExpanded: boolean) => {
        setIsRoomTypeFormExpanded(isExpanded);
        setIsRoomTypeListExpanded(!isExpanded);
    };

    const HandleSaveClick = async () => {
        handleSave(async (roomType: RoomType) => {
            try {
                if (currentRoomType.amountEffectiveDate === '') {
                    currentRoomType.amountEffectiveDate = null;
                }
                if (roomType.id) {
                    const resultAction = await editRoomType(currentRoomType);

                    if (editRoomTypeAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Room Type"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (editRoomTypeAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Room Type updated successfully!");
                        setCurrentRoomType(emptyRoomType);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                }
                else {
                    const resultAction = await createRoomType(currentRoomType);
                    if (createRoomTypeAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Room Type"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (createRoomTypeAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Room Type added successfully!");
                        setCurrentRoomType(emptyRoomType);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                   
                }

            } catch (error) {
                toast.error("Failed to save Room Type");
                console.error(error);                
            }
        });
    };

    const handleDeleteRequest = () => {
        if (checkBoxSelectionModel === null || checkBoxSelectionModel === undefined || checkBoxSelectionModel.length <= 0) {
            toast.error("Please select a Room Type from the grid.");
            return;
        }
        setDeleteId(Number(checkBoxSelectionModel[0]));
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteId(0);
        setIsDeleteDialogOpen(false);
    };

    const handleDelete = () => {
        removeRoomType(deleteId)
            .then(() => toast.success("Room Type deleted successfully!"))
            .catch(() => toast.error("Failed to delete Room Type"));
        setIsDeleteDialogOpen(false);
        handleCreateNewroomType();
        manageAccordion(false);
    };

    const handleRowSelect = (e: any) => {
        manageAccordion(true);
        handleRowClick(e);
    };

    const handleCheckBoxSelectionChange = (newSelectionModel: any) => {
        setCheckBoxSelectionModel([...newSelectionModel]);
    };

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            if (panel === RoomTypeListHeader) {
                manageAccordion(false);
            }

            if (panel === RoomTypeFormHeader) {
                manageAccordion(true);
            }
        };

    const handleCancel = (e: any) => {
        setIsRoomTypeFormExpanded(false);
        setIsRoomTypeListExpanded(true);
        setCurrentRoomType(emptyRoomType);
        setErrors({});
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
                <Accordion
                    expanded={isRoomTypeListExpanded}
                    onChange={handleAccordionChange(RoomTypeListHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="roomType-list-content"
                        id="roomType-list-header"
                    >
                        <Typography>Room Types</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RoomTypeList
                            roomTypes={roomTypes}
                            onRoomTypeSelect={handleRowSelect}
                            onCheckBoxSelectionChange={handleCheckBoxSelectionChange}
                            selectedIds={checkBoxSelectionModel} />
                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <Button
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleCreateNewroomType}
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
                    expanded={isRoomTypeFormExpanded}
                    onChange={handleAccordionChange(RoomTypeFormHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="roomType-form-content"
                        id="roomType-form-header"
                    >
                        <Typography>
                            {currentRoomType && currentRoomType.id !== 0
                                ? `${currentRoomType.name} - ${currentRoomType.code}`
                                : "Create new Room Type"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RoomTypeForm
                            roomType={currentRoomType}
                            errors={errors}
                            onChange={handleInputChange}
                            onSave={HandleSaveClick}
                            onCancel={handleCancel}
                        />
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <DeleteConfirmationDialog
                message={`Are you sure you want to delete this Room Type?`} // Pass the message here
                open={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDelete}
                entityName={"RoomType"}
            ></DeleteConfirmationDialog>
        </Box>
    );
};

export default RoomTypePage;
