import React from "react";
// import { Grid } from "./component/Grid";
export const columnData = {
  columnDefs: [
    {
      headerName: "Department",
      field: "department",
      sortable: true,
      rowDrag: true,
    },
    {
      headerName: "Num of Stacks",
      field: "numOfStacks",
      sortable: true,
    },
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
  ],
  // navigateToNextCell: NavigateToNextCell,
};

// let agGrid;
// document.addEventListener("DOMContentLoaded", function () {
//   var gridDiv = document.querySelector("#myGrid");
//   new agGrid.Grid(gridDiv, columnData);

//   agGrid
//     .simpleHttpRequest({
//       url: "http://localhost:5000/row",
//     })
//     .then(function (data) {
//       columnData.api.setRowData(data);
//     });
// });

const NavigateToNextCell = (params) => {
  var previousCell = params.previousCellPosition;
  var suggestedNextCell = params.nextCellPosition;

  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;

  switch (params.key) {
    case KEY_DOWN:
      previousCell = params.previousCellPosition;
      // set selected cell on current cell + 1
      columnData.api.forEachNode(function (node) {
        if (previousCell.rowIndex + 1 === node.rowIndex) {
          node.setSelected(true);
        }
      });
      return suggestedNextCell;
    case KEY_UP:
      previousCell = params.previousCellPosition;
      // set selected cell on current cell - 1
      columnData.api.forEachNode(function (node) {
        if (previousCell.rowIndex - 1 === node.rowIndex) {
          node.setSelected(true);
        }
      });
      return suggestedNextCell;
    case KEY_LEFT:
    case KEY_RIGHT:
      return suggestedNextCell;
    default:
      throw "this will never happen, navigation is always one of the 4 keys above";
  }
};

export const rowData = [
  {
    id: 0,
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
    id: 1,
    department: "eww",
    numOfStacks: 6,
    usage: "asd, sdfsda, sadfas, asdfasd, asdfads",
    owners: " Nimrod",
    stackType: "asdf sdfsa asdf",
    RAM: 2323,
    notAssigned: 343,
    allocationCapacity: 232,
    physicalUsage: 3444.8,
    CPU: 33,
  },
];
