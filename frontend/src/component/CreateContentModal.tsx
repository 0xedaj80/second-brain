import { CloseIcon } from "./icons/CloseIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { refreshState } from "../recoil/atoms/loginInfo";



enum ContentType {
    Youtube = "youtube",
     Twitter = "twitter"
} 
interface contProps{
    open:boolean;
    onClose:()=>void;
    setSticky:any;
}

export function CreateContentModal({open, onClose, setSticky}:contProps){
   const linkRef = useRef<HTMLInputElement>()
   const titleRef = useRef<HTMLInputElement>()
   const [type, settype] = useState(ContentType.Youtube);
   const setrefe = useSetRecoilState(refreshState)
    async function content(){
       const link = linkRef.current?.value;
       const title = titleRef.current?.value;
       await axios.post(`${BACKEND_URL}/api/v1/content`,{
         link,
         title,
         type
       },{
          headers:{
             "Authorization":localStorage.getItem("token")
          } 
       })
       
       setrefe((e)=>(!e))
       setSticky(true)
        
       onClose();

   }
     return (
        <div>
        { open && <div onClick={onClose} className="w-screen h-screen bg-black  fixed top-0 left-0 bg-opacity-60 backdrop-blur-sm flex justify-center"> 
                  <div className="flex  flex-col justify-center">  
             <span className="bg-white opacity-100 p-4 rounded-lg">
                 <div className="flex justify-end"> 
                    <div onClick={onClose} className="hover:bg-gray-100 rounded cursor-pointer">
                     <CloseIcon size="lg"></CloseIcon> 
                    </div>

                 </div> 
                 <div className="">
                    <Input  reference={titleRef} placeholder={"Title"}></Input>
                    <Input  reference={linkRef} placeholder={"Link"}></Input>
                 </div> 
                <div >
                  <h1>Type:</h1> 
                  <div className="flex gap-4 pl-8 p-2">
                <Button size="md" text="Youtube"  variant={ type === ContentType.Youtube ?"primary":"secondary"}  onClick={()=>{
                  settype(ContentType.Youtube)
                }}></Button>
                <Button size="md" text="Twitter" variant={ type === ContentType.Twitter ?"primary":"secondary"} onClick={()=>{
                   settype(ContentType.Twitter)
                }} ></Button>
                </div>
                </div>
                 <div className="flex justify-center">                    
                 <Button onClick={content} variant={"primary"} text={"submit"} size="md"></Button>
                 </div>
             </span>
               </div>
        </div>
             
         }
        </div>
     )
}  


