
import { Card } from "./component/Card"
import { PlusIcon } from "./component/icons/PlusIcon"
import { ShareIcon } from "./component/icons/ShareIcon"
import { Sidebar } from "./component/Sidebar"
import { Button } from "./component/ui/Button"
function App() {
   return (
      
    <div className="  gap-2 p-4 ">

        <div className="flex justify-end gap-2">
        <Button  startIcon={<PlusIcon size={"lg"}></PlusIcon>} variant={"primary"} text={"Add Content"} size={"md"}></Button>
       <Button startIcon={<ShareIcon size={"lg"}></ShareIcon>} variant={"secondary"} text={"Share Brain"} size={"md"}></Button>         
        </div>
       <div className="flex gap-4">      
       <Card type={"twitter"} link={"https://x.com/0xedaj80/status/1793715475198972141"} title={"tweet"}></Card>
       <Card type={"youtube"} link={"https://www.youtube.com/watch?v=JsnMmOG14QI"} title={"first video"}></Card>
       <Card type={"twitter"} link={"https://x.com/0xedaj80/status/1793715475198972141"} title={"tweet"}></Card>
       <Card type={"youtube"} link={"https://www.youtube.com/watch?v=JsnMmOG14QI"} title={"first video"}></Card>
              <Card type={"twitter"} link={"https://x.com/0xedaj80/status/1793715475198972141"} title={"tweet"}></Card>
       <Card type={"youtube"} link={"https://www.youtube.com/watch?v=JsnMmOG14QI"} title={"first video"}></Card>
</div>

    </div> 
   )
}

      // <Button  startIcon={<PlusIcon size={"lg"}></PlusIcon>} variant={"primary"} text={"Add Content"} size={"md"}></Button>
      // <Button startIcon={<ShareIcon size={"lg"}></ShareIcon>} variant={"secondary"} text={"Share Brain"} size={"md"}></Button>      


export default App