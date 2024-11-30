import { BrainIcon } from "./icons/BrainIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./Sidebaritem";

export function Sidebar(){ 
    return (
        <div className="w-72  h-screen bg-white border-r fixed top-0 left-0 pl-8">
            <div className="flex text-2xl pt-4 font-bold  font-serif text-black items-center ">
                 <div className="pr-2"> 
                 <BrainIcon></BrainIcon> 
                    </div> 
                 Super Memory
            </div>
            <div className="pt-6"> 
                <SidebarItem icon={<TwitterIcon size="lgg"></TwitterIcon>} text="Twitter"></SidebarItem>
                <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
                <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
                <SidebarItem icon={<YoutubeIcon size="lgg"></YoutubeIcon>} text="YouTube"></SidebarItem>
            </div> 
        </div>
    )
}