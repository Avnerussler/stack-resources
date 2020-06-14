const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columnSchema = new Schema({
  department: {
    headerName: "Department",
    field: "department",
    sortable: true,
    type:String
  },
  numOfStacks:{ headerName: "Num of Stacks", field: "numOfStacks", sortable: true  ,type:String},
  usage: { headerName: "Usage", field: "usage", sortable: true ,type:String },
  owners: { headerName: "Owners", field: "owners", sortable: true ,type:String },
  stackType: { headerName: "Stack Type", field: "stackType", sortable: true , type:String},
  RAM:{ headerName: "RAM [GB]", field: "RAM", sortable:  true,type:String },
  notAssigned:{ headerName: "Not assigned", field: "notAssigned", sortable: true, type:String },
  allocationCapacity: {
    headerName: "Allocation Capacity [GB]",
    field: "allocationCapacity",
    sortable: true
    , type:String
  },
  physicalUsage: {
    headerName: "Physical Usage [GB]",
    field: "physicalUsage",
    sortable: true, type:String
  },
  CPU:{ headerName: "CPU", field: "CPU", sortable: true , type:String},
}
);

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
