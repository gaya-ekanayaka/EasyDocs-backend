const Document = require('../models/Documents');


 
 
  
module.exports = {
    savedocument:async(req,res)=>{

       


            const { uid } = req.body;
            const name=req.body.name;
           
            
            const documentPath = 'http://localhost:3000/documents/' + req.file.filename; // Note: set path dynamically
            const document = new Document({
              name,uid,
              documentPath,
            });
            const createdDocument = await document.save();
            res.status(201).json({
              document: {
                ...createdDocument._doc,
              },
            });


    
        

    },


    getdocument:async(req,res)=>{

   
            const documents = await Document.find();
            res.status(200).json({ documents});
          console.log("hello")
  


    },

    DocumentByID:async(req,res)=>{
      console.log("hello")
      
          const data = req.params;
          console.log(data)
        //  console.log(data)
        //  const conditions = {};
        //  conditions._id=data.id;
         
        //   console.log(conditions)

          


        //   const document= await Document.find(conditions)
         
        //   console.log(document)
        //   res.status(200).json(document);

      
          
      
  },
  deleteDoc:async (req, res) => {
        

    const data = req.params;
    console.log(data)
    const conditions = {};
    conditions._id=data.id;
    
     console.log(conditions)



     const deleteone= await Document.deleteOne(conditions)
         
     console.log(deleteone)
     res.status(200).json(templateone);


  }



}