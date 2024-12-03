import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
function App() {
   return (
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/Signup" element={<Signup></Signup>}></Route> 
      <Route path="/Signin" element={<Signin></Signin>}></Route> 
      <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="/Landing" element={<Landing></Landing>}></Route>  
      </Routes>    
    </BrowserRouter>
</RecoilRoot>
   )
}

export default App