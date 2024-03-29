import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Receipt from "./components/Receipt";
import Protected from "./components/Protected";
import ManageReceipt from "./components/Receipt/ManageReceipt";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/receipt"
            element={
              <Protected>
                <Receipt />
              </Protected>
            }
          ></Route>
          <Route path="/receipt/add" element={<ManageReceipt />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
