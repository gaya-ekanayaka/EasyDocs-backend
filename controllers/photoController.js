const photo = require('../models/photo');
const Photo = require('../models/photo');

module.exports = {



    savephoto:async(req,res)=>{

        console.log("hello")

        const { Uid } = req.body;
          const imagePath = 'http://localhost:3000/photos/' + req.file.filename; // Note: set path dynamically
          const photo = new Photo({
            Uid,
            imagePath,
          });
          console.log(photo)
          const createdPhoto = await photo.save();
          res.status(201).json({
            photo: {
              ...createdPhoto._doc,
            },
          });




    },
    getPhoto:async (req, res) => {
        const profiles = await Photo.find();
        res.status(200).json({ profiles });

        console.log(profiles)
      

    },

    deletephoto:async (req, res) => {
      const data = req.params;
      console.log(data)
      const conditions = {};
      conditions._id=data.id;
      
       console.log(conditions)



       const deleteone= await Photo.deleteOne(conditions)
           
       console.log(deleteone)


    },
    deleteAll:async (req, res) => {
      const data = req.params;
      console.log(data)
      const conditions = {};
      conditions.Uid=data.id;
      
       console.log(conditions)



       const deleteone= await Photo.deleteMany(conditions)
           
       console.log(deleteone)


    }










}