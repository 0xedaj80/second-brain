
import { PlusIcon } from "./component/icons/PlusIcon"
import { ShareIcon } from "./component/icons/ShareIcon"
import { Button } from "./component/ui/Button"
function App() {
   return (
    <div className="flex justify-center m-10 gap-3 ">
     <Button  startIcon={<PlusIcon size={"lg"}></PlusIcon>} variant={"primary"} text={"add-content"} size={"md"}></Button>
     <Button startIcon={<ShareIcon size={"lg"}></ShareIcon>} variant={"secondary"} text={"share link"} size={"md"}></Button>
    </div> 
   )
}

export default App