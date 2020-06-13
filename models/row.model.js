const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rowSchema = new Schema(
  {
    row: {},
  },
  {
    timestamps: true,
  }
);

const Row = mongoose.model("Row", rowSchema);

module.exports = Row;
