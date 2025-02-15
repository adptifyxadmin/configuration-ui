// TreatmentValidation.ts

import { Treatment } from "./Treatment.Type";

export const validateTreatmentForm = (treatment: Treatment, required: boolean) => {
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
        const treatmentField = treatment as any;
        const { valid: fieldValid, error } =
            validateTreatmentField(field, treatmentField[field], required);
        if (!fieldValid) {
            formErrors[field] = error;
            valid = false;
        }
    });

    return { valid, errors: formErrors };
};

// Function to validate a single field (for use onChange)
export const validateTreatmentField = (fieldName: String, value: any, required: boolean = false) => {
    let valid = true;
    let error = "";

    switch (fieldName) {
        case "email":
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Please enter a valid email address";
                valid = false;
            }
            break;
        case "phoneNumber":
            if (!value || !/^\d{10}$/.test(value)) {
                error = "Please enter a valid 10-digit mobile number";
                valid = false;
            }
            break;
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
