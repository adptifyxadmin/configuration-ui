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
    DeleteIcon
} from "../../../shared/utils/muiImports";


import TreatmentForm from "../components/TreatmentForm";
import TreatmentList from "../components/TreatmentList";
import { Treatment } from "../Treatment.Type";
import { toast } from "react-toastify";
import DeleteConfirmationDialog from "../../../shared/components/DeleteConfirmationDialog";
import { editTreatmentAsync, createTreatmentAsync } from '../../treatment/TreatmentSlice';
import useTreatmentForm from "../hooks/useTreatmentForm";
import useTreatments from "../hooks/useTreatments";

const TreatmentPage: React.FC = () => {
    const emptyTreatment: Treatment = {
        id: 0,
        name: "",
        code: "",
        active: false,
        amount: 0,
        amountEffectiveDate: null,
        previousAmount: 0,
        notes: "",
        durationInMinutes:0,
        establishmentLocationMaps: []
    };
    const TreatmentListHeader: string = "TreatmentList";
    const TreatmentFormHeader: string = "TreatmentForm";

    const [isTreatmentListExpanded, setIsTreatmentListExpanded] = useState(true);
    const [isTreatmentFormExpanded, setIsTreatmentFormExpanded] = useState(false);
    const { treatments, editTreatment, createTreatment, removeTreatment } = useTreatments();    
    const [checkBoxSelectionModel, setCheckBoxSelectionModel] = useState<number[]>([]);

    const {
        handleRowClick,
        setCurrentTreatment,
        currentTreatment,
        handleInputChange,
        handleSave,
        errors,
        setErrors,
    } = useTreatmentForm(emptyTreatment);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const handleCreateNewtreatment = () => {
        setCurrentTreatment(emptyTreatment);
        manageAccordion(true);
    };

    const manageAccordion = (isExpanded: boolean) => {
        setIsTreatmentFormExpanded(isExpanded);
        setIsTreatmentListExpanded(!isExpanded);
    };

    const HandleSaveClick = async () => {
        handleSave(async (treatment: Treatment) => {
            try {
                if (currentTreatment.amountEffectiveDate === '') {
                    currentTreatment.amountEffectiveDate = null;
                }
                if (treatment.id) {
                    const resultAction = await editTreatment(currentTreatment);

                    if (editTreatmentAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Treatment"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (editTreatmentAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Treatment updated successfully!");
                        setCurrentTreatment(emptyTreatment);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                }
                else {
                    const resultAction = await createTreatment(currentTreatment);
                    if (createTreatmentAsync.rejected.match(resultAction)) {
                        // Handle the case when the action is rejected
                        const errorMessage = typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : String(resultAction.payload) || "Failed to save Treatment"; // Convert to string or use default message
                        toast.error(errorMessage);
                    } else if (createTreatmentAsync.fulfilled.match(resultAction)) {
                        // Handle the case when the action is fulfilled
                        toast.success("Treatment added successfully!");
                        setCurrentTreatment(emptyTreatment);
                        manageAccordion(false);
                    } else {
                        // Optionally handle any unexpected outcomes
                        toast.error("An unexpected error occurred");
                    }
                   
                }

            } catch (error) {
                toast.error("Failed to save Treatment");
                console.error(error);                
            }
        });
    };

    const handleDeleteRequest = () => {
        if (checkBoxSelectionModel === null || checkBoxSelectionModel === undefined || checkBoxSelectionModel.length <= 0) {
            toast.error("Please select a Treatment from the grid.");
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
        removeTreatment(deleteId)
            .then(() => toast.success("Treatment deleted successfully!"))
            .catch(() => toast.error("Failed to delete Treatment"));
        setIsDeleteDialogOpen(false);
        handleCreateNewtreatment();
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
            if (panel === TreatmentListHeader) {
                manageAccordion(false);
            }

            if (panel === TreatmentFormHeader) {
                manageAccordion(true);
            }
        };

    const handleCancel = (e: any) => {
        setIsTreatmentFormExpanded(false);
        setIsTreatmentListExpanded(true);
        setCurrentTreatment(emptyTreatment);
        setErrors({});
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
                <Accordion
                    expanded={isTreatmentListExpanded}
                    onChange={handleAccordionChange(TreatmentListHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="treatment-list-content"
                        id="treatment-list-header"
                    >
                        <Typography>Treatments</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TreatmentList treatments={treatments}
                            onTreatmentSelect={handleRowSelect}
                            onCheckBoxSelectionChange={handleCheckBoxSelectionChange}
                            selectedIds={checkBoxSelectionModel}
                        />
                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <Button
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleCreateNewtreatment}
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
                    expanded={isTreatmentFormExpanded}
                    onChange={handleAccordionChange(TreatmentFormHeader)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="treatment-form-content"
                        id="treatment-form-header"
                    >
                        <Typography>{currentTreatment.name} - {currentTreatment.code}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TreatmentForm
                            treatment={currentTreatment}
                            errors={errors}
                            onChange={handleInputChange}
                            onSave={HandleSaveClick}
                            onCancel={handleCancel}
                        />
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <DeleteConfirmationDialog
                message={`Are you sure you want to delete this Treatment?`} // Pass the message here
                open={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDelete}
                entityName={"Treatment"}
            ></DeleteConfirmationDialog>
        </Box>
    );
};

export default TreatmentPage;
