const router = require("express").Router();
let Row = require("../models/row.model");
router.route("/").get((req, res) => {
  Row.find()

    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  let id = req.params.id;
  Row.findByIdAndDelete(id)
    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const id = req.body.department;
  const department = req.body.department;
  const numOfStacks = Number(req.body.numOfStacks);
  const usage = req.body.usage;
  const owners = req.body.owners;
  const stackType = req.body.stackType;
  const RAM = Number(req.body.RAM);
  const notAssigned = Number(req.body.notAssigned);
  const allocationCapacity = Number(req.body.allocationCapacity);
  const physicalUsage = Number(req.body.physicalUsage);
  const CPU = Number(req.body.CPU);

  const newRow = new Row({
    id,
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
    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").put((req, res) => {
  Row.findById(req.params.id)
    .then((row) => {
      row.department = req.body.department;
      row.numOfStacks = Number(req.body.numOfStacks);
      row.usage = req.body.usage;
      row.owners = req.body.owners;
      row.stackType = req.body.stackType;
      row.RAM = Number(req.body.RAM);
      row.notAssigned = Number(req.body.notAssigned);
      row.allocationCapacity = Number(req.body.allocationCapacity);
      row.physicalUsage = Number(req.body.physicalUsage);
      row.CPU = Number(req.body.CPU);
      row
        .save()
        .then((rows) => res.json(rows))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").patch(async (req, res) => {
//   console.log("id");
//   try {
//     const updateRow = await Row.updateOne(
//       { _id: req.body.id },
//       { $set: { numOfStacks: req.body.numOfStacks } }
//     );
//     res.json(updateRow);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
module.exports = router;
