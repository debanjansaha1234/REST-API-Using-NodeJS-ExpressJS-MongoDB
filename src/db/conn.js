const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/Students")
.then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(e);
});


/// To connect this database inside express use require("filename") in app.js