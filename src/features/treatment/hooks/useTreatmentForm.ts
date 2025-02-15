import { useState } from "react";
import { Treatment } from "../Treatment.Type";
import { deleteTreatment } from "../../treatment/TreatmentService";
import { validateTreatmentField } from "../../treatment/TreatmentValidation";

const useTreatmentForm = (initialTreatment: Treatment) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentTreatment, setCurrentTreatment] = useState<Treatment>(initialTreatment);


    const handleSave = (saveCallback: any) => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        // Loop through each field in currentTreatment
        for (const [name, value] of Object.entries(currentTreatment)) {

            // Find the corresponding field element in the form (assuming they have matching names)
            const fieldElement = document.querySelector(`[name="${name}"]`) as HTMLInputElement;

            // Check if the field is required (you might need to adjust this based on how you render your components)
            const required = fieldElement?.required || false;

            const { valid: fieldValid, error } = validateTreatmentField(name, value, required);

            if (!fieldValid) {
                valid = false;
                newErrors[name] = error;
            }
        }

        if (valid) {
            saveCallback(currentTreatment);
            setErrors({}); // Clear errors on successful save
        } else {
            setErrors(newErrors); // Set errors if validation failed
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target === undefined || e.target === null) {
            setCurrentTreatment((prevTreatment) => ({
                ...prevTreatment,
                ...e, // Merge the custom object properties into the current treatment type
            }));
        }
        else {

            // Ensure e.target is defined and the correct type
            const { name, value, type, required } = e.target;

            let parsedValue: string | number | boolean | undefined;

            // Handle parsing based on the input type
            if (type === 'number') {
                parsedValue = value === '' ? undefined : parseFloat(value);
            } else if (type === 'checkbox') {
                parsedValue = (e.target as HTMLInputElement).checked; // Cast target to HTMLInputElement
            } else {
                parsedValue = value;
            }

            const { valid, error } = validateTreatmentField(name, parsedValue, required);

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: valid ? '' : error,
            }));

            setCurrentTreatment((prevTreatment) => ({
                ...prevTreatment,
                [name]: parsedValue,
            }))
        }
    };


    const handleRowClick = (row: Treatment) => {
        setCurrentTreatment(row);
        setErrors({});
    };

    const handleDelete = async (treatmentId: number, onDelete: () => void) => {
        try {
            await deleteTreatment(treatmentId);
            onDelete();
        } catch (error) {
            console.error("Failed to delete Treatment:", error);
        }
    };

    return {
        currentTreatment,
        setCurrentTreatment,
        handleSave,
        handleDelete,
        handleRowClick,
        handleInputChange,
        errors,
        setErrors,
    };
};

export default useTreatmentForm;
