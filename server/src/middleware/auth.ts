import { NextFunction , Request, Response } from "express";
import { jwt_password } from "../config";
import jwt from "jsonwebtoken"


export const authenticatejwt = (req:Request, res:Response, next:NextFunction) => {
     const authtoken = req.headers["authorization"] 
     const decode = jwt.verify(authtoken as string , jwt_password);

     if(authtoken){
         if(decode){
            //  @ts-ignore
            req.userId = decode.id;
            next() 
         } else{
            res.sendStatus(401); 
         }
     }else{
         res.status(404).json({
             msg:"authentication failed"
         })
     }


     
}