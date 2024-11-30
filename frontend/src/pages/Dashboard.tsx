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
function Dashboard() {
   const [MoldalOpen, setModalOpen] = useState(false)
   const content = useContent()
  return (
    <div >
      <Sidebar></Sidebar> 
      <div>
      <CreateContentModal open={MoldalOpen} onClose={()=>{
         setModalOpen(false)
      }}></CreateContentModal>    
      <div className=" ml-72 min-h-screen bg-gray-100 border-2 p-4">
        <div className="flex  justify-end gap-2  ">
          <Button
            startIcon={<PlusIcon size={"lg"}></PlusIcon>}
            variant={"primary"}
            text={"Add Content"}
            size={"md"} 
            onClick={()=>{
               setModalOpen((e)=>(!e))
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
        <div className="flex gap-4 p-3 flex-wrap "> 
            {content.map(({type,title,link})=>(
              <Card
            type={type}
            link={link}
            title={title}
          ></Card> 
            ))}
        </div>
      </div>
    </div>
    </div>
  );
}


export default Dashboard;
