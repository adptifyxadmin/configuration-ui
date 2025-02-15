import { Room } from "../room/Room.Type";
import apiClient from "../../shared/utils/apiClient";

const API_URL = "/Rooms";

export const getRooms = async () => {
    try {
        const response = await apiClient.get<Room[]>(API_URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addRoom = async (room: Room) => {
    try {
        const response = await apiClient.post<Room>(API_URL, room);
        return response.data;
    }
    catch (error: any) {
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const updateRoom = async (room: Room) => {
    try {       
        const response = await apiClient.put<Room>(API_URL, room);
        return response.data;
    } catch (error: any) {        
        const serviceError = error?.response?.data?.errorMessage || "An unknown error occurred";
        throw new Error(serviceError);
    }
};

export const deleteRoom = async (roomId: number) => {
    try {
        await apiClient.delete(`${API_URL}/${roomId}`);
    } catch (error: any) {        
        throw new Error(error.response?.data?.message || "Failed to delete the room.");
    }
};
