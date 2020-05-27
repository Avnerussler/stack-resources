import React, { useState, useEffect } from "react";
import _ from "lodash";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { GridApi } from "ag-grid-community";

const columnDefs = [
  { headerName: "Department", field: "department", sortable: true },
  { headerName: "Num of Stacks", field: "numOfStacks", sortable: true },
  { headerName: "Usage", field: "usage", sortable: true },
  { headerName: "Owners", field: "owners", sortable: true },
  { headerName: "Stack Type", field: "stackType", sortable: true },
  { headerName: "RAM [GB]", field: "RAM", sortable: true },
  { headerName: "Not assigned", field: "notAssigned", sortable: true },
  {
    headerName: "Allocation Capacity [GB]",
    field: "allocationCapacity",
    sortable: true,
  },
  {
    headerName: "Physical Usage [GB]",
    field: "physicalUsage",
    sortable: true,
  },
  { headerName: "CPU", field: "CPU", sortable: true },
];

// console.log(rowData);

// console.log(sumOfStacks);

const defaultColDef = {
  flex: 1,
  // minWidth: 110,
  editable: true,
  resizable: true,
  // width: a,
};

export const Grid = () => {
  const [rowData, setRowData] = useState([
    {
      department: "ps",
      numOfStacks: 6,
      usage: "Rakuten, Veon, Globe, Customers, Training",
      owners: " Nimrod",
      stackType: "Standard Jenkins Stack",
      RAM: 1128,
      notAssigned: 316,
      allocationCapacity: 16800,
      physicalUsage: 582.8,
      CPU: 564,
    },
    {
      department: "ps",
      numOfStacks: 6,
      usage: "Rakuten, Veon, Globe, Customers, Training",
      owners: " Nimrod",
      stackType: "Standard Jenkins Stack",
      RAM: 1128,
      notAssigned: 316,
      allocationCapacity: 16800,
      physicalUsage: 582.8,
      CPU: 564,
    },
  ]);
  const handleChange = (e) => {
    let d = [...rowData];
    d[e.rowIndex][e.colDef.field] = parseInt(e.newValue);
  };
  const [sumOfStacks, setSumOfStacks] = useState("");

  useEffect(() => {
    setSumOfStacks(_.sumBy(rowData, "numOfStacks"));
  }, [rowData]);

  let sumOfRam = _.sumBy(rowData, "RAM") / 1024;
  let sumAllocationCapacity = _.sumBy(rowData, "allocationCapacity") / 1024;
  return (
    <div>
      <p>{`Sum Of Stacks: ${sumOfStacks}`}</p>
      <p>{`Sum Of RAM: ${sumOfRam}`}</p>
      <p>{`Sum Of Allocation Capacity: ${sumAllocationCapacity}`}</p>

      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          onCellValueChanged={(e) => {
            handleChange(e);
          }}
          // celDef.edit
          // columns={columns}
          // rows={rows}
          // // rowGetter={(i) => rows[i]}
          // // rowsCount={4}
          // onGridRowsUpdated={handleUpdate}
          // enableCellSelect={true}
        />
      </div>
    </div>
  );
};
