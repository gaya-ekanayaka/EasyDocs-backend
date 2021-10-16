const express= require("express");
const router= express.Router();
const mongoose= require('mongoose');
// const cors= require("cors")
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


const User= require("../models/User");
const { Router } = require("express");
// users.use(cors())

process.env.SECRET_KEY= 'secret';

// ----------------routes--------------------------------- 

//Register an Client
router.post('/register', (req, res) => { 

    var userData= new User( {
        _id: new  mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    User.find({email: req.body.email})
    .exec()
    .then(user => {
       
        if (user.length>=1) {
            res.json({success:false,message:"*** A Client already registered for this email ***"});
            
        }
        else{
        
        const hash= bcrypt.hashSync(userData.password,10) 
        userData.password= hash
        
        userData.save((err,doc)=>{
            if(!err){
                res.json({success:true,message:"Client registered successfully"})
            }
            else{
                res.json({success:false,message:"*** Client register failed ***"});  
                
            }
        })
    }}).catch(err=>{
        res.json({success:false,message:"*** Client register failed ***"});  
      
    });
    
    });

// register an admin
router.post('/addAdmin', (req, res) => { 
    console.log("61 "+req.body.firstName);
        var userData= new User( {
            _id: new mongoose.Types.ObjectId(),
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: req.body.password, 
            role: req.body.role
        });
    console.log("70 "+userData);
    
        User.find({email: req.body.email})
        .exec()
        .then(user => {
           
            if (user.length>=1) {
                res.json({success:false,message:"*** An Admin already registered for this email ***"});
              
            }
            else{
            
            const hash= bcrypt.hashSync(userData.password,10) 
            userData.password= hash
            
            userData.save((err,doc)=>{
                if(!err){
                    res.json({success:true,message:"Admin registered successfully "})
                }
                else{
                    console.log("Error is :"+err);
                    res.json({success:false,message:"*** Admin register failed ***"});  
                }
            })
        }
        
    }).catch(err=>{
        console.log("Error is :"+err);
        res.json({success:false,message:"*** Admin register failed ***"});  
      
    });
    
    });

// remove an admin
router.delete("/deleteAdmin/:userId",(req,res,next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
// Login for an user
router.post("/login", (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length <1 ){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (result) {
                // console.log(user[0]);
                // console.log(user[0]._id);
                const token= jwt.sign( 
                    {
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        role: user[0].role,
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                })
            }
        })
    })
})

// user profile
router.get('/profile', (req,res) => {
    var decoded= jwt.verify(req.headers['authorization'],process.env.SECRET_KEY);
    console.log(decoded);
    User.findOne({_id: decoded.userId}) 
    .then(user => {
        if (user) {
            res.json(user)
        }else {
            res.send('User does not exist') 
        }
    }).catch(err => {
        res.send('error: '+err)
    })
})
// confirm password
router.post('/checkPassword',(req,res)=>{
    console.log(req.body[0])
    const pass= req.body[0]
    const userId= req.body[1]

    console.log(userId)
    User.findOne({ _id:userId}) 
    .then(user=> {
        if (bcrypt.compareSync(pass,user.password)) {
            res.json({success:true, message: "entered password is correct"});
        } else {
            res.json({success:false, message:"entered passoword is incorrect"});
        }
    }).catch (err => {
        res.json(err); 
    });
} ) 

// change password
router.patch('/editLogin/:id',(req,res)=>{
    const id= req.params.id;
    console.log(req.body)
    const pass = req.body[0];
    const email = req.body[1];

    console.log('id is '+id);
    console.log('new password is '+pass);
    console.log('new email is '+email)

    const hash = bcrypt.hashSync(pass,10);
    console.log(hash);

    User.update({_id:id},{
        $set: {
            email:email,
            password:hash
        }
    }).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
})

// edit profile
router.patch('/editProfile/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        console.log(user)
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//user list - client
router.get('/clientlist',(req,res) => {
    User.find({role:"client"})
    .then(user => {
        console.log(user);
        res.json(user);
        
    }).catch(err => {
        res.json(err);
    });
});

//user list - admin
router.get('/adminlist',(req,res) => {
    User.find({role:"admin"})
    .then(user => {
        console.log(user);
        res.json(user);
        
    }).catch(err => {
        res.json(err);
    });
});

module.exports= router;