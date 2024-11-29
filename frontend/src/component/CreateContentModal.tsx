import { CloseIcon } from "./icons/CloseIcon";
import { Button } from "./ui/Button";

export function CreateContentModal({open, onClose}){

     return (
        <div>
        { open && <div className="w-screen h-screen bg-black  fixed top-0 left-0 bg-opacity-60 flex justify-center"> 
                  <div className="flex  flex-col justify-center">  
             <span className="bg-white opacity-100 p-4 rounded-lg">
                 <div className="flex justify-end"> 
                    <div onClick={onClose} className="hover:bg-gray-100 rounded cursor-pointer">
                     <CloseIcon size="lg"></CloseIcon> 
                    </div>

                 </div> 
                 <div className="">
                    <Input placeholder={"Title"}></Input>
                    <Input placeholder={"Link"}></Input>
                 </div> 
                 <div className="flex justify-center">                    
                 <Button variant={"primary"} text={"submit"} size="md"></Button>
                 </div>
             </span>
               </div>
        </div>
             
         }
        </div>
     )
}  


function Input({placeholder}){
     return (
        <div className="">
            <input type="text" placeholder={placeholder} className="px-4 py-2 border rounded m-2 " />
        </div>
     )
}