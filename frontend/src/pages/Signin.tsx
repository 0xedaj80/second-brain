import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../component/icons/BrainIcon";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { useRecoilValue, useSetRecoilState } from "recoil";
import {  refreshState, userState } from "../recoil/atoms/loginInfo";
import Dashboard from "./Dashboard";

export function Signin(){
    const user = useRecoilValue(userState)
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const setrefe = useSetRecoilState(refreshState)

    async function signin(){
         const username = usernameRef.current?.value;  
         const password = passwordRef.current?.value;
       
         try {
          const response = await axios.post(
              BACKEND_URL + "/api/v1/signin",
              { username, password }
          );
  
          const jwt = response.data.token;
          const msg = response.data.msg;
          toast.success(msg, {theme: "colored"});
          localStorage.setItem("token", jwt);
          setrefe((e) => !e);
          navigate("/dashboard");
      } catch (error) {
          // If there is an error, handle it here
          if (axios.isAxiosError(error)) {
              // Extract the error message from the backend
              const errorMsg = error.response?.data?.msg || "An error occurred. Please try again.";
              toast.error(errorMsg); // Error toast
          } else {
              // Generic fallback for non-Axios errors
              toast.error("Something went wrong. Please try again later.");
          }
      }
   
    }
   
    if(user.userEmail){
     return (
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