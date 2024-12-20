// import { useNavigate } from "react-router-dom";
import { BrainIcon } from "./icons/BrainIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { NotesIcon } from "./icons/NotesIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./Sidebaritem";
import { Button } from "./ui/Button";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import {  useSetRecoilState } from "recoil";
import { refreshState, setTag } from "../recoil/atoms/loginInfo";


// export function Sidebar(){ 
//     return (
//         <div className="w-72  h-screen bg-white border-r fixed top-0 left-0 pl-8">
//             <div className="flex text-2xl pt-4 font-bold  font-serif text-black items-center ">
//                  <div className="pr-2"> 
//                  <BrainIcon></BrainIcon> 
//                     </div> 
//                  Super Memory
//             </div>
//             <div className="pt-6"> 
//                 <SidebarItem icon={<TwitterIcon size="lgg"></TwitterIcon>} text="Twitter"></SidebarItem>
//                 <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
//                 <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
//                 <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem> 
//                 <div className=" pb-6 flex justify-center ">
//                     <Button variant="secondary" text="Log-out" size="md"></Button>
//                 </div>
//             </div> 
//         </div>
//     )
// }

export function Sidebar(){ 
    // const navigate = useNavigate() 
    const setrefe  = useSetRecoilState(refreshState)
    const settagcomp = useSetRecoilState(setTag)
    return (
        <div className="w-72 h-screen bg-white border-r fixed top-0 left-0 pl-8 flex flex-col justify-between">
            {/* Header Section */}
            <div>
                

                 
                <div className="flex text-2xl pt-4 font-bold bg-white-200 shadow-lg rounded-lg mr-10  font-serif text-black  items-center">
                    <div className="pr-2"> 
                        <BrainIcon></BrainIcon> 
                    </div> 
                    Super Memory
                </div>
                {/* Sidebar Items */}
                <div className="pt-6"> 
                    <SidebarItem onClick={()=>{
                          settagcomp("")
                    }} icon={<HomeIcon size="lgg"></HomeIcon>} text="Home"></SidebarItem>
                    <SidebarItem onClick={()=>{
                          settagcomp("twitter")
                    }} icon={<TwitterIcon size="lgg"></TwitterIcon>} text="Twitter"></SidebarItem>
                    <SidebarItem  onClick={()=>{
                          settagcomp("youtube")
                    }}icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
                    <SidebarItem  onClick={()=>{
                          settagcomp("Notes")
                    }}icon={<NotesIcon size="lgg"></NotesIcon>} text="All Notes"></SidebarItem>
                <SidebarItem  onClick={()=>{
                          settagcomp("Links")
                    }}icon={<LinkIcon size="lgg"></LinkIcon>} text="all Links"></SidebarItem>
                </div>
            </div>
            
            {/* Footer Section */}
            <div className="pb-8 mr-9 flex justify-center px-10">
                
                <Button onClick={()=>{
                     localStorage.removeItem("token")
                    //  toast.error("signed out")
                     setrefe((e)=>(!e)) 
                     toast.error("signed out", {
                        theme: "colored"
                      })
                    //  navigate("/landing") 
                     window.location.href = "/landing"
                }} variant="danger" text="Log-out" startIcon={<RiLogoutBoxRLine></RiLogoutBoxRLine>} size="md"></Button>
            </div>
            
        </div>
    );
}
