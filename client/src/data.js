export const columnData = [
  {
    headerName: "Department",
    field: "department",
    sortable: true,
  },
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
