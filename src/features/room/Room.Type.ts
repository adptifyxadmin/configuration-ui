import { EstablishmentLocationMap } from "../establishmentlocationmap/EstablishmentLocationMap.Type";

export interface Room {
    id: number;
    name: string;
    code: string;
    roomTypeId: number;    
    establishmentLocationGroupId: number;
    floorNumber: string;
    departmentId: number;    
    amount: number;
    overrideDefaultAmount: boolean;
    numberOfBeds: number;
    notes: string;    
    establishmentLocationMaps: EstablishmentLocationMap[];
    active: boolean;
}

export interface RoomFormProps {
    room: Room;
    onSave: (e: any) => void;
    onChange: (e:any) => void;
    onCancel: (e: any) => void;
    errors: any;
}

export interface RoomListProps {
    rooms: Room[];
    onRoomSelect: (room: Room) => void;
    selectedIds: number[];
    onCheckBoxSelectionChange: (newSelectionModel: any) => void;
}

export interface RoomState {
    rooms: Room[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
