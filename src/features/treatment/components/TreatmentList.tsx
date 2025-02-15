import { TreatmentListProps } from "../Treatment.Type";
import { GridColDef } from "@mui/x-data-grid";
import GridView from "../../../shared/components/GridView";

const TreatmentList: React.FC<TreatmentListProps> = (
    {
        treatments,
        onTreatmentSelect,
        onCheckBoxSelectionChange,
        selectedIds }) => {

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, width: 150 },
        { field: "code", headerName: "Code", flex: 1, width: 150 },        
        { field: "amount", headerName: "Amount", flex: 1, width: 150 },
        { field: "durationInMinutes", headerName: "Duration In Minutes", flex: 1, width: 150 },
        { field: "notes", headerName: "Notes", flex: 1, width: 150 },
        { field: "active", headerName: "Active", flex: 1, width: 150 }
    ];

    return (
        <div>
            <div style={{ height: "400px", width: "100%" }}>
                <GridView
                    data={treatments}
                    columns={columns}
                    rowSelectionModel={selectedIds}
                    onRowSelectionModelChange={onCheckBoxSelectionChange}
                    onLinkClick={onTreatmentSelect}
                    linkColumnNames={["name"]}
                    disableMultipleRowSelection={true}
                ></GridView>
            </div>
        </div>
    );
};

export default TreatmentList;
