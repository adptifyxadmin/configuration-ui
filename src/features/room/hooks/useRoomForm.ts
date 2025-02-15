import { useState } from "react";
import { Room } from "../Room.Type";
import { deleteRoom } from "../../room/RoomService";
import { validateRoomField } from "../../room/RoomValidation";

const useRoomForm = (initialRoom: Room) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentRoom, setCurrentRoom] = useState<Room>(initialRoom);


    const handleSave = (saveCallback: any) => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        // Loop through each field in currentRoom
        for (const [name, value] of Object.entries(currentRoom)) {

            // Find the corresponding field element in the form (assuming they have matching names)
            const fieldElement = document.querySelector(`[name="${name}"]`) as HTMLInputElement;

            // Check if the field is required (you might need to adjust this based on how you render your components)
            const required = fieldElement?.required || false;

            const { valid: fieldValid, error } = validateRoomField(name, value, required);

            if (!fieldValid) {
                valid = false;
                newErrors[name] = error;
            }
        }

        if (valid) {
            saveCallback(currentRoom);
            setErrors({}); // Clear errors on successful save
        } else {
            setErrors(newErrors); // Set errors if validation failed
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target === undefined || e.target === null) {
            setCurrentRoom((prevRoom) => ({
                ...prevRoom,
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

            const { valid, error } = validateRoomField(name, parsedValue, required);

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: valid ? '' : error,
            }));

            setCurrentRoom((prevRoom) => ({
                ...prevRoom,
                [name]: parsedValue,
            }))
        }
    };


    const handleRowClick = (row: Room) => {
        setCurrentRoom(row);
        setErrors({});
    };

    const handleDelete = async (roomId: number, onDelete: () => void) => {
        try {
            await deleteRoom(roomId);
            onDelete();
        } catch (error) {
            console.error("Failed to delete room:", error);
        }
    };

    return {
        currentRoom,
        setCurrentRoom,
        handleSave,
        handleDelete,
        handleRowClick,
        handleInputChange,
        errors,
        setErrors,
    };
};

export default useRoomForm;
