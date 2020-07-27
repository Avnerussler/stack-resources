const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OpenStackLabHWUpgradeSchema = new Schema(
  {
    Rh: { type: String },
    hostName: { type: String },
    status: { type: String },
    VCPUs: { type: Number },
    RAM: { type: Number },
    localStorage: { type: Number },
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
