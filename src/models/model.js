const mongoose=require("mongoose");
const validator=require("validator");
const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exist"],
        validate:(val)=>{
            if(!validator.isEmail(val)){
                throw new Error("Not a right format for email");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:[true,"Phone no already exist"],
        min:10
    },
    address:{
        type:String,
        required:true,
    }
});

/// Creating a new collection
const Student=new mongoose.model("Student",studentSchema);

module.exports=Student;                  /// exporting the Student model to use it in the database