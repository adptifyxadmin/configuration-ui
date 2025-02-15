import { CustomRoomType, RoomType, SystemCode } from "../roomtype/RoomType.Type";
import apiClient from "../../shared/utils/apiClient";

const API_URL = "/RoomTypes";
const SYSTEMCODE_API_URL = "/SystemCodes";

export const getRoomTypes = async () => {
    try {
        const response = await apiClient.get<RoomType[]>(API_URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getRoomTypesByEstablishmentId = async (establishmentId:number) => {
    try {
        const url = `${API_URL}/by-establishment/${establishmentId}?$select=id,code,name,amount,establishmentLocationGroupId`;
        const response = await apiClient.get<CustomRoomType[]>(url);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addRoomType = async (roomType: RoomType) => {
    try {
        const response = await apiClient.post<RoomType>(API_URL, roomType);
        return response.data;
    }
    catch (error: any) {
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const updateRoomType = async (roomType: RoomType) => {
    try {       
        const response = await apiClient.put<RoomType>(API_URL, roomType);
        return response.data;
    } catch (error: any) {        
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const deleteRoomType = async (roomTypeId: number) => {
    try {
        await apiClient.delete(`${API_URL}/${roomTypeId}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getRoomCategoryTypes = async () => {
    try {
        const response = await apiClient.get<SystemCode[]>(SYSTEMCODE_API_URL + "?filter=Type eq 'RoomType'");
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

