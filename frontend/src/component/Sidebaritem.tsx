import { ReactElement } from "react"

export function SidebarItem({text,icon,onClick}:{
    text:string,
    icon:ReactElement
    onClick:any
}){
     return (
        <div onClick={onClick} className="flex text-gray py-2 hover:bg-blue-200 cursor-pointer rounded-md mr-10 pl-4 items-center ">
          <div  className="pr-4 p-1">  
          {icon}
            </div>
            <div className=" font-serif ">                
           {text}
                </div> 
        </div>
     )
}