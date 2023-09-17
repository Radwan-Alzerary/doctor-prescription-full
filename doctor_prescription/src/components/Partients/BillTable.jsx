import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BillTable(props) {
  return (
    <TableContainer className=" h-44 overflow-auto" component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">اسم الدواء</TableCell>
            <TableCell align="right">الجرعة</TableCell>
            <TableCell align="right">عدد الجرعات</TableCell>
            <TableCell align="right">الخيارات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pharmaceList.map((pharmace) => (
            <TableRow
              key={pharmace.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row"></TableCell>

              <TableCell align="right" component="th" scope="row">
                {pharmace.id.name}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {pharmace.dose}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {pharmace.doseNum}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton
                  onClick={() => {
                    props.onBillInsideRemove(pharmace._id);
                  }}
                >
                  <Delete sx={{ color: red[500] }}></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
