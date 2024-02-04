import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "date",
    headerName: "تاريخ الزيارة",
    width: 140,
    valueGetter: (params) => {
      const createdAt = new Date(params.row.date);

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
  {
    field: "visitReportCount",
    headerName: "عدد تقارير الزيارة",
    width: 110,
  },

  {
    field: "prescriptionCount",
    headerName: "عدد الفحوصات",
    width: 110,
  },
  {
    field: "medicalReportsCount",
    headerName: "عدد التقارير الطبية",
    width: 110,
  },
  {
    field: "laboryReportCount",
    headerName: "عدد التقارير المختبرية",
    width: 110,
    
  },

];

export default function VisitDateTable(props) {
    console.log(props.visitData)
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.visitData}
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
