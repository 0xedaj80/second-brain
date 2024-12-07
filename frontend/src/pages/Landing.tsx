import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
// import Hero from "../component/Hero";
import { Button } from "../component/ui/Button";
import { IoLogOut } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { BookMarked, BrainCircuit, Search } from "lucide-react";
import { BrainIcon } from "../component/icons/BrainIcon"; 
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms/loginInfo";
import Dashboard from "./Dashboard";

export function Landing() {
 const navigate = useNavigate();
 const user = useRecoilValue(userState)
  
 if(user.userEmail){
  console.log(user.userEmail)
return (
   
  <Dashboard></Dashboard>
  
) 
 }
  return (

    <div className="">
          <div className="bg-white flex  justify-between shadow-2xl sticky top-0 left-0  "> 
            <div className="flex gap-2 p-4 ml-3 items-center ">

             <div  className="cursor-pointer" >
              <BrainIcon></BrainIcon> 
              </div> 
             <div className="">  
              <span className="text-blue-600 text-2xl ">Super</span> <span className="text-2xl">Memory</span>
              </div> 


            </div>
             <div className=" grid p-2 md:p-0 md:flex  mr-8  items-center gap-4 ">
                <div  className="" >
                 <Button startIcon={<IoLogOut></IoLogOut>} onClick={()=>{
                   navigate("/Signup")
                 }} size="md" variant={"nice"} text={"Signup"}></Button> 
                  </div>  
              <div>
                 <Button startIcon={<PiSignInBold></PiSignInBold>} onClick={()=>{
                  navigate("/Signin")
                 }} size="md" variant={"nice"} text={"login"}></Button> 
                  </div>  
              </div>            
          </div>
   
        <div className=" max-w-screen-2xl mx-auto px-4 sm:px-2 lg:px-10 py-12 md:py-24"> 
      <div className="  justify-between items-start  grid grid-cols-12  bg-white">
        <div className="ml-8 hidden md:block col-span-1 md:col-span-6 items-start mt-8 ">
            <div className=" items-start  text-left text-6xl font-serif font-bold ml-16 ">
                
              <span className="text-black">Welcome</span> to,
              <br />
              <span className="text-blue-600 ">Super</span>Memory,
              <p className="text-5xl m-1">Simplify your <span className="text-red-500">clutter.</span></p>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-500 font-serif max-w-2xl mb-8">
              Store links, jot down notes, and find them instantly.
            </p>
            </div>
            <div className="flex px-16  py-3 gap-4">

              <div >
              <Button variant={"danger"} onClick={()=>{
                navigate("/signin")
              }} startIcon={<IoLogOut />} text="Login" size="md" ></Button> 
              </div> 
              <div>
              <Button variant={"danger"} onClick={()=>{
                navigate("/signup")
              }} startIcon={<PiSignInBold />} text="Signup" size="md" ></Button> 
              </div> 


            </div>
            
        </div>
        <div className="rounded-lg mr-8 hover:shadow-red-200 hover:bg-red-50  transition-colors w-full p-3 col-span-12 md:col-span-6 bg-gray-300 shadow-lg ">
          <img
            src={"./landing.png"}
            width={1000}
            className="rounded-lg shadow-lg"
            alt=""
          />
        </div> 
        <div className="grid grid-cols-1 md:col-span-7  px-10">


        </div>
          
      </div>

<div className="   mt-20 grid  grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {[
            {
              icon: <Search size={32} className="text-blue-600 mb-4" />,
              title: "Instant Search",
              description: "Find any note or link in milliseconds",
            },
            {
              icon: <BookMarked size={32} className="text-blue-600 mb-4" />,
              title: "Smart Organization",
              description: "Auto-categorize your content",
            },
            {
              icon: <BrainCircuit size={32} className="text-blue-600 mb-4" />,
              title: "AI-Powered",
              description: "Intelligent suggestions and connections",
            },
            
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex mt-10 flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-lg hover:shadow-red-200  transition-shadow"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>      
       
      </div> 
      <div className="   rounded-lg p-20 shadow-lg gap-8 justify-center grid grid-cols-12  h-[500px] mb-2 "> 
        <div className="bg-yellow-100 rounded-lg hover:shadow-red-200 shadow-lg ml-20 md:col-span-6 col-span-12">
          
        <img src="/landing.png" alt="" />
      
        </div>
        <div className="bg-white rounded-lg shadow-lg md:col-span-6 hover:shadow-red-200 mr-20 col-span-12">

        <img src="/landing.png" alt="" />
      
        </div>
        </div> 
        <Footer></Footer>
    </div>
  );
}


{/* <div className="bg-green-50 h-[500px] rounded-lg p-2 m-2 ">
        about us
      </div>
      <div className="bg-red-50 h-[500px] rounded-lg p-2 m-2 ">
        about us
      </div> */}
