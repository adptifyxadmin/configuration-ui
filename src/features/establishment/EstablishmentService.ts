import { Establishment } from "../establishment/Establishment.Type";
import apiClient from "../../shared/utils/apiClient";

const API_URL = "/Establishments";

export const getEstablishments = async () => {
    try {
        const response = await apiClient.get<Establishment[]>(API_URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addEstablishment = async (establishmentType: Establishment) => {
    try {
        const response = await apiClient.post<Establishment>(API_URL, establishmentType);
        return response.data;
    }
    catch (error: any) {
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const updateEstablishment = async (establishmentType: Establishment) => {
    try {       
        const response = await apiClient.put<Establishment>(API_URL, establishmentType);
        return response.data;
    } catch (error: any) {        
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const deleteEstablishment = async (establishmentTypeId: number) => {
    try {
        await apiClient.delete(`${API_URL}/${establishmentTypeId}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
