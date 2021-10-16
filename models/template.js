
const mongoose = require('mongoose');





const TemplateSchema = new mongoose.Schema({
    


    CatID:{

        type:String
        
           },

    slug:{type:String},       
    

    t_id: mongoose.Schema.Types.ObjectId,
    FormParameter:[ {


   formParaName:{type:String},
   Xvalue:{type:Number},
   Yvalue:{type:Number}


}]



   
   
  
})

const Template = mongoose.model('Template',TemplateSchema);

module.exports = Template;