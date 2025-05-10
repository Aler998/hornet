import { GridColDef } from '@mui/x-data-grid';

export default interface TableProps {
    columns: GridColDef[]
    rows?: object[]
}