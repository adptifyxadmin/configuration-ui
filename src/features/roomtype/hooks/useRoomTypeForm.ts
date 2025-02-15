import { useState } from "react";
import { RoomType } from "../RoomType.Type";
import { deleteRoomType } from "../../roomtype/RoomTypeService";

import {
    validateRoomTypeField
} from "../../roomtype/RoomTypeValidation";

const useRoomTypeForm = (initialRoomType: RoomType) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentRoomType, setCurrentRoomType] = useState<RoomType>(initialRoomType);

  
    const handleSave = (saveCallback: any) => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        // Loop through each field in currentRoomType
        for (const [name, value] of Object.entries(currentRoomType)) {

            // Find the corresponding field element in the form (assuming they have matching names)
            const fieldElement = document.querySelector(`[name="${name}"]`) as HTMLInputElement;

            // Check if the field is required (you might need to adjust this based on how you render your components)
            const required = fieldElement?.required || false;

            const { valid: fieldValid, error } = validateRoomTypeField(name, value, required);

            if (!fieldValid) {
                valid = false;
                newErrors[name] = error;
            }
        }

        if (valid) {
            saveCallback(currentRoomType);
            setErrors({}); // Clear errors on successful save
        } else {
            setErrors(newErrors); // Set errors if validation failed
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target === undefined || e.target === null) {
            //setCurrentRoomType((prevRoomType) => ({
            //    ...prevRoomType,
            //    establishmentLocationMap: (e as any).establishmentLocationMap,
            //}))
            setCurrentRoomType((prevRoomType) => ({
                ...prevRoomType,
                ...e, // Merge the custom object properties into the current room type
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

            const { valid, error } = validateRoomTypeField(name, parsedValue, required);

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: valid ? '' : error,
            }));

            setCurrentRoomType((prevRoomType) => ({
                ...prevRoomType,
                [name]: parsedValue,
            }))
        }            
    };
   

    const handleRowClick = (row: RoomType) => {
        setCurrentRoomType(row);
        setErrors({});
    };

    const handleDelete = async (roomTypeId: number, onDelete: () => void) => {
        try {
            await deleteRoomType(roomTypeId);
            onDelete();
        } catch (error) {
            console.error("Failed to delete roomType:", error);
        }
    };

    return {
        currentRoomType,
        setCurrentRoomType,
        handleSave,
        handleDelete,
        handleRowClick,
        handleInputChange,
        errors,
        setErrors,
    };
};

export default useRoomTypeForm;
