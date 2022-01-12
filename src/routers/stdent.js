const express=require("express");
const router=new express.Router();
const Student=require("../models/model");        /// importing the student schema so to router to work

// defining the router
router.post("/student", async (req,res)=>{
    try{
        const user=new Student(req.body);
        const createUser= await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
    
})

router.get("/student",async (req,res)=>{
    
    try{
        const readStudent= await Student.find();                      
        res.send(readStudent);
    }catch(e){
        res.status(400).send(e);
    }
    
})

router.get("/student/:name", async (req,res)=>{
    try{
        const name=req.params.name
        const readStudent= await Student.find({name});
        // console.log(req.params);
        res.send(readStudent);
    }catch(e){
        res.status(500).send(e);
    }
})




router.patch("/student/:id",async (req,res)=>{
    try{
        const updateData=req.body;
        const id=req.params.id;
        const updateStudent=await Student.findByIdAndUpdate(id,updateData,{new:true});                                
        //const updateStudent=await Student.findOneAndUpdate(id,updateData,{new:true})                                  
        res.send(updateStudent);
    }catch(e){
        res.status(404).send(e);
    }
})



router.delete("/student/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        // const name=req.params.name;
        const deleteStudent= await Student.findByIdAndDelete(id);
        // const deleteStudent= await Student.findOneAndDelete(name);
        if(!id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(404).send(e);
    }
})

module.exports=router;