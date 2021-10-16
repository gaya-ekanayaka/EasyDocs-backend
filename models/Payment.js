const mongoose= require('mongoose');


const PaymentSchema = new mongoose.Schema( {
 
       catID: {type:String , required: true},
       UID:{type:String , required: true},
       Uname:{type:String , required: true},
       Uemail:{type:String , required: true}
       
   });

var payment= mongoose.model('payment',PaymentSchema);

module.exports= payment;