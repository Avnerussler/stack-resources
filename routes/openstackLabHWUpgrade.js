const router = require("express").Router();
let OpenstackLabHWUpgrade = require("../models/OpenStackLabHWUpgrade");

router.route("/").get((req, res) => {
  OpenstackLabHWUpgrade.find()

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

  const openstackLabHWUpgrade = new OpenstackLabHWUpgrade({
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
  openstackLabHWUpgrade
    .save()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
