import React, { useState, useEffect } from "react";
import _ from "lodash";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { columnData } from "../data";
import axios from "axios";
import { Spin } from "antd";

const columnDefs = columnData;

const defaultColDef = {
  flex: 1,
  editable: true,
  resizable: true,
  rowSelection: "multiple",
};

export const Grid = () => {
  const [rowD, setRowD] = useState("");
  // console.log(rowD);

  const handleChange = (e) => {
    let d = [...rowD];
    let fieldName = e.colDef.field;
    console.log("name:", e.colDef.field);
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
    // axios.put("http://localhost:5000/row", newData)
  };
  const [sumOfStacks, setSumOfStacks] = useState("");
  // const [idNum, setIdNum] = useState(rowD.length);

  useEffect(() => {
    setSumOfStacks(_.sumBy(rowD, "numOfStacks"));
  }, [rowD]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/row").then((res) => {
      return setLoader(false), setRowD(res.data), console.log(res.data);
    });
  }, []);

  let sumOfRam = _.sumBy(rowD, "RAM") / 1024;
  let sumAllocationCapacity = _.sumBy(rowD, "allocationCapacity") / 1024;

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
    setSelected(e.api);
  };
  // console.log("selected:", selected);

  const addNewRow = () => {
    axios.post("http://localhost:5000/row", newData).then((res) => {
      console.log(res.data);
      window.location.reload();
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
      axios
        .delete("http://localhost:5000/row/" + selectedData[0]._id)
        .then((res) => window.location.reload());
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
          />
        )}
      </div>
    </div>
  );
};
