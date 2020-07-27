import React, { useState, useEffect } from "react";
import _ from "lodash";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { columnData } from "../data";
import axios from "axios";
import { Spin } from "antd";
import { set } from "mongoose";

const BASE_URL = window.location.href.includes("localhost")
  ? "http://localhost:5000"
  : "";
const columnDefs = columnData.columnDefs;

const defaultColDef = {
  flex: 1,
  editable: true,
  resizable: true,
  rowSelection: "multiple",
};

export const Grid = () => {
  const [rowD, setRowD] = useState("");
  const [dataKey, setDataKey] = useState("");
  const [selected, setSelected] = useState("");
  const [keyDown, setKeyDown] = useState("");
  const [sumOfStacks, setSumOfStacks] = useState("");
  const [loader, setLoader] = useState(true);

  const handleChange = (e) => {
    let d = [...rowD];
    let fieldName = e.colDef.field;
    if (
      fieldName === "numOfStacks" ||
      fieldName === "RAM" ||
      fieldName === "notAssigned" ||
      fieldName === "allocationCapacity" ||
      fieldName === "physicalUsage" ||
      fieldName === "CPU"
    ) {
      d[e.rowIndex][e.colDef.field] = parseFloat(e.newValue);
    } else {
      d[e.rowIndex][e.colDef.field] = e.newValue;
    }
    setRowD(d);

    let rowUpdate = dataKey._id;

    axios.put(BASE_URL + "/row/update/" + rowUpdate, dataKey).then((res) => {});
  };

  useEffect(() => {
    setSumOfStacks(_.sumBy(rowD, "numOfStacks"));
  }, [rowD]);
  useEffect(() => {
    axios.get(BASE_URL + "/row").then((res) => {
      return setLoader(false), setRowD(res.data);
    });
  }, []);

  let sumOfRam = _.sumBy(rowD, "RAM") / 1024;
  let sumAllocationCapacity = _.sumBy(rowD, "allocationCapacity") / 1024;
  let sumPhysicalUsage = _.sumBy(rowD, "CPU");
  console.log("selected", selected);
  let newData = {
    department: "",
    numOfStacks: "",
    usage: "",
    owners: "",
    stackType: "",
    RAM: "",
    notAssigned: "",
    allocationCapacity: "",
    physicalUsage: "",
    CPU: "",
  };
  const handleSelectionChange = (e) => {
    // console.log("api", e.api);
    setSelected(e.api);
  };

  const addNewRow = () => {
    axios.post(BASE_URL + "/row", newData).then((res) => {
      setRowD((rowD) => [...rowD, res.data]);
    });
    setLoader(false);
  };
  const onRowDragEnter = (e) => {
    console.log("onRowDragEnter", e);
  };
  const onRowDragEnd = (e) => {
    console.log("onRowDragEnd", e);
  };
  const onRowDragMove = (e) => {
    console.log("onRowDragMove", e);
  };
  const onRowDragLeave = (e) => {
    // console.log("onRowDragLeave", e);
  };

  const removeSelected = () => {
    let selectedData;
    if (selected) {
      selectedData = selected.getSelectedRows();
      console.log("selectedData:", selectedData);
      axios.delete(BASE_URL + "/row/" + selectedData[0]._id).then((res) => {
        for (let index = 0; index < rowD.length; index++) {
          if (rowD[index]._id === res.data._id) {
            setRowD(rowD.filter((item) => item._id !== res.data._id));
          }
        }
      });
      setSelected("");
    } else {
      alert("choose row");
    }
  };
  const onCellKeyPress = (e) => {
    setDataKey(e.node.data);
  };
  const onCellKeyDown = (e) => {
    setKeyDown(e.node.data);
  };
  console.log("keyDown", keyDown);
  return (
    <div>
      <p>{`Stacks: ${sumOfStacks}`}</p>
      <p>{`RAM [GB]: ${sumOfRam}`}</p>
      <p>{`Allocation Capacity [GB]: ${sumAllocationCapacity}`}</p>
      <p>{`Physical Usage [GB]: ${sumPhysicalUsage}`}</p>
      <button onClick={addNewRow}>add row</button>
      <button onClick={removeSelected}>Remove Selected</button>

      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", textAlign: "center" }}
      >
        {loader ? (
          <div>
            <Spin size="large" />
          </div>
        ) : (
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowD}
            onCellValueChanged={(e) => {
              handleChange(e);
            }}
            rowSelection={defaultColDef.rowSelection}
            onSelectionChanged={handleSelectionChange}
            // rowDragManaged={true}
            // animateRows={true}
            // enableMultiRowDragging={true}
            defaultColDef={columnData.defaultColDef}
            onCellKeyPress={(e) => onCellKeyPress(e)}
            onCellKeyDown={(e) => onCellKeyDown(e)}
            onRowDragEnter={(e) => onRowDragEnter(e)}
            onRowDragEnd={(e) => onRowDragEnd(e)}
            onRowDragMove={(e) => onRowDragMove(e)}
            onRowDragLeave={(e) => onRowDragLeave(e)}
          />
        )}
      </div>
    </div>
  );
};
