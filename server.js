const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("app is connected to mongoDB");
});

const row = require("./routes/row");
const column = require("./routes/column");

app.use("/row", row);
app.use("/column", column);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
