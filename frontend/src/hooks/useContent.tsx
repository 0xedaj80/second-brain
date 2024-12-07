import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { refreshState } from "../recoil/atoms/loginInfo";


interface Content {
     _id: string;
     link: string;
     title: string;
     userId:string;
     type: "twitter" | "youtube"
   }
   
export function useContent(){
     const refe = useRecoilValue(refreshState)
     const [Content, setContent] = useState<Content[]>([])
   console.log("inside usecontent")
     async function getContent(){
         const response = await axios.get(`${BACKEND_URL}/api/v1/content`,{ 
            headers:{
                 "Authorization":localStorage.getItem("token")
            }
         })
         const dat = response.data.content;
         setContent(dat)
     }  

     useEffect(()=>{
         getContent()  
      },[refe])
     return Content;
     
     

}