import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  // { field: '_id', headerName: 'ID', width: 70 },
  {
    field: "createdAt",
    headerName: "تاريخ التقرير",
    width: 170,
    valueGetter: (params) => {
      const createdAt = new Date(params.row.createdAt);
      // Format the date to include year, month, day, and time
      const formattedDate = `${createdAt.getFullYear()}-${String(
        createdAt.getMonth() + 1
      ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(
        2,
        "0"
      )} ${String(createdAt.getHours()).padStart(2, "0")}:${String(
        createdAt.getMinutes()
      ).padStart(2, "0")}`;

      return formattedDate;
    },
  },  { field: 'report', headerName: 'التقرير', width: "330" },
];


export default function MedicalReportTable(props) {
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={props.medicalReportData}
        columns={columns}
        getRowId={(row) => row._id} // Use _id as the custom id
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}