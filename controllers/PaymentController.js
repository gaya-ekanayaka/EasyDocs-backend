
 const Payment = require('../models/Payment');

 module.exports = {

    addPaymentDetails:async(req,res)=>{

const payment=req.body;
// console.log(payment)
// const CID=req.body[0];
// const userId=req.body[1];



// console.log(CID)



const pay = new Payment({
    
    catID: req.body[0],
       UID:req.body[1],
       Uname:req.body[2],
       Uemail:req.body[3]


  });






  pay.save((err)=>{
    if(!err){
        res.json({success:true,message:"Template saved"})
       
     
        
    }
    else{
        res.json({success:false,message:"Template not save,error occured"});  
    }
})




    },

    getPaymentIds_ByID:async(req,res)=>{
        
            const data = req.params;
           console.log(data)
           const conditions = {};
           conditions.UID=data.id;
           
            console.log(conditions)

            


            const payment_CID= await Payment.find(conditions)
           
            console.log(payment_CID)
            res.status(200).json(payment_CID);

        
            
        
    },

    PaymentBySlug:async(req,res)=>{
        
            const data = req.params;
           console.log(data)
            const conditions = {};
            if(!data.slug){
                throw ({statusCode:404,message:"MISSING_PARAMS"})
    
            }
            conditions.catID= data.slug;
            

            


            const payment= await Payment.find(conditions)
            if(!payment){
                throw ({statusCode:404,message:"Form_NOT_FOUND"})
            }
           
            res.status(200).json(payment);

        
            
        
    },



 }


 