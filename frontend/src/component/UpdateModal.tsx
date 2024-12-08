import { CloseIcon } from "./icons/CloseIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import { useRef, useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";
import { useSetRecoilState } from "recoil";
import { refreshState } from "../recoil/atoms/loginInfo";



enum ContentType {
    Youtube = "youtube",
     Twitter = "twitter"
} 
interface contProps{
    open:boolean;
    onClose:()=>void;
    id:string;
    setSticky:any;
}


export function UpdateModal({open, onClose, setSticky,id}:contProps){
   const linkRef = useRef<HTMLInputElement>()
   const titleRef = useRef<HTMLInputElement>()
   const [linkValue, setLinkValue] = useState("");
   const [titleValue, setTitleValue] = useState("");
   const [type, settype] = useState(ContentType.Youtube);
   const data = useContent()
   const setrefe = useSetRecoilState(refreshState)

    async function content(){
    //    const link = linkRef.current?.value;
    //    const title = titleRef.current?.value; 
    //    alert("something")
       await axios.post(`${BACKEND_URL}/api/v1/content/update`,{
         id:id,
         title:titleValue,
         link:linkValue
       },{
          headers:{
             "Authorization":localStorage.getItem("token")
          } 
       })
       setrefe((e)=>(!e))
       setSticky(true)
        
       onClose();

   }



   // Synchronize input values with ref
//    useEffect(() => {
//     //    if (linkRef.current) {
//     //        linkRef.current.value = linkValue;
//     //    }
//    }, [linkValue]);

//    useEffect(() => {
//     //    if (titleRef.current) {
//     //        titleRef.current.value = titleValue;
//     //    }
//    }, [titleValue]);

useEffect(()=>{
  let n = data.length;
     for(let i = 0; i<n; ++i){
         if(data[i]._id === id){
            setLinkValue(data[i].link)
            setTitleValue(data[i].title)                    
         }
     } 
},[id])



     return (
        <div>
        
        { open && <div onClick={onClose} className="w-screen backdrop-blur-sm  h-screen bg-black  fixed top-0 left-0 bg-opacity-60 flex justify-center"> 
                  <div className="flex  flex-col justify-center">  
             <span className="bg-white opacity-100 p-4 rounded-lg">
                 <div className="flex justify-end"> 
                    <div onClick={onClose} className="hover:bg-gray-100 rounded cursor-pointer">
                     <CloseIcon size="lg"></CloseIcon> 
                    </div>
                  
                 </div> 
                 <div className="">
                    <div className="justify-center flex p-2 ">
                        <h1>Update details</h1>
                    </div>
                     {/* {JSON.stringify(data[0]._id )}  */}
                     
                    <Input value={titleValue} onChange={(e:any)=>{setTitleValue(e.target.value)}} reference={titleRef} placeholder={"Title"}></Input>
                    <Input value={linkValue} onChange={(e:any)=>{setLinkValue(e.target.value)}} reference={linkRef} placeholder={"Link"}></Input>
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


