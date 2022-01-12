const express=require("express");
const app=express();
const port=process.env.PORT || 5500;              
require("./db/conn");                            
const Student=require("./models/model");         

app.use(express.json());                         
//////////////////////////////////////////////  POST REQUEST  /////////////////////////////////////////
app.post("/student", async (req,res)=>{
    try{
        const user=new Student(req.body);
        const createUser= await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// //////////////////////////////////////////// GET REQUEST  ////////////////////////////////////
app.get("/student",async (req,res)=>{
    
    try{
        const readStudent= await Student.find();                      
        res.send(readStudent);
    }catch(e){
        res.status(400).send(e);
    }
    
})
app.get("/student/:name", async (req,res)=>{
    try{
        const name=req.params.name
        const readStudent= await Student.find({name});
        // console.log(req.params);
        res.send(readStudent);
    }catch(e){
        res.status(500).send(e);
    }
})


///////////////////////////////////////////// UPDATE REQUEST //////////////////////////////

app.patch("/student/:id",async (req,res)=>{
    try{
        const updateData=req.body;
        const id=req.params.id;
        const updateStudent=await Student.findByIdAndUpdate(id,updateData,{new:true});                                 
        res.send(updateStudent);
    }catch(e){
        res.status(404).send(e);
    }
})

// //////////////////////////////////////  DELETE REQUEST /////////////////////////

app.delete("/student/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        // const name=req.params.name;
        const deleteStudent= await Student.findByIdAndDelete(id);
        if(!id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(404).send(e);
    }
})
app.listen(port,()=>{
    console.log("Server Running");
});