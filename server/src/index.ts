import dotenv from "dotenv" 
dotenv.config()

import express from "express" 
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { contentModel, linkModel, userModel } from "./db/db";
import { jwt_password } from "./config";
import { authenticatejwt } from "./middleware/auth";
import cors from "cors"
// import {z} from "zod"

const app = express();
app.use(express.json());
app.use(cors())

// const SignupSchema = z.object({
     
// })

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
             token,
             msg:"signin success"
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
         msg:"content added not yet babe"
    }) 

})
app.post("/api/v1/content/update", authenticatejwt, async (req,res)=>{

     const userId = req.body.id;
      
    // await contentModel.create({
    //      link,
    //      type,
    //      title:req.body.title,
    //     //  @ts-ignore
    //      userId:req.userId,
    //      tags:[]
    // })
    console.log("you reached to backend") 
    const content = await contentModel.findByIdAndUpdate(
         userId, req.body, {new:true})
    
    
    res.json({ 
        content:content,
         msg:"content updated"
    }) 

})

app.get("/api/v1/me", authenticatejwt, async (req,res)=>{
       const userId = req.userId;
       
       try {
       if(userId){

        const details = await userModel.findOne({
            _id:userId,
       })

        res.json({
           username:details?.username 
       }) 
       } 
       } catch (error) {
          res.json({
             error
          }) 
       }
       
       

       

       
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
      const contentId = req.body.contentId     
      const result = await contentModel.deleteMany({
          _id:contentId,
         userId:req.userId
      }) 

      res.json({
        msg:"content deleted"
      })
})

function random(n:number):String{
    let options = "laksdfjlajdfjasdlfja;dsl"
    let len = options.length;
    let ans = "";
    for(let i = 0; i<len; ++i){
         ans+=options[ Math.floor((Math.random()*len)) ]
    } 
    return ans;
}

app.post("/api/v1/brain/share", authenticatejwt, async (req,res)=>{
    const share = req.body.share;
    if (share) {
            const existingLink = await linkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await linkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await linkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    } 
})



app.get("/api/v1/brain/:shareLink", async (req,res)=>{
     const hash = req.params.shareLink;
     
    const links = await linkModel.findOne({
          hash:hash 
     }) 

     if(!links){
         res.status(411).json({
             message:"sorry incorrect input"
         })
       return; 
        }
    
     const content = await contentModel.find({
         userId:links.userId
     })
      
     const username = await userModel.findOne({
         _id:links.userId
     })
     
    if(!username){
         res.status(411).json({
             message:"user not found, fuck ya "
         })
    } 
     res.json({
          username:username?.username,
         content:content
     })

})

app.get("/",(req,res)=>{
    res.json({msg:"hellow"})
 })
 


async function main(){
    
     
    await mongoose.connect(process.env.MONGO_URL as string) 
    
    app.listen(3000 ,()=>{
         console.log("server is listening")
    })
    
}

main()