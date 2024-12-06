import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";
import {  refreshState, userState } from "./recoil/atoms/loginInfo";
function App() {
   return (
    <RecoilRoot>
    <BrowserRouter>
    <InitUser />
    <Routes>
      <Route path="/" element={<Landing></Landing>}></Route> 
      <Route path="/Signup" element={<Signup></Signup>}></Route> 
      <Route path="/Signin" element={<Signin></Signin>}></Route> 
      <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="/Landing" element={<Landing></Landing>}></Route>  
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>  
      </Routes>    
    </BrowserRouter>
</RecoilRoot>
   )
}


function InitUser(){
   const setUser = useSetRecoilState(userState)
   const refe  = useRecoilValue(refreshState) 
   async function fetchuser(){
        const response = await axios.get(`${BACKEND_URL}/api/v1/me`,{
          headers:{
             "Authorization":localStorage.getItem("token")
          }
        }) 
        if(response.data.username){
          setUser({
             isLoading:false,
             userEmail:response.data.username
          }) 
        }else{
         setUser({
            isLoading:true,
            userEmail:null
         })
        }
   }
  
   useEffect(()=>{
      fetchuser()
      // console.log("refetched")  
   },[refe])
   
   return (
      <div>

      </div>
   ) 
}


function PageNotFound(){
    return (
      <div className="flex justify-center items-center text-4xl">
         page not found
      </div>
    )
}

export default App