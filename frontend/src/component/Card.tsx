// import { PlusIcon } from "./icons/PlusIcon";
// import { ShareIcon } from "./icons/ShareIcon";
import { LinkIcon } from "./icons/LinkIcon";
// import { YoutubeIcon } from "./icons/YoutubeIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { YoutubeRedIcon } from "./icons/YoutbeRedIcon";
import { useEffect,  } from "react";
import {  useSetRecoilState } from "recoil";
import { UserNameState } from "../recoil/atoms/username";
interface CardProps{
     title:string;
     link:string; 
     DateAdded:Date;
     type:"twitter" | "youtube" ;
     id:string;
     setDeleteOpen:any;
     setContentId:any;
     setUpdateOpen:any;
     userId:any;
     setSticky:any;
}

export function Card({title,link,type,id,setDeleteOpen, setUpdateOpen, setSticky, setContentId,userId,DateAdded}:CardProps) {
  
   const setusername = useSetRecoilState(UserNameState)
  useEffect(()=>{
     setusername(userId.username) 
  },[])

  
  return (
    <div>
      <div className=" p-4 max-w-72 text-md border  bg-white rounded-lg  shadow-lg  hover:shadow-red-500 border-gray-200">
        <div className={"flex justify-between"}>
          <div className="flex items-center ">
            <div className="text-gray-500 pr-2 p-1 hover:bg-gray-200 cursor-pointer rounded-md  ">
             {type ==="twitter" && <TwitterIcon size={"lg"}></TwitterIcon>} {type ==="youtube" && <YoutubeRedIcon size={"lg"}></YoutubeRedIcon>}
            </div>
            <div className="font-serif italic font-bold"> 
            {title}
            </div>
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500 hover:bg-gray-200 cursor-pointer rounded-md p-1">              
            <a href={link} target="_blank">
            <LinkIcon size={"lg"}></LinkIcon></a> 
            </div>
            <div  className="pr-2 text-gray-500   hover:bg-gray-200 cursor-pointer rounded-md p-1">
             <button onClick={()=>{
                  setContentId(id)
                 setDeleteOpen((e:boolean) => (!e)) 
                 setSticky((e:boolean)=>(!e))
             }}>
              <DeleteIcon size={"lg"}></DeleteIcon>
              </button>  
            </div>
            <div className="pr-2 text-gray-500  hover:bg-gray-200 cursor-pointer rounded-md p-1">
              <button onClick={()=>{
                  setContentId(id)
                  setUpdateOpen((e:boolean)=>(!e))
                  
                 setSticky((e:boolean)=>(!e))
            
              }}>  
               <EditIcon size={"lg"}></EditIcon>
            </button>
            </div>
          </div>
        </div>
      <div className="pt-4 "> 

        {type === "youtube" && link ? (
          <div> 
          <iframe
           className="w-full rounded-md" 
          src={link.replace("watch","embed").replace("?v=","/")}
          title="YouTube video player"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe> 
        <div className="mt-4 text-sm text-gray-500">
        Added on   {new Date(DateAdded).toLocaleDateString()}
      </div> 
      </div>
      ) :null
        
         
        }

       {type === "twitter" && <blockquote className="twitter-tweet">
       <a href={link.replace("x.com", "twitter.com")}></a> 
       </blockquote> }  

        </div>
    
      </div>
    </div>
  );
}
