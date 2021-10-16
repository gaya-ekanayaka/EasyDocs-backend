const express= require("express");
const router= express.Router();
// const mongoose= require('mongoose');
const randomString = require('randomstring');
// const cors= require("cors")

const Category= require("../models/Category");
const FormParameter= require("../models/FormParameter");

// 

const { Router } = require("express");
// categories.use(cors())

// ---------------routes---------------------------------------- 

// adding a category
router.post('/addCategory',async (req, res) => { 

    try {
        const data = req.body;
        let fparaData = data.dynamicInputs;
        let categoryName = data.name;
        const fparameters = await FormParameter.insertMany(fparaData);
        const fparameter_ids = fparameters.map((fparameter)=>fparameter.id);
         const category = new Category({
            name:categoryName,
            slug:randomString.generate(),
            f_Paras:fparameter_ids  
        })
        category.save((err,category)=>{
            if(err){
                throw new Error(err);
            }
            res.status(201).json(category);
        })
        
    } catch (error) {
        console.log(error.message);
    }

});

// view category form


// view all categories
router.get('/categories',async (req, res) => { 

    try {
        const category =  await Category.find();
        if(category.length===0){
            throw {error:"NOT_FOUND",statusCode:404}
        }
        res.status(200).json(category);
     } catch (error) {
         res.status(error.statusCode).json(error);
     }

});



// getting form parameter values of a category form
router.get('/form:slug/values',async (req, res) => { 

    try {
        const data = req.params;
        if(!data.slug){
            throw new Error("MISSING_PARAMS");
        }
        const category = await Category.findOne({slug:data.slug}).populate('questions');
        if(!category){
            throw new Error("FORM_NOT_FOUND");
        }
        res.status(200).json({status:200,data:category});

    } catch (error) {
        res.status(400).json({error:error});
    }

});

module.exports= router;