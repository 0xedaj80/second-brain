import { CloseIcon } from "./icons/CloseIcon";
import { Button } from "./ui/Button";
// import { Input } from "./Input";
// import { ReactHTMLElement, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { refreshState } from "../recoil/atoms/loginInfo";

interface delProps {
   open:boolean;
   onClose:()=>void;
   id:string;
   setSticky:any;
}


export function DeleteModal({open, onClose,id, setSticky}:delProps){
    const setrefe = useSetRecoilState(refreshState)
    
    async function content(){
        
    const response =  await axios.delete(`${BACKEND_URL}/api/v1/content`,{
        headers: {
          Authorization: localStorage.getItem("token"), // Headers
        },
        data: {
          contentId: id, // Body (must be nested inside `data` key)
        },
      })
       const msg = response.data.msg;
       toast.success(msg)
      setrefe((e)=>(!e)) 
    //   alert(id)  
    setSticky(true)
       onClose();

   }
   
     return (
        <div>
        { open && <div onClick={onClose} className="w-screen h-screen bg-black backdrop-blur-sm  fixed top-0 left-0 bg-opacity-60 flex justify-center"> 
                  <div   onClick={(e) => e.stopPropagation()} className="flex  flex-col justify-center"> 
             <span className="bg-white opacity-100 p-4 rounded-lg">
                <div className="flex justify-end">
                     <div onClick={onClose} className="hover:bg-gray-100 rounded cursor-pointer">
                     <CloseIcon size="lg"></CloseIcon> 
                    </div>
                </div>
                  <div className="font-bold p-1 ">
                      <h1>Confirm delete</h1> 
                    </div> 
                 <div className="flex justify-center">                    
                 <Button onClick={content} variant={"primary"} text={"delete"} size="md"></Button>
                 </div>
             </span>
               </div>
        </div>
             
         }
        </div>
     )
}  


