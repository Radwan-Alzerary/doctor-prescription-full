import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete, Edit, Favorite } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { red } from "@mui/material/colors";

const Drugnamet = () => {
  return <FormattedMessage id={"Drug name"} defaultMessage="Hello, World!" />;
};
const CategoryTr = () => {
  return <FormattedMessage id={"Category"} defaultMessage="Hello, World!" />;
};
const DosageTr = () => {
  return <FormattedMessage id={"Dosage"} defaultMessage="Hello, World!" />;
};
const NodosageTr = () => {
  return <FormattedMessage id={"No.dosage"} defaultMessage="Hello, World!" />;
};
const TakeTimeTr = () => {
  return <FormattedMessage id={"Take time"} defaultMessage="Hello, World!" />;
};
const optionTr = () => {
  return <FormattedMessage id={"Options"} defaultMessage="Hello, World!" />;
};

const headCells = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: Drugnamet(),
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: CategoryTr(),
  },
  {
    id: "dose",
    numeric: false,
    disablePadding: false,
    label: DosageTr(),
  },
  {
    id: "doseCount",
    numeric: false,
    disablePadding: false,
    label: NodosageTr(),
  },
  {
    id: "intaketime",
    numeric: false,
    disablePadding: false,
    label: TakeTimeTr(),
  },
  {
    id: "tools",
    numeric: false,
    disablePadding: false,
    label: optionTr(),
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function PharmaceuticalTable(props) {
  const { rows, onDeleteHandle, onEditHandle, onFavoriteHandle } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = Math.max(0, rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.category ? row.category.name : ""}
                      </TableCell>
                      <TableCell align="center">{row.dose}</TableCell>
                      <TableCell align="center">{row.doseCount}</TableCell>
                      <TableCell align="center">
                        {row.intaketime
                          ? row.intaketime.name
                          : row.anotherIntaketime}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            onDeleteHandle(row._id);
                          }}
                          aria-label="delete"
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onEditHandle(row._id);
                          }}
                          aria-label="edit"
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onFavoriteHandle(row._id);
                          }}
                          sx={
                            row.favorite
                              ? { color: red[500] }
                              : { color: red[100] }
                          }
                          aria-label="edit"
                        >
                          <Favorite fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
