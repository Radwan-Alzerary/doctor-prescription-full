import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { blue, red } from '@mui/material/colors';




export default function LaboryReportTable(props) {

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
    {
      field: "actions",
      headerName: "الخيارات",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => {
              props.handleLabReportDelete(params.row._id);
            }}
            
            sx={{ color: red[400] }}
            className=" hover:text-red-600"
            aria-label="delete"
          >
            <Delete fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => {
              props.handleLabReportEdit(params.row._id);
            }}
            sx={{ color: blue[400] }}
            className=" hover:text-red-600"
            aria-label="delete"
          >
            <Edit fontSize="inherit" />
          </IconButton>{" "}
        </div>
      ),
    },
  
  ];
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={props.laboryData}
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