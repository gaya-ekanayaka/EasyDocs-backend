const Category = require('../models/Category');
const FormParameter = require('../models/FormParameter');

 
  
module.exports = {


    FormBySlug:async(req,res)=>{
        try {
            const data = req.params;
            const conditions = {};
            if(!data.slug){
                throw ({statusCode:404,message:"MISSING_PARAMS"})

            }
            conditions.slug  = data.slug;
            const form = await Category .findOne(conditions).populate('f_Paras');
            if(!form){
                throw ({statusCode:404,message:"Form_NOT_FOUND"})
            }
            res.status(200).json(form);
        } catch (error) {
            res.status(error.statusCode).json({status:error.statusCode,error:error.message});
        }
    },
    
    saveFormResponse:async(req,res)=>{
        try {
            const data = req.body;
            
            console.log(data);
            if(!data.responses || !data.slug ){
                throw {statusCode:404,message:"Missing_params"};
            }
            // if(data.responses[0].email!==undefined){
            //     email = data.responses[0].email;
            // }
            const category = await Category.findOne({slug:data.slug});
            const formParaIDS =category.f_Paras ;
            
            data.responses.forEach(async (response,index)=>{
               
              await FormParameter.updateOne({_id:formParaIDS[index]},{$push:{responses:response}})
            })
            // const contactObj = {
            //     "properties": [
            //       { "property": "email","value": `${email}`}
            //     ]
            //   };
          
            res.status(200).json({status:200,message:"Response saved"});
           
                
           
        } catch (error) {
            console.log(error.message);
            res.status(400).json(error);
        }
    },
    deleteCat:async (req, res) => {
        

        const data = req.params;
        console.log(data)
        const conditions = {};
        conditions._id=data.id;
        
         console.log(conditions)
  
  
  
         const deleteone= await Category.deleteOne(conditions)
             
         console.log(deleteone)
         res.status(200).json(templateone);

  
      }














}