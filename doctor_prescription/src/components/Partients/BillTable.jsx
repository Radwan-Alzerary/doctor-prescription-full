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
import { FormattedMessage } from "react-intl";
import { useEffect } from "react";

export default function BillTable(props) {
  useEffect(() => {
    console.log(props.midscapeData);
  }, [props.midscapeData]);

  return (
    <TableContainer className=" h-44 overflow-auto" component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">
              {" "}
              <FormattedMessage id={"Drugs"} defaultMessage="Hello, World!" />
            </TableCell>
            <TableCell align="right">
              <FormattedMessage id={"Dosage"} defaultMessage="Hello, World!" />
            </TableCell>
            <TableCell align="right">
              {" "}
              <FormattedMessage
                id={"No.dosage"}
                defaultMessage="Hello, World!"
              />
            </TableCell>

            <TableCell align="right">
              {" "}
              <FormattedMessage id={"Options"} defaultMessage="Hello, World!" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pharmaceList.map((pharmace) => (
            <TableRow
              className={`${
                props.midscapeData &&
                props.midscapeData.length > 0 &&
                props.midscapeData.map((data) =>
                  data.subject === pharmace.id.name ||
                  data.subject === pharmace.id.midScapeval ||
                  data.object === pharmace.id.name ||
                  data.object === pharmace.id.midScapeval
                    ? "bg-red-200"
                    : ""
                )
              }`}
              key={pharmace.name}
              onClick={() => {
                console.log(pharmace);
                console.log(props.midscapeData);
              }}
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
