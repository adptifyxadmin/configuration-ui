import { Treatment } from "./Treatment.Type";
import apiClient from "../../shared/utils/apiClient";

const API_URL = "/Treatments";

export const getTreatments = async () => {
    try {
        const response = await apiClient.get<Treatment[]>(API_URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addTreatment = async (treatment: Treatment) => {
    try {
        const response = await apiClient.post<Treatment>(API_URL, treatment);
        return response.data;
    }
    catch (error: any) {
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const updateTreatment = async (treatment: Treatment) => {
    try {       
        const response = await apiClient.put<Treatment>(API_URL, treatment);
        return response.data;
    } catch (error: any) {        
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const deleteTreatment = async (treatmentId: number) => {
    try {
        await apiClient.delete(`${API_URL}/${treatmentId}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
