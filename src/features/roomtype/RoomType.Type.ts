import { EstablishmentLocationMap } from "../establishmentlocationmap/EstablishmentLocationMap.Type";

export interface RoomType {
    id: number;
    name: string;
    code: string;
    active: boolean;
    amount: number;
    amountEffectiveDate: string | null;
    previousAmount: number;
    notes: string;
    typeCategoryId: number;
    establishmentLocationMaps: EstablishmentLocationMap[];
}

export interface RoomTypeFormProps {
    roomType: RoomType;
    onSave: (e: any) => void;
    onChange: (e: any) => void;
    onCancel: (e: any) => void;
    errors: any;
}

export interface RoomTypeListProps {
    roomTypes: RoomType[];
    onRoomTypeSelect: (roomType: RoomType) => void;
    selectedIds: number[];
    onCheckBoxSelectionChange: (newSelectionModel: any) => void;
}

//This interface is required to fix the casing issue with properties for custom oData
export interface CustomRoomType {
    Id: number;
    Name: string;
    Code: string;
    Amount: number;
    EstablishmentLocationGroupId: number;
}

export interface RoomTypeState {
    roomTypes: RoomType[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export interface SystemCode {
    id: number;
    name: string;
    code: string;    
}

