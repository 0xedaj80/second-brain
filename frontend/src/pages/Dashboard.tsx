import { Card } from "../component/Card";
import { PlusIcon } from "../component/icons/PlusIcon";
import { ShareIcon } from "../component/icons/ShareIcon";
import { Sidebar } from "../component/Sidebar";
import { Button } from "../component/ui/Button";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
import { useContent } from "../hooks/useContent";
// import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteModal } from "../component/DeleteModal";
import { HomeIcon } from "../component/icons/HomeIcon";
import {  useRecoilValue } from "recoil";
import { UserNameState } from "../recoil/atoms/username";
import { UpdateModal } from "../component/UpdateModal";
function Dashboard() {
   const [MoldalOpen, setModalOpen] = useState(false)
   const [deleteOpen, setDeleteOpen] = useState (false)
   const [UpdateOpen, setUpdateOpen] = useState (false)
   const [contentId, setcontentId] = useState("")  
   const content = useContent()
   const [sticky , setsticky] = useState(true)
   const username = useRecoilValue(UserNameState)
  return (
    <div className="dark:bg-black" >
      <div className="hidden md:block">
        
      
      <Sidebar></Sidebar>
     </div>
      <div>
      <CreateContentModal setSticky={setsticky} open={MoldalOpen} onClose={()=>{
         setModalOpen(false) 
         setsticky(true)
      }}></CreateContentModal> 
      <DeleteModal setSticky={setsticky} id={contentId} open={deleteOpen} onClose={()=>{
          setDeleteOpen(false)
          setsticky(true)
      }}></DeleteModal> 
      <UpdateModal setSticky={setsticky} open={UpdateOpen} id={contentId} onClose={()=>{
         setUpdateOpen(false);
         setsticky(true)
      }}  ></UpdateModal>

      <div className=" md:ml-72 min-h-screen bg-gray-100 border-2 p-4">

     {/* make this component fixed so whilte scrolling cards it remain fixed home and two buttons and background too */}
    
        <div className= {` flex justify-between border  bg-white p-4 rounded-3xl ${sticky?" sticky":" "} border-gray-200 shadow-lg top-5 z-10 `}>
          <div className="font-bold text-3xl pl-3 font-serif mt-1">
            <div className="flex ">
              <div className="pr-2">
                
            <HomeIcon size="lgg"></HomeIcon>
                </div>
                <div>
                  
            Home
                </div> 
              </div> 
          </div>
       <div className=" flex justify-end gap-2 ">
         <div className="p-2 bg-gray-300  rounded-lg mr-80 shadow-lg border font-bold font-serif">
           {username}
          </div> 
          
          <Button
            startIcon={<PlusIcon size={"lg"}></PlusIcon>}
            variant={"primary"}
            text={"Add Content"}
            size={"md"} 
            onClick={()=>{
               setModalOpen((e)=>(!e))
               setsticky((e)=>!e)
            }}
          ></Button>
          <Button
            onClick={async ()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                   share:true
                },{
                   headers:{
                     "Authorization":localStorage.getItem("token")
                   }
                }
               )
               const shareUrl = `${BACKEND_URL}${response.data.hash}` 
               alert(shareUrl)
            }}
            startIcon={<ShareIcon size={"lg"}></ShareIcon>}
            variant={"secondary"}
            text={"Share Brain"}
            size={"md"}
          ></Button>
  </div>
  </div>

  
        <div className="flex gap-4 p-3 flex-wrap  ">
            {content.map(({type,title,link,_id,userId})=>(
              <Card
            type={type}
            link={link}
            title={title}
            id={_id}
            setDeleteOpen={setDeleteOpen}
            setContentId = {setcontentId}
            setUpdateOpen={setUpdateOpen}
            setSticky={setsticky}
            userId={userId} 
            DateAdded={new Date()}
            
          ></Card> 
            ))}
        </div>
      </div>
    </div>
    </div>
  );
}


export default Dashboard;



