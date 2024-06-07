import mongoose from "mongoose";



const UserSchema = mongoose.Schema({

    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        
      
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    }

},{timestamps:true});

export const User = mongoose.model("User",UserSchema);

export default User;