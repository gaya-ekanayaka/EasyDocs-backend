const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  name:{type:String},
  uid: { type: String, required: true },
 
  documentPath: { type: String, required: true },
 
});






module.exports = mongoose.model('Document', DocumentSchema,'documents');
