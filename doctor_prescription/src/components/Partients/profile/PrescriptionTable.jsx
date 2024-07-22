import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";

export default function PrescriptionTable(props) {
  const columns = [
    {
      field: "date",
      headerName: "تاريخ الزيارة",
      width: 140,
      renderCell: (params) => {
        const createdAt = new Date(params.value);

        // Format the date to include year, month, day, and time
        const formattedDate = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(
          2,
          "0"
        )} ${String(createdAt.getHours()).padStart(2, "0")}:${String(
          createdAt.getMinutes()
        ).padStart(2, "0")}`;

        return <span>{formattedDate}</span>;
      },
    },
    { field: "MedicalDiagnosis", headerName: "التشخيص", width: 230 },
    {
      field: "pharmaceutical",
      headerName: "الادوية",
      width: 330,
      renderCell: (params) => {
        // Ensure the pharmaceutical property exists and is an array
        if (!Array.isArray(params.row.pharmaceutical)) {
          return <span>غير معروف</span>;
        }

        const pharmaceuticalArray = params.row.pharmaceutical;
        // Extract the id and name properties from each item in the array
        const pharmaceuticalNames = pharmaceuticalArray.map((item) =>
          item && item.id && item.id.name ? item.id.name : "غير معروف"
        );

        // Join the extracted names into a string and display it in the cell
        return <span>{pharmaceuticalNames.join(", ")}</span>;
      },
    },
    {
      field: "actions",
      headerName: "الخيارات",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => {
              props.onPrescriptionDeleteHande(
                props.partientsProfileId,
                params.row._id
              );
            }}
            sx={{ color: red[400] }}
            className=" hover:text-red-600"
            aria-label="delete"
          >
            <Delete fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => {
              props.onPrescriptionEditHandel(
                props.partientsProfileId,
                params.row._id
              );
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
