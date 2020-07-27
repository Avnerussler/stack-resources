const router = require("express").Router();
let OpenstackLabHWUpgrade = require("../models/OpenStackLabHWUpgrade");

router.route("/").get((req, res) => {
  OpenstackLabHWUpgrade.find()

    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const Rh = req.body.RH;
  const hostName = req.body.hostname;
  const status = req.body.status;
  const VCPUs = Number(req.body.VCPUs);
  const RAM = Number(req.body.RAM);
  const localStorage = Number(req.body.localStorage);

  const openstackLabHWUpgrade = new OpenstackLabHWUpgrade({
    Rh,
    hostName,
    status,
    VCPUs,
    RAM,
    localStorage,
  });
  openstackLabHWUpgrade
    .save()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
