const mongoose= require('mongoose');

// FormParaSchema
const FormParaSchema = new mongoose.Schema( {
     
    //    fpara_id: mongoose.Schema.Types.ObjectId,
       label: {type:String , required: true},
       type: String,
       options: [String],
    //   edit
    responses:[{response:String,email:String}],
       
   });

var FormPara= mongoose.model('FormPara',FormParaSchema);

module.exports= FormPara;