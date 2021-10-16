const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Permission = require("../models/Permission");
const { Router } = require("express");


// add a permission
router.post('/addPermission',(req,res,next) => {
console.log(req.body)

    const permissionData = new Permission ({
        _id: new mongoose.Types.ObjectId(),
        adminId: req.body[0],
        pName: req.body[1]

    });
    permissionData.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        messege: "handling permissions",
        createdPermission: permissionData
    });
});


// get all permissions
router.get('/getPermissions/:adminId',(req,res,next) => {
    const id = req.params.adminId;
    Permission.find({adminId:id})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
})


// delete a permission
router.delete('/deletePermission/:permissionId',(req,res,next) => {
    const id = req.params.permissionId;
    Permission.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports= router;