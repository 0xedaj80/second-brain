import exp from "constants";
import mongoose, { model } from "mongoose"; 
import { Model, Schema } from "mongoose";



const UserSchema = new Schema({
     username:{type:String , unique:true},
     password:String,
})

const ContentSchema = new Schema({
      title:String,
      link:String,
      type:String, 
      tags:[{type:mongoose.Types.ObjectId, ref:"Tag"}],
      userId:{type:mongoose.Types.ObjectId, ref:"User", required:true}
})
const LinkSchema = new Schema({
      hash:String,
      userId:{type:mongoose.Types.ObjectId, ref:"User", required:true}
})

export const contentModel = model("Content", ContentSchema);
export const linkModel = model("Link" , LinkSchema);
export const userModel = model("User", UserSchema);


