const router = require("express").Router();
let Row = require("../models/row.model");

router.route("/").get((req, res) => {
  Row.find()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const department = req.body.department;
  const numOfStacks = Number(req.body.numOfStacks);
  const usage = Number(req.body.usage);
  const owners = req.body.owners;
  const stackType = req.body.stackType;
  const RAM = Number(req.body.RAM);
  const notAssigned = Number(req.body.notAssigned);
  const allocationCapacity = Number(req.body.allocationCapacity);
  const physicalUsage = Number(req.body.physicalUsage);
  const CPU = Number(req.body.CPU);

  const newRow = new Row({
    department,
    numOfStacks,
    usage,
    owners,
    stackType,
    RAM,
    notAssigned,
    allocationCapacity,
    physicalUsage,
    CPU,
  });
  newRow
    .save()
    .then(() => res.json("row add"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
  let id = req.params.id;
  Row.findOne({ _id: id }, (err, foundObject) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      }
    }
  });
});

module.exports = router;
