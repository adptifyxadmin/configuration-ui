import {
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export interface GridViewProps {
  data: GridRowsProp;
  columns: GridColDef[];
  onRowClick?: (row: any) => void;
  onLinkClick?: (row: any) => void; // Add this prop to handle link clicks
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
  sx?: object;
  linkColumnNames?: string[];
  disableMultipleRowSelection?:boolean
}
