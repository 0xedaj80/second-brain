import { ReactElement } from "react"

export function SidebarItem({text,icon}:{
    text:string,
    icon:ReactElement
}){
     return (
        <div className="flex text-gray py-2 hover:bg-blue-200 cursor-pointer rounded-md mr-10 pl-4 items-center ">
          <div  className="pr-4">  
          {icon}
            </div>
            <div className=" font-serif">                
           {text}
                </div> 
        </div>
     )
}