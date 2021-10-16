const mongoose= require('mongoose');

// USerSchema
const UserSchema = new mongoose.Schema( {
       _id: mongoose.Schema.Types.ObjectId,
       firstName: {type:String , required: true},
       lastName: {type:String },
       email:{type:String , required: true},
       password:{type:String , required: true},
       role:{type:String , required: true}
       
   });

var User= mongoose.model('User',UserSchema);

module.exports= User;