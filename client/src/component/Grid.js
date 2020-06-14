import React, { useState, useEffect } from "react";
import _ from "lodash";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { columnData, rowData } from "../data";
import axios from "axios";

const columnDefs = columnData;

const defaultColDef = {
  flex: 1,
  editable: true,
  resizable: true,
  rowSelection: "multiple",
};

export const Grid = () => {
  const [rowD, setRowD] = useState(rowData);
  const handleChange = (e) => {
    let d = [...rowD];
    let fieldName = e.colDef.field;
    // console.log("name:",e.colDef.field)
    if (
      fieldName === "numOfStacks" ||
      fieldName === "RAM" ||
      fieldName === "notAssigned" ||
      fieldName === "allocationCapacity" ||
      fieldName === "physicalUsage" ||
      fieldName === "CPU"
    ) {
      // d[e.rowIndex][e.colDef.field] = parseFloat(e.newValue);
      // axios
      //   .post("http://localhost:5000/row/add", d)
      //   .then((res) => console.log(res.data));
      // console.log("field is number");
    } else {
      d[e.rowIndex][e.colDef.field] = e.newValue;
    }
    setRowD(d);
  };
  const [sumOfStacks, setSumOfStacks] = useState("");
  const [idNum, setIdNum] = useState(rowData.length);

  useEffect(() => {
    setSumOfStacks(_.sumBy(rowD, "numOfStacks"));
  }, [rowD]);

  let sumOfRam = _.sumBy(rowD, "RAM") / 1024;
  let sumAllocationCapacity = _.sumBy(rowD, "allocationCapacity") / 1024;

  let newData = {
    id: idNum,
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
    setSelected(e.api);
  };
  // console.log("selected:", selected);
  const addNewRow = () => {
    setRowD((rowD) => [...rowD, newData]);
    setIdNum(idNum + 1);
  };
  // let gridApi;
  // const onGridReady = (event) => {
  //   gridApi = event.api;
  //   console.log(gridApi);
  // };

  const removeSelected = () => {
    let selectedData = selected.getSelectedRows();
    // console.log("selected:", selectedData);
    setRowD(
      _.difference(rowD, selectedData)
      // rowD.filter(
      //   (item) =>
      //     (console.log("item:", item), item.id) !==
      //     selectedData.map(
      //       (element) => (element, console.log("element", element))
      //     )
      // )
    );
  };
  // console.log("data", rowD);
  return (
    <div>
      <p>{`Sum Of Stacks: ${sumOfStacks}`}</p>
      <p>{`Sum Of RAM: ${sumOfRam}`}</p>
      <p>{`Sum Of Allocation Capacity: ${sumAllocationCapacity}`}</p>
      <button onClick={addNewRow}>add row</button>
      <button onClick={removeSelected}>Remove Selected</button>

      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", textAlign: "center" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowD}
          defaultColDef={defaultColDef}
          onCellValueChanged={(e) => {
            handleChange(e);
          }}
          // onGridReady={onGridReady}
          rowSelection={defaultColDef.rowSelection}
          rowDataChangeDetectionStrategy="IdentityCheck"
          onSelectionChanged={handleSelectionChange}
        />
      </div>
    </div>
  );
};
