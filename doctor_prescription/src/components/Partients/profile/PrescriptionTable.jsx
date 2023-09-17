import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "createdAt",
    headerName: "تاريخ الوصفة",
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
  },
  { field: "MedicalDiagnosis", headerName: "التشخيص", width: 330 },
  {
    field: "pharmaceutical",
    headerName: "الادوية",
    width: 330,
    valueGetter: (params) => {
      const pharmaceuticalArray = params.row.pharmaceutical;
      // Extract the id and name properties from each item in the array
      const pharmaceuticalNames = pharmaceuticalArray.map(
        (item) => item.id.name
      );
      console.log(pharmaceuticalNames);
      // Join the extracted names into a string and display it in the cell
      return pharmaceuticalNames.join(", ");
    },
  },
];

export default function PrescriptionTable(props) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.prescriptionData}
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
