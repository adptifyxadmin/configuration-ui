import React from "react";
import { GridViewProps } from "../types/GridViewProps";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const GridView: React.FC<GridViewProps> = ({
  data,
  columns,
  onRowClick,
  onLinkClick,
  rowSelectionModel,
  onRowSelectionModelChange,
  sx,
  linkColumnNames,
  disableMultipleRowSelection
}) => {
  // Modify the columns to include a link in the FirstName column
    let modifiedColumns: GridColDef[] = [...columns]; // Copy the original columns

    if (linkColumnNames) {
        linkColumnNames.forEach((columnName) => {
            modifiedColumns = modifiedColumns.map((col) => {
                if (col.field === columnName) {
                    return {
                        ...col,
                        renderCell: (params: any) => (
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => onLinkClick && onLinkClick(params.row)}
                            >
                                {params.value}
                            </Button>
                        ),
                    };
                }
                return col;
            });
        });
    }


  return (
      <DataGrid         
      rows={data}
      columns={modifiedColumns}
      pagination
      checkboxSelection
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={onRowSelectionModelChange}
      disableMultipleRowSelection={disableMultipleRowSelection}
      onRowClick={(params) => {
        if (onRowClick) {
          onRowClick(params.row);
        }
      }}
      getRowId={(row: any) => row.id}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#3498db", // Set header background color
          color: "#fff", // Set header text color
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#1976d2 !important", // Apply header cell background color
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold", // Make the header text bold
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none", // Optional: remove the column separator lines
        },
        "& .MuiDataGrid-row": {
          height: 25, // Decrease row height
        },
        "& .MuiDataGrid-cell": {
          padding: "0 5px", // Adjust cell padding for compactness
        },
        ...sx,
      }}
    />
  );
};

export default GridView;
