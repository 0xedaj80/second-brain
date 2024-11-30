import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import {BACKEND_URL } from "../config"

import axios from "axios"
import { useNavigate } from "react-router-dom";
export function Signup(){ 
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate() 

    async function signup(){
         const username = usernameRef.current?.value;  
         const password = passwordRef.current?.value;
        //  alert("here")
           await axios.post(BACKEND_URL + "/api/v1/signup" ,
             {
             
                 username:username,
                 password:password
             
          })  

           alert("you have signed up")
               navigate("/signin")
    }

     return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
               <div className="bg-white rounded-xl border min-w-48 p-8 ">
                  <Input  placeholder={"username"} reference={usernameRef}></Input>
                  <Input placeholder={"password"} reference={passwordRef}></Input>
                  <div className="flex justify-center pt-2" >      
                  <Button  onClick={signup} variant="primary" text="Signup" size="md"></Button>
                  </div>
               </div>
                
        </div>
     )
}