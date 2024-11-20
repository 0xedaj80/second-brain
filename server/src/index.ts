import dotenv from "dotenv" 
dotenv.config()

import express from "express" 
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { contentModel, userModel } from "./db/db";
import { jwt_password } from "./config";
import { authenticatejwt } from "./middleware/auth";


const app = express();
app.use(express.json());



app.post("/api/v1/signup", async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
 

try{
   await  userModel.create({
        username:username,
        password:password
    })

    res.json({
        msg:"signed up successfully"
    })

}catch(e){
     
     res.status(411).json({
        msg:"user already exist"
     })
}
     
})

app.post("/api/v1/signin", async (req, res)=>{
     const username = req.body.username;
     const password = req.body.password;
     
     const existingUser = await userModel.findOne({
            username,
            password
     })

     if(existingUser){
         const token = jwt.sign({
            id:existingUser._id
         }, jwt_password ) 

         res.json({
             token
         })
     }else{
          res.status(403).json({
             msg:"incorrect credentials "
          }) 
     }
})

app.post("/api/v1/content", authenticatejwt, async (req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    
    await contentModel.create({
         link,
         type,
         title:req.body.title,
        //  @ts-ignore
         userId:req.userId,
         tags:[]
    })
    res.json({
         msg:"content added"
    }) 

})

app.get("/api/v1/content" , authenticatejwt,  async (req,res)=>{ 
    
    // @ts-ignore
    const userId = req.userId 
    const content = await contentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
         content
    })
     
})

app.delete("/api/v1/content", authenticatejwt, async (req,res)=>{
      const contentId = req.body.contentId;
      
      await contentModel.deleteMany({
         contentId,
        //  @ts-ignore
         userId:req.userId
      }) 

      res.json({
        msg:"content deleted"
      })
})

app.post("/api/v1/brain/share", (req,res)=>{
     
})


async function main(){
    
     
    await mongoose.connect(process.env.MONGO_URL as string) 
    
    app.listen(3000 ,()=>{
         console.log("server is listening")
    })
    
}

main()