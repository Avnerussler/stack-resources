const router=require('express').Router();
let Row = require("../models/row.model")
const { json } = require('express')

router.route('/').get((req,res)=>{

    Row.find()
    .then(row=>res.json(row))
    .catch(err=>res.status(400).json('Error'+err))
})

router.route("/add").post((req,res)=>{
    const department=req.body.department;
    const numOfStacks= Number(req.body.numOfStacks)
    const usage= Number(req.body.usage)
    const owners=  req.body.owners;
    const stackType= req.body.stackType;
    const RAM=                 Number(req.body.RAM)
    const notAssigned= Number( req.body.notAssigned)
    const allocationCapacity= Number(req.body.allocationCapacity)
    const physicalUsage=Number( req.body.physicalUsage)
    const CPU=Number(req.body.CPU)

    const newRow=new Row({
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

    })
    newRow.save()
    .then(()=>res.json("row add"))
    .catch(err=>res.status(400).json("Error:"+err))
})

module.exports=router