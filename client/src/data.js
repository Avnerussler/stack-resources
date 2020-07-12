import React from "react";
// import { Grid } from "./component/Grid";
export const columnData = {
  columnDefs: [
    {
      headerName: "Department",
      field: "department",

      rowDrag: true,
    },
    {
      headerName: "Num of Stacks",
      field: "numOfStacks",
    },
    { headerName: "Usage", field: "usage" },
    { headerName: "Owners", field: "owners" },
    { headerName: "Stack Type", field: "stackType" },
    { headerName: "RAM [GB]", field: "RAM" },
    { headerName: "Not assigned", field: "notAssigned" },
    {
      headerName: "Allocation Capacity [GB]",
      field: "allocationCapacity",
    },
    {
      headerName: "Physical Usage [GB]",
      field: "physicalUsage",
    },

    { headerName: "CPU", field: "CPU" },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
};
