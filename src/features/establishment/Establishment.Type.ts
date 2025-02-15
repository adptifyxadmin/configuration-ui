export interface Establishment {
    id: number;
    name: string;
    code: string;
    active: boolean;
    industryTypeId: number;
    establishmentGroupId: number;  
}

export interface EstablishmentFormProps {
    establishment: Establishment;
    onSave: (e: any) => void;
    onChange: (e: any) => void;
    onCancel: (e: any) => void;
    errors: any;
}

export interface EstablishmentListProps {
    establishments: Establishment[];
    onEstablishmentSelect: (roomType: Establishment) => void;
}

export interface EstablishmentState {
    establishments: Establishment[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
