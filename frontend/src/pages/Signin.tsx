import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../component/icons/BrainIcon";
export function Signin(){
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    async function signin(){
         const username = usernameRef.current?.value;  
         const password = passwordRef.current?.value;
          console.log() 
        const response = await axios.post(BACKEND_URL + "/api/v1/signin" , 
          {      username,
                 password 
          }) 
          alert("signed in success") 
          const jwt = response.data.token;
          localStorage.setItem("token",jwt)
          navigate("/dashboard")
    }

     return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center flex-col items-center">
                
               <div className="bg-white rounded-xl shadow-lg border p-3 mb-10 min-w-48 p-2 ">
                      
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
                    Login to dashboard
                  </div>
                  <Input placeholder="username" reference={usernameRef}></Input>
                  <Input placeholder={"password"} reference={passwordRef}></Input>
                  <div className="flex justify-center pt-2">      
                  <Button  onClick={signin} variant="primary" text="Signin" size="md"></Button>
                  </div>
               </div>
                </div> 
        </div>
     )
}