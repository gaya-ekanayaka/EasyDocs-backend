const mongoose= require('mongoose');

// CategorySchema
const CategorySchema = new mongoose.Schema( {
     slug:{type:String , required: true},
     name: {type:String , required: true},
     f_Paras:[{type:mongoose.Schema.Types.ObjectId,ref:'FormPara'}] 
       
       
   });

var Category= mongoose.model('Category',CategorySchema);

module.exports= Category;