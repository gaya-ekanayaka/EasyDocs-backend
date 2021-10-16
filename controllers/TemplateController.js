const Template = require('../models/template');


 
 
  
module.exports = {


    createTemplate:async(req,res)=>{

        try{
            console.log(req.body);
           
            



  
            let j=req.body.dataArr.length;
            const myArray = new Array({});
            const categoryID =req.body.dataArr[j-2];
            const slug=req.body.dataArr[j-1]
            

            console.log(categoryID);
            for(let i=0;i<j-2;i++){
                
             


                formParaName=req.body.dataArr[i].name;
                Xvalue=req.body.dataArr[i].marginLeft;
                Yvalue=req.body.dataArr[i].marginTop;
     
                
                myArray[i]={formParaName,Xvalue,Yvalue}

               

      
            }


            console.log(myArray)

        
            var Tem= new Template( {

        
        //t_id: mongoose.Schema.Types.ObjectId(),
    

        CatID:categoryID,
        slug:slug,
        
        FormParameter:myArray

        
            })


        
        //
    
        Tem.save((err)=>{
            if(!err){
                res.json({success:true,message:"Template saved"})
               
             
                
            }
            else{
                res.json({success:false,message:"Template not save,error occured"});  
            }
        })


    } catch (error) {
        console.log(error.message);
    }
        
        

    },

    TemplateBySlug:async(req,res)=>{
        try {
            const data = req.params;
           // console.log(data)
            const conditions = {};
            if(!data.slug){
                throw ({statusCode:404,message:"MISSING_PARAMS"})
    
            }
            conditions.slug  = data.slug;
            

            


            const template= await Template.find(conditions)
            if(!template){
                throw ({statusCode:404,message:"Form_NOT_FOUND"})
            }
            console.log(template)
            res.status(200).json(template);

        
            
        } catch (error) {
            res.status(error.statusCode).json({status:error.statusCode,error:error.message});
        }
    },


    TemplateByID:async(req,res)=>{
        try {
            const data = req.params;
           console.log(data)
           const conditions = {};
           conditions._id=data.id;
           
            console.log(conditions)

            


            const templateone= await Template.find(conditions)
           
            console.log(templateone)
            res.status(200).json(templateone);

        
            
        } catch (error) {
           
        }
    },

    deleteTem:async (req, res) => {
        

        const data = req.params;
        console.log(data)
        const conditions = {};
        conditions._id=data.id;
        
         console.log(conditions)
  
  
  
         const deleteone= await Template.deleteOne(conditions)
             
         console.log(deleteone)
         res.status(200).json(templateone);

  
      }



}
