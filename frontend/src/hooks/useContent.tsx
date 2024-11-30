import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function useContent(){
     const [Content, setContent] = useState([])
   console.log("here")
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
      },[])
     return Content;
     
     

}