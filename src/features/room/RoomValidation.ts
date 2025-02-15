// RoomValidation.ts

import { Room } from "./Room.Type";

export const validateRoomForm = (room: Room, required: boolean) => {
    const requiredFields = [
        "code",
        "name"       
    ];

    let formErrors: any = {};
    let valid = true;

    requiredFields.forEach((field: string) => {
        const roomField = room as any;
        const { valid: fieldValid, error } =
            validateRoomField(field, roomField[field], required);
        if (!fieldValid) {
            formErrors[field] = error;
            valid = false;
        }
    });

    return { valid, errors: formErrors };
};

// Function to validate a single field (for use onChange)
export const validateRoomField = (fieldName: String, value: any, required: boolean = false) => {
    let valid = true;
    let error = "";

    switch (fieldName) {       
        case "name":
            if (required && (!value || value.trim() === "")) {
                valid = false;
            }
            break;
        case "code":
            // Handle text fields
            if (required && (!value || value.trim() === "")) {
                valid = false;
            }
            break;       
        default:
            if (required) {
                if (value === undefined || value === null) {
                    valid = false;
                }
            }
            break;
    }

    if (!valid) {
        error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    }

    return { valid, error };
};
