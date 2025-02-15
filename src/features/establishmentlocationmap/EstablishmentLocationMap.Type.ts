export interface EstablishmentLocationMap {
    id?: number;
    name: string;
    establishment: Establishment;
    establishmentId: number;
    establishmentLocationGroupId:number
}

export interface Establishment {
    id: number;
    name: string;
}