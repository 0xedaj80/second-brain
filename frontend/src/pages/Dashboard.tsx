import { Card } from "../component/Card";
import { PlusIcon } from "../component/icons/PlusIcon";
import { ShareIcon } from "../component/icons/ShareIcon";
import { Sidebar } from "../component/Sidebar";
import { Button } from "../component/ui/Button";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
import { useContent } from "../hooks/useContent";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteModal } from "../component/DeleteModal";
import { HomeIcon } from "../component/icons/HomeIcon";
function Dashboard() {
   const [MoldalOpen, setModalOpen] = useState(false)
   const [deleteOpen, setDeleteOpen] = useState (false)
   const [contentId, setcontentId] = useState("")  
   const content = useContent()
   const [sticky , setsticky] = useState(true)
  return (
    <div >
      <Sidebar></Sidebar>
      <div>
      <CreateContentModal setSticky={setsticky} open={MoldalOpen} onClose={()=>{
         setModalOpen(false) 
         setsticky(true)
      }}></CreateContentModal> 
      <DeleteModal setSticky={setsticky} id={contentId} open={deleteOpen} onClose={()=>{
          setDeleteOpen(false)
          setsticky(true)
      }}></DeleteModal>   
      <div className=" ml-72 min-h-screen bg-gray-100 border-2 p-4">

     {/* make this component fixed so whilte scrolling cards it remain fixed home and two buttons and background too */}
    
        <div className= {` flex justify-between border bg-white p-4 rounded-3xl ${sticky?" sticky":" "} border-gray-200 shadow-lg top-5 z-10 `}>
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
       <div className=" flex justify-end gap-2">
        
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
            {content.map(({type,title,link,_id})=>(
              <Card
            type={type}
            link={link}
            title={title}
            id={_id}
            setDeleteOpen={setDeleteOpen}
            setContentId = {setcontentId}
          ></Card> 
            ))}
        </div>
      </div>
    </div>
    </div>
  );
}


export default Dashboard;
