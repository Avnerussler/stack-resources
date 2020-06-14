const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    department: {type:String},
    numOfStacks:  {type:String},
    usage:  {type:String},
    owners:  {type:String},
    stackType: {type:String},
    RAM:  {type:Number},
    notAssigned: {type:Number},
    allocationCapacity: {type:Number},
    physicalUsage: {type:Number},
    CPU:{type:Number}
  },{
    timestamps:true
  }
);

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
