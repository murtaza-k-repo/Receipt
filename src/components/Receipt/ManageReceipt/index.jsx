import React, { useState } from "react";
import Navbar from "../../Utils/Navbar";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TableHead } from "@mui/material";

import "./index.css";
import { Delete, Edit, Widgets } from "@mui/icons-material";

const columns = [
  { id: "sno", label: "Sr." },
  { id: "description", label: "Description" },
  {
    id: "unit",
    label: "Unit",
  },
  {
    id: "rate",
    label: "Rate",
  },
  {
    id: "qty",
    label: "Qty",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "Discount",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
  },
];

const defaultRows = new Array(8).fill({
  sno: <input type="number" className="form-control" />,
  description: <textarea rows={1} type="text" className="form-control" />,
  unit: <input type="text" className="form-control" />,
  rate: <input type="text" className="form-control" />,
  qty: <input type="text" className="form-control" />,
  discount: <input type="text" className="form-control" />,
  amount: <input type="text" className="form-control" />,
});

const ManageReceipt = (props) => {
  const [rows, setRows] = useState(defaultRows);

  const handleAddRow = () => {
    let newRow = {
      sno: <input type="number" className="form-control" />,
      description: <textarea rows={1} type="text" className="form-control" />,
      unit: <input type="text" className="form-control" />,
      rate: <input type="text" className="form-control" />,
      qty: <input type="text" className="form-control" />,
      discount: <input type="text" className="form-control" />,
      amount: <input type="text" className="form-control" />,
    };
    setRows([ ...rows, newRow ]);
  };

  return (
    <>
      <Navbar {...props} />
      <div className="auth-wrapper mt-5" style={{ height: "auto" }}>
        <div className="auth-inner mb-5" style={{ maxWidth: "90%" }}>
          <div className="mb-2 text-end">
            <button className="btn btn-primary me-2">Save</button>
            <Link to="/receipt">
              <button className="btn btn-primary me-2">Cancel</button>
            </Link>
            <button className="btn btn-primary me-2">Delete</button>
            <button className="btn btn-primary me-2">Print</button>
          </div>
          <div className="row">
            <div className="col-6">
              <span>
                <strong>Receipt No:</strong>
              </span>{" "}
              &nbsp; <span>1001</span>
            </div>
            <div className="col-6">
              <span>
                <strong>Receipt Date:</strong>
              </span>{" "}
              &nbsp; <span>09/08/2023</span>
            </div>
          </div>
          <div className="row mt-4 mb-3">
            <div className="col-12">
              <span>
                <strong>Person Name:</strong>
              </span>{" "}
              <span>John</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                  stickyHeader
                  style={{ border: "1px solid #eee" }}
                  aria-label="sticky table"
                >
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
                    {rows.map((row, index) => {
                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ border: "1px solid #eee" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell>
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
                  </TableBody>
                  <TableFooter >
                    <div className="p-2">
                      <button onClick={handleAddRow} className="btn btn-primary">Add Row</button>
                    </div>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label htmlFor="remarks">Remarks:</label>
              <textarea rows={3} className="form-control" id="remarks" />
            </div>
            <div className="col-4">
              <label htmlFor="totalQty">Total Qty: &nbsp;</label>
              <input type="text" id="totalQty" className="form-control" />
            </div>
            <div className="col-4">
              <p>
                <label htmlFor="totalAmt">Total Amt: &nbsp;</label>
                <input type="text" id="totalAmt" className="form-control" />
              </p>
              <p>
                <label htmlFor="discount">Discount: &nbsp;</label>
                <input type="text" id="discount" className="form-control" />
              </p>
              <p>
                <label htmlFor="netAmount">Net Amount: &nbsp;</label>
                <input type="text" id="netAmount" className="form-control" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReceipt;
