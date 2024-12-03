import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { YoutubeRedIcon } from "./icons/YoutbeRedIcon";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserNameState } from "../recoil/atoms/username";
interface CardProps{
     title:string;
     link:string;
     type:"twitter" | "youtube" ;
     id:string;
     setDeleteOpen:any;
     setContentId:any;
     userId:any;
}

export function Card({title,link,type,id,setDeleteOpen,setContentId,userId}:CardProps) {
  
   const [username, setusername] = useRecoilState(UserNameState)
  useEffect(()=>{
     setusername(userId.username) 
  },[])
  
  return (
    <div>
      <div className=" p-4 max-w-72 text-md border  bg-white rounded-md shadow-md border-gray-200">
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
                 setDeleteOpen((e) => (!e))
             }}>
              <DeleteIcon size={"lg"}></DeleteIcon>
              </button>  
            </div>
            <div className="pr-2 text-gray-500  hover:bg-gray-200 cursor-pointer rounded-md p-1">
               <EditIcon size={"lg"}></EditIcon>
            </div>
          </div>
        </div>
      <div className="pt-4 "> 

        {type === "youtube" && link ? (<iframe
           className="w-full rounded-md" 
          src={link.replace("watch","embed").replace("?v=","/")}
          title="YouTube video player"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe> ) :null}

       {type === "twitter" && <blockquote className="twitter-tweet">
       <a href={link.replace("x.com", "twitter.com")}></a> 
       </blockquote> }  

        </div>
    
      </div>
    </div>
  );
}
