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

  // console.log(rowD);

  const handleChange = (e) => {
    let d = [...rowD];
    let fieldName = e.colDef.field;
    // console.log("name:", e.colDef.field);
    if (
      fieldName === "numOfStacks" ||
      fieldName === "RAM" ||
      fieldName === "notAssigned" ||
      fieldName === "allocationCapacity" ||
      fieldName === "physicalUsage" ||
      fieldName === "CPU"
    ) {
      d[e.rowIndex][e.colDef.field] = parseFloat(e.newValue);

      // console.log("field is number");
    } else {
      d[e.rowIndex][e.colDef.field] = e.newValue;
    }
    setRowD(d);
    // console.log(d[0]);
    // console.log(selected.getSelectedRows());
    let rowUpdate = selected.getSelectedRows().map((item) => item._id);
    // console.log("rowUpdate:", rowUpdate);
    // console.log(selected.getSelectedRows());
    axios
      .put(
        BASE_URL + "/row/update/" + rowUpdate,
        selected.getSelectedRows()[0] || dataKey
      )
      .then((res) => {
        // console.log("res.data", res.data);
        // setSelected("");
        console.log("selected:", selected);
        setDataKey("");
      });
  };
  console.log(dataKey);
  const [sumOfStacks, setSumOfStacks] = useState("");
  // const [idNum, setIdNum] = useState(rowD.length);

  useEffect(() => {
    setSumOfStacks(_.sumBy(rowD, "numOfStacks"));
  }, [rowD]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios.get(BASE_URL + "/row").then((res) => {
      return setLoader(false), setRowD(res.data);
    });
  }, []);

  let sumOfRam = _.sumBy(rowD, "RAM") / 1024;
  let sumAllocationCapacity = _.sumBy(rowD, "allocationCapacity") / 1024;
  let sumPhysicalUsage = _.sumBy(rowD, "CPU");

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
  const [selected, setSelected] = useState();
  const handleSelectionChange = (e) => {
    // console.log("api", e.api);
    setSelected(e.api);
  };

  const addNewRow = () => {
    axios.post(BASE_URL + "/row", newData).then((res) => {
      setRowD((rowD) => [...rowD, res.data]);
    });
    setLoader(false);
    // setRowD((rowD) => [...rowD, newData]);
    // setIdNum(idNum + 1);
  };
  // let gridApi;
  // const onGridReady = (event) => {
  //   gridApi = event.api;
  //   console.log(gridApi);
  // };

  const removeSelected = () => {
    let selectedData;
    if (selected) {
      selectedData = selected.getSelectedRows();
      console.log("selectedData:", selectedData);
      axios.delete(BASE_URL + "/row/" + selectedData[0]._id).then((res) => {
        for (let index = 0; index < rowD.length; index++) {
          if (rowD[index]._id === res.data._id) {
            // console.log(rowD[index]);
            // console.log(index);
            setRowD(rowD.filter((item) => item._id !== res.data._id));
          }
        }
      });
      setSelected("");
    } else {
      alert("choose row");
    }
    // console.log("selected:", selectedData);

    // setRowD(_.difference(rowD, selectedData));
    // console.log(selectedData[0]._id);

    // selectedData.map((item) => {
    //   console.log(item._id);
    // });
  };
  // console.log("data", rowD);
  const onCellKeyPress = (e) => {
    // console.log("node:", e.node.data);
    setDataKey(e.node.data);
  };
  // console.log("dataKey:", dataKey);
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
            defaultColDef={defaultColDef}
            onCellValueChanged={(e) => {
              handleChange(e);
            }}
            // onGridReady={onGridReady}
            rowSelection={defaultColDef.rowSelection}
            // rowDataChangeDetectionStrategy="IdentityCheck"
            onSelectionChanged={handleSelectionChange}
            rowDragManaged={true}
            defaultColDef={columnData.defaultColDef}
            onCellKeyPress={(e) => onCellKeyPress(e)}
          />
        )}
      </div>
    </div>
  );
};
