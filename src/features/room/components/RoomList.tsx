import { RoomListProps } from "../Room.Type";
import { GridColDef } from "@mui/x-data-grid";
import GridView from "../../../shared/components/GridView";

const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomSelect, onCheckBoxSelectionChange, selectedIds }) => {
        
    const columns: GridColDef[] = [        
        { field: "name", headerName: "Name", flex: 1, width: 150 },
        { field: "code", headerName: "Code", flex: 1, width: 150 },        
        { field: "numberOfBeds", headerName: "Number Of Beds", flex: 1, width: 150 },
        { field: "floorNumber", headerName: "Floor Number", flex: 1, width: 150 },        
        { field: "amount", headerName: "Amount", flex: 1, width: 150 },        
        { field: "notes", headerName: "Notes", flex: 1, width: 150 },
        { field: "active", headerName: "Active", flex: 1, width: 150 }

    ];
      
    return (
        <div>
            <div style={{ height: "400px", width: "100%" }}>
                <GridView                    
                    data={rooms}
                    columns={columns}
                    rowSelectionModel={selectedIds}
                    onRowSelectionModelChange={onCheckBoxSelectionChange}
                    onLinkClick={onRoomSelect}
                    linkColumnNames={["name"]}
                    disableMultipleRowSelection={true}
                ></GridView>
            </div>
        </div>
    );
};

export default RoomList;
