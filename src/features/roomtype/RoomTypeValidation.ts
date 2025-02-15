// RoomTypeValidation.ts

import { RoomType } from "./RoomType.Type";

export const validateRoomTypeForm = (roomType: RoomType, required: boolean) => {
    const requiredFields = [
        "code",
        "name",
        "active",
        "amount",
        "amountEffectiveDate",
        "previousAmount",
        "notes",
    ];
    let formErrors: any = {};
    let valid = true;

    requiredFields.forEach((field: string) => {
        const roomTypeField = roomType as any;
        const { valid: fieldValid, error } =
            validateRoomTypeField(field, roomTypeField[field], required);
        if (!fieldValid) {
            formErrors[field] = error;
            valid = false;
        }
    });

    return { valid, errors: formErrors };
};

// Function to validate a single field (for use onChange)
export const validateRoomTypeField = (fieldName: String, value: any, required: boolean = false) => {
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
        case "amount":
            if (required && (isNaN(value) || value <= 0)) {
                valid = false;
            }
            break;
         case "previousAmount":
            if (required && (isNaN(value) || value <= 0)) {
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
