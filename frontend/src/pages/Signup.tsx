import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import {BACKEND_URL } from "../config"
import { BrainIcon } from "../component/icons/BrainIcon";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms/loginInfo";
import Dashboard from "./Dashboard";
export function Signup(){ 
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const user = useRecoilValue(userState)
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

    //  return (
    //     <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    //            <div className="bg-white rounded-xl border min-w-48 p-8 ">
    //               <Input  placeholder={"username"} reference={usernameRef}></Input>
    //               <Input placeholder={"password"} reference={passwordRef}></Input>
    //               <div className="flex justify-center pt-2" >      
    //               <Button  onClick={signup} variant="primary" text="Signup" size="md"></Button>
    //               </div>
    //            </div>
                
    //     </div>
    //  )
 
    if(user.userEmail){
        return(
            <Dashboard></Dashboard>
        ) 
    }
     return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center flex-col items-center">
                
               <div className="bg-white rounded-xl shadow-lg border p-3 mb-10 min-w-48 ">
                      
                <div className="flex text-2xl font-bold bg-white-200  font-serif text-black  items-center">
                    <div className="pr-2"> 
                        <BrainIcon></BrainIcon> 
                    </div> 
                    Super Memory
                </div>
               </div>
               
               
               <div className="felx justify-center">
               <div className="bg-white rounded-xl shadow-lg border min-w-48 p-8 ">
                  <div className="text-gray-500-400 text-lg flex justify-center p-2">
                    signup to create account
                  </div>
                  <Input placeholder="username" reference={usernameRef}></Input>
                  <Input placeholder={"password"} reference={passwordRef}></Input>
                  <div className="flex justify-center pt-2">      
                  <Button  onClick={signup} variant="primary" text="Signup" size="md"></Button>
                  </div>
               </div>
                </div> 
        </div>
     )
    
   
}