const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OpenStackLabHWUpgradeSchema = new Schema(
  {
    department: { type: String },
    numOfStacks: { type: Number },
    usage: { type: String },
    owners: { type: String },
    stackType: { type: String },
    RAM: { type: Number },
    notAssigned: { type: Number },
    allocationCapacity: { type: Number },
    physicalUsage: { type: Number },
    CPU: { type: Number },
  },
  {
    timestamps: true,
  }
);

const OpenStackLabHWUpgrade = mongoose.model(
  "OpenStackLabHWUpgrade",
  OpenStackLabHWUpgradeSchema
);

module.exports = OpenStackLabHWUpgrade;
