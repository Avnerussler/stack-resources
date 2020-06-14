const router=require('express').Router();
let Row = require("../models/row.model")
const { json } = require('express')

router.route('/').get((req,res)=>{

    Row.find()
    .then(row=>res.json(row))
    .catch(err=>res.status(400).json('Error'+err))
})