import { EstablishmentLocationMap } from "../establishmentlocationmap/EstablishmentLocationMap.Type";

export interface Treatment {
    id: number;
    name: string;
    code: string;
    active: boolean;
    amount: number;
    durationInMinutes: number;
    amountEffectiveDate: string | null;
    establishmentLocationMaps: EstablishmentLocationMap[];
    previousAmount: number;
    notes: string;
}

export interface TreatmentFormProps {
    treatment: Treatment;
    onSave: (e: any) => void;
    onChange: (e: any) => void;    
    onCancel: (e: any) => void;
    errors: any;
}

export interface TreatmentListProps {
    treatments: Treatment[];
    onTreatmentSelect: (treatment: Treatment) => void;
    onCheckBoxSelectionChange: (newSelectionModel: any) => void; 
    selectedIds: number[];
}

export interface TreatmentState {
    treatments: Treatment[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
