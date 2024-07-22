import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const VisitReportTable = (props) => {
  const columns = [
    {
      field: "createdAt",
      headerName: "تاريخ التقرير",
      width: 170,
      renderCell: (params) => {
        if (params.row && params.row.createdAt) {
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
          return <span>{formattedDate}</span>;
        }
        return <span>غير معروف</span>; // Return a default value if createdAt is undefined
      },
    },
    { field: "CauseOfVisite", headerName: "سبب الزيارة", width: "120" },
    {
      field: "chiefComplaint",
      headerName: "تفاصيل التشخيص المرضي",
      width: "120",
    },
    { field: "investigation", headerName: "الفحص السريري", width: "120" },
    { field: "diagnosis", headerName: "التشخيص", width: "80" },
    { field: "management", headerName: "الادارية", width: "80" },
    {
      field: "priority",
      headerName: "الأولوية",
      width: 120,
    },
    {
      field: "actions",
      headerName: "الخيارات",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => {
              props.onVisitDeleteHandel(params.row._id);
            }}
            sx={{ color: red[400] }}
            className=" hover:text-red-600"
            aria-label="delete"
          >
            <Delete fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => {
              props.onVisitEditHandel(params.row._id);
            }}
            sx={{ color: blue[400] }}
            className=" hover:text-red-600"
            aria-label="edit"
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </div>
      ),
    },
  ];

  // Function to determine row class based on priority
  const getRowClassName = (params) => {
    const priority = params.row.priority;

    // Apply different row styles based on priority
    if (priority === "normal") {
      return "bg-white"; // White background for normal priority
    } else if (priority === "medium") {
      return "bg-red-200"; // Light red background for medium priority
    } else if (priority === "high") {
      return "bg-red-400"; // Darker red background for high priority
    } else if (priority === "dangers") {
      return "bg-red-600"; // Darker red background for high priority
    }

    // Default row style if priority doesn't match known values
    return "";
  };

  // Handle row click event
  const handleRowClick = (params) => {
    console.log("Row clicked:", params.row);
    props.onVisitEditHandel(params.row._id);

    // You can perform additional actions here, such as navigating to a detailed view
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={props.visitData}
        columns={columns}
        getRowId={(row) => row._id} // Use _id as the custom id
        getRowClassName={getRowClassName} // Apply row styles dynamically based on priority
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={handleRowClick} // Add row click event handler
      />
    </div>
  );
};

export default VisitReportTable;
