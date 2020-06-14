const router=require('express').Router();
let Column = require("../models/column.model")
// const { json } = require('express')

router.route('/').get((req,res)=>{

    Column.find()
    .then(column=>res.json(column))
    .catch(err=>res.status(400).json('Error'+err))
})
module.exports=router