import { RoomTypeListProps } from "../RoomType.Type";
import { useState } from "react";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import GridView from "../../../shared/components/GridView";
import { formatDateForInput } from "../../../shared/utils/formatDate";

const RoomTypeList: React.FC<RoomTypeListProps> = ({ roomTypes, onRoomTypeSelect, onCheckBoxSelectionChange,
    selectedIds }) => {
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
        []
    );

    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        setSelectionModel(newSelection);
    };

    const columns: GridColDef[] = [        
        { field: "name", headerName: "Name", flex: 1, width: 150 },
        { field: "code", headerName: "Code", flex: 1, width: 150 },
        {
            field: "typeCategoryId",
            headerName: "Category Type",
            flex: 1,
            width: 150,
            renderCell: (params) => {
                const categoryText = params.value === 1 ? "Admission" : params.value === 2 ? "Treatment" : "N/A";
                return <div>{categoryText}</div>;
            }
        },
       
        { field: "amount", headerName: "Amount", flex: 1, width: 150 },
        {
            field: "amountEffectiveDate",
            headerName: "Amount Effective Date",
            flex: 1,
            width: 150,
            valueFormatter: (params: any) => formatDateForInput(params as string),
        },

        { field: "previousAmount", headerName: "Previous Amount", flex: 1, width: 150 },
        { field: "notes", headerName: "Notes", flex: 1, width: 150 },
        { field: "active", headerName: "Active", flex: 1, width: 150 },

    ];
      
    return (
        <div>
            <div style={{ height: "400px", width: "100%" }}>
                <GridView
                    
                    data={roomTypes}
                    columns={columns}
                    rowSelectionModel={selectedIds}
                    onRowSelectionModelChange={onCheckBoxSelectionChange}
                    onLinkClick={onRoomTypeSelect}
                    linkColumnNames={["name"]}
                    disableMultipleRowSelection={true}
                ></GridView>
            </div>
        </div>
    );
};

export default RoomTypeList;
