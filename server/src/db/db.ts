import mongoose, { model } from "mongoose"; 
import { Model, Schema } from "mongoose";



const UserSchema = new Schema({
     username:{type:String , unique:true},
     password:String,
})

const ContentSchema = new Schema({
      title:String,
      link:String,
      tags:[{type:mongoose.Types.ObjectId, ref:"Tag"}],
      userId:{type:mongoose.Types.ObjectId, ref:"User", required:true}
})


export const contentModel = model("Content", ContentSchema);

export const userModel = model("User", UserSchema);


