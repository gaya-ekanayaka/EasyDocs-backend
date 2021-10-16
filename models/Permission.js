const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    adminId: {type:String,required:true},
    _id: mongoose.Schema.Types.ObjectId,
    pName:{type:String,required:true} 
});

module.exports = mongoose.model('Permission',PermissionSchema)