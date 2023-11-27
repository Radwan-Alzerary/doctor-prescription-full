import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import { useState } from "react";
import NewMedicalReporyForm from "../NewMedicalReporyForm";
import BackGroundShadow from "../../pageCompond/BackGroundShadow";
export default function MedicalReportTable(props) {
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
    },
    { field: "report", headerName: "التقرير", width: "330",      renderCell: (params) => (
      <div
      className="p-editor-content ql-container ql-snow"
      style={{
        border: "none",
        borderColor: "#000",
        direction: "ltr",
      }}
    >
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{
          __html: params.row.report,
        }}
      ></div>
    </div>
),
},
    {
      field: "actions",
      headerName: "الخيارات",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => {
              props.handleReportDelete(params.row._id);
            }}
            sx={{ color: red[400] }}
            className=" hover:text-red-600"
            aria-label="delete"
          >
            <Delete fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => {
              props.handleReportEdit(params.row._id);
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
  const handleEdit = (id) => {
    console.log(`Editing row with id ${id}`);
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Deleting row with id ${id}`);
  };

  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
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
    </>
  );
}
