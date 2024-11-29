import { Card } from "../component/Card";
import { PlusIcon } from "../component/icons/PlusIcon";
import { ShareIcon } from "../component/icons/ShareIcon";
import { Sidebar } from "../component/Sidebar";
import { Button } from "../component/ui/Button";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
function Dashboard() {
   const [MoldalOpen, setModalOpen] = useState(false)
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
            startIcon={<ShareIcon size={"lg"}></ShareIcon>}
            variant={"secondary"}
            text={"Share Brain"}
            size={"md"}
          ></Button>
        </div>
        <div className="flex gap-4 p-3 flex-wrap ">
          <Card
            type={"twitter"}
            link={"https://x.com/0xedaj80/status/1793715475198972141"}
            title={"tweet"}
          ></Card>
          <Card
            type={"youtube"}
            link={"https://www.youtube.com/watch?v=JsnMmOG14QI"}
            title={"first video"}
          ></Card>
          <Card
            type={"twitter"}
            link={"https://x.com/0xedaj80/status/1793715475198972141"}
            title={"tweet"}
          ></Card>
          <Card
            type={"youtube"}
            link={"https://www.youtube.com/watch?v=JsnMmOG14QI"}
            title={"first video"}
          ></Card>
          <Card
            type={"twitter"}
            link={"https://x.com/0xedaj80/status/1793715475198972141"}
            title={"tweet"}
          ></Card>
          <Card
            type={"youtube"}
            link={"https://www.youtube.com/watch?v=JsnMmOG14QI"}
            title={"first video"}
          ></Card>
          <Card
            type={"youtube"}
            link={"https://www.youtube.com/watch?v=JsnMmOG14QI"}
            title={"first video"}
          ></Card>
          <Card
            type={"twitter"}
            link={"https://x.com/0xedaj80/status/1793715475198972141"}
            title={"tweet"}
          ></Card>
          <Card
            type={"youtube"}
            link={"https://www.youtube.com/watch?v=JsnMmOG14QI"}
            title={"first video"}
          ></Card>
        </div>
      </div>
    </div>
    </div>
  );
}


export default Dashboard;
