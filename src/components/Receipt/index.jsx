import React, { useRef } from "react";
import Navbar from "../Utils/Navbar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableHead } from "@mui/material";

import "./index.css";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const columns = [
  { id: "sno", label: "Sr. No." },
  { id: "receiptNo", label: "Receipt No." },
  {
    id: "receiptDate",
    label: "Receipt Date",
  },
  {
    id: "personName",
    label: "Person Name",
  },
  {
    id: "totalQty",
    label: "Total Qty",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "netAmount",
    label: "Net Amount",
    format: (value) => value.toLocaleString("en-US") + " Rs.",
  },
  {
    id: "remarks",
    label: "Remarks",
  },
];

const rows = [
  {
    sno: "1",
    receiptNo: "1001",
    receiptDate: "09/08/2023",
    personName: "John",
    totalQty: 100,
    netAmount: 50000,
    remarks: "Payment partially done!",
  },
  {
    sno: "1",
    receiptNo: "1001",
    receiptDate: "09/08/2023",
    personName: "John",
    totalQty: 100,
    netAmount: 50000,
    remarks: "Payment partially done!",
  },
  {
    sno: "1",
    receiptNo: "1001",
    receiptDate: "09/08/2023",
    personName: "John",
    totalQty: 100,
    netAmount: 50000,
    remarks: "Payment partially done!",
  },
  {
    sno: "1",
    receiptNo: "1001",
    receiptDate: "09/08/2023",
    personName: "John",
    totalQty: 100,
    netAmount: 50000,
    remarks: "Payment partially done!",
  },
  {
    sno: "1",
    receiptNo: "1001",
    receiptDate: "09/08/2023",
    personName: "John",
    totalQty: 100,
    netAmount: 50000,
    remarks: "Payment partially done!",
  },
];

const Receipt = (props) => {
  const tableRef = useRef(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Navbar {...props} />
      <div className="auth-wrapper mt-5" style={{ height: "auto" }}>
        <div className="auth-inner mb-5" style={{ maxWidth: "90%" }}>
          {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
          <div className="mb-1 text-end">
            <Link to="/receipt/add">
              <button className="btn btn-primary me-2">Add</button>
            </Link>
            <button className="btn btn-primary me-2">Refresh</button>
            <DownloadTableExcel
              filename="receiptList"
              sheet="receipts"
              currentTableRef={tableRef.current}
            >
              <button className="btn btn-primary me-2">Print</button>
            </DownloadTableExcel>
            <button className="btn btn-primary me-2">Exit</button>
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <table className="custom-table" stickyHeader aria-label="sticky table" ref={tableRef}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align}
                      style={{ minWidth: column?.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell key={"action"}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            <button
                              className="text-success me-2"
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                            >
                              <Edit />
                            </button>
                            <button
                              className="text-danger me-2"
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                            >
                              <Delete />
                            </button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </table>
          </TableContainer>
          <TablePagination
            className="pagination"
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
          {/* </Paper> */}
        </div>
      </div>
    </>
  );
};

export default Receipt;
